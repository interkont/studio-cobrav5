const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

// 1. Remove handleWheel, handleTouchStart, handleTouchMove
content = content.replace(/const handleWheel = \(e: React\.WheelEvent\) => \{[\s\S]*?const handleTouchMove = \(e: React\.TouchEvent\) => \{[\s\S]*?\} else if \(diff < -40 && isAtTop\) \{\n        changeStep\('up'\);\n        setTouchStartY\(null\);\n     \}\n  \};\n/g, '');

// 2. Change the root container
content = content.replace(
  '<div className="bg-slate-100 -m-8 p-6 lg:px-12 xl:px-20 lg:py-10 flex flex-col h-[calc(100vh-64px)] overflow-hidden">',
  '<div className="bg-slate-100 -m-8 p-6 lg:px-12 xl:px-20 lg:py-10 flex flex-col min-h-[calc(100vh-64px)] overflow-visible">'
);

// 3. Make sidebar self-start
content = content.replace(
  '<div className="w-full lg:w-72 shrink-0 flex flex-col gap-2 lg:sticky top-8">',
  '<div className="w-full lg:w-72 shrink-0 flex flex-col gap-2 lg:sticky top-8 self-start">'
);

// 4. Update Lienzo Principal
content = content.replace(
  '<div className="flex-1 w-full bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-6 lg:p-10 min-w-0 flex flex-col h-[70vh] min-h-[550px] max-h-[800px] relative">',
  '<div className="flex-1 w-full bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-6 lg:p-10 min-w-0 flex flex-col min-h-[550px] relative">'
);

// 5. Update inner wrapper
content = content.replace(
  '<div className="flex-1 w-full overflow-y-auto custom-scrollbar relative px-2" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>',
  '<div className="flex-1 w-full relative px-2">'
);

// 6. Update footer to use real buttons
const oldFooter = `<div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end items-center">
                     {activeStep < STEPS.length - 1 ? (
                        <div className="flex items-center gap-2 text-slate-400 animate-pulse bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100">
                           <span className="text-[10px] font-black uppercase tracking-widest">Desliza para continuar</span>
                           <i className="ph-bold ph-mouse-simple text-xl"></i>
                        </div>
                     ) : (
                        <button 
                           onClick={onClose}
                           className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                        >
                           <i className="ph-bold ph-check-circle text-sm"></i> Guardar Avance
                        </button>
                     )}
                  </div>`;

const newFooter = `<div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end items-center">
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
                           className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                        >
                           <i className="ph-bold ph-check-circle text-sm"></i> Guardar Avance
                        </button>
                     )}
                  </div>`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
