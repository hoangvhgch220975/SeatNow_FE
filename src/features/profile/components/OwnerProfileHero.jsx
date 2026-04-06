import React from 'react';
import { motion } from 'framer-motion';

/**
 * @file OwnerProfileHero.jsx
 * @description Thành phần thẻ thông tin chính dành riêng cho Chủ nhà hàng.
 * Tối ưu thiết kế cho phong cách Business: sắc sảo, tối giản và chuyên nghiệp.
 */
const OwnerProfileHero = ({ user, avatarUrl, onEdit, tier }) => {
  // Logic dự phòng nếu tier không được truyền xuống
  const defaultTier = { label: 'Corporate Partner', icon: 'workspace_premium', color: 'text-violet-600 bg-violet-50 border-violet-100' };
  const activeTier = tier || defaultTier;

  return (
    <div className="w-full bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col items-center md:items-start md:flex-row gap-12 relative overflow-hidden group">
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-40"></div>

      {/* Profile Avatar with High-End Frame */}
      <div className="relative w-48 h-48 rounded-[2.5rem] overflow-hidden shadow-2xl ring-4 ring-white transition-transform duration-700 group-hover:scale-105 flex-shrink-0 z-10">
          <img 
            src={avatarUrl} 
            alt={user?.fullName || user?.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
      </div>

      {/* Information Details Section */}
      <div className="flex-1 text-center md:text-left pt-2 relative z-10">
         <div className="inline-flex items-center gap-3 bg-slate-900 px-5 py-2 rounded-2xl border border-slate-800 mb-8 shadow-xl">
            <span className="material-symbols-outlined text-[16px] text-amber-400 animate-pulse">verified_user</span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">Verified Principal Partner</span>
         </div>

         <div className="space-y-3 mb-10">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
               {user?.fullName || user?.name || 'Partner Executive'}<span className="text-violet-600">.</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
               <p className="text-slate-400 font-bold uppercase tracking-[0.1em] text-xs">
                  Executive License ID: <span className="text-violet-600 font-black">SNW-{user?.id?.slice(0, 8) || '2026-SYS'}</span>
               </p>
               <span className="hidden md:block w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{user?.email}</p>
            </div>
         </div>

         <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-3 px-8 py-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-100 shadow-sm transition-all hover:bg-emerald-100/50">
               <span className="material-symbols-outlined text-[20px]">verified</span>
               Active System Integrity
            </div>
            
            {/* Dynamic Membership Tier Tag */}
            <div className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest border shadow-sm transition-all ${activeTier.color}`}>
               <span className="material-symbols-outlined text-[20px]">{activeTier.icon}</span>
               Partner Tier: <span className="ml-1 opacity-80">{activeTier.label}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OwnerProfileHero;
