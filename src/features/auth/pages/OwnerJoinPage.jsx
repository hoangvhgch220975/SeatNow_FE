import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ROUTES } from '../../../config/routes.js';
import PartnerRequestModal from '../components/PartnerRequestModal';

/**
 * @file OwnerJoinPage.jsx
 * @description Trang giới thiệu dành cho chủ nhà hàng muốn tham gia hệ thống SeatNow.
 * Thiết kế phong cách Landing Page cao cấp, tối giản và hỗ trợ đa ngôn ngữ.
 */
const OwnerJoinPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white selection:bg-primary/10 font-body text-slate-900 -mt-20">
      {/* Hero Section (Vietnamese comment) *) */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Gradients (Vietnamese comment) *) *) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[50%] bg-blue-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <Link 
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-6 font-bold group"
            >
              <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
              {t('auth.ownerJoin.backHome')}
            </Link>
            
            <h1 className="text-7xl font-black leading-[1.05] mb-4 tracking-tighter">
              {t('auth.ownerJoin.heroTitle')} <span className="text-primary">SeatNow</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-8 font-medium max-w-2xl">
              {t('auth.ownerJoin.heroSubtitle')}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={openModal}
                className="px-12 py-5 bg-primary text-white rounded-2xl font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 text-lg"
              >
                {t('auth.ownerJoin.applyBtn')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid (Vietnamese comment) *) *) *) *) *) */}
      <section className="py-16 bg-slate-50/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'trending_up',
                title: t('auth.ownerJoin.benefit1Title'),
                desc: t('auth.ownerJoin.benefit1Desc')
              },
              {
                icon: 'analytics',
                title: t('auth.ownerJoin.benefit2Title'),
                desc: t('auth.ownerJoin.benefit2Desc')
              },
              {
                icon: 'hub',
                title: t('auth.ownerJoin.benefit3Title'),
                desc: t('auth.ownerJoin.benefit3Desc')
              }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-slate-100 group">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tight">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Footer Identity (Vietnamese comment) *) *) *) *) *) *) */}
      <footer className="py-16 border-t border-slate-100/50 text-center">
        <div className="max-w-xl mx-auto px-8 space-y-8">
          <h2 className="text-4xl font-black tracking-tighter italic text-slate-400/80">
            "{t('auth.ownerJoin.footerSlogan')}"
          </h2>
          <div className="h-px w-24 bg-slate-200 mx-auto"></div>
          <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-slate-500">
            SeatNow Business Solutions &copy; 2026
          </span>
        </div>
      </footer>

      {/* Partner Request Modal (Vietnamese comment) *) *) *) *) *) *) *) */}
      <PartnerRequestModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default OwnerJoinPage;
