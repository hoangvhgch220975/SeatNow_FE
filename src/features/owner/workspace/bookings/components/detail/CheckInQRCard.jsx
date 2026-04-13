import React from 'react';
import { useTranslation } from 'react-i18next';
import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const CheckInQRCard = ({ booking }) => {
  const { t } = useTranslation();
  const bookingId = booking?.id || booking?.Id || booking?._id;

  return (
    <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col items-center text-center gap-6 group relative overflow-hidden h-fit">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:w-40 group-hover:h-40" />
      
      <div className="relative">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xl group-hover:scale-105 transition-transform duration-500">
          {bookingId ? (
            <QRCodeSVG 
              value={bookingId}
              size={160}
              level="H"
              includeMargin={false}
              className="w-40 h-40"
            />
          ) : (
            <div className="w-40 h-40 bg-slate-50 flex items-center justify-center text-slate-300 italic text-xs">
              No ID
            </div>
          )}
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-2 rounded-xl shadow-xl ring-4 ring-white">
          <QrCode className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">{t('workspace_booking_detail.qr.title')}</h3>
        <p className="text-xs font-bold text-slate-400 px-4 leading-relaxed">
          {t('workspace_booking_detail.qr.desc')}
        </p>
      </div>
    </section>
  );
};

export default CheckInQRCard;
