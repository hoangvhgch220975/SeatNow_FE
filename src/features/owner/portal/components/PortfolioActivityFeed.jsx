import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useOwnerActivity } from '../hooks.js';
import { ownerPortalApi } from '../api.js';
import { useQueryClient } from '@tanstack/react-query';

/**
 * @file PortfolioActivityFeed.jsx
 * @description Hiển thị dòng thời gian các hoạt động gần đây của Owner. Hỗ trợ đa ngôn ngữ.
 */
const PortfolioActivityFeed = ({ isLoading: parentLoading }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { activities, unreadCount, isLoading, isError, refetch } = useOwnerActivity({ limit: 6 });

  // 1. Cấu hình loại thông báo (Vietnamese comment)
  const ACTIVITY_CONFIG = useMemo(() => ({
    BOOKING_NEW: { icon: 'calendar_add_on', color: 'bg-indigo-100 text-indigo-600', label: t('activity.types.new_booking') },
    BOOKING_CONFIRMED: { icon: 'event_available', color: 'bg-emerald-100 text-emerald-600', label: t('activity.types.confirmed') },
    BOOKING_CANCELLED: { icon: 'event_busy', color: 'bg-rose-100 text-rose-600', label: t('activity.types.cancelled') },
    BOOKING_NO_SHOW: { icon: 'person_off', color: 'bg-orange-100 text-orange-600', label: t('activity.types.no_show') },
    TRANSACTION_DEPOSIT: { icon: 'payments', color: 'bg-emerald-100 text-emerald-600', label: t('activity.types.deposit') },
    TRANSACTION_TOPUP: { icon: 'account_balance_wallet', color: 'bg-blue-100 text-blue-600', label: t('activity.types.topup') },
    TRANSACTION_WITHDRAW_APPROVED: { icon: 'paid', color: 'bg-violet-100 text-violet-600', label: t('activity.types.withdrawal') },
    REVIEW_NEW: { icon: 'reviews', color: 'bg-amber-100 text-amber-600', label: t('activity.types.review') },
    COMMISSION_SETTLED: { icon: 'receipt_long', color: 'bg-slate-100 text-slate-600', label: t('activity.types.commission') },
    ADMIN_BROADCAST: { icon: 'campaign', color: 'bg-purple-100 text-purple-600', label: t('activity.types.broadcast') },
  }), [t]);

  // 2. Định dạng thời gian tương đối (Vietnamese comment)
  const formatRelativeTime = (dateStr) => {
    if (!dateStr) return '';
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return t('time.seconds_ago', { count: diff });
    if (diff < 3600) return t('time.minutes_ago', { count: Math.floor(diff / 60) });
    if (diff < 86400) return t('time.hours_ago', { count: Math.floor(diff / 3600) });
    return t('time.days_ago', { count: Math.floor(diff / 86400) });
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    refetch();
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success(t('activity.feed_updated'), {
        icon: '✅',
        style: { borderRadius: '1rem', background: '#1e293b', color: '#fff', fontWeight: 'bold' },
      });
    }, 2000);
  };

  const handleActivityClick = async (activity) => {
    if (!activity.isRead) {
      try {
        await ownerPortalApi.markActivityRead(activity.id);
        queryClient.invalidateQueries({ queryKey: ['owner', 'activity'] });
      } catch (e) {
        // Silent error
      }
    }
    toast.success(t('activity.detail_coming_soon'), {
      icon: '🚀',
      style: { borderRadius: '1rem', background: '#1e293b', color: '#fff', fontWeight: 'bold' },
    });
  };

  if (isLoading || parentLoading) {
    return (
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden h-full">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="p-8 flex items-center gap-6 border-b border-slate-50 last:border-0">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 animate-pulse flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-100 animate-pulse rounded-lg w-3/4" />
              <div className="h-3 bg-slate-50 animate-pulse rounded-lg w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const safeActivities = isError ? [] : activities;
  const safeUnreadCount = isError ? 0 : unreadCount;

  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full relative">
      {/* 1. Header Control (Vietnamese comment) */}
      {safeUnreadCount > 0 && (
        <div className="flex items-center justify-between px-8 py-4 bg-violet-50/50 border-b border-violet-100/50">
          <span className="text-[10px] font-black text-violet-600 uppercase tracking-widest">
            {t('activity.unread', { count: safeUnreadCount })}
          </span>
          <button
            onClick={async () => {
              await ownerPortalApi.markAllActivityRead();
              queryClient.invalidateQueries({ queryKey: ['owner', 'activity'] });
            }}
            className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors"
          >
            {t('activity.mark_all_read')}
          </button>
        </div>
      )}

      {/* 2. Dòng hoạt động (Vietnamese comment) */}
      <div className="divide-y divide-slate-50 overflow-y-auto flex-1">
        {safeActivities.length === 0 ? (
          <div className="p-16 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-200 mb-4 block">notifications_none</span>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
              {t('activity.no_activity')}
            </p>
          </div>
        ) : (
          safeActivities.map((activity, idx) => {
            const config = ACTIVITY_CONFIG[activity.type] || {
              icon: 'notifications',
              color: 'bg-slate-100 text-slate-600',
              label: activity.type,
            };

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleActivityClick(activity)}
                className={`p-8 flex items-center justify-between gap-6 hover:bg-slate-50/80 transition-all group/item cursor-pointer ${
                  !activity.isRead ? 'bg-violet-50/30' : ''
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover/item:scale-110 ${config.color} relative`}>
                    <span className="material-symbols-outlined text-2xl">{config.icon}</span>
                    {!activity.isRead && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-violet-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <h4 className={`text-sm font-black tracking-tight leading-tight group-hover/item:text-violet-600 transition-colors ${
                      !activity.isRead ? 'text-slate-900' : 'text-slate-700'
                    }`}>
                      {activity.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-semibold leading-snug line-clamp-1 max-w-[240px]">
                      {activity.message}
                    </p>
                    <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">
                      {formatRelativeTime(activity.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-4 group-hover/item:translate-x-0 flex-shrink-0">
                  <span className="material-symbols-outlined text-xl text-violet-600">arrow_forward</span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* 3. Nút Refresh (Vietnamese comment) */}
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className={`group flex items-center justify-center gap-3 w-full py-5 text-[11px] font-black uppercase tracking-widest border-t-2 transition-all duration-300 relative ${
          isRefreshing
            ? 'border-violet-200 text-violet-500 bg-violet-50 cursor-wait'
            : 'border-slate-100 text-slate-500 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-200 cursor-pointer'
        }`}
      >
        <span className={`material-symbols-outlined text-[16px] transition-transform duration-500 ${
          isRefreshing ? 'animate-spin text-violet-500' : 'group-hover:rotate-180'
        }`}>refresh</span>
        <span>{isRefreshing ? t('activity.updating') : t('activity.refresh_feed')}</span>
        {isRefreshing && (
          <span className="absolute bottom-0 left-0 h-1 bg-violet-400 animate-[loading_2s_ease-in-out_forwards] rounded-full" />
        )}
      </button>
    </div>
  );
};

export default PortfolioActivityFeed;
