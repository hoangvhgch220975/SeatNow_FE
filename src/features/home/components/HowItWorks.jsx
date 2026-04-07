import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @file HowItWorks.jsx
 * @description Hướng dẫn quy trình đặt chỗ trên SeatNow. Hỗ trợ đa ngôn ngữ.
 */
const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 max-w-7xl mx-auto px-8 w-full">
      <div className="text-center mb-20">
        <h2 className="text-[1.75rem] font-bold text-slate-900">
          {t('home.how.title')}
        </h2>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
        {/* Đường nối giữa các bước (Vietnamese comment) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        
        {/* Bước 1 (Vietnamese comment) */}
        <div className="relative space-y-4">
          <div className="w-16 h-16 bg-primary text-white rounded-full mx-auto flex items-center justify-center font-bold text-xl relative z-10 shadow-lg shadow-primary/30">1</div>
          <h5 className="font-bold text-lg text-slate-900">
            {t('home.how.step1.title')}
          </h5>
          <p className="text-sm text-slate-500">
            {t('home.how.step1.desc')}
          </p>
        </div>

        {/* Bước 2 (Vietnamese comment) */}
        <div className="relative space-y-4">
          <div className="w-16 h-16 bg-primary text-white rounded-full mx-auto flex items-center justify-center font-bold text-xl relative z-10 shadow-lg shadow-primary/30">2</div>
          <h5 className="font-bold text-lg text-slate-900">
            {t('home.how.step2.title')}
          </h5>
          <p className="text-sm text-slate-500">
            {t('home.how.step2.desc')}
          </p>
        </div>

        {/* Bước 3 (Vietnamese comment) */}
        <div className="relative space-y-4">
          <div className="w-16 h-16 bg-primary text-white rounded-full mx-auto flex items-center justify-center font-bold text-xl relative z-10 shadow-lg shadow-primary/30">3</div>
          <h5 className="font-bold text-lg text-slate-900">
            {t('home.how.step3.title')}
          </h5>
          <p className="text-sm text-slate-500">
            {t('home.how.step3.desc')}
          </p>
        </div>

        {/* Bước 4 (Vietnamese comment) */}
        <div className="relative space-y-4">
          <div className="w-16 h-16 bg-primary text-white rounded-full mx-auto flex items-center justify-center font-bold text-xl relative z-10 shadow-lg shadow-primary/30">4</div>
          <h5 className="font-bold text-lg text-slate-900">
            {t('home.how.step4.title')}
          </h5>
          <p className="text-sm text-slate-500">
            {t('home.how.step4.desc')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
