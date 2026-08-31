const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

// 1. Add Gantt Modal state
if(!content.includes('isGanttOpen')) {
  content = content.replace(
    'const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});',
    `const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});
  const [isGanttOpen, setIsGanttOpen] = useState(false);`
  );
}

// 2. Add Simulated Advance Calculation
content = content.replace(
  /const renderActivitiesStep = \(\) => \(/,
  `const renderActivitiesStep = () => {
     // Calcular simulado
     const baseTotal = 42.5; // Supongamos que 42.5 es el actual del proyecto
     const simulatedTotal = baseTotal + reportData.activities.reduce((acc, phase) => {
         return acc + (phase.children?.reduce((sum, act) => {
            const val = reportValues[act.id] || 0;
            return sum + (val * act.weight / 100);
         }, 0) || 0);
     }, 0);

     return (`
);

// We need to replace the static "45.2%" with `{simulatedTotal.toFixed(2)}%`
content = content.replace(
  /<span className="text-xl font-mono font-black text-emerald-600">45\.2% <span className="text-sm text-emerald-600\/50 font-sans font-bold">Simulado<\/span><\/span>/,
  `<span className="text-xl font-mono font-black text-emerald-600">{simulatedTotal.toFixed(2)}% <span className="text-sm text-emerald-600/50 font-sans font-bold">Simulado</span></span>`
);

// 3. Replace Ingreso Manual bar with Gantt button
const oldBarRegex = /<div className="flex items-center justify-between bg-slate-200\/50 p-2 rounded-xl mb-4">[\s\S]*?<\/select>\n              <\/div>\n           <\/div>/;

const newBar = `<div className="flex items-center justify-between bg-slate-200/50 p-2 rounded-xl mb-4">
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
           </div>`;

content = content.replace(oldBarRegex, newBar);

// We must remember to close the renderActivitiesStep bracket.
content = content.replace(
  /\n  \);/,
  `
  );
}`
);

// 4. Add the Gantt Modal markup inside the return statement of AdvanceReportDetail
const ganttModalMarkup = `{/* Modal de Gantt */}
      {isGanttOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-cobra-slate/80 backdrop-blur-sm" onClick={() => setIsGanttOpen(false)}></div>
           <div className="relative w-full max-w-[95vw] h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
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
                                            style={{ left: \`\${startOffset + 20}px\`, width: \`\${durationPx}px\` }}
                                         >
                                            <div className="absolute inset-y-0 left-0 bg-cobra-primary transition-all duration-300" style={{ width: \`\${totalPercent}%\` }}></div>
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
      )}`;

// We need to insert this modal before the final `</>` in AdvanceReportDetail
content = content.replace(
  /\{\/\* Visualizador Inmersivo y Comparador \(Modal\) \*\/\}/,
  `${ganttModalMarkup}\n      {/* Visualizador Inmersivo y Comparador (Modal) */}`
);

fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
