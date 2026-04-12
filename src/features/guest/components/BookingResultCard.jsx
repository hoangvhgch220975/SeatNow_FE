import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getRestaurantById, getRestaurantTables } from '../../restaurants/api'; // Thêm getRestaurantTables
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/routes.js';
import { toast } from 'react-hot-toast';
import { formatTime } from '../../../shared/utils/formatDateTime.js'; // Import hàm formatTime chuẩn
import { useCancelBookingByGuest } from '../../booking/hooks.js';
import CancelBookingDialog from '../../booking/components/CancelBookingDialog.jsx';

const BookingResultCard = ({ bookingData, onReset }) => {
  const { t, i18n } = useTranslation();
  const [showQR, setShowQR] = useState(false);
  const [localRestaurantName, setLocalRestaurantName] = useState('Restaurant');
  const [enrichedTable, setEnrichedTable] = useState(null); // State lưu bàn sau khi tìm nạp chi tiết

  if (!bookingData) return null;

  // 1. TRÍCH XUẤT DỮ LIỆU GỐC (Robust Extraction)
  const b = bookingData?.data || bookingData;
  const actualData = b.booking || b.data?.booking || b;
  const restaurantFromData = b.restaurant || b.data?.restaurant || {};

  // Helper: Lấy giá trị linh hoạt CamelCase/PascalCase
  const getV = (obj, ...keys) => {
    if (!obj) return null;
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null) return obj[key];
    }
    return null;
  };

  // 2. MAPPING DỮ LIỆU TỪ SCHEMA
  const bookingId = getV(actualData, 'id', 'Id', '_id') || 'N/A';
  const displayBookingCode = getV(actualData, 'bookingCode', 'BookingCode', 'id') || 'N/A';
  const status = (getV(actualData, 'status', 'Status') || 'PENDING').toUpperCase();
  const numGuests = getV(actualData, 'numGuests', 'NumGuests', 'partySize', 'guests') || 1;
  const specialRequests = getV(actualData, 'specialRequests', 'SpecialRequests', 'notes') || "";
  
  // Thông tin bàn gốc từ đơn hàng
  const tableObj = actualData.table || actualData.Table || {};
  const restaurantId = getV(actualData, 'restaurantId', 'RestaurantId') || restaurantFromData?.id;
  const tableIdFromBooking = getV(actualData, 'tableId', 'TableId');

  // Cơ chế "Data Enrichment": Tìm nạp chi tiết bàn nếu tableObj bị trống nhưng có tableId
  useEffect(() => {
    const shouldEnrich = tableIdFromBooking && Object.keys(tableObj).length <= 0;
    
    if (shouldEnrich && restaurantId) {
      const enrichTableData = async () => {
        try {
          const tablesResponse = await getRestaurantTables(restaurantId);
          const tablesList = tablesResponse?.data || tablesResponse || [];
          
          // Tìm bàn khớp với tableId trong danh sách bàn của nhà hàng
          const matched = tablesList.find(t => 
            getV(t, 'id', 'Id', '_id') === tableIdFromBooking
          );
          
          if (matched) {
            setEnrichedTable(matched);
          }
        } catch (err) {
          console.error('Error enriching table data:', err);
        }
      };
      enrichTableData();
    }
  }, [tableIdFromBooking, restaurantId, tableObj]);

  // Ưu tiên thông tin từ table gán sẵn, nếu không có thì lấy từ enrichedTable (sau khi fetch)
  const finalTableInfo = Object.keys(tableObj).length > 0 ? tableObj : enrichedTable;
  
  const tableNumber = getV(finalTableInfo, 'tableNumber', 'TableNumber');
  const tableType = getV(finalTableInfo, 'type', 'Type') || getV(actualData, 'tableType', 'TableType');
  const tableLocation = getV(finalTableInfo, 'location', 'Location');
  
  // Logic hiển thị: Hiện Loại bàn (Section) ngay cả khi chưa có số cụ thể
  const tableDisplay = tableNumber 
    ? t('booking.lookup.result.table_no', { number: tableNumber }) + ` (${tableType || 'Standard'})` 
    : (tableType ? t('booking.lookup.result.table_area', { type: tableType }) : (tableLocation || t('booking.lookup.result.table_pending')));

  // Thông tin tiền cọc (Bookings: depositRequired, depositAmount, depositPaid)
  const depositAmount = getV(actualData, 'depositAmount', 'DepositAmount') || 0;
  const isDepositPaid = getV(actualData, 'depositPaid', 'DepositPaid') === true || getV(actualData, 'depositPaid', 'DepositPaid') === 1;
  const isDepositRequired = getV(actualData, 'depositRequired', 'DepositRequired') === true || depositAmount > 0;

  // Thông tin nhà hàng
  const initialName = 
    getV(restaurantFromData, 'name', 'restaurantName', 'Name') || 
    getV(actualData, 'restaurantName', 'name');

  // Sync state with prop initially or when prop changes
  useEffect(() => {
    if (initialName) {
      setLocalRestaurantName(initialName);
    } else if (actualData?.restaurantId) {
      const fetchName = async () => {
        try {
          const res = await getRestaurantById(actualData.restaurantId);
          const r = res?.data || res;
          const fetchedName = getV(r, 'name', 'restaurantName', 'Name');
          if (fetchedName) setLocalRestaurantName(fetchedName);
        } catch (err) {}
      };
      fetchName();
    }
  }, [initialName, actualData?.restaurantId]);

  // Format date hàm nội bộ
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      // Determine locale based on i18n
      const currentLocale = i18n.language === 'vi' ? 'vi-VN' : 'en-GB';
      
      return new Intl.DateTimeFormat(currentLocale, {
        weekday: 'short', month: 'short', day: '2-digit', year: 'numeric'
      }).format(d);
    } catch { return dateStr; }
  };

  const bookingDate = formatDate(getV(actualData, 'bookingDate', 'date', 'BookingDate'));
  
  // Chuẩn hóa giờ: Sử dụng hàm formatTime đã được sửa lỗi Timezone
  const bookingTime = formatTime(getV(actualData, 'bookingTime', 'time', 'BookingTime') || 'N/A');

  // QR Generate logic:
  const qrString = actualData.qrCode || actualData.bookingCode || bookingId;
  const qrImageSrc = `https://quickchart.io/qr?text=${encodeURIComponent(qrString)}&size=250&margin=1`;

  const isCancelled = status?.toUpperCase() === 'CANCELLED';
  const cancellationReason = getV(actualData, 'cancellationReason', 'CancellationReason', 'reason');

  // Hooks cho Cancel / Modify
  const navigate = useNavigate();
  const cancelBookingMutation = useCancelBookingByGuest();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Xử lý Sự kiện Hủy Đặt bàn
  const handleCancelConfirm = (reason) => {
    const phoneToVerify = getV(actualData, 'guestPhone', 'phone', 'GuestPhone');
    cancelBookingMutation.mutate(
      { 
        id: bookingId, 
        guestPhone: phoneToVerify,
        cancellationReason: reason || 'Customer requested cancellation.' 
      },
      {
        onSuccess: () => {
          toast.success(t('booking.actions.cancel.success'), { icon: '✖️' });
          setIsCancelDialogOpen(false);
          if (onReset) onReset(); 
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || t('booking.actions.cancel.error'));
        }
      }
    );
  };

  // Xử lý Sự kiện Sửa Đặt bàn (Truyền state sang CreateBookingPage)
  const handleModify = () => {
    const resId = getV(actualData, 'restaurantId', 'RestaurantId') || restaurantFromData?.id;
    const normalizedBooking = {
      id: bookingId,
      restaurant: { id: resId, name: localRestaurantName },
      guest: {
        fullName: getV(actualData, 'guestName', 'GuestName') || "Guest",
        email: getV(actualData, 'guestEmail', 'GuestEmail') || "",
        phone: getV(actualData, 'guestPhone', 'GuestPhone', 'phone') || ""
      },
      reservation: {
        rawDate: getV(actualData, 'bookingDate', 'date', 'BookingDate'),
        rawTime: getV(actualData, 'bookingTime', 'time', 'BookingTime'),
        partySize: numGuests,
        tableId: getV(tableObj, 'id', 'Id', '_id') || getV(actualData, 'tableId', 'TableId'),
        tableInfo: tableObj || { name: tableDisplay }
      },
      notes: specialRequests
    };

    const targetUrl = ROUTES.CREATE_BOOKING(resId || 'unknown');
    navigate(targetUrl, { state: { modifyBookingItem: normalizedBooking, originalRestaurantId: resId } });
  };

  // 3. FLAGS & UI ALIASES (Bổ sung để fix lỗi ReferenceError)
  const isConfirmed = status === 'CONFIRMED';
  const restaurantName = localRestaurantName;

  return (
    <>
      <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 mb-10">
        <div className="relative overflow-hidden bg-white rounded-xl shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] ring-1 ring-slate-100">
          {/* Decorative Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Column: Details */}
            <div className="md:col-span-8 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full font-bold text-xs tracking-wider uppercase ${status.toLowerCase() === 'pending' ? 'bg-yellow-50 text-yellow-600' : status.toLowerCase() === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${status.toLowerCase() === 'pending' ? 'bg-yellow-500' : status.toLowerCase() === 'cancelled' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                  {t(`booking.lookup.status.${status.toLowerCase()}`)}
                </span>
                <span className="text-slate-500 font-medium text-sm">
                  {t('booking.lookup.result.booking_id')}: <span className="font-bold text-slate-800">#{displayBookingCode}</span>
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 mb-8 font-headline">{restaurantName}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined shrink-0">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {t('booking.lookup.result.date_time')}
                    </p>
                    <p className="text-slate-900 font-semibold">{bookingDate}</p>
                    <p className="text-slate-500 text-sm">{bookingTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined shrink-0">group</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {t('booking.lookup.result.guests')}
                    </p>
                    <p className="text-slate-900 font-semibold">{numGuests} {t('booking.lookup.result.guests_suffix')}</p>
                    <p className="text-slate-500 text-sm italic">{t('booking.lookup.result.guests_standard')}</p>
                  </div>
                </div>

                {/* Section: Table Information (Tách riêng theo yêu cầu) */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined shrink-0">table_restaurant</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {t('booking.lookup.result.table_details')}
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {tableNumber ? t('booking.lookup.result.table_no', { number: tableNumber }) : t('booking.lookup.result.table_pending')}
                    </p>
                    <p className="text-primary text-sm font-medium capitalize">
                      {tableType ? t('booking.lookup.result.table_area', { type: tableType }) : t('booking.lookup.result.table_standard_seating')}
                    </p>
                  </div>
                </div>
                
                {/* Section: Deposit Information (Bổ sung từ SQL Schema) */}
                {isDepositRequired && (
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg ${isDepositPaid ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} flex items-center justify-center`}>
                      <span className="material-symbols-outlined shrink-0">{isDepositPaid ? 'payments' : 'account_balance_wallet'}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {t('booking.lookup.result.deposit_status')}
                      </p>
                      <p className={`font-semibold ${isDepositPaid ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {isDepositPaid ? t('booking.lookup.result.deposit_paid') : t('booking.lookup.result.deposit_unpaid')}
                      </p>
                      <p className="text-slate-500 text-sm shadow-[#630ED4]/10">
                        {Number(depositAmount).toLocaleString(i18n.language === 'vi' ? 'vi-VN' : 'en-US')} VNĐ
                      </p>
                    </div>
                  </div>
                )}

                {/* Section: Contact Info (Bổ sung rõ ràng cho Guest) */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined shrink-0">contact_mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {t('booking.lookup.result.contact_details')}
                    </p>
                    <p className="text-slate-900 font-semibold truncate max-w-[170px]">
                      {t('booking.lookup.result.mr_mrs')}: {getV(actualData, 'guestName', 'GuestName') || 'Guest'}
                    </p>
                    <p className="text-slate-500 text-sm italic font-medium">
                      {t('booking.lookup.result.phone')}: {getV(actualData, 'guestPhone', 'GuestPhone', 'phone') || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section: Special Requests (Bổ sung từ SQL Schema) */}
              {specialRequests && (
                <div className="mt-8 p-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">sticky_note_2</span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t('booking.lookup.result.special_requests')}
                    </p>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">"{specialRequests}"</p>
                </div>
              )}

              {/* Section: Cancellation Reason (Mới - Hiển thị nếu bị hủy) */}
              {isCancelled && (
                <div className="mt-6 p-6 bg-rose-50 border border-rose-100 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-rose-500 text-sm whitespace-nowrap">error_outline</span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">
                      {t('booking.lookup.result.cancellation_reason')}
                    </p>
                  </div>
                  <p className="text-rose-950 text-sm font-bold leading-relaxed">
                    {cancellationReason || t('booking.lookup.result.cancelled_notice')}
                  </p>
                </div>
              )}
              
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-6">
                {status.toLowerCase() === 'pending' ? (
                  <>
                    <button 
                      onClick={handleModify}
                      className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-primary font-bold hover:bg-primary/5 hover:ring-1 hover:ring-primary/20 hover:shadow-sm active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">edit</span>
                      {t('booking.lookup.result.modify_btn')}
                    </button>
                    
                    <button 
                      onClick={() => setIsCancelDialogOpen(true)}
                      className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-500 font-bold hover:text-red-500 hover:bg-red-50 hover:ring-1 hover:ring-red-100 hover:shadow-sm active:scale-95 transition-all ml-auto"
                    >
                      <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">cancel</span>
                      {t('booking.lookup.result.cancel_btn')}
                    </button>
                  </>
                ) : (
                  <div className="flex w-full items-center justify-between opacity-40 grayscale pointer-events-none cursor-not-allowed">
                     <div className="flex items-center gap-2 text-slate-500 font-bold">
                        <span className="material-symbols-outlined text-xl">edit</span>
                        {t('booking.lookup.result.modify_btn')}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 font-bold ml-auto">
                        <span className="material-symbols-outlined text-xl">cancel</span>
                        {t('booking.lookup.result.cancel_btn')}
                      </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column: Check-in QR Trigger */}
            <div className="md:col-span-4 bg-slate-50/50 p-12 flex flex-col items-center justify-center text-center relative">
              {/* Nút reset (Search another)  */}
              <button 
                onClick={onReset}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                title={t('common.search')}
              >
                 <span className="material-symbols-outlined text-sm">close</span>
              </button>

              {isConfirmed ? (
                <>
                  <div className="mb-6 flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full text-primary animate-pulse">
                    <span className="material-symbols-outlined text-4xl">qr_code_scanner</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">
                    {t('booking.lookup.result.qr_ready')}
                  </p>
                  
                  <button 
                    onClick={() => setShowQR(true)}
                    className="px-6 py-3 bg-primary text-white rounded-full font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:bg-primary-600 active:scale-95 transition-all w-full"
                  >
                    {t('booking.lookup.result.qr_see_btn')}
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center opacity-60">
                  <div className="mb-6 flex items-center justify-center w-20 h-20 bg-slate-200 rounded-full text-slate-400">
                    <span className="material-symbols-outlined text-4xl">lock</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
                    {status === 'ARRIVED' ? t('booking.lookup.result.qr_checked_in') : t('booking.lookup.result.qr_not_available')}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 px-4 italic">
                    {status === 'PENDING' ? t('booking.detail.pending_confirmation_desc') : t('booking.detail.qr_access_expired_desc')}
                  </p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>

      {/* QR Code Modal Popup */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative animate-in zoom-in-95 duration-200 border border-slate-100"
          >
            <button 
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2 headline">
                {t('booking.lookup.result.qr_title')}
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                {t('booking.lookup.result.qr_desc')}
              </p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 inline-block mb-6 shadow-inner">
                <img 
                  alt="Booking QR Code" 
                  className="w-48 h-48 mix-blend-multiply" 
                  src={qrImageSrc}
                />
              </div>
              
              <div className="bg-primary/5 py-3 rounded-lg border border-primary/10">
                <p className="text-primary font-bold text-lg tracking-widest inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">tag</span>
                  {displayBookingCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Xác nhận Hủy */}
      <CancelBookingDialog 
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={handleCancelConfirm}
        isCanceling={cancelBookingMutation.isPending}
      />
    </>
  );
};

export default BookingResultCard;
