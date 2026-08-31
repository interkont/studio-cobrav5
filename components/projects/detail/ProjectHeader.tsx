import React, { useState, useEffect } from 'react';
import { ProjectData, ProjectStatus } from '../../../types';
import { PROJECT_DICTIONARY } from '../../../constants/projects.dictionary';

interface Props {
  data: ProjectData;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ProjectHeader: React.FC<Props> = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: data.daysRemaining,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const labels = PROJECT_DICTIONARY.HEADER;

  useEffect(() => {
    // Intentamos parsear la fecha de fin (formato DD/MM/YYYY)
    const [day, month, year] = data.endDate.split('/').map(Number);
    const targetDate = new Date(year, month - 1, day).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [data.endDate]);

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.IN_PROGRESS:
        return 'bg-green-50 text-green-700 border-green-100';
      case ProjectStatus.PLANNING:
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case ProjectStatus.FINISHED:
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case ProjectStatus.SUSPENDED:
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white px-8 pt-8 shrink-0">
      <div className="flex justify-between items-start mb-6 max-w-[1400px] mx-auto w-full">
        <div>
          <div className="text-[12px] font-black uppercase text-cobra-primary tracking-widest mb-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cobra-primary animate-pulse"></span>
            {data.subdirection}
          </div>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-cobra-text-main">
              {data.title} <span className="text-cobra-text-secondary font-normal ml-1">#{data.code}</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[12px] font-black border flex items-center gap-1.5 shadow-sm ${getStatusColor(data.status)}`}>
              <i className="ph-fill ph-check-circle text-base"></i> {data.status}
            </span>
            <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[12px] font-black border border-slate-200 flex items-center gap-1.5 shadow-sm">
              <i className="ph ph-calendar-blank text-base"></i> {data.years}
            </span>
            <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[12px] font-black border border-slate-200 flex items-center gap-1.5 shadow-sm">
              <i className="ph ph-map-pin text-base"></i> {data.location}
            </span>
          </div>
        </div>

        <div className="bg-cobra-slate text-white p-5 px-7 rounded-3xl shadow-2xl flex flex-col items-end min-w-[280px] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-cobra-primary"></div>
          <div className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest flex items-center gap-2">
             {labels.TIME_REMAINING || 'TIEMPO PARA FINALIZACIÓN'} <i className="ph ph-hourglass-high animate-spin-slow"></i>
          </div>
          <div className="text-[28px] font-black tabular-nums tracking-tighter flex items-baseline gap-1">
            {timeLeft.days}<span className="text-[11px] font-bold text-slate-500 mr-1 uppercase">d</span>
            <span className="text-cobra-primary/50 animate-pulse">:</span>
            {timeLeft.hours.toString().padStart(2, '0')}<span className="text-[11px] font-bold text-slate-500 mr-1 uppercase">h</span>
            <span className="text-cobra-primary/50 animate-pulse">:</span>
            {timeLeft.minutes.toString().padStart(2, '0')}<span className="text-[11px] font-bold text-slate-500 mr-1 uppercase">m</span>
            <span className="text-cobra-primary/50 animate-pulse">:</span>
            <span className="text-cobra-primary">{timeLeft.seconds.toString().padStart(2, '0')}</span><span className="text-[11px] font-bold text-slate-500 uppercase">s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
