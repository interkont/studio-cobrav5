
import React from 'react';
import { ContractData } from '../../../../types';

interface Props {
  data: ContractData;
}

const TimelineCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-base font-bold text-cobra-text-main mb-5 flex items-center gap-2">
        <i className="ph ph-calendar-check text-cobra-primary"></i>
        Fechas Clave
      </h3>
      
      <div className="space-y-4 relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
        
        <TimelineItem date={data.signatureDate} label="Fecha Suscripción" icon="ph-signature" color="text-blue-500" />
        <TimelineItem date={data.commencementDate} label="Fecha Acta Inicio" icon="ph-play-circle" color="text-green-500" />
        <TimelineItem date={data.endDate} label="Fecha Finalización" icon="ph-flag-checkered" color="text-red-500" isLast />
        
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[12px] font-bold text-cobra-text-secondary uppercase">Duración Total</span>
          <span className="px-3 py-1 bg-slate-100 rounded-lg text-cobra-text-main font-extrabold text-sm">
            {data.durationDays} Días
          </span>
        </div>
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{ date: string; label: string; icon: string; color: string; isLast?: boolean }> = ({ date, label, icon, color, isLast }) => (
  <div className="flex items-center gap-4 relative z-10">
    <div className={`w-8 h-8 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 shadow-sm`}>
      <i className={`ph ${icon} ${color} text-base`}></i>
    </div>
    <div className="flex flex-col">
      <span className="text-[11px] text-cobra-text-secondary font-bold uppercase tracking-tighter">{label}</span>
      <span className="text-[14px] text-cobra-text-main font-bold">{date}</span>
    </div>
  </div>
);

export default TimelineCard;
