import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white border-y border-slate-100 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[1.75rem] font-bold text-slate-900">Crafting Perfect Evenings</h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">Our platform is designed to handle the details, so you can focus on the flavors.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">bolt</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">Instant Booking</h4>
            <p className="text-sm text-slate-500 leading-relaxed">No waiting for confirmation. Your table is locked in seconds.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">verified</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">Curated Selection</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Only the finest, high-rated establishments pass our curation.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">smart_toy</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">Smart Reservations</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Predictive suggestions based on your personal preferences.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">support_agent</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">AI Assistant</h4>
            <p className="text-sm text-slate-500 leading-relaxed">24/7 support to manage cancellations or special requests.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
