import { Outlet, Navigate } from 'react-router';
import { useAuthStore } from '@/features/auth/store.js';
import { ROLES } from '@/config/roles.js';
import SidebarAdmin from './SidebarAdmin.jsx';
import AdminHeader from './AdminHeader.jsx';
import AdminFooter from './AdminFooter.jsx';

/**
 * @file AdminLayout.jsx
 * @description Layout cao cấp dành cho Quản trị viên hệ thống (Admin). 
 */
const AdminLayout = () => {
  const { isAuthenticated, user } = useAuthStore();

  // Guard: Chỉ cho phép ADMIN
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role?.toUpperCase() !== ROLES.ADMIN) return <Navigate to="/" replace />;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 flex">
       {/* Fixed Sidebar */}
       <SidebarAdmin />

       {/* Main Content Area */}
       <div className="flex-1 ml-72 flex flex-col min-h-screen relative">
          {/* Sticky Header */}
          <AdminHeader />


          {/* Page Content */}
          <main className="flex-1 p-10 overflow-y-auto">
             <div className="max-w-[1600px] mx-auto min-h-full flex flex-col">
                <div className="flex-1">
                  <Outlet />
                </div>
             </div>
          </main>

          {/* Admin Dedicated Footer */}
          <AdminFooter />
       </div>


       {/* Optional Overlay/Drawer Background elements (Visual flourish) */}
       <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30 select-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-200/40 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-100 rounded-full blur-[100px]"></div>
       </div>
    </div>
  );
};

export default AdminLayout;

