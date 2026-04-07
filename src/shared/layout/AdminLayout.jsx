import { Outlet, Navigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/features/auth/store.js';
import { ROLES } from '@/config/roles.js';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher.jsx';

/**
 * @file AdminLayout.jsx
 * @description Layout cơ bản cho quản trị viên hệ thống (Admin). Hỗ trợ đa ngôn ngữ.
 */
const AdminLayout = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuthStore();

  // Guard: Chỉ cho phép ADMIN (Vietnamese comment)
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role?.toUpperCase() !== ROLES.ADMIN) return <Navigate to="/" replace />;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
       <header className="p-6 bg-slate-800 border-b border-slate-700 flex justify-between items-center shadow-2xl">
          <div className="flex items-center space-x-4">
             <div className="bg-rose-500 p-2 rounded-lg">
                <span className="material-symbols-outlined">shield_person</span>
             </div>
             <h1 className="text-xl font-bold tracking-widest text-slate-100 uppercase">
               {t('admin.title')}
             </h1>
          </div>
          
          <div className="flex items-center space-x-6 text-sm font-medium">
             {/* Language Switcher integrated for Admin (Vietnamese comment) */}
             <LanguageSwitcher />

             <div className="bg-slate-700/50 px-4 py-2 rounded-full border border-slate-600">
                {t('admin.logged_in_as')}: <span className="text-rose-400 font-bold ml-1">{user?.fullName || 'Root Admin'}</span>
             </div>
             <button 
               onClick={handleLogout}
               className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
             >
                <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform">logout</span>
                {t('common.logout')}
             </button>
          </div>
       </header>

       <div className="flex flex-1">
          {/* Mock Sidebar (Vietnamese comment) */}
          <aside className="w-64 bg-slate-800/50 border-r border-slate-700 p-8 space-y-6">
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-2">
               {t('admin.navigation')}
             </div>
             <nav className="space-y-4">
                <div className="flex items-center space-x-3 text-rose-400 font-bold">
                   <span className="material-symbols-outlined">dashboard</span>
                   <span>{t('admin.main_terminal')}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400 opacity-50 cursor-not-allowed">
                   <span className="material-symbols-outlined">group</span>
                   <span>{t('admin.user_matrix')}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400 opacity-50 cursor-not-allowed">
                   <span className="material-symbols-outlined">payments</span>
                   <span>{t('admin.global_ledger')}</span>
                </div>
             </nav>
          </aside>

          {/* Main Area (Vietnamese comment) */}
          <main className="flex-1 p-12 overflow-y-auto">
             <Outlet />
          </main>
       </div>
    </div>
  );
};

export default AdminLayout;
