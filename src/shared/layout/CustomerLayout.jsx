import React from 'react';
import { Outlet } from 'react-router';
import CustomerNavbar from './CustomerNavbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';

/**
 * @file CustomerLayout.jsx
 * @description Layout dành riêng cho người dùng đã đăng nhập (Customer Side).
 */
const CustomerLayout = () => {
  return (
    <div className="antialiased min-h-screen bg-[#FDFCFE] flex flex-col font-sans">
      <ScrollToTop />
      {/* Navbar chuyên biệt cho Customer - Thiết kế cao cấp từ code.md */}
      <CustomerNavbar />
      
      {/* Nội dung chính của trang (Profile, Bookings, Dashboard) */}
      <main className="flex-grow flex flex-col pt-24">
        <Outlet />
      </main>

      {/* Footer chung cuối trang */}
      <Footer />
    </div>
  );
};

export default CustomerLayout;
