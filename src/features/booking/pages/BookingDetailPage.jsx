import React, { useMemo, useState, useEffect } from 'react'; // Bổ sung useEffect
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingDetailQuery, useCancelBooking } from '../hooks.js';
import { useRestaurant } from '../../restaurants/hooks.js';
import { getRestaurantTables } from '../../restaurants/api'; // Thêm API lấy bàn
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
 * @description Trang chi tiết một đơn đặt bàn kết nối API thực tế cho Customer.
 * @author Antigravity AI
 */
const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Gọi API lấy dữ liệu thực
  const { data: rawBooking, isLoading: isBookingLoading, isError: isBookingError, error: bookingError } = useBookingDetailQuery(id);
  const cancelBookingMutation = useCancelBooking();
  
  // State quản lý Bàn được làm giàu dữ liệu (Số bàn, Loại bàn) và Dialog Hủy
  const [enrichedTable, setEnrichedTable] = useState(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Lấy dữ liệu thô để xác định restaurantId và tableId
  const bData = rawBooking?.data || rawBooking || {};
  const bookingInfo = bData?.booking || bData;
  const restaurantId = bookingInfo?.restaurant?.id || bookingInfo?.restaurantId || bookingInfo?.restaurant?._id;
  const tableIdFromBooking = bookingInfo?.tableId || (bookingInfo?.table?.id || bookingInfo?.table?._id);
  const initialTableObj = bookingInfo?.table || {};

  // Cơ chế "Data Enrichment": Tìm nạp chi tiết bàn nếu object table bị trống từ API chính
  useEffect(() => {
    // Chỉ chạy nếu có tableId nhưng object bàn không có thông tin chi tiết (tableNumber)
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

  const restaurantSlug = bookingInfo?.restaurant?.slug || restaurantId; // Cố gắng lấy slug nếu có

  // Tải thêm thông tin chi tiết nhà hàng để lấy ảnh (Lazy Fetching giống BookingCard)
  const { data: fullRestaurantData } = useRestaurant(id && !bookingInfo?.restaurant?.images ? restaurantId : null);
  const fullRes = fullRestaurantData?.data || fullRestaurantData;

  // Lấy thêm thông tin Profile để điền vào nếu thông tin Guest bị trống (cho user đã login)
  const { data: profile } = useProfileQuery();

  // Chuẩn hóa dữ liệu từ Backend sang định dạng UI Component yêu cầu
  const normalizedBooking = useMemo(() => {
    if (!rawBooking) return null;

    // Backend bóc tách các tầng
    const bookingData = bData.booking || bData; 
    const restaurantData = bData.restaurant || bData.Restaurant || {};

    const getV = (obj, ...keys) => {
      for (const key of keys) {
        if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
      }
      return null;
    };

    const restaurantName = getV(restaurantData, 'restaurantName', 'name', 'Name') || fullRes?.name || "Restaurant Name";
    const restaurantAddress = getV(restaurantData, 'restaurantAddress', 'address', 'Address') || fullRes?.address || "Contact restaurant for address";
    
    // Ưu tiên ảnh từ dữ liệu nhà hàng đầy đủ
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

    // Thông tin người dùng
    const userData = bookingData.user || bookingData.User || bookingData.customer || bookingData.Customer || {};

    // Thông tin bàn cuối cùng (Ưu tiên enrichedTable nếu vừa mới fetch được chi tiết)
    const finalTable = (enrichedTable && Object.keys(enrichedTable).length > 0) ? enrichedTable : (bookingData.table || {});

    return {
      id: bid,
      bookingCode: bCode || (bid ? String(bid).slice(0, 8).toUpperCase() : 'N/A'),
      status: bStatus,
      cancellationReason: getV(bookingData, 'cancellationReason', 'CancellationReason', 'reason') || (bStatus === 'cancelled' ? 'No reason provided' : null),
      restaurant: {
        name: restaurantName,
        address: restaurantAddress,
        image: restaurantImage
      },
      guest: {
        fullName: getV(bookingData, 'guestName', 'GuestName') || getV(userData, 'fullName', 'FullName', 'name', 'Name') || profile?.fullName || profile?.name || "Verified Member",
        email: getV(bookingData, 'guestEmail', 'GuestEmail') || getV(userData, 'email', 'Email') || profile?.email || "Email in profile",
        phone: getV(bookingData, 'guestPhone', 'GuestPhone') || getV(userData, 'phone', 'Phone') || profile?.phone || "Phone in profile"
      },

      reservation: {
        date: formatDate(getV(bookingData, 'bookingDate', 'BookingDate', 'date', 'Date')) || getV(bookingData, 'bookingDate', 'date'),
        time: formatTime(getV(bookingData, 'bookingTime', 'BookingTime', 'time', 'Time')) || getV(bookingData, 'bookingTime', 'time'),
        rawDate: getV(bookingData, 'bookingDate', 'BookingDate', 'date', 'Date'),
        rawTime: getV(bookingData, 'bookingTime', 'BookingTime', 'time', 'Time'),
        partySize: getV(bookingData, 'numGuests', 'NumGuests', 'guests', 'Guests', 'partySize') || 1,
        
        // Cập nhật Table Info: Ưu tiên enriched data
        tableNumber: getV(finalTable, 'tableNumber', 'TableNumber'),
        tableType: getV(finalTable, 'type', 'Type') || getV(bookingData, 'tableType', 'TableType') || "Standard Seating",
        tableId: getV(bookingData, 'tableId', 'TableId') || getV(finalTable, 'id', '_id', 'Id'),
        tableInfo: finalTable || { name: getV(bookingData, 'tableType', 'tableName') }
      },
      notes: getV(bookingData, 'specialRequests', 'notes', 'SpecialRequest') || "No special requests provided.",
      financial: {
        deposit: (getV(bookingData, 'depositAmount', 'DepositAmount') !== null) ? `${Number(getV(bookingData, 'depositAmount', 'DepositAmount')).toLocaleString('vi-VN')} VNĐ` : "0 VNĐ",
        total: (getV(bookingData, 'totalPrice', 'TotalPrice') !== null) ? `${Number(getV(bookingData, 'totalPrice', 'TotalPrice')).toLocaleString('vi-VN')} VNĐ` : (getV(bookingData, 'depositAmount', 'DepositAmount') ? `${Number(getV(bookingData, 'depositAmount', 'DepositAmount')).toLocaleString('vi-VN')} VNĐ` : "0 VNĐ")
      }
    };
  }, [rawBooking, fullRes, profile, enrichedTable, bData]); // Thêm enrichedTable vào dependency





  // Xử lý trạng thái Loading
  if (isBookingLoading) return <LoadingSpinner fullPage title="Curating your reservation details..." />;

  // Xử lý trạng thái Lỗi
  if (isBookingError) return (
    <div className="pt-32 px-8">
      <ErrorState 
        message={bookingError?.message || "We couldn't retrieve this booking's details."} 
        onRetry={() => window.location.reload()}
      />
    </div>
  );


  if (!normalizedBooking) return null;

  const isConfirmed = normalizedBooking.status.toLowerCase() === 'confirmed';
  const isPending = normalizedBooking.status.toLowerCase() === 'pending';
  const canModifyOrCancel = isConfirmed || isPending;

  // Xử lý Sự kiện Hủy Đặt bàn
  const handleCancelConfirm = (reason) => {
    cancelBookingMutation.mutate(
      { id, cancellationReason: reason || 'Customer requested cancellation.' },
      {
        onSuccess: () => {
          toast.success('Your reservation has been cancelled.', { icon: '✖️' });
          setIsCancelDialogOpen(false);
          // Query sẽ tự invaldiate và load lại trang Status thành Cancelled
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Failed to cancel. Please try again.');
        }
      }
    );
  };

  // Xử lý Sự kiện Sửa Đặt bàn (Truyền state sang CreateBookingPage)
  const handleModifyClick = () => {
    // Điều hướng tới trang tạo booking với trạng thái modification (Dùng slug hoặc ID nhà hàng)
    const finalResId = fullRes?.slug || restaurantId || 'unknown';
    const targetUrl = ROUTES.CREATE_BOOKING(finalResId);
    
    navigate(targetUrl, { state: { modifyBookingItem: normalizedBooking, originalRestaurantId: restaurantId } });
  };


  return (
    <div className="min-h-screen bg-[#FDFCFE] pt-16 pb-24 px-8 relative overflow-hidden -mt-16">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-200/20 blur-[130px] rounded-full z-0 pointer-events-none"></div>
      
      <main className="max-w-6xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="space-y-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-black uppercase tracking-widest mb-6 group"
            >
              <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Back to History
            </button>
            
            <div className="flex items-center gap-3">
              <BookingStatusBadge status={normalizedBooking.status} />
              <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">ID: #{normalizedBooking.bookingCode}</span>
            </div>

            
            <h1 className="text-6xl font-black text-slate-900 leading-tight headline tracking-tighter">
              Booking Details
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-xl italic">
              Your professional dining experience is curated and ready.
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button className="w-full md:w-auto px-10 py-5 rounded-full bg-white border-2 border-slate-100 text-slate-800 text-sm font-black hover:bg-slate-50 hover:border-primary/20 hover:text-primary transition-all shadow-soft flex items-center justify-center gap-3 group">
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">chat_bubble</span>
              Contact Restaurant
            </button>
          </div>
        </div>

        {/* Timeline Section */}
        <BookingStatusTimeline status={normalizedBooking.status} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Info Sections */}
          <div className="lg:col-span-8 space-y-10">
            <BookingInfoSection booking={normalizedBooking} />
            <BookingFinancialSummary booking={normalizedBooking} />
          </div>

          {/* Right Column: QR & Sidebar Actions */}
          <div className="lg:col-span-4 space-y-10">
            {/* QUAN TRỌNG: Chỉ hiển thị QR Code khi Booking đã được CONFIRMED */}
            {isConfirmed ? (
              <BookingQRCode value={normalizedBooking.bookingCode} />
            ) : normalizedBooking.status === 'pending' ? (
              <div className="bg-amber-50/50 p-10 rounded-3xl border-2 border-amber-100/50 text-center animate-in fade-in zoom-in duration-500">
                <span className="material-symbols-outlined text-4xl text-amber-500 mb-4 animate-bounce">pending_actions</span>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700 mb-4">Pending Confirmation</h3>
                <p className="text-amber-900/60 text-xs font-bold leading-relaxed italic">
                  Digital check-in QR code will be generated once the restaurant confirms your reservation.
                </p>
              </div>
            ) : (
              <div className="bg-slate-100/50 p-10 rounded-3xl border-2 border-slate-200/50 text-center grayscale opacity-80 animate-in fade-in duration-700">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-4">qr_code_2</span>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">QR Access Expired</h3>
                <p className="text-slate-500 text-xs font-bold leading-relaxed italic">
                  Check-in QR code is only available for active, confirmed reservations.
                </p>
              </div>
            )}
            
            {/* Secondary Actions: Hiện khi còn khả năng Hủy/Sửa */}
            {canModifyOrCancel && (
              <div className="p-2 space-y-3">
                <button 
                  onClick={handleModifyClick}
                  className="w-full py-4 text-blue-600 text-xs font-black uppercase tracking-widest bg-blue-50/30 hover:bg-blue-50 rounded-3xl transition-all border-2 border-transparent hover:border-blue-100"
                >
                  Modify Reservation
                </button>
                <button 
                  onClick={() => setIsCancelDialogOpen(true)}
                  className="w-full py-4 text-rose-500 text-xs font-black uppercase tracking-widest border-2 border-rose-50 hover:bg-rose-50/50 hover:border-rose-100 rounded-3xl transition-all"
                >
                  Cancel Reservation
                </button>
                <p className="text-[10px] text-slate-400 font-black uppercase text-center mt-6 tracking-wider">
                  Managed via SeatNow Premium Concierge
                </p>
              </div>
            )}
          </div>
          
        </div>
      </main>

      {/* Dialog Xác nhận Hủy */}
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


