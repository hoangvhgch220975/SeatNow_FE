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
            <InfoItem icon="person" label="Full Name" value={guest.fullName} />
            <InfoItem icon="mail" label="Email Address" value={guest.email} />
            <InfoItem icon="call" label="Phone Number" value={guest.phone} />
          </div>
        </div>

        {/* Reservation Details */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-3">Reservation Details</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <DetailItem label="Date" value={reservation.date} />
            <DetailItem label="Time" value={reservation.time} />
            <DetailItem label="Party Size" value={`${reservation.partySize} Guests`} />
            <DetailItem label="Table Type" value={reservation.tableType} />
          </div>
        </div>
      </div>
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
