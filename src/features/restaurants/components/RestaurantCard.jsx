import { Link } from 'react-router';
import { ROUTES } from '../../../config/routes.js';
import { slugify } from '../../../shared/utils/slugify.js';

const RestaurantCard = ({ restaurant }) => {
  // Chuẩn hóa dữ liệu từ API
  const id = restaurant.id || restaurant._id || 'mock-id';
  const imageUrl = restaurant.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop';
  const rating = restaurant.ratingAvg ? Number(restaurant.ratingAvg).toFixed(1) : 'N/A';
  const address = restaurant.address || restaurant.location || 'Vietnam';
  const cuisine = (restaurant.cuisineTypes && restaurant.cuisineTypes[0]) || restaurant.cuisine || 'Cuisine';
  const priceDisplay = '$'.repeat(restaurant.priceRange || restaurant.priceLevel?.length || 2);

  // Ưu tiên slug cho URL, fallback về ID
  const urlParam = restaurant.slug || slugify(restaurant.name) || id;

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-[0_40px_60px_-15px_rgba(99,14,212,0.08)] transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 relative">
      {/* Toàn bộ thẻ là Link ngoại trừ nút Book Now */}
      <Link to={ROUTES.RESTAURANT_DETAIL(urlParam)} className="absolute inset-0 z-10" aria-label={`View details for ${restaurant.name}`} />
      
      <div className="relative h-72 overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={imageUrl} 
          alt={restaurant.name} 
        />
        {restaurant.featured && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
              Featured Selection
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm z-20">
          <span className="material-symbols-outlined text-sm text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-xs font-bold text-slate-900">{rating}</span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h3 className="text-2xl font-bold font-headline text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <p className="text-sm text-slate-500 mt-2 flex items-center">
              <span className="material-symbols-outlined text-sm mr-1">location_on</span>
              <span className="line-clamp-1">{address}</span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-primary font-bold text-lg">{priceDisplay}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {cuisine}
          </span>
        </div>

        <div className="pt-6 mt-auto flex gap-4 relative z-20">
          <div className="flex-1 px-4 py-3 rounded-full border border-slate-200 text-sm font-bold hover:bg-slate-50 transition-all text-slate-700 text-center">
            View Details
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Logic Book Now sẽ thêm sau
            }}
            className="flex-1 px-4 py-3 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
