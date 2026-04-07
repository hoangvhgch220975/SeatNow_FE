import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routes.js';
import RestaurantHero from '../components/RestaurantHero';
import RestaurantGallery from '../components/RestaurantGallery';
import RestaurantInfo from '../components/RestaurantInfo';
import RestaurantMenuPreview from '../components/RestaurantMenuPreview';
import RestaurantPolicies from '../components/RestaurantPolicies';
import AvailabilityPanel from '../components/AvailabilityPanel';
import ReviewSection from '../../reviews/components/ReviewSection';
import { useRestaurant, useRestaurantMenu } from '../hooks.js';
import { useRestaurantReviewSummary } from '../../reviews/hooks.js';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner';
import ErrorState from '../../../shared/feedback/ErrorState';

/**
 * Danh sách tiện ích phong phú để chọn ngẫu nhiên (Amenities)
 * Sử dụng key dịch thuật để hỗ trợ đa ngôn ngữ.
 */
const POTENTIAL_AMENITIES = [
  { icon: 'wifi', labelKey: 'restaurants.amenities.wifi' },
  { icon: 'parking', labelKey: 'restaurants.amenities.parking' },
  { icon: 'deck', labelKey: 'restaurants.amenities.deck' },
  { icon: 'restaurant', labelKey: 'restaurants.amenities.restaurant' },
  { icon: 'ac_unit', labelKey: 'restaurants.amenities.ac_unit' },
  { icon: 'local_bar', labelKey: 'restaurants.amenities.local_bar' },
  { icon: 'meeting_room', labelKey: 'restaurants.amenities.meeting_room' },
  { icon: 'family_restroom', labelKey: 'restaurants.amenities.family_restroom' },
  { icon: 'music_note', labelKey: 'restaurants.amenities.music_note' },
  { icon: 'celebration', labelKey: 'restaurants.amenities.celebration' },
  { icon: 'wine_bar', labelKey: 'restaurants.amenities.wine_bar' },
  { icon: 'child_care', labelKey: 'restaurants.amenities.child_care' },
  { icon: 'accessible', labelKey: 'restaurants.amenities.accessible' },
  { icon: 'credit_card', labelKey: 'restaurants.amenities.credit_card' },
  { icon: 'directions_car', labelKey: 'restaurants.amenities.directions_car' },
  { icon: 'visibility', labelKey: 'restaurants.amenities.visibility' }
];

/**
 * Hàm định dạng chính sách từ Database (Policies) sang mảng chuỗi HTML
 * Hỗ trợ đa ngôn ngữ thông qua hàm t.
 */
const formatPolicies = (policiesData, t) => {
  if (!policiesData) return [
    t('restaurants.policies.grace_period'),
    t('restaurants.policies.cancellation'),
    t('restaurants.policies.dress_code')
  ];

  if (typeof policiesData === 'string') return [policiesData];

  const formatted = [];
  if (policiesData.gracePeriod) {
    formatted.push(t('restaurants.policies.grace_period_param', { time: policiesData.gracePeriod }));
  }
  if (policiesData.cancellationPolicy) {
    formatted.push(t('restaurants.policies.cancellation_param', { policy: policiesData.cancellationPolicy }));
  }
  
  // Backfill nếu thiếu thông tin (Vietnamese comment)
  if (formatted.length < 2) formatted.push(t('restaurants.policies.general'));
  
  return formatted;
};

/**
 * @file RestaurantDetailPage.jsx
 * @description Trang chi tiết nhà hàng, tích hợp API thật, chính sách DB và tiện ích ngẫu nhiên.
 */
const RestaurantDetailPage = () => {
  const { t } = useTranslation();
  const { idOrSlug } = useParams();
  const navigate = useNavigate();

  // 1. Lấy dữ liệu từ Backend (Vietnamese comment)
  const { data, isLoading, isError, error } = useRestaurant(idOrSlug);
  const { data: summaryData } = useRestaurantReviewSummary(idOrSlug);
  const { data: menuData } = useRestaurantMenu(idOrSlug);

  // Chuẩn hóa dữ liệu nhà hàng (Vietnamese comment)
  const restaurant = data?.data || data;
  const summary = summaryData?.data || summaryData || {};
  const menuItems = menuData?.data || menuData || [];

  // 2. Xử lý Tiện ích ngẫu nhiên (Vietnamese comment)
  const amenities = useMemo(() => {
    if (!restaurant?._id && !restaurant?.id) {
      return POTENTIAL_AMENITIES.slice(0, 4).map(a => ({ ...a, label: t(a.labelKey) }));
    }
    
    // Seed đơn giản từ ID (Vietnamese comment)
    const seed = (restaurant._id || restaurant.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const shuffled = [...POTENTIAL_AMENITIES].sort(() => 0.5 - (seed % 10) / 10);
    return shuffled.slice(0, 4).map(a => ({ ...a, label: t(a.labelKey) }));
  }, [restaurant, t]);

  // 3. Định dạng Chính sách từ DB (Vietnamese comment)
  const policies = useMemo(() => formatPolicies(restaurant?.policies, t), [restaurant, t]);

  // 4. Logic chuyển đến Trang Menu (Vietnamese comment)
  const handleViewFullMenu = () => {
    navigate(ROUTES.RESTAURANT_MENU(idOrSlug));
  };

  if (isLoading) {
    return <LoadingSpinner message={t('restaurants.detail.loading')} />;
  }

  if (isError || !restaurant) {
    return (
      <ErrorState 
        message={error?.response?.data?.message || t('restaurants.detail.error_default')} 
      />
    );
  }

  const uiRestaurant = {
    ...restaurant,
    rating: (summaryData && typeof summary.averageRating === 'number') ? summary.averageRating : (restaurant.ratingAvg || 0),
    reviewCount: (summaryData && typeof summary.totalReviews === 'number') ? summary.totalReviews : (restaurant.ratingCount || 0),
    coverImage: restaurant.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    photos: restaurant.images || [],
    priceRange: '$'.repeat(restaurant.priceRange || 2),
    cuisine: (restaurant.cuisineTypes && restaurant.cuisineTypes[0]) || restaurant.cuisine || 'Cuisine',
    location: restaurant.address || restaurant.location || 'Vietnam'
  };

  return (
    <div className="bg-surface pb-20 -mt-12">
      <RestaurantHero restaurant={uiRestaurant} />
      <RestaurantGallery photos={uiRestaurant.photos} />

      <div className="px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-20">
          <RestaurantInfo 
            description={uiRestaurant.description || t('restaurants.detail.default_description')} 
            amenities={amenities} 
            cuisineTypes={restaurant.cuisineTypes || []}
            openingHours={uiRestaurant.openingHours || uiRestaurant.openingHoursJson}
            depositEnabled={uiRestaurant.depositEnabled}
            latitude={uiRestaurant.latitude}
            longitude={uiRestaurant.longitude}
          />

          {/* Menu Preview (Vietnamese comment) */}
          <RestaurantMenuPreview 
            menuItems={menuItems} 
            onViewFullMenu={handleViewFullMenu}
          />
          
          <ReviewSection 
            restaurantId={idOrSlug} 
            baseRestaurant={uiRestaurant} 
          />
          
          <RestaurantPolicies policies={policies} />
        </div>

        <div className="lg:col-span-4 relative">
          <div className="sticky top-28">
            <AvailabilityPanel restaurant={uiRestaurant} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
