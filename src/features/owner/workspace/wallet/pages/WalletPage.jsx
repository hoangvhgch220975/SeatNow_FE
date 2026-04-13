import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useWalletBalance, useWalletHistory } from '../hooks';
import WalletBalanceCard from '../components/WalletBalanceCard';
import WithdrawalForm from '../components/WithdrawalForm';
import TransactionTable from '../components/TransactionTable';
import { motion } from 'framer-motion';

const WalletPage = () => {
  const { t } = useTranslation();
  const { idOrSlug } = useParams();

  const { data: balanceData, isLoading: isBalanceLoading } = useWalletBalance(idOrSlug);
  
  // Gọi API lấy riêng Lịch sử rút tiền (Backend filtered)
  const { data: payoutData, isLoading: isPayoutLoading } = useWalletHistory(idOrSlug, 'WITHDRAWAL');
  
  // Gọi API lấy toàn bộ Lịch sử giao dịch
  const { data: historyData, isLoading: isHistoryLoading } = useWalletHistory(idOrSlug);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('wallet.title')}</h1>
          <p className="text-slate-500 mt-1">{t('wallet.subtitle')}</p>
        </div>
      </motion.div>

      {/* KPI Section */}
      <WalletBalanceCard data={balanceData?.data} isLoading={isBalanceLoading} />

      {/* Main Content Grid - Sử dụng items-stretch để chiều cao 2 cột bằng nhau */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: 2 Tables combined - Flex container để phân bổ chiều cao */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <TransactionTable 
            title={t('wallet.payout_history')}
            subtitle={t('wallet.withdraw_history_subtitle')}
            transactions={payoutData?.data?.slice(0, 4)} 
            isLoading={isPayoutLoading}
            showViewAll={true}
            className="flex-1" // Chiếm 50%
          />
          <TransactionTable 
            title={t('wallet.recent_transactions')}
            subtitle={t('wallet.transaction_history_subtitle')}
            transactions={historyData?.data?.slice(0, 4)} 
            isLoading={isHistoryLoading}
            className="flex-1" // Chiếm 50%
          />
        </div>

        {/* Right Side: Action Form - Sticky within is parent */}
        <div className="lg:col-span-4">
          <WithdrawalForm 
            availableBalance={balanceData?.data?.balance || 0} 
          />
        </div>
      </div>
    </div>
  );
};


export default WalletPage;
