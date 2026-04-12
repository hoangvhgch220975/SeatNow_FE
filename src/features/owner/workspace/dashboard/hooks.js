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

  // 2.1 Thống kê cho ngày cụ thể (Dùng cho Guest Analysis đồng bộ với Booking Volume) (Vietnamese comment)
  const dailyStatsSummary = useQuery({
    queryKey: ['workspace', 'stats', 'summary', 'daily', actualId, hourlyParams],
    queryFn: () => workspaceDashboardApi.getStatsSummary(actualId, hourlyParams),
    enabled: !!(actualId && restaurantData),
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

  // 5. Danh sách lượt đặt gần đây (Dùng cho bảng Activity)
  const recentBookings = useQuery({
    queryKey: ['workspace', 'bookings', 'recent', actualId],
    queryFn: () => workspaceDashboardApi.getBookings(actualId, { 
      limit: 9,
      sort: 'DESC'
    }),
    enabled: !!(actualId && restaurantData),
  });

  // 6. Toàn bộ danh sách đặt bàn trong ngày (Dùng cho Sơ đồ bàn - Floor Plan)
  const dayBookings = useQuery({
    queryKey: ['workspace', 'bookings', 'day', actualId, hourlyParams.from],
    queryFn: () => workspaceDashboardApi.getBookings(actualId, {
      from: hourlyParams.from,
      to: hourlyParams.to
    }),
    enabled: !!(actualId && restaurantData),
    refetchInterval: 2000, // Tăng tốc độ làm mới lên 2 giây theo yêu cầu để phản hồi tức thì (Vietnamese comment)
  });

  // 7. Sơ đồ bàn (Tables) (Vietnamese comment)
  const floorPlan = useQuery({
    queryKey: ['workspace', 'tables', actualId],
    queryFn: () => workspaceDashboardApi.getTables(actualId),
    enabled: !!(actualId && restaurantData),
    refetchInterval: 2000, // Đồng bộ làm mới cùng với bookings (Vietnamese comment)
  });

  return {
    restaurant: restaurantData,
    stats: extractData(statsSummary),
    dailyStats: extractData(dailyStatsSummary),
    revenue: extractData(revenueStats),
    hourly: extractData(hourlyStats),
    recentBookings: extractData(recentBookings),
    dayBookings: extractData(dayBookings),
    tables: extractData(floorPlan),
    isLoading: 
      restaurantDetail.isLoading || 
      statsSummary.isLoading || 
      dailyStatsSummary.isLoading ||
      recentBookings.isLoading ||
      dayBookings.isLoading ||
      floorPlan.isLoading,
    isStatsLoading: revenueStats.isLoading || hourlyStats.isLoading,
    isError: restaurantDetail.isError || statsSummary.isError || dailyStatsSummary.isError,
    refetch: () => {
      restaurantDetail.refetch();
      statsSummary.refetch();
      dailyStatsSummary.refetch();
      revenueStats.refetch();
      hourlyStats.refetch();
      recentBookings.refetch();
      dayBookings.refetch();
      floorPlan.refetch();
    }
  };
};
