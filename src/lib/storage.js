/**
 * Tiện ích wrap local storage và Cookie để quản lý token an toàn.
 * Sử dụng Session Cookie cho Token: Tự động logout khi đóng trình duyệt (Window).
 * Sử dụng LocalStorage cho Data: Lưu trữ tạm thời, chỉ hợp lệ khi Token còn trong Cookie.
 */

// Helper: Quản lý Cookie thủ công (Vietnamese comment)
const cookieStorage = {
  set: (name, value) => {
    // Không set expires/max-age => Cookie sẽ tự xóa khi đóng trình duyệt (Vietnamese comment)
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
  },
  get: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
  },
  erase: (name) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
  }
};

export const storage = {
  // Token được lưu ở Cookie (Session) (Vietnamese comment)
  getToken: () => cookieStorage.get('access_token'),
  setToken: (token) => cookieStorage.set('access_token', token),
  
  getRefreshToken: () => cookieStorage.get('refresh_token'),
  setRefreshToken: (token) => cookieStorage.set('refresh_token', token),

  clearToken: () => {
    cookieStorage.erase('access_token');
    cookieStorage.erase('refresh_token');
    localStorage.removeItem('user');
  },
  
  getItem: (key) => {
    // Nếu là thông tin User, phải kiểm tra xem Token còn tồn tại không (Vietnamese comment)
    if (key === 'user') {
      const hasToken = !!cookieStorage.get('access_token');
      if (!hasToken) {
        localStorage.removeItem('user');
        return null;
      }
    }

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
