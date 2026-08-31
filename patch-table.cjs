const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

const tableRegex = /<div className="overflow-auto max-h-\[500px\] w-full bg-slate-50 flex-1 custom-scrollbar prevent-step-scroll">[\s\S]*?<\/table>\s*<\/div>/;

const newLayout = `<div className="overflow-auto max-h-[500px] w-full bg-slate-50/50 flex-1 custom-scrollbar prevent-step-scroll p-4 md:p-6">
             <div className="flex flex-col gap-6 w-full pb-10">
                {reportData.activities.map(phase => (
                   <div key={phase.id} className="flex flex-col gap-3">
                      <div className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-200/70 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] flex items-center gap-3">
                         <div className="w-6 h-6 rounded-md bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                            <i className="ph-bold ph-caret-down text-slate-400 text-xs"></i>
                         </div>
                         <h4 className="font-black text-cobra-slate text-sm">{phase.name}</h4>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                         {phase.children?.map(act => (
                            <div key={act.id} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden hover:border-slate-300 transition-colors group">
                               {/* Header: Name and ID */}
                               <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-start justify-between gap-4">
                                  <div className="flex flex-col gap-1.5 flex-1">
                                     <span className="font-bold text-slate-700 text-sm leading-snug">{act.name}</span>
                                     <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500 font-mono">
                                        <span className="bg-slate-200/60 px-2 py-0.5 rounded-md text-slate-600 font-bold">{act.id.toUpperCase()}</span>
                                        <span className="flex items-center gap-1 bg-white border border-slate-200/70 px-2 py-0.5 rounded-md shadow-sm"><i className="ph-bold ph-calendar-blank"></i> {act.start} - {act.end}</span>
                                     </div>
                                  </div>
                                  <div className="flex flex-col items-start md:items-end gap-1.5">
                                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avance Anterior</span>
                                     <div className="flex items-center gap-3 w-full md:w-auto">
                                        <div className="w-32 md:w-24 h-2 bg-slate-100 rounded-full overflow-hidden flex-1 md:flex-none">
                                           <div className="h-full bg-blue-500 rounded-full" style={{ width: \`\${act.execPercent}%\` }}></div>
                                        </div>
                                        <span className="font-black text-blue-600 font-mono text-sm">{act.execPercent}%</span>
                                     </div>
                                  </div>
                               </div>
                               
                               {/* Body: Metrics Grid */}
                               <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4 items-center">
                                  {/* Column 1: Prog vs Ejec quantities */}
                                  <div className="flex flex-col gap-2.5">
                                     <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-400 font-bold">Prog.</span>
                                        <span className="font-mono font-bold text-slate-600">{act.progQty.toFixed(2)} <span className="text-[9px] font-sans font-bold text-slate-400 bg-slate-100 px-1 py-0.5 rounded ml-1">{act.unit}</span></span>
                                     </div>
                                     <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-400 font-bold">Ejec.</span>
                                        <span className="font-mono font-bold text-slate-600">{act.execQty.toFixed(2)} <span className="text-[9px] font-sans font-bold text-slate-400 bg-slate-100 px-1 py-0.5 rounded ml-1">{act.unit}</span></span>
                                     </div>
                                  </div>
                                  
                                  {/* Column 2: Prog vs Ejec values */}
                                  <div className="flex flex-col gap-2.5">
                                     <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-400 font-bold">V. Prog.</span>
                                        <span className="font-mono font-bold text-slate-600">\${act.progVal.toLocaleString()}</span>
                                     </div>
                                     <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-400 font-bold">V. Ejec.</span>
                                        <span className="font-mono font-bold text-slate-600">\${act.execVal.toLocaleString()}</span>
                                     </div>
                                  </div>
                                  
                                  {/* Column 3: Weights */}
                                  <div className="flex flex-col justify-center h-full">
                                     <div className="flex justify-between items-center text-xs bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">
                                        <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">Peso</span>
                                        <span className="font-mono font-black text-slate-700">{act.weight}%</span>
                                     </div>
                                  </div>
                                  
                                  {/* Column 4 (or 4 & 5): Input area */}
                                  <div className="col-span-2 md:col-span-4 lg:col-span-2 bg-emerald-50/50 rounded-xl border border-emerald-100 p-3 flex flex-row items-center justify-between gap-4 mt-2 md:mt-0 lg:ml-auto md:w-full lg:w-auto">
                                     <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest hidden sm:block">% A REPORTAR</span>
                                     <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest sm:hidden">REPORTAR</span>
                                     <div className="relative flex items-center">
                                        <input
                                           type="number"
                                           defaultValue={act.advance}
                                           className="w-[100px] sm:w-[120px] min-h-[36px] pl-3 pr-8 py-1.5 text-right bg-white border border-emerald-200 rounded-lg shadow-sm text-emerald-700 font-black font-mono text-base focus:border-cobra-primary focus:ring-4 focus:ring-red-50 outline-none transition-all hover:border-emerald-300"
                                        />
                                        <span className="absolute right-3 text-emerald-500 font-bold">%</span>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                ))}
             </div>
           </div>`;

if(tableRegex.test(content)) {
  content = content.replace(tableRegex, newLayout);
  fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
  console.log('Table patched successfully!');
} else {
  console.log('Table not found or already patched.');
}
