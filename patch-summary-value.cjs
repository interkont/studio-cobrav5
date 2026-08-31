const fs = require('fs');

const path = 'components/projects/detail/summary/ProjectSummary.tsx';
let content = fs.readFileSync(path, 'utf8');

const anchor = `<InfoField icon="ph-user-gear" label={labels.SUPERVISOR} value={data.supervisor} />`;
const newValueBlock = `                  <InfoField icon="ph-user-gear" label={labels.SUPERVISOR} value={data.supervisor} />
                  
                  <div className="md:col-span-2 mt-1">
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm shadow-indigo-200/50">
                        <i className="ph-fill ph-currency-circle-dollar text-2xl"></i>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500/80 mb-0.5 block">Valor Total del Proyecto</span>
                        <span className="text-xl font-black text-indigo-950 tracking-tight">
                          {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(data.totalValue)}
                        </span>
                      </div>
                    </div>
                  </div>`;

content = content.replace(anchor, newValueBlock);

fs.writeFileSync(path, content);
