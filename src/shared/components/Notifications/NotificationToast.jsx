import React from 'react';

/**
 * @file NotificationToast.jsx
 * @description Component hiển thị thông báo nổi (Toast) phong cách Premium.
 */
const NotificationToast = ({ t, payload, eventName, restaurantName }) => {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white/90 backdrop-blur-xl shadow-2xl rounded-[2.5rem] pointer-events-auto flex ring-1 ring-black/5 overflow-hidden border border-white/20`}
    >
      <div className="flex-1 w-0 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <div className="h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
              <span className="material-symbols-outlined">
                {eventName.startsWith('BOOKING') ? 'calendar_today' : 
                 eventName.startsWith('TRANSACTION') ? 'payments' : 'notifications_active'}
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
          onClick={() => import('react-hot-toast').then(m => m.default.dismiss(t.id))}
          className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-black text-slate-400 hover:text-slate-600 focus:outline-none"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
