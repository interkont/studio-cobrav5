import React, { useState } from 'react';
import { ProjectStatus } from '../../types';
import { MOCK_PROJECT_DETAIL } from '../../constants';

interface Props {
  onSelectProject: (id: string) => void;
}

const mockProjects = [
  MOCK_PROJECT_DETAIL,
  {
    ...MOCK_PROJECT_DETAIL,
    id: 'PRJ-2026-02',
    code: 'ID: 11',
    title: 'Ampliación red de fibra óptica sector centro',
    status: ProjectStatus.PLANNING,
    physicalProgress: 0,
    plannedPhysicalProgress: 10,
    associatedContracts: []
  },
  {
    ...MOCK_PROJECT_DETAIL,
    id: 'PRJ-2026-03',
    code: 'ID: 12',
    title: 'Mantenimiento integral servidores core',
    status: ProjectStatus.FINISHED,
    physicalProgress: 100,
    plannedPhysicalProgress: 100,
  }
];

const ProjectsListView: React.FC<Props> = ({ onSelectProject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('2026');

  const getStatusColor = (status: ProjectStatus) => {
    switch(status) {
      case ProjectStatus.IN_PROGRESS: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case ProjectStatus.PLANNING: return 'bg-amber-50 text-amber-700 border-amber-200';
      case ProjectStatus.FINISHED: return 'bg-blue-50 text-blue-700 border-blue-200';
      case ProjectStatus.SUSPENDED: return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusDotColor = (status: ProjectStatus) => {
    switch(status) {
      case ProjectStatus.IN_PROGRESS: return 'bg-emerald-500';
      case ProjectStatus.PLANNING: return 'bg-amber-500';
      case ProjectStatus.FINISHED: return 'bg-blue-500';
      case ProjectStatus.SUSPENDED: return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header & Global Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-cobra-slate leading-tight">Portafolio de Proyectos</h1>
            <p className="text-cobra-text-secondary text-sm mt-1">Gestión integral y seguimiento de la ejecución de proyectos institucionales.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1 flex items-center">
                <span className="text-xs font-bold text-cobra-text-secondary px-3 uppercase tracking-wider">Vigencia</span>
                <select 
                  className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold text-cobra-slate focus:outline-none focus:ring-2 focus:ring-cobra-primary/20 cursor-pointer"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
             </div>
          </div>
        </div>

        {/* Global KPIs (Filtered by Year) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-cobra-primary/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <span className="text-sm font-bold text-cobra-text-secondary mb-1">Total Proyectos ({yearFilter})</span>
              <span className="text-3xl font-black text-cobra-slate">3</span>
           </div>
           
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <span className="text-sm font-bold text-cobra-text-secondary mb-1">En Ejecución</span>
              <span className="text-3xl font-black text-emerald-600">1</span>
           </div>

           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <span className="text-sm font-bold text-cobra-text-secondary mb-1">En Planeación</span>
              <span className="text-3xl font-black text-amber-600">1</span>
           </div>
           
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <span className="text-sm font-bold text-cobra-text-secondary mb-1">Inversión Total</span>
              <span className="text-2xl font-black text-cobra-slate mt-1">$18,433.08 <span className="text-sm font-bold text-slate-400">Millones</span></span>
           </div>
        </div>

        {/* List Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          {/* List Toolbar */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="relative w-full sm:w-[400px]">
                <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                <input 
                  type="text" 
                  placeholder="Buscar por código, nombre o supervisor..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cobra-primary focus:ring-1 focus:ring-cobra-primary transition-all placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             
             <div className="flex gap-2 w-full sm:w-auto">
               <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 text-cobra-slate rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                 <i className="ph ph-funnel"></i> Filtros
               </button>
               <button className="flex-1 sm:flex-none px-4 py-2.5 bg-cobra-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-cobra-primary/20 hover:bg-cobra-primary-hover transition-all flex items-center justify-center gap-2">
                 <i className="ph ph-plus"></i> Nuevo Proyecto
               </button>
             </div>
          </div>

          {/* Table-like List */}
          <div className="flex-1 overflow-x-auto">
             <div className="min-w-[1000px] flex flex-col divide-y divide-slate-100">
               {mockProjects.map(project => (
                 <div key={project.id} className="group flex items-center p-4 hover:bg-slate-50 transition-colors relative">
                    
                    {/* Status indicator bar on the left */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusDotColor(project.status)} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                    
                    {/* Basic Info (Code + Title) */}
                    <div className="w-[30%] pl-2 pr-4 flex flex-col justify-center">
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">{project.code}</span>
                       </div>
                       <h3 className="text-sm font-bold text-cobra-slate line-clamp-2 leading-tight group-hover:text-cobra-primary transition-colors cursor-pointer" onClick={() => onSelectProject(project.id)}>
                         {project.title}
                       </h3>
                    </div>

                    {/* Progress */}
                    <div className="w-[15%] px-4 flex flex-col justify-center">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Avance Físico</span>
                       <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.physicalProgress}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-emerald-700 w-8">{project.physicalProgress}%</span>
                       </div>
                    </div>

                    {/* Associated Contracts Count */}
                    <div className="w-[15%] px-4 flex flex-col justify-center items-center">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Contratos Asociados</span>
                       <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                         <i className="ph ph-files"></i> {project.associatedContracts.length}
                       </div>
                    </div>

                    {/* Value */}
                    <div className="w-[15%] px-4 flex flex-col justify-center items-end">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Inversión</span>
                       <span className="text-sm font-bold text-cobra-slate">
                         {new Intl.NumberFormat('es-CO', { notation: 'compact', compactDisplay: 'short', style: 'currency', currency: 'COP' }).format(project.totalValue)}
                       </span>
                    </div>

                    {/* Status Badge */}
                    <div className="w-[15%] px-4 flex flex-col justify-center items-end">
                       <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${getStatusColor(project.status)} text-[10px] font-bold uppercase tracking-wider`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(project.status)}`}></div>
                          {project.status}
                       </div>
                    </div>

                    {/* Actions */}
                    <div className="w-[10%] px-4 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onSelectProject(project.id)}
                          className="w-8 h-8 rounded-full bg-white border border-slate-200 text-cobra-slate flex items-center justify-center hover:border-cobra-primary hover:text-cobra-primary transition-all shadow-sm"
                          title="Ver Detalle"
                        >
                           <i className="ph ph-arrow-right font-bold"></i>
                        </button>
                        <button 
                          className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:border-slate-300 hover:text-slate-600 transition-all shadow-sm"
                        >
                           <i className="ph ph-dots-three-vertical font-bold"></i>
                        </button>
                    </div>

                 </div>
               ))}
             </div>
          </div>
          
          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/30 flex items-center justify-between">
             <span className="text-xs font-medium text-slate-500">
               Mostrando <span className="font-bold text-cobra-slate">1</span> a <span className="font-bold text-cobra-slate">3</span> de <span className="font-bold text-cobra-slate">3</span> proyectos
             </span>
             
             <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-400 flex items-center justify-center cursor-not-allowed">
                  <i className="ph ph-caret-left font-bold"></i>
                </button>
                <button className="w-8 h-8 rounded-lg bg-cobra-primary text-white font-bold flex items-center justify-center shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-400 flex items-center justify-center cursor-not-allowed">
                  <i className="ph ph-caret-right font-bold"></i>
                </button>
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProjectsListView;
