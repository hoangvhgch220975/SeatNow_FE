import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  Wallet, 
  Star, 
  Info, 
  Circle,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import useNotificationStore from '../../hooks/useNotificationStore.hooks.js';

/**
 * @file NotificationItem.jsx
 * @description Component hiển thị từng mục thông báo trong danh sách.
 * Xử lý màu sắc, icon và điều hướng trang chi tiết.
 */

const NotificationItem = ({ activity, onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const markAsRead = useNotificationStore((state) => state.markAsRead);

  const { type, title, message, createdAt, isRead, metadata } = activity;

  // Cấu hình Icon và Màu sắc dựa trên loại sự kiện
  const getConfig = () => {
    if (type.startsWith('BOOKING_')) {
      return {
        icon: Calendar,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100'
      };
    }
    if (type.startsWith('TRANSACTION_') || type === 'COMMISSION_SETTLED') {
      return {
        icon: Wallet,
        color: 'text-amber-500',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100'
      };
    }
    if (type === 'RESTAURANT_APPROVED') {
      return {
        icon: CheckCircle,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-100'
      };
    }
    if (type === 'RESTAURANT_ACTIVATED') {
      return {
        icon: Activity,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100'
      };
    }
    if (type === 'RESTAURANT_SUSPENDED') {
      return {
        icon: AlertTriangle,
        color: 'text-rose-500',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100'
      };
    }
    if (type === 'REVIEW_NEW') {
      return {
        icon: Star,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-100'
      };
    }
    return {
      icon: Info,
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-100'
    };
  };

  const config = getConfig();
  const Icon = config.icon;

  const queryClient = useQueryClient();

  const restaurantId = metadata?.booking?.restaurantId || metadata?.restaurant?.id || activity.restaurantId;
  const [restaurantName, setRestaurantName] = React.useState(null);
  const [idOrSlug, setIdOrSlug] = React.useState(restaurantId);

  React.useEffect(() => {
    if (restaurantId) {
      const queriesData = queryClient.getQueriesData({ queryKey: ['owner', 'restaurants'] });
      for (const [_, data] of queriesData) {
        const restaurants = data?.data || data?.items || data;
        if (Array.isArray(restaurants)) {
          const found = restaurants.find(r => r.id === restaurantId);
          if (found) {
            setRestaurantName(found.name);
            if (found.slug) setIdOrSlug(found.slug);
            break;
          }
        }
      }
    }
  }, [restaurantId, queryClient]);

  const handleClick = async () => {
    if (!isRead) {
      await markAsRead(activity.id);
    }

    // Ưu tiên sử dụng link từ Backend và Map vào Workspace (Vietnamese: Ưu tiên link BE)
    if (activity.link && idOrSlug) {
      if (activity.link === '/restaurant/bookings') return navigate(`/owner/restaurants/${idOrSlug}/bookings`);
      if (activity.link === '/restaurant/reviews') return navigate(`/owner/restaurants/${idOrSlug}/dashboard`);
      if (activity.link === '/restaurant/wallet') return navigate(`/owner/restaurants/${idOrSlug}/wallet`);
      if (activity.link === '/restaurant/settings') return navigate(`/owner/restaurants/${idOrSlug}/settings`);
      
      // Nếu là link khác thì đi thẳng
      return navigate(activity.link);
    }

    let targetPath = '';
    if (type.startsWith('BOOKING_')) {
      const bookingId = metadata?.booking?.id;
      if (idOrSlug && bookingId) {
        targetPath = `/owner/restaurants/${idOrSlug}/bookings/${bookingId}`;
      }
    } else if (type.startsWith('TRANSACTION_') || type === 'COMMISSION_SETTLED') {
      if (idOrSlug) {
        targetPath = `/owner/restaurants/${idOrSlug}/wallet`;
      }
    } else if (type === 'REVIEW_NEW' || type === 'RESTAURANT_APPROVED' || type === 'RESTAURANT_ACTIVATED') {
      if (idOrSlug) {
        targetPath = `/owner/restaurants/${idOrSlug}/dashboard`;
      }
    } else if (type === 'RESTAURANT_SUSPENDED') {
      if (idOrSlug) {
        targetPath = `/owner/restaurants/${idOrSlug}/profile`;
      }
    }

    if (targetPath) {
      navigate(targetPath);
      if (onClose) onClose();
    }
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: i18n.language === 'vi' ? vi : enUS
  });

  return (
    <div 
      onClick={handleClick}
      className={clsx(
        "group relative flex gap-4 p-5 transition-all cursor-pointer border-b border-slate-50 last:border-0 hover:bg-slate-50/80",
        !isRead && "bg-blue-50/20"
      )}
    >
      {/* Icon Indicator */}
      <div className={clsx(
        "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110 shadow-sm",
        config.bgColor,
        config.borderColor,
        config.color
      )}>
        <Icon size={24} />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h4 className={clsx(
              "text-sm tracking-tight truncate",
              !isRead ? "font-black text-slate-900" : "font-bold text-slate-600"
            )}>
              {title || t(`notifications.types.${type}`)}
            </h4>
            
            {restaurantName && (
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                {restaurantName}
              </span>
            )}
          </div>

          {!isRead && (
            <div className="flex-shrink-0 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </div>
          )}
        </div>
        
        <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          {message}
        </p>

        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <Clock size={12} />
          <span>{timeAgo}</span>
        </div>
      </div>

      {/* Hover action indicator */}
      <div className="absolute right-4 bottom-5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
        <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-100">
           <span className="material-symbols-outlined text-[18px] text-blue-600">arrow_forward</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
