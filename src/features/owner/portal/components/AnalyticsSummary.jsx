import React from 'react';
import { motion } from 'framer-motion';

/**
 * @file AnalyticsSummary.jsx
 * @description Hiển thị các chỉ số KPI theo phong cách Executive Bento Grid (3-Column Layout).
 * @author SeatNow Executive UI Team
 */
// Component hiển thị tóm tắt phân tích (Sử dụng dữ liệu Weighted Average từ Backend)
const AnalyticsSummary = ({ stats, isLoading }) => {
  
  // Hàm định dạng tiền tệ Việt Nam (UI: English label, Logic: Vietnamese comment)
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('vi-VN', { 
      maximumFractionDigits: 0 
    }).format(val || 0) + ' đ';
  };

  // Màn hình loading phong cách Skeleton (Vietnamese comment)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 h-64 bg-slate-50 animate-pulse rounded-[3rem]" />
        <div className="md:col-span-1 h-64 bg-slate-50 animate-pulse rounded-[3rem]" />
        <div className="md:col-span-1 h-64 bg-slate-50 animate-pulse rounded-[3rem]" />
        <div className="md:col-span-1 h-64 bg-slate-50 animate-pulse rounded-[3rem]" />
        <div className="md:col-span-1 h-64 bg-slate-50 animate-pulse rounded-[3rem]" />
      </div>
    );
  }

  // Trích xuất dữ liệu từ stats (Vietnamese comment)
  const comparisons = stats?.comparisons || {};
  const avgTransaction = (stats?.totalRevenue || 0) / (stats?.totalBookings || 1);

  // Hàm hiển thị chỉ số tăng trưởng động: Green cho tăng, Red cho giảm (Vietnamese comment)
  const renderGrowth = (value, period) => {
    if (value === undefined || value === null) return null;
    const num = parseFloat(value);
    const isPositive = num > 0;
    const isNegative = num < 0;
    
    // Phân loại màu sắc và icon dựa trên giá trị (Vietnamese comment)
    const colorClass = isPositive ? 'text-emerald-500' : isNegative ? 'text-rose-500' : 'text-slate-400';
    const icon = isPositive ? 'trending_up' : isNegative ? 'trending_down' : 'trending_flat';

    return (
      <div className={`flex items-center gap-1 text-[11px] font-black ${colorClass}`}>
         <span className="material-symbols-outlined text-[16px]">{icon}</span>
         {isPositive ? `+${value}` : value}% {period}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* 1. GROSS PORTFOLIO REVENUE - THẺ HERO (2/3 chiều rộng) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:col-span-2 bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60 group-hover:scale-110 transition-transform duration-1000" />
        
        <div className="flex flex-col h-full justify-between relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                  <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
               </div>
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Gross Portfolio Revenue</h4>
            </div>
            
            <div className="space-y-2">
               <h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-none">
                 {formatCurrency(stats?.totalGrossRevenue || 0)}
               </h2>
               <div className="flex items-center gap-3 pt-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest">
                    Total Deposit Volume
                  </span>
                  {renderGrowth(comparisons.revenueGrowth, comparisons.period)}
               </div>
            </div>
          </div>
          
          <p className="mt-8 text-xs font-bold text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Real-time financial synchronization active across all managed entities
          </p>
        </div>
      </motion.div>

      {/* 2. TOTAL COMPLETED BOOKINGS (1/3 chiều rộng) - Màu Indigo */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="md:col-span-1 bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden group"
      >
        <div className="flex flex-col h-full justify-between relative z-10">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Total Completed Bookings</h4>
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">calendar_month</span>
               </div>
            </div>
            <div className="space-y-1">
               <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{stats?.totalBookings || 0}</h2>
               <div className="pt-2">
                 {renderGrowth(comparisons.bookingsGrowth, comparisons.period)}
               </div>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-50">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stats?.totalCancelled || 0} Cancellations Recorded</p>
          </div>
        </div>
      </motion.div>

      {/* 3. NET PORTFOLIO REVENUE (1/3 chiều rộng) - Màu Violet */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="md:col-span-1 bg-violet-600 rounded-[3.5rem] p-12 shadow-2xl shadow-violet-200 relative overflow-hidden group"
      >
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="flex flex-col h-full justify-between relative z-10 text-white">
          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-white/60 uppercase tracking-[0.3em]">Net Portfolio Revenue</h4>
            <div className="space-y-2">
               <h2 className="text-5xl font-black tracking-tighter leading-none">{formatCurrency(stats?.totalRevenue)}</h2>
               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">After system commissions</p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center self-end">
             <span className="material-symbols-outlined text-white">payments</span>
          </div>
        </div>
      </motion.div>

      {/* 4. PORTFOLIO SATISFACTION (1/3 chiều rộng) - Màu Amber (Biểu trưng cho Đánh giá) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="md:col-span-1 bg-amber-400 rounded-[3.5rem] p-12 shadow-2xl shadow-amber-200 relative overflow-hidden group"
      >
        {/* Subtle Decorative Gold Ring */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="flex flex-col h-full justify-between relative z-10 text-amber-950">
          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-amber-900/50 uppercase tracking-[0.3em]">Portfolio Satisfaction</h4>
            <div className="space-y-4">
               {/* Hiển thị tỉ lệ hài lòng với độ chính xác 2 chữ số thập phân (Vietnamese comment) */}
               <h2 className="text-6xl font-black tracking-tighter leading-none">
                 {((stats?.portfolioRatingAvg || 0) * 20).toFixed(1)}%
               </h2>
               <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className={`material-symbols-outlined text-xs ${(stats?.portfolioRatingAvg || 0) >= star ? 'text-white' : 'text-amber-950/20'}`}>star</span>
                  ))}
               </div>
            </div>
          </div>
          {/* Hiển thị số lượng review tổng từ Backend */}
          <p className="text-[10px] font-black text-amber-900/40 uppercase tracking-widest">Based on {stats?.portfolioTotalReviews || 0} reviews recorded</p>
        </div>
      </motion.div>

      {/* 5. AVG. TRANSACTION VALUE (1/3 chiều rộng) - Màu Amber */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="md:col-span-1 bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden group"
      >
        <div className="flex flex-col h-full justify-between relative z-10">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Avg. Transaction Value</h4>
               <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">insights</span>
               </div>
            </div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{formatCurrency(avgTransaction)}</h2>
          </div>
          <p className="text-[10px] font-bold text-slate-300 italic">Financial efficiency metric per completed interaction</p>
        </div>
      </motion.div>

    </div>
  );
};

export default AnalyticsSummary;
