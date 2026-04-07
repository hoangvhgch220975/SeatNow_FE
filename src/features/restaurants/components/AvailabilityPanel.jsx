import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routes.js';

/**
 * @file AvailabilityPanel.jsx
 * @description Bảng điều khiển đặt bàn (thường ở cột phải, dạng sticky). Hỗ trợ đa ngôn ngữ.
 */
const AvailabilityPanel = ({ restaurant }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Điều hướng sang trang đặt bàn thực tế (cinema style) (Vietnamese comment)
    navigate(ROUTES.CREATE_BOOKING(restaurant.slug || restaurant.id));
  };

  return (
    <div className="sticky top-28 bg-surface-container-lowest rounded-xl p-10 shadow-lg border border-outline-variant/10 text-center space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-zinc-900">
          {t('restaurants.availability.title')}
        </h2>
        <p className="text-on-surface-variant font-light text-sm">
          {t('restaurants.availability.description', { cuisine: restaurant.cuisine })}
        </p>
      </div>

      {/* Nút Đặt bàn (Vietnamese comment) */}
      <button 
        onClick={handleBookNow}
        className="w-full bg-primary-container text-white py-5 rounded-full font-bold text-lg hover:brightness-110 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/30 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]"
      >
        {t('restaurants.card.book_now')}
      </button>

      <div className="flex items-center justify-center gap-4 pt-4 border-t border-outline-variant/10">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-zinc-900">
            {restaurant.reviewCount > 0 ? Number(restaurant.rating || 0).toFixed(1) : 'N/A'}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            {t('restaurants.card.rating')}
          </span>
        </div>
        <div className="w-px h-8 bg-outline-variant/30"></div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-zinc-900">
            {restaurant.reviewCount >= 1000 
              ? `${(restaurant.reviewCount / 1000).toFixed(1)}k` 
              : restaurant.reviewCount}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            {t('restaurants.card.reviews')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPanel;
