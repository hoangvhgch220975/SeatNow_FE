import React from 'react';
import { useAuthStore } from '../../auth/store.js';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

/**
 * @file CustomerDashboard.jsx
 * @description Trang Dashboard tạm thời cho khách hàng sau khi login.
 */
const CustomerDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-500 font-bold mb-4">Please login to view this page.</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-primary text-white rounded-full font-bold"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-white/40 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-primary text-4xl">person</span>
        </div>
        
        <h1 className="text-2xl font-black text-slate-900 mb-2">Welcome, {user.fullName}!</h1>
        <p className="text-slate-500 text-sm mb-8">You have successfully logged in as <span className="font-bold text-primary">{user.role}</span></p>

        <div className="bg-slate-50 rounded-2xl p-4 mb-8 text-left border border-slate-100">
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 text-xl">alternate_email</span>
              <span className="text-sm font-bold text-slate-600">{user.email}</span>
           </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full py-4 bg-red-50 text-red-500 rounded-full font-black flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
