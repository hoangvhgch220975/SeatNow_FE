import { Outlet, useLocation, useSearchParams } from 'react-router';
import { useAuthStore } from '@/features/auth/store.js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);

  // 🛡️ Logic Thông báo Thanh toán Toàn cục (Xử lý Popup Tự hủy & Báo tin)
  useEffect(() => {
    const status = searchParams.get('payment_status') || searchParams.get('payment');
    const bId = searchParams.get('bookingId');

    if (status === 'success') {
      // 🚀 1. PHÁT TÍN HIỆU CHO TAB CHÍNH
      const paymentChannel = new BroadcastChannel('seatnow_payment');
      paymentChannel.postMessage({ status: 'SUCCESS', bookingId: bId });

      // 🔄 2. XÁC ĐỊNH LÀ POPUP -> CHẾ ĐỘ TỰ HỦY
      const isPopup = window.opener || window.name === 'SeatNowPayment' || window.innerHeight < 800;
      
      if (isPopup) {
        setIsSuccessPopup(true); // Hiện màn hình "Đã Xong" chuyên nghiệp
        
        // Cố gắng tự đóng cửa sổ
        const timer = setTimeout(() => {
          paymentChannel.close();
          window.close();
          // Lệnh đóng "quyết liệt" fallback
          setTimeout(() => { if (!window.closed) window.open('', '_self', '').close(); }, 200);
        }, 1500);

        return () => clearTimeout(timer);
      } else {
        // Tab chính trực tiếp -> Chỉ Toast và xóa param
        toast.success('Your table is officially reserved!', { icon: '✅' });
        paymentChannel.close();
      }

      // 🧹 3. LÀM SẠCH URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('payment');
      newParams.delete('payment_status');
      newParams.delete('bookingId');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Giao diện Success Overlay cho Popup (Phòng hờ trình duyệt chặn window.close)
  if (isSuccessPopup) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/20">
          <span className="material-symbols-outlined text-white text-5xl font-black animate-bounce">check_circle</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Payment Complete!</h2>
        <p className="text-slate-500 font-medium mb-8 max-w-xs">The primary tab has been successfully synchronized and redirected.</p>
        <button 
          onClick={() => window.close()} 
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          Close This Window
        </button>
      </div>
    );
  }

  // Xác định Navbar
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
