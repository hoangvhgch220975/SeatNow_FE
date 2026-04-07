import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @file LanguageSwitcher.jsx
 * @description Bộ chuyển đổi ngôn ngữ (English / Vietnamese) dùng chung cho toàn hệ thống.
 * Tích hợp mượt mà vào Navbar/Topbar của các phân hệ.
 */
/**
 * @file LanguageSwitcher.jsx
 * @description Bộ chuyển đổi ngôn ngữ linh hoạt. Hỗ trợ 3 kiểu hiển thị: inline, dropdown, và floating.
 * @param {string} variant - 'inline' (mặc định), 'dropdown' (trong menu), 'floating' (nút nổi FAB).
 */
const LanguageSwitcher = ({ variant = 'inline' }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.split('-')[0]; // Lấy mã ngôn ngữ chính (en/vi)

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  // 1. Cấu hình giao diện FAB (Nút nổi) cho khách vãng lai
  if (variant === 'floating') {
    return (
      <button
        onClick={toggleLanguage}
        className="fixed bottom-32 right-8 z-[100] group flex items-center justify-center w-14 h-14 bg-white/80 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 active:scale-90 overflow-hidden"
        title={currentLang === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-100 mb-0.5">
            <img 
              src={currentLang === 'en' ? 'https://flagcdn.com/us.svg' : 'https://flagcdn.com/vn.svg'} 
              alt={currentLang}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">
            {currentLang === 'en' ? 'EN' : 'VI'}
          </span>
        </div>
      </button>
    );
  }

  // 2. Cấu hình giao diện Item trong Dropdown Menu (User Profile)
  if (variant === 'dropdown') {
    return (
      <button
        onClick={toggleLanguage}
        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-violet-50 text-slate-600 hover:text-primary transition-all group"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors border border-transparent group-hover:border-violet-100 shadow-sm relative overflow-hidden">
          <img 
            src={currentLang === 'en' ? 'https://flagcdn.com/us.svg' : 'https://flagcdn.com/vn.svg'} 
            alt={currentLang}
            className="w-5 h-5 object-cover rounded-sm z-10"
          />
          <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-bold tracking-tight">{t('common.language')}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">
            {currentLang === 'en' ? 'English' : 'Tiếng Việt'}
          </span>
        </div>
        <div className="ml-auto">
          <span className="material-symbols-outlined text-slate-300 text-[18px] group-hover:text-primary transition-colors">sync_alt</span>
        </div>
      </button>
    );
  }

  // 3. Cấu hình mặc định (Inline)
  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-violet-50 border border-slate-200 hover:border-violet-200 rounded-xl transition-all duration-300 overflow-hidden"
    >
      <div className="flex items-center gap-2 relative z-10">
        <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-100 flex-shrink-0">
          <img 
            src={currentLang === 'en' ? 'https://flagcdn.com/us.svg' : 'https://flagcdn.com/vn.svg'} 
            alt={currentLang}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-violet-600 transition-colors">
          {currentLang === 'en' ? 'EN' : 'VI'}
        </span>
      </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        layoutId="lang-bg"
      />
    </button>
  );
};

export default LanguageSwitcher;
