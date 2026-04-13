import React from 'react';
import { create } from 'zustand';
import { apiClient } from '../../lib/axios';
import { connectNotificationSocket, bookingSocket, disconnectSockets } from '../../lib/socket';
import toast from 'react-hot-toast';
import { queryClient } from '../../lib/queryClient';

/**
 * @file useNotificationStore.js
 * @description Quản lý trạng thái thông báo toàn ứng dụng cho Owner (Zustand).
 * Kết hợp Hybrid: REST API fetch lịch sử + Socket.IO realtime.
 */

/**
 * Danh sách các Event cụ thể từ Backend
 */
const NOTIFICATION_EVENTS = [
  'notification', // Fallback event chung
  'BOOKING_NEW',
  'BOOKING_CONFIRMED',
  'BOOKING_CANCELLED',
  'BOOKING_NO_SHOW',
  'TRANSACTION_DEPOSIT',
  'TRANSACTION_TOPUP',
  'TRANSACTION_WITHDRAW_APPROVED',
  'REVIEW_NEW',
  'COMMISSION_SETTLED'
];

const useNotificationStore = create((set, get) => ({
  activities: [],
  unreadCount: 0,
  total: 0,
  isLoading: false,
  isSocketConnected: false,

  /**
   * Helper: Trích xuất restaurantId từ metadata đa cấu trúc
   */
  extractRestaurantId: (payload) => {
    return payload.restaurantId || 
           payload.data?.booking?.restaurantId || 
           payload.metadata?.booking?.restaurantId || 
           payload.data?.restaurant?.id || 
           payload.metadata?.restaurant?.id;
  },

  /**
   * Tải danh sách thông báo offline từ Database
   * Thực hiện Smart Merge để không làm mất thông báo realtime vừa nhận
   */
  fetchActivities: async (params = { limit: 20, offset: 0 }) => {
    set({ isLoading: true });
    try {
      const res = await apiClient.get('/owner/activity', { params });
      if (res.success) {
        const serverItems = res.data.items || [];
        const currentActivities = get().activities;

        // 1. Chuẩn hóa dữ liệu từ Server (Trích xuất restaurantId ra ngoài cùng)
        const normalizedServerItems = serverItems.map(item => ({
          ...item,
          restaurantId: get().extractRestaurantId(item)
        }));

        // 2. Smart Merge sử dụng Map để tránh trùng lặp ID
        const mergedMap = new Map();
        
        // Ưu tiên dữ liệu từ Server vì nó có ID chính thức và trạng thái chuẩn
        normalizedServerItems.forEach(item => mergedMap.set(item.id, item));
        
        // Giữ lại các thông báo realtime trong bộ nhớ mà Server chưa kịp trả về
        currentActivities.forEach(item => {
          if (!mergedMap.has(item.id)) {
            mergedMap.set(item.id, item);
          }
        });

        // 3. Chuyển về mảng và sắp xếp theo thời gian mới nhất
        const finalActivities = Array.from(mergedMap.values())
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        set({
          activities: finalActivities,
          unreadCount: res.data.unreadCount || 0,
          total: res.data.total || 0,
        });
      }
    } catch (error) {
      console.error('❌ Failed to fetch notifications:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Khởi tạo kết nối Socket và lắng nghe sự kiện
   */
  initNotificationSocket: (userId, role, token) => {
    if (get().isSocketConnected) return;

    console.log('🔗 [Notification Store] Initializing sockets for user:', userId);

    const socket = connectNotificationSocket(userId, role, token);
    const bSocket = bookingSocket;

    const handleIncomingNotification = (payload, eventName) => {
      console.log(`🔔 [Realtime Event Received: ${eventName}]:`, payload);
      
      const restaurantId = get().extractRestaurantId(payload);
      
      let restaurantName = payload.restaurantName || payload.data?.restaurantName || payload.metadata?.restaurant?.name || '';

      // Tự động truy vấn tên nhà hàng từ Cache nếu chưa có trong payload (Vietnamese comment)
      if (!restaurantName && restaurantId) {
        const queriesData = queryClient.getQueriesData({ queryKey: ['owner', 'restaurants'] });
        for (const [_, data] of queriesData) {
          const restaurants = data?.data || data?.items || data;
          if (Array.isArray(restaurants)) {
            const found = restaurants.find(r => r.id === restaurantId);
            if (found) {
              restaurantName = found.name;
              break;
            }
          }
        }
      }

      // Import component Toast và hiển thị (Sử dụng React.createElement để tránh lỗi JSX trong file .js) (Vietnamese comment)
      import('./../components/Notifications/NotificationToast').then((module) => {
        const NotificationToast = module.default;
        toast.custom((t) => React.createElement(NotificationToast, { 
          t, 
          payload, 
          eventName, 
          restaurantName 
        }), { duration: 3000, position: 'top-right' });
      });

      set((state) => {
        const exists = state.activities.some(a => a.id === payload.id);
        if (exists) return state;

        const newActivity = {
          id: payload.id || `rt-${Date.now()}`,
          type: payload.event || payload.type || eventName,
          title: payload.title || eventName.replace(/_/g, ' '),
          message: payload.message || '',
          isRead: false,
          metadata: payload.data || payload.metadata,
          restaurantId: restaurantId,
          createdAt: new Date().toISOString(),
        };

        return {
          activities: [newActivity, ...state.activities],
          unreadCount: state.unreadCount + 1,
        };
      });
    };

    // Đăng ký đồng loạt các event từ danh sách
    NOTIFICATION_EVENTS.forEach(eventName => {
      socket.off(eventName);
      socket.on(eventName, (payload) => handleIncomingNotification(payload, eventName));
      
      if (bSocket) {
        bSocket.off(eventName);
        bSocket.on(eventName, (payload) => handleIncomingNotification(payload, eventName));
      }
    });

    set({ isSocketConnected: true });
  },

  /**
   * Đóng kết nối socket (gọi khi logout)
   */
  cleanupSocket: () => {
    disconnectSockets();
    set({ isSocketConnected: false });
  },

  /**
   * Đánh dấu 1 thông báo là đã đọc
   */
  markAsRead: async (activityId) => {
    try {
      // Cập nhật UI ngay lập tức (Optimistic Update)
      set((state) => ({
        activities: state.activities.map((item) =>
          item.id === activityId ? { ...item, isRead: true } : item
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));

      // Gọi API đồng bộ
      await apiClient.put(`/owner/activity/${activityId}/read`);
    } catch (error) {
      // Nếu lỗi thì fallback (có thể fetch lại hoặc giữ nguyên tùy ux)
      console.error('❌ Failed to mark notification as read:', error);
    }
  },

  /**
   * Đánh dấu toàn bộ là đã đọc
   */
  markAllAsRead: async () => {
    try {
      const { unreadCount } = get();
      if (unreadCount === 0) return;

      // Optimistic Update
      set((state) => ({
        activities: state.activities.map((item) => ({ ...item, isRead: true })),
        unreadCount: 0,
      }));

      // API call
      await apiClient.put('/owner/activity/read-all');
    } catch (error) {
      console.error('❌ Failed to mark all as read:', error);
    }
  },
}));

export default useNotificationStore;
