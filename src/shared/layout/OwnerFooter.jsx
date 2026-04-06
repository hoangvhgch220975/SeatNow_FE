import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '@/config/routes.js';
import toast from 'react-hot-toast';

/**
 * @file OwnerFooter.jsx
 * @description Thành phần chân trang chuyên biệt dành cho Owner Portal.
 */
const OwnerFooter = () => {
    
  const handleSystemStatus = (e) => {
    e.preventDefault();
    toast.success('System Intelligence Analytics: Module Coming Soon', {
      icon: '🚀',
      style: {
        borderRadius: '1.5rem',
        background: '#0f172a',
        color: '#fff',
        fontSize: '11px',
        fontWeight: '900',
        padding: '16px 24px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      },
    });
  };

  return (
    <footer className="mt-20 px-8 py-16 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        {/* Branding & Entity */}
        <div className="flex flex-col md:items-start items-center space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">insights</span>
             </div>
             <p className="text-sm font-black text-slate-900 tracking-tight uppercase">SeatNow <span className="text-violet-600">Portfolio</span> Intelligence</p>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-11">
             © 2024 Global Strategic Business Unit
          </p>
        </div>
        
        {/* Simplified Navigation Logic */}
        <div className="flex items-center gap-10">
          <Link 
            to={ROUTES.OWNER_POLICIES} 
            className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-violet-600 transition-all flex items-center gap-2 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-violet-500 transition-colors"></span>
            Privacy Policy
          </Link>
          
          <button 
            onClick={handleSystemStatus}
            className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-all flex items-center gap-2 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors"></span>
            System Status
          </button>
        </div>

        {/* Support Token (Fixed) */}
        <div className="hidden lg:flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
           <span className="material-symbols-outlined text-slate-400 text-[18px]">verified</span>
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Compliance Level: 1.0.4-LTS</span>
        </div>
      </div>
    </footer>
  );
};

export default OwnerFooter;
