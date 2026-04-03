import React from 'react';
import { useAuthStore } from '../../auth/store.js';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

/**
 * @file ProfilePage.jsx
 * @description Trang hồ sơ cá nhân (Placeholder sau khi đăng nhập thành công).
 */
const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-bold">Please login to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-5xl font-light">account_circle</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 headline mb-2">{user.fullName}</h1>
          <div className="inline-block px-4 py-1 bg-primary/5 rounded-full">
             <span className="text-xs font-black uppercase tracking-widest text-primary italic">{user.role}</span>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="material-symbols-outlined text-slate-400">mail</span>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Email Address</p>
              <p className="text-sm font-bold text-slate-700">{user.email}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-500 font-black py-4 rounded-full transition-all hover:bg-red-100 active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
