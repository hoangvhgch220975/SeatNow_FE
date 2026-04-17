import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDateTime } from '../../../../shared/utils/formatDateTime';

/**
 * @file PartnerLeadTable.jsx
 * @description Bảng danh sách các yêu cầu đăng ký đối tác (Leads).
 */
const PartnerLeadTable = ({ 
  leads = [], 
  loading, 
  onApprove,
  pagination = {},
  onPageChange
}) => {
  const { t } = useTranslation();
  const { page = 1, total = 0, limit = 5 } = pagination;
  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-20 bg-slate-50 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="flex flex-col items-center gap-2 opacity-20 text-slate-400">
          <CheckCircle2 size={48} />
          <p className="text-sm font-black uppercase tracking-widest">{t('admin.audit.table.empty_leads')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-grow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 uppercase tracking-widest">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400">{t('admin.audit.table.lead_info')}</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400">{t('admin.audit.table.expected_restaurant')}</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400">{t('admin.audit.table.request_date')}</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 text-right">{t('admin.panel.table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leads.map((lead) => (
              <tr key={lead._id || lead.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 group-hover:text-violet-600 transition-colors tracking-tight">{lead.name}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{lead.email} • {lead.phone}</div>
                </td>
                <td className="px-6 py-4 font-black text-sm text-slate-700 tracking-tight">
                  {lead.restaurantName}
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-500 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                    {lead.createdAt ? formatDateTime(lead.createdAt) : '--'}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onApprove(lead)}
                    className="px-5 py-2.5 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-violet-700 shadow-md shadow-violet-100 transition-all active:scale-95"
                  >
                    {t('admin.panel.restaurants.actions.approve')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {total > limit && (
        <div className="px-6 py-5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {t('common.showing')} <span className="text-slate-700">{leads.length}</span> {t('common.of')} <span className="text-slate-700">{total}</span> {t('admin.audit.tabs.leads')}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-violet-600 hover:border-violet-200 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => onPageChange(i + 1)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                    page === i + 1 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' 
                      : 'text-slate-400 hover:bg-white hover:text-slate-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-violet-600 hover:border-violet-200 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerLeadTable;
