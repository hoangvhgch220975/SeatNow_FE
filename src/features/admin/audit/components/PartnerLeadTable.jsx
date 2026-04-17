import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import { formatDateTime } from '../../../../shared/utils/formatDateTime';

/**
 * @file PartnerLeadTable.jsx
 * @description Bảng danh sách các yêu cầu đăng ký đối tác (Leads).
 */
const PartnerLeadTable = ({ leads = [], loading, onApprove }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-slate-50 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="flex flex-col items-center gap-2 opacity-20">
          <CheckCircle2 size={48} />
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('admin.audit.table.empty_leads')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('admin.audit.table.lead_info')}</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('admin.audit.table.expected_restaurant')}</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('admin.audit.table.request_date')}</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">{t('admin.panel.table.actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {leads.map((lead) => (
            <tr key={lead._id || lead.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900">{lead.name}</div>
                <div className="text-xs text-slate-500 font-medium">{lead.email} • {lead.phone}</div>
              </td>
              <td className="px-6 py-4 font-bold text-sm text-slate-700">
                {lead.restaurantName}
              </td>
              <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                {lead.createdAt ? formatDateTime(lead.createdAt) : '--'}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onApprove(lead)}
                  className="px-4 py-2 bg-violet-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-violet-700 transition-all shadow-md shadow-violet-100 active:scale-95"
                >
                  {t('admin.panel.restaurants.actions.approve')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerLeadTable;
