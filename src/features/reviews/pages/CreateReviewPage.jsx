import React, { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

import { useRestaurant } from '../../restaurants/hooks';
import { useAuthStore } from '../../auth/store';
import { useRestaurantReviewSummary } from '../hooks';
import ReviewForm from '../components/ReviewForm';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner';
import { cn } from '../../../lib/utils';


/**
 * @file CreateReviewPage.jsx
 * @description Trang cho phép người dùng viết đánh giá mới. 
 * Tự động phân biệt giữa Khách vãng lai và Khách hàng xác thực qua bookingId.
 */
const CreateReviewPage = () => {
  const { id: restaurantId } = useParams();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const { data: restaurantResponse, isLoading: isRestaurantLoading, error: restaurantError } = useRestaurant(restaurantId);
  const restaurant = restaurantResponse?.data || restaurantResponse;

  // Lấy tóm tắt đánh giá thực tế từ Reviews Service (MongoDB)
  const { data: summaryResponse } = useRestaurantReviewSummary(restaurantId);
  const summary = summaryResponse?.data || summaryResponse;

  // Kiểm tra Session: Nếu đánh giá qua Booking nhưng chưa/hết hạn Đăng nhập (Vietnamese comment)
  useEffect(() => {
    if (bookingId && !isAuthenticated) {
      toast.error(t('restaurants.reviews.login_required_review'), {
        icon: '🔐',
        duration: 4000
      });
      // Lưu lại URL để sau khi login có thể quay lại (Vietnamese comment)
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
    }
  }, [bookingId, isAuthenticated, navigate, t]);

  if (isRestaurantLoading) return <LoadingSpinner fullPage />;
  
  if (restaurantError || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-6xl text-rose-500/20">error</span>
          <h2 className="text-2xl font-black text-on-surface uppercase tracking-widest">
            {t('restaurants.detail.error_default')}
          </h2>
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-primary text-on-primary rounded-2xl font-bold uppercase tracking-widest text-xs"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh pt-8 pb-20 px-4 relative overflow-hidden -mt-8">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Left Side: Restaurant Summary (Sticky on Desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/3 space-y-8"
        >
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            {t('common.back')}
          </button>

          {/* Restaurant Mini Card */}
          <div className="bg-white/40 glass-effect p-8 rounded-[2.5rem] border border-white/60 shadow-xl shadow-primary/5 space-y-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <img 
                  src={restaurant.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 pt-1">
                <h2 className="text-xl font-black text-on-surface tracking-tight leading-tight mb-2">
                  {restaurant.name}
                </h2>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-sm font-black text-on-surface">
                    {summary?.averageRating ? Number(summary.averageRating).toFixed(1) : 'N/A'}
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant/40 ml-1">
                    ({summary?.totalReviews || 0} {t('restaurants.card.reviews')})
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/40">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                </div>
                <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed pt-1.5">
                  {restaurant.address}
                </p>
              </div>
              
              {/* Cuisine - Show only first one as primary */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                   <span className="material-symbols-outlined text-orange-500 text-lg">restaurant_menu</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {restaurant.cuisineTypes?.[0] && (
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-[10px] font-black uppercase rounded-lg border border-orange-500/10">
                      {restaurant.cuisineTypes[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Price Range - Redesigned */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-emerald-600 text-lg">payments</span>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map((i) => (
                      <span 
                        key={i} 
                        className={cn(
                          "text-sm font-black",
                          i <= restaurant.priceRange ? "text-emerald-600" : "text-emerald-600/10"
                        )}
                      >
                        $
                      </span>
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">
                    {restaurant.priceRange === 1 ? 'Budget' : restaurant.priceRange === 2 ? 'Moderate' : restaurant.priceRange === 3 ? 'Expensive' : 'Luxury'}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Badge (Contextual) */}
            <div className={cn(
              "mt-4 p-4 rounded-2xl flex items-center gap-3 border",
              bookingId 
                ? "bg-green-50/50 border-green-100 text-green-700" 
                : "bg-surface-container-low/50 border-outline-variant/10 text-on-surface-variant"
            )}>
              <span className="material-symbols-outlined text-xl">
                {bookingId ? 'verified_user' : 'rate_review'}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                  {bookingId ? t('restaurants.reviews.verified_badge') : t('restaurants.reviews.guest_opinion')}
                </span>
                <span className="text-[9px] font-medium opacity-60">
                   {bookingId ? t('restaurants.reviews.verified_badge_desc') : t('restaurants.reviews.guest_opinion_desc')}
                </span>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="px-8 space-y-4 opacity-50">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">{t('restaurants.reviews.tips_title')}</h4>
             <ul className="text-[11px] font-medium space-y-2 list-disc pl-4">
                <li>{t('restaurants.reviews.tip_1')}</li>
                <li>{t('restaurants.reviews.tip_2')}</li>
                <li>{t('restaurants.reviews.tip_3')}</li>
             </ul>
          </div>
        </motion.div>

        {/* Right Side: Review Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1"
        >
          <div className="bg-white/60 glass-effect rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-primary/10 border border-white relative overflow-hidden">
             {/* Form Header */}
             <div className="mb-10 space-y-3">
                <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px] opacity-40">
                   {t('restaurants.reviews.share_exp') || 'SHARE YOUR EXPERIENCE'}
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter leading-none">
                   {t('restaurants.reviews.write_review')}
                </h1>
                <div className="h-2 w-20 bg-primary rounded-full mt-4"></div>
             </div>

             <ReviewForm 
                restaurantId={restaurant.id} 
                bookingId={bookingId}
                onSuccess={() => navigate(`/restaurants/${restaurantId}`)}
             />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CreateReviewPage;
