import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

/**
 * @file LiveFloorPlan.jsx
 * @description Sơ đồ bàn trực tiếp (Live Floor Plan) hiển thị trạng thái các bàn.
 */
const LiveFloorPlan = ({ tables, isLoading }) => {
  const { t } = useTranslation();

  // Mapping status to colors (Vietnamese comment)
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'occupied':
        return 'bg-primary text-white border-primary';
      case 'reserved':
        return 'bg-secondary-container text-on-secondary-container border-secondary-container';
      default:
        // available (Vietnamese comment)
        return 'bg-white text-slate-400 border-slate-200 border-dashed border-2 hover:border-primary/40 hover:bg-slate-50';
    }
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-[0_20px_40px_rgba(99,14,212,0.02)] border border-slate-50 flex flex-col h-full">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase">
            {t('workspace.dashboard.live_floor_plan')}
          </h4>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
            {t('workspace.dashboard.spatial_management', { defaultValue: 'Spatial Management' })}
          </p>
        </div>
        <span className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {t('workspace.floor_plan.live')}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 bg-slate-50/50 p-5 flex-1 rounded-[1.5rem] border border-slate-100 aspect-square relative overflow-auto content-start">
        {isLoading ? (
          Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="aspect-square bg-white animate-pulse rounded-2xl border border-slate-100" />
          ))
        ) : tables?.length > 0 ? (
          tables.map((table) => (
            <motion.div 
              key={table.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer shadow-sm border ${getStatusColor(table.status)}`}
              title={`${table.tableNumber} - ${table.status}`}
            >
              <span className="text-xs font-black">{table.tableNumber}</span>
              <span className="text-[8px] font-bold opacity-60">P{table.capacity}</span>
            </motion.div>
          ))
        ) : (
          <div className="col-span-4 h-full flex items-center justify-center text-slate-300 text-[10px] font-black uppercase tracking-widest">
            No tables defined
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-lg bg-white border-2 border-dashed border-slate-200"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('workspace.floor_plan.available')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-lg bg-primary"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('workspace.floor_plan.occupied')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-lg bg-secondary-container"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('workspace.floor_plan.reserved')}</span>
        </div>
      </div>
    </div>
  );
};

export default LiveFloorPlan;
