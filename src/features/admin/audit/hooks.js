import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { auditAdminApi } from './api.js';
import { toast } from 'react-hot-toast';

/**
 * @file hooks.js
 * @description Hooks quản lý các yêu cầu kiểm duyệt Admin.
 */

// Lấy danh sách Leads chờ duyệt
export const useAuditLeads = () => {
  return useQuery({
    queryKey: ['admin', 'audit', 'leads'],
    queryFn: async () => {
      const response = await auditAdminApi.getLeads();
      return response.data || {};
    },
    staleTime: 1 * 60 * 1000,
  });
};

// Lấy danh sách Nhà hàng chờ duyệt hồ sơ
export const useAuditVenues = () => {
  return useQuery({
    queryKey: ['admin', 'audit', 'venues'],
    queryFn: async () => {
      const response = await auditAdminApi.getPendingVenues();
      return response.data || {};
    },
    staleTime: 1 * 60 * 1000,
  });
};

// Các hành động Kiểm duyệt
export const useAuditActions = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Duyệt Lead (Owner account)
  const approveLead = useMutation({
    mutationFn: (id) => auditAdminApi.approveLead(id),
    onMutate: async (id) => {
      const promise = auditAdminApi.approveLead(id);
      toast.promise(promise, {
        loading: t('admin.toasts.processing') || 'Processing...',
        success: t('admin.toasts.approve_success') || 'Partner approved successfully!',
        error: t('admin.toasts.approve_error') || 'Failed to approve partner',
      });
      return promise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'audit', 'leads'] });
    },
  });

  const rejectLeadMutation = useMutation({
    mutationFn: (id) => auditAdminApi.rejectLead(id),
    onMutate: async (id) => {
      const promise = auditAdminApi.rejectLead(id);
      toast.promise(promise, {
        loading: t('admin.toasts.processing') || 'Processing...',
        success: t('admin.toasts.reject_success') || 'Request rejected',
        error: t('admin.toasts.reject_error') || 'Failed to reject request',
      });
      return promise;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t('admin.toasts.error_generic'));
    }
  });

  // Duyệt Hồ sơ nhà hàng (Venue)
  const approveVenue = useMutation({
    mutationFn: (id) => auditAdminApi.approveVenue(id),
    onSuccess: () => {
      toast.success(t('admin.toasts.approve_venue_success'));
      queryClient.invalidateQueries({ queryKey: ['admin', 'audit'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'restaurants'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t('admin.toasts.error_generic'));
    }
  });

  return {
    approveLead: approveLead.mutate,
    isApprovingLead: approveLead.isPending,
    approveVenue: approveVenue.mutate,
    isApprovingVenue: approveVenue.isPending,
  };
};
