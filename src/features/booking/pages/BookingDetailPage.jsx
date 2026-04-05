import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingDetailQuery } from '../hooks.js';
import { useProfileQuery } from '../../profile/hooks.js';
import BookingStatusTimeline from '../components/BookingStatusTimeline.jsx';
import BookingStatusBadge from '../components/BookingStatusBadge.jsx';


import BookingQRCode from '../components/BookingQRCode.jsx';
import BookingInfoSection from '../components/BookingInfoSection.jsx';
import BookingFinancialSummary from '../components/BookingFinancialSummary.jsx';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner.jsx';
import ErrorState from '../../../shared/feedback/ErrorState.jsx';
import { formatDate, formatTime } from '../../../shared/utils/formatDateTime.js';

/**
 * @file BookingDetailPage.jsx
 * @description Trang chi tiết một đơn đặt bàn kết nối API thực tế.
 * @author Antigravity AI
 */
const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Gọi API lấy dữ liệu thực
  const { data: rawBooking, isLoading: isBookingLoading, isError: isBookingError, error: bookingError } = useBookingDetailQuery(id);
  
  // Lấy thêm thông tin Profile để điền vào nếu thông tin Guest bị trống (cho user đã login)
  const { data: profile } = useProfileQuery();

  // Chuẩn hóa dữ liệu từ Backend sang định dạng UI Component yêu cầu
  const normalizedBooking = useMemo(() => {
    if (!rawBooking) return null;


    // Backend bóc tách các tầng: 
    let b = rawBooking.data || rawBooking;
    
    // Dựa trên LOG: Dữ liệu nằm trong { booking: {...}, restaurant: {...} }
    const bookingData = b.booking || b; 
    const restaurantData = b.restaurant || {};

    const getV = (obj, ...keys) => {
      for (const key of keys) {
        if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
      }
      return null;
    };

    const restaurantName = getV(restaurantData, 'restaurantName', 'name', 'Name') || "Restaurant Name";
    const restaurantAddress = getV(restaurantData, 'restaurantAddress', 'address', 'Address') || "Contact restaurant for address";
    const restaurantImages = getV(restaurantData, 'images', 'Images') || [];
    const restaurantImage = restaurantImages[0] || getV(restaurantData, 'image', 'Image') || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop";

    const bid = getV(bookingData, 'id', 'Id', '_id');
    const bCode = getV(bookingData, 'bookingCode', 'BookingCode', 'code', 'Code');

    // Thông tin người dùng có thể nằm trong user hoặc customer object bên trong booking
    const userData = bookingData.user || bookingData.User || bookingData.customer || bookingData.Customer || {};

    return {
      id: bid,
      bookingCode: bCode || (bid ? String(bid).slice(0, 8).toUpperCase() : 'N/A'),
      status: (getV(bookingData, 'status', 'Status') || 'pending').toLowerCase(),
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
        // Sử dụng giá trị thô nếu formatDate trả về rỗng
        date: formatDate(getV(bookingData, 'bookingDate', 'BookingDate', 'date', 'Date')) || getV(bookingData, 'bookingDate', 'date'),
        time: formatTime(getV(bookingData, 'bookingTime', 'BookingTime', 'time', 'Time')) || getV(bookingData, 'bookingTime', 'time'),
        partySize: getV(bookingData, 'numGuests', 'NumGuests', 'guests', 'Guests', 'partySize') || 1,
        tableType: getV(bookingData, 'tableType', 'TableType') || "Standard Seating"
      },
      notes: getV(bookingData, 'specialRequests', 'notes', 'SpecialRequest') || "No special requests provided.",
      financial: {
        deposit: (getV(bookingData, 'depositAmount', 'DepositAmount') !== null) ? `${Number(getV(bookingData, 'depositAmount', 'DepositAmount')).toLocaleString('vi-VN')} VNĐ` : "0 VNĐ",
        total: (getV(bookingData, 'totalPrice', 'TotalPrice') !== null) ? `${Number(getV(bookingData, 'totalPrice', 'TotalPrice')).toLocaleString('vi-VN')} VNĐ` : (getV(bookingData, 'depositAmount', 'DepositAmount') ? `${Number(getV(bookingData, 'depositAmount', 'DepositAmount')).toLocaleString('vi-VN')} VNĐ` : "0 VNĐ")
      }
    };
  }, [rawBooking]);





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
            
            {/* Secondary Actions */}
            <div className="p-2">
              <button className="w-full py-4 text-rose-500 text-xs font-black uppercase tracking-widest border-2 border-rose-50 hover:bg-rose-50/50 hover:border-rose-100 rounded-3xl transition-all">
                Cancel Reservation
              </button>
              <p className="text-[10px] text-slate-400 font-black uppercase text-center mt-6 tracking-wider">
                Managed via SeatNow Premium Concierge
              </p>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default BookingDetailPage;


