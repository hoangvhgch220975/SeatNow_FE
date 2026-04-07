import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @file RestaurantGallery.jsx
 * @description Bộ sưu tập ảnh nhà hàng phong cách Masonry. Hỗ trợ đa ngôn ngữ.
 */
const RestaurantGallery = ({ photos }) => {
  const { t } = useTranslation();

  if (!photos || photos.length === 0) return null;

  return (
    <section className="px-8 max-w-7xl mx-auto -mt-16 relative z-10 mb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
        {/* Main large photo (Vietnamese comment) */}
        <div className="col-span-2 row-span-2 rounded-xl overflow-hidden shadow-2xl group">
          <img 
            alt={t('restaurants.gallery.alt_main')} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            src={photos[0]} 
          />
        </div>
        
        {/* Smaller photos (Vietnamese comment) */}
        {photos.slice(1, 5).map((photo, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-2xl group">
            <img 
              alt={t('restaurants.gallery.alt_thumb', { index: index + 1 })} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src={photo} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RestaurantGallery;
