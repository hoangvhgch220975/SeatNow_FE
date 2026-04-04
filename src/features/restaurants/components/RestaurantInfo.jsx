import React from 'react';

/**
 * @file RestaurantInfo.jsx
 * @description Hiển thị mô tả nhà hàng và các tiện ích đi kèm.
 */
const RestaurantInfo = ({ description, amenities, cuisineTypes }) => {
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
      </div>

      {/* Cuisine Tags - Hiển thị đầy đủ */}
      {cuisineTypes && cuisineTypes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary/60">
            Cuisine Style
          </h3>
          <div className="flex flex-wrap gap-2">
            {cuisineTypes.map((type, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 rounded-xl bg-primary/5 text-primary text-sm font-bold border border-primary/10 hover:bg-primary/10 transition-colors"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}



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
