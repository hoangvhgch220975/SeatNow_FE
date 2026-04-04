import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ROUTES } from '@/config/routes.js';
import { PUBLIC_NAV } from '@/config/nav.public.js';
import logo from '@/assets/logos/logo.png';

/**
 * @file Navbar.jsx
 * @description Thanh điều hướng dành riêng cho khách vãng lai (Public/Guest)
 * Thiết kế cao cấp với hiệu ứng Glassmorphism.
 */
const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        
        {/* Logo - Brand Identity */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-primary p-2 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-sm">
             <img src={logo} alt="SeatNow" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-900 headline">
            SeatNow
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {PUBLIC_NAV.map((item) => (
            <Link 
              key={item.label}
              className={isActive(item.path) 
                ? "text-violet-600 font-bold border-b-2 border-violet-600 pb-1" 
                : "text-slate-600 hover:text-violet-500 border-b-2 border-transparent pb-1 transition-all"} 
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Public Actions */}
        <div className="flex items-center gap-4">
          <Link to={ROUTES.OWNER_JOIN} className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-primary transition-all">
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            Join With Us
          </Link>
          <Link to={ROUTES.LOGIN} className="hidden lg:flex px-6 py-2.5 text-sm font-bold text-primary hover:bg-violet-50 rounded-full transition-all">
            Login
          </Link>
          <Link to={ROUTES.REGISTER} className="bg-primary text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-primary-container transition-colors shadow-primary/20">
            Register
          </Link>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-violet-50 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t p-4 space-y-4 animate-in slide-in-from-top duration-300 shadow-xl">
          {PUBLIC_NAV.map((item) => (
            <Link 
              key={item.label}
              className="block text-slate-600 font-medium px-4 py-3 rounded-xl hover:bg-violet-50" 
              to={item.path} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
             <Link className="flex items-center justify-center gap-2 py-3 text-slate-600 font-bold" to={ROUTES.OWNER_JOIN} onClick={() => setIsMobileMenuOpen(false)}>
               <span className="material-symbols-outlined text-[20px]">storefront</span>
               Join With Us
             </Link>
             <div className="grid grid-cols-2 gap-3 mt-2">
               <Link className="text-center py-3 text-primary font-bold border border-primary/20 rounded-full" to={ROUTES.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
               <Link className="text-center py-3 bg-primary text-white rounded-full font-bold shadow-md shadow-primary/20" to={ROUTES.REGISTER} onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
