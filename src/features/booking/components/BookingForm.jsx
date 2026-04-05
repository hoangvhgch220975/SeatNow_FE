import React from 'react';

/**
 * Helper hỗ trợ Validation
 */
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
export const isValidPhone = (phone) => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone || '');

/**
 * @component BookingForm
 * @description Biểu mẫu thông tin khách hàng cho người dùng chưa đăng nhập.
 * @param {Object} props
 * @param {Object} props.guestInfo - Thông tin khách (tên, email, phone).
 * @param {Function} props.onGuestInfoChange - Callback khi thay đổi input.
 */
const BookingForm = ({ guestInfo, onGuestInfoChange }) => {
  return (
    <div className="pt-4 mt-2 border-t border-outline-variant/10 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-primary text-sm">person_edit</span>
        <span className="text-primary font-black text-[10px] uppercase tracking-widest">Guest Details</span>
      </div>
      
      <div className="space-y-3">
        {/* Full Name */}
        <div className="space-y-1">
          <input 
            type="text" 
            placeholder="Full Name"
            value={guestInfo?.guestName || ''}
            onChange={(e) => onGuestInfoChange('guestName', e.target.value)}
            className={`w-full bg-slate-50 border ${guestInfo?.guestName && guestInfo.guestName.length < 2 ? 'border-rose-300 bg-rose-50/30' : 'border-slate-100'} rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
          />
          {guestInfo?.guestName && guestInfo.guestName.length < 2 && (
            <p className="text-[9px] text-rose-500 font-bold ml-2">Name must be at least 2 characters</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <input 
            type="email" 
            placeholder="Email Address"
            value={guestInfo?.guestEmail || ''}
            onChange={(e) => onGuestInfoChange('guestEmail', e.target.value)}
            className={`w-full bg-slate-50 border ${guestInfo?.guestEmail && !isValidEmail(guestInfo.guestEmail) ? 'border-rose-300 bg-rose-50/30' : 'border-slate-100'} rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
          />
          {guestInfo?.guestEmail && !isValidEmail(guestInfo.guestEmail) && (
            <p className="text-[9px] text-rose-500 font-bold ml-2">Invalid email address format</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <input 
            type="tel" 
            placeholder="Phone Number"
            value={guestInfo?.guestPhone || ''}
            onChange={(e) => onGuestInfoChange('guestPhone', e.target.value)}
            className={`w-full bg-slate-50 border ${guestInfo?.guestPhone && !isValidPhone(guestInfo.guestPhone) ? 'border-rose-300 bg-rose-50/30' : 'border-slate-100'} rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
          />
          {guestInfo?.guestPhone && !isValidPhone(guestInfo.guestPhone) && (
            <p className="text-[9px] text-rose-500 font-bold ml-2">Invalid Vietnamese phone number</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
