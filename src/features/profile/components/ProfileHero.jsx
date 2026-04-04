import React from 'react';
import { toast } from 'react-hot-toast';

/**
 * @file ProfileHero.jsx
 * @description Thẻ Hero lớn trong bố cục Bento, chứa ảnh đại diện và thông tin chính.
 */
const ProfileHero = ({ user, avatarUrl }) => {
  const handleUpdate = () => {
    toast("Profile Update: Coming Soon!", { 
      icon: "🛠️",
      style: {
        borderRadius: '1.5rem',
        background: '#1e293b',
        color: '#fff',
        padding: '16px 24px',
        fontWeight: 'black',
        fontSize: '12px'
      }
    });
  };

  return (
    <div className="lg:col-span-2 bg-white/40 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-slate-200/50 shadow-soft flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
      {/* Decorative Gradient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
      
      {/* Large Profile Avatar with Premium Frame */}
      <div className="relative w-44 h-44 rounded-[2rem] overflow-hidden ring-8 ring-white shadow-2xl flex-shrink-0 group">
        <img 
          alt={user?.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={avatarUrl} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 text-white">
           <span className="material-symbols-outlined text-[20px]">photo_camera</span>
        </div>
      </div>

      {/* Main Profile Info */}
      <div className="flex-1 text-center md:text-left relative z-10 pt-4">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-5 border border-indigo-100">
           <span className="material-symbols-outlined text-[14px]">verified</span>
           IDENTITY VERIFIED
        </div>
        
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter leading-none italic">
          {user?.name || 'Member'}<span className="text-primary not-italic">.</span>
        </h1>
        <p className="text-slate-400 mb-8 text-lg font-bold tracking-tight">{user?.email || 'No email associated'}</p>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button 
            onClick={handleUpdate}
            className="bg-primary text-white px-6 py-2.5 rounded-full font-black text-[11px] flex items-center gap-2 hover:bg-primary-container transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
