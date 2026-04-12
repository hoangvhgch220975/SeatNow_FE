import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

/**
 * @file PolicyPage.jsx
 * @description Trang Chính sách & Điều khoản của SeatNow - Dựa trên thiết kế premium được cung cấp.
 */
const PolicyPage = () => {
  const { t } = useTranslation();

  const tocItems = [
    { id: 'terms-of-use', label: t('public_policy.sections.toc.items.terms') },
    { id: 'privacy-policy', label: t('public_policy.sections.toc.items.privacy') },
    { id: 'booking-policy', label: t('public_policy.sections.toc.items.booking') },
    { id: 'deposit-policy', label: t('public_policy.sections.toc.items.deposit') },
    { id: 'refund-policy', label: t('public_policy.sections.toc.items.refund') },
    { id: 'responsibility', label: t('public_policy.sections.toc.items.liability') },
    { id: 'contact', label: t('public_policy.sections.toc.items.support') }
  ];

  const refundItems = t('public_policy.sections.refund.items', { returnObjects: true });

  return (
    <main className="-mt-10 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden bg-surface-container-low mb-20 rounded-3xl">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="inline-block py-2 px-4 rounded-full bg-primary-container/10 text-primary font-bold text-xs tracking-widest uppercase mb-6">
            {t('public_policy.hero.tag')}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 headline">
            {t('public_policy.hero.title')}
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
            {t('public_policy.hero.desc')}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Sidebar Table of Contents */}
        <aside className="lg:col-span-4 self-start sticky top-32">
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
            <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              {t('public_policy.sections.toc.title')}
            </h4>
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-all group shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors"></span>
                  <span className="font-bold text-sm">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-8 space-y-24 pb-32">
          
          {/* Section: Terms of Service */}
          <section className="scroll-mt-32" id="terms-of-use">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">
              {t('public_policy.sections.terms.title')}
            </h2>
            <div className="text-slate-600 space-y-6 leading-relaxed">
              <p>
                <Trans i18nKey="public_policy.sections.terms.intro">
                  Welcome to <strong>SeatNow</strong>. By accessing and using our services, you agree to comply with the following regulations.
                </Trans>
              </p>
              <p>{t('public_policy.sections.terms.p1')}</p>
              <ul className="space-y-4 list-none p-0">
                {t('public_policy.sections.terms.list', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-1">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section: Privacy Policy */}
          <section className="scroll-mt-32" id="privacy-policy">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">
              {t('public_policy.sections.privacy.title')}
            </h2>
            <div className="p-8 bg-slate-50 rounded-3xl mb-8 border border-slate-100">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">security</span>
                {t('public_policy.sections.privacy.security_title')}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {t('public_policy.sections.privacy.security_desc')}
              </p>
            </div>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>{t('public_policy.sections.privacy.p1')}</p>
            </div>
          </section>

          {/* Section: Booking Policy */}
          <section className="scroll-mt-32" id="booking-policy">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">
              {t('public_policy.sections.booking.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-3">{t('public_policy.sections.booking.advance.title')}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t('public_policy.sections.booking.advance.desc')}
                </p>
              </div>
              <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-3">{t('public_policy.sections.booking.guests.title')}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t('public_policy.sections.booking.guests.desc')}
                </p>
              </div>
            </div>
          </section>

          {/* Section: Deposit Policy */}
          <section className="scroll-mt-32" id="deposit-policy">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">
              {t('public_policy.sections.deposit.title')}
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {t('public_policy.sections.deposit.desc')}
            </p>
            <div className="bg-primary/5 p-10 rounded-3xl border-l-4 border-primary shadow-sm">
              <p className="italic text-slate-700 font-medium leading-relaxed">
                "{t('public_policy.sections.deposit.quote')}"
              </p>
            </div>
          </section>

          {/* Section: Cancellation & Refund */}
          <section className="scroll-mt-32" id="refund-policy">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">
              {t('public_policy.sections.refund.title')}
            </h2>
            <div className="space-y-8 text-slate-600">
              {refundItems.map((item) => (
                <div key={item.step} className="flex items-start gap-6 group">
                  <span className="font-bold text-primary py-2 px-4 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Liability */}
          <section className="scroll-mt-32" id="responsibility">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">
              {t('public_policy.sections.liability.title')}
            </h2>
            <div className="text-slate-600 space-y-6 leading-relaxed text-lg font-medium">
              <p>
                <Trans i18nKey="public_policy.sections.liability.p1">
                  <strong>SeatNow</strong> is not responsible for claims related to food quality, direct service at the restaurant, or incidents beyond the control of the platform.
                </Trans>
              </p>
              <p className="text-slate-500 text-sm italic">{t('public_policy.sections.liability.p2')}</p>
            </div>
          </section>

          {/* Section: Support Contact */}
          <section className="scroll-mt-32" id="contact">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">
              {t('public_policy.sections.support.title')}
            </h2>
            <div className="bg-primary p-12 rounded-[2.5rem] text-on-primary shadow-2xl shadow-primary/30 relative overflow-hidden">
               {/* Decorative background circle */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>

              <h3 className="text-3xl font-bold mb-4 relative z-10 headline">{t('public_policy.sections.support.hero_title')}</h3>
              <p className="mb-10 text-white/80 font-medium relative z-10 underline-offset-4 decoration-white/20">
                {t('public_policy.sections.support.hero_desc')}
              </p>
              <div className="flex flex-wrap gap-8 relative z-10">
                <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
                  <span className="material-symbols-outlined text-white">call</span>
                  <span className="font-bold text-lg tracking-tight">(0812823285)</span>
                </div>
                <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
                  <span className="material-symbols-outlined text-white">mail</span>
                  <span className="font-bold text-lg tracking-tight">hoangvhgch220975@fpt.edu.vn</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PolicyPage;
