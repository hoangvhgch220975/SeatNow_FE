import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, Store, Info } from 'lucide-react';

// Module-scoped Hooks & Components
import { useAuditLeads, useAuditVenues, useAuditActions } from '../hooks';
import PartnerLeadTable from '../components/PartnerLeadTable';
import PendingRestaurantTable from '../../restaurants/components/PendingRestaurantTable';

// Admin Shared Components
import AdminActionDialog from '../../components/AdminActionDialog';

/**
 * @file AuditRequestsPage.jsx
 * @description Trung tâm kiểm duyệt hồ sơ tập trung.
 */
const AuditRequestsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' or 'venues'

  // Data Fetching (Scoped to Audit Module)
  const { data: leads = [], isLoading: loadingLeads } = useAuditLeads();
  const { data: venues = [], isLoading: loadingVenues } = useAuditVenues();

  // Actions (Scoped to Audit Module)
  const { approveLead, isApprovingLead, approveVenue, isApprovingVenue } = useAuditActions();

  // Dialog State
  const [modal, setModal] = useState({ isOpen: false, data: null, type: 'approve_lead' });

  const openApproveLeadModal = (lead) => {
    setModal({ isOpen: true, data: lead, type: 'approve_lead' });
  };

  const openApproveVenueModal = (venue) => {
    setModal({ isOpen: true, data: venue, type: 'approve_restaurant' });
  };

  const handleConfirmAction = () => {
    if (modal.type === 'approve_lead') {
      approveLead(modal.data._id || modal.data.id);
    } else {
      approveVenue(modal.data.id);
    }
    setModal({ ...modal, isOpen: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-2">
          {t('admin.audit.title')}
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          {t('admin.audit.subtitle')}
        </p>
      </div>

      {/* Tabs Control */}
      <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl w-fit mb-8 shadow-inner">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
            activeTab === 'leads' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <UserPlus size={16} />
          {t('admin.audit.tabs.leads')} ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('venues')}
          className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
            activeTab === 'venues' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Store size={16} />
          {t('admin.audit.tabs.venues')} ({venues.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        {activeTab === 'leads' ? (
          <PartnerLeadTable 
            leads={leads} 
            loading={loadingLeads} 
            onApprove={openApproveLeadModal} 
          />
        ) : (
          <PendingRestaurantTable 
            restaurants={venues} 
            loading={loadingVenues} 
            onApprove={openApproveVenueModal}
          />
        )}
      </div>

      {/* Action Info Warning */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-3xl p-6 flex gap-4">
        <div className="bg-blue-100 p-2 rounded-2xl text-blue-600 h-fit">
          <Info size={20} />
        </div>
        <div className="text-xs leading-relaxed text-blue-800 font-medium">
          <p className="font-bold mb-1 uppercase tracking-tight">{t('admin.audit.info.rules_title')}</p>
          <ul className="list-disc pl-4 space-y-1 opacity-80">
            <li>{t('admin.audit.info.rule_lead')}</li>
            <li>{t('admin.audit.info.rule_venue')}</li>
          </ul>
        </div>
      </div>

      {/* Action Dialog */}
      <AdminActionDialog
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onConfirm={handleConfirmAction}
        data={modal.data}
        type={modal.type}
        loading={isApprovingLead || isApprovingVenue}
      />
    </div>
  );
};

export default AuditRequestsPage;
