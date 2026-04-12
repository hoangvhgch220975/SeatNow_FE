import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BookingLookupForm from '../components/BookingLookupForm';
import BookingResultCard from '../components/BookingResultCard';

/**
 * @file TrackBookingPage.jsx
 * @description Trang cho phép khách (Guest) tra cứu thông tin đặt bàn của họ qua Booking ID.
 */
const TrackBookingPage = () => {
  const { t } = useTranslation();
  // Trạng thái: null = đang ở màn hình điền Form || Object = hiển thị result
  const [bookingData, setBookingData] = useState(null);

  return (
    <main className="max-w-4xl mx-auto px-6 pb-16 min-h-screen w-full">
      
      {/* Hero Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 headline">
          {t('booking.lookup.title')}
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed font-medium">
          {t('booking.lookup.subtitle')}
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
        <p className="text-slate-500 mb-4 font-medium">{t('booking.lookup.manage_all')}</p>
        <Link to="/login" className="text-primary font-bold inline-flex items-center gap-2 group hover:text-primary-600 transition-colors">
          {t('booking.lookup.sign_in')}
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>
      </div>
      
    </main>
  );
};

export default TrackBookingPage;
