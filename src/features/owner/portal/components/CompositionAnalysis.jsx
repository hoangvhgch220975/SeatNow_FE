import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * @file CompositionAnalysis.jsx
 * @description Thành phần Bento Grid hiển thị phân tích cơ cấu khách hàng (Cặp đôi, Nhóm nhỏ, Đại tiệc).
 */
const CompositionAnalysis = ({ guestSizeCounts }) => {
  const { t } = useTranslation();
  const { 
    couple = 0, 
    smallGroup = 0, 
    party = 0, 
    percentCouple = 0, 
    percentSmallGroup = 0, 
    percentParty = 0 
  } = guestSizeCounts || {};

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1.5 rounded-full bg-slate-900"></div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t('owner_portal.overview.guest_composition_title')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full lg:h-[240px]">
        {/* Couple Card (Primary Bento) */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative flex flex-col justify-between overflow-hidden group hover:scale-[1.02] transition-all duration-500">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[100px]">people</span>
           </div>
           
           <div className="flex items-center justify-between relative z-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('owner_portal.overview.composition_couples')}</p>
              <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20">
                 {t('owner_portal.overview.dominant_peak')}
              </div>
           </div>
           
           <div className="relative z-10">
              <p className="text-5xl font-black">{percentCouple.toFixed(0)}%</p>
              <p className="text-xs font-bold text-slate-400 mt-1 opacity-80 uppercase tracking-wider">{t('owner_portal.overview.bookings_recorded', { count: couple })}</p>
           </div>
        </div>

        {/* Small Group Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 group">
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined">group</span>
              </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('owner_portal.overview.composition_small')}</p>
                  <p className="text-2xl font-black text-slate-900">{percentSmallGroup.toFixed(0)}%</p>
               </div>
           </div>
           <div className="w-full bg-slate-50 h-2 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentSmallGroup}%` }}
                className="h-full bg-indigo-500" 
              />
           </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2">{t('owner_portal.overview.small_groups_desc', { count: smallGroup })}</p>
        </div>

        {/* Large Party Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 group">
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined">groups</span>
              </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('owner_portal.overview.composition_large')}</p>
                  <p className="text-2xl font-black text-slate-900">{percentParty.toFixed(0)}%</p>
               </div>
           </div>
           <div className="w-full bg-slate-50 h-2 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentParty}%` }}
                className="h-full bg-rose-500" 
              />
           </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2">{t('owner_portal.overview.large_parties_desc', { count: party })}</p>
        </div>
      </div>
    </section>
  );
};

export default CompositionAnalysis;
