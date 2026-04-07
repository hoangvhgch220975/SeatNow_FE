import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import MenuItemModal from './MenuItemModal.jsx';

/**
 * Cấu hình ảnh placeholder chất lượng cao (Vietnamese comment)
 */
const CATEGORY_PLACEHOLDERS = {
  'Appetizers': 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=600&auto=format&fit=crop',
  'Main Course': 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
  'Default': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop'
};

/**
 * @file RestaurantMenuPreview.jsx
 * @description Hiển thị danh sách các món ăn tiêu biểu (Giới hạn 4 món). Hỗ trợ đa ngôn ngữ.
 */
const RestaurantMenuPreview = ({ menuItems, onViewFullMenu }) => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);

  // Chỉ lấy tối đa 4 món tiêu biểu (Vietnamese comment)
  const displayItems = menuItems?.slice(0, 4) || [];
  const hasMore = menuItems?.length > 4;

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">
            {t('restaurants.menu.preview_title')}
          </h2>
          <p className="text-sm text-on-surface-variant font-medium">
            <Trans i18nKey="restaurants.menu.preview_desc">
              A glimpse into our chef's finest creations. <span className="text-primary/60 italic">Click any dish to explore.</span>
            </Trans>
          </p>
        </div>
        {hasMore && (
          <button
            onClick={onViewFullMenu}
            className="group flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest hover:gap-3 transition-all underline-offset-8 hover:underline decoration-2"
          >
            {t('restaurants.menu.view_full')}
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayItems.map((item, index) => (
          <div
            key={item._id || item.id || index}
            className="group flex gap-6 bg-white p-5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10 hover:border-primary/20 cursor-pointer"
            onClick={() => setSelectedItem(item)}
            title={t('restaurants.card.view_details')}
          >
            {/* Minimalist Image (Vietnamese comment) */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
              {item.discountPrice && (
                <div className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase z-10 shadow-lg animate-pulse">
                  {t('restaurants.menu.offer_badge')}
                </div>
              )}
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={(item.images && item.images[0]) || item.image || item.imageUrl || item.img || item.imgUrl || item.photo || CATEGORY_PLACEHOLDERS[item.category] || CATEGORY_PLACEHOLDERS.Default}
                alt={item.name}
              />
            </div>

            {/* Info (Vietnamese comment) */}
            <div className="flex-1 flex flex-col justify-center py-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
                <span className="text-primary font-black">{(item.discountPrice || item.price)?.toLocaleString()} VNĐ</span>
              </div>
              <p className="text-sm text-on-surface-variant/70 line-clamp-2 leading-relaxed italic">
                {item.description || t('restaurants.menu.fallback_desc')}
              </p>
              {/* Click hint (Vietnamese comment) */}
              <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-300 font-medium group-hover:text-primary/60 transition-colors">
                <span className="material-symbols-outlined text-xs">touch_app</span>
                {t('restaurants.card.view_details')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Item Detail Popup (Vietnamese comment) */}
      <AnimatePresence>
        {selectedItem && (
          <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantMenuPreview;
