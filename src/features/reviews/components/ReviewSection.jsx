import React, { useState } from 'react';
import RatingSummary from './RatingSummary';
import ReviewList from './ReviewList';
import Pagination from '../../../shared/ui/Pagination.jsx';
import { useRestaurantReviews, useRestaurantReviewSummary } from '../hooks.js';

/**
 * @file ReviewSection.jsx
 * @description Đóng gói toàn bộ logic (Hooks, State, Phân trang) của phần đánh giá.
 * Giúp các trang Detail cực kỳ gọn gàng.
 * @param {string} restaurantId - ID hoặc Slug của nhà hàng
 * @param {object} baseRestaurant - Thông tin cơ bản (fallback) nếu API summary chưa có
 */
const ReviewSection = ({ restaurantId, baseRestaurant }) => {
  const [reviewPage, setReviewPage] = useState(1);
  const REVIEW_LIMIT = 3;

  // 1. Gọi các Hooks fetching dữ liệu
  const { data: summaryData, isLoading: summaryLoading } = useRestaurantReviewSummary(restaurantId);
  const { data: reviewsData, isLoading: reviewsLoading } = useRestaurantReviews(restaurantId, reviewPage, REVIEW_LIMIT);

  // 2. Chuẩn hóa dữ liệu từ API (Body mới { data, total, meta })
  const summary = summaryData?.data || summaryData || {};
  const reviews = reviewsData?.data || (Array.isArray(reviewsData) ? reviewsData : []);
  
  // 3. Ưu tiên lấy total từ reviewsData.total (chính xác theo phân trang), fallback summary/base
  const totalReviews = reviewsData?.total || summary?.totalReviews || baseRestaurant?.reviewCount || 0;
  const rating = summary?.averageRating || baseRestaurant?.rating || 0;
  const totalPages = Math.ceil(totalReviews / REVIEW_LIMIT) || 1;


  const handlePageChange = (newPage) => {
    setReviewPage(newPage);
    // Cuộn nhẹ lên đầu phần review khi chuyển trang
    document.getElementById('review-section-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="review-section-anchor" className="space-y-16">
      {/* Tóm tắt đánh giá (Stars & Bars) */}
      <RatingSummary 
        rating={rating} 
        reviewCount={totalReviews} 
        summary={summary?.ratingBreakdown || {}} 
      />

      {/* Danh sách các bài đánh giá hoặc Skeletons */}
      <ReviewList 
        reviews={reviews} 
        isLoading={reviewsLoading || summaryLoading} 
      />

      {/* Thanh phân trang (Chỉ hiện khi có trên 3 bản ghi) */}
      <Pagination 
        currentPage={reviewPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default ReviewSection;

