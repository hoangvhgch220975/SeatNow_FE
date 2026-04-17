import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { restaurantAdminApi } from './api.js';
import { toast } from 'react-hot-toast';

/**
 * @file hooks.js
 * @description React Query hooks cho quản lý vận hành nhà hàng Admin.
 */

// Hook lấy danh sách nhà hàng đang hoạt động (kèm bộ lọc)
export const useAdminRestaurants = (params = {}) => {
  return useQuery({
    queryKey: ['admin', 'restaurants', 'list', params],
    queryFn: async () => {
      const response = await restaurantAdminApi.getAll(params);
      return response.data?.data || response.data || [];
    },
    staleTime: 2 * 60 * 1000,
  });
};

// Hook xử lý các hành động Vận hành (Suspend/Activate)
export const useRestaurantActions = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Tạm ngừng nhà hàng
  const suspendMutation = useMutation({
    mutationFn: (id) => restaurantAdminApi.suspend(id),
    onSuccess: () => {
      toast.success(t('admin.toasts.suspend_success'));
      queryClient.invalidateQueries({ queryKey: ['admin', 'restaurants'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t('admin.toasts.error_generic'));
    }
  });

  // Mở khóa nhà hàng
  const activateMutation = useMutation({
    mutationFn: (id) => restaurantAdminApi.activate(id),
    onSuccess: () => {
      toast.success(t('admin.toasts.activate_success'));
      queryClient.invalidateQueries({ queryKey: ['admin', 'restaurants'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t('admin.toasts.error_generic'));
    }
  });

  return {
    suspend: suspendMutation.mutate,
    isSuspending: suspendMutation.isPending,
    activate: activateMutation.mutate,
    isActivating: activateMutation.isPending
  };
};
