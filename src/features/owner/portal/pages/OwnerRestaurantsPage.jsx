import React, { useState, useMemo } from 'react';
import { usePortfolioDashboard } from '../hooks.js';
import VenueFilters from '../components/VenueFilters';
import VenueList from '../components/VenueList';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next'; // Áp dụng hook ngôn ngữ (Vietnamese comment)

/**
 * @file OwnerRestaurantsPage.jsx
 * @description Trang hiển thị danh sách toàn bộ nhà hàng (All Venues) với bộ lọc trạng thái và tìm kiếm.
 */
const OwnerRestaurantsPage = () => {
  const { t } = useTranslation(); // Lấy hàm dịch i18n (Vietnamese comment)
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Lấy dữ liệu từ hook Portfolio (Đảm bảo lấy tất cả trạng thái từ Backend)
  const { myRestaurants, isLoading } = usePortfolioDashboard({ status: 'all' });

  // Logic lọc và tính toán số lượng
  const filteredVenues = useMemo(() => {
    if (!myRestaurants) return [];

    return myRestaurants.filter((venue) => {
      // 1. Lọc theo tên hoặc địa chỉ
      const matchesSearch = 
        venue.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.address?.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Lọc theo trạng thái
      const matchesStatus = 
        activeStatus === 'all' || 
        venue.status?.toLowerCase() === activeStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [myRestaurants, searchTerm, activeStatus]);

  // Tính toán số lượng cho các Tabs
  const counts = useMemo(() => {
    if (!myRestaurants) return { all: 0, active: 0, pending: 0, suspended: 0 };

    return {
      all: myRestaurants.length,
      active: myRestaurants.filter(v => v.status?.toLowerCase() === 'active').length,
      pending: myRestaurants.filter(v => v.status?.toLowerCase() === 'pending').length,
      suspended: myRestaurants.filter(v => v.status?.toLowerCase() === 'suspended').length,
    };
  }, [myRestaurants]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Tiêu đề trang (Page Header) */}
      <div className="mb-12 space-y-2">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
          <Trans i18nKey="owner_portal.venues_page.all_venues">
            All <span className="text-violet-600">Venues</span>
          </Trans>
        </h2>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
           {t('owner_portal.venues_page.portfolio_asset_management')}
           <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
           {t('owner_portal.venues_page.total_units', { count: counts.all })}
        </p>
      </div>

      {/* Phần bộ lọc (Filter Section) */}
      <VenueFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        counts={counts}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Danh sách hiển thị dạng Lưới/Bảng (Grid/Table List Section) */}
      <VenueList 
        restaurants={filteredVenues}
        isLoading={isLoading}
        viewMode={viewMode}
      />

      {/* Ghi chú tối ưu hóa danh mục (Optimization Note) */}
      <div className="mt-20 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-violet-600 shadow-sm border border-slate-100">
               <span className="material-symbols-outlined text-3xl">insights</span>
            </div>
            <div>
               <h4 className="font-black text-slate-900 text-sm">{t('owner_portal.venues_page.portfolio_insights')}</h4>
               <p className="text-xs text-slate-400 font-bold leading-relaxed">
                  {t('owner_portal.venues_page.portfolio_insights_desc')}
               </p>
            </div>
         </div>
         <button className="px-8 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all">
            {t('owner_portal.venues_page.export_report')}
         </button>
      </div>
    </div>
  );
};

export default OwnerRestaurantsPage;
