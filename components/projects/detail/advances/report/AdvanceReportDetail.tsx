import React, { useState } from 'react';
import { PROJECT_DICTIONARY } from '../../../../../constants/projects.dictionary';
import { ProjectsService } from '../../../../../services/projects.service';

interface Props {
  onClose: () => void;
}

// Datos de prueba para la galería fotográfica
const MOCK_PHOTOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1541888052063-e380536fb562?auto=format&fit=crop&w=1200&q=80', name: 'Excavacion_Frente_Norte.jpg', size: '2.4 MB', date: '25 Jun 2026' },
  { id: 2, url: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&w=1200&q=80', name: 'Cimentacion_Base.jpg', size: '3.1 MB', date: '27 Jun 2026' },
  { id: 3, url: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1200&q=80', name: 'Estructura_Acero_V1.jpg', size: '1.8 MB', date: '29 Jun 2026' },
  { id: 4, url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80', name: 'Vaciado_Concreto.jpg', size: '4.2 MB', date: '01 Jul 2026' },
];

const AdvanceReportDetail: React.FC<Props> = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const labels = PROJECT_DICTIONARY.ADVANCE_REPORT;
  const reportData = ProjectsService.getProjectAdvanceReportData();
  const periods = ProjectsService.getProjectAdvancesPeriods();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  // Estados para la Galería y Modal de Comparación
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [comparePhotoIdx, setComparePhotoIdx] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  // Scroll-driven animation states
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('down');
  const [reportValues, setReportValues] = useState<Record<string, number>>({});
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});
  const [isGanttOpen, setIsGanttOpen] = useState(false);

  const handleReportValueChange = (id: string, value: string) => {
     setReportValues(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
  };

  const togglePhase = (id: string) => {
     setCollapsedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const baseTotal = 42.5;
  const simulatedTotal = baseTotal + reportData.activities.reduce((acc, phase) => {
      return acc + (phase.children?.reduce((sum, act) => {
         const val = reportValues[act.id] || 0;
         return sum + (val * act.weight / 100);
      }, 0) || 0);
  }, 0);

  const changeStep = (direction: 'up' | 'down') => {
    if (isTransitioning) return;
    if (direction === 'down' && activeStep < STEPS.length - 1) {
       setSlideDirection('down');
       setIsTransitioning(true);
       setActiveStep(prev => prev + 1);
       setTimeout(() => setIsTransitioning(false), 800);
    } else if (direction === 'up' && activeStep > 0) {
       setSlideDirection('up');
       setIsTransitioning(true);
       setActiveStep(prev => prev - 1);
       setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  const handleStepClick = (index: number) => {
    if (isTransitioning || index === activeStep) return;
    setSlideDirection(index > activeStep ? 'down' : 'up');
    setIsTransitioning(true);
    setActiveStep(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  
  const STEPS = [
    { id: 'period', label: labels.MENU_PERIOD, icon: 'ph-calendar' },
    { id: 'activities', label: labels.MENU_ACTIVITIES, icon: 'ph-grid-nine' },
    { id: 'qualitative', label: labels.MENU_QUALITATIVE, icon: 'ph-chat-circle-text' },
    { id: 'indicators', label: labels.MENU_INDICATORS, icon: 'ph-chart-bar' },
    { id: 'attachments', label: labels.MENU_ATTACHMENTS, icon: 'ph-images' },
    { id: 'confirm', label: labels.MENU_CONFIRM, icon: 'ph-check-circle' },
    { id: 'evaluation', label: labels.MENU_EVALUATION, icon: 'ph-clipboard-text' }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Reportado': return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">{status}</span>;
      case 'En Revisión': return <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">{status}</span>;
      case 'Aprobado': return <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{status}</span>;
      default: return <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">{status}</span>;
    }
  };

  const openImageViewer = (index: number) => {
    setCurrentPhotoIdx(index);
    setViewerOpen(true);
    setIsCompareMode(false);
    setComparePhotoIdx(null);
    setSliderPosition(50);
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
    setIsCompareMode(false);
    setComparePhotoIdx(null);
  };

  const renderSimulator = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
       <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/60 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{labels.SIM_CURRENT}</span>
          <span className="text-2xl font-black text-blue-600">{reportData.currentStatus.current}%</span>
       </div>
       <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/60 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{labels.SIM_TARGET}</span>
          <span className="text-2xl font-black text-emerald-600">{reportData.currentStatus.target}%</span>
       </div>
       <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/60 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{labels.SIM_REPORTED}</span>
          <span className="text-2xl font-black text-amber-600">{reportData.currentStatus.current}%</span>
       </div>
       <div className="bg-red-50/50 rounded-3xl p-5 border border-red-100 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1 block">{labels.SIM_DELAY}</span>
          <span className="text-2xl font-black text-red-600">{reportData.currentStatus.delay}%</span>
       </div>
    </div>
  );

  const renderPeriodStep = () => (
     <div className="w-full">
        <h3 className="text-2xl font-black text-cobra-slate mb-2">Selección de Periodo</h3>
        <p className="text-sm text-slate-500 mb-8 font-medium">Elige el periodo que deseas reportar o consultar. Te recomendamos hacerlo de forma secuencial.</p>
        
        <div className="relative mb-8 max-w-xl">
          <i className="ph ph-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
          <input type="text" placeholder="Buscar un periodo específico..." className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-200/60 focus:bg-white focus:border-cobra-primary focus:ring-4 focus:ring-red-50 outline-none text-sm font-bold transition-all shadow-sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
           {periods.map(p => (
              <label key={p.id} className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col gap-4 ${selectedPeriod === p.id ? 'border-cobra-primary bg-red-50/10 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'}`}>
                 <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPeriod === p.id ? 'border-cobra-primary bg-white' : 'border-slate-300'}`}>
                          {selectedPeriod === p.id && <div className="w-2.5 h-2.5 rounded-full bg-cobra-primary"></div>}
                       </div>
                       <div>
                         <h4 className="font-black text-cobra-slate text-base">{p.period}</h4>
                         <p className="text-xs text-slate-400 font-medium mt-1"><i className="ph-fill ph-user mr-1"></i>{p.author} • {p.date}</p>
                       </div>
                    </div>
                    {getStatusBadge(p.status)}
                 </div>
              </label>
           ))}
           {/* Nuevo Periodo Card */}
           <label className={`p-6 rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col gap-4 ${selectedPeriod === 'new' ? 'border-cobra-primary bg-red-50/10 shadow-md' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}>
                 <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPeriod === 'new' ? 'border-cobra-primary bg-white' : 'border-slate-300'}`}>
                          {selectedPeriod === 'new' && <div className="w-2.5 h-2.5 rounded-full bg-cobra-primary"></div>}
                       </div>
                       <div>
                         <h4 className="font-black text-cobra-slate text-base">27-Jun-2026 al 03-Jul-2026</h4>
                         <p className="text-xs text-slate-500 font-bold mt-1">Siguiente periodo programado</p>
                       </div>
                    </div>
                    <span className="px-3 py-1 bg-white text-slate-500 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Sin Reportar</span>
                 </div>
           </label>
        </div>
     </div>
  );

  const renderActivitiesStep = () => {
     return (
     <div className="w-full flex flex-col min-h-full pb-8">
        {/* Sticky Header / Simulator */}
        <div className="shrink-0 bg-[#f1f5f9]/95 backdrop-blur-md z-30 pb-4 sticky top-0 pt-4 -mt-4">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                 <h3 className="text-2xl font-black text-cobra-slate">Avance Cuantitativo</h3>
                 <p className="text-sm text-slate-500 mt-1 font-medium">Registra el % de avance del periodo en cada actividad.</p>
              </div>
              <div className="flex flex-col md:items-end gap-1.5 p-4 rounded-xl border border-cobra-primary/20 bg-red-50/50">
                 <span className="text-[10px] font-black uppercase text-cobra-primary tracking-widest">Avance Físico Proyecto</span>
                 <div className="flex items-center gap-4">
                    <span className="text-xl font-mono font-black text-slate-800">45.0% <span className="text-sm text-slate-400 font-sans font-bold">Debería Ir</span></span>
                    <i className="ph-bold ph-arrow-right text-slate-300"></i>
                    <span className="text-xl font-mono font-black text-emerald-600">{simulatedTotal.toFixed(2)}% <span className="text-sm text-emerald-600/50 font-sans font-bold">Avance a reportar</span></span>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center justify-between bg-slate-200/50 p-2 rounded-xl mb-4">
              <div className="flex items-center gap-4 px-3">
                 <button onClick={() => setIsGanttOpen(true)} className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-cobra-primary transition-colors">
                    <i className="ph-bold ph-kanban"></i> Ver en Diagrama de Gantt
                 </button>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                 <i className="ph-bold ph-funnel text-slate-400"></i>
                 <select className="bg-transparent border-none outline-none font-bold text-slate-600 cursor-pointer">
                    <option>Todas las Fases</option>
                    {reportData.activities.map(ph => <option key={ph.id}>{ph.name}</option>)}
                 </select>
              </div>
           </div>
        </div>

        {/* Scrollable Activities List */}
        <div className="flex-1 p-2 md:p-4 rounded-2xl bg-slate-50/50 border border-slate-200/50">
           <div className="flex flex-col gap-6 w-full pb-10">
              {reportData.activities.map(phase => (
                 <div key={phase.id} className="flex flex-col gap-3">
                    <div 
                       onClick={() => togglePhase(phase.id)}
                       className="bg-slate-100/80 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-white shadow-sm border border-slate-200 flex items-center justify-center transition-transform duration-300" style={{ transform: collapsedPhases[phase.id] ? 'rotate(-90deg)' : 'none' }}>
                             <i className="ph-bold ph-caret-down text-slate-400 text-xs"></i>
                          </div>
                          <h4 className="font-black text-cobra-slate text-sm">{phase.name}</h4>
                       </div>
                       <span className="text-xs font-bold text-slate-400">{phase.children?.length || 0} actividades</span>
                    </div>
                    
                    {!collapsedPhases[phase.id] && (
                    <div className="flex flex-col gap-3">
                       {phase.children?.map(act => {
                          const additionalAdvance = reportValues[act.id] || 0;
                          const totalPercent = Math.min(100, act.execPercent + additionalAdvance);
                          
                          return (
                          <div key={act.id} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden hover:border-slate-300 transition-colors group">
                             {/* Header: Name and ID */}
                             <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                                   <span className="font-bold text-slate-700 text-sm truncate" title={act.name}>{act.name}</span>
                                   <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500 font-mono">
                                      <span className="bg-slate-200/60 px-2 py-0.5 rounded-md text-slate-600 font-bold">{act.id.toUpperCase()}</span>
                                      <span className="flex items-center gap-1 bg-white border border-slate-200/70 px-2 py-0.5 rounded-md shadow-sm"><i className="ph-bold ph-calendar-blank"></i> {act.start} - {act.end}</span>
                                   </div>
                                </div>
                                <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
                                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avance Total</span>
                                   <div className="flex items-center gap-3 w-full md:w-auto">
                                      <div className="w-32 md:w-24 h-2 bg-slate-100 rounded-full overflow-hidden flex-1 md:flex-none">
                                         <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${totalPercent}%` }}></div>
                                      </div>
                                      <span className="font-black text-blue-600 font-mono text-sm min-w-[3ch] text-right">{totalPercent}%</span>
                                   </div>
                                </div>
                             </div>
                             
                             {/* Body: Metrics Grid */}
                             <div className="p-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-3 items-center">
                                {/* Column 1: Prog vs Ejec quantities */}
                                <div className="flex flex-col gap-1.5 border-r border-slate-100 pr-4">
                                   <div className="flex justify-between items-center text-xs">
                                      <span className="text-slate-400 font-bold text-[10px] uppercase">Prog.</span>
                                      <span className="font-mono font-bold text-slate-600 text-xs">{act.progQty.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} <span className="text-[9px] font-sans font-bold text-slate-400 bg-slate-100 px-1 py-0.5 rounded ml-1">{act.unit}</span></span>
                                   </div>
                                   <div className="flex justify-between items-center text-xs">
                                      <span className="text-slate-400 font-bold text-[10px] uppercase">Ejec.</span>
                                      <span className="font-mono font-bold text-slate-600 text-xs">{act.execQty.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} <span className="text-[9px] font-sans font-bold text-slate-400 bg-slate-100 px-1 py-0.5 rounded ml-1">{act.unit}</span></span>
                                   </div>
                                </div>
                                
                                {/* Column 2: Prog vs Ejec values */}
                                <div className="flex flex-col gap-1.5 border-r border-slate-100 pr-4">
                                   <div className="flex justify-between items-center text-xs">
                                      <span className="text-slate-400 font-bold text-[10px] uppercase">V. Prog.</span>
                                      <span className="font-mono font-bold text-slate-600 text-xs">${act.progVal.toLocaleString()}</span>
                                   </div>
                                   <div className="flex justify-between items-center text-xs">
                                      <span className="text-slate-400 font-bold text-[10px] uppercase">V. Ejec.</span>
                                      <span className="font-mono font-bold text-slate-600 text-xs">${act.execVal.toLocaleString()}</span>
                                   </div>
                                </div>
                                
                                {/* Column 3: Weights */}
                                <div className="flex flex-col justify-center h-full">
                                   <div className="flex justify-between items-center text-xs bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                                      <span className="text-slate-500 font-black text-[9px] uppercase tracking-widest">Peso</span>
                                      <span className="font-mono font-black text-slate-700 text-xs">{act.weight}%</span>
                                   </div>
                                </div>
                                
                                {/* Column 4 (or 4 & 5): Input area */}
                                <div className="col-span-2 md:col-span-4 lg:col-span-2 bg-emerald-50/50 rounded-xl border border-emerald-100 p-2 flex flex-row items-center justify-between gap-3 mt-1 md:mt-0 lg:ml-auto md:w-full lg:w-auto">
                                   <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest hidden sm:block pl-2">% A REPORTAR</span>
                                   <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest sm:hidden pl-2">REP.</span>
                                   <div className="relative flex items-center">
                                      <input
                                         type="number"
                                         value={reportValues[act.id] !== undefined ? reportValues[act.id] : ''}
                                         onChange={(e) => handleReportValueChange(act.id, e.target.value)}
                                         placeholder="0"
                                         className="w-[90px] sm:w-[100px] min-h-[32px] pl-3 pr-7 py-1 text-right bg-white border border-emerald-200 rounded-lg shadow-sm text-emerald-700 font-black font-mono text-sm focus:border-cobra-primary focus:ring-2 focus:ring-red-50 outline-none transition-all hover:border-emerald-300"
                                      />
                                      <span className="absolute right-2 text-emerald-500 font-bold text-sm">%</span>
                                   </div>
                                </div>
                             </div>
                          </div>
                          );
                       })}
                    </div>
                    )}
                 </div>
              ))}
           </div>
        </div>
     </div>
  );
}

  const renderQualitativeStep = () => (
     <div className="w-full">
         <div className="flex justify-between items-center mb-6">
             <div>
                <h3 className="text-2xl font-black text-cobra-slate">Avance Cualitativo</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium">Registra los logros y dificultades encontrados durante este periodo.</p>
             </div>
             <button className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm text-cobra-slate rounded-xl text-xs font-black flex items-center gap-2 hover:border-cobra-primary hover:text-cobra-primary transition-all group">
                <i className="ph-bold ph-plus text-lg"></i>
                Nuevo Registro
             </button>
         </div>

         <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 lg:p-8">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                     <i className="ph-fill ph-money text-xl"></i>
                  </div>
                  <h4 className="font-black text-cobra-slate text-base">Financiero</h4>
               </div>
               <button className="px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 border border-transparent hover:border-red-100">
                  <i className="ph-bold ph-trash"></i> Eliminar
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
               <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black uppercase text-emerald-600 tracking-widest flex items-center gap-2">
                     <i className="ph-fill ph-check-circle text-sm"></i> Logros Alcanzados
                  </label>
                  <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-5 min-h-[120px]">
                     <p className="text-sm font-medium text-slate-700 leading-relaxed">{reportData.qualitative.financial.achievements}</p>
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black uppercase text-amber-600 tracking-widest flex items-center gap-2">
                     <i className="ph-fill ph-warning-circle text-sm"></i> Dificultades Presentadas
                  </label>
                  <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-5 min-h-[120px]">
                     <p className="text-sm font-medium text-slate-700 leading-relaxed">{reportData.qualitative.financial.difficulties}</p>
                  </div>
               </div>
            </div>
         </div>
     </div>
  );

  const renderIndicatorsStep = () => (
     <div className="flex flex-col h-full w-full">
         <div className="flex justify-between items-end mb-6">
             <div>
                <h3 className="text-2xl font-black text-cobra-slate mb-1">Indicadores del Proyecto</h3>
                <p className="text-sm text-slate-500 font-medium">Actualiza los valores de los indicadores. Diseño en filas compactas para mejor visualización.</p>
             </div>
             <button className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm text-cobra-slate rounded-xl text-xs font-black flex items-center gap-2 hover:border-cobra-primary hover:text-cobra-primary transition-all">
                <i className="ph-bold ph-plus text-lg"></i>
                Crear Indicador
             </button>
         </div>

         <div className="flex flex-col gap-3">
            {reportData.indicators.map(ind => (
               <div key={ind.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 lg:p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group gap-4">
                  <div className="flex items-center gap-4 min-w-[260px] max-w-[320px]">
                     <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center shrink-0 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors shadow-sm">
                        <i className="ph-fill ph-chart-polar text-2xl"></i>
                     </div>
                     <div>
                        <h4 className="text-sm font-black text-cobra-slate leading-tight line-clamp-2">{ind.name}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block bg-slate-100 inline-block px-2 py-0.5 rounded-md">{ind.unit}</span>
                     </div>
                  </div>
                  
                  <div className="flex flex-1 justify-between items-center bg-slate-50 rounded-2xl px-6 py-3 border border-slate-100/80 w-full md:w-auto">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Programado</span>
                        <span className="text-sm font-black text-cobra-slate tabular-nums">{ind.progQty.toLocaleString()}</span>
                     </div>
                     <div className="w-px h-8 bg-slate-200 mx-4 hidden sm:block"></div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Ejecutado (Previo)</span>
                        <span className="text-sm font-black text-indigo-600 tabular-nums">{ind.execQty.toLocaleString()}</span>
                     </div>
                     <div className="w-px h-8 bg-slate-200 mx-4 hidden sm:block"></div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Avance Total</span>
                        <span className="text-sm font-black text-emerald-600 tabular-nums">{ind.advancePercent}%</span>
                     </div>
                  </div>

                  <div className="w-full md:w-56 shrink-0 relative">
                     <span className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-cobra-primary uppercase tracking-widest rounded-full shadow-sm border border-slate-100">Valor a Reportar</span>
                     <input 
                        type="number" 
                        placeholder="0"
                        className="w-full bg-white border-2 border-slate-200/80 rounded-2xl px-5 py-3.5 text-base font-black text-right text-cobra-slate focus:border-cobra-primary focus:ring-4 focus:ring-red-50 outline-none transition-all shadow-inner" 
                     />
                  </div>
               </div>
            ))}
         </div>
     </div>
  );

  const renderAttachmentsStep = () => (
     <div className="w-full">
         <h3 className="text-2xl font-black text-cobra-slate mb-2">Fotos y Documentos</h3>
         <p className="text-sm text-slate-500 mb-8 font-medium">Sube las evidencias correspondientes al periodo reportado.</p>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fotos Section */}
            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-end mb-1">
                  <div>
                     <h4 className="text-sm font-black text-cobra-slate flex items-center gap-2"><i className="ph-fill ph-camera text-slate-400"></i> Registro Fotográfico</h4>
                     <p className="text-[11px] text-slate-500 mt-0.5">Sube imágenes en formato JPG o PNG</p>
                  </div>
               </div>
               
               <div className="bg-white rounded-3xl border border-slate-200/80 p-3 shadow-sm flex flex-col gap-3">
                  {MOCK_PHOTOS.map((photo, idx) => (
                    <div key={photo.id} className="p-3 flex items-center justify-between bg-slate-50/50 hover:bg-slate-100 rounded-2xl transition-all group border border-slate-100 cursor-pointer" onClick={() => openImageViewer(idx)}>
                       <div className="flex items-center gap-4">
                          <div className="w-20 h-14 rounded-xl overflow-hidden relative shrink-0 shadow-sm border border-slate-200">
                             <img src={photo.url} alt={photo.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-cobra-slate line-clamp-1">{photo.name}</span>
                             <span className="text-[10px] font-black text-slate-400 uppercase mt-0.5">{photo.size} • {photo.date}</span>
                          </div>
                       </div>
                       <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-white hover:text-cobra-primary hover:shadow-sm transition-all" onClick={(e) => { e.stopPropagation(); openImageViewer(idx); }}>
                         <i className="ph-bold ph-arrows-out-simple"></i>
                       </button>
                    </div>
                  ))}
                  
                  {/* Dropzone */}
                  <div className="border-2 border-dashed border-slate-200/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-white hover:bg-slate-50 hover:border-cobra-primary transition-colors cursor-pointer mt-1">
                     <div className="w-12 h-12 rounded-full bg-slate-50 shadow-sm flex items-center justify-center text-slate-400 mb-2 border border-slate-100">
                        <i className="ph-bold ph-upload-simple text-xl"></i>
                     </div>
                     <span className="text-xs font-bold text-cobra-slate">Añadir más fotos</span>
                  </div>
               </div>
            </div>

            {/* Docs Section */}
            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-end mb-1">
                  <div>
                     <h4 className="text-sm font-black text-cobra-slate flex items-center gap-2"><i className="ph-fill ph-file-text text-slate-400"></i> Documentos Anexos</h4>
                     <p className="text-[11px] text-slate-500 mt-0.5">Sube archivos en formato PDF o Excel</p>
                  </div>
               </div>
               
               <div className="bg-white rounded-3xl border border-slate-200/80 p-2 shadow-sm flex flex-col gap-2">
                  <div className="p-3 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors group border border-transparent hover:border-slate-100 cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100">
                           <i className="ph-fill ph-file-pdf text-xl"></i>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-cobra-slate line-clamp-1">Informe_Supervision_06.pdf</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase mt-0.5">Requerido • 1.2 MB</span>
                        </div>
                     </div>
                     <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><i className="ph-bold ph-trash"></i></button>
                  </div>

                  {/* Dropzone */}
                  <div className="border-2 border-dashed border-slate-200/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 hover:border-cobra-primary transition-colors cursor-pointer m-1">
                     <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 mb-2 border border-slate-100">
                        <i className="ph-bold ph-upload-simple text-xl"></i>
                     </div>
                     <span className="text-xs font-bold text-cobra-slate">Arrastra documentos aquí</span>
                  </div>
               </div>
            </div>
         </div>
     </div>
  );

  const renderConfirmStep = () => (
     <div className="w-full">
        <h3 className="text-2xl font-black text-cobra-slate mb-2">Confirmar y Enviar</h3>
        <p className="text-sm text-slate-500 mb-8 font-medium">Revisa el resumen ejecutivo del avance antes de enviarlo a revisión.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
           <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50">
                    <i className="ph-fill ph-calendar-check text-2xl"></i>
                 </div>
                 <h4 className="text-base font-black text-cobra-slate">Avance Acumulado a Hoy</h4>
              </div>
              <div className="flex flex-col gap-5">
                 <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ejecución Real</span>
                    <span className="text-2xl font-black text-blue-600 tabular-nums">{reportData.currentStatus.current}%</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ejecución Programada</span>
                    <span className="text-2xl font-black text-emerald-600 tabular-nums">{reportData.currentStatus.target}%</span>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-[100px] -mr-4 -mt-4"></div>
              <div className="flex items-center gap-3 mb-6 relative">
                 <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/50">
                    <i className="ph-fill ph-target text-2xl"></i>
                 </div>
                 <h4 className="text-base font-black text-cobra-slate">Avance del Periodo</h4>
              </div>
              <div className="flex flex-col gap-5 relative">
                 <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reportado</span>
                    <span className="text-2xl font-black text-amber-600 tabular-nums">{reportData.currentStatus.current}%</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Programado al corte</span>
                    <span className="text-2xl font-black text-cobra-slate tabular-nums">84.38%</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
           <h4 className="text-sm font-black text-cobra-slate mb-2">Comentarios y Recomendaciones Generales</h4>
           <textarea 
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-sm font-medium outline-none focus:bg-white focus:border-cobra-primary focus:ring-4 focus:ring-red-50 min-h-[120px] resize-none transition-all shadow-inner prevent-step-scroll" 
              placeholder="Escribe un resumen general..."
              defaultValue="Todo el avance se realizó conforme a lo planeado en cronograma sin contratiempos mayores."
           ></textarea>
        </div>
     </div>
  );

  const renderEvaluationStep = () => (
     <div className="w-full">
        <h3 className="text-2xl font-black text-cobra-slate mb-2">Evaluación de Supervisión</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium">Revisa y emite un concepto técnico sobre el avance reportado.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm flex flex-col">
              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                 <i className="ph-fill ph-check-circle text-cobra-primary text-lg"></i> Conclusiones *
              </label>
              <textarea 
                 className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-sm font-medium outline-none focus:bg-white focus:border-cobra-primary focus:ring-4 focus:ring-red-50 flex-1 min-h-[120px] resize-none transition-all shadow-inner prevent-step-scroll" 
                 defaultValue="Todo Ok"
              ></textarea>
           </div>
           <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm flex flex-col">
              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                 <i className="ph-fill ph-list-plus text-cobra-primary text-lg"></i> Acciones a realizar
              </label>
              <textarea 
                 className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-sm font-medium outline-none focus:bg-white focus:border-cobra-primary focus:ring-4 focus:ring-red-50 flex-1 min-h-[120px] resize-none transition-all shadow-inner prevent-step-scroll" 
                 placeholder="Opcional..."
              ></textarea>
           </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
           <div className="p-5 bg-slate-50/80 border-b border-slate-100">
              <h4 className="text-xs font-black text-cobra-slate flex items-center gap-2">
                 <i className="ph-bold ph-history text-lg"></i> Histórico de Evaluaciones
              </h4>
           </div>
           <div className="overflow-x-auto prevent-step-scroll">
              <table className="w-full text-left whitespace-nowrap">
                 <thead className="bg-white text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                       <th className="px-6 py-4">Fecha</th>
                       <th className="px-6 py-4">Revisado por</th>
                       <th className="px-6 py-4 text-center">Estado</th>
                       <th className="px-6 py-4">Conclusiones</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 text-xs font-medium">
                    {reportData.evaluations.map((ev, idx) => (
                       <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 text-slate-500 font-bold">{ev.date}</td>
                          <td className="px-6 py-4">{ev.reviewer}</td>
                          <td className="px-6 py-4 text-center">{getStatusBadge(ev.status)}</td>
                          <td className="px-6 py-4 text-slate-500 truncate max-w-[200px]">{ev.conclusions}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
     </div>
  );

  const getStepContent = () => {
    switch (activeStep) {
      case 0: return renderPeriodStep();
      case 1: return renderActivitiesStep();
      case 2: return renderQualitativeStep();
      case 3: return renderIndicatorsStep();
      case 4: return renderAttachmentsStep();
      case 5: return renderConfirmStep();
      case 6: return renderEvaluationStep();
      default: return null;
    }
  };

  return (
    <>
      <div className="bg-slate-100 -m-8 p-6 lg:px-12 xl:px-20 lg:py-10 flex flex-col min-h-[calc(100vh-64px)] overflow-visible">
         {/* Top Bar Context */}
         <div className="max-w-[1500px] w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
               <button onClick={onClose} className="text-[11px] font-black uppercase text-slate-500 hover:text-cobra-primary transition-colors flex items-center gap-1.5 mb-3 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow-md">
                  <i className="ph-bold ph-arrow-left text-sm"></i> {labels.BACK_TO_LIST}
               </button>
               <h2 className="text-2xl lg:text-3xl font-black text-cobra-slate tracking-tight">{labels.TITLE_CREATE}</h2>
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
               <div className="flex flex-col text-right">
                  <span className="text-[9px] font-black uppercase text-slate-400">Periodo actual:</span>
                  <span className="text-xs font-black text-cobra-primary">
                     {selectedPeriod && selectedPeriod !== 'new' ? periods.find(p => p.id === selectedPeriod)?.period : '27-Jun - 03-Jul 2026'}
                  </span>
               </div>
               <div className="w-10 h-10 rounded-xl bg-red-50 text-cobra-primary flex items-center justify-center shrink-0 border border-red-100">
                  <i className="ph-bold ph-calendar text-xl"></i>
               </div>
            </div>
         </div>

         {/* Layout Principal Bento */}
         <div className="flex flex-col lg:flex-row gap-8 flex-1 max-w-[1500px] w-full mx-auto items-start">
            
            {/* Menú Vertical Lateral (Pills) */}
            <div className="w-full lg:w-72 shrink-0 flex flex-col gap-2 lg:sticky top-8 self-start">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2 hidden lg:block">Pasos del Reporte</h3>
               <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar gap-2">
                  {STEPS.map((step, index) => {
                     const isActive = activeStep === index;
                     const isPast = activeStep > index;
                     return (
                        <button 
                           key={step.id} 
                           onClick={() => handleStepClick(index)}
                           className={`shrink-0 lg:w-full text-left px-5 py-3.5 rounded-[1.25rem] flex items-center justify-between transition-all duration-300 group ${
                              isActive 
                                 ? 'bg-cobra-slate shadow-lg shadow-slate-900/10 text-white border-transparent lg:translate-x-2 scale-105 lg:scale-100' 
                                 : isPast 
                                    ? 'bg-white border border-slate-200/80 text-cobra-slate hover:bg-slate-50 hover:shadow-sm' 
                                    : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-600 hover:bg-white/60'
                           }`}
                        >
                           <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                 isActive ? 'bg-white/20' : isPast ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-200/70'
                              }`}>
                                 <i className={`ph-fill ${isPast && !isActive ? 'ph-check-circle' : step.icon} text-base`}></i>
                              </div>
                              <span className={`text-xs ${isActive ? 'font-black' : 'font-bold'}`}>{step.label}</span>
                           </div>
                           {isActive && <i className="ph-bold ph-caret-right text-white/50 hidden lg:block"></i>}
                        </button>
                     );
                  })}
               </div>
            </div>

            {/* Lienzo Principal (Card Gigante) */}
            <div className="flex-1 w-full bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-6 lg:p-10 min-w-0 flex flex-col min-h-[550px] relative">
               <div className="flex-1 w-full relative px-2">
                  <div key={activeStep} className={`w-full min-h-full pb-10 animate-in fade-in duration-700 fill-mode-both ${slideDirection === 'down' ? 'slide-in-from-bottom-[100px]' : 'slide-in-from-top-[100px]'}`}>
                     {getStepContent()}
                  </div>
               </div>
               
               {/* Navegación Footer */}
               <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex gap-2 hidden sm:flex">
                     {STEPS.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${activeStep === i ? 'w-8 bg-cobra-primary' : activeStep > i ? 'w-2 bg-emerald-400' : 'w-2 bg-slate-200'}`}></div>
                     ))}
                  </div>
                  <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end items-center">
                     {activeStep > 0 && (
                        <button
                           onClick={() => changeStep('up')}
                           className="px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                           <i className="ph-bold ph-arrow-left text-sm"></i> Anterior
                        </button>
                     )}
                     {activeStep < STEPS.length - 1 ? (
                        <button
                           onClick={() => changeStep('down')}
                           className="px-8 py-2.5 rounded-xl bg-cobra-primary text-white font-black text-xs shadow-md shadow-red-500/20 hover:bg-red-700 transition-all hover:-translate-y-0.5 flex items-center gap-2 group"
                        >
                           Siguiente <i className="ph-bold ph-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                        </button>
                     ) : (
                        <button 
                           onClick={onClose}
                           className="px-8 py-3 rounded-xl bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all hover:-translate-y-0.5 flex items-center gap-2 group"
                        >
                           <i className="ph-bold ph-check text-lg"></i> {labels.BTN_FINISH}
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Modal de Gantt */}
      {isGanttOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-cobra-slate/80 backdrop-blur-sm" onClick={() => setIsGanttOpen(false)}></div>
           <div className="relative w-full max-w-[95vw] h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0 gap-6">
                 <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                       <i className="ph-fill ph-kanban text-2xl"></i>
                    </div>
                    <div className="hidden sm:block">
                       <h2 className="text-lg font-black text-cobra-text-main leading-tight">Diagrama de Gantt</h2>
                       <p className="text-xs font-medium text-slate-500">Visualiza y reporta avance directamente.</p>
                    </div>
                 </div>
                 
                 <div className="hidden md:flex flex-col items-end gap-1.5 p-2 px-4 rounded-xl border border-cobra-primary/20 bg-red-50/50 shrink-0">
                    <span className="text-[9px] font-black uppercase text-cobra-primary tracking-widest">Avance Físico Proyecto</span>
                    <div className="flex items-center gap-3">
                       <span className="text-lg font-mono font-black text-slate-800">45.0% <span className="text-xs text-slate-400 font-sans font-bold">Debería Ir</span></span>
                       <i className="ph-bold ph-arrow-right text-slate-300"></i>
                       <span className="text-lg font-mono font-black text-emerald-600">{simulatedTotal.toFixed(2)}% <span className="text-xs text-emerald-600/50 font-sans font-bold">Avance a reportar</span></span>
                    </div>
                 </div>

                 <button onClick={() => setIsGanttOpen(false)} className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-all shadow-sm shrink-0">
                    <i className="ph-bold ph-x text-lg"></i>
                 </button>
              </div>
              
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
                 {/* Left Panel: Tasks */}
                 <div className="w-full md:w-[450px] shrink-0 border-r border-slate-200 flex flex-col bg-white z-10 shadow-[4px_0_15px_-3px_rgba(0,0,0,0.05)]">
                    <div className="h-12 border-b border-slate-200 bg-slate-50 flex items-center px-6 shrink-0 justify-between">
                       <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Actividad</span>
                       <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mr-4">Reportar</span>
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar py-2 custom-scrollbar">
                       {reportData.activities.map(phase => (
                          <React.Fragment key={phase.id}>
                             <div className="h-10 flex items-center px-6 border-b border-slate-50 bg-slate-50/50 mt-2">
                                <span className="truncate text-xs font-black text-cobra-slate">{phase.name}</span>
                             </div>
                             {phase.children?.map(act => (
                                <div key={act.id} className="h-12 flex items-center justify-between px-6 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                   <div className="flex flex-col flex-1 min-w-0 pr-4">
                                      <span className="truncate text-[11px] font-bold text-slate-600" title={act.name}>{act.name}</span>
                                      <span className="text-[9px] text-slate-400 font-mono">{act.start} / {act.end}</span>
                                   </div>
                                   <div className="relative flex items-center w-[80px] shrink-0">
                                      <input
                                         type="number"
                                         value={reportValues[act.id] !== undefined ? reportValues[act.id] : ''}
                                         onChange={(e) => handleReportValueChange(act.id, e.target.value)}
                                         placeholder="0"
                                         className="w-full min-h-[28px] pl-2 pr-6 py-1 text-right bg-white border border-emerald-200 rounded text-emerald-700 font-black font-mono text-[11px] focus:border-cobra-primary focus:ring-1 outline-none transition-all hover:border-emerald-300 shadow-inner"
                                      />
                                      <span className="absolute right-1.5 text-emerald-500 font-bold text-[9px]">%</span>
                                   </div>
                                </div>
                             ))}
                          </React.Fragment>
                       ))}
                    </div>
                 </div>

                 {/* Right Panel: Timeline */}
                 <div className="flex-1 overflow-auto bg-slate-50/50 relative flex flex-col custom-scrollbar">
                    <div className="h-12 border-b border-slate-200 bg-slate-50 flex shrink-0 min-w-max sticky top-0 z-20 shadow-sm">
                       {['May 26', 'Jun 26', 'Jul 26', 'Ago 26', 'Sep 26', 'Oct 26'].map(month => (
                          <div key={month} className="w-40 border-r border-slate-200 flex items-center justify-center shrink-0">
                             <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{month}</span>
                          </div>
                       ))}
                    </div>
                    <div className="flex-1 relative min-w-max">
                       <div className="absolute inset-0 flex pointer-events-none z-0">
                          {[1,2,3,4,5,6].map((m, i) => (
                             <div key={i} className="w-40 border-r border-slate-200/50 shrink-0 h-full"></div>
                          ))}
                       </div>
                       <div className="py-2 relative z-10">
                          {reportData.activities.map((phase, pIdx) => (
                             <React.Fragment key={phase.id}>
                                <div className="h-10 border-b border-slate-50/0 mt-2 flex items-center">
                                   {/* Phase bar mock */}
                                   <div className="relative h-6 bg-slate-200 rounded ml-[20px] w-[300px]"></div>
                                </div>
                                {phase.children?.map((act, idx) => {
                                   // Pseudo logic for positions just to mock the gantt visually based on month start
                                   // Mocks: May is month 0, Jun is month 1, etc. w-40 = 160px
                                   let startOffset = 0;
                                   let durationPx = 160;
                                   if(act.start.includes('-06-')) startOffset = 160;
                                   else if(act.start.includes('-07-')) startOffset = 320;
                                   else if(act.start.includes('-08-')) startOffset = 480;
                                   else if(act.start.includes('-09-')) startOffset = 640;
                                   else if(act.start.includes('-10-')) startOffset = 800;

                                   if(act.end.includes('-07-')) durationPx = 320 - startOffset;
                                   else if(act.end.includes('-08-')) durationPx = 480 - startOffset;
                                   else if(act.end.includes('-09-')) durationPx = 640 - startOffset;
                                   else if(act.end.includes('-10-')) durationPx = 800 - startOffset;
                                   if(durationPx < 80) durationPx = 80;

                                   const totalPercent = Math.min(100, act.execPercent + (reportValues[act.id] || 0));

                                   return (
                                      <div key={act.id} className="h-12 border-b border-slate-50/0 flex items-center relative">
                                         <div 
                                            className="absolute h-6 rounded flex items-center group cursor-pointer bg-orange-100 border border-orange-200 overflow-hidden shadow-sm"
                                            style={{ left: `${startOffset + 20}px`, width: `${durationPx}px` }}
                                         >
                                            <div className="absolute inset-y-0 left-0 bg-cobra-primary transition-all duration-300" style={{ width: `${totalPercent}%` }}></div>
                                            <div className="absolute inset-y-0 right-0 w-2 bg-cobra-primary/20 cursor-col-resize hover:bg-cobra-primary/50"></div>
                                            <span className="relative z-10 text-[9px] font-black text-white mix-blend-difference px-2">{totalPercent.toFixed(1)}%</span>
                                         </div>
                                      </div>
                                   );
                                })}
                             </React.Fragment>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
      {/* Visualizador Inmersivo y Comparador (Modal) */}
      {viewerOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/95 backdrop-blur-lg animate-in fade-in duration-300">
          
          {/* Top Bar Viewer */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 relative z-20 bg-slate-900/50">
             <div className="flex items-center gap-4">
                <button onClick={closeImageViewer} className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all">
                  <i className="ph-bold ph-x text-xl"></i>
                </button>
                <div className="flex flex-col">
                  <span className="text-white font-black text-sm">{MOCK_PHOTOS[currentPhotoIdx].name}</span>
                  <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-0.5">{MOCK_PHOTOS[currentPhotoIdx].size} • {MOCK_PHOTOS[currentPhotoIdx].date}</span>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                     setIsCompareMode(!isCompareMode);
                     if(isCompareMode) setComparePhotoIdx(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${isCompareMode ? 'bg-cobra-primary text-white shadow-lg shadow-red-600/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <i className="ph-bold ph-arrows-split"></i>
                  {isCompareMode ? 'Cancelar Comparación' : 'Comparar Evidencia'}
                </button>
                <div className="w-px h-6 bg-white/10 mx-2"></div>
                <button className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-black flex items-center gap-2 hover:bg-white/20 transition-all">
                  <i className="ph-bold ph-download-simple text-lg"></i>
                  Descargar
                </button>
             </div>
          </div>

          {/* Main Stage */}
          <div className="flex-1 w-full flex items-center justify-center p-8 relative overflow-hidden">
             
             {/* Not In Compare Mode OR Compare Mode without 2nd photo selected */}
             {(!isCompareMode || (isCompareMode && comparePhotoIdx === null)) && (
               <div className="relative w-full max-w-6xl max-h-full flex items-center justify-center">
                  <img 
                    src={MOCK_PHOTOS[currentPhotoIdx].url} 
                    alt={MOCK_PHOTOS[currentPhotoIdx].name} 
                    className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500"
                  />
                  {/* Arrows overlay for base photo */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 w-full max-w-7xl mx-auto z-10 pointer-events-none">
                    <button 
                      className={`pointer-events-auto w-12 h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-cobra-primary transition-colors shadow-lg ${currentPhotoIdx === 0 ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                      onClick={(e) => { e.stopPropagation(); if(currentPhotoIdx > 0) setCurrentPhotoIdx(prev => prev - 1); }}
                    >
                      <i className="ph-bold ph-caret-left text-xl"></i>
                    </button>
                    <button 
                      className={`pointer-events-auto w-12 h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-cobra-primary transition-colors shadow-lg ${currentPhotoIdx === MOCK_PHOTOS.length - 1 ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                      onClick={(e) => { e.stopPropagation(); if(currentPhotoIdx < MOCK_PHOTOS.length - 1) setCurrentPhotoIdx(prev => prev + 1); }}
                    >
                      <i className="ph-bold ph-caret-right text-xl"></i>
                    </button>
                  </div>
                  {isCompareMode && comparePhotoIdx === null && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl rounded-2xl border-2 border-dashed border-white/30 animate-pulse">
                        <div className="bg-slate-900/90 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-white/10">
                           <i className="ph-fill ph-hand-pointing text-2xl text-cobra-primary"></i>
                           <span className="font-bold text-sm">Selecciona una imagen en la parte inferior para comparar</span>
                        </div>
                     </div>
                  )}
               </div>
             )}

             {/* Compare Mode Active (Split View) */}
             {isCompareMode && comparePhotoIdx !== null && (
                <div className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl select-none group border border-white/10">
                   {/* Background Image (Current) */}
                   <img 
                      src={MOCK_PHOTOS[currentPhotoIdx].url} 
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                      alt="Base" 
                   />
                   
                   {/* Overlay Image (Compare) with Clip Path */}
                   <div 
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                   >
                      <img 
                         src={MOCK_PHOTOS[comparePhotoIdx].url} 
                         className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                         alt="Compare" 
                      />
                   </div>

                   {/* Splitter Line & Handle */}
                   <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                      style={{ left: `${sliderPosition}%` }}
                   >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl text-slate-900 ring-4 ring-black/10 transition-transform group-hover:scale-110">
                         <i className="ph-bold ph-arrows-left-right text-lg"></i>
                      </div>
                   </div>

                   {/* Invisible native range slider to control the position smoothly */}
                   <input 
                      type="range" 
                      min="0" max="100" 
                      value={sliderPosition} 
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
                   />

                   {/* Badges for context */}
                   <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl text-white pointer-events-none shadow-lg border border-white/10 flex flex-col">
                      <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">Imagen B</span>
                      <span className="text-xs font-bold mt-0.5">{MOCK_PHOTOS[comparePhotoIdx].date}</span>
                   </div>
                   <div className="absolute top-6 right-6 z-10 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl text-white pointer-events-none shadow-lg border border-white/10 flex flex-col text-right">
                      <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">Imagen A (Base)</span>
                      <span className="text-xs font-bold mt-0.5">{MOCK_PHOTOS[currentPhotoIdx].date}</span>
                   </div>
                </div>
             )}

          </div>

          {/* Thumbnail Strip Footer */}
          <div className="bg-slate-900/80 border-t border-white/10 p-6 relative z-20">
             
             {/* Dots Navigation (Only visible when not comparing) */}
             {!isCompareMode && (
                <div className="flex justify-center gap-2 mb-4">
                   {MOCK_PHOTOS.map((_, idx) => (
                      <button 
                         key={idx} 
                         onClick={() => setCurrentPhotoIdx(idx)}
                         className={`h-1.5 rounded-full transition-all duration-300 ${currentPhotoIdx === idx ? 'w-6 bg-cobra-primary' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
                      />
                   ))}
                </div>
             )}

             <div className="flex items-center justify-center gap-4 overflow-x-auto hide-scrollbar max-w-7xl mx-auto">
                {MOCK_PHOTOS.map((photo, idx) => {
                   // Logic to highlight thumbnails based on mode
                   const isBasePhoto = currentPhotoIdx === idx;
                   const isCompareTarget = comparePhotoIdx === idx;
                   
                   let containerClass = "border-transparent opacity-50 hover:opacity-100 hover:border-white/30";
                   if (isBasePhoto) {
                      containerClass = "border-cobra-primary opacity-100 ring-2 ring-cobra-primary/30";
                   } else if (isCompareMode && isCompareTarget) {
                      containerClass = "border-emerald-400 opacity-100 ring-2 ring-emerald-400/30";
                   }

                   return (
                      <div 
                         key={photo.id}
                         onClick={() => {
                            if (!isCompareMode) {
                               setCurrentPhotoIdx(idx);
                            } else {
                               // En modo comparar, si toca la base, no hace nada (o cambia la base), pero la UX normal es:
                               // Eliges la segunda foto para comparar
                               if(!isBasePhoto) setComparePhotoIdx(idx);
                            }
                         }}
                         className={`w-24 h-16 shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 relative ${containerClass}`}
                      >
                         <img src={photo.url} className="w-full h-full object-cover" alt="thumb" />
                         
                         {isBasePhoto && (
                            <div className="absolute inset-x-0 bottom-0 bg-cobra-primary text-white text-[8px] font-black uppercase text-center py-0.5">
                               Base
                            </div>
                         )}
                         {(isCompareMode && isCompareTarget) && (
                            <div className="absolute inset-x-0 bottom-0 bg-emerald-500 text-white text-[8px] font-black uppercase text-center py-0.5">
                               Vs
                            </div>
                         )}
                      </div>
                   )
                })}
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvanceReportDetail;
