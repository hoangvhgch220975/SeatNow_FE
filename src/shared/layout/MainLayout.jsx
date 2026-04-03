import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
import { Toaster } from 'react-hot-toast';

/**
 * @file MainLayout.jsx
 * @description Layout mặc định bọc ngoài các trang như Home, Restaurant Listing, vv.
 */
const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="antialiased min-h-screen bg-slate-50 flex flex-col font-sans transition-colors duration-200">
      <ScrollToTop />
      {/* Navbar bám trên đầu màn hình (Sticky) */}
      <Navbar />
      
      {/* 
        Phần nội dung chuyển đổi linh hoạt nằm trong Outlet.
        Tích hợp Framer Motion để tạo hiệu ứng chuyển trang mượt mà.
        Sử dụng key={location.pathname} để nhận diện thay đổi giữa các Route.
      */}
      <main className="flex-grow flex flex-col pt-20">
        <Outlet />
      </main>

      {/* Footer chung cuối trang */}
      <Footer />
    </div>
  );
};

export default MainLayout;
