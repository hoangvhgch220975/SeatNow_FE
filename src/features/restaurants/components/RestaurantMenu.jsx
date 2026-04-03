import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRestaurantMenu } from '../hooks.js';
import MenuItemModal from './MenuItemModal.jsx';

/**
 * Cấu hình ảnh placeholder chất lượng cao theo danh mục (Source: Unsplash)
 */
const CATEGORY_PLACEHOLDERS = {
  'Appetizers': 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=600&auto=format&fit=crop',
  'Main Course': 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
  'Soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop',
  'Desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600&auto=format&fit=crop',
  'Drinks': 'https://images.unsplash.com/photo-1544145945-f904253db0ad?q=80&w=600&auto=format&fit=crop',
  'Seafood': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop',
  'Vegetarian': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
  'Default': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop'
};

/**
 * @file RestaurantMenu.jsx
 * @description Component hiển thị đầy đủ thực đơn nhà hàng, phân chia theo danh mục.
 */
const RestaurantMenu = ({ restaurantId }) => {
  const { data: menuData, isLoading, isError } = useRestaurantMenu(restaurantId);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // 1. Chuẩn hóa & Nhóm dữ liệu
  const items = menuData?.data || menuData || [];
  
  const groupedMenu = useMemo(() => {
    const groups = { 'All': items };
    items.forEach(item => {
      const cat = item.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [items]);

  const categories = Object.keys(groupedMenu);

  // 2. Lọc theo category và search query
  const filteredItems = useMemo(() => {
    let result = groupedMenu[activeCategory] || [];
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [activeCategory, groupedMenu, searchQuery]);

  if (isLoading) return (
    <div className="flex flex-col gap-6">
      <div className="h-10 w-64 bg-slate-200 rounded-full animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );

  if (isError || items.length === 0) return null;

  return (
    <div className="space-y-10 py-4">
      {/* Menu Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        <h2 className="text-3xl font-bold tracking-tight text-on-surface">The Menu</h2>
        <div className="relative group max-w-sm w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors">search</span>
          <input 
            type="text" 
            placeholder="Search our flavors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300
              ${activeCategory === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105' 
                : 'bg-white text-on-surface-variant hover:bg-slate-50 border border-outline-variant/50'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item._id || item.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: [0.215, 0.610, 0.355, 1.000] // Cubic bezier cho hiệu ứng mượt mà
              }}
              className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-outline-variant/10 hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={(item.images && item.images[0]) || item.image || item.imageUrl || item.img || item.imgUrl || item.photo || CATEGORY_PLACEHOLDERS[item.category] || CATEGORY_PLACEHOLDERS.Default} 
                  alt={item.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.discountPrice && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-xl">
                    Special Offer
                  </div>
                )}
                {item.category && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                    {item.category}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3 className="font-bold text-lg text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-right">
                    {item.discountPrice ? (
                      <div className="flex flex-col items-end">
                        <span className="text-primary font-black text-lg">{item.discountPrice?.toLocaleString()} VNĐ</span>
                        <span className="text-xs text-on-surface-variant line-through opacity-50 font-medium">{item.price?.toLocaleString()} VNĐ</span>
                      </div>
                    ) : (
                      <span className="text-primary font-black text-lg">{item.price?.toLocaleString()} VNĐ</span>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-on-surface-variant/80 line-clamp-2 leading-relaxed italic mb-4">
                  {item.description || "Indulge in our carefully selected ingredients prepared with passion."}
                </p>

                {/* Tags */}
                {item.tags?.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4 border-t border-dotted border-outline-variant/30">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-medium text-slate-400">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State within Filter */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-outline-variant/50">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4 animate-bounce">restaurant_menu</span>
          <p className="text-on-surface-variant font-medium">No delicacies found matching your search.</p>
        </div>
      )}

      {/* Menu Item Detail Popup */}
      <AnimatePresence>
        {selectedItem && (
          <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantMenu;
