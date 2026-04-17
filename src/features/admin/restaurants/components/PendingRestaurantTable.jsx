import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Clock, ShieldCheck, XCircle, Search } from 'lucide-react';
import { formatDateTime } from '../../../../shared/utils/formatDateTime';

/**
 * @file PendingRestaurantTable.jsx
 * @description Bảng chuyên biệt cho danh sách nhà hàng đang chờ duyệt.
 * Tập trung vào thông tin liên hệ và thời gian đăng ký.
 */
const PendingRestaurantTable = ({ restaurants = [], loading, onApprove, onReject }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 bg-white rounded-3xl border border-slate-100 shadow-sm" />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center max-w-2xl mx-auto shadow-xs">
        <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="text-violet-400" size={36} />
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">
          {t('admin.restaurants.empty_pending')}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {t('admin.restaurants.subtitle')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((res) => (
        <div 
          key={res.id} 
          className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all group relative overflow-hidden flex flex-col"
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-orange-50 rounded-full blur-2xl opacity-50 group-hover:bg-violet-50 transition-colors" />

          {/* Header Info */}
          <div className="flex items-start justify-between mb-5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-100 shadow-xs">
              <img 
                src={res.coverImage || '/images/restaurant-placeholder.jpg'} 
                alt={res.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
              />
            </div>
            <div className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-100 shadow-xs">
              {t('admin.restaurants.filters.pending')}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-black text-slate-800 text-lg mb-1 group-hover:text-violet-600 transition-colors uppercase tracking-tight break-words">
              {res.name}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
              <Clock size={12} />
              {t('admin.restaurants.table.registered')}: {formatDateTime(res.createdAt)}
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="flex-grow space-y-3 mb-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group-hover:bg-violet-50/30 transition-colors">
            <div className="flex items-center gap-3 text-slate-600 group/item">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover/item:text-violet-500 transition-colors shadow-sm">
                <Mail size={14} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{t('admin.restaurants.table.owner')}</span>
                <span className="text-xs font-bold truncate">{res.ownerEmail || 'contact@partner.vn'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-600 group/item">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover/item:text-violet-500 transition-colors shadow-sm">
                <Phone size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{t('common.phone')}</span>
                <span className="text-xs font-bold">{res.ownerPhone || '090-XXX-XXXX'}</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="grid grid-cols-2 gap-3 relative z-10">
            <button
              onClick={() => onReject(res)}
              className="flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 text-xs font-black uppercase tracking-widest rounded-2xl transition-all border border-transparent hover:border-rose-100"
            >
              <XCircle size={16} />
              {t('common.cancel')}
            </button>
            <button
              onClick={() => onApprove(res)}
              className="flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 active:scale-95"
            >
              <ShieldCheck size={16} />
              {t('admin.restaurants.actions.approve')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingRestaurantTable;
