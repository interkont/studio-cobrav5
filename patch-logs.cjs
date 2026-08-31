const fs = require('fs');

const content = `import React, { useState } from 'react';
import { ProjectData } from '../../../../types';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';

interface LogEntry {
  id: string;
  date: string;
  title: string;
  author: string;
  text: string;
  files: string[];
  type: string; // Tailwind color name like 'amber', 'emerald', 'rose', 'blue'
  category: string;
  isActiveEvent: boolean;
  isClosed?: boolean;
  closingDetails?: {
    date: string;
    comment: string;
    files: string[];
  };
}

const CATEGORIES = [
  { id: 'Administrativo', color: 'blue' },
  { id: 'Técnico', color: 'amber' },
  { id: 'SST (Seguridad)', color: 'rose' },
  { id: 'Ambiental', color: 'emerald' },
  { id: 'Social', color: 'violet' }
];

const INITIAL_LOGS: LogEntry[] = [
  { 
    id: '1', 
    date: '15 Feb 2026 • 10:30 AM', 
    title: 'Visita técnica de verificación', 
    author: 'Supervisor', 
    text: 'Se realizó visita de verificación a los predios donde se ubicarán los equipos. Se encontraron las condiciones adecuadas para iniciar el proceso de adecuación según lo estipulado en el cronograma (Etapa 1).', 
    files: ['Foto_Verificacion.jpg'], 
    type: 'amber',
    category: 'Técnico',
    isActiveEvent: true,
    isClosed: false
  },
  { 
    id: '2', 
    date: '01 Ene 2026 • 08:00 AM', 
    title: 'Firma de Acta de Inicio', 
    author: 'Sistema', 
    text: 'Se formaliza el inicio de la ejecución del proyecto con la firma del acta correspondiente por todas las partes interesadas. Los plazos del cronograma comienzan a correr a partir de esta fecha.', 
    files: [], 
    type: 'blue',
    category: 'Administrativo',
    isActiveEvent: false
  }
];

interface Props {
  data: ProjectData;
}

const ProjectLogsView: React.FC<Props> = ({ data }) => {
  const labels = PROJECT_DICTIONARY.LOGS_VIEW;
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [activeLogToClose, setActiveLogToClose] = useState<LogEntry | null>(null);

  // New Log Form State
  const [newLog, setNewLog] = useState({
    title: '',
    text: '',
    category: 'Administrativo',
    isActiveEvent: false,
    file: null as File | null
  });

  // Close Log Form State
  const [closeLog, setCloseLog] = useState({
    date: new Date().toISOString().split('T')[0],
    comment: '',
    file: null as File | null
  });

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = CATEGORIES.find(c => c.id === newLog.category);
    const newEntry: LogEntry = {
      id: Math.random().toString(36).substring(7),
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ' •'),
      title: newLog.title,
      text: newLog.text,
      author: 'Usuario Actual', // Simulated
      category: newLog.category,
      type: cat ? cat.color : 'slate',
      isActiveEvent: newLog.isActiveEvent,
      isClosed: newLog.isActiveEvent ? false : undefined,
      files: newLog.file ? [newLog.file.name] : []
    };
    setLogs([newEntry, ...logs]);
    setIsNewModalOpen(false);
    setNewLog({ title: '', text: '', category: 'Administrativo', isActiveEvent: false, file: null });
  };

  const handleCloseLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLogToClose) return;

    setLogs(logs.map(l => {
      if (l.id === activeLogToClose.id) {
        return {
          ...l,
          isClosed: true,
          closingDetails: {
            date: closeLog.date,
            comment: closeLog.comment,
            files: closeLog.file ? [closeLog.file.name] : []
          }
        };
      }
      return l;
    }));
    setIsCloseModalOpen(false);
    setActiveLogToClose(null);
    setCloseLog({ date: new Date().toISOString().split('T')[0], comment: '', file: null });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-amber-50/30">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
               <i className="ph-fill ph-notebook text-xl"></i>
             </div>
             <div>
               <h2 className="font-black text-amber-900 text-sm">{labels.TITLE}</h2>
               <p className="text-[11px] text-amber-700/70 font-medium">{labels.SUBTITLE}</p>
             </div>
          </div>
          <button 
            onClick={() => setIsNewModalOpen(true)}
            className="px-6 py-3 bg-amber-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            <i className="ph-bold ph-plus text-lg"></i> {labels.BTN_NEW_ENTRY}
          </button>
        </div>
        
        {/* Logs Timeline */}
        <div className="p-8 pb-12">
          <div className="relative border-l-2 border-slate-100 ml-4 space-y-12">
            {logs.map(log => (
              <div key={log.id} className="relative pl-10">
                {/* Timeline Dot */}
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-[5px] shadow-sm z-10" style={{ borderColor: \`var(--color-\${log.type}-500, #cbd5e1)\` }}></div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative group hover:border-slate-200 hover:shadow-md transition-all">
                  
                  {/* Categoría y Fecha */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className={\`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-\${log.type}-100 text-\${log.type}-700\`}>
                          {log.category}
                        </span>
                        <div className="text-[10px] font-bold text-slate-400">{log.date}</div>
                      </div>
                      <h3 className="text-base font-black text-cobra-slate leading-tight">{log.title}</h3>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                       <span className="px-2 py-1 bg-white border border-slate-200 text-slate-500 rounded-lg text-[10px] font-bold shadow-sm flex items-center gap-1.5">
                         <i className="ph-fill ph-user text-slate-400"></i> {log.author}
                       </span>
                    </div>
                  </div>

                  <p className="text-sm text-cobra-text-secondary leading-relaxed mb-4">
                    {log.text}
                  </p>

                  {/* Archivos Base */}
                  {log.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {log.files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <i className={\`ph-fill ph-file text-\${log.type}-500 text-base\`}></i>
                          {file}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Estado si es Evento Activo */}
                  {log.isActiveEvent && (
                     <div className="mt-4 pt-4 border-t border-slate-200/60">
                        {!log.isClosed ? (
                           <div className="flex items-center justify-between bg-orange-50 border border-orange-100 p-3 rounded-xl">
                              <div className="flex items-center gap-2 text-orange-700">
                                 <i className="ph-fill ph-warning-circle text-lg animate-pulse"></i>
                                 <div>
                                    <span className="block text-[11px] font-black uppercase tracking-wider">Evento Activo</span>
                                    <span className="text-xs font-medium opacity-80">Requiere atención o cierre.</span>
                                 </div>
                              </div>
                              <button 
                                 onClick={() => {
                                    setActiveLogToClose(log);
                                    setIsCloseModalOpen(true);
                                 }}
                                 className="px-4 py-2 bg-white border border-orange-200 text-orange-700 rounded-lg text-xs font-bold shadow-sm hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-colors"
                              >
                                 Cerrar Evento
                              </button>
                           </div>
                        ) : (
                           <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col gap-3">
                              <div className="flex items-center gap-2 text-emerald-700">
                                 <i className="ph-fill ph-check-circle text-lg"></i>
                                 <span className="text-[11px] font-black uppercase tracking-wider">Evento Cerrado</span>
                                 <span className="text-xs font-medium text-emerald-600/70 ml-auto">{log.closingDetails?.date}</span>
                              </div>
                              {log.closingDetails?.comment && (
                                 <p className="text-sm text-emerald-900/80 bg-white/50 p-3 rounded-lg border border-emerald-200/50">
                                    {log.closingDetails.comment}
                                 </p>
                              )}
                              {log.closingDetails?.files && log.closingDetails.files.length > 0 && (
                                 <div className="flex flex-wrap gap-2">
                                   {log.closingDetails.files.map((file, idx) => (
                                     <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 shadow-sm">
                                       <i className="ph-fill ph-paperclip text-emerald-500 text-base"></i>
                                       {file}
                                     </div>
                                   ))}
                                 </div>
                               )}
                           </div>
                        )}
                     </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL: Nuevo Registro */}
      {isNewModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsNewModalOpen(false)}></div>
            <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
               <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <i className="ph-fill ph-notebook text-xl"></i>
                     </div>
                     <div>
                        <h3 className="font-black text-slate-800 text-base">Nuevo Registro</h3>
                        <p className="text-xs text-slate-500 font-medium">Agrega una entrada a la bitácora del proyecto.</p>
                     </div>
                  </div>
                  <button onClick={() => setIsNewModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                     <i className="ph-bold ph-x text-lg"></i>
                  </button>
               </div>
               
               <form onSubmit={handleCreateLog} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Título del Registro</label>
                     <input 
                        type="text" 
                        required
                        value={newLog.title}
                        onChange={e => setNewLog({...newLog, title: e.target.value})}
                        placeholder="Ej. Visita de inspección..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                     />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5">
                     <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Categoría</label>
                        <div className="relative">
                           <i className="ph-fill ph-tag absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                           <select 
                              value={newLog.category}
                              onChange={e => setNewLog({...newLog, category: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer"
                           >
                              {CATEGORIES.map(c => (
                                 <option key={c.id} value={c.id}>{c.id}</option>
                              ))}
                           </select>
                           <i className="ph-bold ph-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                        </div>
                     </div>

                     <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1 tooltip-trigger">
                           ¿Es Evento Activo? 
                           <i className="ph-fill ph-info text-slate-400" title="Actívalo si este registro requiere atención o cierre posterior."></i>
                        </label>
                        <div className="h-[46px] flex items-center">
                           <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                 type="checkbox" 
                                 className="sr-only peer"
                                 checked={newLog.isActiveEvent}
                                 onChange={e => setNewLog({...newLog, isActiveEvent: e.target.checked})}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                              <span className="ml-3 text-sm font-bold text-slate-700">
                                 {newLog.isActiveEvent ? 'Sí, requiere cierre' : 'No, solo informativo'}
                              </span>
                           </label>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Descripción / Detalles</label>
                     <textarea 
                        required
                        value={newLog.text}
                        onChange={e => setNewLog({...newLog, text: e.target.value})}
                        placeholder="Escribe los detalles de la bitácora aquí..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all min-h-[120px] resize-none"
                     />
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Documento Adjunto (Opcional)</label>
                     <div className="relative overflow-hidden">
                        <input 
                           type="file" 
                           id="file-upload"
                           className="hidden"
                           onChange={e => {
                              if (e.target.files && e.target.files.length > 0) {
                                 setNewLog({...newLog, file: e.target.files[0]});
                              }
                           }}
                        />
                        <label htmlFor="file-upload" className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl p-4 cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors group text-sm font-bold text-slate-500 hover:text-amber-600">
                           <i className="ph-bold ph-upload-simple text-xl group-hover:-translate-y-1 transition-transform"></i>
                           {newLog.file ? newLog.file.name : 'Haz clic para seleccionar un archivo'}
                        </label>
                     </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end gap-3">
                     <button type="button" onClick={() => setIsNewModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 transition-colors">
                        Cancelar
                     </button>
                     <button type="submit" className="px-6 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-black shadow-md shadow-amber-600/20 hover:bg-amber-700 transition-all hover:-translate-y-0.5">
                        Crear Registro
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )}

      {/* MODAL: Cerrar Evento */}
      {isCloseModalOpen && activeLogToClose && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCloseModalOpen(false)}></div>
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
               <div className="px-6 py-5 border-b border-orange-100 flex justify-between items-center bg-orange-50/50">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                        <i className="ph-fill ph-check-circle text-xl"></i>
                     </div>
                     <div>
                        <h3 className="font-black text-orange-900 text-base">Cerrar Evento</h3>
                        <p className="text-[11px] text-orange-700/80 font-medium">Registra el cierre de este evento activo.</p>
                     </div>
                  </div>
                  <button onClick={() => setIsCloseModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-100 text-orange-500 transition-colors">
                     <i className="ph-bold ph-x text-lg"></i>
                  </button>
               </div>
               
               <form onSubmit={handleCloseLogSubmit} className="p-6 flex flex-col gap-5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                     <span className="font-bold text-slate-500">Registro original:</span>
                     <p className="font-black text-slate-800 mt-1 truncate">{activeLogToClose.title}</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Fecha de Cierre</label>
                     <input 
                        type="date" 
                        required
                        value={closeLog.date}
                        onChange={e => setCloseLog({...closeLog, date: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                     />
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Comentario de Cierre</label>
                     <textarea 
                        required
                        value={closeLog.comment}
                        onChange={e => setCloseLog({...closeLog, comment: e.target.value})}
                        placeholder="Detalla cómo se resolvió o cerró el evento..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all min-h-[100px] resize-none"
                     />
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Evidencia (Opcional)</label>
                     <div className="relative overflow-hidden">
                        <input 
                           type="file" 
                           id="file-close-upload"
                           className="hidden"
                           onChange={e => {
                              if (e.target.files && e.target.files.length > 0) {
                                 setCloseLog({...closeLog, file: e.target.files[0]});
                              }
                           }}
                        />
                        <label htmlFor="file-close-upload" className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl p-3 cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors group text-sm font-bold text-slate-500 hover:text-orange-600">
                           <i className="ph-bold ph-paperclip text-lg group-hover:-translate-y-1 transition-transform"></i>
                           {closeLog.file ? closeLog.file.name : 'Adjuntar archivo'}
                        </label>
                     </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end gap-3">
                     <button type="button" onClick={() => setIsCloseModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 transition-colors">
                        Cancelar
                     </button>
                     <button type="submit" className="px-6 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-black shadow-md shadow-orange-500/20 hover:bg-orange-600 transition-all hover:-translate-y-0.5">
                        Confirmar Cierre
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )}

    </div>
  );
};

export default ProjectLogsView;
`
fs.writeFileSync('components/projects/detail/logs/ProjectLogsView.tsx', content);
