import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config/routes.js';
import { useRestaurants } from '../hooks.js';
import { slugify } from '../../../shared/utils/slugify.js';

// Import Swiper React components & modules (Vietnamese comment)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, FreeMode } from 'swiper/modules';
import RestaurantCard from './RestaurantCard';

// Import Swiper styles (Vietnamese comment)
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { useQueries } from '@tanstack/react-query';
import { getRestaurantReviewSummary } from '../../reviews/api.js';

/**
 * Component hiển thị Skeleton khi đang load dữ liệu
 */
const RestaurantSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
    <div className="h-64 bg-slate-200"></div>
    <div className="p-8">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-slate-200 rounded w-2/3"></div>
        <div className="h-6 bg-slate-200 rounded w-12"></div>
      </div>
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
      <div className="h-10 bg-slate-200 rounded w-full"></div>
    </div>
  </div>
);

/**
 * @file FeaturedRestaurants.jsx
 * @description Hiển thị các nhà hàng nổi bật bằng Swiper.js. Hỗ trợ đa ngôn ngữ.
 */
const FeaturedRestaurants = () => {
  const { t } = useTranslation();
  
  // Fetch danh sách nhà hàng (Vietnamese comment)
  const { data, isLoading, isError } = useRestaurants({ limit: 20, sort: 'rating' });
  
  // 1. Chuẩn hóa dữ liệu ban đầu từ SQL (Vietnamese comment)
  const rawRestaurants = data?.data || data?.restaurants || (Array.isArray(data) ? data : []);

  // 2. Fetch Review Summary hàng loạt từ MongoDB (Vietnamese comment)
  const summaries = useQueries({
    queries: rawRestaurants.map(res => ({
      queryKey: ['reviews', 'summary', res.slug || res.id || res._id],
      queryFn: () => getRestaurantReviewSummary(res.slug || res.id || res._id),
      staleTime: 1000 * 60 * 10,
    }))
  });

  // Kiểm tra xem tất cả các queries đã xong chưa (Vietnamese comment)
  const isSummariesLoaded = summaries.every(s => s.isSuccess || s.isError);

  // 3. Lọc và Sắp xếp: Ưu tiên nhà hàng có đánh giá thật (Vietnamese comment)
  const featuredList = React.useMemo(() => {
    if (!isSummariesLoaded) return [];

    return rawRestaurants
      .map((res, index) => {
        const s = summaries[index].data?.data || summaries[index].data || {};
        const finalRating = s.averageRating || res.rating || 0;
        const finalCount = s.totalReviews || res.review_count || 0;

        return {
          ...res,
          verifiedRating: finalRating,
          verifiedCount: finalCount,
          hasRealReviews: (s.totalReviews || 0) > 0 
        };
      })
      .sort((a, b) => {
        if (a.hasRealReviews !== b.hasRealReviews) {
          return b.hasRealReviews ? 1 : -1;
        }
        return (b.verifiedRating || 0) - (a.verifiedRating || 0);
      })
      .slice(0, 6);
  }, [rawRestaurants, summaries, isSummariesLoaded]);

  if (isError) {
    return (
      <section className="py-24 max-w-7xl mx-auto px-8 w-full text-center">
        <div className="bg-red-50 text-red-600 p-8 rounded-xl border border-red-100">
          <span className="material-symbols-outlined text-4xl mb-2">error</span>
          <h3 className="text-xl font-bold">{t('home.featured.error_title')}</h3>
          <p className="mt-2">{t('home.featured.error_desc')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 max-w-7xl mx-auto px-8 w-full overflow-hidden">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-[1.75rem] font-bold text-slate-900 headline">
            {t('home.featured.title')}
          </h2>
          <p className="text-slate-500 mt-2">
            {t('home.featured.subtitle')}
          </p>
        </div>
        <Link 
          to={ROUTES.RESTAURANT_LIST || '/restaurants'} 
          className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-1 text-sm tracking-wide"
        >
          {t('home.featured.view_all')}
        </Link>
      </div>

      {/* Swiper Carousel Container (Vietnamese comment) */}
      <div className="relative -mx-4 px-4 pb-24">
        {(isLoading || !isSummariesLoaded) ? (
          <div className="flex gap-8 overflow-hidden">
             {[...Array(3)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)]">
                  <RestaurantSkeleton />
                </div>
              ))}
          </div>
        ) : featuredList.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, FreeMode]}
            spaceBetween={32}
            slidesPerView={1.2}
            grabCursor={true}
            freeMode={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="featured-swiper !overflow-visible"
          >
            {featuredList.map((restaurant) => (
              <SwiperSlide key={restaurant.id || restaurant._id || 'mock-id'} className="pb-4">
                <RestaurantCard restaurant={restaurant} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full py-20 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">restaurant</span>
            <p className="text-slate-500 text-lg">{t('home.featured.no_data')}</p>
          </div>
        )}
      </div>

    </section>
  );
};

export default FeaturedRestaurants;
