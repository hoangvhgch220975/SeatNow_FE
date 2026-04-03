import { Outlet, useLocation, Link } from 'react-router';
import logo from '../../assets/logos/logo.png';
import { ROUTES } from '../../config/routes.js';
import ScrollToTop from '../components/ScrollToTop.jsx';

/**
 * @file AuthLayout.jsx
 * @description Layout chuyên biệt cho các trang xác thực (Login, Register, Forgot Password).
 * Thiết kế tinh tế với nền Mesh và các khối đồ họa mờ ảo.
 */
const AuthLayout = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Privacy Policy', path: ROUTES.POLICIES },
    { label: 'Terms of Service', path: ROUTES.POLICIES },
    { label: 'Contact Support', path: ROUTES.CONTACT },
  ];

  return (
    <div className="bg-mesh min-h-screen flex flex-col font-body text-on-surface overflow-x-hidden relative selection:bg-primary/10">
      <ScrollToTop />

      {/* Nút Back to Home */}
      <Link 
        to={ROUTES.HOME}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-all group"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform inline-block">arrow_back</span>
        Back to Home
      </Link>
      
      {/* 
        Main Content Area 
        Sử dụng AnimatePresence để tạo hiệu ứng chuyển cảnh mượt mà giữa Login/Register
      */}
      <main className="flex-grow flex items-center justify-center px-6 py-6 md:py-10 relative z-10">
        <Outlet />
      </main>

      {/* 
        Auth Footer - Thiết kế tối giản, sang trọng 
      */}
      <footer className="w-full py-6 border-t border-primary/5 bg-white/50 backdrop-blur-md relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
            <div className="bg-primary p-2 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-md shadow-primary/20">
              <img src={logo} alt="SeatNow" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-lg font-bold text-primary tracking-tight headline">
              SeatNow
            </span>
          </Link>
          
          <div className="flex flex-wrap justify-center gap-8">
            {footerLinks.map((item) => (
               <Link 
                key={item.label}
                to={item.path} 
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all duration-300"
               >
                 {item.label}
               </Link>
            ))}
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            © {currentYear} SeatNow. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Side Decorative Graphics (Mờ ảo theo thiết kế gốc) */}
      <div className="fixed top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-0"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 translate-x-1/4 translate-y-1/4 bg-secondary/5 rounded-full blur-[120px] pointer-events-none -z-0"></div>
    </div>
  );
};

export default AuthLayout;
