import React, { useState, useMemo } from 'react';
import { useMyBookingsQuery } from '../hooks.js';
import { useProfileQuery } from '../../profile/hooks.js';
import BookingFilter from '../components/BookingFilter.jsx';
import BookingCard from '../components/BookingCard.jsx';
import BookingEmptyState from '../components/BookingEmptyState.jsx';
import Pagination from '../../../shared/ui/Pagination.jsx';

/**
 * @file BookingHistoryPage.jsx
 * @description Trang lịch sử đặt bàn kết nối dữ liệu thực từ Backend với bộ lọc All và Phân trang.
 * @author Antigravity AI
 */
const BookingHistoryPage = () => {
  const { data: profile } = useProfileQuery();
  const { data: bookings = [], isLoading } = useMyBookingsQuery();
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Hiển thị 3 bản ghi/trang theo yêu cầu

  // Cập nhật trang hiện tại về 1 khi đổi bộ lọc
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Phân loại đơn hàng theo trạng thái Backend
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const status = b.status?.toLowerCase() || '';
      
      if (activeTab === 'All') return true;
      if (activeTab === 'Upcoming') {
        return ['pending', 'confirmed', 'arrived'].includes(status);
      }
      if (activeTab === 'Completed') {
        return status === 'completed';
      }
      if (activeTab === 'Canceled') {
        return ['cancelled', 'no_show'].includes(status);
      }
      return false;
    });
  }, [bookings, activeTab]);

  // Logic Phân trang phía Client
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBookings, currentPage]);

  // Tính toán số lượng cho các tabs lọc
  const counts = useMemo(() => {
    return {
      All: bookings.length,
      Upcoming: bookings.filter(b => ['pending', 'confirmed', 'arrived'].includes(b.status?.toLowerCase())).length,
      Completed: bookings.filter(b => b.status?.toLowerCase() === 'completed').length,
      Canceled: bookings.filter(b => ['cancelled', 'no_show'].includes(b.status?.toLowerCase())).length,
    };
  }, [bookings]);


  return (
    <div className="min-h-screen bg-[#FDFCFE] pt-2 pb-24 px-8 relative overflow-hidden transition-all duration-700">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-200/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Nội dung chính chi tiết lịch sử đặt bàn - Full Width */}
        <main className="bg-white/50 backdrop-blur-sm p-12 rounded-[3rem] border-2 border-slate-200/60 shadow-soft">
          
          {/* Header Trang */}
          <div className="mb-12">
            <h1 className="text-[3.5rem] font-black text-slate-900 leading-tight tracking-tighter mb-4 headline">
              Booking History
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl">
              Manage your upcoming gastronomic experiences and revisit your past culinary journeys.
            </p>
          </div>

          {/* Component Lọc Tabs */}
          <BookingFilter 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            counts={counts}
          />

          {/* Hiển thị danh sách dựa trên trạng thái tải và dữ liệu */}
          {isLoading ? (
            <div className="space-y-8 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-white/80 rounded-3xl border-2 border-slate-100 shadow-soft"></div>
              ))}
            </div>
          ) : paginatedBookings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-500">
                {paginatedBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>

              {/* Điều khiển Phân trang */}
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <BookingEmptyState activeTab={activeTab} />
          )}

        </main>
      </div>
    </div>
  );
};

export default BookingHistoryPage;
