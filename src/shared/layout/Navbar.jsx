import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuthStore } from '../../features/auth/store.js';
import { ROUTES } from '../../config/routes.js';
import logo from '../../assets/logos/logo.png';

/**
 * @file Navbar.jsx
 * @description Thanh điều hướng cho Public và Customer với thiết kế cao cấp
 */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to check if a route is active
  const isActive = (path) => location.pathname === path;

  /**
   * --- PUBLIC NAVBAR UI ---
   */
  const PublicNavbar = () => (
    <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-primary p-2 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
             <img src={logo} alt="SeatNow" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-900 headline">
            SeatNow
          </span>
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link 
            className={isActive(ROUTES.HOME) ? "text-violet-600 font-bold border-b-2 border-violet-600 pb-1" : "text-slate-600 hover:text-violet-500"} 
            to={ROUTES.HOME}
          >
            Home
          </Link>
          <Link 
            className={isActive(ROUTES.RESTAURANT_LIST) ? "text-violet-600 font-bold border-b-2 border-violet-600 pb-1" : "text-slate-600 hover:text-violet-500"} 
            to={ROUTES.RESTAURANT_LIST}
          >
            Restaurants
          </Link>
          <Link 
            className={isActive(ROUTES.TRACK_BOOKING) ? "text-violet-600 font-bold border-b-2 border-violet-600 pb-1" : "text-slate-600 hover:text-violet-500"} 
            to={ROUTES.TRACK_BOOKING}
          >
            Track Booking
          </Link>
          <Link 
            className={isActive(ROUTES.POLICIES) ? "text-violet-600 font-bold border-b-2 border-violet-600 pb-1" : "text-slate-600 hover:text-violet-500"} 
            to={ROUTES.POLICIES}
          >
            Policies
          </Link>
          <Link 
            className={isActive(ROUTES.CONTACT) ? "text-violet-600 font-bold border-b-2 border-violet-600 pb-1" : "text-slate-600 hover:text-violet-500"} 
            to={ROUTES.CONTACT}
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to={ROUTES.REGISTER_OWNER} className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-primary transition-all">
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            Join With Us
          </Link>
          <Link to={ROUTES.LOGIN} className="hidden lg:flex px-6 py-2.5 text-sm font-bold text-primary hover:bg-violet-50 rounded-full transition-all">
            Login
          </Link>
          <Link to={ROUTES.REGISTER} className="bg-primary text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-primary-container transition-colors">
            Register
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-violet-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 animate-in slide-in-from-top duration-300">
          <Link className="block text-slate-600 font-medium px-4 py-2" to={ROUTES.HOME} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link className="block text-slate-600 font-medium px-4 py-2" to={ROUTES.RESTAURANT_LIST} onClick={() => setIsMobileMenuOpen(false)}>Restaurants</Link>
          <Link className="block text-slate-600 font-medium px-4 py-2" to={ROUTES.TRACK_BOOKING} onClick={() => setIsMobileMenuOpen(false)}>Track Booking</Link>
          <Link className="block text-slate-600 font-medium px-4 py-2" to={ROUTES.POLICIES} onClick={() => setIsMobileMenuOpen(false)}>Policies</Link>
          <Link className="block text-slate-600 font-medium px-4 py-2" to={ROUTES.CONTACT} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <div className="pt-4 border-t flex flex-col gap-2">
             <Link className="flex items-center justify-center gap-2 py-2 text-slate-600 font-bold" to={ROUTES.REGISTER_OWNER} onClick={() => setIsMobileMenuOpen(false)}>
               <span className="material-symbols-outlined text-[20px]">storefront</span>
               Join With Us
             </Link>
             <Link className="text-center py-2 text-primary font-bold" to={ROUTES.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
             <Link className="text-center py-2 bg-primary text-white rounded-full font-bold" to={ROUTES.REGISTER} onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
          </div>
        </div>
      )}
    </header>
  );

  /**
   * --- CUSTOMER NAVBAR UI ---
   */
  const CustomerNavbar = () => (
    <nav className="w-full bg-white/90 backdrop-blur-xl border-b border-outline-variant/10 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-primary p-2 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <img src={logo} alt="SeatNow" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-900 headline">
            SeatNow
          </span>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link 
            className={isActive(ROUTES.HOME) ? "text-violet-600 font-bold border-b-2 border-violet-600 pb-1" : "text-slate-600 hover:text-violet-500"} 
            to={ROUTES.HOME}
          >
            Home
          </Link>
          <Link 
            className={isActive(ROUTES.RESTAURANT_LIST) ? "text-violet-600 font-bold border-b-2 border-violet-600 pb-1" : "text-slate-600 hover:text-violet-500"} 
            to={ROUTES.RESTAURANT_LIST}
          >
            Restaurants
          </Link>
          <Link 
            className={isActive(ROUTES.BOOKING_HISTORY) ? "text-violet-600 font-bold border-b-2 border-violet-600 pb-1" : "text-slate-600 hover:text-violet-500"} 
            to={ROUTES.BOOKING_HISTORY}
          >
            My Bookings
          </Link>
          <Link 
            className={isActive(ROUTES.AI_CHAT) ? "text-violet-600 font-bold flex items-center gap-1" : "text-slate-600 hover:text-violet-500 flex items-center gap-1"} 
            to={ROUTES.AI_CHAT}
          >
            <span className="material-symbols-outlined text-[18px] text-primary">auto_awesome</span>
            AI Assistant
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Search */}
          <button className="p-2 rounded-full hover:bg-violet-50 text-slate-600">
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* Notification */}
          <button className="p-2 rounded-full hover:bg-violet-50 text-slate-600 relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Profile */}
          <div className="relative group ml-2">
            <div className="flex items-center gap-3 cursor-pointer pl-1 pr-1 py-1 rounded-full bg-slate-50 border hover:bg-white transition-colors">
              <img 
                className="w-10 h-10 rounded-full object-cover"
                src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBrOlKRiuReMDaTMbFPwqN7IJ6NtSZoj520VrbcZgusQQ07ONWVtciuw7pIxgvO0Hcu6BWpoj4cs4tLNbAtUi8cP-cfUCeBxAMDleA_h5ojh8dlFFnBVUMlbOPy8y2c1yHLfo8_roEhYZVnT1YL_mGy2AkOe1Lfg6HHaGAk9zGAbKe0j-1qSCqCsvyN5MUsGzeKdgg8DNrcfxzPX9p1qTm0ELOIl-0rO-MsSBGkdVopWWKkHks7pW-6NU8UC5UM5U8JP0c_d-cJd-L3"}
                alt={user?.fullName}
              />
              
              <div className="hidden sm:block pr-3">
                <p className="text-[10px] font-extrabold text-primary uppercase">Premium</p>
                <p className="text-xs font-bold text-slate-900">{user?.fullName || 'Guest User'}</p>
              </div>
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-lg border py-4 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
              <Link className="flex items-center gap-4 px-6 py-3 hover:bg-violet-50 text-sm text-slate-600" to={ROUTES.PROFILE}>
                <span className="material-symbols-outlined">person</span>
                Profile Settings
              </Link>
              <Link className="flex items-center gap-4 px-6 py-3 hover:bg-violet-50 text-sm text-slate-600" to={ROUTES.BOOKING_HISTORY}>
                <span className="material-symbols-outlined">history</span>
                Booking History
              </Link>
              {/* Wallet Placeholder if no route */}
              <Link className="flex items-center gap-4 px-6 py-3 hover:bg-violet-50 text-sm text-slate-600" to="#">
                <span className="material-symbols-outlined">account_balance_wallet</span>
                Wallet
              </Link>

              <div className="mx-6 my-2 border-t"></div>

              <button 
                onClick={logout}
                className="flex items-center gap-4 px-6 py-3 text-red-500 hover:bg-red-50 w-full text-sm text-left font-medium"
              >
                <span className="material-symbols-outlined">logout</span>
                Sign Out
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );

  // Decide which navbar to render
  if (isAuthenticated && user?.role === 'customer') {
    return <CustomerNavbar />;
  }

  return <PublicNavbar />;
};

export default Navbar;
