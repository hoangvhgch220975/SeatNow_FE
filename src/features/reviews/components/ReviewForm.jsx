import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import StarRatingInput from './StarRatingInput';
import ImageUploader from '../../media/components/ImageUploader';
import { createReview } from '../api';
import { useQueryClient } from '@tanstack/react-query';
import { parseApiError } from '../../../shared/utils/parseApiError';

/**
 * @file ReviewForm.jsx
 * @description Form đánh giá tích hợp Star Rating, chi tiết trải nghiệm và upload ảnh.
 */

// Schema validation sử dụng Zod
const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  foodRating: z.number().min(1).max(5).optional().or(z.literal(0)),
  serviceRating: z.number().min(1).max(5).optional().or(z.literal(0)),
  atmosphereRating: z.number().min(1).max(5).optional().or(z.literal(0)),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(1000),
  images: z.array(z.string()).max(5, 'Maximum 5 images allowed').default([]),
});

const ReviewForm = ({ restaurantId, bookingId, onSuccess }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      foodRating: 0,
      serviceRating: 0,
      atmosphereRating: 0,
      comment: '',
      images: [],
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Chuẩn bị payload, loại bỏ các trường detailed rating nếu không được chọn (0)
      const payload = {
        rating: data.rating,
        comment: data.comment,
        images: data.images,
        ...(bookingId && { bookingId }),
        ...(data.foodRating > 0 && { foodRating: data.foodRating }),
        ...(data.serviceRating > 0 && { serviceRating: data.serviceRating }),
        ...(data.atmosphereRating > 0 && { atmosphereRating: data.atmosphereRating }),
      };

      await createReview(restaurantId, payload);
      
      toast.success(t('restaurants.reviews.success_toast'));
      
      // Invalidate cache để cập nhật danh sách review và summary
      queryClient.invalidateQueries(['reviews', 'list', restaurantId]);
      queryClient.invalidateQueries(['reviews', 'summary', restaurantId]);
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(`/restaurants/${restaurantId}`);
      }
    } catch (error) {
      const apiError = parseApiError(error);
      toast.error(apiError.message || t('restaurants.reviews.error_toast'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Cụm đánh giá chính */}
      <div className="bg-white/40 glass-effect p-6 md:p-8 rounded-[2rem] border border-white/50 shadow-xl shadow-primary/5 transition-all hover:bg-white/60">
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <StarRatingInput
              label={t('restaurants.reviews.your_rating')}
              value={field.value}
              onChange={field.onChange}
              error={errors.rating?.message}
              size="md"
            />
          )}
        />
      </div>

      {/* Cụm đánh giá chi tiết (Optional) */}
      <div className="space-y-6 bg-surface-container-lowest/30 p-6 md:p-8 rounded-[2rem] border border-outline-variant/10">
        <div className="flex items-center gap-4">
           <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] flex-shrink-0 opacity-50">
            {t('restaurants.reviews.detailed_rating')}
          </h3>
          <div className="h-px flex-1 bg-outline-variant/10"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <Controller
            name="foodRating"
            control={control}
            render={({ field }) => (
              <StarRatingInput
                label={t('restaurants.reviews.food_rating')}
                value={field.value}
                onChange={field.onChange}
                size="sm"
              />
            )}
          />
          <Controller
            name="serviceRating"
            control={control}
            render={({ field }) => (
              <StarRatingInput
                label={t('restaurants.reviews.service_rating')}
                value={field.value}
                onChange={field.onChange}
                size="sm"
              />
            )}
          />
          <Controller
            name="atmosphereRating"
            control={control}
            render={({ field }) => (
              <StarRatingInput
                label={t('restaurants.reviews.vibe_rating')}
                value={field.value}
                onChange={field.onChange}
                size="sm"
              />
            )}
          />
        </div>
      </div>

      {/* Phần bình luận */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] block opacity-60">
            {t('restaurants.reviews.comment_label')}
          </label>
        </div>
        <textarea
          {...control.register('comment')}
          className={cn(
            "w-full min-h-[140px] p-6 rounded-[1.5rem] bg-white/70 border-2 border-outline-variant/5 focus:border-primary/20 focus:bg-white focus:ring-[8px] focus:ring-primary/5 transition-all outline-none text-on-surface font-serif italic text-lg resize-none shadow-sm placeholder:text-on-surface-variant/20",
            errors.comment && "border-rose-500/10 bg-rose-50/10 focus:ring-rose-500/5"
          )}
          placeholder={t('restaurants.reviews.comment_placeholder')}
        />
        {errors.comment && (
          <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight ml-2">
            {errors.comment.message}
          </p>
        )}
      </div>

      {/* Phần tải ảnh (Giới hạn 5 ảnh) */}
      <div className="space-y-4 bg-white/10 p-6 rounded-[1.5rem] border border-dashed border-outline-variant/20">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] block opacity-60">
            {t('restaurants.reviews.upload_photos')}
          </label>
          <div className="px-2 py-0.5 bg-white/40 rounded-full border border-white/60 text-[8px] font-black text-on-surface-variant/40 uppercase tracking-tighter">
             {t('restaurants.reviews.upload_limit_hint')}
          </div>
        </div>
        
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <div className="bg-white/40 p-4 rounded-2xl border border-white/40">
              <ImageUploader
                value={field.value}
                onChange={field.onChange}
                maxImages={5}
              />
            </div>
          )}
        />
        {errors.images && (
          <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">
            {errors.images.message}
          </p>
        )}
      </div>

      {/* Nút gửi */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "group relative w-full h-16 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-xl transition-all duration-500 flex items-center justify-center overflow-hidden",
            isSubmitting 
              ? "bg-surface-container-highest text-on-surface-variant cursor-not-allowed" 
              : "bg-primary text-on-primary hover:scale-[1.01] active:scale-[0.99] hover:shadow-primary/30"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine transition-transform duration-1000"></div>
          
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
              {t('restaurants.reviews.submitting')}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">rocket_launch</span>
              {t('restaurants.reviews.submit_review')}
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

// Helper function to concatenate classes (since lib/utils might not be exported)
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default ReviewForm;
