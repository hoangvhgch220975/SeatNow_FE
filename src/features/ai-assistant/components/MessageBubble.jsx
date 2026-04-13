import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import logo from '../../../assets/logos/logo.png';
import { User } from 'lucide-react';

/**
 * @file MessageBubble.jsx
 * @description Hiển thị bong bóng chat riêng lẻ với hỗ trợ Markdown.
 */
const MessageBubble = ({ role, content }) => {
  const isUser = role === 'user';

  // [Component]: Bong bóng hội thoại tích hợp Markdown
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 px-2 animate-in fade-in slide-in-from-bottom-2 duration-500`}>
      <div className={`flex gap-4 max-w-[85%] ${isUser ? 'flex-row-reverse' : ''}`}>
        
        {/* Avatar Area */}
        <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${
          isUser ? 'bg-slate-900 border border-white/10' : 'bg-primary shadow-primary/20'
        }`}>
          {isUser ? (
            <User className="text-white w-5 h-5" />
          ) : (
            <img src={logo} alt="SeatNow AI" className="w-6 h-6 object-contain" />
          )}
        </div>

        {/* Content Bubble */}
        <div className="flex flex-col gap-1.5">
          <div className={`p-5 rounded-3xl text-sm leading-relaxed shadow-sm border ${
            isUser 
              ? 'bg-slate-900 text-white rounded-tr-none border-slate-800' 
              : 'bg-white border-slate-100 text-slate-700 rounded-tl-none'
          }`}>
            <div className="prose prose-sm max-w-none prose-slate">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // [Custom Render]: Tùy chỉnh hiển thị các thẻ Markdown quan trọng để đảm bảo tính thẩm mỹ
                  strong: ({node, ...props}) => <strong className="text-primary font-black" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 mb-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1 mb-2" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />,
                  p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-lg font-black mb-3 text-slate-900" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-md font-bold mb-2 text-slate-800" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-sm font-black mb-2 text-primary" {...props} />,
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-4 rounded-xl border border-slate-100">
                      <table className="min-w-full divide-y divide-slate-100" {...props} />
                    </div>
                  ),
                  th: ({node, ...props}) => <th className="px-4 py-2 bg-slate-50 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest" {...props} />,
                  td: ({node, ...props}) => <td className="px-4 py-2 text-xs border-t border-slate-50" {...props} />,
                  code: ({node, inline, ...props}) => (
                    inline 
                      ? <code className="bg-slate-100 px-1.5 py-0.5 rounded-md text-primary font-bold" {...props} />
                      : <code className="block bg-slate-50 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-100" {...props} />
                  )
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* Timestamp or Status (Optional) */}
          <p className={`text-[9px] font-bold text-slate-300 uppercase tracking-widest px-1 ${isUser ? 'text-right' : 'text-left'}`}>
             {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
