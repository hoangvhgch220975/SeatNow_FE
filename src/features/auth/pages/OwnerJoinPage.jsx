import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../../config/routes.js';

/**
 * @file OwnerJoinPage.jsx
 * @description Trang giới thiệu dành cho chủ nhà hàng muốn tham gia hệ thống SeatNow.
 * Thiết kế phong cách Landing Page cao cấp, không chứa logic nghiệp vụ phức tạp.
 */
const OwnerJoinPage = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/10">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[50%] bg-blue-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <Link 
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12 font-bold group"
            >
              <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
              Back to Home
            </Link>
            
            <h1 className="text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Empower Your Restaurant with <span className="text-primary">SeatNow</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-12 font-medium">
              Join the most advanced restaurant management network. From smart table booking to real-time revenue tracking, we provide everything you need to grow your business.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button className="px-10 py-5 bg-primary text-white rounded-2xl font-bold shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all">
                Submit Interest
              </button>
              <button className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Download PDF Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: 'trending_up',
                title: 'Maximize Revenue',
                desc: 'Optimize your table turnover and reduce no-shows with our intelligent booking system.'
              },
              {
                icon: 'analytics',
                title: 'Smart Insights',
                desc: 'Get detailed reports on customer behavior, peak hours, and financial performance.'
              },
              {
                icon: 'hub',
                title: 'Global Exposure',
                desc: 'Connect with thousands of diners in your city. Get discovered by the right audience.'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all border border-slate-100 group">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder Contact Section */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Ready to start?</h2>
          <p className="text-slate-500 text-lg mb-10 font-medium">
            Our registration portal is currently in limited beta. Click below to leave your contact details and our team will get back to you within 24 hours.
          </p>
          <div className="inline-block p-1 bg-slate-100 rounded-2xl">
            <button className="px-12 py-5 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20">
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer Identity */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
          SeatNow Business Solutions &copy; 2026
        </span>
      </footer>
    </div>
  );
};

export default OwnerJoinPage;
