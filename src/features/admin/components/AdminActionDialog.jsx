import React from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../../shared/ui/ConfirmDialog';
import { ShieldCheck, Lock, Unlock, AlertTriangle, UserCheck } from 'lucide-react';

/**
 * @file AdminActionDialog.jsx
 * @description Dialog xác nhận đa năng cho các tác vụ quản trị Admin.
 */
const AdminActionDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  data, 
  type = 'approve_restaurant', 
  loading = false 
}) => {
  const { t } = useTranslation();
  const [extraValue, setExtraValue] = React.useState('');

  // Reset state mỗi khi Dialog được mở/đóng
  React.useEffect(() => {
    if (isOpen) setExtraValue('');
  }, [isOpen]);

  if (!data) return null;

  const getConfig = () => {
    switch (type) {
      case 'approve_restaurant':
        return {
          title: t('admin.restaurants.dialog.approve_title'),
          message: (
            <div className="space-y-3">
              <p>{t('admin.restaurants.dialog.approve_desc', { name: data.name })}</p>
              <div className="p-3 bg-violet-50 rounded-xl border border-violet-100 flex gap-3 text-violet-700 text-xs font-medium">
                <ShieldCheck size={18} className="flex-shrink-0" />
                <p>{t('admin.restaurants.dialog.notes.approve')}</p>
              </div>
            </div>
          ),
          type: 'confirm',
          confirmText: t('admin.restaurants.actions.approve'),
        };
      case 'suspend_restaurant':
        return {
          title: t('admin.restaurants.dialog.suspend_title'),
          message: (
            <div className="space-y-3">
              <p>{t('admin.restaurants.dialog.suspend_desc', { name: data.name })}</p>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex gap-3 text-rose-700 text-xs font-medium">
                <AlertTriangle size={18} className="flex-shrink-0" />
                <p>{t('admin.restaurants.dialog.notes.suspend')}</p>
              </div>
            </div>
          ),
          type: 'danger',
          confirmText: t('admin.restaurants.actions.suspend'),
        };
      case 'activate_restaurant':
        return {
          title: t('admin.restaurants.dialog.activate_title'),
          message: (
            <div className="space-y-3">
              <p>{t('admin.restaurants.dialog.activate_desc', { name: data.name })}</p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3 text-emerald-700 text-xs font-medium">
                <Unlock size={18} className="flex-shrink-0" />
                <p>{t('admin.restaurants.dialog.notes.activate')}</p>
              </div>
            </div>
          ),
          type: 'confirm',
          confirmText: t('admin.restaurants.actions.activate'),
        };
      case 'approve_lead':
        return {
          title: t('admin.audit.dialog.approve_title') || "Phê duyệt Đối tác mới",
          message: (
            <div className="space-y-3 font-medium">
              <p>{t('admin.audit.dialog.approve_desc', { name: data.name, restaurant: data.restaurantName })}</p>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-3 text-blue-700 text-xs">
                <ShieldCheck size={18} className="flex-shrink-0" />
                <p>{t('admin.partners.dialog.notes.reset')}</p>
              </div>
            </div>
          ),
          type: 'confirm',
          confirmText: t('admin.audit.actions.approve') || "Phê duyệt & Tạo tài khoản",
        };
      case 'delete':
        const partnerName = data.name || data.fullName || t('admin.partners.dialog.name');
        return {
          title: t('admin.partners.dialog.confirm_delete_title'),
          message: (
            <div className="space-y-3 font-medium">
              <p>{t('admin.partners.dialog.confirm_delete_message', { name: partnerName })}</p>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex gap-3 text-rose-700 text-xs">
                <AlertTriangle size={18} className="flex-shrink-0" />
                <p>{t('admin.partners.dialog.notes.delete')}</p>
              </div>
            </div>
          ),
          type: 'danger',
          confirmText: t('admin.partners.table.actions.delete'),
        };
      case 'reset':
        const resetPartnerName = data.name || data.fullName || t('admin.partners.dialog.name');
        return {
          title: t('admin.partners.dialog.confirm_reset_title'),
          message: (
            <div className="space-y-4 font-medium text-slate-600">
              <p>{t('admin.partners.dialog.confirm_reset_message', { name: resetPartnerName })}</p>
              
              {/* Optional Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Mật khẩu mới (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={extraValue}
                  onChange={(e) => setExtraValue(e.target.value)}
                  placeholder="Để trống để tự tạo ngẫu nhiên..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-mono"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 text-amber-700 text-xs text-left">
                <Lock size={18} className="flex-shrink-0" />
                <p>{t('admin.partners.dialog.notes.reset')}</p>
              </div>
            </div>
          ),
          type: 'confirm',
          confirmText: t('admin.partners.table.actions.reset') || "Reset Password",
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
      onConfirm={() => onConfirm(extraValue)}
      title={config.title}
      message={config.message}
      type={config.type}
      confirmText={config.confirmText}
      cancelText={t('admin.partners.dialog.cancel')}
      isLoading={loading}
    />
  );
};

export default AdminActionDialog;
