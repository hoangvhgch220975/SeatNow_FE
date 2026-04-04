import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config/routes.js';

/**
 * @file BookingEmptyState.jsx
 * @description Trạng thái trống khi không có kết quả đặt bàn cho tab hiện tại.
 */
const BookingEmptyState = ({ activeTab }) => {
  return (
    <div className="mt-12 py-24 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100 opacity-60">
       <div className="w-40 h-40 mb-6 flex items-center justify-center rounded-full bg-white/80 shadow-inner">
          <span className="material-symbols-outlined text-7xl text-slate-200">restaurant_menu</span>
       </div>
       <h2 className="text-2xl font-black text-slate-900 mb-2 headline tracking-tight">
          No {activeTab} bookings found
       </h2>
       <p className="text-slate-500 font-bold mb-10 max-w-sm">
          It seems you haven't made any reservations for this period yet. Ready for your next feast?
       </p>
       <Link 
          to={ROUTES.RESTAURANT_LIST}
          className="px-10 py-5 rounded-3xl bg-primary text-white font-black shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
       >
          EXPLORE RESTAURANTS
       </Link>
    </div>
  );
};

export default BookingEmptyState;
