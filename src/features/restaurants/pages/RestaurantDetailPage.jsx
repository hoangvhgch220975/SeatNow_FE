import React, { useState, useMemo } from 'react';
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

/**
 * Danh sách tiện ích phong phú để chọn ngẫu nhiên (Amenities)
 */
const POTENTIAL_AMENITIES = [
  { icon: 'wifi', label: 'Free Wifi' },
  { icon: 'parking', label: 'Valet Parking' },
  { icon: 'deck', label: 'Outdoor Seating' },
  { icon: 'restaurant', label: 'Fine Dining' },
  { icon: 'ac_unit', label: 'Air Conditioned' },
  { icon: 'local_bar', label: 'Full Bar' },
  { icon: 'meeting_room', label: 'Private Dining' },
  { icon: 'family_restroom', label: 'Family Friendly' },
  { icon: 'music_note', label: 'Live Music' },
  { icon: 'celebration', label: 'Event Space' },
  { icon: 'wine_bar', label: 'Extensive Wine List' },
  { icon: 'child_care', label: "Kid's Menu" },
  { icon: 'accessible', label: 'Wheelchair Access' },
  { icon: 'credit_card', label: 'Cards Accepted' },
  { icon: 'directions_car', label: 'Free Parking' },
  { icon: 'visibility', label: 'Panoramic View' }
];

/**
 * Hàm định dạng chính sách từ Database (Policies) sang mảng chuỗi HTML
 */
const formatPolicies = (policiesData) => {
  if (!policiesData) return [
    "Grace Period: Standard hold time is <strong>15 minutes</strong>.",
    "Cancellations: Please notify <strong>3 hours</strong> in advance.",
    "Dress Code: <strong>Smart Casual</strong> is recommended."
  ];

  if (typeof policiesData === 'string') return [policiesData];

  const formatted = [];
  if (policiesData.gracePeriod) {
    formatted.push(`Grace Period: The restaurant will hold your table for <strong>${policiesData.gracePeriod}</strong>.`);
  }
  if (policiesData.cancellationPolicy) {
    formatted.push(`Cancellations: ${policiesData.cancellationPolicy}`);
  }
  
  // Backfill nếu thiếu thông tin
  if (formatted.length < 2) formatted.push("General: Please arrive on time to ensure your reservation is honored.");
  
  return formatted;
};

/**
 * @file RestaurantDetailPage.jsx
 * @description Trang chi tiết nhà hàng, tích hợp API thật, chính sách DB và tiện ích ngẫu nhiên.
 */
const RestaurantDetailPage = () => {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();

  // 1. Lấy dữ liệu từ Backend
  const { data, isLoading, isError, error } = useRestaurant(idOrSlug);
  const { data: summaryData } = useRestaurantReviewSummary(idOrSlug);
  const { data: menuData } = useRestaurantMenu(idOrSlug);

  // Chuẩn hóa dữ liệu nhà hàng
  const restaurant = data?.data || data;
  const summary = summaryData?.data || summaryData || {};
  const menuItems = menuData?.data || menuData || [];

  // 2. Xử lý Tiện ích ngẫu nhiên (Dùng ID làm seed để dữ liệu không nhảy lung tung)
  const amenities = useMemo(() => {
    if (!restaurant?._id && !restaurant?.id) return POTENTIAL_AMENITIES.slice(0, 4);
    
    // Seed đơn giản từ ID
    const seed = (restaurant._id || restaurant.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const shuffled = [...POTENTIAL_AMENITIES].sort(() => 0.5 - (seed % 10) / 10);
    return shuffled.slice(0, 4);
  }, [restaurant]);

  // 3. Định dạng Chính sách từ DB
  const policies = useMemo(() => formatPolicies(restaurant?.policies), [restaurant]);

  // 4. Logic chuyển đến Trang Menu riêng biệt
  const handleViewFullMenu = () => {
    navigate(ROUTES.RESTAURANT_MENU(idOrSlug));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Loading exquisite details...</p>
        </div>
      </div>
    );
  }

  if (isError || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-8">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-red-500">sentiment_dissatisfied</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops! Destination Not Found</h2>
          <p className="text-slate-500 mb-8">
            {error?.response?.data?.message || "We couldn't retrieve the details for this restaurant. It might be offline or the link has expired."}
          </p>
          <Link 
            to={ROUTES.RESTAURANT_LIST}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  const uiRestaurant = {
    ...restaurant,
    // Ưu tiên tuyệt đối dữ liệu từ Summary (MongoDB), nếu không có mới dùng SQL
    rating: (summaryData && typeof summary.averageRating === 'number') ? summary.averageRating : (restaurant.ratingAvg || 0),
    reviewCount: (summaryData && typeof summary.totalReviews === 'number') ? summary.totalReviews : (restaurant.ratingCount || 0),
    coverImage: restaurant.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    photos: restaurant.images || [],
    priceRange: '$'.repeat(restaurant.priceRange || 2),
    cuisine: (restaurant.cuisineTypes && restaurant.cuisineTypes[0]) || restaurant.cuisine || 'Cuisine',
    location: restaurant.address || restaurant.location || 'Vietnam'
  };

  return (
    <div className="bg-surface pb-20 -mt-20">
      <RestaurantHero restaurant={uiRestaurant} />
      <RestaurantGallery photos={uiRestaurant.photos} />

      <div className="px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-20">
          <RestaurantInfo 
            description={uiRestaurant.description || "Indulge in a premium dining experience where every dish is a masterpiece of flavors and art."} 
            amenities={amenities} 
          />
          
          {/* Menu Preview - Hiển thị 4 món đầu tiên */}
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
