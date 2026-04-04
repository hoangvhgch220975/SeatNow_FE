import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router';
import { useAuthStore } from '@/features/auth/store.js';
import { useProfileQuery } from '@/features/profile/hooks.js';
import { CUSTOMER_NAV, CUSTOMER_PROFILE_MENU } from '@/config/nav.customer.js';
import { ROUTES } from '@/config/routes.js';
import logo from '@/assets/logos/logo.png';
import { toast } from 'react-hot-toast';

/**
 * @file CustomerNavbar.jsx
 * @description Thanh điều hướng dành riêng cho khách hàng đã đăng nhập.
 * Đồng bộ phong cách Glassmorphism với bản Public.
 */
const CustomerNavbar = () => {
  const { user: authUser, logout } = useAuthStore();
  const { data: profile } = useProfileQuery();
  const user = profile || authUser;
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Avatar fallback logic - Sync with Profile structure
  const avatarUrl = user?.avatar || user?.avatar_url || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.email || 'default'}`;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        
        {/* Brand Logo - Clickable to Home */}
        <Link 
          to={ROUTES.HOME} 
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="Return to homepage"
        >
          <div className="bg-primary p-2 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-sm shadow-primary/20">
             <img src={logo} alt="SeatNow" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-900 headline select-none">
            SeatNow
          </span>
        </Link>

        {/* Center Navigation - Chỉ giữ icon cho AI Assistant */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          {CUSTOMER_NAV.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => 
                `transition-all flex items-center gap-1.5 pb-1 ${
                  isActive 
                    ? 'text-violet-600 font-bold border-b-2 border-violet-600' 
                    : 'text-slate-600 hover:text-violet-500 border-b-2 border-transparent transition-all'
                } ${item.isSpecial ? `px-4 py-2 rounded-full shadow-sm ${isActive ? 'bg-primary/10' : 'bg-primary/5 border-none hover:bg-primary/10'}` : ''}`
              }
            >
              {/* Chỉ hiển thị icon nếu là mục Đặc biệt (AI Assistant) */}
              {item.isSpecial && (
                <span className="material-symbols-outlined text-[18px] animate-pulse">
                  {item.icon}
                </span>
              )}
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          
          {/* Notifications */}
          <button 
            onClick={() => toast("Notifications: Coming Soon!", { 
              icon: "🔔",
              style: {
                borderRadius: '1rem',
                background: '#1e293b',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold'
              }
            })}
            className="p-2.5 rounded-2xl hover:bg-violet-50 text-slate-400 transition-all relative group"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-4 ring-white shadow-sm"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="px-2 py-2 rounded-full bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white transition-all group flex items-center gap-3 cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                <img
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  src={avatarUrl}
                />
              </div>
              <div className="hidden lg:flex flex-col items-start pr-2">
                <p className="text-xs font-black text-slate-900 leading-none mb-1">
                  {(user?.name || user?.fullName) || 'Member'}
                </p>
                <div className="flex items-center gap-1">
                   <span className="material-symbols-outlined text-amber-500 text-[14px]">stars</span>
                   <span className="text-[10px] font-black text-slate-400 tracking-tighter">
                     {user?.loyaltyPoints || 0} PTS
                   </span>
                </div>
              </div>
            </div>

            {/* Dropdown Content */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 p-3 z-[60] animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="px-5 py-4 mb-3 border-b border-slate-50">
                   <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1">Account</p>
                   <p className="text-xs font-bold text-slate-500 truncate">{user?.email}</p>
                </div>

                <div className="space-y-1">
                  {CUSTOMER_PROFILE_MENU.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-violet-50 text-slate-600 hover:text-primary transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors border border-transparent group-hover:border-violet-100 shadow-sm">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">
                          {item.icon}
                        </span>
                      </div>
                      <span className="text-sm font-bold tracking-tight">{item.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="my-3 px-3">
                   <div className="border-t border-slate-50"></div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors border border-transparent group-hover:border-red-100 shadow-sm">
                    <span className="material-symbols-outlined">logout</span>
                  </div>
                  <span className="text-sm font-bold tracking-tight">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
