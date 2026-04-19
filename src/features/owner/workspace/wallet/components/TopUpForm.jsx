import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Wallet, AlertCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { useTopUpWallet } from '../hooks';
import toast from 'react-hot-toast';

/**
 * @file TopUpForm.jsx
 * @description Biểu mẫu nhập thông tin nạp tiền vào ví nhà hàng qua MoMo hoặc VNPAY.
 * Tách biệt logic từ TopUpDialog để tái sử dụng và quản lý code tốt hơn.
 */

// Schema validation cho cấu trúc dữ liệu nạp tiền
const topUpSchema = z.object({
  amount: z.number().min(10000, 'Minimum top-up is 10,000 VND'),
  provider: z.enum(['MOMO', 'VNPAY']),
});

const TopUpForm = ({ restaurantId, onSuccess }) => {
  const { t } = useTranslation();
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const topUpMutation = useTopUpWallet();
  const [payUrl, setPayUrl] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(topUpSchema),
    defaultValues: {
      amount: 50000,
      provider: 'MOMO',
    }
  });

  const selectedProvider = watch('provider');

  // Xử lý khi nhấn nút nạp tiền
  // Vietnamese comment: Gửi yêu cầu tạo giao dịch nạp tiền tới Backend
  const onSubmit = async (data) => {
    try {
      const response = await topUpMutation.mutateAsync({
        restaurantId,
        ...data
      });

      if (response.data?.payUrl) {
        const newTransactionId = response.data.transactionId;
        setPayUrl(response.data.payUrl);
        setTransactionId(newTransactionId);
        toast.success(t('wallet.topup_success'));
        
        // Mở cửa sổ thanh toán trong tab mới
        window.open(response.data.payUrl, '_blank');
        
        // Chuyển hướng trang hiện tại sang chi tiết giao dịch (Vietnamese comment)
        if (newTransactionId) {
          navigate(ROUTES.WORKSPACE_TRANSACTION_DETAIL(idOrSlug, newTransactionId));
        }

        // Thông báo cho component cha (nếu cần đóng dialog)
        if (onSuccess) onSuccess(response.data.payUrl);
      } else {
        toast.error('Payment URL not found');
      }
    } catch (error) {
      toast.error('Failed to create top-up request');
    }
  };

  // Giao diện hiển thị sau khi đã lấy được payUrl (Yêu cầu thanh toán đang chờ)
  if (payUrl) {
    return (
      <div className="py-6 flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
          <ExternalLink className="w-10 h-10 text-green-600" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">{t('wallet.topup_success')}</h4>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {t('wallet.topup_redirect_notice')}
          </p>
        </div>
        <a 
          href={payUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-100 active:scale-95"
        >
          {t('wallet.pay_now')}
          <ArrowRight size={18} />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
      {/* Trường nhập số tiền nạp */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
          {t('wallet.topup_amount')}
        </label>
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">VND</span>
          <input 
            {...register('amount', { valueAsNumber: true })}
            className={`w-full bg-slate-50 border-none rounded-xl py-4 pl-16 pr-4 text-xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all ${errors.amount ? 'ring-2 ring-red-100' : ''}`} 
            type="number"
            placeholder="0"
          />
        </div>
        {errors.amount && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
            <AlertCircle size={12} /> {t('wallet.min_topup_error')}
          </p>
        )}
      </div>

      {/* Lựa chọn cổng thanh toán */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
          {t('wallet.select_provider')}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['MOMO', 'VNPAY'].map((provider) => (
            <button
              key={provider}
              type="button"
              onClick={() => setValue('provider', provider)}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all gap-2 ${
                selectedProvider === provider 
                  ? 'border-primary bg-primary/5 ring-4 ring-primary/5' 
                  : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                provider === 'MOMO' ? 'bg-[#A50064]' : 'bg-[#005BAA]'
              }`}>
                <span className="text-white font-black text-xs italic">{provider}</span>
              </div>
              <span className={`text-xs font-bold ${selectedProvider === provider ? 'text-primary' : 'text-slate-500'}`}>
                {provider}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Nút xác nhận nạp tiền */}
      <button 
        disabled={topUpMutation.isPending || !isValid}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed" 
        type="submit"
      >
        {topUpMutation.isPending ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <>
            <Wallet size={18} className="group-hover:scale-110 transition-transform" />
            {t('wallet.topup')}
          </>
        )}
      </button>
    </form>
  );
};

export default TopUpForm;
