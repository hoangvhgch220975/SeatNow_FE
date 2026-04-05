import { apiClient as axiosInstance } from '@/lib/axios.js';

/**
 * @file api.js (Booking Feature)
 * @description Các lời gọi API quản lý đặt bàn của người dùng.
 */

/**
 * Lấy danh sách đặt bàn của chính người dùng hiện tại
 * @returns {Promise<Array>} Danh sách các bản ghi booking
 */
export const getMyBookings = async () => {
  // Axios interceptor trả về response.data (body từ backend)
  // Backend trả về { success, data: { items, limit, offset } }
  // Trả về nguyên vẹn để hooks.js select() xử lý
  return await axiosInstance.get('/bookings/my-bookings');
};

/**
 * Lấy chi tiết một bản ghi đặt bàn theo ID
 * @param {string} id - UUID của booking
 */
export const getBookingById = async (id) => {
  const response = await axiosInstance.get(`/bookings/${id}`);
  return response?.data || response;
};
/**
 * Lấy danh sách bàn trống thực tế (qua Booking Service để check Redis Lock)
 */
export const getRestaurantAvailability = async (id, params) => {
  // params: { date, time, guests }
  const response = await axiosInstance.get(`/booking-restaurants/${id}/availability`, { params });
  return response?.data || response;
};

/**
 * Tạo mới một bản ghi đặt bàn
 * @param {Object} data - Thông tin booking (restaurantId, tableId, bookingDate, bookingTime, numGuests, guestName, guestPhone, guestEmail)
 */
export const createBooking = async (data) => {
  const response = await axiosInstance.post('/bookings', data);
  return response?.data || response;
};
