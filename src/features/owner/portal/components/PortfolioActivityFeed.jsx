import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

/**
 * @file PortfolioActivityFeed.jsx
 * @description Hiển thị dòng thời gian các hoạt động gần đây của toàn bộ hệ thống nhằn hàng.
 */
const PortfolioActivityFeed = ({ isLoading }) => {
  const activities = [
    {
      id: 1,
      type: 'loyalty',
      title: 'VIP Booking: Julianne Moore + 6 Guests',
      desc: 'Confirmed at L\'Essence Parisienne • 12 mins ago',
      label: 'High Value',
      icon: 'loyalty',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 2,
      type: 'celebration',
      title: 'Corporate Event: TechNova Q3 Social',
      desc: 'Private Room booked at The Vine Vault • 1 hr ago',
      label: '$4,200.00',
      icon: 'celebration',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      type: 'reviews',
      title: 'New Review: "Impeccable Service..."',
      desc: '5-star rating at Zen Sushi Atelier • 3 hrs ago',
      label: '5.0 Rating',
      icon: 'reviews',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Stock Alert: Vintage Krug 2008',
      desc: 'Low inventory across 3 venues • 5 hrs ago',
      label: 'Alert',
      icon: 'assignment_late',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm min-h-[400px] animate-pulse" />
    );
  }

  // Hàm xử lý khi nhấn vào một hoạt động (Vietnamese comment)
  const handleActivityClick = (title) => {
    toast.success(`Opening details for: ${title}`, {
      icon: '🚀',
      style: {
        borderRadius: '1rem',
        background: '#1e293b',
        color: '#fff',
        fontWeight: 'bold'
      },
    });
    // Placeholder cho logic redirect sau này
  };

  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden group">
      <div className="divide-y divide-slate-50">
        {activities.map((activity, idx) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleActivityClick(activity.title)}
            className="p-8 flex items-center justify-between gap-6 hover:bg-slate-50/50 transition-all group/item cursor-pointer"
          >
            <div className="flex items-center gap-6">
              {/* Activity Icon Box */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover/item:scale-110 ${activity.color}`}>
                 <span className="material-symbols-outlined text-3xl">{activity.icon}</span>
              </div>

              {/* Activity Content */}
              <div className="space-y-1">
                 <h4 className="text-sm font-black text-slate-800 tracking-tight leading-tight group-hover/item:text-violet-600 transition-colors">
                   {activity.title}
                 </h4>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{activity.desc}</p>
              </div>
            </div>

            {/* Mũi tên chỉ hướng xuất hiện khi di chuột (Vietnamese comment) */}
            <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-4 group-hover/item:translate-x-0">
               <span className="material-symbols-outlined text-xl text-violet-600">arrow_forward</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Feed Bottom Action */}
      <button className="w-full py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-violet-600 hover:bg-slate-50 transition-all border-t border-slate-50 bg-slate-50/30">
         View All Global Feed
      </button>
    </div>
  );
};

export default PortfolioActivityFeed;
