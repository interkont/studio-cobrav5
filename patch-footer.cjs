const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

const oldFooterStart = '<div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end items-center">';
const oldFooterBlockRegex = /<div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end items-center">[\s\S]*?\{labels\.BTN_FINISH\}\n\s*<\/button>\n\s*\)\}\n\s*<\/div>/;

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
                           className="px-8 py-3 rounded-xl bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all hover:-translate-y-0.5 flex items-center gap-2 group"
                        >
                           <i className="ph-bold ph-check text-lg"></i> {labels.BTN_FINISH}
                        </button>
                     )}
                  </div>`;

content = content.replace(oldFooterBlockRegex, newFooter);

fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
