import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyBookings, getBookingById, getRestaurantAvailability, createBooking } from './api.js';

/**
 * @file hooks.js (Booking Feature)
 * @description Các hook React Query quản lý dữ liệu đặt bàn.
 */

/**
 * Custom Hook: Lấy lịch sử đặt bàn của người dùng.
 * Sắp xếp theo ngày giờ mới nhất và giữ Cache trong 1 phút.
 * @returns {Object} query status, data, error
 */
export const useMyBookingsQuery = () => {
  return useQuery({
    queryKey: ['my-bookings'],
    queryFn: getMyBookings,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    select: (data) => {
      // Backend Booking Service trả về { success, data: { items: [...], limit, offset } }
      // Axios interceptor đã bóc 1 tầng: trả về { items: [...], limit, offset }
      let list = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data?.items)) {
        list = data.items;
      } else if (Array.isArray(data?.data?.items)) {
        list = data.data.items;
      } else if (Array.isArray(data?.data)) {
        list = data.data;
      }

      // Sắp xếp theo ngày giờ đặt bàn giảm dần (mới nhất lên đầu)
      return [...list].sort((a, b) => {
        const dateA = new Date(`${a.bookingDate}T${a.bookingTime}`);
        const dateB = new Date(`${b.bookingDate}T${b.bookingTime}`);
        return dateB - dateA;
      });
    },
  });
};

/**
 * Custom Hook: Lấy chi tiết một bản ghi đặt bàn theo ID.
 * @param {string} id - UUID của booking
 */
export const useBookingDetailQuery = (id) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingById(id),
    enabled: !!id,
  });
};
/**
 * Hook fetch danh sách bàn trống (Real-time Availability) dùng React Query
 */
export const useRestaurantAvailability = (id, params) => {
  return useQuery({
    queryKey: ['booking-restaurants', 'availability', id, params],
    queryFn: () => getRestaurantAvailability(id, params),
    enabled: !!id && !!params?.date && !!params?.time,
    staleTime: 1000 * 30, // 30 giây (Availability thay đổi liên tục)
    refetchInterval: 1000 * 60, // Refetch mỗi phút
  });
};

/**
 * Mutation tạo mới một bản ghi đặt bàn
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => createBooking(data),
    onSuccess: () => {
      // Làm mới danh sách booking sau khi tạo thành công
      queryClient.invalidateQueries(['my-bookings']);
    },
  });
};
