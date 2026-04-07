import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @component BookingFinancialSummary
 * @description Hiển thị tóm tắt tài chính và các ghi chú đặc biệt từ khách hàng. Hỗ trợ đa ngôn ngữ.
 * @param {object} booking - Dữ liệu đặt bàn
 */
const BookingFinancialSummary = ({ booking }) => {
  const { t } = useTranslation();
  const { notes, financial, status, cancellationReason } = booking;

  return (
    <div className="space-y-8">
      {/* Special Requests & Notes (Vietnamese comment) */}
      <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 italic transition-all hover:bg-white hover:shadow-soft">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">edit_note</span>
          {t('booking.detail.sections.special_requests')}
        </h4>
        <p className="text-slate-700 font-medium leading-relaxed">
          "{notes}"
        </p>
      </div>

      {/* Financial Summary (Vietnamese comment) */}
      <div className="bg-white p-10 rounded-3xl border-2 border-slate-100/60 shadow-soft">
        <h3 className="text-xl font-black text-slate-900 mb-8 headline tracking-tight">
          {t('booking.detail.sections.financial_summary')}
        </h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-400">{t('booking.detail.labels.deposit')}</span>
            <span className="text-sm font-black text-slate-900">{financial.deposit}</span>
          </div>
          
          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <span className="text-lg font-black text-slate-900">{t('booking.detail.labels.total_charged')}</span>
            <span className="text-2xl font-black text-primary">{financial.total}</span>
          </div>
          
          <div className="flex items-start gap-3 mt-4 text-xs text-slate-400 font-bold bg-slate-50/50 p-4 rounded-2xl">
            <span className="material-symbols-outlined text-base">info</span>
            <p className="leading-tight">
              {t('booking.detail.fallbacks.deposit_deduction_notice')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFinancialSummary;
