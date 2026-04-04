import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

/**
 * @file ContactPage.jsx
 * @description Trang Liên hệ của SeatNow - Tích hợp gửi mail thực tế qua EmailJS.
 */
const ContactPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check required fields
    if (!formData.from_name || !formData.from_email || !formData.message) {
      toast.error('Please fill in all required fields: Name, Email, and Message!');
      return;
    }

    // Phone validation (Vietnamese format)
    const phoneRegex = /^(0|84|\+84)[35789][0-9]{8}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Invalid phone number format! Please use a valid Vietnamese number (e.g., 0912345678).');
      return;
    }

    setIsSending(true);
    const loadingToast = toast.loading('Sending your inquiry...');

    try {
      // Thông tin EmailJS từ ảnh bạn cung cấp
      const SERVICE_ID = 'service_7dl0kgf';
      const PUBLIC_KEY = 'mZjiHRIYclaK14awO';
      const TEMPLATE_ID = 'template_ajm6je2';

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        formData,
        PUBLIC_KEY
      );

      if (response.status === 200) {
        toast.success('Your inquiry has been sent successfully!', { id: loadingToast });
        setFormData({
          from_name: '',
          from_email: '',
          phone: '',
          subject: 'General Inquiry',
          message: ''
        });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send email. Please try again later.', { id: loadingToast });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen hero-gradient selection:bg-primary/10">
      {/* Hero Header */}
      <section className="max-w-screen-xl mx-auto px-8 mb-20 text-center md:text-left pt-2">
        <h1 className="text-5xl md:text-7xl font-bold text-on-surface mb-6 tracking-tight leading-tight headline uppercase">
          Contact Our Concierge
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-medium">
          Whether you're seeking a specific table for your dinner or need assistance navigating our collection of premium restaurant partners, our dedicated team is here to orchestrate your perfect dining experience.
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-screen-xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-28">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-10 md:p-14 rounded-3xl shadow-[0_20px_40px_-15px_rgba(99,14,212,0.04)] border border-slate-50">
          <h2 className="text-3xl font-bold text-on-surface mb-8 headline">Send an Inquiry</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                <input 
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-slate-300 transition-all outline-none font-bold" 
                  placeholder="Julianne Smith" 
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                <input 
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-slate-300 transition-all outline-none font-bold" 
                  placeholder="julianne@example.com" 
                  type="email"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                <input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-slate-300 transition-all outline-none font-bold" 
                  placeholder="(081) 282-3285" 
                  type="tel"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Subject</label>
                <div className="relative">
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface appearance-none transition-all outline-none font-bold cursor-pointer pr-12"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Group Reservation">Group Reservation</option>
                    <option value="Corporate Events">Corporate Events</option>
                    <option value="Partnership Proposal">Partnership Proposal</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-slate-300 transition-all outline-none font-bold resize-none" 
                placeholder="How can our concierge assist you today?" 
                rows="5"
                required
              ></textarea>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSending}
                className={`bg-primary text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-primary-600 transition-all shadow-xl shadow-primary/20 active:scale-95 duration-150 flex items-center gap-3 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Contact Info & Map */}
        <div className="lg:col-span-5 space-y-10">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            {/* Hotline */}
            <div className="flex items-start gap-6 p-6 rounded-3xl bg-white border border-slate-50 hover:bg-slate-50 transition-colors group shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Hotline</p>
                <p className="text-xl font-bold text-on-surface">(+0812823285)</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-6 p-6 rounded-3xl bg-white border border-slate-50 hover:bg-slate-50 transition-colors group shadow-sm text-wrap">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Email</p>
                <p className="text-sm md:text-base font-bold text-on-surface break-words">hoangvhgch220975@fpt.edu.vn</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-6 p-6 rounded-3xl bg-white border border-slate-50 hover:bg-slate-50 transition-colors group shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Address</p>
                <p className="text-base font-bold text-on-surface">No 2 Pham Van Bach, Cau Giay, Ha Noi</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-6 p-6 rounded-3xl bg-white border border-slate-50 hover:bg-slate-50 transition-colors group shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Support Hours</p>
                <div className="text-sm font-bold text-on-surface">
                   <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                   <p>Sat: 8:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Graphic (Real Google Map) */}
          <div className="relative h-80 w-full rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-slate-200/50 p-3 border border-slate-100">
             <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.219920290671!2d105.7876374108942!3d21.02388468786508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba5c2abd13f%3A0xdf77997a38a7dba3!2zMiBQLiBQaOG6oW0gVsSDbiBC4bqhY2gsIFnDqm4gSMOyYSwgSMOgIE7hu5lpIDEwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1775202701999!5m2!1svi!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SeatNow Location"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold tracking-widest shadow-lg border border-white/20">
                   GLOBAL HQ: HA NOI
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-28 rounded-t-[4rem]">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">Common Inquiries</p>
              <h2 className="text-4xl font-bold text-on-surface headline">Frequently Asked Questions</h2>
            </div>
            <a className="text-primary font-bold text-xs border-b-2 border-primary/20 hover:border-primary transition-all pb-1 uppercase tracking-widest mb-2" href="#">
              View Full Help Center
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { q: 'How to modify a booking?', a: 'You can adjust your reservation details up to 24 hours prior via the "Booking Lookup" dashboard or by contacting your concierge.' },
              { q: 'Is there a booking fee?', a: 'SeatNow provides complimentary curation for standard bookings. Exclusive tasting events may require a deposit.' },
              { q: 'Group reservations?', a: 'For parties of 8 or more, please use our concierge inquiry form above to ensure seamless seating and customized menu options.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all group">
                <h3 className="text-lg font-bold mb-4 text-on-surface group-hover:text-primary transition-colors">{item.q}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
