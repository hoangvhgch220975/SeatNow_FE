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

  // Restaurant Service yêu cầu offset (vị trí bắt đầu) thay vị page index
  const offset = (page - 1) * limit;

  // Chuẩn bị tham số gửi lên API
  const searchParams = {
    // Kết hợp từ khóa tìm kiếm và địa điểm thành một chuỗi query thông minh
    q: [rest.q, rest.location].filter(Boolean).join(' ').trim(),
    limit,
    offset,
    sort: rest.sort || 'rating',
    cuisine: rest.cuisine,
    priceRange: rest.priceRange,
    lat: rest.lat,
    lng: rest.lng,
    radiusKm: rest.radiusKm
  };

  // Loại bỏ các param null/undefined/empty/location (vì đã chuyển vào q)
  const cleanParams = Object.fromEntries(
    Object.entries(searchParams).filter(([key, v]) => 
      v != null && v !== '' && key !== 'page' && key !== 'location'
    )
  );

  const response = await apiClient.get('/restaurants', {
    params: cleanParams
  });


  /**
   * 🏆 HỆ THỐNG ĐÃ ĐỒNG BỘ 100% (Confirmed via Console Test)
   * Cấu trúc Backend: { data: [...], total: 8, meta: {...} }
   */
  const items = Array.isArray(response.data) ? response.data : (Array.isArray(response) ? response : []);
  const total = response.total || response.totalCount || items.length;

  return { 
    data: items, 
    total: total,
    meta: response.meta || {}
  };
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
