import React from 'react';
import { CUISINES } from '../../../constants/cuisines';
import { PRICE_RANGES } from '../../../constants/priceRanges';

/**
 * @file RestaurantFilters.jsx 
 * @description Bộ lọc Sidebar chuyên sâu (5 loại: Destination, Cuisine, Price, Rating, Amenities)
 */
const RestaurantFilters = ({ currentFilters, onChange }) => {
  // Lấy danh sách cuisine tiêu biểu từ constants (giới hạn hiển thị 7 cái chính)
  const mainCuisines = CUISINES.slice(0, 7);


  const handleCuisineChange = (cuisineValue) => {
    // Toggle cuisine: nếu đã chọn thì bỏ chọn, nếu chưa thì chọn mới
    const newValue = currentFilters.cuisine === cuisineValue ? '' : cuisineValue;
    onChange({ cuisine: newValue });
  };

  return (
    <aside className="space-y-10 w-full">
      {/* 1. Filter Section: Destinations (VN Provinces) */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-widest text-primary">Destinations</label>
        <div className="relative">
          <select 
            value={currentFilters.location || 'All Locations'}
            onChange={(e) => onChange({ location: e.target.value === 'All Locations' ? '' : e.target.value })}
            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-primary/40 appearance-none font-medium outline-none shadow-sm transition-all"
          >
            <option>All Locations</option>
            <option>Ha Noi</option>
            <option>Ho Chi Minh City</option>
            <option>Da Nang</option>
            <option>Hai Phong</option>
            <option>Can Tho</option>
            <option>Quang Ninh</option>
            <option>Da Lat</option>
            <option>Nha Trang</option>
            <option>Vung Tau</option>
          </select>

          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
        </div>
      </div>

      {/* 2. Filter Section: Cuisine Choice */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-widest text-primary">Cuisine Type</label>
        <div className="space-y-3">
          {mainCuisines.map((item) => (
            <label key={item.value} className="flex items-center group cursor-pointer">
              <input 
                className="w-5 h-5 rounded border-slate-200 text-primary focus:ring-primary/20 bg-slate-50 transition-all cursor-pointer" 
                type="checkbox"
                checked={currentFilters.cuisine === item.value}
                onChange={() => handleCuisineChange(item.value)}
              />
              <span className="ml-3 text-slate-700 group-hover:text-primary transition-colors font-medium">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Filter Section: Price Range */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-widest text-primary">Price Level</label>
        <div className="flex gap-2">
          {PRICE_RANGES.map((p) => (
            <button 
              key={p.value}
              title={p.description}
              onClick={() => onChange({ priceRange: currentFilters.priceRange === p.value ? null : p.value })}
              className={`flex-1 py-2 rounded-xl font-bold transition-all border ${
                currentFilters.priceRange === p.value 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                  : 'bg-white border-slate-100 hover:border-primary/30 text-slate-500'
              }`}
            >
              {'$'.repeat(p.value)}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Filter Section: Sorting instead of Score Filter */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-widest text-primary">Sort & Ranking</label>
        <div className="space-y-2">
          {[
            { label: 'Highest Rated', val: 'rating' },
            { label: 'New Restaurant', val: 'newest' },
            { label: 'Nearest Distance', val: 'distance' }
          ].map((item) => (
            <button 
              key={item.val} 
              onClick={() => onChange({ sort: item.val })}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all font-medium border ${
                currentFilters.sort === item.val ? 'bg-slate-50 border-primary/20 text-slate-900 shadow-sm' : 'bg-transparent border-slate-100 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <span className="flex items-center">
                <span className="material-symbols-outlined text-primary mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {item.val === 'rating' ? 'star' : item.val === 'newest' ? 'auto_awesome' : 'near_me'}
                </span> 
                {item.label}
              </span>
              <span className="material-symbols-outlined text-primary">
                {currentFilters.sort === item.val ? 'radio_button_checked' : 'radio_button_unchecked'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RestaurantFilters;
