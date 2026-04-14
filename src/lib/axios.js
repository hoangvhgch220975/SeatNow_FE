import axios from 'axios';
import { ENV } from '../config/env.js';
import { storage } from './storage.js';


const decodeToken = (token) => {
  try {
    if (!token) return null;
    const parts = token.split('.');
    const header = JSON.parse(window.atob(parts[0]));
    const payload = JSON.parse(window.atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return { header, payload };
  } catch (e) {
    return null;
  }
};

/**
 * @description Đảm bảo token lấy ra luôn là chuỗi JWT sạch tuyệt đối.
 * Giải quyết các trường hợp: Stringified JSON, Stringified Object, dư thừa nháy kép (""), trailing spaces.
 */
const sanitizeToken = (raw) => {
  if (!raw || typeof raw !== 'string') return raw;
  
  let clean = raw.trim();
  
  // 1. Tháo lớp nháy kép nếu có
  if (clean.startsWith('"') && clean.endsWith('"')) {
    clean = clean.slice(1, -1).trim();
  }
  
  // 2. Kiểm tra nếu là JSON Object Stringified
  if (clean.startsWith('{')) {
    try {
      const parsed = JSON.parse(clean);
      clean = (parsed.accessToken || parsed.token || parsed.access_token || parsed.refreshToken || parsed.refresh_token || clean);
    } catch (e) {}
  }
  
  // 3. Strict Whitelist: Chỉ giữ lại ký tự hợp lệ cho JWT (a-z, A-Z, 0-9, ., -, _)
  // Loại bỏ hoàn toàn nháy kép, nháy đơn, khoảng trắng hoặc ký tự đặc biệt khác bị dính vào
  return String(clean).replace(/[^a-zA-Z0-9\._\-]/g, '');
};

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const rawToken = storage.getToken();
    const token = sanitizeToken(rawToken);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    

    if (config.url && !config.url.startsWith('http')) {
      const baseUrlFull = ENV.API_BASE_URL.replace(/\/$/, '');
      config.url = `${baseUrlFull}/${config.url.replace(/^\//, '')}`;
      config.baseURL = ''; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers = [];

apiClient.interceptors.response.use(
  (response) => {
    // Nếu request yêu cầu lấy toàn bộ response (bao gồm headers), trả về response thay vì chỉ data
    if (response.config?._full) return response;
    return response.data;
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const failedUrl = originalRequest.url;
      const failedMethod = originalRequest.method?.toUpperCase();
      

      const oldToken = sanitizeToken(storage.getToken());
      const refreshToken = sanitizeToken(storage.getRefreshToken());
      

      if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;
          originalRequest._retry = true;

          try {
            const baseUrlClean = ENV.API_BASE_URL.replace(/\/$/, '');
            const refreshUrl = `${baseUrlClean}/auth/refresh-token`;
            
            const response = await axios.post(refreshUrl, { refreshToken });
            const root = response.data?.data || response.data;

            // Robust token extraction (handles both string and new object structure)
            let newAccessToken = root.accessToken;
            if (newAccessToken && typeof newAccessToken === 'object') {
                newAccessToken = newAccessToken.accessToken || newAccessToken.token;
            }

            let newRefreshToken = root.refreshToken;
            if (newRefreshToken && typeof newRefreshToken === 'object') {
                newRefreshToken = newRefreshToken.refreshToken || newRefreshToken.token || newRefreshToken.refresh_token;
            }

            if (!newAccessToken) throw new Error("No access token returned from refresh flow");

            const oldD = decodeToken(oldToken);
            const newD = decodeToken(newAccessToken);

            // BÁO CÁO PHÂN TÍCH CUỐI CÙNG CHO BACKEND

            // Update storage with raw strings
            storage.setToken(newAccessToken);
            if (newRefreshToken) storage.setRefreshToken(newRefreshToken);

            isRefreshing = false;
            
            // Re-apply clean header directly to individual request for absolute priority
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            
            // Tạo một config mới sạch sẽ để retry, tránh reuse object cũ bị taint
            const retryConfig = {
                ...originalRequest,
                headers: {
                    ...originalRequest.headers,
                    'Authorization': `Bearer ${newAccessToken}`
                }
            };

            return apiClient(retryConfig);
          } catch (refreshError) {
            isRefreshing = false;
            storage.clearToken();
            window.dispatchEvent(new Event('auth:unauthorized'));
            return Promise.reject(refreshError);
          }
        }
      }
      storage.clearToken();
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);
