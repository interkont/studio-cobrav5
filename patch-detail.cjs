const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

// 1. Add states
content = content.replace(
  'const [touchStartY, setTouchStartY] = useState<number | null>(null);',
  `const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [reportValues, setReportValues] = useState<Record<string, number>>({});
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});

  const handleReportValueChange = (id: string, value: string) => {
     setReportValues(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
  };

  const togglePhase = (id: string) => {
     setCollapsedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };`
);

// 2. Fix handleWheel and handleTouchMove to detect scroll limits on prevent-step-scroll
content = content.replace(
  /const handleWheel = \(e: React\.WheelEvent\) => \{[\s\S]*?changeStep\('up'\);\n  \};/,
  `const handleWheel = (e: React.WheelEvent) => {
     if (viewerOpen) return;
     const target = e.target as HTMLElement;
     const scrollContainer = target.closest('.prevent-step-scroll') as HTMLElement;
     
     if (scrollContainer) {
        const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 1;
        const isAtTop = scrollContainer.scrollTop === 0;

        if (e.deltaY > 50 && isAtBottom) {
           changeStep('down');
        } else if (e.deltaY < -50 && isAtTop) {
           changeStep('up');
        }
        return;
     }
     
     if (e.deltaY > 50) changeStep('down');
     else if (e.deltaY < -50) changeStep('up');
  };`
);

content = content.replace(
  /const handleTouchMove = \(e: React\.TouchEvent\) => \{[\s\S]*?setTouchStartY\(null\);\n     \}\n  \};/,
  `const handleTouchMove = (e: React.TouchEvent) => {
     if (viewerOpen || touchStartY === null) return;
     const currentY = e.touches[0].clientY;
     const diff = touchStartY - currentY;
     
     const target = e.target as HTMLElement;
     const scrollContainer = target.closest('.prevent-step-scroll') as HTMLElement;

     if (scrollContainer) {
        const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 1;
        const isAtTop = scrollContainer.scrollTop === 0;

        if (diff > 50 && isAtBottom) {
           changeStep('down');
           setTouchStartY(null);
        } else if (diff < -50 && isAtTop) {
           changeStep('up');
           setTouchStartY(null);
        }
        return;
     }

     if (diff > 50) {
        changeStep('down');
        setTouchStartY(null);
     } else if (diff < -50) {
        changeStep('up');
        setTouchStartY(null);
     }
  };`
);

// 3. Rewrite renderActivitiesStep entirely to meet new requirements
const renderActivitiesStepReplacement = `const renderActivitiesStep = () => (
     <div className="w-full flex flex-col h-full overflow-hidden">
        {/* Sticky Header / Simulator */}
        <div className="shrink-0 bg-slate-100/90 backdrop-blur-md z-30 pb-4">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                 <h3 className="text-2xl font-black text-cobra-slate">Avance Cuantitativo</h3>
                 <p className="text-sm text-slate-500 mt-1 font-medium">Registra el % de avance del periodo en cada actividad.</p>
              </div>
              <div className="flex flex-col md:items-end gap-1.5 p-4 rounded-xl border border-cobra-primary/20 bg-red-50/50">
                 <span className="text-[10px] font-black uppercase text-cobra-primary tracking-widest">Avance Físico Proyecto (Simulado)</span>
                 <div className="flex items-center gap-4">
                    <span className="text-xl font-mono font-black text-slate-800">42.5% <span className="text-sm text-slate-400 font-sans font-bold">Total</span></span>
                    <i className="ph-bold ph-arrow-right text-slate-300"></i>
                    <span className="text-xl font-mono font-black text-emerald-600">45.2% <span className="text-sm text-emerald-600/50 font-sans font-bold">Simulado</span></span>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center justify-between bg-slate-200/50 p-2 rounded-xl mb-4">
              <div className="flex items-center gap-4 px-3">
                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest"><i className="ph-bold ph-keyboard"></i> Ingreso Manual</span>
                 <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-cobra-primary transition-colors"><i className="ph-bold ph-microsoft-excel-logo"></i> Carga de Fórmulas</span>
              </div>
              <div className="w-px h-5 bg-slate-200"></div>
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
        <div className="overflow-y-auto flex-1 custom-scrollbar prevent-step-scroll p-2 md:p-4 rounded-2xl bg-slate-50/50 border border-slate-200/50">
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
                                         <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: \`\${totalPercent}%\` }}></div>
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
                                      <span className="font-mono font-bold text-slate-600 text-xs">\${act.progVal.toLocaleString()}</span>
                                   </div>
                                   <div className="flex justify-between items-center text-xs">
                                      <span className="text-slate-400 font-bold text-[10px] uppercase">V. Ejec.</span>
                                      <span className="font-mono font-bold text-slate-600 text-xs">\${act.execVal.toLocaleString()}</span>
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
  );`;

content = content.replace(/const renderActivitiesStep = \(\) => \([\s\S]*?\n  \);/, renderActivitiesStepReplacement);
fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
