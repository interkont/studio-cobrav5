import React, { useState } from 'react';
import { ProjectData } from '../../../../types';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';

interface Props {
  data: ProjectData;
}

const ProjectModifyView: React.FC<Props> = ({ data }) => {
  const [selectedModType, setSelectedModType] = useState<string>('');
  const labels = PROJECT_DICTIONARY.MODIFY_VIEW;

  const handleStartModification = () => {
    // Add logic here later
    alert('Iniciando trámite: ' + selectedModType);
  };

  return (
    <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-10 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-cobra-text-main flex items-center gap-3">
          <i className="ph ph-pencil-circle text-cobra-primary text-3xl"></i>
          {labels.TITLE}
        </h2>
        <p className="text-sm text-cobra-text-secondary font-medium italic">{labels.SUBTITLE}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`bg-white rounded-[2.5rem] p-10 border transition-all relative overflow-hidden ${selectedModType ? 'border-indigo-600 shadow-2xl scale-[1.02] z-10' : 'border-slate-200 shadow-sm opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'}`}>
           <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${selectedModType ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
           <div className="flex items-center gap-4 mb-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${selectedModType ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-300'}`}>
                <i className="ph ph-stack-overflow text-4xl"></i>
              </div>
              <div>
                <h3 className={`text-xl font-black ${selectedModType ? 'text-cobra-text-main' : 'text-slate-400'}`}>{labels.BOX_TITLE}</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{labels.BOX_SUBTITLE}</p>
              </div>
           </div>
           
           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">{labels.LABEL_TYPE}</label>
                <select 
                  className={`w-full px-6 py-4 rounded-2xl border text-sm font-bold outline-none transition-all cursor-pointer ${selectedModType ? 'bg-white border-indigo-200' : 'bg-slate-50 border-slate-100'}`}
                  value={selectedModType}
                  onChange={(e) => setSelectedModType(e.target.value)}
                >
                  <option value="">{labels.OPTION_DEFAULT}</option>
                  <option value="prorroga">{labels.OPTION_TIME}</option>
                  <option value="adicion">{labels.OPTION_BUDGET}</option>
                  <option value="otrosi">{labels.OPTION_OTHER}</option>
                  <option value="suspension">{labels.OPTION_SUSPEND}</option>
                  <option value="otros">{labels.OPTION_MISC}</option>
                </select>
              </div>
              
              {selectedModType && (
                <button 
                  onClick={handleStartModification}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all animate-in slide-in-from-top-2 flex items-center justify-center gap-2"
                >
                  {labels.BTN_START} <i className="ph ph-arrow-right"></i>
                </button>
              )}
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mt-2">
        <div className="p-8 border-b border-slate-100 bg-slate-50/30">
          <h3 className="text-lg font-black text-cobra-text-main flex items-center gap-2">
            <i className="ph ph-clock-counter-clockwise text-cobra-primary"></i>
            {labels.HISTORY_TITLE}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-10 py-5">{labels.COL_DATE}</th>
                <th className="px-10 py-5">{labels.COL_PROCEDURE}</th>
                <th className="px-10 py-5">{labels.COL_OBSERVATIONS}</th>
                <th className="px-10 py-5 text-right">{labels.COL_VIEW}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
               <tr>
                 <td colSpan={4} className="px-10 py-8 text-center text-slate-400 font-medium italic">{labels.EMPTY_HISTORY}</td>
               </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectModifyView;
