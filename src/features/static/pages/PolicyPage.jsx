import React from 'react';

/**
 * @file PolicyPage.jsx
 * @description Trang Chính sách & Điều khoản của SeatNow - Dựa trên thiết kế premium được cung cấp.
 */
const PolicyPage = () => {
  return (
    <main className="-mt-10 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden bg-surface-container-low mb-20 rounded-3xl">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="inline-block py-2 px-4 rounded-full bg-primary-container/10 text-primary font-bold text-xs tracking-widest uppercase mb-6">
            Legal & Regulations
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 headline">
            Policies & Terms
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
            Committed to bringing the most transparent and premium culinary experiences to our guests.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Sidebar Table of Contents */}
        <aside className="lg:col-span-4 self-start sticky top-32">
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
            <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              Table of Contents
            </h4>
            <nav className="space-y-1">
              {[
                { id: 'terms-of-use', label: 'Terms of Service' },
                { id: 'privacy-policy', label: 'Privacy Policy' },
                { id: 'booking-policy', label: 'Booking Policy' },
                { id: 'deposit-policy', label: 'Deposit Policy' },
                { id: 'refund-policy', label: 'Cancellation & Refund' },
                { id: 'responsibility', label: 'Liability' },
                { id: 'contact', label: 'Support Contact' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-all group shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors"></span>
                  <span className="font-bold text-sm">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-8 space-y-24 pb-32">
          
          {/* Section: Terms of Service */}
          <section className="scroll-mt-32" id="terms-of-use">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">1. Terms of Service</h2>
            <div className="text-slate-600 space-y-6 leading-relaxed">
              <p>Welcome to <strong>SeatNow</strong>. By accessing and using our services, you agree to comply with the following regulations.</p>
              <p>Our service provides a platform connecting users with premium restaurants. While we do not directly own the dining venues, we are committed to ensuring the authenticity of the information provided on our system.</p>
              <ul className="space-y-4 list-none p-0">
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary shrink-0 mt-1">check_circle</span>
                  <span>Users must be at least 18 years old or under the supervision of a legal guardian when using our services.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary shrink-0 mt-1">check_circle</span>
                  <span>Personal information provided during registration must be accurate and updated regularly.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Privacy Policy */}
          <section className="scroll-mt-32" id="privacy-policy">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">2. Privacy Policy</h2>
            <div className="p-8 bg-slate-50 rounded-3xl mb-8 border border-slate-100">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">security</span>
                Data Security Commitment
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                We use 256-bit SSL encryption technology to protect your personal information and payment data. All information collected is used solely for the purpose of booking confirmation and enhancing service quality.
              </p>
            </div>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>We are committed to not sharing your data with any third parties except for the restaurant where you perform your booking. Data includes name, phone number, email, and special dietary requests.</p>
            </div>
          </section>

          {/* Section: Booking Policy */}
          <section className="scroll-mt-32" id="booking-policy">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">3. Booking Policy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-3">Advance Booking</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We recommend booking at least 24 hours in advance for Fine Dining restaurants and 48 hours for major holidays.
                </p>
              </div>
              <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-3">Number of Guests</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  For groups of more than 10 people, please contact our customer care department for private room arrangements.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Deposit Policy */}
          <section className="scroll-mt-32" id="deposit-policy">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">4. Deposit Policy</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              To ensure the rights of both restaurants and customers, some locations require a minimum deposit.
            </p>
            <div className="bg-primary/5 p-10 rounded-3xl border-l-4 border-primary shadow-sm">
              <p className="italic text-slate-700 font-medium leading-relaxed">
                "The deposit amount will be deducted directly from your final bill at the restaurant. In case of a No-show, this amount will not be refunded."
              </p>
            </div>
          </section>

          {/* Section: Cancellation & Refund */}
          <section className="scroll-mt-32" id="refund-policy">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">5. Cancellation & Refund</h2>
            <div className="space-y-8 text-slate-600">
              {[
                { step: '01', title: 'Cancellation before 24 hours', desc: '100% refund of the deposit (excluding bank transaction fees if applicable).' },
                { step: '02', title: 'Cancellation from 12-24 hours', desc: '50% refund of the deposit.' },
                { step: '03', title: 'Cancellation under 12 hours', desc: 'No refund provided for the deposit amount.' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-6 group">
                  <span className="font-bold text-primary py-2 px-4 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Liability */}
          <section className="scroll-mt-32" id="responsibility">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">6. Liability</h2>
            <div className="text-slate-600 space-y-6 leading-relaxed text-lg font-medium">
              <p><strong>SeatNow</strong> is not responsible for claims related to food quality, direct service at the restaurant, or incidents beyond the control of the platform.</p>
              <p className="text-slate-500 text-sm italic">However, we commit to acting as an intermediary to resolve any disputes between customers and restaurants in the fairest manner possible.</p>
            </div>
          </section>

          {/* Section: Support Contact */}
          <section className="scroll-mt-32" id="contact">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-8 headline">7. Support Contact</h2>
            <div className="bg-primary p-12 rounded-[2.5rem] text-on-primary shadow-2xl shadow-primary/30 relative overflow-hidden">
               {/* Decorative background circle */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>

              <h3 className="text-3xl font-bold mb-4 relative z-10 headline">Need immediate help?</h3>
              <p className="mb-10 text-white/80 font-medium relative z-10 underline-offset-4 decoration-white/20">
                Our customer support team is available 24/7 to answer any questions regarding these terms.
              </p>
              <div className="flex flex-wrap gap-8 relative z-10">
                <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
                  <span className="material-symbols-outlined text-white">call</span>
                  <span className="font-bold text-lg tracking-tight">(0812823285)</span>
                </div>
                <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
                  <span className="material-symbols-outlined text-white">mail</span>
                  <span className="font-bold text-lg tracking-tight">hoangvhgch220975@fpt.edu.vn</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PolicyPage;
