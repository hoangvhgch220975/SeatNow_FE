import { apiClient as axios } from '../../lib/axios.js';

/**
 * @file api.js
 * @description Các hàm gọi AI Service hoàn thiện theo Tài liệu thiết kế mới (FastAPI).
 */
export const aiApi = {
  // --- 1. PUBLIC AI (Khách vãng lai) ---
  publicRecommend: async (message) => {
    return await axios.post('/ai/public/recommend', { message });
  },

  // --- 2. CUSTOMER AI (Khách hàng) ---
  
  /**
   * Hội thoại trực tiếp (Main Chat)
   */
  customerChat: async (message, session_key = null) => {
    const payload = { message };
    if (session_key) payload.session_key = session_key;
    return await axios.post('/ai/customer/chat', payload);
  },

  /**
   * Gợi ý nhanh (One-shot)
   */
  customerRecommend: async (message) => {
    return await axios.post('/ai/customer/recommend', { message });
  },

  /**
   * Xóa lịch sử hội thoại khách hàng trên Redis
   */
  clearCustomerHistory: async () => {
    return await axios.delete('/ai/customer/chat/history');
  },

  /**
   * Lấy lịch sử hội thoại thực tế từ Redis
   */
  getCustomerHistory: async () => {
    return await axios.get('/ai/customer/chat/history');
  },

  // --- 3. ADMIN AI (Quản trị viên) ---

  /**
   * Hội thoại phân tích dành cho Admin
   */
  adminChat: async (message, session_key = null) => {
    const payload = { message };
    if (session_key) payload.session_key = session_key;
    return await axios.post('/ai/admin/chat', payload);
  },

  /**
   * Phân tích doanh thu & Báo cáo
   */
  adminRevenueSummary: async (params = {}) => {
    return await axios.post('/ai/admin/revenue-summary', params);
  },

  /**
   * Xóa lịch sử phân tích của quản trị viên
   */
  clearAdminHistory: async () => {
    return await axios.delete('/ai/admin/chat/history');
  }
};
