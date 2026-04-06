import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ROUTES } from '@/config/routes.js';

/**
 * @file TopVenuesList.jsx
 * @description Hiển thị danh sách các nhà hàng hoạt động tốt nhất dưới dạng Card (Dọc).
 */
const TopVenuesList = ({ restaurants, isLoading }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('vi-VN', { 
      maximumFractionDigits: 0 
    }).format(val || 0) + ' đ';
  };

  // Sắp xếp theo Doanh thu (Revenue) từ cao xuống thấp, lấy tối đa 5 nhà hàng (Vietnamese comment)
  const sortedVenues = [...restaurants]
    .sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0))
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-slate-50 animate-pulse rounded-[2.5rem]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedVenues.map((venue, idx) => {
        const revenue = Math.floor(Math.random() * 50000000) + 10000000; // Mock mệu minh họa
        const isTop = idx === 0;

        return (
          <motion.div 
            key={venue.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group flex items-center p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-violet-100 transition-all cursor-pointer relative overflow-hidden"
          >
            {/* Image Box */}
            <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-500">
               {venue.images?.[0] ? (
                 <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <span className="material-symbols-outlined text-2xl">restaurant</span>
                 </div>
               )}
            </div>

            {/* Info Box */}
            <div className="ml-6 flex-1 space-y-2">
               <h4 className="font-black text-slate-900 text-lg tracking-tight group-hover:text-violet-600 transition-colors uppercase">
                 {venue.name}
               </h4>
               <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 tracking-[0.2em]">
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100/50 uppercase">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {venue.ratingAvg || '5.0'}
                  </div>
                  <span className="uppercase">{venue.cuisineTypes?.[0] || 'Premium'}</span>
               </div>
            </div>

            {/* Performance Stats */}
            <div className="text-right flex flex-col justify-center gap-1">
               <p className="font-black text-slate-900 leading-tight">
                 {/* Sử dụng doanh thu thực tế từ Backend (Vietnamese comment) */}
                 {formatCurrency(venue.totalRevenue).replace(' đ', '')} <span className="text-[10px] text-slate-400">đ</span>
               </p>
               <p className={`text-[10px] font-black uppercase tracking-widest ${isTop ? 'text-emerald-500' : 'text-slate-400'}`}>
                 {venue.totalBookings || 0} Bookings
               </p>
            </div>

            {/* Rank Bubble */}
            <div className="absolute top-2 right-4 text-[40px] font-black text-slate-50 opacity-[0.05] pointer-events-none group-hover:opacity-10 transition-opacity">
               #{idx + 1}
            </div>
          </motion.div>
        );
      })}
      
      {/* Footer Secondary Action */}
      <Link 
        to={ROUTES.OWNER_RESTAURANTS}
        className="block w-full py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 hover:bg-violet-50 transition-all border border-dashed border-slate-200 rounded-[2rem] text-center"
      >
         View Full Portfolio Stack
      </Link>
    </div>
  );
};

export default TopVenuesList;
