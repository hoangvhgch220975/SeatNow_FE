import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '@/config/routes.js';
import RestaurantStatusBadge from './RestaurantStatusBadge';
import { motion } from 'framer-motion';

/**
 * @file RestaurantCard.jsx
 * @description Thành phần thẻ hiển thị thông tin tóm tắt của một nhà hàng cho Owner Dashboard.
 */
const RestaurantCard = ({ restaurant }) => {
  const { 
    id, 
    name, 
    images, 
    status, 
    ratingAvg, 
    cuisineTypes, 
    address 
  } = restaurant || {};

  const isSuspended = status?.toLowerCase() === 'suspended';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100/50 flex flex-col h-full ${
        isSuspended ? 'opacity-70 grayscale-[0.5]' : 'hover:translate-y-[-6px]'
      }`}
    >
      {/* Media Content */}
      <div className={`h-56 relative overflow-hidden bg-slate-50 ${isSuspended ? 'grayscale' : ''}`}>
        {images?.length > 0 ? (
          <img 
            src={images[0]} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
            <span className="material-symbols-outlined text-5xl">restaurant</span>
            <p className="text-[10px] font-black uppercase mt-2 opacity-40">No Image Preview</p>
          </div>
        )}
        
        {/* Status Overlay */}
        <div className="absolute top-6 right-6">
           <RestaurantStatusBadge status={status} />
        </div>
        
        {/* Rating Floating Chip */}
        <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10 shadow-xl">
           <span className="material-symbols-outlined text-amber-400 text-sm">star</span>
           <span className="text-white text-xs font-black tracking-tight">{ratingAvg || '0.0'}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-8 flex flex-col flex-1 gap-6">
        <div className="space-y-1.5">
          <h4 className={`text-2xl font-black leading-tight transition-colors ${
            isSuspended ? 'text-slate-400' : 'text-slate-900 group-hover:text-violet-600'
          }`}>
            {name || 'Unnamed Venue'}
          </h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-start gap-2 opacity-80 leading-relaxed">
            <span className="material-symbols-outlined text-[14px] mt-0.5">location_on</span>
            <span>{address || 'Location data pending...'}</span>
          </p>
        </div>

        {/* Highlight Score: Chỉ giữ điểm hài lòng */}
        <div className={`p-5 rounded-[2rem] border flex items-center justify-between transition-colors ${
          isSuspended 
            ? 'bg-slate-50 border-slate-100' 
            : 'bg-emerald-50/30 border-emerald-100/50 group-hover:bg-emerald-50'
        }`}>
           <div className="space-y-1">
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                isSuspended ? 'text-slate-400' : 'text-emerald-600/60'
              }`}>Customer Satisfaction</p>
              <div className="flex items-center gap-2">
                 <span className={`text-2xl font-black ${
                   isSuspended ? 'text-slate-400' : 'text-emerald-600'
                 }`}>{(ratingAvg * 20).toFixed(0)}%</span>
                 {!isSuspended && (
                   <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest border-l border-emerald-200 pl-2">Peak</span>
                 )}
              </div>
           </div>
           <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm border transition-transform ${
             isSuspended 
              ? 'bg-white text-slate-300 border-slate-100' 
              : 'bg-white text-emerald-500 border-emerald-100/50 group-hover:scale-110'
           }`}>
              <span className="material-symbols-outlined text-[24px]">verified</span>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
           <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Primary Cuisine</span>
              <span className={`text-xs font-black ${isSuspended ? 'text-slate-400' : 'text-slate-700'}`}>
                {cuisineTypes?.[0] || 'Premium Experience'}
              </span>
           </div>
        </div>

        <div className="mt-auto pt-2">
          {isSuspended ? (
            <div 
              className="w-full h-14 rounded-2xl flex items-center justify-center gap-4 bg-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] cursor-not-allowed"
              title="This venue is currently suspended and cannot be managed."
            >
              Management Locked
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </div>
          ) : (
            <Link 
              to={ROUTES.WORKSPACE_DASHBOARD(id)}
              className="w-full h-14 rounded-2xl flex items-center justify-center gap-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-violet-600 hover:shadow-2xl hover:shadow-violet-200 transition-all active:scale-95 group/btn"
            >
              Manage Dashboard
              <span className="material-symbols-outlined text-[20px] group-hover/btn:translate-x-1 transition-transform">arrow_right_alt</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
