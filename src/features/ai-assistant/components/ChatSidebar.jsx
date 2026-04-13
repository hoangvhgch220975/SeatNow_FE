import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle, MessageSquare, Trash2, ShieldCheck, Crown } from 'lucide-react';

/**
 * @file ChatSidebar.jsx
 * @description Sidebar quản lý lịch sử và các phiên hội thoại (Chỉ dành cho Customer/Owner).
 */
const ChatSidebar = ({ 
  sessions, 
  activeSessionId, 
  onLoadSession, 
  onDeleteSession, 
  onStartNewChat, 
  isOpen,
  roleBadge = 'VIP' 
}) => {
  const { t } = useTranslation();

  // [Component]: Thanh bên quản lý hội thoại
  return (
    <aside className={`${isOpen ? 'w-80' : 'w-0'} bg-white border-r border-slate-100 flex flex-col transition-all duration-300 overflow-hidden relative z-30 shadow-2xl shadow-slate-200/20`}>
      <div className="p-6 flex flex-col h-full w-80">
        
        {/* [Action]: Nút bắt đầu hội thoại mới */}
        <button 
          onClick={onStartNewChat}
          className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all mb-8 shadow-xl shadow-slate-900/10 group active:scale-95"
        >
          <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span className="text-sm">{t('ai_assistant.sidebar.new_chat')}</span>
        </button>

        {/* [Header]: Tiêu đề danh sách hội thoại */}
        <div className="flex items-center justify-between mb-4 px-2">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                {t('ai_assistant.sidebar.recent_conversations')}
            </p>
        </div>
        
        {/* [List]: Danh sách các phiên làm việc đã lưu */}
        <div className="flex-grow overflow-y-auto space-y-2 custom-scrollbar pr-2">
          {sessions.map((session) => (
            <div 
              key={session.id}
              onClick={() => onLoadSession(session.id)}
              className={`group relative p-4 rounded-2xl cursor-pointer transition-all border ${
                activeSessionId === session.id 
                  ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/20 shadow-sm' 
                  : 'bg-white border-transparent hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className={`w-4 h-4 ${activeSessionId === session.id ? 'text-primary' : 'text-slate-300'}`} />
                <div className="overflow-hidden">
                  <p className={`text-sm font-bold truncate pr-6 ${activeSessionId === session.id ? 'text-primary' : 'text-slate-700'}`}>
                    {session.title || 'New Conversation'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {new Date(session.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {/* [Action]: Xóa phiên chat */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-50 rounded-3xl">
              <p className="text-xs font-bold text-slate-300 italic uppercase tracking-tighter">
                {t('ai_assistant.sidebar.no_past_conversations')}
              </p>
            </div>
          )}
        </div>

        {/* [Footer]: Thông tin bảo mật và vai trò người dùng */}
        <div className="mt-auto pt-6 border-t border-slate-50">
           <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black text-slate-900 flex items-center gap-1">
                    {roleBadge} <ShieldCheck className="w-3 h-3 text-primary" />
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight truncate">
                    {t('ai_assistant.sidebar.encrypted_session')}
                </p>
              </div>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
