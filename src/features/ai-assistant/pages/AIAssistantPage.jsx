import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, MoreVertical, ShieldCheck, Zap } from 'lucide-react';

// [Imports]: Modular Components
import ChatSidebar from '../components/ChatSidebar.jsx';
import ChatBox from '../components/ChatBox.jsx';
import ChatInputBar from '../components/ChatInputBar.jsx';
import { useAI } from '../hooks.js';
import { ROUTES } from '../../../config/routes.js';

/**
 * @file AIAssistantPage.jsx
 * @description Trang hội thoại AI tổng hợp, hỗ trợ Guest, Customer và Owner.
 * Hỗ trợ context từng nhà hàng khi được truyền restaurantId prop (Workspace mode).
 */
const AIAssistantPage = ({ restaurantId: restaurantIdProp = null }) => {
  const { t } = useTranslation();
  const location = useLocation();
  
  // [Logic]: Ưu tiên prop được truyền trực tiếp (Workspace), sau đó mới lấy từ location.state (Portal)
  const restaurantId = restaurantIdProp || location.state?.restaurantId || null;
  const isWorkspaceContext = !!restaurantId;

  // [Hook]: Sử dụng Logic AI tập trung
  const { 
    chatHistory, 
    sendMessage, 
    sendRecommend, 
    isLoading, 
    isAuthReady,
    sessions,
    activeSessionId,
    startNewChat,
    loadSession,
    deleteSession,
    hasPersonalization,
    isOwner,
    isCustomer,
    isAdmin,
    isGuest
  } = useAI(restaurantId);

  // [Logic]: Phân tách bộ gợi ý dựa trên vai trò
  const suggestions = useMemo(() => {
    // [Safety]: Đảm bảo luôn trả về mảng để tránh lỗi .map()
    const list = isOwner 
      ? t('ai_assistant.suggestions_owner', { returnObjects: true }) 
      : isAdmin
      ? t('admin.ai_intelligence.chat.suggestions', { returnObjects: true })
      : isCustomer 
      ? t('ai_assistant.suggestions_customer', { returnObjects: true }) 
      : t('ai_assistant.suggestions_guest', { returnObjects: true });
    
    return Array.isArray(list) ? list : [];
  }, [isOwner, isCustomer, t]);

  // [Style]: Phân tách chủ đề màu sắc theo vai trò
  const theme = useMemo(() => {
    if (isAdmin) return {
        primary: 'amber-600',
        bg: 'bg-amber-500/10',
        text: 'text-amber-600',
        badge: 'ADMIN PROTOCOL'
    };
    if (isOwner) return { 
        primary: 'violet-600', 
        bg: 'bg-violet-500/10', 
        text: 'text-violet-600', 
        badge: 'EXECUTIVE ADVISOR' 
    };
    if (isCustomer) return { 
        primary: 'emerald-600', 
        bg: 'bg-emerald-500/10', 
        text: 'text-emerald-600', 
        badge: 'PRIVATE CONCIERGE' 
    };
    return { 
        primary: 'slate-500', 
        bg: 'bg-slate-500/10', 
        text: 'text-slate-500', 
        badge: 'GUEST EXPLORER' 
    };
  }, [isAdmin, isOwner, isCustomer]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef(null);

  // [Effect]: Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isLoading]);

  // [Logic]: Hiển thị Skeleton khi đang tải Auth
  if (!isAuthReady) {
    return (
      <div className="h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">
            {t('ai_assistant.chat.initializing')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] bg-[#FDFCFE] flex overflow-hidden relative font-sans">
      
      {/* 1. [Component]: Sidebar Quản lý lịch sử (Chỉ hiện khi có personalization) */}
      {hasPersonalization && (
        <ChatSidebar 
          isOpen={isSidebarOpen}
          sessions={sessions}
          activeSessionId={activeSessionId}
          onStartNewChat={() => startNewChat()}
          onLoadSession={loadSession}
          onDeleteSession={deleteSession}
          roleBadge={isAdmin ? 'PROTOCOL' : (isOwner ? 'EXECUTIVE' : 'MEMBER')}
        />
      )}

      {/* 2. [Layout]: Vùng Chat chính */}
      <main className="flex-grow flex flex-col relative z-20 overflow-hidden">
        
        {/* [Header]: Thanh tiêu đề phân tách theo Role */}
        <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
           <div className="flex items-center gap-6">
              {/* Toggle Sidebar Button */}
              {hasPersonalization && (
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all active:scale-90"
                >
                  <MoreVertical className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-90' : ''}`} />
                </button>
              )}

              <div className="flex flex-col">
                <h1 className="text-lg font-black text-slate-900 leading-tight flex items-center gap-2">
                    {isAdmin ? 'System Intelligence Copilot' : (isOwner ? 'Business Strategic AI' : (isCustomer ? 'Personalized Dining AI' : t('ai_assistant.header.title')))}
                    <div className="flex gap-1">
                        <span className={`px-2 py-0.5 ${theme.bg} ${theme.text} text-[9px] font-black uppercase tracking-tighter rounded-md shadow-sm border border-current/10`}>
                            {theme.badge}
                        </span>
                    </div>
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 leading-none mt-0.5">
                    <ShieldCheck className={`w-3 h-3 ${isAdmin ? 'text-amber-500' : (isOwner ? 'text-violet-500' : (isCustomer ? 'text-emerald-500' : 'text-slate-400'))}`} />
                    {isAdmin ? 'Root Protocol Active' : (isOwner ? 'Portfolio Context Enabled' : (isCustomer ? 'Profile Synchronized' : 'Anonymous Mode'))}
                </p>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-4">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Assistant Status</span>
                  <div className="flex items-center gap-1.5 text-green-500">
                      <Zap className="w-3 h-3 fill-current" />
                      <span className="text-xs font-black">Ultra Responsive</span>
                  </div>
              </div>
              {/* [Role: OWNER/ADMIN]: Ẩn nút quay lại vì đã có sidebar Portal/Admin */}
              {!isOwner && !isAdmin && (
                <Link to={ROUTES.HOME} className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm transition-all shadow-indigo-100/10">
                  <ChevronLeft className="w-5 h-5" />
                </Link>
              )}
           </div>
        </header>

        {/* [Viewport]: Khu vực hiển thị tin nhắn - Đã sửa lỗi chiều cao để không bị mất ô chat */}
        <div className="flex-grow flex flex-col items-center bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary),0.02),transparent_40%)] overflow-hidden">
            <div className="max-w-4xl w-full flex-grow flex flex-col p-4 lg:p-8 min-h-0">
                
                {/* [Component]: Danh sách tin nhắn + ThinkingIndicator */}
                <ChatBox
                  chatHistory={chatHistory}
                  isLoading={isLoading}
                  scrollRef={scrollRef}
                />

                {/* [Input Area]: Thanh nhập liệu - Luôn cố định ở đáy */}
                <div className="w-full shrink-0">
                    <ChatInputBar 
                      onSend={sendMessage}
                      onRecommend={sendRecommend}
                      isLoading={isLoading}
                      hasPersonalization={isCustomer} // [Logic]: Chỉ Customer mới thấy nút Recommend
                      suggestions={suggestions}
                    />
                </div>
            </div>
        </div>
      </main>

      {/* [Style]: Custom scrollbar cho khung chat */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
      `}</style>
    </div>
  );
};

export default AIAssistantPage;
