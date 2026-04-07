import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config/routes.js';
import { slugify } from '../../../shared/utils/slugify.js';
import { useRestaurantReviewSummary } from '../../reviews/hooks.js';

/**
 * @file RestaurantCard.jsx
 * @description Component Card cho nhà hàng, tự động đồng bộ rating từ MongoDB để tránh dữ liệu ảo từ SQL.
 * Tích hợp đa ngôn ngữ cho nhãn và nút bấm.
 */
const RestaurantCard = ({ restaurant }) => {
  const { t } = useTranslation();
  const restId = restaurant.id || restaurant._id;
  // Lấy dữ liệu thật từ MongoDB Review Service
  const { data: summaryData } = useRestaurantReviewSummary(restaurant.slug || restId);
  const summary = summaryData?.data || summaryData;

  // Ưu tiên dữ liệu từ MongoDB, nếu chưa load xong mới dùng tạm SQL (Vietnamese comment)
  const hasHistory = summary && typeof summary.totalReviews === 'number';
  const displayRating = hasHistory ? summary.averageRating : (restaurant.ratingAvg || 0);
  const displayCount = hasHistory ? summary.totalReviews : (restaurant.ratingCount || 0);
  
  const isAvailable = displayCount > 0;

  return (
    <div className="group bg-white rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-500 shadow-sm border border-slate-100 hover:shadow-xl relative h-full">
      {/* Toàn bộ thẻ là Link */}
      <Link 
        to={ROUTES.RESTAURANT_DETAIL(restaurant.slug || slugify(restaurant.name) || restId)}
        className="absolute inset-0 z-50 cursor-pointer"
        aria-label={`View details for ${restaurant.name}`}
      />

      <div className="h-64 relative overflow-hidden">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          alt={restaurant.name} 
          src={restaurant.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop'}
          draggable="false"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 z-20 shadow-sm">
          <span className={`material-symbols-outlined text-sm ${isAvailable ? 'text-yellow-500' : 'text-slate-300'}`} style={{fontVariationSettings: "'FILL' 1"}}>star</span>
          <span className="text-xs font-bold text-slate-900">
            {isAvailable ? Number(displayRating).toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <div className="pr-2 text-left">
            <h3 className="text-[1.375rem] font-semibold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">{restaurant.name}</h3>
          </div>
          <span className="text-primary font-medium">
            {'$'.repeat(restaurant.priceRange || 2)}
          </span>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 flex items-center gap-1 text-left">
          <span className="material-symbols-outlined text-base text-primary/60">location_on</span> 
          <span className="line-clamp-1">{restaurant.address || restaurant.location || 'Vietnam'}</span>
        </p>
        
        <div className="flex items-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {(restaurant.cuisineTypes && restaurant.cuisineTypes[0]) || restaurant.cuisine || t('home.featured.cuisine_fallback')}
          </span>
          {isAvailable && (
            <span className="text-[10px] text-slate-400 font-medium italic">
              ({t('home.featured.reviews_count', { count: displayCount })})
            </span>
          )}
        </div>
        
        <div className="relative z-20">
          <div className="block w-full py-3 text-center border border-slate-200 rounded-lg font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all font-body text-sm tracking-wide">
            {t('home.featured.view_details')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
