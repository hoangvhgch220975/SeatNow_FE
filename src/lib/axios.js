import axios from 'axios';
import { ENV } from '../config/env.js';
import { storage } from './storage.js';

/**
 * Cấu hình instance Axios chuẩn cho toàn bộ project
 * Mặc định trỏ đến API Gateway (:7000/api/v1)
 */
export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000, // 15s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động đính kèm JWT (nếu có) vào mỡi request
apiClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Trả về trực tiếp data & tự động logout khi 401
apiClient.interceptors.response.use(
  (response) => {
    // Nếu API backend trả về chuẩn dạng { data, message, statusCode } thì lấy data
    return response.data;
  },
  (error) => {
    // Bắt lỗi 401 Unauthorized -> Xóa token và có thể Force Logout
    if (error.response?.status === 401) {
      storage.clearToken();
      // Bắn event để Store xử lý logout UI
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);
