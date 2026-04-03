import React, { useState } from 'react';
import { formatDate } from '../../../shared/utils/formatDateTime.js';
import MediaLightbox from '../../../shared/ui/MediaLightbox.jsx';

/**
 * Helper: Lấy chữ cái đầu của tên để làm avatar
 */
const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * @file ReviewCard.jsx
 * @description Thành phần hiển thị một thẻ đánh giá đơn lẻ.
 */
const ReviewCard = ({ review, index }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageClick = (idx) => {
    setActiveImageIndex(idx);
    setIsLightboxOpen(true);
  };

  // Tính toán thông tin người đánh giá (Linh hoạt giữa Customer và Guest)
  // Thêm nhiều biến thể trường dữ liệu để đảm bảo không bỏ sót thông tin từ API
  const rawName = 
    review.customerName || 
    review.customer_name || 
    review.user?.fullName || 
    review.customer?.fullName || 
    review.fullName || 
    review.displayName || 
    review.name;

  const isVietnamesePlaceholder = rawName === 'Khách vãng lai' || rawName === 'Khách';
  
  // Ưu tiên hiển thị tên thực tế nếu không phải placeholder
  const reviewerName = (!isVietnamesePlaceholder && rawName) || (review.customerId || review.userId ? 'Verified Customer' : 'Guest');
  
  const baseAvatar = 
    review.customerAvatar || 
    review.customer_avatar || 
    review.user?.avatar || 
    review.customer?.avatar || 
    review.avatar;

  // Kiểm tra nếu avatar là một placeholder mặc định (như ui-avatars.com)
  const isPlaceholderAvatar = typeof baseAvatar === 'string' && (baseAvatar.includes('ui-avatars.com') || baseAvatar.includes('placeholder'));

  // Xử lý Avatar tự động cho Guest (Khách vãng lai) - Bỏ qua placeholder để dùng DiceBear
  const reviewerAvatar = (!isPlaceholderAvatar && baseAvatar) || (reviewerName.trim() === 'Guest' 
    ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${review.id || review._id || index}&backgroundColor=b6e3f4,c0aede,d1d4f9` 
    : null);

  return (
    <div 
      className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* Author Metadata */}
        <div className="flex items-center sm:flex-col gap-4 sm:w-32 flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-black text-lg shadow-inner ring-4 ring-white overflow-hidden">
            {reviewerAvatar ? (
              <img src={reviewerAvatar} alt={reviewerName} className="w-full h-full object-cover" />
            ) : (
              getInitials(reviewerName)
            )}
          </div>
          <div className="sm:text-center">
            <h4 className="font-bold text-on-surface text-sm line-clamp-1">{reviewerName}</h4>
            <p className="text-[10px] text-on-surface-variant/70 font-medium uppercase tracking-widest mt-1">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        {/* Review Body */}
        <div className="flex-1 space-y-4 bg-white/50 p-6 rounded-3xl border border-outline-variant/10 hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5">
          {/* Internal Ratings Chips */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex text-yellow-500 text-xs gap-0.5 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: `'FILL' ${i < review.rating ? 1 : 0}` }}>star</span>
              ))}
            </div>
            {/* Secondary Ratings */}
            {review.foodRating && (
              <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full uppercase tracking-tighter">Food: {review.foodRating}/5</span>
            )}
            {review.serviceRating && (
              <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full uppercase tracking-tighter">Service: {review.serviceRating}/5</span>
            )}
            {review.atmosphereRating && (
              <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full uppercase tracking-tighter">Vibe: {review.atmosphereRating}/5</span>
            )}
          </div>

          {/* Comment */}
          <p className="text-on-surface text-base italic leading-relaxed font-serif opacity-90">
            "{review.comment}"
          </p>

          {/* Review Media (Images) */}
          {review.images?.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {review.images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => handleImageClick(i)}
                  className="w-20 h-20 rounded-xl overflow-hidden border border-outline-variant/20 hover:scale-105 transition-transform cursor-zoom-in"
                >
                  <img src={img} alt={`review-img-${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox - Phóng to ảnh khi click */}
      <MediaLightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={review.images}
        initialIndex={activeImageIndex}
      />
    </div>
  );
};

export default ReviewCard;
