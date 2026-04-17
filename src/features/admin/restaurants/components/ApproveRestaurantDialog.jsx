import React from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../../../shared/ui/ConfirmDialog';
import { ShieldCheck, Lock, Unlock, AlertTriangle } from 'lucide-react';

/**
 * @file ApproveRestaurantDialog.jsx
 * @description Dialog xác nhận cho các hành động quản trị nhà hàng:
 * Duyệt (Approve), Tạm ngừng (Suspend), Mở khóa (Activate).
 */
const ApproveRestaurantDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  restaurant, 
  actionType = 'approve', 
  loading = false 
}) => {
  const { t } = useTranslation();

  if (!restaurant) return null;

  const getConfig = () => {
    switch (actionType) {
      case 'approve':
        return {
          title: t('admin.restaurants.dialog.approve_title'),
          message: (
            <div className="space-y-3">
              <p>{t('admin.restaurants.dialog.approve_desc', { name: restaurant.name })}</p>
              <div className="p-3 bg-violet-50 rounded-xl border border-violet-100 flex gap-3 text-violet-700 text-xs font-medium">
                <ShieldCheck size={18} className="flex-shrink-0" />
                <p>Hệ thống sẽ tự động khởi tạo Ví điện tử cho nhà hàng này để bắt đầu nhận doanh thu.</p>
              </div>
            </div>
          ),
          type: 'confirm',
          confirmText: t('admin.restaurants.actions.approve'),
        };
      case 'suspend':
        return {
          title: t('admin.restaurants.dialog.suspend_title'),
          message: (
            <div className="space-y-3">
              <p>{t('admin.restaurants.dialog.suspend_desc', { name: restaurant.name })}</p>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex gap-3 text-rose-700 text-xs font-medium">
                <AlertTriangle size={18} className="flex-shrink-0" />
                <p>Nhà hàng sẽ bị ẩn hoàn toàn khỏi kết quả tìm kiếm và không thể nhận thêm bất kỳ lượt đặt chỗ mới nào.</p>
              </div>
            </div>
          ),
          type: 'danger',
          confirmText: t('admin.restaurants.actions.suspend'),
        };
      case 'activate':
        return {
          title: t('admin.restaurants.dialog.activate_title'),
          message: (
            <div className="space-y-3">
              <p>{t('admin.restaurants.dialog.activate_desc', { name: restaurant.name })}</p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3 text-emerald-700 text-xs font-medium">
                <Unlock size={18} className="flex-shrink-0" />
                <p>Nhà hàng sẽ xuất hiện lại trên ứng dụng. Chủ sở hữu sẽ nhận được email thông báo mở khóa.</p>
              </div>
            </div>
          ),
          type: 'confirm',
          confirmText: t('admin.restaurants.actions.activate'),
        };
      default:
        return {};
    }
  };

  const config = getConfig();

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={config.title}
      message={config.message}
      type={config.type}
      confirmText={config.confirmText}
      cancelText={t('admin.restaurants.dialog.cancel')}
      isLoading={loading}
    />
  );
};

export default ApproveRestaurantDialog;
