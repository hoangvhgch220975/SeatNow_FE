import React from 'react';

/**
 * @file RestaurantHero.jsx
 * @description Hero section cho trang chi tiết nhà hàng, hiển thị ảnh bìa lớn và thông tin cơ bản.
 */
const RestaurantHero = ({ restaurant }) => {
  return (
    <section className="relative w-full h-[320px] md:h-[380px] overflow-hidden">
      <img 
        alt={restaurant.name} 
        className="w-full h-full object-cover" 
        src={restaurant.coverImage}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/40 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-8 md:px-20 md:pb-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {restaurant.cuisine}
              </span>
              <div className="flex items-center gap-1">
                <span className={`material-symbols-outlined text-sm ${restaurant.reviewCount > 0 ? 'text-yellow-400' : 'text-white/40'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-white font-bold text-sm">
                  {restaurant.reviewCount > 0 ? (Number(restaurant.rating).toFixed(1)) : 'N/A'}
                </span>
                <span className="text-white/60 text-sm font-medium">({restaurant.reviewCount || 0} reviews)</span>
              </div>
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight headline">
              {restaurant.name}
            </h1>
            <p className="text-white/80 text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed">location_on</span>
              {restaurant.location} • {restaurant.priceRange}
            </p>
          </div>
          
          {/* Nút Book Now đã được loại bỏ khỏi Hero để giao diện thoáng hơn, 
              người dùng sẽ đặt bàn thông qua bảng AvailabilityPanel ở bên phải */}
        </div>
      </div>
    </section>
  );
};

export default RestaurantHero;
