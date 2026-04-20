import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  CreditCard,
  QrCode,
  LayoutGrid,
  History,
  CheckCircle2,
  XCircle,
  Banknote,
  ShieldAlert,
  Info,
} from "lucide-react";
import { useAdminWithdrawals, useWithdrawalActions } from "../hooks";
import WithdrawalTable from "../components/WithdrawalTable";
import WithdrawalDecisionDialog from "../components/WithdrawalDecisionDialog";
import WithdrawalStats from "../components/WithdrawalStats";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import { useDebounce } from "../../../../shared/hooks/useDebounce";

/**
 * @file AdminWithdrawalsPage.jsx
 * @description Trang quản lý yêu cầu rút tiền tập trung của Admin.
 * Được nâng cấp để hỗ trợ Keyword Search và dữ liệu Risk Metrics mới.
 */
const AdminWithdrawalsPage = () => {
  const { t } = useTranslation();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [decisionModal, setDecisionModal] = useState({
    isOpen: false,
    mode: "approve",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query để tránh spam API
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Reset trang về 1 khi tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Fetch dữ liệu yêu cầu rút tiền với endpoint chuyên biệt mới
  const { data: withdrawalsData, isLoading } = useAdminWithdrawals({
    status: "pending",
    keyword: debouncedSearch,
    page: currentPage,
    limit: 5,
  });

  const { approveWithdrawal, rejectWithdrawal, isApproving, isRejecting } =
    useWithdrawalActions();

  const requests = withdrawalsData?.data || [];

  const handleDecision = async (id) => {
    try {
      if (decisionModal.mode === "approve") {
        await approveWithdrawal(id);
      } else {
        await rejectWithdrawal(id);
      }
      setDecisionModal({ ...decisionModal, isOpen: false });
      setSelectedRequest(null);
    } catch (error) {
      // Toast đã được xử lý trong hook
    }
  };

  // Tính toán nhanh số liệu dựa trên dữ liệu thật từ AI/Analytics
  const totalPending = requests.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-8 p-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-1">
            {t("admin.withdrawals.title")}
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            {t("admin.withdrawals.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder={t("admin.withdrawals.search_placeholder")}
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-full w-full md:w-80 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all text-sm font-medium outline-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-violet-500 hover:border-violet-200 transition-all shadow-sm">
            <History size={20} />
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <WithdrawalStats
        stats={
          withdrawalsData?.summary || {
            pendingCount: requests.length,
            totalProcessed: 0,
            systemLiquidity: 0,
          }
        }
        loading={isLoading}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {/* Left: Withdrawal List */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <WithdrawalTable
            requests={requests}
            loading={isLoading}
            onSelectRequest={setSelectedRequest}
            pagination={
              withdrawalsData?.pagination || {
                page: 1,
                totalPages: 1,
                total: 0,
              }
            }
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Right: Inspection & Stats Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Inspection Panel */}
          <div className="bg-white rounded-[32px] p-6 md:p-8 border border-slate-200 shadow-sm sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-violet-600 rounded-lg text-white shadow-lg shadow-violet-200">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm">
                {t("admin.withdrawals.details.inspection")}
              </h3>
            </div>
            {selectedRequest ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Request Context */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                        Restaurant
                      </p>
                      <p className="font-bold text-slate-900">
                        {selectedRequest.restaurantName}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-black uppercase rounded shadow-sm">
                      Verified
                    </span>
                  </div>

                  <div className="h-px bg-slate-200/50 my-3" />

                  {/* Payment Details Section - Hiển thị chi tiết ngân hàng hoặc mã QR giải ngân */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none px-1">
                      {t("admin.withdrawals.details.bank_info")}
                    </p>

                    {selectedRequest.bankDetails?.method === "QR" ? (
                      <div className="space-y-3">
                        {selectedRequest.bankDetails.qrCodeUrl ? (
                          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-3 group">
                            <div className="relative overflow-hidden rounded-xl border border-slate-50">
                              <img
                                src={selectedRequest.bankDetails.qrCodeUrl}
                                alt="Withdrawal QR"
                                className="w-full max-w-[200px] aspect-square object-contain transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter text-center">
                              {t("admin.withdrawals.details.qr_instruction")}
                            </p>
                          </div>
                        ) : (
                          <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center gap-3 text-center">
                            <QrCode size={32} className="text-slate-300" />
                            <p className="text-[11px] text-slate-400 font-medium whitespace-pre-wrap leading-relaxed">
                              {t("admin.withdrawals.details.qr_placeholder")}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                          <CreditCard size={24} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-900 truncate">
                            {selectedRequest.bankDetails?.bankName || "N/A"}
                          </p>
                          <p className="text-[11px] font-black text-violet-500 uppercase tracking-tighter truncate mt-0.5">
                            {selectedRequest.bankDetails?.accountHolder ||
                              "Unknown Receiver"}
                          </p>
                          <div className="mt-2">
                            <span className="text-[13px] text-slate-500 font-mono tracking-tighter bg-slate-50 px-2 py-1 rounded border border-slate-100 inline-block w-full">
                              {selectedRequest.bankDetails?.cardNumber ||
                                selectedRequest.bankDetails?.accountNumber ||
                                "No Details"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Risk Signals Panel */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none px-1">
                    Security Analysis
                  </p>

                  <div
                    className={`p-4 rounded-xl border transition-all ${selectedRequest.riskSignals?.insufficientBalance ? "bg-red-50 border-red-100" : "bg-green-50/50 border-green-100"}`}
                  >
                    <div className="flex gap-3">
                      {selectedRequest.riskSignals?.insufficientBalance ? (
                        <ShieldAlert
                          className="text-red-500 shrink-0"
                          size={18}
                        />
                      ) : (
                        <ShieldCheck
                          className="text-green-500 shrink-0"
                          size={18}
                        />
                      )}
                      <div>
                        <p
                          className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedRequest.riskSignals?.insufficientBalance ? "text-red-700" : "text-green-700"}`}
                        >
                          Balance Status
                        </p>
                        <p
                          className={`text-xs font-medium leading-relaxed ${selectedRequest.riskSignals?.insufficientBalance ? "text-red-800" : "text-green-800"}`}
                        >
                          {selectedRequest.riskSignals?.insufficientBalance
                            ? "Withdrawal amount exceeds current available verified balance."
                            : "Account has sufficient funds for this transaction."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedRequest.riskSignals?.unusualAmount && (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                      <AlertCircle
                        size={18}
                        className="text-amber-500 shrink-0"
                      />
                      <div>
                        <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">
                          Magnitude Warning
                        </p>
                        <p className="text-xs text-amber-800 font-medium leading-relaxed">
                          This payout is significantly higher than average.
                          Manual bank verification recommended.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Amount Row */}
                <div className="flex items-center justify-between p-4 bg-violet-50/50 rounded-xl border border-violet-100">
                  <div className="flex items-center gap-2">
                    <Banknote size={16} className="text-violet-600" />
                    <span className="text-xs font-bold text-violet-700">
                      {t("admin.withdrawals.table.requested")}
                    </span>
                  </div>
                  <span className="text-xl font-black text-violet-700">
                    {formatCurrency(selectedRequest.amount)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-3">
                  <button
                    onClick={() =>
                      setDecisionModal({ isOpen: true, mode: "approve" })
                    }
                    disabled={selectedRequest.riskSignals?.insufficientBalance}
                    className="w-full py-4 bg-violet-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-violet-200 hover:bg-violet-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 size={18} />
                    {t("admin.withdrawals.actions.approve")}
                  </button>
                  <button
                    onClick={() =>
                      setDecisionModal({ isOpen: true, mode: "reject" })
                    }
                    className="w-full py-3 bg-white text-red-500 border border-red-100 rounded-xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle size={16} />
                    {t("admin.withdrawals.actions.reject")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center opacity-40">
                <LayoutGrid
                  size={48}
                  className="text-slate-200 mb-4"
                  strokeWidth={1}
                />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {t("common.select_to_view") || "Select a request to inspect"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decision Modal */}
      <WithdrawalDecisionDialog
        isOpen={decisionModal.isOpen}
        onClose={() => setDecisionModal({ ...decisionModal, isOpen: false })}
        request={selectedRequest}
        mode={decisionModal.mode}
        onConfirm={handleDecision}
        loading={isApproving || isRejecting}
      />
    </div>
  );
};

export default AdminWithdrawalsPage;
