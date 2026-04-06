import React from 'react';

/**
 * @component BookingInfoSection
 * @description Hiển thị chi tiết nhà hàng, khách hàng và thông tin đặt bàn.
 * @param {object} booking - Dữ liệu đặt bàn từ BE hoặc MockData
 */
const BookingInfoSection = ({ booking }) => {
  const { restaurant, guest, reservation } = booking;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-100/60 shadow-soft">
      {/* Restaurant Header Image Overlay */}
      <div className="h-64 relative group overflow-hidden">
        <img 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          src={restaurant.image} 
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-6 left-8">
          <h2 className="text-3xl font-black text-white mb-1 headline tracking-tight">{restaurant.name}</h2>
          <p className="text-white/80 flex items-center gap-2 text-sm font-medium italic">
            <span className="material-symbols-outlined text-base">location_on</span>
            {restaurant.address}
          </p>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Guest Details */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-3">Guest Information</h3>
          <div className="space-y-5">
            <InfoItem icon="person" label="Full Name" value={`Mr/Mrs: ${guest.fullName}`} />
            <InfoItem icon="mail" label="Email Address" value={guest.email} />
            <InfoItem icon="call" label="Phone Number" value={`Phone: ${guest.phone}`} />
          </div>
        </div>

        {/* Reservation Details */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-3">Reservation Details</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <DetailItem label="Date" value={reservation.date} />
            <DetailItem label="Time" value={reservation.time} />
            <DetailItem label="Party Size" value={`${reservation.partySize} Guests`} />
            
            {/* Tách biệt thông tin bàn theo yêu cầu */}
            <DetailItem 
              label="Table Number" 
              value={reservation.tableNumber ? `No. ${reservation.tableNumber}` : 'Assignment Pending'} 
            />
            <div className="col-span-2 pt-2 border-t border-slate-50">
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">Seating Area / Type</p>
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-base">table_restaurant</span>
                <span className="text-sm font-black capitalize">{reservation.tableType || 'Standard Seating'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Reason (Bổ sung nếu đơn bị hủy) */}
      {booking.status === 'cancelled' && (
        <div className="mx-10 mb-10 p-6 bg-rose-50 border border-rose-100 rounded-2xl flex gap-4 items-start animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <span className="material-symbols-outlined">info</span>
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-rose-500 mb-1">Cancellation Reason</h4>
            <p className="text-sm font-bold text-rose-900 leading-relaxed">
              {booking.cancellationReason || "The booking was cancelled."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/* Helper Components nội bộ */
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 group">
    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </div>
    <div>
      <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-sm font-black text-slate-900">{value}</p>
    </div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">{label}</p>
    <p className="text-sm font-black text-slate-900">{value}</p>
  </div>
);

export default BookingInfoSection;
