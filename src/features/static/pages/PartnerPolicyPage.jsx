import React from 'react';

/**
 * @file PartnerPolicyPage.jsx
 * @description Trang Chính sách & Điều khoản dành riêng cho Đối tác (Owner).
 */
const PartnerPolicyPage = () => {
  return (
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      {/* Premium Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden bg-slate-900 rounded-[3rem] mb-16 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/40 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <span className="inline-block py-2.5 px-6 rounded-2xl bg-white/10 backdrop-blur-md text-violet-300 font-black text-[10px] tracking-[0.3em] uppercase mb-8 border border-white/10">
             Strategic Partnership Compliance
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
            Partner <span className="text-violet-400">Governance</span> & Security<span className="text-emerald-400">.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-bold text-sm uppercase tracking-widest leading-loose">
            Ensuring business integrity and data protection across the SeatNow Network.
          </p>
        </div>
      </section>

      {/* Content Layout */}
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Compliance Introduction */}
        <section className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
           <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 border border-violet-100 mb-2">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
           </div>
           <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">1. Partnership Core Principles</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                 As a SeatNow Principal Partner, you are part of a global ecosystem dedicated to culinary excellence. 
                 This policy outlines how we handle your business data and the operational standards expected of all registered restaurants.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                 {[
                    { title: 'Data Sovereignty', desc: 'You remain the primary owner of your operational restaurant metadata and menu assets.' },
                    { title: 'Operational Integrity', desc: 'Partners must strive to fulfill at least 95% of confirmed bookings to maintain Elite status.' }
                 ].map((item, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                       <h4 className="font-black text-slate-900 mb-2 uppercase text-[11px] tracking-widest">{item.title}</h4>
                       <p className="text-xs text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Data Sharing Section */}
        <section className="space-y-10 group">
           <div className="flex items-center gap-6">
              <div className="h-0.5 flex-1 bg-slate-100"></div>
              <h2 className="text-sm font-black text-slate-400 tracking-[0.3em] uppercase">Telemetry & Security</h2>
              <div className="h-0.5 flex-1 bg-slate-100"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-4 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 blur-3xl rounded-full"></div>
                 <h3 className="text-2xl font-black mb-6">GDPR & Business Privacy</h3>
                 <p className="text-xs text-slate-400 font-bold leading-loose mb-8">
                    We strictly adhere to international data protection standards. Your business telemetry is encrypted and anonymized when used for system-wide analytics.
                 </p>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-black uppercase text-emerald-400">Level 4 Protection Active</span>
                 </div>
              </div>

              <div className="md:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-inner space-y-6">
                 <h3 className="text-xl font-bold text-slate-900">2. Real-time Synchronization</h3>
                 <p className="text-slate-500 font-medium leading-relaxed">
                    By using the Owner Portal, you agree to allow SeatNow to synchronize your restaurant's booking status, table availability, and revenue data in real-time. 
                    This ensures the most accurate experience for our mutual customers.
                 </p>
                 <ul className="space-y-4">
                    {[
                       'Automated table availability reporting.',
                       'Encrypted revenue metadata processing.',
                       'Anonymized guest behavior analytics sharing.'
                    ].map((text, idx) => (
                       <li key={idx} className="flex items-center gap-4 text-xs font-bold text-slate-600">
                          <span className="material-symbols-outlined text-violet-500 text-[18px]">sync_saved_locally</span>
                          {text}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        </section>

        {/* Operational Compliance */}
        <section className="bg-violet-600 p-12 rounded-[3rem] text-white shadow-2xl shadow-violet-200 relative overflow-hidden">
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mb-48"></div>
           <div className="relative z-10 space-y-6 max-w-2xl px-4">
              <h3 className="text-3xl font-black tracking-tight">3. Strategic Compliance Measures</h3>
              <p className="text-violet-100 text-sm font-bold leading-loose">
                 Failure to comply with operational standards (e.g., persistent double bookings or inaccurate status updates) 
                 may result in temporary suspension from the SeatNow Global Discovery network. We prioritize customer trust above all.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                 <button className="bg-white text-violet-600 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                    Contact Compliance Officer
                 </button>
                 <button className="bg-violet-700 text-violet-100 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                    Operational Handbook
                 </button>
              </div>
           </div>
        </section>
      </div>

      <div className="text-center mt-20 space-y-2">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Update: April 2024</p>
         <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">© SeatNow Strategic Business Unit</p>
      </div>
    </main>
  );
};

export default PartnerPolicyPage;
