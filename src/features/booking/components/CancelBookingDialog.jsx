import React, { useState } from 'react';

/**
 * @file CancelBookingDialog.jsx
 * @description Dialog xác nhận hủy booking kèm lý do (Frontend UI)
 */
const CancelBookingDialog = ({ isOpen, onClose, onConfirm, isCanceling }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-rose-500 text-xl">event_busy</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Cancel Reservation</h3>
          </div>
          <button 
            onClick={onClose}
            disabled={isCanceling}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-500 leading-relaxed">
              We'll be sorry to see you cancel. If you're sure, please let us know the reason so we can improve our services.
            </p>
            
            <div className="space-y-2">
              <label htmlFor="cancel-reason" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Reason for Cancellation (Optional)
              </label>
              <textarea
                id="cancel-reason"
                className="w-full border-2 border-slate-200 rounded-2xl p-4 text-sm text-slate-800 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all resize-none"
                rows="3"
                placeholder="E.g., Changed plans, schedule conflict..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={isCanceling}
              ></textarea>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 pt-4 bg-slate-50 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isCanceling}
              className="flex-1 py-3 px-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all text-sm disabled:opacity-50"
            >
              Keep Reservation
            </button>
            <button
              type="submit"
              disabled={isCanceling}
              className="flex-1 py-3 px-4 bg-rose-500 rounded-xl font-bold text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600 hover:shadow-rose-600/30 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isCanceling ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                'Confirm Cancel'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelBookingDialog;
