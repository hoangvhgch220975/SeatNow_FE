import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next'; // Bổ sung useTranslation
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingDetailQuery, useCancelBooking } from '../hooks.js';
import { useRestaurant } from '../../restaurants/hooks.js';
import { getRestaurantTables } from '../../restaurants/api';
import { useProfileQuery } from '../../profile/hooks.js';
import BookingStatusTimeline from '../components/BookingStatusTimeline.jsx';
import BookingStatusBadge from '../components/BookingStatusBadge.jsx';

import BookingQRCode from '../components/BookingQRCode.jsx';
import BookingInfoSection from '../components/BookingInfoSection.jsx';
import BookingFinancialSummary from '../components/BookingFinancialSummary.jsx';
import CancelBookingDialog from '../components/CancelBookingDialog.jsx';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner.jsx';
import ErrorState from '../../../shared/feedback/ErrorState.jsx';
import { formatDate, formatTime } from '../../../shared/utils/formatDateTime.js';
import toast from 'react-hot-toast';
import { ROUTES } from '../../../config/routes.js';

/**
 * @file BookingDetailPage.jsx
 * @description Trang chi tiết một đơn đặt bàn kết nối API thực tế cho Customer. Hỗ trợ đa ngôn ngữ.
 * @author Antigravity AI
 */
const BookingDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Gọi API lấy dữ liệu thực (Vietnamese comment)
  const { data: rawBooking, isLoading: isBookingLoading, isError: isBookingError, error: bookingError } = useBookingDetailQuery(id);
  const cancelBookingMutation = useCancelBooking();
  
  // State quản lý Bàn được làm giàu dữ liệu (Số bàn, Loại bàn) và Dialog Hủy (Vietnamese comment)
  const [enrichedTable, setEnrichedTable] = useState(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Lấy dữ liệu thô để xác định restaurantId và tableId (Vietnamese comment)
  const bData = rawBooking?.data || rawBooking || {};
  const bookingInfo = bData?.booking || bData;
  const restaurantId = bookingInfo?.restaurant?.id || bookingInfo?.restaurantId || bookingInfo?.restaurant?._id;
  const tableIdFromBooking = bookingInfo?.tableId || (bookingInfo?.table?.id || bookingInfo?.table?._id);
  const initialTableObj = bookingInfo?.table || {};

  // Cơ chế "Data Enrichment" (Vietnamese comment)
  useEffect(() => {
    const needsEnrichment = tableIdFromBooking && !initialTableObj?.tableNumber;

    if (needsEnrichment && restaurantId) {
      const fetchEnrichedTable = async () => {
        try {
          const res = await getRestaurantTables(restaurantId);
          const tablesList = res?.data || res || [];
          const matchedTable = tablesList.find(t => (t.id || t._id || t.Id) === tableIdFromBooking);
          if (matchedTable) {
            setEnrichedTable(matchedTable);
          }
        } catch (err) {
          console.error("Failed to enrich table data in Detail Page:", err);
        }
      };
      fetchEnrichedTable();
    }
  }, [tableIdFromBooking, restaurantId, initialTableObj]);

  const restaurantSlug = bookingInfo?.restaurant?.slug || restaurantId;

  // Tải thêm thông tin chi tiết nhà hàng (Vietnamese comment)
  const { data: fullRestaurantData } = useRestaurant(id && !bookingInfo?.restaurant?.images ? restaurantId : null);
  const fullRes = fullRestaurantData?.data || fullRestaurantData;

  // Lấy thêm thông tin Profile (Vietnamese comment)
  const { data: profile } = useProfileQuery();

  // Chuẩn hóa dữ liệu từ Backend sang định dạng UI (Vietnamese comment)
  const normalizedBooking = useMemo(() => {
    if (!rawBooking) return null;

    const bookingData = bData.booking || bData; 
    const restaurantData = bData.restaurant || bData.Restaurant || {};

    const getV = (obj, ...keys) => {
      for (const key of keys) {
        if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
      }
      return null;
    };

    const restaurantName = getV(restaurantData, 'restaurantName', 'name', 'Name') || fullRes?.name || t('booking.detail.fallbacks.restaurant_name');
    const restaurantAddress = getV(restaurantData, 'restaurantAddress', 'address', 'Address') || fullRes?.address || t('booking.detail.fallbacks.restaurant_address');
    
    // Ưu tiên ảnh từ dữ liệu nhà hàng đầy đủ (Vietnamese comment)
    const imagesFromFull = fullRes?.images || fullRes?.imagesJson || [];
    const rawImagesArr = imagesFromFull.length > 0 ? imagesFromFull : (getV(restaurantData, 'images', 'imagesJson', 'restaurantImages', 'restaurantImagesJson') || []);
    
    let restaurantImages = [];
    try {
      if (typeof rawImagesArr === 'string' && rawImagesArr.trim().startsWith('[')) {
        restaurantImages = JSON.parse(rawImagesArr);
      } else if (Array.isArray(rawImagesArr)) {
        restaurantImages = rawImagesArr;
      } else if (rawImagesArr) {
        restaurantImages = [rawImagesArr];
      }
    } catch (e) {
      restaurantImages = [];
    }

    const restaurantImage = restaurantImages[0] || getV(restaurantData, 'image', 'Image', 'coverImage') || fullRes?.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop";

    const bid = getV(bookingData, 'id', 'Id', '_id');
    const bCode = getV(bookingData, 'bookingCode', 'BookingCode', 'code', 'Code');
    const bStatus = (getV(bookingData, 'status', 'Status') || 'pending').toLowerCase();

    // Thông tin người dùng (Vietnamese comment)
    const userData = bookingData.user || bookingData.User || bookingData.customer || bookingData.Customer || {};

    // Thông tin bàn cuối cùng (Vietnamese comment)
    const finalTable = (enrichedTable && Object.keys(enrichedTable).length > 0) ? enrichedTable : (bookingData.table || {});

    return {
      id: bid,
      bookingCode: bCode || (bid ? String(bid).slice(0, 8).toUpperCase() : 'N/A'),
      status: bStatus,
      cancellationReason: getV(bookingData, 'cancellationReason', 'CancellationReason', 'reason') || (bStatus === 'cancelled' ? t('booking.detail.fallbacks.no_reason') : null),
      restaurant: {
        name: restaurantName,
        address: restaurantAddress,
        image: restaurantImage
      },
      guest: {
        fullName: getV(bookingData, 'guestName', 'GuestName') || getV(userData, 'fullName', 'FullName', 'name', 'Name') || profile?.fullName || profile?.name || t('booking.detail.fallbacks.verified_member'),
        email: getV(bookingData, 'guestEmail', 'GuestEmail') || getV(userData, 'email', 'Email') || profile?.email || t('booking.detail.fallbacks.email_in_profile'),
        phone: getV(bookingData, 'guestPhone', 'GuestPhone') || getV(userData, 'phone', 'Phone') || profile?.phone || t('booking.detail.fallbacks.phone_in_profile')
      },

      reservation: {
        date: formatDate(getV(bookingData, 'bookingDate', 'BookingDate', 'date', 'Date')) || getV(bookingData, 'bookingDate', 'date'),
        time: formatTime(getV(bookingData, 'bookingTime', 'BookingTime', 'time', 'Time')) || getV(bookingData, 'bookingTime', 'time'),
        rawDate: getV(bookingData, 'bookingDate', 'BookingDate', 'date', 'Date'),
        rawTime: getV(bookingData, 'bookingTime', 'BookingTime', 'time', 'Time'),
        partySize: getV(bookingData, 'numGuests', 'NumGuests', 'guests', 'Guests', 'partySize') || 1,
        
        // Cập nhật Table Info (Vietnamese comment)
        tableNumber: getV(finalTable, 'tableNumber', 'TableNumber'),
        tableType: getV(finalTable, 'type', 'Type') || getV(bookingData, 'tableType', 'TableType') || t('booking.detail.fallbacks.standard_seating'),
        tableId: getV(bookingData, 'tableId', 'TableId') || getV(finalTable, 'id', '_id', 'Id'),
        tableInfo: finalTable || { name: getV(bookingData, 'tableType', 'tableName') }
      },
      notes: getV(bookingData, 'specialRequests', 'notes', 'SpecialRequest') || t('booking.detail.fallbacks.no_special_requests'),
      financial: {
        deposit: (getV(bookingData, 'depositAmount', 'DepositAmount') !== null) ? `${Number(getV(bookingData, 'depositAmount', 'DepositAmount')).toLocaleString('vi-VN')} VNĐ` : `0 VNĐ`,
        total: (getV(bookingData, 'totalPrice', 'TotalPrice') !== null) ? `${Number(getV(bookingData, 'totalPrice', 'TotalPrice')).toLocaleString('vi-VN')} VNĐ` : (getV(bookingData, 'depositAmount', 'DepositAmount') ? `${Number(getV(bookingData, 'depositAmount', 'DepositAmount')).toLocaleString('vi-VN')} VNĐ` : `0 VNĐ`)
      }
    };
  }, [rawBooking, fullRes, profile, enrichedTable, bData, t]); 





  // Xử lý trạng thái Loading (Vietnamese comment)
  if (isBookingLoading) return <LoadingSpinner fullPage title={t('booking.detail.loading')} />;

  // Xử lý trạng thái Lỗi (Vietnamese comment)
  if (isBookingError) return (
    <div className="pt-32 px-8">
      <ErrorState 
        message={bookingError?.message || t('booking.detail.error_retrieve')} 
        onRetry={() => window.location.reload()}
      />
    </div>
  );


  if (!normalizedBooking) return null;

  const isConfirmed = normalizedBooking.status.toLowerCase() === 'confirmed';
  const isPending = normalizedBooking.status.toLowerCase() === 'pending';
  const canModifyOrCancel = isConfirmed || isPending;

  // Xử lý Sự kiện Hủy Đặt bàn (Vietnamese comment)
  const handleCancelConfirm = (reason) => {
    cancelBookingMutation.mutate(
      { id, cancellationReason: reason || t('booking.notifications.cancel_reason_default') },
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

  // Xử lý Sự kiện Sửa Đặt bàn (Vietnamese comment)
  const handleModifyClick = () => {
    const finalResId = fullRes?.slug || restaurantId || 'unknown';
    const targetUrl = ROUTES.CREATE_BOOKING(finalResId);
    
    navigate(targetUrl, { state: { modifyBookingItem: normalizedBooking, originalRestaurantId: restaurantId } });
  };


  return (
    <div className="min-h-screen bg-[#FDFCFE] pt-16 pb-24 px-8 relative overflow-hidden -mt-16">
      {/* Background Decorative Elements (Vietnamese comment) */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-200/20 blur-[130px] rounded-full z-0 pointer-events-none"></div>
      
      <main className="max-w-6xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Header Section (Vietnamese comment) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="space-y-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-black uppercase tracking-widest mb-6 group"
            >
              <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
              {t('booking.detail.back_to_history')}
            </button>
            
            <div className="flex items-center gap-3">
              <BookingStatusBadge status={normalizedBooking.status} />
              <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">ID: #{normalizedBooking.bookingCode}</span>
            </div>

            
            <h1 className="text-6xl font-black text-slate-900 leading-tight headline tracking-tighter">
              {t('booking.detail.title')}
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-xl italic">
              {t('booking.detail.subtitle')}
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button className="w-full md:w-auto px-10 py-5 rounded-full bg-white border-2 border-slate-100 text-slate-800 text-sm font-black hover:bg-slate-50 hover:border-primary/20 hover:text-primary transition-all shadow-soft flex items-center justify-center gap-3 group">
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">chat_bubble</span>
              {t('booking.detail.contact_restaurant')}
            </button>
          </div>
        </div>

        {/* Timeline Section (Vietnamese comment) */}
        <BookingStatusTimeline status={normalizedBooking.status} />

        {/* Main Content Grid (Vietnamese comment) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (Vietnamese comment) */}
          <div className="lg:col-span-8 space-y-10">
            <BookingInfoSection booking={normalizedBooking} />
            <BookingFinancialSummary booking={normalizedBooking} />
          </div>

          {/* Right Column (Vietnamese comment) */}
          <div className="lg:col-span-4 space-y-10">
            {isConfirmed ? (
              <BookingQRCode value={normalizedBooking.bookingCode} />
            ) : normalizedBooking.status === 'pending' ? (
              <div className="bg-amber-50/50 p-10 rounded-3xl border-2 border-amber-100/50 text-center animate-in fade-in zoom-in duration-500">
                <span className="material-symbols-outlined text-4xl text-amber-500 mb-4 animate-bounce">pending_actions</span>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700 mb-4">{t('booking.detail.pending_confirmation_title')}</h3>
                <p className="text-amber-900/60 text-xs font-bold leading-relaxed italic">
                  {t('booking.detail.pending_confirmation_desc')}
                </p>
              </div>
            ) : (
              <div className="bg-slate-100/50 p-10 rounded-3xl border-2 border-slate-200/50 text-center grayscale opacity-80 animate-in fade-in duration-700">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-4">qr_code_2</span>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">{t('booking.detail.qr_access_expired_title')}</h3>
                <p className="text-slate-500 text-xs font-bold leading-relaxed italic">
                  {t('booking.detail.qr_access_expired_desc')}
                </p>
              </div>
            )}
            
            {/* Secondary Actions (Vietnamese comment) */}
            {canModifyOrCancel && (
              <div className="p-2 space-y-3">
                <button 
                  onClick={handleModifyClick}
                  className="w-full py-4 text-blue-600 text-xs font-black uppercase tracking-widest bg-blue-50/30 hover:bg-blue-50 rounded-3xl transition-all border-2 border-transparent hover:border-blue-100"
                >
                  {t('booking.detail.modify_button')}
                </button>
                <button 
                  onClick={() => setIsCancelDialogOpen(true)}
                  className="w-full py-4 text-rose-500 text-xs font-black uppercase tracking-widest border-2 border-rose-50 hover:bg-rose-50/50 hover:border-rose-100 rounded-3xl transition-all"
                >
                  {t('booking.detail.cancel_button')}
                </button>
                <p className="text-[10px] text-slate-400 font-black uppercase text-center mt-6 tracking-wider">
                  {t('booking.detail.managed_by')}
                </p>
              </div>
            )}
          </div>
          
        </div>
      </main>

      {/* Dialog Xác nhận Hủy (Vietnamese comment) */}
      <CancelBookingDialog 
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={handleCancelConfirm}
        isCanceling={cancelBookingMutation.isPending}
      />
    </div>
  );
};

export default BookingDetailPage;


