import { create } from 'zustand';
import { storage } from '../../lib/storage.js';

/**
 * Zustand Store Global quản lý State Đăng Nhập / Token của User
 * Tự động đồng bộ với LocalStorage thông qua Helper
 */
export const useAuthStore = create((set) => ({
  user: storage.getItem('user') || null,
  token: storage.getToken() || null,
  isAuthenticated: !!storage.getToken(),

  login: (userData, authToken, refreshToken) => {
    storage.setToken(authToken);
    if (refreshToken) storage.setRefreshToken(refreshToken);
    storage.setItem('user', userData);
    set({ user: userData, token: authToken, isAuthenticated: true });
  },

  logout: () => {
    storage.clearToken();
    storage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
