import React from 'react';
import { toast } from 'react-hot-toast';

/**
 * @file ProfileSidebar.jsx
 * @description Sidebar điều hướng phía bên trái của trang Profile.
 * Chứa thông tin rút gọn và menu người dùng.
 */
const ProfileSidebar = ({ user }) => {
  const menuItems = [
    { label: 'Overview', icon: 'dashboard', active: true },
    { label: 'Booking History', icon: 'calendar_month' },
    { label: 'Password & Security', icon: 'lock' },
    { label: 'Settings', icon: 'settings' },
  ];

  const comingSoon = () => toast("Feature coming soon!", { icon: "🚀" });

  return (
    <aside className="w-full md:w-72 bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border-2 border-slate-200/60 shadow-xl shadow-slate-200/20 flex flex-col items-center md:items-start sticky top-12 h-fit">
      {/* Profile Header in Sidebar */}
      <div className="mb-10 px-2">
        <div className="text-xl font-black text-slate-900 tracking-tighter mb-1 truncate">
          {user?.name || 'Member'}
        </div>
        
        {/* Customer Badge - Đồng bộ màu Tím rực rỡ */}
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-100">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
          CUSTOMER
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={comingSoon}
            className={`flex items-center gap-4 p-4 transition-all rounded-3xl group ${
              item.active 
                ? 'text-primary bg-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.15)] border border-slate-50' 
                : 'text-slate-500 hover:translate-x-1 hover:bg-white hover:shadow-soft'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className={`text-sm tracking-tight ${item.active ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Action Button - Nổi bật với màu Tím Primary */}
      <button 
        onClick={comingSoon}
        className="mt-8 bg-primary text-white py-4 px-6 rounded-full font-black text-xs hover:bg-primary-container transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95"
      >
        <span className="material-symbols-outlined text-[18px]">add_circle</span>
        BOOK A TABLE
      </button>

      <p className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] text-center">
        SeatNow Protocol v4
      </p>
    </aside>
  );
};

export default ProfileSidebar;
