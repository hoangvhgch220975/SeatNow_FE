import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @file LoyaltyCard.jsx
 * @description Thẻ hiển thị điểm thưởng (Loyalty Points) màu Vàng Gold sang trọng. Hỗ trợ đa ngôn ngữ.
 */
const LoyaltyCard = ({ points }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-10 rounded-[3rem] shadow-xl shadow-amber-900/10 flex flex-col justify-between items-center text-center relative overflow-hidden group border-2 border-amber-300/60 h-full min-h-[300px] hover:scale-[1.02] transition-all duration-500 cursor-default">
      {/* Decorative Icon Background (Vietnamese comment) */}
      <div className="absolute -right-8 -bottom-8 opacity-15 transform group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-1000">
        <span className="material-symbols-outlined text-[10rem]">military_tech</span>
      </div>
      
      <div className="relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-6 block">
          {t('profile.loyalty.total_rewards')}
        </span>
        <div className="text-6xl font-black mt-2 tracking-tighter drop-shadow-sm">
          {points?.toLocaleString() || 0}
        </div>
        <div className="text-sm font-black opacity-90 mt-2 flex items-center gap-2">
           <span className="material-symbols-outlined text-[18px]">stars</span>
           {t('profile.loyalty.points_label')}
        </div>
      </div>
      
      {/* Footer text for consistency (Vietnamese comment) */}
      <div className="mt-8 relative z-10">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] border-t border-white/20 pt-4 inline-block">
          {t('profile.loyalty.premium_protocol')}
        </p>
      </div>
    </div>
  );
};


export default LoyaltyCard;
