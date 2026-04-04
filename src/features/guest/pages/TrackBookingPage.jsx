import React, { useState } from 'react';
import { Link } from 'react-router';
import BookingLookupForm from '../components/BookingLookupForm';
import BookingResultCard from '../components/BookingResultCard';

/**
 * @file TrackBookingPage.jsx
 * @description Trang cho phép khách (Guest) tra cứu thông tin đặt bàn của họ qua Booking ID.
 */
const TrackBookingPage = () => {
  // Trạng thái: null = đang ở màn hình điền Form || Object = hiển thị result
  const [bookingData, setBookingData] = useState(null);

  return (
    <main className="max-w-4xl mx-auto px-6 pb-16 min-h-screen w-full">
      
      {/* Hero Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 headline">Booking Lookup</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed font-medium">
          Enter your confirmation code to view booking details, change reservation time, or request special assistance from the restaurant.
        </p>
      </header>

      {/* Main Content Area: Toggle Form or Result */}
      {!bookingData ? (
        <BookingLookupForm onSearch={setBookingData} />
      ) : (
        <BookingResultCard bookingData={bookingData} onReset={() => setBookingData(null)} />
      )}

      {/* Footer CTA */}
      <div className="mt-16 text-center">
        <p className="text-slate-500 mb-4 font-medium">Want to manage all your bookings in one place?</p>
        <Link to="/login" className="text-primary font-bold inline-flex items-center gap-2 group hover:text-primary-600 transition-colors">
          Sign in to manage all bookings
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>
      </div>
      
    </main>
  );
};

export default TrackBookingPage;
