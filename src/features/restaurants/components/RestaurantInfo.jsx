import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @file RestaurantInfo.jsx
 * @description Hiển thị mô tả nhà hàng, tiện ích, giờ mở cửa hàng tuần, đặt cọc và bản đồ. Hỗ trợ đa ngôn ngữ.
 * @param {Object} props
 * @param {string} props.description - Mô tả nhà hàng
 * @param {Array} props.amenities - Danh sách tiện ích
 * @param {Array} props.cuisineTypes - Danh sách loại hình ẩm thực
 * @param {Object|string} props.openingHours - Giờ mở cửa hàng tuần
 * @param {boolean} props.depositEnabled - Trạng thái có yêu cầu đặt cọc hay không
 * @param {number} props.latitude - Vĩ độ nhà hàng
 * @param {number} props.longitude - Kinh độ nhà hàng
 */
const RestaurantInfo = ({ 
  description, 
  amenities, 
  cuisineTypes, 
  openingHours, 
  depositEnabled,
  latitude,
  longitude
}) => {
  const { t } = useTranslation();
  
  /**
   * Bộ giải mã thông minh (Smart Parser) xử lý mọi định dạng giờ mở cửa từ Database
   * Hỗ trợ đa ngôn ngữ cho tên các thứ trong tuần.
   */
  const getWeeklyHours = () => {
    if (!openingHours) return [];
    
    let hoursObj = openingHours;
    if (typeof openingHours === 'string') {
      try {
        hoursObj = JSON.parse(openingHours);
      } catch (e) {
        return [{ day: t('restaurants.info.everyday'), hours: openingHours, isToday: true }];
      }
    }

    if (typeof hoursObj !== 'object' || hoursObj === null) return [];

    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weeklyData = {};
    daysOrder.forEach(d => weeklyData[d] = t('restaurants.info.closed'));

    Object.entries(hoursObj).forEach(([key, value]) => {
      const k = key.toLowerCase();
      
      if (k.includes('monday-sunday') || k.includes('mon-sun') || k.includes('everyday')) {
        daysOrder.forEach(d => weeklyData[d] = value);
      } else if (k.includes('weekday') || k.includes('mon-fri') || k.includes('monday-friday')) {
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(d => weeklyData[d] = value);
      } else if (k.includes('weekend') || k.includes('sat-sun') || k.includes('saturday-sunday')) {
        ['Saturday', 'Sunday'].forEach(d => weeklyData[d] = value);
      } else {
        const matchedDay = daysOrder.find(d => k.includes(d.toLowerCase()) || k.includes(d.toLowerCase().substring(0, 3)));
        if (matchedDay) weeklyData[matchedDay] = value;
      }
    });

    const standardDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const realToday = standardDayNames[new Date().getDay()];

    return daysOrder.map(day => ({
      day: t(`restaurants.info.days.${day}`),
      hours: weeklyData[day],
      isToday: day === realToday
    }));
  };

  const weeklyHours = getWeeklyHours();

  // URL nhúng Google Maps động dựa trên tọa độ DB (Vietnamese comment)
  const mapEmbedUrl = (latitude && longitude) 
    ? `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`
    : null;

  return (
    <div className="space-y-16">
      {/* 1. Phần Mô tả (About) (Vietnamese comment) */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-on-surface">
          {t('restaurants.info.about')}
        </h2>
        <p className="text-lg text-on-surface-variant leading-relaxed font-light">
          {description}
        </p>
      </div>

      {/* 2. Giờ mở cửa & Chính sách đặt cọc (Operating Details) (Vietnamese comment) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="p-8 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 shadow-inner">
          <div className="flex items-center gap-4 mb-6 border-b border-outline-variant/10 pb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-xl">schedule</span>
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              {t('restaurants.info.operating_hours')}
            </h4>
          </div>
          
          <div className="space-y-3">
            {weeklyHours.length > 0 ? (
              weeklyHours.map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center px-4 py-2 rounded-xl transition-all ${item.isToday ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'text-on-surface-variant'}`}>
                  <span className={`text-sm ${item.isToday ? 'font-black' : 'font-bold'}`}>
                    {item.day}
                  </span>
                  <span className={`text-sm ${item.isToday ? 'font-black' : 'font-medium font-mono'}`}>
                    {item.hours}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 text-center py-4 italic">
                {t('restaurants.info.hours_not_available')}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-8">
            <div className="p-8 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 flex items-start gap-5 shadow-inner">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${depositEnabled ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                <span className="material-symbols-outlined text-3xl">
                  {depositEnabled ? 'payments' : 'check_circle'}
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  {t('restaurants.info.deposit_policy')}
                </h4>
                <div className="flex flex-col gap-2 pt-1">
                  <p className="text-lg font-black text-on-surface leading-tight">
                    {depositEnabled ? t('restaurants.info.deposit_required') : t('restaurants.info.deposit_free')}
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {depositEnabled 
                      ? t('restaurants.info.deposit_required_desc')
                      : t('restaurants.info.deposit_free_desc')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex items-center gap-4">
                 <span className="material-symbols-outlined text-primary">info</span>
                 <p className="text-[11px] text-primary/70 font-bold uppercase tracking-wider">
                   {t('restaurants.info.arrival_reminder')}
                 </p>
            </div>
        </div>
      </div>

      {/* 3. Vị trí Bản đồ (Vietnamese comment) */}
      {mapEmbedUrl && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-2">
              {t('restaurants.info.location_title')}
            </h3>
            <span className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-bold rounded-full">
              {t('restaurants.info.live_map')}
            </span>
          </div>
          <div className="w-full h-[400px] rounded-[2.5rem] overflow-hidden border border-outline-variant/20 shadow-soft relative bg-slate-100">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('restaurants.info.location_title')}
              className="grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      )}

      {/* 4. Loại hình ẩm thực (Vietnamese comment) */}
      {cuisineTypes && cuisineTypes.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-2">
            {t('restaurants.info.cuisine_style')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {cuisineTypes.map((type, idx) => (
              <span 
                key={idx}
                className="px-6 py-3 rounded-full bg-white text-primary text-sm font-bold border border-outline-variant/30 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm hover:shadow-md cursor-default"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 5. Tiện ích (Amenities) (Vietnamese comment) */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-2">
          {t('restaurants.info.amenities_features')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-10 bg-surface-container-lowest rounded-[2.5rem] border border-outline-variant/20 shadow-soft">
          {amenities.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3 group cursor-default">
              <div className="w-16 h-16 bg-slate-50 rounded-[1.25rem] flex items-center justify-center group-hover:bg-primary/5 transition-colors border border-transparent group-hover:border-primary/10">
                <span className="material-symbols-outlined text-primary/70 text-3xl group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
