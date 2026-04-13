import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/logos/logo.png';

/**
 * @file ThinkingIndicator.jsx
 * @description Small loading state component when AI is generating a response.
 */
const ThinkingIndicator = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-start animate-in fade-in duration-300">
      <div className="flex gap-4">
        {/* Profile icon for AI */}
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-sm animate-pulse">
          <img src={logo} alt="Thinking..." className="w-6 h-6 object-contain" />
        </div>
        
        {/* Thinking bubble with animated dots */}
        <div className="p-5 bg-white border border-slate-100 text-slate-400 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2 font-bold italic text-xs">
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-primary/40 rounded-full animate-bounce"></span>
            <span className="w-1 h-1 bg-primary/60 rounded-full animate-bounce delay-100"></span>
            <span className="w-1 h-1 bg-primary/80 rounded-full animate-bounce delay-200"></span>
          </span>
          <span className="uppercase tracking-widest opacity-60">
            {t('ai_assistant.chat.searching')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
