import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @file AdminDashboardPage.jsx
 * @description Trang quản trị trung tâm dành cho ROOT ADMIN. Hỗ trợ đa ngôn ngữ.
 * Hiện tại đang là bản xem trước (Terminal Placeholder).
 */
const AdminDashboardPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Admin Terminal Header (Vietnamese comment) */}
      <section className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
         <div className="flex items-center space-x-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest pl-4">
              {t('admin.status')}
            </span>
         </div>
         <h2 className="text-4xl font-black text-slate-100 tracking-tight mb-2 uppercase">
           {t('admin.access_granted')}
         </h2>
         <p className="text-slate-400 font-medium max-w-2xl">
            {t('admin.welcome')}
         </p>
      </section>

      {/* Admin Metrics Grid (Vietnamese comment) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
         {[
            { label: t('admin.metrics.network_users'), count: '142,301', icon: 'people' },
            { label: t('admin.metrics.active_sessions'), count: '1,202', icon: 'hub' },
            { label: t('admin.metrics.security_threats'), count: '0', icon: 'security' },
            { label: t('admin.metrics.system_uptime'), count: '99.98%', icon: 'settings_backup_restore' }
         ].map((item) => (
            <div key={item.label} className="bg-slate-800/40 p-6 rounded-[2rem] border border-slate-700 hover:border-rose-500/50 transition-all group">
               <div className="h-10 w-10 bg-slate-700/50 rounded-xl flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{item.icon}</span>
               </div>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{item.label}</p>
               <p className="text-2xl font-black text-slate-100">{item.count}</p>
            </div>
         ))}
      </section>

      {/* Control Panel Placeholder (Vietnamese comment) */}
      <div className="bg-slate-800/30 rounded-[3rem] border border-dashed border-slate-700 p-20 flex flex-col items-center justify-center text-center space-y-6">
         <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center text-slate-500">
            <span className="material-symbols-outlined text-4xl">construction</span>
         </div>
         <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-300">
              {t('admin.under_construction_title')}
            </h3>
            <p className="text-slate-500 text-sm max-w-sm">
               {t('admin.under_construction_desc')}
            </p>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
