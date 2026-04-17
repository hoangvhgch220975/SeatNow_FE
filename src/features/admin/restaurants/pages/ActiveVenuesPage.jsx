import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Download, Store, ShieldCheck, ShieldAlert, Lock } from 'lucide-react';
import RestaurantFilters from '../components/RestaurantFilters';
import RestaurantTable from '../components/RestaurantTable';
import AdminActionDialog from '../../components/AdminActionDialog';
import { useAdminRestaurants, useRestaurantActions } from '../hooks';
import Pagination from '../../../../shared/ui/Pagination';

/**
 * @file ActiveVenuesPage.jsx
 * @description Trang quản trị vận hành danh sách nhà hàng.
 */
const ActiveVenuesPage = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({ q: '', status: 'all', page: 1, limit: 10 });
  
  // Dialog State
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    restaurant: null,
    type: 'approve_restaurant'
  });

  const { data, isLoading } = useAdminRestaurants(filters);
  const { suspend, activate, isSuspending, isActivating } = useRestaurantActions();

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const openActionModal = (type, restaurant) => {
    setActionModal({
      isOpen: true,
      restaurant,
      type: type === 'suspend' ? 'suspend_restaurant' : 'activate_restaurant'
    });
  };

  const closeActionModal = () => {
    setActionModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirmAction = () => {
    const { type, restaurant } = actionModal;
    if (!restaurant) return;

    if (type === 'suspend_restaurant') suspend(restaurant.id);
    else if (type === 'activate_restaurant') activate(restaurant.id);
    
    closeActionModal();
  };

  const restaurants = data?.data || data || [];
  const pagination = data?.pagination || { total: restaurants.length, page: filters.page, limit: filters.limit };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-1">
            Quản trị Nhà hàng
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Quản trị trạng thái vận hành của các nhà hàng trên toàn hệ thống.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Store, color: 'text-blue-500 bg-blue-50', label: t('admin.restaurants.stats.total'), value: pagination.total },
          { icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-50', label: t('admin.restaurants.stats.active'), value: '84' },
          { icon: Lock, color: 'text-rose-500 bg-rose-50', label: t('admin.restaurants.stats.suspended'), value: '3' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-2xl flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{stat.label}</div>
            <div className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
        <RestaurantFilters onFilterChange={handleFilterChange} initialFilters={filters} />
        
        <RestaurantTable 
          restaurants={restaurants} 
          loading={isLoading} 
          onAction={openActionModal}
        />

        {pagination.total > filters.limit && (
          <div className="mt-8 flex justify-center">
            <Pagination 
              currentPage={filters.page}
              totalItems={pagination.total}
              itemsPerPage={filters.limit}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <AdminActionDialog
        isOpen={actionModal.isOpen}
        onClose={closeActionModal}
        onConfirm={handleConfirmAction}
        data={actionModal.restaurant}
        type={actionModal.type}
        loading={isSuspending || isActivating}
      />
    </div>
  );
};

export default ActiveVenuesPage;
