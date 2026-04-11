import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

/**
 * @file RestaurantHeader.jsx
 * @description Tiêu đề chính của trang danh sách nhà hàng, bao gồm thanh tìm kiếm. Hỗ trợ đa ngôn ngữ.
 */
const RestaurantHeader = ({ onSearch, currentSearch }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(currentSearch || '');

  // Sync local state when filters are cleared from elsewhere (e.g. sidebar)
  React.useEffect(() => {
    setSearchQuery(currentSearch || '');
  }, [currentSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    // If user clears the input, immediately reset to show all restaurants
    if (val.trim() === '') {
      onSearch('');
    }
  };

  return (
    <header className="pt-4 pb-16 -mt-8 flex flex-col items-center text-center space-y-8">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-6xl font-extrabold tracking-tight text-on-surface font-headline leading-tight">
          <Trans i18nKey="restaurants.search.header_title">
            Explore <span className="text-primary italic">Extraordinary</span> Dining
          </Trans>
        </h1>
        <p className="text-lg text-on-surface-variant font-body">
          {t('restaurants.search.header_desc')}
        </p>
      </div>
      
      {/* Elegant Search Bar (Vietnamese comment) */}
      <form onSubmit={handleSearch} className="w-full max-w-4xl mt-8 px-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
          <div className="relative flex items-center bg-white p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200/50 focus-within:border-primary/40 focus-within:ring-0 focus-within:outline-none outline-none ring-0 transition-all">
            <div className="pl-6 pr-4 text-primary">
              <span className="material-symbols-outlined text-3xl">search</span>
            </div>
            <input 
              className="w-full bg-transparent border-none focus:ring-0 focus:outline-none outline-none text-on-surface text-lg placeholder:text-slate-400" 
              placeholder={t('restaurants.search.placeholder')} 
              value={searchQuery}
              onChange={handleChange}
              type="text"
            />
            <button 
              type="submit"
              className="bg-primary text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-primary-container transition-all active:scale-95"
            >
              {t('restaurants.search.header_button')}
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default RestaurantHeader;
