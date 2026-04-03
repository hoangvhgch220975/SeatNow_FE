import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../config/routes.js';
import logo from '../../assets/logos/logo.png';

/**
 * @file Footer.jsx
 * @description Footer chung cho toàn bộ trang public/customer
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Restaurants', path: ROUTES.RESTAURANT_LIST },
    { label: 'Track Booking', path: ROUTES.TRACK_BOOKING },
    { label: 'AI Assistant', path: ROUTES.AI_CHAT },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: ROUTES.POLICIES },
    { label: 'Terms of Service', path: ROUTES.POLICIES },
    { label: 'Refund Policy', path: ROUTES.POLICIES },
    { label: 'Contact Us', path: ROUTES.CONTACT },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Defined top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Background decorative elements - very subtle on white */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-100/50 rounded-full blur-[80px] pointer-events-none" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to={ROUTES.HOME} className="flex items-center gap-3 group w-fit">
              <div className="bg-primary p-2.5 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
                <img src={logo} alt="SeatNow" className="w-7 h-7 object-contain" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-slate-900 headline">
                SeatNow
              </span>
            </Link>
            <p className="text-slate-500 leading-relaxed max-w-sm text-sm font-medium">
              The premium restaurant reservation platform. Discover, book, and enjoy the finest culinary experiences across Vietnam with ease.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="p-2.5 bg-slate-50 hover:bg-primary/10 rounded-xl text-slate-400 hover:text-primary transition-all duration-300 group border border-slate-100"
                  aria-label={social}
                >
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform block">
                    {social === 'facebook' ? 'hub' : social === 'instagram' ? 'photo_camera' : social === 'twitter' ? 'tag' : 'play_circle'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[.2em] text-slate-400">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-slate-600 hover:text-primary text-sm font-bold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-primary group-hover:w-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[.2em] text-slate-400">Legal</h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-slate-600 hover:text-primary text-sm font-bold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-primary group-hover:w-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-bold">
            &copy; {currentYear} SeatNow. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
              SSL Secured
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[14px] text-primary">shield</span>
              PCI Compliant
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[14px] text-primary">language</span>
              Vietnam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
