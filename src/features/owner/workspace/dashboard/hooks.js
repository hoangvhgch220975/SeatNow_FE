import { useQuery } from '@tanstack/react-query';
import { workspaceDashboardApi } from './api';

/**
 * @hook useWorkspaceDashboard
 * @description Hook quản lý dữ liệu cho trang Overview của từng nhà hàng.
 * @param {string} id - ID nhà hàng
 * @param {Object} revenueParams - Các tham số cho thống kê doanh thu
 */
export const useWorkspaceDashboard = (id, revenueParams = { period: 'month' }, hourlyParams = { period: 'day' }) => {
  // Rút trích dữ liệu (Helper)
  const extractData = (query) => {
    if (query.isError || !query.data) return null;
    const raw = query.data;
    // Hỗ trợ trường hợp BE bọc trong { data: ... } hoặc trả về trực tiếp
    if (raw && typeof raw === 'object' && 'data' in raw && !Array.isArray(raw)) {
      return raw.data;
    }
    return raw;
  };

  // 1. Thông tin cơ bản nhà hàng (gọi Restaurant Service, hỗ trợ Slug)
  const restaurantDetail = useQuery({
    queryKey: ['workspace', 'restaurant', id],
    queryFn: () => workspaceDashboardApi.getRestaurantDetail(id),
    enabled: !!id,
  });

  // Cần chạy tuần tự: Phải có UID thực tế (actualId) mới được gọi sang Booking Service (Vietnamese comment)
  const restaurantData = extractData(restaurantDetail);
  const actualId = restaurantData?.id || restaurantData?._id || id;

  // 2. Thống kê KPI (Summary) (Gọi Booking Service, yêu cầu UUID) (Vietnamese comment)
  const statsSummary = useQuery({
    queryKey: ['workspace', 'stats', 'summary', actualId, revenueParams],
    queryFn: () => workspaceDashboardApi.getStatsSummary(actualId, revenueParams),
    enabled: !!(actualId && restaurantData), // Chỉ gọi khi đã có data (Vietnamese comment)
  });

  // 3. Thống kê doanh thu
  const revenueStats = useQuery({
    queryKey: ['workspace', 'stats', 'revenue', actualId, revenueParams],
    queryFn: () => workspaceDashboardApi.getRevenueStats(actualId, revenueParams),
    enabled: !!(actualId && restaurantData),
  });

  // 4. Thống kê giờ vàng (Vietnamese comment)
  const hourlyStats = useQuery({
    queryKey: ['workspace', 'stats', 'hourly', actualId, hourlyParams],
    queryFn: () => workspaceDashboardApi.getHourlyStats(actualId, hourlyParams),
    enabled: !!(actualId && restaurantData),
  });

  // 5. Danh sách lượt đặt gần đây
  const recentBookings = useQuery({
    queryKey: ['workspace', 'bookings', 'recent', actualId],
    queryFn: () => workspaceDashboardApi.getBookings(actualId, { 
      limit: 9,
      sort: 'DESC'
    }),
    enabled: !!(actualId && restaurantData),
  });

  // 6. Sơ đồ bàn (Tables) - Có thể gọi bằng Slug
  const floorPlan = useQuery({
    queryKey: ['workspace', 'tables', id],
    queryFn: () => workspaceDashboardApi.getTables(id),
    enabled: !!id,
  });

  return {
    restaurant: restaurantData,
    stats: extractData(statsSummary),
    revenue: extractData(revenueStats),
    hourly: extractData(hourlyStats),
    bookings: extractData(recentBookings),
    tables: extractData(floorPlan),
    isLoading: 
      restaurantDetail.isLoading || 
      statsSummary.isLoading || 
      recentBookings.isLoading,
    isStatsLoading: revenueStats.isLoading || hourlyStats.isLoading,
    isError: restaurantDetail.isError || statsSummary.isError,
    refetch: () => {
      restaurantDetail.refetch();
      statsSummary.refetch();
      revenueStats.refetch();
      hourlyStats.refetch();
      recentBookings.refetch();
      floorPlan.refetch();
    }
  };
};
