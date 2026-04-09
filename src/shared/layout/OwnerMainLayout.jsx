import { Outlet, Navigate } from 'react-router';
import { useAuthStore } from '@/features/auth/store.js';
import { ROLES } from '@/config/roles.js';
import SidebarOwnerMain from './SidebarOwnerMain.jsx';
import OwnerTopbar from './OwnerTopbar.jsx';
import OwnerFooter from './OwnerFooter.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';

/**
 * @file OwnerMainLayout.jsx
 * @description Layout chính dành cho cấp độ "Quản lý danh mục" (Portfolio Level) của Owner.
 */
const OwnerMainLayout = () => {
  const { isAuthenticated, user } = useAuthStore();

  // Kiểm tra quyền truy cập: Chỉ cho phép OWNER
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role?.toUpperCase() !== ROLES.OWNER) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen bg-slate-50 font-body antialiased text-slate-900 transition-colors duration-200">
      <ScrollToTop />
      
      {/* Sidebar cố định */}
      <SidebarOwnerMain />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative overflow-x-hidden">
        {/* Topbar dính trên cùng */}
        <OwnerTopbar />

        {/* Nội dung chính của trang */}
        <main className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full transition-all duration-300">
          <Outlet />
        </main>
        
        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerMainLayout;
