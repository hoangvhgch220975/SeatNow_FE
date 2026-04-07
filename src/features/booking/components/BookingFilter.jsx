import { useTranslation } from 'react-i18next';

/**
 * @file BookingFilter.jsx
 * @description Bộ lọc tabs cho lịch sử đặt bàn (Upcoming, Completed, Canceled).
 * Hỗ trợ đa ngôn ngữ.
 */
const BookingFilter = ({ activeTab, setActiveTab, counts }) => {
  const { t } = useTranslation();
  const tabs = [
    { label: t('booking.history.tabs.all'), key: 'all' },
    { label: t('booking.history.tabs.upcoming'), key: 'upcoming' },
    { label: t('booking.history.tabs.completed'), key: 'completed' },
    { label: t('booking.history.tabs.canceled'), key: 'canceled' }
  ];


  return (
    <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold transition-all active:scale-95 whitespace-nowrap ${
            activeTab === tab.key
              ? 'bg-primary text-white shadow-xl shadow-primary/20'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <span>{tab.label}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
            activeTab === tab.key ? 'bg-white/20' : 'bg-slate-200 text-slate-600'
          }`}>
            {counts[tab.key] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BookingFilter;
