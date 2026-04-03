/**
 * Tiện ích wrap local storage để quản lý token và JSON data an toàn
 */
export const storage = {
  getToken: () => localStorage.getItem('access_token'),
  setToken: (token) => localStorage.setItem('access_token', token),
  clearToken: () => localStorage.removeItem('access_token'),
  
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
