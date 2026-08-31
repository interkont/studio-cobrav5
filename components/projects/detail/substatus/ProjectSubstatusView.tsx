import React from 'react';
import { ProjectData } from '../../../../types';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';

interface Props {
  data: ProjectData;
}

const ProjectSubstatusView: React.FC<Props> = ({ data }) => {
  const labels = PROJECT_DICTIONARY.SUBSTATUS_VIEW;
  return (
    <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-10 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-cobra-text-main flex items-center gap-3">
          <i className="ph ph-arrows-left-right text-cobra-primary text-3xl"></i>
          {labels.TITLE}
        </h2>
        <p className="text-sm text-cobra-text-secondary font-medium italic">{labels.SUBTITLE}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Current Substatus */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] -mr-8 -mt-8"></div>
           <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 block">{labels.CURRENT_SUBSTATUS}</span>
           <div className="flex flex-col gap-2">
             <div className="flex items-center gap-3">
               <i className="ph ph-info text-blue-500 text-2xl"></i>
               <span className="text-xl font-black text-cobra-slate">{data.substatus}</span>
             </div>
           </div>
        </div>

        {/* Change Action Form */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-indigo-600 shadow-2xl relative overflow-hidden scale-[1.02] z-10">
           <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
           
           <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600">
                <i className="ph ph-plus text-3xl font-bold"></i>
              </div>
              <div>
                <h3 className="text-xl font-black text-cobra-text-main">{labels.REGISTER_TITLE}</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{labels.REGISTER_SUBTITLE}</p>
              </div>
           </div>

           <div className="space-y-4 mt-8">
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                 {labels.BTN_START} <i className="ph ph-arrow-right"></i>
              </button>
           </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mt-2">
          <div className="p-8 border-b border-slate-100 bg-slate-50/30">
            <h3 className="text-lg font-black text-cobra-text-main flex items-center gap-2">
              <i className="ph ph-clock-counter-clockwise text-cobra-primary"></i>
              {labels.HISTORY_TITLE}
            </h3>
          </div>
          
          <div className="p-8 text-center py-16 bg-white">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 shadow-sm border border-slate-100 mx-auto mb-4">
               <i className="ph ph-history text-3xl"></i>
             </div>
             <h3 className="text-sm font-bold text-cobra-slate mb-1">{labels.EMPTY_TITLE}</h3>
             <p className="text-xs text-slate-400">{labels.EMPTY_DESC}</p>
          </div>
      </div>

    </div>
  );
};

export default ProjectSubstatusView;
