import React from 'react';

/**
 * @file RestaurantPagination.jsx
 * @description Thanh phân trang linh hoạt (Dựa trên tổng số trang từ API)
 */
const RestaurantPagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  // Logic hiển thị đơn giản: hiện trang trước, hiện tại và sau (có thể cải thiện sau)
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <nav className="flex justify-center items-center space-x-2 pt-12">
      {/* Nút Previous */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-all text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Danh sách trang */}
      {pages.map((p, idx) => (
        p === '...' ? (
          <span key={`dots-${idx}`} className="px-2 text-slate-400">...</span>
        ) : (
          <button 
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all font-bold text-sm ${
              currentPage === p 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            {p}
          </button>
        )
      ))}

      {/* Nút Next */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-all text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  );
};

export default RestaurantPagination;
