import React, { useState, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import RestaurantHeader from '../components/RestaurantHeader';
import RestaurantFilters from '../components/RestaurantFilters';
import RestaurantCard from '../components/RestaurantCard';
import Pagination from '../../../shared/ui/Pagination.jsx';
import { useRestaurants } from '../hooks.js';

/**
 * @file RestaurantListPage.jsx
 * @description Trang chính quản lý hiển thị danh sách và lọc nhà hàng từ API. Hỗ trợ đa ngôn ngữ.
 */

// Component Skeleton cho Restaurant Card (Vietnamese comment)
const RestaurantSkeleton = () => (
  <div className="w-full flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 animate-pulse">
    <div className="h-72 bg-slate-200/60"></div>
    <div className="p-8 flex flex-col flex-grow space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <div className="h-7 bg-slate-200/80 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-200/60 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-slate-200/80 rounded w-12 text-right"></div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="h-6 w-20 bg-slate-200/60 rounded-full"></div>
      </div>

      <div className="pt-6 mt-auto flex gap-4">
        <div className="flex-1 h-12 rounded-full bg-slate-200/60"></div>
        <div className="flex-1 h-12 rounded-full bg-slate-200/80"></div>
      </div>
    </div>
  </div>
);

const RestaurantListPage = () => {
  const { t } = useTranslation();

  // 1. Quản lý State cho bộ lọc (Filters State) (Vietnamese comment)
  const [filters, setFilters] = useState({
    cuisine: '',
    priceRange: null,
    sort: 'rating',
    location: '',
    q: '',
    radiusKm: 20,
    page: 1,
    limit: 6
  });

  const [isLocating, setIsLocating] = useState(false);

  // 2. Gọi API thông qua Hook React Query (Vietnamese comment)
  const { data, isLoading, isError, error } = useRestaurants(filters);

  // Chuẩn hóa danh sách nhà hàng (Vietnamese comment)
  const restaurants = useMemo(() => {
    return data?.data || [];
  }, [data]);
  
  // Tổng số lượng lấy từ metadata của API (Vietnamese comment)
  const totalCount = data?.total || 0;

  // LOGIC PHÂN TRANG HYBRID (Vietnamese comment)
  const totalPages = useMemo(() => {
    if (totalCount > 0) return Math.ceil(totalCount / filters.limit);
    return data?.hasMore ? filters.page + 1 : filters.page;
  }, [totalCount, filters.limit, filters.page, data?.hasMore]);

  // 3. Xử lý logic lấy tọa độ người dùng cho bộ lọc "Nearest" (Vietnamese comment)
  const requestLocation = () => {
    return new Promise(async (resolve, reject) => {
      // Hàm dự phòng lấy vị trí qua nhiều dịch vụ IP (Vietnamese comment)
      const fetchLocationByIP = async () => {
        const apis = [
          'https://freeipapi.com/api/json',
          'https://ipapi.co/json/'
        ];
        
        for (const url of apis) {
          try {
            const response = await fetch(url);
            if (!response.ok) continue;
            const data = await response.json();
            if (data.latitude && data.longitude) {
              return { lat: data.latitude, lng: data.longitude };
            }
          } catch (err) {
            // Quietly continue
          }
        }
        return null;
      };

      // Vị trí mặc định (Hà Nội) (Vietnamese comment)
      const DEFAULT_LOCATION = { lat: 21.0285, lng: 105.8542 };

      if (!navigator.geolocation) {
        const ipCoords = await fetchLocationByIP();
        return resolve(ipCoords || DEFAULT_LOCATION);
      }

      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        async (error) => {
          const ipCoords = await fetchLocationByIP();
          setIsLocating(false);
          if (ipCoords) {
            resolve(ipCoords);
          } else {
            resolve(DEFAULT_LOCATION);
          }
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    });
  };

  // 4. Xử lý logic thay đổi bộ lọc & phân trang (Vietnamese comment)
  const handleFilterChange = async (newFilters) => {
    let finalFilters = { ...filters, ...newFilters, page: 1 };

    if (newFilters.sort && newFilters.sort !== 'distance') {
      delete finalFilters.lat;
      delete finalFilters.lng;
      finalFilters.radiusKm = 20;
    }

    if (finalFilters.sort === 'distance' && (!finalFilters.lat || !finalFilters.lng)) {
      try {
        const coords = await requestLocation();
        finalFilters = { ...finalFilters, ...coords, radiusKm: 20 };
      } catch (err) {
        finalFilters.sort = 'rating';
      }
    }

    setFilters(finalFilters);
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-7xl mx-auto px-8 pb-24">
      <RestaurantHeader onSearch={(q) => handleFilterChange({ q })} />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] w-full gap-12 mt-12 items-start">
        {/* Fixed Sidebar (280px) on large screens (Vietnamese comment) */}
        <aside className="w-full lg:sticky lg:top-8 px-1">
          <RestaurantFilters 
            currentFilters={filters} 
            onChange={handleFilterChange} 
            onClearAll={() => setFilters({ sort: 'rating', q: '', cuisine: '', priceRange: null, radiusKm: 20, page: 1, limit: 6 })}
          />
        </aside>

        {/* Main Content Area (Vietnamese comment) */}
        <section className="min-w-0 w-full space-y-8 min-h-[600px]">
          {/* Header hiển thị kết quả & Sort (Vietnamese comment) */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200/50 pb-6 w-full">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 headline tracking-tight">
                {t('restaurants.list.title')}
              </h2>
              <p className="text-slate-500 font-medium mt-1">
                {isLocating 
                  ? t('restaurants.list.detecting_location')
                  : isLoading 
                    ? t('restaurants.list.searching') 
                    : (filters.q || filters.cuisine || filters.priceRange)
                      ? t('restaurants.list.found_results', { count: totalCount })
                      : t('restaurants.list.discover_vietnam', { count: totalCount })}
              </p>
            </div>
            <div className="flex items-center space-x-3 mb-1 shrink-0">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {t('restaurants.list.sort_by')}
              </span>
              <select 
                value={filters.sort}
                onChange={(e) => handleFilterChange({ sort: e.target.value })}
                className="bg-transparent border-none text-primary font-bold focus:ring-0 cursor-pointer outline-none hover:text-primary-container transition-colors"
              >
                <option value="rating">{t('restaurants.list.sort_featured')}</option>
                <option value="newest">{t('restaurants.list.sort_newest')}</option>
                <option value="distance">{t('restaurants.list.sort_distance')}</option>
              </select>
            </div>
          </div>

          {/* Hiển thị Loading/Error/Data (Vietnamese comment) */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-12">
              {[...Array(6)].map((_, i) => (
                <RestaurantSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="py-24 text-center bg-red-50/50 rounded-[2.5rem] border-2 border-red-100 text-red-600 shadow-sm w-full">
               <span className="material-symbols-outlined text-4xl mb-2">error</span>
               <p className="font-bold text-lg headline">{t('restaurants.list.error_title')}</p>
               <p className="text-sm opacity-80 mt-1">{error?.response?.data?.message || error?.message || 'The server rejected the current query'}</p>
               <button 
                 onClick={() => window.location.reload()}
                 className="mt-8 px-10 py-3 bg-red-600 text-white rounded-full text-sm font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-all active:scale-95"
               >
                 {t('restaurants.list.try_again')}
               </button>
            </div>
          ) : restaurants.length > 0 ? (
            <div className="w-full space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {restaurants.map((restaurant) => (
                  <RestaurantCard 
                    key={restaurant.id} 
                    restaurant={{
                      ...restaurant,
                      distanceKm: filters.sort === 'distance' ? restaurant.distanceKm : null
                    }} 
                  />
                ))}
              </div>
              
              {/* Thanh Phân trang (Vietnamese comment) */}
              <Pagination 
                currentPage={filters.page} 
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <div className="w-224 self-stretch py-32 px-8 text-center bg-slate-50/70 rounded-[3rem] border-2 border-dashed border-slate-300/80 shadow-inner flex flex-col items-center justify-center">
              <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-xl border border-slate-100/50 transform transition-transform hover:scale-105 duration-300">
                <span className="material-symbols-outlined text-5xl text-slate-300">restaurant_menu</span>
              </div>
              <h3 className="text-slate-600 text-2xl font-bold italic headline tracking-tight mb-2">
                {t('restaurants.list.no_destinations')}
              </h3>
              <p className="text-slate-400 max-w-md mx-auto font-medium leading-relaxed">
                <Trans i18nKey="restaurants.list.no_destinations_desc">
                  We couldn't find any curated destinations matching your current filters. 
                  <br/>Try searching with fewer criteria.
                </Trans>
              </p>
              <button 
                onClick={() => setFilters({ sort: 'rating', q: '', cuisine: '', priceRange: null, page: 1, limit: 6 })}
                className="mt-10 px-12 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-container transition-all transform active:scale-95 shadow-xl shadow-primary/20 tracking-widest uppercase text-xs"
              >
                {t('restaurants.list.clear_filters')}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default RestaurantListPage;
