import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @file MenuItemModal.jsx
 * @description Popup chi tiết món ăn - hiển thị đúng các trường từ MongoDB menuitems collection:
 *   name, description, price, discountPrice, category, images[], isAvailable,
 *   preparationTime, tags[], allergens[], createdAt
 */
const MenuItemModal = ({ item, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);

  // Chuẩn hoá danh sách ảnh
  const images =
    Array.isArray(item?.images) && item.images.length > 0
      ? item.images
      : [
          item?.image ||
          item?.imageUrl ||
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
        ];

  const hasMultiple = images.length > 1;

  // ESC + phím mũi tên → điều hướng gallery
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setActiveImg((p) => Math.max(p - 1, 0));
      if (e.key === 'ArrowRight') setActiveImg((p) => Math.min(p + 1, images.length - 1));
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, images.length]);

  // Khoá scroll body khi modal mở
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Reset ảnh khi đổi item
  useEffect(() => { setActiveImg(0); }, [item]);

  if (!item) return null;

  // Tính giá hiển thị & giảm giá
  const finalPrice = item.discountPrice || item.price;
  const hasDiscount = !!item.discountPrice && item.discountPrice < item.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - item.discountPrice / item.price) * 100)
    : 0;

  // Format ngày tháng sang tiếng Anh
  const formatDate = (iso) => {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString('en-US', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  };

  // Touch/mouse swipe
  const handleDragStart = (e) => {
    const x = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragStartX(x);
  };
  const handleDragEnd = (e) => {
    if (dragStartX === null || !hasMultiple) return;
    const x = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX - x;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActiveImg((p) => Math.min(p + 1, images.length - 1));
      else setActiveImg((p) => Math.max(p - 1, 0));
    }
    setDragStartX(null);
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
        onClick={onClose}
      >
        {/* Modal card */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 80, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ───── IMAGE GALLERY ───── */}
          <div
            className="relative flex-shrink-0 bg-slate-100 select-none"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            {/* Main image */}
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={images[activeImg]}
                  alt={`${item.name} ${activeImg + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.22 }}
                  draggable={false}
                />
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent pointer-events-none" />

              {/* Left / Right arrows */}
              {hasMultiple && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveImg((p) => Math.max(p - 1, 0)); }}
                    disabled={activeImg === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-sm text-white flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveImg((p) => Math.min(p + 1, images.length - 1)); }}
                    disabled={activeImg === images.length - 1}
                    className="absolute right-12 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-sm text-white flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </>
              )}

              {/* Top-left badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                {item.category && (
                  <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {item.category}
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-tighter px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Availability badge */}
              <div className="absolute top-4 right-14 pointer-events-none">
                <span className={`text-[10px] font-black uppercase tracking-wide px-3 py-1.5 rounded-full shadow-sm ${
                  item.isAvailable !== false
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {item.isAvailable !== false ? '✓ Available' : '✗ Unavailable'}
                </span>
              </div>

              {/* Prep time — bottom left */}
              {item.preparationTime && (
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {item.preparationTime} min
                </div>
              )}

              {/* Image counter — bottom right (nếu có nhiều ảnh) */}
              {hasMultiple && (
                <div className="absolute bottom-4 right-14 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none">
                  {activeImg + 1} / {images.length}
                </div>
              )}

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 bg-black/35 hover:bg-black/55 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all z-10"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Thumbnail strip — chỉ hiện nếu có nhiều ảnh */}
            {hasMultiple && (
              <div className="flex gap-2 justify-center py-3 bg-slate-50 border-b border-slate-100 overflow-x-auto px-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="focus:outline-none flex-shrink-0"
                    aria-label={`Image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${i}`}
                      className={`w-10 h-10 rounded-xl object-cover transition-all duration-200 ${
                        i === activeImg
                          ? 'ring-2 ring-primary ring-offset-1 scale-110'
                          : 'opacity-50 hover:opacity-80'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ───── SCROLLABLE INFO ───── */}
          <div className="overflow-y-auto flex-1 p-7 space-y-6">

            {/* Tên + Giá */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-900 leading-tight flex-1">{item.name}</h2>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-black text-primary">
                  {finalPrice?.toLocaleString()} VNĐ
                </div>
                {hasDiscount && (
                  <div className="text-sm text-slate-400 line-through font-medium">
                    {item.price?.toLocaleString()} VNĐ
                  </div>
                )}
              </div>
            </div>

            {/* Mô tả món ăn */}
            {item.description && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Description</p>
                <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
              </div>
            )}

            {/* Thông tin danh mục và thời gian chuẩn bị */}
            {(item.category || item.preparationTime) && (
              <div className="grid grid-cols-2 gap-3">
                {item.category && (
                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3.5">
                    <span className="material-symbols-outlined text-primary text-xl">category</span>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Category</p>
                      <p className="text-sm font-bold text-slate-700">{item.category}</p>
                    </div>
                  </div>
                )}
                {item.preparationTime && (
                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3.5">
                    <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Prep Time</p>
                      <p className="text-sm font-bold text-slate-700">{item.preparationTime} min</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cảnh báo dị ứng */}
            {item.allergens?.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="material-symbols-outlined text-base text-amber-600">warning</span>
                  <span className="text-xs font-black text-amber-700 uppercase tracking-wider">Allergen Info</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen) => (
                    <span key={allergen} className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags của món ăn */}
            {item.tags?.length > 0 && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ngày thêm món vào thực đơn */}
            {item.createdAt && (
              <p className="text-[11px] text-slate-300 text-right">
                Added to menu: {formatDate(item.createdAt)}
              </p>
            )}

            {/* Bottom spacer */}
            <div className="h-1" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuItemModal;
