import { apiClient as axiosInstance } from '@/lib/axios.js';

/**
 * @file api.js (Payment Feature)
 * @description Các lời gọi API quản lý thanh toán tiền cọc.
 */

/**
 * Tạo mã QR thanh toán Momo cho đơn đặt bàn.
 * @param {string} bookingId - ID của booking.
 * @param {number} amount - Số tiền cần thanh toán.
 */
export const generateMomoQR = async (bookingId, amount) => {
  const response = await axiosInstance.post('/payment/deposit/generate-qr', {
    bookingId,
    amount
  });
  // Giả định backend trả về { qrCodeUrl, qrData, transactionId }
  return response?.data || response;
};

/**
 * Kiểm tra trạng thái của một giao dịch thanh toán.
 * @param {string} transactionId - ID giao dịch cần kiểm tra.
 */
export const getTransactionStatus = async (transactionId) => {
  const response = await axiosInstance.get(`/payment/transaction/${transactionId}`);
  // Trả về { status: 'PENDING' | 'SUCCESS' | 'FAILED', ... }
  return response?.data || response;
};
