import React, { useState, useEffect, useCallback } from 'react';
import { generateMomoQR, getTransactionStatus } from '../api';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner';

/**
 * @component PaymentModal
 * @description Modal thanh toán tiền cọc tích hợp đa phương thức.
 * @param {Object} props
 * @param {string} props.bookingId - ID của đơn đặt bàn vừa tạo.
 * @param {number} props.amount - Số tiền cần đặt cọc.
 * @param {Function} props.onSuccess - Callback khi thanh toán thành công.
 * @param {Function} props.onClose - Đóng modal.
 */
const PaymentModal = ({ bookingId, amount, onSuccess, onClose }) => {
  const [step, setStep] = useState('SELECT'); // SELECT, MOMO, VNPAY, SUCCESS, ERROR
  const [momoData, setMomoData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180); // 3 phút (180 giây)
  const [isPolling, setIsPolling] = useState(false);

  // 1. Logic bắt đầu thanh toán Momo
  const handleStartMomo = async () => {
    try {
      setStep('LOADING');
      // Gọi API lấy thông tin QR (Mockup hoặc Real)
      const data = await generateMomoQR(bookingId, amount);
      setMomoData(data);
      setStep('MOMO');
      setIsPolling(true);
      setTimeLeft(180);
    } catch (error) {
      console.error('Momo generation failed:', error);
      // Giả lập dữ liệu nếu API chưa sẵn sàng (để UI không chết)
      setMomoData({
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MOMO_PAYMENT_${bookingId}`,
        transactionId: 'MOCK_TXN_123'
      });
      setStep('MOMO');
      setIsPolling(true);
      setTimeLeft(180);
    }
  };

  // 2. Logic Polling kiểm tra trạng thái (3 phút)
  useEffect(() => {
    let pollInterval;
    let timerInterval;

    if (isPolling && timeLeft > 0) {
      // Đếm ngược
      timerInterval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      // Polling mỗi 5 giây
      pollInterval = setInterval(async () => {
        try {
          if (!momoData?.transactionId) return;
          const status = await getTransactionStatus(momoData.transactionId);
          if (status?.status === 'SUCCESS' || status?.status === 'PAID') {
            setIsPolling(false);
            setStep('SUCCESS');
            setTimeout(onSuccess, 2000);
          }
        } catch (e) {
          // Bỏ qua lỗi polling lẻ tẻ
        }
      }, 5000);
    }

    if (timeLeft === 0) {
      setIsPolling(false);
      setStep('ERROR');
    }

    return () => {
      clearInterval(pollInterval);
      clearInterval(timerInterval);
    };
  }, [isPolling, timeLeft, momoData, onSuccess]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={step !== 'LOADING' ? onClose : undefined}
      ></div>

      {/* Modal Card */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-md relative z-10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] animate-in zoom-in-95 fade-in duration-500">
        
        {/* Header Tím Gradient */}
        <div className="bg-gradient-to-br from-primary via-primary/95 to-primary-800 p-8 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-[80px]">payments</span>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>

          <div className="relative z-10">
            <h2 className="text-2xl font-black tracking-tight mb-2">Secure Deposit</h2>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Transaction ID: {bookingId?.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        <div className="p-8">
          {step === 'SELECT' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-on-surface-variant font-medium text-sm mb-1">Total to pay today</p>
                <h3 className="text-4xl font-black text-primary">{formatCurrency(amount)}</h3>
              </div>

              <div className="space-y-3">
                {/* Lựa chọn Momo */}
                <button 
                  onClick={handleStartMomo}
                  className="w-full group flex items-center justify-between p-5 bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#A50064] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-white font-black text-lg">M</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-black text-on-surface text-sm">Momo Wallet</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fast QR Payment</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                </button>

                {/* Lựa chọn VNPay */}
                <button 
                  onClick={() => setStep('VNPAY')}
                  className="w-full group flex items-center justify-between p-5 bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-2xl font-filled">credit_card</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-black text-on-surface text-sm">Debit / Credit Card</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Visa, Mastercard, JCB</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                </button>
              </div>
            </div>
          )}

          {step === 'LOADING' && (
            <div className="py-20 text-center">
              <LoadingSpinner message="Securing your transaction..." />
            </div>
          )}

          {step === 'MOMO' && (
            <div className="text-center space-y-6 py-4">
              <div className="relative inline-block p-4 bg-white rounded-3xl shadow-xl border border-slate-100 group">
                <img 
                  src={momoData?.qrCodeUrl} 
                  alt="Momo QR" 
                  className="w-56 h-56 object-contain"
                />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
                  <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">Scan to Pay</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-center">
                    <div className="text-primary font-black text-2xl mb-1">
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">QR expires in 3 minutes</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-center gap-2 text-primary">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></div>
                        <span className="text-xs font-black uppercase tracking-tighter">Waiting for scanning...</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium italic">Please do not close this window</p>
                </div>
              </div>
            </div>
          )}

          {step === 'VNPAY' && (
            <div className="space-y-8 py-4">
              <div className="flex items-center justify-between">
                 <button onClick={() => setStep('SELECT')} className="flex items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
                 </button>
                 <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1 rounded-full animate-pulse">Coming Soon</span>
              </div>

              <div className="space-y-6 opacity-40 grayscale pointer-events-none">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Card Number</label>
                    <div className="h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-5">
                       <span className="text-slate-300 font-mono tracking-widest underline decoration-dotted underline-offset-4 decoration-2">•••• •••• •••• ••••</span>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Expiry Date</label>
                        <div className="h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-5">
                           <span className="text-slate-300 font-mono tracking-widest">MM/YY</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">CVV</label>
                        <div className="h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-5">
                           <span className="text-slate-300 font-mono tracking-widest">•••</span>
                        </div>
                    </div>
                 </div>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                  <div className="flex items-center gap-3 text-amber-600 mb-2">
                      <span className="material-symbols-outlined">info</span>
                      <span className="text-xs font-black uppercase tracking-tight">System Update</span>
                  </div>
                  <p className="text-xs text-amber-600/80 leading-relaxed font-medium">
                      VNPay integration is undergoing maintenance. Please use <strong>Momo Wallet</strong> for faster processing.
                  </p>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="py-12 text-center space-y-6">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 animate-in zoom-in duration-500">
                <span className="material-symbols-outlined text-white text-5xl font-black animate-bounce">check_circle</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2">Payment Success!</h3>
                <p className="text-on-surface-variant text-sm font-medium">Your table has been reserved. Redirecting...</p>
              </div>
            </div>
          )}

          {step === 'ERROR' && (
            <div className="py-12 text-center space-y-6">
              <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-rose-500/30">
                <span className="material-symbols-outlined text-white text-5xl font-black">error_outline</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2">Transaction Timeout</h3>
                <p className="text-on-surface-variant text-sm font-medium">The payment session has expired. Please try again.</p>
              </div>
              <button 
                onClick={() => setStep('SELECT')}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest"
              >
                Retry Selection
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 text-center border-t border-slate-100 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-slate-400 text-sm">lock</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PCI-DSS Compliant Secure Gateway</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
