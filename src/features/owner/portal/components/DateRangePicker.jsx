import React, { useState, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, isAfter, isBefore, startOfDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @file DateRangePicker.jsx
 * @description Bộ chọn dải ngày (Range) phong cách Calendar Popup cao cấp.
 */
const DateRangePicker = ({ startDate, endDate, onRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef(null);

  // Đóng khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateClick = (date) => {
    const selectedDate = startOfDay(date);
    
    if (!startDate || (startDate && endDate)) {
      onRangeChange(selectedDate, null);
    } else {
      if (isBefore(selectedDate, startDate)) {
        onRangeChange(selectedDate, null);
      } else {
        onRangeChange(startDate, selectedDate);
        setIsOpen(false); // Tự động đóng sau khi chọn xong dải
      }
    }
  };

  const renderCalendar = () => {
    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });

    const startWeekDay = startOfMonth(currentMonth).getDay();
    const blanks = Array(startWeekDay).fill(null);

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest px-4">
            {format(currentMonth, 'MMMM yyyy')}
          </h4>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-[10px] font-black text-slate-300 text-center uppercase py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {blanks.map((_, i) => <div key={`blank-${i}`} className="py-2" />)}
          {days.map(date => {
            const isStart = startDate && isSameDay(date, startDate);
            const isEnd = endDate && isSameDay(date, endDate);
            const isInRange = startDate && endDate && isWithinInterval(date, { start: startDate, end: endDate });
            const isToday = isSameDay(date, new Date());

            return (
              <button
                key={date.toString()}
                onClick={() => handleDateClick(date)}
                className={`
                  relative py-3 rounded-xl text-[11px] font-black transition-all group
                  ${isStart || isEnd ? 'bg-violet-600 text-white shadow-lg shadow-violet-200 z-10' : ''}
                  ${isInRange && !isStart && !isEnd ? 'bg-violet-50 text-violet-600' : ''}
                  ${!isStart && !isEnd && !isInRange ? 'text-slate-600 hover:bg-slate-50' : ''}
                `}
              >
                {date.getDate()}
                {isToday && !isStart && !isEnd && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-slate-200 pl-5 pr-4 py-3.5 rounded-2xl flex items-center gap-4 hover:border-violet-500 transition-all shadow-sm group active:scale-95"
      >
        <div className="flex flex-col items-start">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 text-left">Timeline Analysis</span>
           <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900 leading-none">
                {startDate ? format(startDate, 'MMM dd, yyyy') : 'Pick Start'}
              </span>
              <span className="material-symbols-outlined text-slate-300 text-[16px]">arrow_right_alt</span>
              <span className="text-xs font-black text-slate-900 leading-none">
                {endDate ? format(endDate, 'MMM dd, yyyy') : 'Pick End'}
              </span>
           </div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          isOpen ? 'bg-violet-600 text-white rotate-180' : 'bg-slate-50 text-slate-400'
        }`}>
           <span className="material-symbols-outlined text-[20px]">calendar_today</span>
        </div>
      </button>

      {/* Calendar Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-4 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 w-[340px] z-[100] overflow-hidden"
          >
            {renderCalendar()}

            {/* Quick Presets */}
            <div className="bg-slate-50/50 p-4 grid grid-cols-2 gap-2 border-t border-slate-100">
               <button 
                 onClick={() => {
                   onRangeChange(startOfMonth(new Date()), endOfMonth(new Date()));
                   setIsOpen(false);
                 }}
                 className="py-2.5 rounded-xl bg-white border border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-violet-200 hover:text-violet-600 transition-all"
               >
                 This Month
               </button>
               <button 
                 onClick={() => {
                   const d = new Date();
                   d.setDate(d.getDate() - 7);
                   onRangeChange(d, new Date());
                   setIsOpen(false);
                 }}
                 className="py-2.5 rounded-xl bg-white border border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-violet-200 hover:text-violet-600 transition-all"
               >
                 Last 7 Days
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangePicker;
