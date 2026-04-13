import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Sparkles, Wand2 } from 'lucide-react';
import PromptSuggestions from './PromptSuggestions.jsx';

/**
 * @file ChatInputBar.jsx
 * @description Ô nhập liệu hội thoại tích hợp gợi ý và công cụ AI thông minh.
 * Sử dụng PromptSuggestions component cho phần pills gợi ý.
 */
const ChatInputBar = ({ onSend, onRecommend, isLoading, hasPersonalization = false, suggestions = [] }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  // [Action]: Xử lý gửi tin nhắn
  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // [Component]: Thành phần nhập liệu chính
  return (
    <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. [Component]: Gợi ý câu hỏi nhanh theo vai trò */}
      <PromptSuggestions
        suggestions={suggestions}
        onSelect={onSend}
        isLoading={isLoading}
      />

      {/* 2. Main Input Box */}
      <div className="group relative flex items-center">
        <div className="absolute left-6 text-slate-400 group-focus-within:text-primary transition-colors">
          <Sparkles className="w-5 h-5" />
        </div>

        <input 
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('ai_assistant.chat.placeholder')}
          className="w-full bg-white border border-slate-200 p-6 pl-14 pr-64 rounded-[2rem] text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-xl shadow-slate-200/20"
          disabled={isLoading}
        />

        {/* [Magic Tools]: Các nút chức năng đặc biệt */}
        <div className="absolute right-3 flex items-center gap-2">
          {/* Nút Gợi ý dựa trên lịch sử (Chỉ dành cho Customer) */}
          {hasPersonalization && (
            <button 
              onClick={() => onRecommend()}
              disabled={isLoading}
              title={t('ai_assistant.chat.recommend_tooltip')}
              className="px-4 py-3 bg-indigo-600/10 text-indigo-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-600 hover:text-white disabled:opacity-50 transition-all border border-indigo-600/20 active:scale-95 group/magic"
            >
              <Wand2 className="w-4 h-4 group-hover/magic:rotate-12 transition-transform" />
              <span className="hidden lg:inline text-[10px] uppercase tracking-widest">
                {t('ai_assistant.chat.recommend_button')}
              </span>
            </button>
          )}

          {/* Nút Gửi */}
          <button 
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 hover:translate-x-1 disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">{t('ai_assistant.chat.send_button')}</span>
          </button>
        </div>
      </div>

      {/* 3. Privacy Policy / Footer */}
      <p className="mt-4 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] opacity-80">
        {t('ai_assistant.footer')}
      </p>
    </div>
  );
};

export default ChatInputBar;
