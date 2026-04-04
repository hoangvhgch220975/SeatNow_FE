import React from 'react';
import { Link } from 'react-router-dom';
import { useMyBookingsQuery } from '../../booking/hooks.js';
import { useRestaurant } from '../../restaurants/hooks.js';
import { formatDate, formatTime } from '../../../shared/utils/formatDateTime.js';



/**
 * @file RecentOrders.jsx (Profile Component)
 * @description Hiển thị danh sách 3 đơn hàng gần nhất (Real Data) trong Bento Grid.
 * @author Antigravity AI
 */
const RecentOrders = () => {
  // Lấy dữ liệu thực tế từ Booking Service
  const { data: bookings, isLoading } = useMyBookingsQuery();
  
  // Chỉ lấy 3 bản ghi mới nhất để đảm bảo bố cục
  const recentBookings = bookings?.slice(0, 3) || [];

  return (
    <div className="bg-white/50 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-slate-200/60 shadow-soft flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-slate-900 tracking-tight text-nowrap">RECENT ORDERS</h2>
        <Link 
          to="/my-bookings" 
          className="text-xs font-black text-primary hover:underline cursor-pointer tracking-widest text-right transition-all hover:scale-105"
        >
          VIEW HISTORY
        </Link>
      </div>
      
      <div className="space-y-6 flex-grow">
        {isLoading ? (
          // Skeleton loading tinh tế
          [1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-50/50 rounded-[2rem] animate-pulse"></div>
          ))
        ) : recentBookings.length > 0 ? (
          recentBookings.map((b) => (
            <ActivityItem 
              key={b.id}
              booking={b}
              status={b.status} 
            />
          ))
        ) : (
          // Trạng thái trống (Empty State)
          <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-60">
            <span className="material-symbols-outlined text-4xl mb-3 text-slate-300">history_toggle_off</span>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No recent orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * @description Component item hiển thị một bản ghi đặt bàn lẻ
 */
const ActivityItem = ({ booking, status }) => {
  const b = booking;
  // Thử lấy tên từ dữ liệu có sẵn
  const initialName = b.restaurant?.name || b.restaurantName || b.RestaurantName;
  const restaurantId = b.restaurantId || b.idRestaurant;

  // Nếu thiếu tên, gọi hook fetch dữ liệu nhà hàng (tận dụng cache React Query)
  const { data: restaurant, isLoading: isResLoading } = useRestaurant(!initialName ? restaurantId : null);

  const displayName = initialName || restaurant?.name || (isResLoading ? '...' : `Booking #${b.bookingCode || b.id.slice(0, 8)}`);
  
  // Lấy ảnh đầu tiên từ mảng images của nhà hàng
  const restaurantImages = b.restaurant?.images || restaurant?.images || [];
  const displayImg = restaurantImages[0] || b.restaurant?.image || restaurant?.image || `https://api.dicebear.com/9.x/shapes/svg?seed=${b.id || b.restaurantId}`;


  // Định dạng ngày và giờ dùng tiện ích dùng chung
  const formattedDate = formatDate(b.bookingDate || b.date);
  const formattedTime = formatTime(b.bookingTime || b.time);
  const subtitle = `${b.numGuests || 0} GUESTS • ${formattedDate} • ${formattedTime}`;

  // Mapper màu sắc trạng thái chuyên nghiệp
  const getStatusColor = (s) => {
    const statusLower = String(s).toLowerCase();
    switch (statusLower) {
      case 'confirmed':
      case 'arrived':
      case 'upcoming':
        return 'bg-indigo-50 text-indigo-600';
      case 'completed':
        return 'bg-emerald-50 text-emerald-600';
      case 'cancelled':
      case 'no-show':
        return 'bg-rose-50 text-rose-600';
      default:
        return 'bg-slate-50 text-slate-400';
    }
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] flex items-center justify-between hover:translate-y-[-4px] transition-all duration-500 shadow-soft border-2 border-slate-100/80 cursor-default group">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 overflow-hidden shadow-inner group-hover:rotate-6 transition-transform">
          <img alt={displayName} className="w-full h-full object-cover p-2" src={displayImg} />
        </div>
        <div>
          <h4 className="font-black text-slate-800 tracking-tight line-clamp-1">{displayName}</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap ${getStatusColor(status)}`}>
        {status}
      </span>
    </div>
  );
};


export default RecentOrders;
