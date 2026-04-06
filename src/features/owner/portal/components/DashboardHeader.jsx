import React from 'react';
import { motion } from 'framer-motion';

/**
 * @file DashboardHeader.jsx
 * @description Thành phần hiển thị lời chào cá nhân hóa và trạng thái hệ thống cho Owner Dashboard.
 */
const DashboardHeader = ({ userName, activeVenues, inactiveVenues }) => {
  // Chuẩn bị biến thời gian để hiển thị lời chào theo buổi
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
  if (hour >= 18) greeting = 'Good evening';

  return (
    <motion.section 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">{userName || 'Partner'}</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Your portfolio is showing <span className="text-emerald-600 font-bold">strong momentum</span> this period.
          </p>
        </div>

        {/* System Status Banner */}
        <div className="flex items-center space-x-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 group hover:border-violet-200 transition-colors duration-300">
           <div className="relative">
              <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                cloud_done
              </span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
           </div>
           <div className="pr-4">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
               System Connectivity
             </p>
             <p className="text-sm font-black text-slate-900">
                {activeVenues} Active <span className="mx-1 text-slate-300">/</span> {inactiveVenues} Inactive
             </p>
           </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardHeader;
