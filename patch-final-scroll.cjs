const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

// 1. Move simulatedTotal calculation up
const oldSimBlock = `const renderActivitiesStep = () => {
     // Calcular simulado
     const baseTotal = 42.5; // Supongamos que 42.5 es el actual del proyecto
     const simulatedTotal = baseTotal + reportData.activities.reduce((acc, phase) => {
         return acc + (phase.children?.reduce((sum, act) => {
            const val = reportValues[act.id] || 0;
            return sum + (val * act.weight / 100);
         }, 0) || 0);
     }, 0);

     return (`

content = content.replace(oldSimBlock, `const renderActivitiesStep = () => {
     return (`);

content = content.replace(
  `const togglePhase = (id: string) => {
     setCollapsedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };`,
  `const togglePhase = (id: string) => {
     setCollapsedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const baseTotal = 42.5;
  const simulatedTotal = baseTotal + reportData.activities.reduce((acc, phase) => {
      return acc + (phase.children?.reduce((sum, act) => {
         const val = reportValues[act.id] || 0;
         return sum + (val * act.weight / 100);
      }, 0) || 0);
  }, 0);`
);


// 2. Fix handleWheel and handleTouchMove
content = content.replace(
  /const handleWheel = \(e: React\.WheelEvent\) => \{[\s\S]*?changeStep\('up'\);\n  \};/,
  `const handleWheel = (e: React.WheelEvent) => {
     if (viewerOpen || isGanttOpen) return;
     const currentTarget = e.currentTarget as HTMLElement;
     // Add 1px buffer to handle subpixel rounding
     const isAtBottom = Math.ceil(currentTarget.scrollTop + currentTarget.clientHeight) >= currentTarget.scrollHeight - 1;
     const isAtTop = currentTarget.scrollTop <= 1;

     if (e.deltaY > 30 && isAtBottom) {
        changeStep('down');
     } else if (e.deltaY < -30 && isAtTop) {
        changeStep('up');
     }
  };`
);

content = content.replace(
  /const handleTouchMove = \(e: React\.TouchEvent\) => \{[\s\S]*?\} else if \(diff < -20\) \{\n        changeStep\('up'\);\n        setTouchStartY\(null\);\n     \}\n  \};/,
  `const handleTouchMove = (e: React.TouchEvent) => {
     if (viewerOpen || isGanttOpen || touchStartY === null) return;
     const currentY = e.touches[0].clientY;
     const diff = touchStartY - currentY;
     
     const currentTarget = e.currentTarget as HTMLElement;
     const isAtBottom = Math.ceil(currentTarget.scrollTop + currentTarget.clientHeight) >= currentTarget.scrollHeight - 1;
     const isAtTop = currentTarget.scrollTop <= 1;

     if (diff > 40 && isAtBottom) {
        changeStep('down');
        setTouchStartY(null);
     } else if (diff < -40 && isAtTop) {
        changeStep('up');
        setTouchStartY(null);
     }
  };`
);

// 3. Update main scroll wrapper
content = content.replace(
  '<div className="flex-1 w-full overflow-hidden" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>',
  '<div className="flex-1 w-full overflow-y-auto custom-scrollbar relative px-2" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>'
);

content = content.replace(
  /className=\{\`w-full h-full animate-in fade-in/g,
  'className={`w-full min-h-full pb-10 animate-in fade-in'
);

// 4. Update activities step
content = content.replace(
  '<div className="w-full flex flex-col h-full overflow-y-auto custom-scrollbar prevent-step-scroll pr-2 relative">',
  '<div className="w-full flex flex-col min-h-full pb-8">'
);

content = content.replace(
  '<div className="shrink-0 bg-slate-100/90 backdrop-blur-md z-30 pb-4 sticky top-0">',
  '<div className="shrink-0 bg-[#f1f5f9]/95 backdrop-blur-md z-30 pb-4 sticky top-0 pt-4 -mt-4">'
);

const oldSimBlockHTML = `<div className="flex flex-col md:items-end gap-1.5 p-4 rounded-xl border border-cobra-primary/20 bg-red-50/50">
                 <span className="text-[10px] font-black uppercase text-cobra-primary tracking-widest">Avance Físico Proyecto (Simulado)</span>
                 <div className="flex items-center gap-4">
                    <span className="text-xl font-mono font-black text-slate-800">42.5% <span className="text-sm text-slate-400 font-sans font-bold">Total</span></span>
                    <i className="ph-bold ph-arrow-right text-slate-300"></i>
                    <span className="text-xl font-mono font-black text-emerald-600">{simulatedTotal.toFixed(2)}% <span className="text-sm text-emerald-600/50 font-sans font-bold">Simulado</span></span>
                 </div>
              </div>`;

const newSimBlockHTML = `<div className="flex flex-col md:items-end gap-1.5 p-4 rounded-xl border border-cobra-primary/20 bg-red-50/50">
                 <span className="text-[10px] font-black uppercase text-cobra-primary tracking-widest">Avance Físico Proyecto</span>
                 <div className="flex items-center gap-4">
                    <span className="text-xl font-mono font-black text-slate-800">45.0% <span className="text-sm text-slate-400 font-sans font-bold">Debería Ir</span></span>
                    <i className="ph-bold ph-arrow-right text-slate-300"></i>
                    <span className="text-xl font-mono font-black text-emerald-600">{simulatedTotal.toFixed(2)}% <span className="text-sm text-emerald-600/50 font-sans font-bold">Avance a reportar</span></span>
                 </div>
              </div>`;

content = content.replace(oldSimBlockHTML, newSimBlockHTML);

// 5. Update Gantt Modal
const oldGanttHeader = `<div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                       <i className="ph-fill ph-kanban text-2xl"></i>
                    </div>
                    <div>
                       <h2 className="text-xl font-black text-cobra-text-main">Diagrama de Gantt - Ingreso de Avance</h2>
                       <p className="text-sm font-medium text-slate-500">Visualiza el cronograma y reporta avance directamente.</p>
                    </div>
                 </div>
                 <button onClick={() => setIsGanttOpen(false)} className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-all shadow-sm">
                    <i className="ph-bold ph-x text-lg"></i>
                 </button>
              </div>`;

const newGanttHeader = `<div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0 gap-6">
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
              </div>`;

content = content.replace(oldGanttHeader, newGanttHeader);

fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
