import { useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * @file CreateRestaurantPage.jsx
 * @description Trang để chủ nhà hàng bắt đầu đăng ký nhà hàng mới.
 * Hiện tại đang là bản xem trước (Placeholder).
 */
const CreateRestaurantPage = () => {
  useEffect(() => {
    toast('The onboarding wizard is currently in development.', {
      icon: '✨',
      duration: 3000,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="bg-orange-100 p-8 rounded-full">
        <span className="material-symbols-outlined text-6xl text-orange-600">add_business</span>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900">Add New Venue</h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          Start your expansion today. Our streamlined onboarding wizard will guide you through the process 
          of registering your restaurant and integrating with SeatNow.
        </p>
      </div>
      <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200">
         Get Early Access
      </button>
    </div>
  );
};

export default CreateRestaurantPage;
