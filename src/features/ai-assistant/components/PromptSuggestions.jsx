import React from 'react';

/**
 * @file PromptSuggestions.jsx
 * @description Các pill gợi ý câu hỏi nhanh theo vai trò (Owner/Customer/Guest).
 * Được tách ra để dễ tái sử dụng độc lập khỏi ChatInputBar.
 * Props:
 *   - suggestions: string[] - danh sách câu gợi ý
 *   - onSelect: (suggestion: string) => void - khi user click chọn
 *   - isLoading: boolean - vô hiệu hóa các pill khi AI đang phản hồi
 */
const PromptSuggestions = ({ suggestions = [], onSelect, isLoading = false }) => {
  // [Safety]: Đảm bảo luôn là mảng trước khi render
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  if (safeSuggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 px-2">
      {safeSuggestions.map((suggestion, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(suggestion)}
          disabled={isLoading}
          className="px-4 py-2 bg-white/70 backdrop-blur-md border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default PromptSuggestions;
