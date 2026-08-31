
import React, { useState } from 'react';
import Sidebar from './components/main/Sidebar';
import TopBar from './components/main/TopBar';
import ContractHeader from './components/contracts/detail/ContractHeader';
import NavigationTabs from './components/contracts/detail/NavigationTabs';
import GeneralInfoCard from './components/contracts/detail/summary/GeneralInfoCard';
import TimelineCard from './components/contracts/detail/summary/TimelineCard';
import ProjectsTable from './components/contracts/detail/summary/ProjectsTable';
import EntitiesCard from './components/contracts/detail/summary/EntitiesCard';
import InsurancePoliciesCard from './components/contracts/detail/summary/InsurancePoliciesCard';
import HistoryModificationsCard from './components/contracts/detail/summary/HistoryModificationsCard';
import DocumentationView from './components/contracts/detail/documentation/DocumentationView';
import FinanceView from './components/contracts/detail/finance/FinanceView';
import ChangeManagementView from './components/contracts/detail/change-management/ChangeManagementView';
import ConfigurationView from './components/contracts/detail/configuration/ConfigurationView';
import SeguimientoView from './components/contracts/detail/tracking/SeguimientoView';
import SupervisorsView from './components/contracts/detail/supervisors/SupervisorsView';
import UnderConstruction from './components/main/UnderConstruction';
import ContractsListView from './components/contracts/ContractsListView';
import ProjectsListView from './components/projects/ProjectsListView';
import ProjectDetailView from './components/projects/detail/ProjectDetailView';
import { MOCK_CONTRACT, ASSOCIATED_PROJECTS, ENTITIES, MOCK_POLICIES, CONTRACT_HISTORY, CONTRACT_MODIFICATIONS, MOCK_PROJECT_DETAIL } from './constants';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'contracts' | 'projects'>('contracts');
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [activeTab, setActiveTab] = useState('summary');
  const principalEntity = ENTITIES.find(e => e.role === 'Principal');

  const handleSelectContract = (id: string) => {
    setCurrentView('detail');
    setActiveTab('summary');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'docs':
        return <DocumentationView />;
      case 'finance':
        return <FinanceView />;
      case 'history':
        return <ChangeManagementView />;
      case 'bitacora':
        return (
          <UnderConstruction 
            title="Bitácora de Eventos" 
            icon="ph-notebook" 
            description="Libro de anotaciones para el registro de hechos relevantes y trazabilidad diaria de la ejecución contractual." 
          />
        );
      case 'seguimiento':
        return <SeguimientoView />;
      case 'supervisores':
        return <SupervisorsView />;
      case 'config':
        return <ConfigurationView />;
      case 'summary':
      default:
        return (
          <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-8">
            <div className="w-full">
              <GeneralInfoCard data={MOCK_CONTRACT} principalEntity={principalEntity} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-6">
                <TimelineCard data={MOCK_CONTRACT} />
              </div>
              <div className="xl:col-span-6">
                <EntitiesCard entities={ENTITIES} />
              </div>
            </div>

            <div className="w-full">
              <InsurancePoliciesCard 
                policies={MOCK_POLICIES} 
                onNavigateToManagement={() => alert('Próximamente: Módulo completo de Gestión de Pólizas')} 
              />
            </div>

            <div className="w-full">
              <ProjectsTable projects={ASSOCIATED_PROJECTS} />
            </div>

            <div className="w-full">
              <HistoryModificationsCard 
                history={CONTRACT_HISTORY} 
                modifications={CONTRACT_MODIFICATIONS} 
              />
            </div>

            <div className="w-full">
              <div className="bg-white rounded-3xl p-8 border border-amber-100 flex flex-col md:flex-row items-center justify-between group shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:rotate-12 transition-transform shadow-inner shrink-0">
                    <i className="ph ph-hourglass-medium text-3xl"></i>
                  </div>
                  <div>
                    <h3 className="text-[12px] font-black text-amber-700 uppercase tracking-widest mb-1">Cierre y Liquidación</h3>
                    <div className="text-4xl font-black text-amber-900 tabular-nums tracking-tighter">00:00:00:00</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                      <span className="text-xs text-amber-600 font-bold uppercase tracking-tight">Estado: Contrato en Etapa de Ejecución Activa</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 md:mt-0 flex gap-3">
                   <button 
                     onClick={() => setActiveTab('history')}
                     className="px-6 py-3 bg-amber-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-all flex items-center gap-2"
                   >
                     <i className="ph ph-play-fill"></i> Iniciar Trámite de Cierre
                   </button>
                   <button className="px-6 py-3 bg-white border border-amber-200 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-50 transition-all">
                     Paz y Salvos
                   </button>
                </div>
              </div>
            </div>
            
            <div className="h-12"></div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar 
        onNavigateToContracts={() => { setCurrentModule('contracts'); setCurrentView('list'); }} 
        onNavigateToProjects={() => { setCurrentModule('projects'); setCurrentView('list'); }}
        currentModule={currentModule}
        currentView={currentView} 
      />
      
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-cobra-bg-body relative scroll-smooth">
        <TopBar />
        
        {currentModule === 'contracts' ? (
          currentView === 'list' ? (
            <ContractsListView onSelectContract={handleSelectContract} />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="px-8 pt-6 pb-2 max-w-[1400px] w-full mx-auto">
                <button 
                  onClick={handleBackToList}
                  className="flex items-center gap-2 text-sm font-bold text-cobra-text-secondary hover:text-cobra-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-cobra-primary group-hover:bg-cobra-soft transition-all">
                    <i className="ph ph-arrow-left text-lg"></i>
                  </div>
                  Volver a la lista de contratos
                </button>
              </div>
              <ContractHeader data={MOCK_CONTRACT} />
              <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
              
              {renderContent()}
            </div>
          )
        ) : (
          currentView === 'list' ? (
            <ProjectsListView onSelectProject={handleSelectContract} />
          ) : (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="px-8 pt-6 pb-2 max-w-[1400px] w-full mx-auto">
                <button 
                  onClick={handleBackToList}
                  className="flex items-center gap-2 text-sm font-bold text-cobra-text-secondary hover:text-cobra-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-cobra-primary group-hover:bg-cobra-soft transition-all">
                    <i className="ph ph-arrow-left text-lg"></i>
                  </div>
                  Volver a la lista
                </button>
              </div>
              <ProjectDetailView data={MOCK_PROJECT_DETAIL} />
             </div>
          )
        )}

        <div className="fixed bottom-8 right-8 w-14 h-14 bg-cobra-slate text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all z-50 ring-4 ring-white group">
           <i className="ph ph-chats-teardrop text-2xl"></i>
           <div className="absolute top-0 right-0 w-4 h-4 bg-cobra-primary rounded-full border-2 border-white group-hover:animate-ping"></div>
        </div>
      </main>
    </div>
  );
};

export default App;
