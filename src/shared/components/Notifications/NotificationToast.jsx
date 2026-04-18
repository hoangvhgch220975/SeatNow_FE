import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

/**
 * @file NotificationToast.jsx
 * @description Component hiển thị thông báo nổi (Toast) phong cách Premium.
 * Hỗ trợ điều hướng thông minh vào Workspace nhà hàng.
 */
const NotificationToast = ({ t, payload, eventName, restaurantName }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleNav = (e) => {
    e?.stopPropagation();
    toast.dismiss(t.id);

    // Tìm idOrSlug từ cache để xây dựng URL Workspace (Vietnamese: Tìm info nhà hàng)
    const restaurantId = payload.restaurantId || payload.data?.restaurantId || payload.metadata?.restaurant?.id;
    let idOrSlug = restaurantId;

    if (restaurantId) {
      const queriesData = queryClient.getQueriesData({ queryKey: ['owner', 'restaurants'] });
      for (const [_, data] of queriesData) {
        const restaurants = data?.data || data?.items || data;
        if (Array.isArray(restaurants)) {
          const found = restaurants.find(r => r.id === restaurantId);
          if (found && found.slug) {
            idOrSlug = found.slug;
            break;
          }
        }
      }
    }

    // Ưu tiên link từ Backend và Map vào Workspace (Vietnamese: Ưu tiên link BE)
    const rawLink = payload.link || payload.data?.link || payload.metadata?.link;
    if (rawLink && idOrSlug) {
      if (rawLink === '/restaurant/bookings') return navigate(`/owner/restaurants/${idOrSlug}/bookings`);
      if (rawLink === '/restaurant/reviews') return navigate(`/owner/restaurants/${idOrSlug}/dashboard`);
      if (rawLink === '/restaurant/wallet') return navigate(`/owner/restaurants/${idOrSlug}/wallet`);
      if (rawLink === '/restaurant/settings') return navigate(`/owner/restaurants/${idOrSlug}/settings`);
      
      // Nếu là link khác thì đi thẳng
      return navigate(rawLink);
    }

    // Fallback logic nếu BE không gửi link hoặc không map được (Vietnamese: Dự phòng)
    if (idOrSlug) {
      if (eventName.startsWith('BOOKING')) return navigate(`/owner/restaurants/${idOrSlug}/bookings`);
      if (eventName.startsWith('TRANSACTION')) return navigate(`/owner/restaurants/${idOrSlug}/wallet`);
      if (eventName === 'RESTAURANT_APPROVED' || eventName === 'RESTAURANT_ACTIVATED') return navigate(`/owner/restaurants/${idOrSlug}/dashboard`);
      if (eventName === 'RESTAURANT_SUSPENDED') return navigate(`/owner/restaurants/${idOrSlug}/profile`);
    }
  };

  return (
    <div
      onClick={handleNav}
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white/90 backdrop-blur-xl shadow-2xl rounded-[2.5rem] pointer-events-auto flex ring-1 ring-black/5 overflow-hidden border border-white/20 cursor-pointer group hover:bg-white transition-all`}
    >
      <div className="flex-1 w-0 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <div className="h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">
                {eventName.startsWith('BOOKING') ? 'calendar_today' : 
                 eventName.startsWith('TRANSACTION') || eventName === 'COMMISSION_SETTLED' ? 'payments' :
                 eventName === 'RESTAURANT_APPROVED' ? 'verified' :
                 eventName === 'RESTAURANT_ACTIVATED' ? 'bolt' :
                 eventName === 'RESTAURANT_SUSPENDED' ? 'block' :
                 'notifications_active'}
              </span>
            </div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-black text-slate-900 leading-tight">
              {payload.title || eventName.replace(/_/g, ' ')}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500 line-clamp-2">
              {payload.message}
            </p>
            {restaurantName && (
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 text-[10px] font-black uppercase tracking-widest border border-violet-100/50">
                  {restaurantName}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex border-l border-slate-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            import('react-hot-toast').then(m => m.default.dismiss(t.id));
          }}
          className="w-16 border border-transparent rounded-none rounded-r-2xl flex items-center justify-center text-sm font-black text-slate-400 hover:text-slate-600 focus:outline-none"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
