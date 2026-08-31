import React from 'react';
import { ProjectData } from '../../../../types';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';

interface Props {
  data: ProjectData;
}

const ProjectParticipationView: React.FC<Props> = ({ data }) => {
  const labels = PROJECT_DICTIONARY.PARTICIPATION_VIEW;
  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header Info */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden p-8 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
               <i className="ph ph-users-three text-3xl"></i>
            </div>
            <div>
               <h2 className="text-xl font-black text-cobra-slate">{labels.TITLE}</h2>
               <p className="text-sm text-cobra-text-secondary mt-1">{labels.SUBTITLE}</p>
            </div>
         </div>
         <button className="px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all flex items-center gap-2">
            <i className="ph ph-plus text-lg"></i> {labels.BTN_REGISTER}
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Summary Cards */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-teal-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{labels.KPI_COMMITTEES}</span>
            <span className="text-3xl font-black text-teal-600">0</span>
         </div>
         
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-red-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{labels.KPI_PQRS}</span>
            <span className="text-3xl font-black text-red-600">0</span>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{labels.KPI_AUDITS}</span>
            <span className="text-3xl font-black text-blue-600">0</span>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="flex border-b border-slate-200 bg-slate-50/50">
             <button className="px-8 py-4 text-sm font-bold border-b-2 border-cobra-primary text-cobra-primary">
                {labels.TAB_COMMITTEES}
             </button>
             <button className="px-8 py-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-cobra-slate">
                {labels.TAB_AUDITS}
             </button>
             <button className="px-8 py-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-cobra-slate">
                {labels.TAB_PQRS}
             </button>
          </div>
          
          <div className="p-8 text-center py-16 bg-white">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 shadow-sm border border-slate-100 mx-auto mb-4">
               <i className="ph ph-users text-3xl"></i>
             </div>
             <h3 className="text-sm font-bold text-cobra-slate mb-1">{labels.EMPTY_TITLE}</h3>
             <p className="text-xs text-slate-400">{labels.EMPTY_DESC}</p>
          </div>
      </div>

    </div>
  );
};

export default ProjectParticipationView;
