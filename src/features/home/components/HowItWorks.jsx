import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-8 w-full">
      <div className="text-center mb-20">
        <h2 className="text-[1.75rem] font-bold text-slate-900">The Curator's Journey</h2>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="relative space-y-4">
          <div className="w-16 h-16 bg-primary text-white rounded-full mx-auto flex items-center justify-center font-bold text-xl relative z-10 shadow-lg shadow-primary/30">1</div>
          <h5 className="font-bold text-lg text-slate-900">Find a Table</h5>
          <p className="text-sm text-slate-500">Search by cuisine, mood, or specific location.</p>
        </div>
        <div className="relative space-y-4">
          <div className="w-16 h-16 bg-primary text-white rounded-full mx-auto flex items-center justify-center font-bold text-xl relative z-10 shadow-lg shadow-primary/30">2</div>
          <h5 className="font-bold text-lg text-slate-900">Select Your Time</h5>
          <p className="text-sm text-slate-500">Real-time availability at your fingertips.</p>
        </div>
        <div className="relative space-y-4">
          <div className="w-16 h-16 bg-primary text-white rounded-full mx-auto flex items-center justify-center font-bold text-xl relative z-10 shadow-lg shadow-primary/30">3</div>
          <h5 className="font-bold text-lg text-slate-900">Confirm Booking</h5>
          <p className="text-sm text-slate-500">Instant confirmation and digital itinerary.</p>
        </div>
        <div className="relative space-y-4">
          <div className="w-16 h-16 bg-primary text-white rounded-full mx-auto flex items-center justify-center font-bold text-xl relative z-10 shadow-lg shadow-primary/30">4</div>
          <h5 className="font-bold text-lg text-slate-900">Dine &amp; Enjoy</h5>
          <p className="text-sm text-slate-500">Arrive and experience pure culinary bliss.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
