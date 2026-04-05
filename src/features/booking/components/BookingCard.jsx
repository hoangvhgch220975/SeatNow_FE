import React from 'react';
import { useRestaurant } from '../../restaurants/hooks.js';
import { formatDate, formatTime } from '../../../shared/utils/formatDateTime.js';
import BookingStatusBadge from './BookingStatusBadge.jsx';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/routes.js';
import { toast } from 'react-hot-toast';


/**
 * @file BookingCard.jsx
 * @description Card hiển thị thông tin chi tiết một đơn đặt bàn.
 */
const BookingCard = ({ booking }) => {
  const b = booking;
  
  // Logic lấy thông tin nhà hàng (Lazy Fetching)
  const initialName = b.restaurant?.name || b.restaurantName || b.RestaurantName;
  const restaurantId = b.restaurantId || b.idRestaurant;
  const { data: restaurant, isLoading: isResLoading } = useRestaurant(!initialName ? restaurantId : null);

  const displayName = initialName || restaurant?.name || (isResLoading ? '...' : `Booking #${b.bookingCode || b.id.slice(0, 8)}`);
  
  // Lấy ảnh đầu tiên từ mảng images
  const restaurantImages = b.restaurant?.images || restaurant?.images || [];
  const displayImg = restaurantImages[0] || b.restaurant?.image || restaurant?.image || `https://api.dicebear.com/9.x/shapes/svg?seed=${b.id || b.restaurantId}`;

  // Định dạng thời gian
  const formattedDate = formatDate(b.bookingDate || b.date);
  const formattedTime = formatTime(b.bookingTime || b.time);

  const navigate = useNavigate();

  // Chuyển hướng tới trang chi tiết đặt bàn
  const handleViewDetails = () => {
    if (b.id) {
      navigate(ROUTES.BOOKING_DETAIL(b.id));
    }
  };
  
  const handleCancel = () => toast("Cancel " + (b.bookingCode || b.id.slice(0,8)) + ": Feature coming soon!", { icon: "🚫" });


  return (
    <div className="group bg-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-soft border-2 border-slate-100/80 hover:scale-[1.01] hover:border-primary/20 transition-all duration-500">
      {/* Ảnh Nhà hàng */}
      <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner group-hover:rotate-2 transition-transform">
        <img 
          alt={displayName} 
          className="w-full h-full object-cover" 
          src={displayImg} 
        />
      </div>

      {/* Thông tin chi tiết */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] block mb-1">
            #{b.bookingCode || b.id.slice(0, 8)}
          </span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight line-clamp-1">
            {displayName}
          </h3>
          <span className="text-slate-900 font-bold tracking-tight">{Number(b.depositAmount || 0).toLocaleString('vi-VN')} VNĐ</span>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1 font-bold italic">
            <span className="material-symbols-outlined text-base">calendar_today</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm font-black">
            <span className="material-symbols-outlined text-base">schedule</span>
            <span>{formattedTime}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2 font-bold italic">
            <span className="material-symbols-outlined text-base">group</span>
            <span>{b.numGuests || b.guests} Guests</span>
          </div>
          <BookingStatusBadge status={b.status} />
        </div>

        {/* Hành động (Placeholders) */}
        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={handleViewDetails}
            className="px-6 py-3 text-xs font-black text-primary hover:bg-primary/5 rounded-2xl transition-all active:scale-95"
          >
            VIEW DETAILS
          </button>
          {['pending', 'confirmed', 'upcoming'].includes(b.status?.toLowerCase()) && (
            <button 
              onClick={handleCancel}
              className="px-6 py-3 text-xs font-black text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all active:scale-95"
            >
              CANCEL
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
