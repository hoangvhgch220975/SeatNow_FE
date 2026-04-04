import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileQuery } from '../hooks.js';

// Import các component đã tách file
import ProfileSidebar from '../components/ProfileSidebar.jsx';
import ProfileHero from '../components/ProfileHero.jsx';
import LoyaltyCard from '../components/LoyaltyCard.jsx';
import InfoSummary from '../components/InfoSummary.jsx';
import RecentOrders from '../components/RecentOrders.jsx';

/**
 * @file ProfilePage.jsx
 * @description Trang hồ sơ cá nhân nâng cấp với bố cục Bento Grid (code.md)
 * @author Antigravity AI
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useProfileQuery();
  
  // Skeleton loading Premium - Giữ đồng bộ phong cách
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFCFE] py-20 px-8 animate-pulse max-w-7xl mx-auto flex gap-12">
        <div className="w-72 h-[600px] bg-white rounded-[2.5rem] shadow-sm border border-slate-50"></div>
        <div className="flex-1 space-y-8">
           <div className="h-64 bg-white rounded-[2.5rem] shadow-sm"></div>
           <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1 h-64 bg-white rounded-[2.5rem]"></div>
              <div className="col-span-2 h-64 bg-white rounded-[2.5rem]"></div>
           </div>
        </div>
      </div>
    );
  }

  // Xử lý lỗi Truy cập
  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFCFE] flex justify-center pt-32 p-6 text-center">
        <div className="max-w-md w-full">
          <div className="relative inline-block mb-10">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center shadow-inner">
               <span className="material-symbols-outlined text-5xl animate-pulse">lock_person</span>
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Access Denied</h2>
          <p className="text-slate-500 font-bold leading-relaxed mb-10">
            Your connection has timed out. 
            <br />
            <span className="text-red-400/80 text-xs font-black uppercase tracking-widest">[ ERROR 401: UNAUTHORIZED ]</span>
          </p>
          <button 
            onClick={() => navigate('/login')} 
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl shadow-slate-900/20 active:scale-95 transition-transform"
          >
            SECURE RE-LOGIN
          </button>
        </div>
      </div>
    );
  }

  const user = profile || {};
  const avatarUrl = user.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.email || 'default'}`;
  
  return (
    <div className="min-h-screen bg-[#FDFCFE] pt-12 pb-24 px-8 relative overflow-hidden transition-all duration-700">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-200/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>

      {/* Main Layout - Flex 2 cột cho Sidebar và Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Sidebar điều hướng */}
        <ProfileSidebar user={user} />

        {/* Content Section - Lưới Bento chính */}
        <section className="flex-1 space-y-12">
          
          {/* Bento Grid Layer 1: Hero & Loyalty */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <ProfileHero user={user} avatarUrl={avatarUrl} />
             <LoyaltyCard points={user.loyaltyPoints} />
          </div>

          {/* Bento Grid Layer 2: Information Summary & Recent Orders - Cân bằng đối xứng 100% */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
             {/* Box bên trái: Thông tin cá nhân (Real Data) */}
             <InfoSummary user={user} />
             
             {/* Box bên phải: Đơn hàng gần đây (Component riêng biệt) */}
             <RecentOrders />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
