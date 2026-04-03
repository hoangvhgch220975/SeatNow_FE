import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../../config/routes.js';
import bannerImg from '../../../assets/images/banners/banner.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-[870px] flex items-center overflow-hidden px-8 -mt-20">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover brightness-[0.85]" 
          alt="Luxury fine dining restaurant interior with ambient lighting" 
          src={bannerImg}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-60"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
        <div className="max-w-2xl">
          <h1 className="text-[3.5rem] font-bold leading-[1.1] text-white mb-6 tracking-tight">
            Experience the <span className="text-primary-300 italic text-violet-300">Art</span> of Dining
          </h1>
          <p className="text-lg text-slate-200 mb-10 leading-relaxed font-body">
            Seamless reservations at the world's most coveted culinary destinations. Your journey into the extraordinary begins with a single click.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to={ROUTES.RESTAURANT_LIST || '/restaurants'}
              className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20 inline-block"
            >
              Book Now
            </Link>
            <Link 
              to={ROUTES.RESTAURANT_LIST || '/restaurants'}
              className="group flex items-center gap-2 text-slate-900 font-bold text-lg px-8 py-4 bg-white/90 backdrop-blur-md rounded-lg hover:bg-white transition-all inline-flex"
            >
              Explore Restaurants
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
