import React from 'react';

/**
 * @file RestaurantGallery.jsx
 * @description Bộ sưu tập ảnh nhà hàng phong cách Masonry.
 */
const RestaurantGallery = ({ photos }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <section className="px-8 max-w-7xl mx-auto -mt-16 relative z-10 mb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
        {/* Main large photo */}
        <div className="col-span-2 row-span-2 rounded-xl overflow-hidden shadow-2xl group">
          <img 
            alt="Main Gallery" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            src={photos[0]} 
          />
        </div>
        
        {/* Smaller photos */}
        {photos.slice(1, 5).map((photo, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-2xl group">
            <img 
              alt={`Gallery ${index + 1}`} 
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
