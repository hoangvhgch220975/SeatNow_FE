import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRestaurant } from '../../restaurants/hooks.js';
import { useCancelBooking } from '../hooks.js';
import { formatDate, formatTime } from '../../../shared/utils/formatDateTime.js';
import BookingStatusBadge from './BookingStatusBadge.jsx';
import CancelBookingDialog from './CancelBookingDialog.jsx';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/routes.js';
import { toast } from 'react-hot-toast';

/**
 * @file BookingCard.jsx
 * @description Card hiển thị thông tin chi tiết một đơn đặt bàn. Hỗ trợ đa ngôn ngữ.
 */
const BookingCard = ({ booking }) => {
  const { t } = useTranslation();
  const b = booking;
  
  // Logic lấy thông tin nhà hàng (Lazy Fetching) (Vietnamese comment)
  const initialName = b.restaurant?.name || b.restaurantName || b.RestaurantName;
  const restaurantId = b.restaurantId || b.idRestaurant;
  const { data: restaurant, isLoading: isResLoading } = useRestaurant(!initialName ? restaurantId : null);

  const displayName = initialName || restaurant?.name || (isResLoading ? '...' : `#${b.bookingCode || b.id.slice(0, 8)}`);
  
  // Lấy ảnh đầu tiên từ mảng images (Vietnamese comment)
  const restaurantImages = b.restaurant?.images || restaurant?.images || [];
  const displayImg = restaurantImages[0] || b.restaurant?.image || restaurant?.image || `https://api.dicebear.com/9.x/shapes/svg?seed=${b.id || b.restaurantId}`;

  // Định dạng thời gian (Vietnamese comment)
  const formattedDate = formatDate(b.bookingDate || b.date);
  const formattedTime = formatTime(b.bookingTime || b.time);

  const navigate = useNavigate();
  const cancelBookingMutation = useCancelBooking();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Chuyển hướng tới trang chi tiết đặt bàn (Vietnamese comment)
  const handleViewDetails = () => {
    if (b.id) {
      navigate(ROUTES.BOOKING_DETAIL(b.id));
    }
  };
  
  // Xác nhận hủy từ Card (Vietnamese comment)
  const handleCancelConfirm = (reason) => {
    cancelBookingMutation.mutate(
      { id: b.id, cancellationReason: reason || t('booking.notifications.cancel_reason_default') },
      {
        onSuccess: () => {
          toast.success(t('booking.notifications.cancel_success'), { icon: '✖️' });
          setIsCancelDialogOpen(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || t('booking.notifications.cancel_error'));
        }
      }
    );
  };

  // Nút Modify chuyển thẳng sang trang CreateBookingPage với state (Vietnamese comment)
  const handleModify = () => {
    const normalizedBooking = {
      id: b.id,
      bookingCode: b.bookingCode || b.id.slice(0, 8),
      restaurant: {
        name: displayName,
        image: displayImg
      },
      guest: {
        fullName: b.guestName || t('booking.detail.fallbacks.verified_member'),
        email: b.guestEmail || t('booking.detail.fallbacks.email_in_profile'),
        phone: b.guestPhone || t('booking.detail.fallbacks.phone_in_profile')
      },
      reservation: {
        rawDate: b.bookingDate || b.date,
        rawTime: b.bookingTime || b.time,
        partySize: b.numGuests || b.guests || 2,
        tableId: b.tableId || b.table?._id || b.table?.id,
        tableInfo: b.table || { name: b.tableName }
      },
      notes: b.specialRequests || ''
    };

    const targetUrl = ROUTES.CREATE_BOOKING(restaurant?.slug || restaurantId || 'unknown');
    navigate(targetUrl, { state: { modifyBookingItem: normalizedBooking, originalRestaurantId: restaurantId } });
  };

  const isPendingOrConfirmed = ['pending', 'confirmed', 'upcoming'].includes(b.status?.toLowerCase());

  return (
    <div className="group bg-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-soft border-2 border-slate-100/80 hover:scale-[1.01] hover:border-primary/20 transition-all duration-500">
      {/* Ảnh Nhà hàng (Vietnamese comment) */}
      <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner group-hover:rotate-2 transition-transform">
        <img 
          alt={displayName} 
          className="w-full h-full object-cover" 
          src={displayImg} 
        />
      </div>

      {/* Thông tin chi tiết (Vietnamese comment) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] block mb-1">
            #{b.bookingCode || b.id.slice(0, 8)}
          </span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight line-clamp-1 mb-1">
            {displayName}
          </h3>
          <span className="text-primary font-black text-sm tracking-tight bg-primary/5 px-3 py-1 rounded-full w-fit">
            {Number(b.depositAmount || 0).toLocaleString('vi-VN')} VNĐ
          </span>
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
            <span>
              {t('booking.card.guests_count', { count: b.numGuests || b.guests })}
            </span>
          </div>
          <BookingStatusBadge status={b.status} />
        </div>

        {/* Cụm Hành động (Vietnamese comment) */}
        <div className="flex items-center justify-end gap-3 flex-wrap lg:flex-nowrap lg:border-l lg:border-slate-100 lg:pl-10">
          <button 
            onClick={handleViewDetails}
            className="px-5 py-3 text-[10px] font-black text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all active:scale-95 whitespace-nowrap"
          >
            {t('booking.card.view_details')}
          </button>
          
          {isPendingOrConfirmed && (
             <div className="flex items-center gap-2">
                <button 
                  onClick={handleModify}
                  className="px-5 py-3 text-[10px] font-black text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-95 whitespace-nowrap border border-blue-100/50"
                >
                  {t('booking.card.modify')}
                </button>
                <button 
                  onClick={() => setIsCancelDialogOpen(true)}
                  className="px-5 py-3 text-[10px] font-black text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-95 whitespace-nowrap border border-rose-100/50"
                >
                  {t('booking.card.cancel')}
                </button>
             </div>
          )}
        </div>
      </div>

      <CancelBookingDialog 
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={handleCancelConfirm}
        isCanceling={cancelBookingMutation.isPending}
      />
    </div>
  );
};

export default BookingCard;
