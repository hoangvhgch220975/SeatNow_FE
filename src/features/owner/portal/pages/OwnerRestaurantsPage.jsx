import { useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * @file OwnerRestaurantsPage.jsx
 * @description Trang hiển thị danh sách tất cả nhà hàng của chủ sở hữu.
 * Hiện tại đang là bản xem trước (Placeholder).
 */
const OwnerRestaurantsPage = () => {
  useEffect(() => {
    toast('This view is currently under development.', {
      icon: '🏗️',
      duration: 3000,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="bg-violet-100 p-8 rounded-full">
        <span className="material-symbols-outlined text-6xl text-violet-600">storefront</span>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900">All Venues</h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          You will soon be able to manage all your restaurant assets from this single, unified interface. 
          Stay tuned for real-time monitoring and advanced asset management.
        </p>
      </div>
      <div className="flex space-x-4">
         <div className="px-6 py-2 bg-slate-200 text-slate-500 rounded-full text-xs font-bold uppercase tracking-widest">
           Status: In Development
         </div>
         <div className="px-6 py-2 bg-violet-100 text-violet-700 rounded-full text-xs font-bold uppercase tracking-widest">
           Priority: High
         </div>
      </div>
    </div>
  );
};

export default OwnerRestaurantsPage;
