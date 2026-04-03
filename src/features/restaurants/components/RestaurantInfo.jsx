import React from 'react';

/**
 * @file RestaurantInfo.jsx
 * @description Hiển thị mô tả nhà hàng và các tiện ích đi kèm.
 */
const RestaurantInfo = ({ description, amenities }) => {
  return (
    <div className="space-y-16">
      {/* Description */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-on-surface">
          About the Restaurant
        </h2>
        <p className="text-lg text-on-surface-variant leading-relaxed font-light">
          {description}
        </p>
        <button className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
          Read more about our heritage
        </button>
      </div>

      {/* Amenities */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 bg-surface-container-low rounded-xl">
        {amenities.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">
              {item.icon}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantInfo;
