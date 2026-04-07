import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router';
import { ROUTES } from '@/config/routes.js';
import { useAuthStore } from '@/features/auth/store.js';
import bannerImg from '@/assets/images/banners/banner.png';

/**
 * @file HeroSection.jsx
 * @description Hero Section cho Trang chủ. Hỗ trợ đa ngôn ngữ và cá nhân hóa.
 */
const HeroSection = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuthStore();
  const isCustomer = isAuthenticated && user?.role?.toUpperCase() === 'CUSTOMER';
  const displayName = user?.fullName || user?.name || 'Friend';

  return (
    <section className="relative min-h-[870px] flex items-center overflow-hidden px-8">
      {/* Background Layer (Vietnamese comment) */}
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover brightness-[0.85]" 
          alt="Luxury fine dining restaurant interior with ambient lighting" 
          src={bannerImg}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content Layer (Vietnamese comment) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
        <div className="max-w-2xl">
          {/* Lời chào cá nhân hóa (Vietnamese comment) */}
          {isCustomer && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                {t('home.hero.welcome_back', { name: displayName })}
              </span>
            </div>
          )}

          <h1 
            className="text-[3.5rem] font-bold leading-[1.1] text-white mb-6 tracking-tight headline"
            dangerouslySetInnerHTML={{ 
              __html: isCustomer ? t('home.hero.title_customer') : t('home.hero.title_guest') 
            }}
          />

          <p className="text-lg text-slate-200 mb-10 leading-relaxed font-body">
            {isCustomer 
              ? t('home.hero.subtitle_customer')
              : t('home.hero.subtitle_guest')
            }
          </p>

          <div className="flex flex-wrap gap-4">
            {/* Primary CTA (Vietnamese comment) */}
            <Link 
              to={ROUTES.RESTAURANT_LIST}
              className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20 inline-block"
            >
              {isCustomer ? t('home.hero.book_table') : t('home.hero.book_now')}
            </Link>

            {/* Secondary CTA (Vietnamese comment) */}
            {isCustomer ? (
              <Link 
                to={ROUTES.BOOKING_HISTORY}
                className="group flex items-center gap-2 text-slate-900 font-bold text-lg px-8 py-4 bg-white/90 backdrop-blur-md rounded-lg hover:bg-white transition-all inline-flex"
              >
                {t('home.hero.my_reservations')}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">history</span>
              </Link>
            ) : (
              <Link 
                to={ROUTES.RESTAURANT_LIST}
                className="group flex items-center gap-2 text-slate-900 font-bold text-lg px-8 py-4 bg-white/90 backdrop-blur-md rounded-lg hover:bg-white transition-all inline-flex"
              >
                {t('home.hero.explore_restaurants')}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
