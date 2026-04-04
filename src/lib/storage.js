/**
 * Tiện ích wrap local storage để quản lý token và JSON data an toàn
 */
export const storage = {
  getToken: () => localStorage.getItem('access_token'),
  setToken: (token) => storage.setItem('access_token', token),
  getRefreshToken: () => localStorage.getItem('refresh_token'),
  setRefreshToken: (token) => storage.setItem('refresh_token', token),
  clearToken: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return localStorage.getItem(key);
    }
  },
  
  setItem: (key, value) => {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  
  removeItem: (key) => localStorage.removeItem(key),
};
