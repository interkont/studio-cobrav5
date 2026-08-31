import React, { useState } from 'react';
import { ProjectData } from '../../../types';
import { PROJECT_TABS } from '../../../constants';
import ProjectHeader from './ProjectHeader';
import ProjectTabs from './ProjectTabs';
import ProjectSummary from './summary/ProjectSummary';
import ProjectAdvancesView from './advances/ProjectAdvancesView';
import ProjectDocsView from './docs/ProjectDocsView';
import ProjectLogsView from './logs/ProjectLogsView';
import ProjectGalleryView from './gallery/ProjectGalleryView';
import ProjectContractsView from './contracts/ProjectContractsView';
import ProjectModifyView from './modify/ProjectModifyView';
import ProjectSubstatusView from './substatus/ProjectSubstatusView';
import ProjectFinishView from './finish/ProjectFinishView';
import ProjectParticipationView from './participation/ProjectParticipationView';
import UnderConstruction from '../main/UnderConstruction';
import { PROJECT_DICTIONARY } from '../../../constants/projects.dictionary';

interface Props {
  data: ProjectData;
}

const ProjectDetailView: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const labels = PROJECT_DICTIONARY.DETAIL;

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return <ProjectSummary data={data} />;
      case 'advances':
        return <ProjectAdvancesView data={data} />;
      case 'docs':
        return <ProjectDocsView data={data} />;
      case 'logs':
        return <ProjectLogsView data={data} />;
      case 'gallery':
        return <ProjectGalleryView data={data} />;
      case 'contracts':
        return <ProjectContractsView data={data} />;
      case 'modify':
        return <ProjectModifyView data={data} />;
      case 'substatus':
        return <ProjectSubstatusView data={data} />;
      case 'finish':
        return <ProjectFinishView data={data} />;
      case 'participation':
        return <ProjectParticipationView data={data} />;
      default:
        return (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center text-cobra-text-secondary">
             <i className="ph ph-wrench text-5xl mb-4 text-slate-300"></i>
             <h2 className="text-xl font-bold text-cobra-slate mb-2">Módulo en construcción</h2>
             <p>Esta pestaña ({activeTab}) está siendo implementada.</p>
          </div>
        );
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ProjectHeader data={data} />
      
      {/* Banner de Avance Pendiente */}
      <div className="w-full bg-amber-50 border-b border-amber-100 shrink-0">
        <div className="max-w-[1400px] mx-auto px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
             <i className="ph-fill ph-warning-circle text-amber-500 text-lg animate-pulse"></i>
             <p className="text-xs font-bold text-amber-800">
               {labels.WARNING_BANNER}
             </p>
          </div>
          <button 
            onClick={() => setActiveTab('advances')}
            className="text-[10px] font-black text-amber-700 bg-amber-100/50 hover:bg-amber-200 border border-amber-200/50 hover:border-amber-300 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 uppercase tracking-widest shrink-0"
          >
            {labels.BTN_MANAGE} <i className="ph-bold ph-arrow-right"></i>
          </button>
        </div>
      </div>

      <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default ProjectDetailView;
