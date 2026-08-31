import React from 'react';
import { ProjectData } from '../../../../types';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';

interface Props {
  data: ProjectData;
}

const ProjectFinishView: React.FC<Props> = ({ data }) => {
  const labels = PROJECT_DICTIONARY.FINISH_VIEW;
  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Main Container */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden p-8">
        
        {/* Header Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 border-b border-slate-100 pb-8">
           <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-amber-50 rounded-[1.5rem] flex items-center justify-center text-amber-600 shadow-inner shrink-0 rotate-3">
               <i className="ph ph-flag-checkered text-4xl"></i>
             </div>
             <div>
               <h2 className="text-2xl font-black text-cobra-slate">{labels.TITLE}</h2>
               <p className="text-sm text-cobra-text-secondary mt-1">{labels.SUBTITLE}</p>
             </div>
           </div>
           
           <div className="flex bg-slate-50 border border-slate-100 rounded-2xl p-4 gap-6">
              <div className="flex flex-col text-center">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{labels.DAYS_REMAINING}</span>
                 <span className="text-2xl font-black text-amber-600">{data.daysRemaining}</span>
              </div>
           </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative hover:border-cobra-primary transition-colors cursor-pointer group shadow-sm">
                <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold group-hover:bg-cobra-primary group-hover:text-white transition-colors">1</div>
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-cobra-soft group-hover:text-cobra-primary transition-colors">
                   <i className="ph ph-file-doc text-2xl"></i>
                </div>
                <h3 className="text-sm font-bold text-cobra-slate mb-2">{labels.STEP1_TITLE}</h3>
                <p className="text-xs text-cobra-text-secondary">{labels.STEP1_DESC}</p>
                <div className="mt-4 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500">{labels.STATUS_PENDING}</div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative hover:border-cobra-primary transition-colors cursor-pointer group shadow-sm">
                <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold group-hover:bg-cobra-primary group-hover:text-white transition-colors">2</div>
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-cobra-soft group-hover:text-cobra-primary transition-colors">
                   <i className="ph ph-scales text-2xl"></i>
                </div>
                <h3 className="text-sm font-bold text-cobra-slate mb-2">{labels.STEP2_TITLE}</h3>
                <p className="text-xs text-cobra-text-secondary">{labels.STEP2_DESC}</p>
                <div className="mt-4 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500">{labels.STATUS_PENDING}</div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative hover:border-cobra-primary transition-colors cursor-pointer group shadow-sm">
                <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold group-hover:bg-cobra-primary group-hover:text-white transition-colors">3</div>
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-cobra-soft group-hover:text-cobra-primary transition-colors">
                   <i className="ph ph-stamp text-2xl"></i>
                </div>
                <h3 className="text-sm font-bold text-cobra-slate mb-2">{labels.STEP3_TITLE}</h3>
                <p className="text-xs text-cobra-text-secondary">{labels.STEP3_DESC}</p>
                <div className="mt-4 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500">{labels.STATUS_PENDING}</div>
            </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-8 flex justify-center">
            <button className="px-8 py-4 bg-cobra-slate text-white rounded-xl font-bold shadow-lg shadow-slate-300 hover:bg-slate-800 transition-all flex items-center gap-2 group">
               {labels.BTN_START} <i className="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
        </div>

      </div>

    </div>
  );
};

export default ProjectFinishView;
