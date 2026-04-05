import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/**
 * @file ProfileSidebar.jsx
 * @description Sidebar điều hướng phía bên trái của trang Profile.
 * Chứa thông tin rút gọn và menu người dùng.
 */
const ProfileSidebar = ({ user, activeTab = 'Overview', onTabChange }) => {
  const navigate = useNavigate();
  const menuItems = [
    { label: 'Overview', icon: 'dashboard', id: 'Overview' },
    { label: 'Password', icon: 'lock', id: 'Password' },
    { label: 'Settings', icon: 'settings', id: 'Settings' },
  ];

  const comingSoon = () => toast("Feature coming soon!", { icon: "🚀" });

  return (
    <aside className="w-full md:w-72 bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border-2 border-slate-200/60 shadow-xl shadow-slate-200/20 flex flex-col items-center md:items-start sticky top-12 h-fit">
      {/* Profile Header in Sidebar (Giữ nguyên) */}
      <div className="mb-10 px-2">
        <div className="text-xl font-black text-slate-900 tracking-tighter mb-1 truncate">
          {user?.name || user?.fullName || 'Member'}
        </div>
        
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-100">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
          CUSTOMER
        </div>
      </div>

      {/* Navigation Menu - Cập nhật logic Active & Click */}
      <nav className="flex flex-col gap-2 w-full">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange && onTabChange(item.id)}
              className={`flex items-center gap-4 p-4 transition-all rounded-[1.5rem] group w-full border-2 ${
                isActive 
                  ? 'text-primary bg-white border-primary/20 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.15)]' 
                  : 'text-slate-500 border-transparent hover:border-slate-100 hover:bg-white hover:shadow-sm'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] transition-transform ${isActive ? 'scale-110' : 'group-hover:rotate-12'}`}>
                {item.icon}
              </span>
              <span className={`text-sm tracking-tight ${isActive ? 'font-black' : 'font-bold'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>


      {/* Spacer between Menu and Action Button */}
      <div className="mt-12 w-full pt-8 border-t border-slate-100/50 flex flex-col gap-6">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Executive Actions</h4>
        
        <button 
          onClick={() => navigate('/')}
          className="w-full h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-600 hover:-translate-y-1 hover:shadow-primary/40 active:scale-[0.98] transition-all duration-300 group flex items-center justify-center gap-3 lg:px-6"
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">restaurant_menu</span>
          <span className="text-[11px] font-black uppercase tracking-widest">Book A Table</span>
        </button>
      </div>

    </aside>

  );
};

export default ProfileSidebar;
