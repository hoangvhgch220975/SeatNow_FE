import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, QrCode, Send, CloudUpload, Info, AlertCircle } from 'lucide-react';
import { useWithdrawFunds } from '../hooks';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const withdrawalSchema = z.object({
  amount: z.number().min(10000, 'Minimum withdrawal is 10,000 VND'), // t('wallet.min_withdraw_error') will be used in the UI
  description: z.string().optional(),
  withdrawMethod: z.enum(['CARD', 'QR']),
  bankInfo: z.object({
    bankName: z.string().optional(),
    cardNumber: z.string().optional(),
    accountName: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
  }).optional(),
  qrCodeUrl: z.string().optional(),
}).refine((data) => {
  if (data.withdrawMethod === 'CARD') {
    return !!data.bankInfo?.bankName && !!data.bankInfo?.cardNumber && !!data.bankInfo?.accountName;
  }
  return true;
}, {
  message: "Bank information is required for CARD method",
  path: ["bankInfo"],
});

const WithdrawalForm = ({ availableBalance }) => {
  const { t } = useTranslation();
  const { idOrSlug } = useParams();
  const [activeTab, setActiveTab] = useState('CARD');
  const withdrawMutation = useWithdrawFunds();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: 0,
      withdrawMethod: 'CARD',
      description: '',
    }
  });

  const onSubmit = async (data) => {
    if (data.amount > availableBalance) {
      toast.error(t('wallet.insufficient_balance'));
      return;
    }

    try {
      await withdrawMutation.mutateAsync({
        idOrSlug,
        ...data
      });
      toast.success(t('wallet.withdraw_success'));
      reset();
    } catch (error) {
      toast.error(t('wallet.withdraw_error'));
    }
  };

  const handleTabChange = (method) => {
    setActiveTab(method);
    setValue('withdrawMethod', method);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">{t('wallet.withdraw_funds')}</h2>
        <p className="text-sm text-slate-500 mt-2">{t('wallet.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Amount Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('wallet.amount')}</label>
            <button 
              type="button"
              onClick={() => setValue('amount', availableBalance)}
              className="text-[10px] font-bold text-primary bg-primary/5 hover:bg-primary/10 px-2.5 py-1 rounded-lg transition-all border border-primary/10 active:scale-95"
            >
              {t('wallet.withdraw_all')}
            </button>
          </div>
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
              <AlertCircle size={12} /> {t('wallet.min_withdraw_error')}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t('wallet.description')}</label>
          <textarea 
            {...register('description')}
            className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all min-h-[80px]" 
            placeholder={t('wallet.description')}
          ></textarea>
        </div>

        {/* Method Selection Tabs */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t('wallet.method')}</label>
          <div className="grid grid-cols-2 gap-2 bg-slate-100/50 p-1.5 rounded-xl">
            <button 
              type="button"
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'CARD' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} 
              onClick={() => handleTabChange('CARD')}
            >
              <CreditCard size={14} />
              {t('wallet.bank_card')}
            </button>
            <button 
              type="button"
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'QR' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} 
              onClick={() => handleTabChange('QR')}
            >
              <QrCode size={14} />
              {t('wallet.qr_code')}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'CARD' ? (
              <motion.div 
                key="card-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 pt-2"
              >
                <input 
                  {...register('bankInfo.bankName')}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                  placeholder={t('wallet.bank_name')}
                />
                <input 
                  {...register('bankInfo.cardNumber')}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                  placeholder={t('wallet.card_number')}
                />
                <input 
                  {...register('bankInfo.accountName')}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                  placeholder={t('wallet.account_name')}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    {...register('bankInfo.expiryDate')}
                    className="bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                    placeholder="07/28"
                  />
                  <input 
                    {...register('bankInfo.cvv')}
                    className="bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                    placeholder="CVV"
                    maxLength={3}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="qr-upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pt-2"
              >
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative overflow-hidden">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <CloudUpload className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-slate-700">{t('wallet.qr_hint')}</p>
                  <p className="text-[11px] text-slate-400 mt-1 uppercase font-medium tracking-wider">{t('wallet.qr_upload_desc')}</p>
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={(e) => {
                      // Logic upload file thực tế
                      setValue('qrCodeUrl', 'https://mock-storage.com/qr-code.png');
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          disabled={withdrawMutation.isPending || !isValid}
          className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed`} 
          type="submit"
        >
          {withdrawMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {t('wallet.withdraw_funds')}
            </>
          )}
        </button>

        <div className="bg-slate-50 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
            {t('wallet.footer_note')}
          </p>
        </div>
      </form>
    </div>
  );
};

export default WithdrawalForm;
