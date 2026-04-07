import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @component BookingStatusTimeline
 * @description Hiển thị thanh tiến trình trạng thái đặt bàn (Booked -> Confirmed -> Checked-in). Hỗ trợ đa ngôn ngữ.
 * @param {string} status - Trạng thái hiện tại của booking
 */
const BookingStatusTimeline = ({ status = 'confirmed' }) => {
  const { t } = useTranslation();
  // Trạng thái chuẩn hóa để so sánh (Vietnamese comment)
  const s = status.toLowerCase();
  
  // Xác định các mốc đã hoàn thành (Vietnamese comment)
  const isBooked = true; // Luôn luôn đã được đặt
  const isConfirmed = ['confirmed', 'arrived', 'completed'].includes(s);
  const isArrived = ['arrived', 'completed'].includes(s);

  return (
    <div className="mb-16 bg-slate-50/50 p-8 rounded-3xl border border-slate-100 flex items-center justify-between max-w-4xl mx-auto relative overflow-hidden shadow-sm">
      {/* Đường kẻ nền (Background Line) (Vietnamese comment) */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200/50 -translate-y-1/2 z-0"></div>
      
      {/* Đường kẻ tiến trình (Progress Line) (Vietnamese comment) */}
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-1000"
        style={{ width: isArrived ? '100%' : isConfirmed ? '50%' : '0%' }}
      ></div>

    {/* Stage 1: Booked (Vietnamese comment) */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isBooked ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
          <span className="material-symbols-outlined text-sm font-bold">check</span>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${isBooked ? 'text-slate-900' : 'text-slate-400'}`}>
          {t('booking.detail.timeline.booked')}
        </span>
      </div>

      {/* Stage 2: Confirmed (Vietnamese comment) */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isConfirmed ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'} ${s === 'confirmed' ? 'animate-pulse ring-4 ring-primary/10' : ''}`}>
          <span className="material-symbols-outlined text-sm font-bold">
            {isConfirmed ? 'check' : 'pending'}
          </span>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${isConfirmed ? 'text-slate-900' : 'text-slate-400'}`}>
          {t('booking.detail.timeline.confirmed')}
        </span>
      </div>

      {/* Stage 3: Checked-in (Vietnamese comment) */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isArrived ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'} ${s === 'arrived' ? 'animate-pulse ring-4 ring-primary/10' : ''}`}>
          <span className="material-symbols-outlined text-sm font-bold">
            {isArrived ? 'check' : 'schedule'}
          </span>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${isArrived ? 'text-slate-900' : 'text-slate-400'}`}>
          {t('booking.detail.timeline.checked_in')}
        </span>
      </div>
    </div>
  );
};

export default BookingStatusTimeline;
