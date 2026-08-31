import React from 'react';
import { ProjectsService } from '../../../../services/projects.service';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const GanttModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const labels = PROJECT_DICTIONARY.GANTT_MODAL;
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const tasks = ProjectsService.getProjectGanttTasks();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-cobra-slate/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-[95vw] h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-cobra-primary flex items-center justify-center">
              <i className="ph ph-kanban text-2xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-cobra-text-main">{labels.TITLE}</h2>
              <p className="text-sm font-medium text-slate-500">{labels.SUBTITLE}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-all shadow-sm"
          >
            <i className="ph ph-x text-lg font-bold"></i>
          </button>
        </div>

        {/* Filters/Legend */}
        <div className="px-8 py-3 border-b border-slate-100 flex gap-6 items-center shrink-0">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-800"></div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">{labels.LEGEND_PHASE}</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-cobra-primary"></div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">{labels.LEGEND_EXECUTED}</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-200 border border-orange-300"></div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">{labels.LEGEND_PENDING}</span>
           </div>
        </div>

        {/* Gantt Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
          
          {/* Left Panel: Tasks */}
          <div className="w-full md:w-[350px] shrink-0 border-r border-slate-200 flex flex-col bg-white z-10 shadow-[4px_0_15px_-3px_rgba(0,0,0,0.05)]">
            <div className="h-12 border-b border-slate-200 bg-slate-50 flex items-center px-6 shrink-0">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{labels.WBS}</span>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar py-2">
              {tasks.map(task => (
                <div 
                  key={`name-${task.id}`} 
                  className={`h-10 flex items-center px-6 border-b border-slate-50 hover:bg-slate-50 transition-colors ${task.isPhase ? 'mt-2' : ''}`}
                >
                  <span className={`truncate ${task.isPhase ? 'text-xs font-black text-cobra-slate' : 'text-xs font-medium text-slate-600 pl-4'}`}>
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Timeline */}
          <div className="flex-1 overflow-auto bg-slate-50/50 relative flex flex-col">
            
            {/* Timeline Header (Months) */}
            <div className="h-12 border-b border-slate-200 bg-slate-50 flex shrink-0 min-w-max sticky top-0 z-20 shadow-sm">
              {months.map(month => (
                <div key={month} className="w-32 border-r border-slate-200 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{month}</span>
                </div>
              ))}
            </div>

            {/* Timeline Grid */}
            <div className="flex-1 relative min-w-max">
              {/* Vertical Grid Lines */}
              <div className="absolute inset-0 flex pointer-events-none z-0">
                 {months.map((m, i) => (
                   <div key={`grid-${i}`} className="w-32 border-r border-slate-200/50 shrink-0 h-full"></div>
                 ))}
              </div>

              {/* Task Bars */}
              <div className="py-2 relative z-10">
                 {tasks.map(task => {
                   const leftPos = task.start * 128; // 32rem = 128px per month approx
                   const width = task.duration * 128;
                   
                   return (
                     <div key={`bar-${task.id}`} className={`h-10 flex items-center px-4 border-b border-slate-50/0 ${task.isPhase ? 'mt-2' : ''}`}>
                        <div 
                           className="relative h-6 rounded flex items-center group cursor-pointer"
                           style={{ marginLeft: `${leftPos}px`, width: `${width}px` }}
                        >
                           {/* Background Bar */}
                           <div className={`absolute inset-0 rounded ${task.isPhase ? 'bg-slate-200' : 'bg-orange-100 border border-orange-200'}`}></div>
                           
                           {/* Progress Bar */}
                           <div 
                             className={`absolute top-0 left-0 bottom-0 rounded ${task.isPhase ? 'bg-slate-800' : 'bg-cobra-primary'} transition-all`}
                             style={{ width: `${task.progress}%` }}
                           ></div>

                           {/* Tooltip on hover */}
                           <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-cobra-slate text-white text-[10px] font-bold py-1 px-2 rounded -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 shadow-lg pointer-events-none">
                             {task.progress}{labels.PROGRESS_TOOLTIP}
                             <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-cobra-slate"></div>
                           </div>
                        </div>
                        <span className="ml-3 text-[10px] font-bold text-slate-400 tabular-nums">{task.progress}%</span>
                     </div>
                   );
                 })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttModal;
