import React, { useState } from 'react';
import { ProjectData } from '../../../../types';
import { ProjectsService } from '../../../../services/projects.service';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';
import AdvanceReportDetail from './report/AdvanceReportDetail';

interface Props {
  data: ProjectData;
}

const ProjectAdvancesView: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'physical' | 'financial'>('physical');
  const [isReporting, setIsReporting] = useState(false);
  const labels = PROJECT_DICTIONARY.ADVANCES;
  const history = ProjectsService.getProjectAdvancesHistory().filter(h => h.type === activeTab);

  if (isReporting) {
    return <AdvanceReportDetail onClose={() => setIsReporting(false)} />;
  }

  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1400px] w-full mx-auto relative animate-in fade-in duration-500">
      
      {/* Bento KPIs Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard 
          label={activeTab === 'physical' ? labels.TOTAL_ACTIVITIES : labels.TOTAL_BUDGET}
          value={activeTab === 'physical' ? '12 Act.' : '$18.433M'} 
          icon={activeTab === 'physical' ? 'ph-target' : 'ph-bank'}
          color="text-cobra-slate"
          trend={labels.TREND_COMMITTED}
        />
        <KPICard 
          label={labels.EXECUTED}
          value={activeTab === 'physical' ? `${data.physicalProgress}%` : '$1.250M'} 
          icon="ph-check-circle" 
          color="text-emerald-600"
          trend={labels.TREND_TO_DATE}
          progress={data.physicalProgress}
        />
        <KPICard 
          label={labels.PENDING}
          value={activeTab === 'physical' ? `${100 - data.physicalProgress}%` : '$17.183M'} 
          icon="ph-clock" 
          color="text-amber-500"
          trend={labels.TREND_TO_COMPLETE}
        />
      </div>
      
      {/* Main Content Card */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-4">
        <div className="px-8 pt-8 pb-0 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-50">
          <div className="flex gap-8">
            <TabButton active={activeTab === 'physical'} label={labels.TITLE_PHYSICAL} icon="ph-gauge" count={8} onClick={() => setActiveTab('physical')} />
            <TabButton active={activeTab === 'financial'} label={labels.TITLE_FINANCIAL} icon="ph-currency-dollar" count={3} onClick={() => setActiveTab('financial')} />
          </div>
          
          <div className="pb-4">
            <button 
              onClick={() => setIsReporting(true)}
              className="px-6 py-3 bg-cobra-primary text-white rounded-2xl text-xs font-black shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <i className="ph-bold ph-plus text-lg"></i> {labels.BTN_REGISTER}
            </button>
          </div>
        </div>

        <div className="px-8 py-4 bg-slate-50/30 flex justify-between items-center border-b border-slate-100">
          <div className="relative w-full max-w-md">
            <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder={labels.SEARCH_PLACEHOLDER}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 focus:border-cobra-primary focus:ring-4 focus:ring-red-50 outline-none text-sm transition-all shadow-sm font-medium"
            />
          </div>
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest hidden md:block italic">
            {activeTab === 'physical' ? labels.SHOWING_HISTORY_PHYSICAL : labels.SHOWING_HISTORY_FINANCIAL}
          </div>
        </div>

        <div className="overflow-x-auto min-h-[450px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-4 w-16 text-center"><i className="ph ph-calendar text-lg"></i></th>
                <th className="px-8 py-4">{labels.COL_PERIOD}</th>
                <th className="px-8 py-4">{labels.COL_VALUE}</th>
                <th className="px-8 py-4">{labels.COL_AUTHOR}</th>
                <th className="px-8 py-4 text-center">{labels.COL_STATUS}</th>
                <th className="px-8 py-4 text-right">{labels.COL_OPTIONS}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {history.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-8 py-5">
                    <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                      <i className="ph ph-file-text text-xl"></i>
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-[13px] font-bold text-cobra-text-main">{item.period}</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{item.subtitle}</div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[14px] font-black text-emerald-600 tabular-nums">
                      {item.value}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-500">
                    <div className="flex items-center gap-2 text-[12px] font-bold">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-black">{item.authorInitials}</div>
                      {item.author}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-tight inline-block ${
                      item.isApproved 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => setIsReporting(true)}
                      className="text-xs font-black text-cobra-primary hover:text-red-700 transition-colors"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const KPICard: React.FC<{ label: string; value: string; icon: string; color: string; trend: string; progress?: number }> = ({ label, value, icon, color, trend, progress }) => (
  <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        <i className={`ph ${icon} text-2xl`}></i>
      </div>
      {progress !== undefined && (
        <div className="text-right">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{PROJECT_DICTIONARY.ADVANCES.PROGRESS_LABEL}</span>
           <span className="text-xs font-black text-emerald-600">{progress}%</span>
        </div>
      )}
    </div>
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</h4>
    <p className="text-xl font-black text-cobra-text-main tabular-nums leading-none mb-3">{value}</p>
    <div className="flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
      <span className="text-[10px] font-bold text-slate-500">{trend}</span>
    </div>
  </div>
);

const TabButton: React.FC<{ active: boolean; label: string; icon: string; count: number; onClick: () => void }> = ({ active, label, icon, count, onClick }) => (
  <button 
    onClick={onClick}
    className={`pb-4 px-2 text-[13px] font-black uppercase tracking-tight flex items-center gap-2 border-b-2 transition-all ${active ? 'border-cobra-primary text-cobra-primary' : 'border-transparent text-slate-400 hover:text-cobra-text-main'}`}
  >
    <i className={`ph ${icon} ${active ? 'text-cobra-primary font-bold' : 'text-slate-300'}`}></i>
    {label}
    <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-red-50 text-cobra-primary' : 'bg-slate-100 text-slate-400'}`}>{count}</span>
  </button>
);

export default ProjectAdvancesView;
