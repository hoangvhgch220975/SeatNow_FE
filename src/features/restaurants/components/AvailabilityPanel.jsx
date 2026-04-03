import React from 'react';

/**
 * @file AvailabilityPanel.jsx
 * @description Bảng điều khiển đặt bàn (thường ở cột phải, dạng sticky).
 */
const AvailabilityPanel = ({ restaurant }) => {
  return (
    <div className="sticky top-28 bg-surface-container-lowest rounded-xl p-10 shadow-lg border border-outline-variant/10 text-center space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-zinc-900">
          Reserve Your Table
        </h2>
        <p className="text-on-surface-variant font-light text-sm">
          Experience the finest modern {restaurant.cuisine} cuisine in an atmosphere of unparalleled elegance.
        </p>
      </div>

      <button className="w-full bg-primary-container text-white py-5 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]">
        Book Now
      </button>

      <div className="flex items-center justify-center gap-4 pt-4 border-t border-outline-variant/10">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-zinc-900">
            {restaurant.reviewCount > 0 ? Number(restaurant.rating || 0).toFixed(1) : 'N/A'}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            Rating
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
            Reviews
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPanel;
