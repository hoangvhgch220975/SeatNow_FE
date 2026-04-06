import React, { useState, useMemo } from 'react';
import { usePortfolioDashboard } from '../hooks.js';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

// Import sub-components (Sẽ được xây dựng pixel-perfect)
import DateRangePicker from '../components/DateRangePicker';
import AnalyticsSummary from '../components/AnalyticsSummary';
import AnalyticsCharts from '../components/AnalyticsCharts';
import GuestAnalytics from '../components/GuestAnalytics';
import TopVenuesList from '../components/TopVenuesList';
import PortfolioActivityFeed from '../components/PortfolioActivityFeed';

/**
 * @file GlobalAnalyticsPage.jsx
 * @description Trang quản lý phân tích danh mục (Portfolio Analytics) - Giao diện Pixel Perfect.
 */
const GlobalAnalyticsPage = () => {
  // 1. State quản lý thời gian
  const [dateRange, setDateRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  });
  const [activeTab, setActiveTab] = useState('DAY'); // DAY, WEEK, MONTH (Caps like image)

  // 2. Chuẩn bị params (Lưu ý: API backend nhận period lowercase)
  const rangeParams = useMemo(() => ({
    from: format(dateRange.start, 'yyyy-MM-dd'),
    to: format(dateRange.end, 'yyyy-MM-dd'),
    period: activeTab.toLowerCase()
  }), [dateRange, activeTab]);

  // 3. Fetch dữ liệu đồng bộ
  const { 
    venueSummary,
    businessSummary, 
    myRestaurants, 
    revenueStats, 
    bookingStats,
    isLoading,
    isStatsLoading 
  } = usePortfolioDashboard(
    { status: 'all' },
    rangeParams,
    rangeParams,
    rangeParams
  );

  // 4. Chuẩn bị dữ liệu biểu đồ
  const chartData = useMemo(() => {
    const rev = Array.isArray(revenueStats) ? revenueStats : (revenueStats?.data || []);
    const book = Array.isArray(bookingStats) ? bookingStats : (bookingStats?.data || []);

    return rev.map(r => {
      const b = book.find(bk => bk.timePeriod === r.timePeriod) || {};
      return {
        label: r.timePeriod || '---',
        totalRevenue: Number(r.totalRevenue || 0),
        totalBookings: Number(b.totalBookings || 0)
      };
    });
  }, [revenueStats, bookingStats]);

  const stats = businessSummary?.summary || {};

  // 6. Xử lý dữ liệu Top Performers (Ghép dữ liệu Rating + Kinh doanh) (Vietnamese comment)
  const performanceData = useMemo(() => {
    const venues = Array.isArray(myRestaurants) ? myRestaurants : (myRestaurants?.data || []);
    const breakdown = businessSummary?.breakdown || [];

    return venues.map(v => {
      // Tìm dữ liệu kinh doanh tương ứng trong breakdown
      const b = breakdown.find(item => item.restaurantId === v.id) || {};
      return {
        ...v,
        totalRevenue: b.totalRevenue || 0,
        totalBookings: b.totalBookings || 0
      };
    });
  }, [myRestaurants, businessSummary]);

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* TITLE HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-6">
        <div className="space-y-1">
           <h1 className="text-[42px] font-black text-slate-900 tracking-tight leading-none">
             Global <span className="text-violet-600">Analytics</span>
           </h1>
        </div>

        {/* Action Button */}
        <div className="group relative">
          <button disabled className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed opacity-60 flex items-center gap-2 shadow-sm">
             <span className="material-symbols-outlined text-[18px]">download</span>
             Export Analysis
          </button>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-[60]">
             Feature Coming Soon
          </div>
        </div>
      </header>

      {/* 1. KPI BENTO SUMMARY */}
      <AnalyticsSummary stats={stats} isLoading={isLoading} />

      {/* 2. MAIN CHARTS & FILTERS SECTION (Redesigned for Beauty & Highlight) */}
      <div className="space-y-10">
        {/* IN-SECTION FILTERS - EXECUTIVE STATUS BAR STYLE */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 bg-white/70 p-8 rounded-[3.1rem] border border-slate-100 shadow-xl shadow-slate-200/20 backdrop-blur-xl relative z-50 transition-all hover:shadow-2xl hover:shadow-violet-100/30">
          
          {/* Left: Telemetric Sync Status */}
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                <span className="material-symbols-outlined text-[28px] animate-pulse">radar</span>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Telemetry System</p>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                   <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Active Sync</span>
                </div>
             </div>
          </div>

          {/* Center/Main: HIGHLIGHTED DATE RANGE */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-1 py-4 xl:py-0 border-y xl:border-y-0 xl:border-x border-slate-100/80">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-1">Observation Timeline</p>
             <h2 className="text-3xl font-black text-violet-600 tracking-tighter drop-shadow-sm flex items-center gap-4">
                <span className="opacity-80 text-slate-400 font-bold text-[10px] tracking-widest">FROM</span> 
                {format(dateRange.start, 'MMM dd, yyyy').toUpperCase()}
                <span className="material-symbols-outlined text-slate-400 text-3xl">arrow_right_alt</span>
                {format(dateRange.end, 'MMM dd, yyyy').toUpperCase()}
                <span className="opacity-80 text-slate-400 font-bold text-[10px] tracking-widest">UNTIL</span> 
             </h2>
          </div>

          {/* Right: Analytical Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
             {/* DAY / WEEK / MONTH Selector */}
             <div className="bg-slate-50 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-100">
                {['DAY', 'WEEK', 'MONTH'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                      activeTab === tab 
                        ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50 border border-slate-100' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
             </div>

             <DateRangePicker 
               startDate={dateRange.start} 
               endDate={dateRange.end} 
               onRangeChange={(start, end) => setDateRange({ start, end })} 
             />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="lg:col-span-2">
              <AnalyticsCharts 
                data={chartData} 
                isLoading={isStatsLoading} 
                period={activeTab.toLowerCase()} 
              />
           </div>
           <div className="lg:col-span-1">
              <GuestAnalytics 
                stats={stats} 
                isLoading={isLoading} 
                venueCount={stats?.totalRestaurants || myRestaurants?.length || 0}
              />
           </div>
        </div>
      </div>

      {/* 3. PERFORMANCE RANKING & ACTIVITY FEED ROW - Cân bằng 50/50 (Vietnamese comment) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <section className="lg:col-span-1 space-y-8">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Top Performers</h3>
            </div>
            <TopVenuesList restaurants={performanceData} isLoading={isLoading} />
         </section>
         
         <section className="lg:col-span-1 space-y-8">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Global Activity</h3>
            </div>
            <PortfolioActivityFeed isLoading={isLoading} />
         </section>
      </div>

    </div>
  );
};

export default GlobalAnalyticsPage;
