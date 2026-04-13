import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletApi } from './api';

/**
 * @file hooks.js
 * @description Hook quản lý state ví nhà hàng qua React Query
 */

/**
 * Hook lấy thông tin số dư ví
 */
export const useWalletBalance = (restaurantId) => {
  return useQuery({
    queryKey: ['wallet', 'balance', restaurantId],
    queryFn: () => walletApi.getWalletBalance(restaurantId),
    enabled: !!restaurantId,
  });
};

/**
 * Hook lấy lịch sử giao dịch (History)
 */
export const useWalletHistory = (restaurantId, type = '', limit = 10) => {
  return useQuery({
    queryKey: ['wallet', 'history', restaurantId, type, limit],
    queryFn: () => walletApi.getWalletHistory(restaurantId, type, limit),
    enabled: !!restaurantId,
  });
};

/**
 * Hook mutation thực hiện rút tiền
 */
export const useWithdrawFunds = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload) => walletApi.withdrawFunds(payload),
    onSuccess: (_, variables) => {
      // Invalidate balance và history để cập nhật lại số liệu sau khi rút
      queryClient.invalidateQueries({ queryKey: ['wallet', 'balance', variables.idOrSlug] });
      queryClient.invalidateQueries({ queryKey: ['wallet', 'history', variables.idOrSlug] });
    },
  });
};
