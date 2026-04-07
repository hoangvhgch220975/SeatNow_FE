import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../../config/routes';
import { useAIAssistant } from '../hooks';
import logo from '../../../assets/logos/logo.png';
import { useTranslation } from 'react-i18next'; // Áp dụng hook ngôn ngữ (Vietnamese comment)

/**
 * @file AIAssistantPage.jsx
 * @description Trang hội thoại với Trợ lý AI SeatNow.
 * Tích hợp Sidebar lịch sử hội thoại và quản lý phiên làm việc.
 */
const AIAssistantPage = () => {
  const { t } = useTranslation();
  const { 
    chatHistory, 
    sendMessage, 
    sendRecommend,
    addUserMessage, 
    isLoading, 
    isCustomer, 
    sessions, 
    activeSessionId, 
    startNewChat, 
    loadSession, 
    deleteSession,
    isAuthReady
  } = useAIAssistant();
  
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef(null);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const handleSend = (text) => {
    const message = text || inputValue;
    if (!message.trim() || isLoading) return;
    addUserMessage(message);
    sendMessage(message);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Nếu Auth chưa load xong dữ liệu User, hiện Skeleton hoặc mành chờ trắng (Vietnamese comment)
  if (!isAuthReady) {
    return (
      <div className="h-[calc(100vh-80px)] bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">{t('ai_assistant.chat.initializing')}</p>
        </div>
      </div>
    );
  }

  const QuickSuggestions = () => {
    // Lấy các gợi ý tự động từ t() (Vietnamese comment)
    const suggestions = t('ai_assistant.suggestions', { returnObjects: true });

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(suggestion)}
            disabled={isLoading}
            className="px-4 py-2 bg-white/70 backdrop-blur-md border border-primary/10 rounded-full text-[10px] font-bold text-slate-500 hover:bg-primary/10 hover:text-primary transition-all shadow-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-[#FDFCFE] flex overflow-hidden relative">
      
      {/* 1. Sidebar Lịch sử (Chỉ hiện cho Customer) */}
      {isCustomer && (
        <aside className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-white border-r border-slate-100 flex flex-col transition-all duration-300 overflow-hidden relative z-30 shadow-2xl shadow-slate-200/20`}>
          <div className="p-6 flex flex-col h-full w-80">
            {/* New Chat Button (Vietnamese comment) */}
            <button 
              onClick={() => startNewChat()}
              className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all mb-8 shadow-xl shadow-slate-900/10 group"
            >
              <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">add_circle</span>
              {t('ai_assistant.sidebar.new_chat')}
            </button>

            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 px-2">{t('ai_assistant.sidebar.recent_conversations')}</p>
            
            <div className="flex-grow overflow-y-auto space-y-2 custom-scrollbar pr-2">
              {sessions.map((session) => (
                <div 
                  key={session.id}
                  onClick={() => loadSession(session.id)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all border ${
                    activeSessionId === session.id 
                      ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/20' 
                      : 'bg-white border-transparent hover:bg-slate-50'
                  }`}
                >
                  <p className={`text-sm font-bold truncate mb-1 pr-6 ${activeSessionId === session.id ? 'text-primary' : 'text-slate-700'}`}>
                    {session.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {new Date(session.timestamp).toLocaleDateString()}
                  </p>
                  
                  {/* Delete Session */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}

              {sessions.length === 0 && (
                <div className="text-center py-12 px-4">
                  <p className="text-xs font-bold text-slate-300 italic uppercase tracking-tighter">{t('ai_assistant.sidebar.no_past_conversations')}</p>
                </div>
              )}
            </div>

            {/* User Footer in Sidebar (Vietnamese comment) */}
            <div className="mt-auto pt-6 border-t border-slate-50">
               <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">{t('ai_assistant.sidebar.vip')}</div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-900 truncate">{t('ai_assistant.sidebar.executive_name')}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{t('ai_assistant.sidebar.encrypted_session')}</p>
                  </div>
               </div>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Main Chat Area */}
      <main className="flex-grow flex flex-col relative z-20">
        {/* Toggle Sidebar Button (Mobile/Desktop) */}
        {isCustomer && (
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute left-6 top-10 w-10 h-10 bg-white border border-slate-100 rounded-xl shadow-sm text-slate-400 hover:text-primary z-40 flex items-center justify-center transition-all hover:shadow-md"
          >
            <span className="material-symbols-outlined">{isSidebarOpen ? 'first_page' : 'last_page'}</span>
          </button>
        )}

        <div className="max-w-4xl mx-auto w-full h-full flex flex-col px-6 py-8">
          
          {/* Header */}
          <div className={`flex items-center justify-between mb-8 ${isCustomer ? 'pl-14' : ''}`}>
            <div className="flex items-center gap-4">
              {!isCustomer && (
                <Link to={ROUTES.HOME} className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_back</span>
                </Link>
              )}
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  {t('ai_assistant.header.title')}
                  <span className={`px-2 py-0.5 text-[10px] uppercase tracking-widest rounded-md font-black shadow-sm ${
                    isCustomer ? 'bg-indigo-600 text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    {isCustomer ? t('ai_assistant.header.executive_badge') : t('ai_assistant.header.guest_beta_badge')}
                  </span>
                </h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {isCustomer ? t('ai_assistant.header.private_concierge') : t('ai_assistant.header.real_time_concierge')}
                </p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-3">
               <div className="text-right">
                 <p className="text-[10px] font-black text-slate-400 uppercase">{t('ai_assistant.header.status_label')}</p>
                 <p className="text-xs font-bold text-green-500 flex items-center gap-1.5">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   {t('ai_assistant.header.status_online')}
                 </p>
               </div>
            </div>
          </div>

          {/* Chat List */}
          <div 
            ref={scrollRef}
            className="flex-grow bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] mb-6 p-8 overflow-y-auto flex flex-col gap-6 custom-scrollbar"
          >
            {chatHistory.map((chat, idx) => (
              <div 
                key={idx}
                className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
              >
                <div className={`flex gap-4 max-w-[85%] ${chat.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${chat.role === 'user' ? 'bg-slate-900' : 'bg-primary'}`}>
                    {chat.role === 'user' ? (
                      <span className="material-symbols-outlined text-white text-xl">person</span>
                    ) : (
                      <img src={logo} alt="AI" className="w-6 h-6 object-contain" />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className={`p-5 rounded-3xl text-sm font-medium leading-relaxed ${
                      chat.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-tr-none shadow-xl shadow-slate-900/10' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                    }`}>
                      <div className="whitespace-pre-wrap">
                        {chat.message.split('\n').map((line, i) => (
                          <p key={i} className={i !== 0 ? 'mt-2' : ''}>
                            {line.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={index} className="text-primary font-black">{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-sm animate-pulse">
                    <img src={logo} alt="Thinking" className="w-6 h-6 object-contain shadow-white" />
                  </div>
                  <div className="p-5 bg-white border border-slate-100 text-slate-400 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-1.5 font-bold italic text-xs">
                    <span className="w-1 h-1 bg-primary/40 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    {t('ai_assistant.chat.searching')}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input (Vietnamese comment) */}
          <div className="relative z-10">
            <QuickSuggestions />
            <div className="group relative flex items-center">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('ai_assistant.chat.placeholder')}
                className="w-full bg-white border border-slate-200 p-5 pr-64 rounded-3xl text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all shadow-xl shadow-slate-200/20"
                disabled={isLoading}
              />
              <div className="absolute right-3 flex items-center gap-2">
                {/* Nút Magic Recommend (Chỉ dành cho Customer) */}
                {isCustomer && (
                  <button 
                    onClick={() => {
                      sendRecommend(inputValue);
                      setInputValue('');
                    }}
                    disabled={!inputValue.trim() || isLoading}
                    title={t('ai_assistant.chat.recommend_tooltip')}
                    className="px-4 py-3 bg-indigo-600/10 text-indigo-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-600/20 disabled:opacity-50 transition-all border border-indigo-600/20 group"
                  >
                    <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">auto_awesome</span>
                    <span className="hidden lg:inline text-[10px] uppercase tracking-widest">{t('ai_assistant.chat.recommend_button')}</span>
                  </button>
                )}

                <button 
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span className="hidden sm:inline">{t('ai_assistant.chat.send_button')}</span>
                </button>
              </div>
            </div>
            <p className="mt-4 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
              {t('ai_assistant.footer')}
            </p>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
      `}} />
    </div>
  );
};

export default AIAssistantPage;
