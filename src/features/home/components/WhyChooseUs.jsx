import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @file WhyChooseUs.jsx
 * @description Giới thiệu các tính năng nổi bật của SeatNow. Hỗ trợ đa ngôn ngữ.
 */
const WhyChooseUs = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white border-y border-slate-100 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[1.75rem] font-bold text-slate-900">
            {t('home.why.title')}
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">
            {t('home.why.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Instant Booking (Vietnamese comment) */}
          <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">bolt</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">
              {t('home.why.features.instant.title')}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('home.why.features.instant.desc')}
            </p>
          </div>

          {/* Curated Selection (Vietnamese comment) */}
          <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">verified</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">
              {t('home.why.features.curated.title')}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('home.why.features.curated.desc')}
            </p>
          </div>

          {/* Smart Reservations (Vietnamese comment) */}
          <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">smart_toy</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">
              {t('home.why.features.smart.title')}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('home.why.features.smart.desc')}
            </p>
          </div>

          {/* AI Assistant (Vietnamese comment) */}
          <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">support_agent</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">
              {t('home.why.features.ai.title')}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('home.why.features.ai.desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
