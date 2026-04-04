import { Outlet, useLocation } from 'react-router';
import { useAuthStore } from '@/features/auth/store.js';
import Navbar from './Navbar.jsx';
import CustomerNavbar from './CustomerNavbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
import AIFloatingButton from '../components/AIFloatingButton.jsx';

/**
 * @file MainLayout.jsx
 * @description Layout mặc định cho các trang Public (Home, Restaurant List).
 * Tự động chọn Navbar (Guest hoặc Customer) dựa trên trạng thái đăng nhập.
 */
const MainLayout = () => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Xác định xem có hiển thị Customer Navbar hay Guest Navbar
  const isCustomer = isAuthenticated && user?.role?.toUpperCase() === 'CUSTOMER';

  return (
    <div className="antialiased min-h-screen bg-slate-50 flex flex-col font-sans transition-colors duration-200">
      <ScrollToTop />
      
      {/* 
        Dispatcher: Hiển thị Navbar tương ứng với trạng thái người dùng.
        Điều này đảm bảo sự tách biệt mã nguồn giữa bản Guest và Customer.
      */}
      {isCustomer ? <CustomerNavbar /> : <Navbar />}
      
      {/* 
        Phần nội dung chính của trang.
        pt-20 để bù cho Navbar cố định ở trên.
      */}
      <main className="flex-grow flex flex-col pt-24">
        <Outlet />
      </main>

      {/* Footer chung cuối trang */}
      <Footer />

      {/* 
        AI Assistant Floating Button - 
        Chỉ hiển thị cho Guest (Vì Customer đã tích hợp AI vào Navbar).
      */}
      {!isCustomer && <AIFloatingButton />}
    </div>
  );
};

export default MainLayout;
