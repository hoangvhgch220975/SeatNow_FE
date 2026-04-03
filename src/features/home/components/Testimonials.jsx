import React from 'react';
import rv1 from '../../../assets/images/reviews/rv1.png';
import rv2 from '../../../assets/images/reviews/rv2.png';

const Testimonials = () => {
  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-100 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Testimonials</span>
            <h2 className="text-[3rem] font-bold text-slate-900 mt-4 leading-tight">Shared Stories of Excellence</h2>
            <div className="mt-12 space-y-12">
              <div className="relative pl-12">
                <span className="material-symbols-outlined absolute left-0 top-0 text-primary/40 text-4xl">format_quote</span>
                <p className="text-xl text-slate-800 italic leading-relaxed">
                  "The Curator transforms dining from a chore into an event. The interface is as refined as the restaurants they list."
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                    <img className="w-full h-full object-cover" alt="Portrait of a male gourmet food critic" src={rv1}/>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Julian Vercetti</p>
                    <p className="text-sm text-slate-500">Food Enthusiast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img className="rounded-xl w-full h-64 object-cover mt-12 shadow" alt="Close up of artistic food plating" src={rv1}/>
              <img className="rounded-xl w-full h-80 object-cover shadow" alt="High end restaurant dining room at dusk" src={rv2}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
