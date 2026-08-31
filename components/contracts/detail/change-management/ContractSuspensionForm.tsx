
import React, { useState, useMemo } from 'react';
import { ContractData } from '../../../../types';

interface Props {
  contract: ContractData;
  onBack: () => void;
}

type SuspensionType = 'suspension' | 'reinicio';

const ContractSuspensionForm: React.FC<Props> = ({ contract, onBack }) => {
  const [activeType, setActiveType] = useState<SuspensionType>('suspension');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [actNumber, setActNumber] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  // Cálculo de días de impacto (informativo)
  const daysImpact = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert(`Trámite de ${activeType === 'suspension' ? 'Suspensión' : 'Reinicio'} registrado con éxito.`);
      onBack();
    }, 2000);
  };

  return (
    <div className="p-8 max-w-[1250px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-10">
        <button onClick={onBack} className="flex items-center gap-2 text-cobra-text-secondary font-black hover:text-cobra-primary transition-colors text-xs uppercase tracking-widest">
          <i className="ph ph-arrow-left"></i> CANCELAR TRÁMITE
        </button>
        <div className="text-right">
          <h2 className="text-3xl font-black text-cobra-text-main flex items-center justify-end gap-3 uppercase tracking-tighter">
             <span className={`w-2 h-10 rounded-full ${activeType === 'suspension' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
             Suspensión y Reinicio
          </h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">SISTEMA COBRA • TRÁMITE DE CONTROL TEMPORAL</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Lado Izquierdo: Formulario */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Selector de Tipo de Novedad */}
          <div className="bg-white rounded-[3rem] p-4 border border-slate-200 shadow-sm flex gap-4">
             <button 
               onClick={() => setActiveType('suspension')}
               className={`flex-1 py-6 rounded-[2rem] flex flex-col items-center justify-center gap-2 transition-all ${activeType === 'suspension' ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
             >
                <i className={`ph-fill ph-pause-circle text-3xl`}></i>
                <span className="text-xs font-black uppercase tracking-widest">ACTA DE SUSPENSIÓN</span>
             </button>
             <button 
               onClick={() => setActiveType('reinicio')}
               className={`flex-1 py-6 rounded-[2rem] flex flex-col items-center justify-center gap-2 transition-all ${activeType === 'reinicio' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
             >
                <i className={`ph-fill ph-play-circle text-3xl`}></i>
                <span className="text-xs font-black uppercase tracking-widest">ACTA DE REINICIO</span>
             </button>
          </div>

          <Section icon="ph-calendar-blank" title={`1. Definición del Periodo de ${activeType === 'suspension' ? 'Suspensión' : 'Reinicio'}`}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Fecha de Inicio de la {activeType === 'suspension' ? 'Suspensión' : 'Novedad'}</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold outline-none focus:bg-white focus:border-indigo-600 transition-all shadow-inner" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Fecha {activeType === 'suspension' ? 'Estimada de Fin' : 'Efectiva de Reinicio'}</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold outline-none focus:bg-white focus:border-indigo-600 transition-all shadow-inner" 
                  />
                </div>

                <div className="col-span-full space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Número de Acta Modificatoria / Referencia</label>
                  <input 
                    type="text" 
                    value={actNumber}
                    onChange={(e) => setActNumber(e.target.value)}
                    placeholder="Ej: ACTA-SUS-001-2026"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold outline-none focus:bg-white focus:border-indigo-600 transition-all shadow-inner" 
                  />
                </div>
             </div>
          </Section>

          <Section icon="ph-article" title="2. Observaciones y Justificación">
             <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Causa Técnica o Legal</label>
                <textarea 
                  rows={6}
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Describa detalladamente los motivos que originan esta novedad temporal..."
                  className="w-full p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 font-medium italic text-sm outline-none focus:bg-white focus:border-indigo-600 transition-all resize-none shadow-inner"
                />
             </div>
          </Section>

          <Section icon="ph-paperclip" title="3. Soporte Documental Obligatorio">
             <div className="p-12 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:border-cobra-primary hover:bg-white transition-all">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-cobra-primary shadow-sm transition-all">
                   <i className="ph ph-cloud-arrow-up text-4xl"></i>
                </div>
                <div>
                   <p className="text-sm font-black text-cobra-text-main">Cargar Acta de {activeType === 'suspension' ? 'Suspensión' : 'Reinicio'}</p>
                   <p className="text-[11px] text-slate-400 font-medium max-w-xs mx-auto">Adjunte el documento escaneado y firmado por las partes.</p>
                </div>
             </div>
          </Section>
        </div>

        {/* Lado Derecho: Resumen de Estado */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className={`rounded-[3.5rem] p-12 shadow-2xl sticky top-24 border border-white/5 overflow-hidden transition-colors ${activeType === 'suspension' ? 'bg-amber-600' : 'bg-emerald-700'} text-white`}>
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60 mb-12 flex items-center gap-3">
                 <span className="w-10 h-px bg-white/40"></span> RESUMEN DE NOVEDAD
              </h3>
              
              <div className="space-y-10 relative z-10">
                 <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Días Fuera de Ejecución</p>
                    <span className="text-4xl font-black tabular-nums">
                      {daysImpact} Días
                    </span>
                    <p className="text-[11px] font-medium text-white/70 italic leading-snug">
                       El cronograma de actividades se verá desplazado por este periodo de tiempo una vez se registre el reinicio.
                    </p>
                 </div>

                 <div className="h-px bg-white/10 w-2/3"></div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                       <span className="font-bold opacity-60">ID Contrato</span>
                       <span className="font-black">{contract.id}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                       <span className="font-bold opacity-60">Estado Post-Trámite</span>
                       <span className="px-3 py-1 bg-white/10 rounded-full font-black text-[10px] uppercase">
                         {activeType === 'suspension' ? 'SUSPENDIDO' : 'EN EJECUCIÓN'}
                       </span>
                    </div>
                 </div>

                 <div className="pt-10">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full py-6 bg-white text-cobra-text-main rounded-[2rem] font-black text-sm hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      {isSaving ? (
                        <i className="ph ph-circle-notch animate-spin text-xl"></i>
                      ) : (
                        <>
                          <i className={`ph-fill ${activeType === 'suspension' ? 'ph-pause' : 'ph-play'} text-xl`}></i>
                          CONFIRMAR REGISTRO
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-white/50 font-medium mt-6 italic">
                       Esta operación generará un evento en la trazabilidad histórica del contrato.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white rounded-[3.5rem] p-12 border border-slate-200 shadow-sm relative group overflow-hidden">
     <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
        <i className={`ph ${icon} text-[12rem]`}></i>
     </div>
     <h3 className="text-[13px] font-black text-cobra-text-main uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
       <div className="w-12 h-12 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
          <i className={`ph-fill ${icon} text-2xl`}></i>
       </div>
       {title}
     </h3>
     <div className="relative z-10">{children}</div>
  </div>
);

export default ContractSuspensionForm;
