import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, Link } from 'react-router';
import { ROUTES } from '../../../config/routes.js';
import RestaurantMenu from '../components/RestaurantMenu';
import { useRestaurant } from '../hooks.js';

/**
 * @file RestaurantMenuPage.jsx
 * @description Trang hiển thị thực đơn đầy đủ của một nhà hàng cụ thể. Hỗ trợ đa ngôn ngữ.
 */
const RestaurantMenuPage = () => {
  const { t } = useTranslation();
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  
  // Lấy thông tin nhà hàng để hiển thị Header (Vietnamese comment)
  const { data: restaurantData, isLoading } = useRestaurant(idOrSlug);
  const restaurant = restaurantData?.data || restaurantData;

  const handleBack = () => {
    // Quay lại trang chi tiết nhà hàng (Vietnamese comment)
    navigate(ROUTES.RESTAURANT_DETAIL(idOrSlug));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">
            {t('restaurants.menu.loading')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-20 -mt-0">
      <div className="max-w-7xl mx-auto px-8">
        {/* Navigation Header (Vietnamese comment) */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={handleBack}
            className="group flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors font-bold uppercase text-xs tracking-widest"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </div>
            {t('restaurants.menu.back')}
          </button>

          {restaurant && (
            <div className="flex items-center gap-5 text-right hidden sm:flex">
              <div>
                <h1 className="text-xl font-black text-on-surface line-clamp-1">{restaurant.name}</h1>
                <p className="text-xs text-primary font-bold uppercase tracking-widest">{restaurant.cuisine || t('restaurants.menu.title')}</p>
              </div>
              <img 
                src={restaurant.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200&auto=format&fit=crop'} 
                alt={restaurant.name}
                className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white"
              />
            </div>
          )}
        </div>

        {/* The Menu Content (Vietnamese comment) */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-outline-variant/10">
          <RestaurantMenu restaurantId={idOrSlug} />
        </div>

        {/* Footer CTA (Vietnamese comment) */}
        <div className="mt-16 text-center">
            <p className="text-on-surface-variant font-medium mb-6">
              {t('restaurants.menu.footer_cta')}
            </p>
            <Link 
              to={ROUTES.RESTAURANT_DETAIL(idOrSlug)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-[2rem] font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
            >
              {t('restaurants.menu.reserve_button')}
              <span className="material-symbols-outlined">event_seat</span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
