import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGuestBookingLookup } from '../hooks';
import { getRestaurantById } from '../../restaurants/api';

const BookingLookupForm = ({ onSearch }) => {
  const { t } = useTranslation();
  const [bookingCode, setBookingCode] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  const { mutate, isPending, isError, error } = useGuestBookingLookup();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ bookingCode, guestPhone }, {
      onSuccess: async (data) => {
        // data.data could contain the actual booking details depending on your backend response format
        const bookingData = data?.data || data; 
        
        // Fix: If restaurant name is missing, fetch it before showing the result
        if (bookingData && bookingData.restaurantId && !bookingData.restaurantName && !bookingData.restaurant?.name) {
          try {
            const restaurant = await getRestaurantById(bookingData.restaurantId);
            if (restaurant) {
              // Attach the name found in the restaurant object
              bookingData.restaurantName = restaurant.name || restaurant.restaurantName;
            }
          } catch (err) {
            console.error("Failed to fetch restaurant details:", err);
          }
        }

        onSearch(bookingData);
      }
    });
  };

  return (
    <section className="mb-20">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)]">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-4">
              {t('booking.lookup.form.id_label')}
            </label>
            <input 
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              className="w-full h-14 px-6 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-primary/40 text-slate-900 placeholder:text-slate-400 outline-none transition-all" 
              placeholder={t('booking.lookup.form.id_placeholder')} 
              type="text"
              required
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-4">
              {t('booking.lookup.form.phone_label')}
            </label>
            <input 
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full h-14 px-6 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-primary/40 text-slate-900 placeholder:text-slate-400 outline-none transition-all" 
              placeholder={t('booking.lookup.form.phone_placeholder')}
              type="text"
              required
            />
          </div>
          
          {isError && (
            <div className="md:col-span-2 mt-2 -mb-2">
              <p className="text-red-500 text-sm font-bold text-center bg-red-50 py-3 rounded-xl border border-red-100 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                {(() => {
                  const status = error?.response?.status;
                  const msg = error?.response?.data?.message?.toLowerCase() || '';
                  
                  if (status === 404) return t('booking.lookup.error.not_found');
                  if (status === 403 || msg.includes('phone')) return t('booking.lookup.error.phone_mismatch');
                  
                  return error?.response?.data?.message || t('booking.lookup.error.generic');
                })()}
              </p>
            </div>
          )}

          <div className="md:col-span-2 mt-4">
            <button 
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 h-14 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-600 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-70" 
              type="submit"
            >
              {isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  {t('booking.lookup.form.searching')}
                </>
              ) : t('booking.lookup.form.find_button')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingLookupForm;
