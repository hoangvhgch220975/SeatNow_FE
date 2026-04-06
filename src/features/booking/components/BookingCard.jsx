import React, { useState } from 'react';
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
  const cancelBookingMutation = useCancelBooking();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Chuyển hướng tới trang chi tiết đặt bàn
  const handleViewDetails = () => {
    if (b.id) {
      navigate(ROUTES.BOOKING_DETAIL(b.id));
    }
  };
  
  // Xác nhận hủy từ Card
  const handleCancelConfirm = (reason) => {
    cancelBookingMutation.mutate(
      { id: b.id, cancellationReason: reason || 'Customer requested cancellation.' },
      {
        onSuccess: () => {
          toast.success('Your reservation has been cancelled.', { icon: '✖️' });
          setIsCancelDialogOpen(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Failed to cancel. Please try again.');
        }
      }
    );
  };

  // Nút Modify chuyển thẳng sang trang CreateBookingPage với state
  const handleModify = () => {
    // Tái cấu trúc chuẩn hóa cho chế độ Modify (tương tự BookingDetailPage)
    const normalizedBooking = {
      id: b.id,
      bookingCode: b.bookingCode || b.id.slice(0, 8),
      restaurant: {
        name: displayName,
        image: displayImg
      },
      guest: {
        fullName: b.guestName || "Verified Member",
        email: b.guestEmail || "Email in profile",
        phone: b.guestPhone || "Phone in profile"
      },
      reservation: {
        rawDate: b.bookingDate || b.date,
        rawTime: b.bookingTime || b.time,
        partySize: b.numGuests || b.guests || 2,
        // Lưu ID bàn và thông tin bàn cũ để pre-fill lúc sửa
        tableId: b.tableId || b.table?._id || b.table?.id,
        tableInfo: b.table || { name: b.tableName }
      },
      notes: b.specialRequests || ''
    };

    // Fix: Sử dụng ROUTES.CREATE_BOOKING(id) thay vì .replace
    const targetUrl = ROUTES.CREATE_BOOKING(restaurant?.slug || restaurantId || 'unknown');
    navigate(targetUrl, { state: { modifyBookingItem: normalizedBooking, originalRestaurantId: restaurantId } });
  };

  const isPendingOrConfirmed = ['pending', 'confirmed', 'upcoming'].includes(b.status?.toLowerCase());

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
            <span>{b.numGuests || b.guests} Guests</span>
          </div>
          <BookingStatusBadge status={b.status} />
        </div>

        {/* Cụm Hành động: Tách biệt bằng border và padding để không bị quá sát */}
        <div className="flex items-center justify-end gap-3 flex-wrap lg:flex-nowrap lg:border-l lg:border-slate-100 lg:pl-10">
          <button 
            onClick={handleViewDetails}
            className="px-5 py-3 text-[10px] font-black text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all active:scale-95 whitespace-nowrap"
          >
            VIEW DETAILS
          </button>
          
          {isPendingOrConfirmed && (
             <div className="flex items-center gap-2">
                <button 
                  onClick={handleModify}
                  className="px-5 py-3 text-[10px] font-black text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-95 whitespace-nowrap border border-blue-100/50"
                >
                  MODIFY
                </button>
                <button 
                  onClick={() => setIsCancelDialogOpen(true)}
                  className="px-5 py-3 text-[10px] font-black text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-95 whitespace-nowrap border border-rose-100/50"
                >
                  CANCEL
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
