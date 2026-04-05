import { io } from 'socket.io-client';

/**
 * @file socket.js
 * @description Quản lý kết nối Socket.IO tập trung qua Gateway (Port 7000).
 */

const SOCKET_URL = 'http://localhost:7000';

// 1. Booking Socket (Mặc định path /socket.io/)
export const bookingSocket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// 2. Notification Socket (Path riêng /notification.io/)
export const notificationSocket = io(SOCKET_URL, {
  path: '/notification.io',
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

/**
 * Helper hỗ trợ kết nối Sockets với Token xác thực
 * @param {string} token - JWT Access Token
 */
export const connectSockets = (token) => {
  // Cập nhật token cho cả 2 sockets
  bookingSocket.auth = token ? { token } : {};
  notificationSocket.auth = token ? { token } : {};

  // Thực hiện kết nối
  if (!bookingSocket.connected) bookingSocket.connect();
  if (!notificationSocket.connected) notificationSocket.connect();
};

// Lắng nghe lỗi kết nối (Giữ lại để debug)
bookingSocket.on('connect_error', (err) => {
  console.error('❌ [Booking Socket] Connection error:', err.message);
});

notificationSocket.on('connect_error', (err) => {
  console.error('❌ [Notification Socket] Connection error:', err.message);
});

/**
 * Helper ngắt kết nối toàn bộ Sockets
 */
export const disconnectSockets = () => {
  bookingSocket.disconnect();
  notificationSocket.disconnect();
};
