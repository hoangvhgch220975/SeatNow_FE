import React, { useState, useEffect } from 'react';
import { getRestaurantById } from '../../restaurants/api';

const BookingResultCard = ({ bookingData, onReset }) => {
  const [showQR, setShowQR] = useState(false);
  const [localRestaurantName, setLocalRestaurantName] = useState('Restaurant');

  if (!bookingData) return null;

  // Robustly extract the booking data from potential wrappers
  // Handles: { data: {...} }, { booking: {...} }, or just {...}
  const actualData = bookingData?.data || bookingData?.booking || bookingData;

  // Initial attempt to get the name from the passed data
  const initialName = 
    actualData?.restaurant?.name || 
    actualData?.restaurantName || 
    actualData?.name || 
    actualData?.RestaurantName;

  // Sync state with prop initially or when prop changes
  useEffect(() => {
    if (initialName) {
      setLocalRestaurantName(initialName);
    } else if (actualData?.restaurantId) {
      // If name is missing but ID exists, fetch it immediately
      const fetchName = async () => {
        try {
          const res = await getRestaurantById(actualData.restaurantId);
          console.log("Fetched Restaurant Info:", res);
          // Handle different res structures (direct data or nested data)
          const fetchedName = 
            res?.name || 
            res?.data?.name || 
            res?.restaurantName || 
            res?.data?.restaurantName || 
            res?.RestaurantName ||
            res?.data?.RestaurantName;
          if (fetchedName) setLocalRestaurantName(fetchedName);
        } catch (err) {
          console.error("Error fetching restaurant name in card:", err);
        }
      };
      fetchName();
    }
  }, [initialName, actualData?.restaurantId]);

  // Format date hàm nội bộ đơn giản do không load utils được sẵn tiện
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      if (!dateStr.includes('-')) return dateStr;
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return new Intl.DateTimeFormat('en-GB', {
        weekday: 'short', month: 'short', day: '2-digit', year: 'numeric'
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  // Use optional chaining with fallback to standard names based on API. 
  const bookingId = actualData?.bookingCode || actualData?.id || 'N/A';
  const status = actualData?.status || 'confirmed';
  
  const restaurantName = localRestaurantName;

  const bookingDate = formatDate(actualData?.bookingDate || actualData?.date);
  
  // Clean up booking time: extract only HH:mm if it's an ISO string
  let bookingTime = actualData?.bookingTime || actualData?.time || 'N/A';
  if (bookingTime.includes('T') && bookingTime.includes('Z')) {
    try {
      const t = new Date(bookingTime);
      bookingTime = t.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      // Keep as is if parsing fails
    }
  }

  const guests = actualData.numGuests || actualData.partySize || actualData.guests || 1;
  const tableInfo = actualData.table?.name || actualData.table?.location || actualData.tableName || 'Standard table';

  // Logic: Only PENDING bookings can be modified or cancelled by guests
  const isPending = status.toLowerCase() === 'pending';

  // Logic: Only CONFIRMED bookings should show the QR code
  const isConfirmed = status.toUpperCase() === 'CONFIRMED';

  // QR Generate logic:
  // Using QuickChart API instead of Google Charts (404) or qrserver (Blocked by AdBlock)
  const qrString = actualData.qrCode || actualData.bookingCode || bookingId;
  const qrImageSrc = `https://quickchart.io/qr?text=${encodeURIComponent(qrString)}&size=250&margin=1`;

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
                  {status}
                </span>
                <span className="text-slate-500 font-medium text-sm">Booking ID: <span className="font-bold text-slate-800">#{bookingId}</span></span>
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 mb-8 font-headline">{restaurantName}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined shrink-0">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date & Time</p>
                    <p className="text-slate-900 font-semibold">{bookingDate}</p>
                    <p className="text-slate-500 text-sm">{bookingTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined shrink-0">group</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Guests</p>
                    <p className="text-slate-900 font-semibold">{guests} People</p>
                    <p className="text-slate-500 text-sm">{tableInfo}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-6">
                {isPending ? (
                  <>
                    <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-primary font-bold hover:bg-primary/5 hover:ring-1 hover:ring-primary/20 hover:shadow-sm active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">edit</span>
                      Modify Request
                    </button>
                    
                    <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-500 font-bold hover:text-red-500 hover:bg-red-50 hover:ring-1 hover:ring-red-100 hover:shadow-sm active:scale-95 transition-all ml-auto">
                      <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">cancel</span>
                      Cancel Booking
                    </button>
                  </>
                ) : (
                  <div className="flex w-full items-center justify-between opacity-40 grayscale pointer-events-none cursor-not-allowed">
                     <div className="flex items-center gap-2 text-slate-500 font-bold">
                        <span className="material-symbols-outlined text-xl">edit</span>
                        Modify Request
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 font-bold ml-auto">
                        <span className="material-symbols-outlined text-xl">cancel</span>
                        Cancel Booking
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
                title="Search another booking"
              >
                 <span className="material-symbols-outlined text-sm">close</span>
              </button>

              {isConfirmed ? (
                <>
                  <div className="mb-6 flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full text-primary animate-pulse">
                    <span className="material-symbols-outlined text-4xl">qr_code_scanner</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">
                    Ready to dine? Get your code.
                  </p>
                  
                  <button 
                    onClick={() => setShowQR(true)}
                    className="px-6 py-3 bg-primary text-white rounded-full font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:bg-primary-600 active:scale-95 transition-all w-full"
                  >
                    See Check-in QR
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center opacity-60">
                  <div className="mb-6 flex items-center justify-center w-20 h-20 bg-slate-200 rounded-full text-slate-400">
                    <span className="material-symbols-outlined text-4xl">lock</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
                    {status === 'ARRIVED' ? 'Checked In' : 'QR Not Available'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 px-4 italic">
                    {status === 'PENDING' ? 'Waiting for restaurant confirmation' : 'This booking is no longer active for check-in.'}
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
              <h3 className="text-xl font-bold text-slate-900 mb-2 headline">Your Check-in Code</h3>
              <p className="text-slate-500 text-sm mb-8">Present this code to the staff upon arrival for the fastest check-in.</p>
              
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
                  {bookingId}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingResultCard;
