import { apiClient } from '../../lib/axios.js';

/**
 * @file api.js (Restaurant Feature)
 * @description Logic gọi API chuẩn cho Restaurant Service (SQL) dùng limit & offset.
 */

/**
 * Lọc danh sách nhà hàng với Phân trang chuẩn (Restaurant Service dùng limit/offset)
 * @param {Object} params - { q, cuisine, priceRange, sort, lat, lng, radiusKm, page, limit }
 */
export const getRestaurants = async (params = {}) => {
  const { page = 1, limit = 10, ...rest } = params;

  // Restaurant Service yêu cầu offset (vị trí bắt đầu) thay vì page index
  const offset = (page - 1) * limit;

  // Chuẩn bị tham số gửi lên API
  const searchParams = {
    ...rest,
    limit,
    offset,
    sort: rest.sort || 'rating',
  };

  // Loại bỏ các param null/undefined/empty
  const cleanParams = Object.fromEntries(
    Object.entries(searchParams).filter(([key, v]) => 
      v != null && v !== '' && key !== 'page' // ⚠️ KHÔNG gửi 'page' trực tiếp lên Restaurant Service
    )
  );

  const response = await apiClient.get('/restaurants', {
    params: cleanParams
  });

  /**
   * Theo doc: Restaurant Service trả về { data, meta: { limit, offset } }
   * Tuy nhiên để dễ dùng cho UI, ta chuẩn hóa hoặc trả về toàn bộ payload.
   */
  return response?.data || response;
};

/**
 * Lấy chi tiết 1 nhà hàng
 */
export const getRestaurantById = async (id) => {
  const response = await apiClient.get(`/restaurants/${id}`);
  return response?.data || response;
};

/**
 * Lấy danh sách thực đơn (Menu) của nhà hàng từ MongoDB
 */
export const getRestaurantMenu = async (id) => {
  const response = await apiClient.get(`/restaurants/${id}/menu`);
  return response?.data || response;
};
