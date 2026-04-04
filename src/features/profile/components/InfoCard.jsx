import React from 'react';

/**
 * @file InfoCard.jsx
 * @description Thành phần thẻ hiển thị thông tin chi tiết (Email, Phone, ID...).
 * @param {string} label - Nhãn thông tin (Tiếng Anh)
 * @param {string} value - Giá trị thông tin
 * @param {string} icon - Tên icon Material Symbols
 * @param {string} color - Class màu nền/chữ cho icon
 */
const InfoCard = ({ label, value, icon, color }) => (
  <div className="group flex items-center gap-5 p-5 bg-white border border-slate-100 rounded-[2.5rem] hover:border-purple-200 hover:bg-purple-50/10 hover:shadow-2xl hover:shadow-purple-200/20 transition-all duration-500 cursor-default">
    {/* Icon Wrapper với hiệu ứng hover động */}
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-inner transition-all group-hover:scale-110 group-hover:rotate-3 duration-500`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    
    {/* Text content - Chống tràn cho dữ liệu dài (ID) */}
    <div className="flex-grow">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
      <p className="text-sm font-bold text-slate-800 break-all">{value}</p>
    </div>
  </div>
);

export default InfoCard;
