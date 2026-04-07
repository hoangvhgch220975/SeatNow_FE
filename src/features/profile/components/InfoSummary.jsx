import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateTime } from '@/shared/utils/formatDateTime.js';
import InfoCard from './InfoCard.jsx';

/**
 * @file InfoSummary.jsx
 * @description Card tổng hợp các trường thông tin chi tiết (Bento Box).
 * Giữ nguyên cấu trúc các InfoCard đã thiết kế từ trước.
 */
const InfoSummary = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white/50 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-slate-200/60 shadow-soft flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
          {t('profile.summary.title')}
        </h2>
        <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">info</span>
      </div>


      
      {/* Lưới các thẻ thông tin - Hiển thị mỗi trường 1 dòng (Full width) */}
      <div className="space-y-4">
        {/* ID Signature - Mã định danh cấp cao */}
        <InfoCard 
          label={t('profile.summary.id_label')}
          value={user?.id} 
          icon="fingerprint" 
          color="bg-slate-900 text-white" 
        />
        
        {/* Official Email Address */}
        <InfoCard 
          label={t('profile.summary.email_label')}
          value={user?.email} 
          icon="alternate_email" 
          color="bg-violet-50 text-violet-500" 
        />

        {/* Direct Contact */}
        <InfoCard 
          label={t('profile.summary.phone_label')}
          value={user?.phone || t('profile.summary.not_provided')}
          icon="call" 
          color="bg-rose-50 text-rose-500" 
        />

        {/* Verification Protocol Status */}
        <InfoCard 
          label={t('profile.summary.protocol_label')}
          value={t('profile.summary.status_active')} 
          icon="verified_user" 
          color="bg-emerald-50 text-emerald-500" 
        />

        {/* System Registration Date */}
        <InfoCard 
          label={t('profile.summary.reg_date_label')}
          value={user?.createdAt ? formatDateTime(user?.createdAt) : 'N/A'} 
          icon="auto_awesome" 
          color="bg-amber-50 text-amber-500" 
        />
      </div>

      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] pt-4 text-center border-t border-slate-50 italic">
        {t('profile.summary.encrypted_storage')}
      </p>
    </div>
  );
};

export default InfoSummary;
