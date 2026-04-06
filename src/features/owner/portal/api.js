import { apiClient } from '@/lib/axios';

/**
 * @file api.js
 * @description Các hàm gọi API dành riêng cho Owner Portal.
 */
export const ownerPortalApi = {
  /**
   * Lấy tóm tắt Portfolio (Số lượng nhà hàng, trạng thái) - Từ Restaurant Service
   */
  getPortfolioSummary: () => apiClient.get('/portfolio/summary'),

  /**
   * Lấy tóm tắt kinh doanh Portfolio (Doanh thu, Lượt đặt, Đánh giá) - Từ Booking Service
   */
  getBusinessPortfolio: () => apiClient.get('/owner/portfolio-summary'),

  /**
   * Lấy danh sách nhà hàng đang sở hữu - Từ Restaurant Service
   */
  getMyRestaurants: (params = {}) => apiClient.get('/restaurants', { params }),

  /**
   * Lấy thống kê giờ cao điểm cho Portfolio (Ngày) - Từ Booking Service
   */
  getHourlyStats: (params = {}) => apiClient.get('/owner/stats/hourly', { params }),

  /**
   * Lấy chuỗi doanh thu và lượt đặt theo thời gian (Ngày/Tuần/Tháng) - Từ Booking Service
   */
  getRevenueStats: (params = {}) => apiClient.get('/owner/revenue-stats', { params }),

  /**
   * Lấy phân bổ giờ (Hourly) hoặc lượt đặt theo dòng thời gian
   */
  getBookingStats: (params = {}) => apiClient.get('/owner/revenue-stats', { params }),

  /**
   * Lấy phân bổ giờ cao điểm (Peak hours)
   */
  getHourlyStats: (params = {}) => apiClient.get('/owner/stats/hourly', { params }),
};
