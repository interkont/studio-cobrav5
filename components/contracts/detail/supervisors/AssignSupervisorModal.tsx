
import React, { useState, useEffect } from 'react';
import { SUPPORT_AREAS_CONFIG } from '../../../../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode: 'supervisor' | 'support';
  area?: string;
}

const AssignSupervisorModal: React.FC<Props> = ({ isOpen, onClose, mode, area }) => {
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && mode === 'support' && area) {
      setSelectedAreas([area]);
    } else {
      setSelectedAreas([]);
    }
  }, [isOpen, mode, area]);

  if (!isOpen) return null;

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const toggleArea = (id: string) => {
    // Si es el área actual, no dejamos desmarcarla (regla del tab activo)
    if (mode === 'support' && id === area) return;
    
    setSelectedAreas(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert(`Asignación de ${mode === 'supervisor' ? 'Supervisor' : 'Apoyo'} realizada con éxito.`);
      setStep(1);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cobra-slate/80 backdrop-blur-md animate-in fade-in" onClick={isSaving ? undefined : onClose}></div>
      <div className="bg-white rounded-[3rem] w-full max-w-3xl relative z-10 shadow-3xl overflow-hidden animate-in zoom-in duration-300">
        
        {/* Cabecera Modal */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-cobra-text-main flex items-center gap-3 tracking-tighter uppercase">
              <i className={`ph ${mode === 'supervisor' ? 'ph-user-gear' : 'ph-users-four'} text-cobra-primary text-2xl`}></i>
              Gestión {mode === 'supervisor' ? 'Supervisores' : `Apoyos`}
            </h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Trámite de Designación Administrativa</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
            <i className="ph ph-x font-bold text-slate-400 text-xl"></i>
          </button>
        </div>

        {/* Indicador de Pasos */}
        <div className="flex bg-slate-50 border-b border-slate-100">
          <button className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${step === 1 ? 'border-cobra-primary text-cobra-primary bg-white' : 'border-transparent text-slate-400'}`}>
            1. Selección de Perfiles
          </button>
          <button className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${step === 2 ? 'border-cobra-primary text-cobra-primary bg-white' : 'border-transparent text-slate-400'}`}>
            2. Documento de Designación
          </button>
        </div>

        <div className="p-10 min-h-[450px]">
          {step === 1 ? (
            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-left-4 duration-300">
              
              {mode === 'support' && (
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200/50">
                   <p className="text-[11px] font-black text-cobra-text-secondary uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <span className="w-8 h-px bg-red-500"></span> TIPOS DE APOYO A GESTIONAR:
                   </p>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {SUPPORT_AREAS_CONFIG.map(sArea => (
                         <div 
                           key={sArea.id} 
                           onClick={() => toggleArea(sArea.id)}
                           className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                             selectedAreas.includes(sArea.id) 
                             ? 'bg-white border-cobra-primary shadow-lg shadow-red-500/5' 
                             : 'bg-slate-100 border-transparent text-slate-400 grayscale'
                           }`}
                         >
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                              selectedAreas.includes(sArea.id) ? 'bg-cobra-primary text-white' : 'bg-slate-200'
                            }`}>
                               {selectedAreas.includes(sArea.id) && <i className="ph ph-check font-bold text-xs"></i>}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-tight leading-none ${selectedAreas.includes(sArea.id) ? 'text-cobra-text-main' : ''}`}>{sArea.label}</span>
                         </div>
                      ))}
                   </div>
                   <p className="text-[10px] text-slate-400 font-medium mt-4 italic">* El profesional aparecerá en los tabs de cada área seleccionada.</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <ModalField label="Seleccione quien designa" icon="ph-user-focus">
                    <select className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-cobra-primary">
                        <option>Leonidas Name</option>
                        <option>Carlos Carrillo (Director)</option>
                    </select>
                  </ModalField>
                  <ModalField label="Seleccione quien informa" icon="ph-megaphone">
                    <select className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-cobra-primary">
                        <option>Michael Oyuela Vargas</option>
                        <option>Secretaria General</option>
                    </select>
                  </ModalField>
                  <ModalField label={`Nuevo ${mode === 'supervisor' ? 'Supervisor' : 'Apoyo'} a asignar`} icon="ph-user-plus">
                    <select className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-cobra-primary">
                        <option>Carmen Sofia Bonilla</option>
                        <option>Michael Oyuela Vargas</option>
                        <option>Alethia Carolina Arango Gil</option>
                    </select>
                  </ModalField>
                </div>
                <div className="space-y-6">
                  <ModalField label="Fecha Inicio Nuevo Periodo" icon="ph-calendar">
                    <input type="date" value="2026-02-20" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none" />
                  </ModalField>
                  <ModalField label="Etapa de Designación" icon="ph-path">
                      <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
                        <button className="flex-1 py-2.5 bg-white rounded-xl text-[10px] font-black text-cobra-slate shadow-sm border border-slate-200">EJECUCIÓN</button>
                        <button className="flex-1 py-2.5 rounded-xl text-[10px] font-black text-slate-400">LIQUIDACIÓN</button>
                      </div>
                  </ModalField>
                  <ModalField label="Observaciones" icon="ph-chat-text">
                    <textarea rows={3} className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-medium italic resize-none outline-none focus:bg-white" placeholder="Justifique el cambio de profesional..." />
                  </ModalField>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm">
                        <i className="ph ph-file-pdf text-3xl"></i>
                     </div>
                     <div>
                        <h4 className="text-[13px] font-black text-cobra-text-main uppercase tracking-tight">Formato de Delegación Prediligenciado</h4>
                        <p className="text-[11px] text-slate-400 font-medium">Documento generado con los datos del trámite.</p>
                     </div>
                  </div>
                  <button className="px-5 py-2.5 bg-cobra-slate text-white rounded-xl text-[10px] font-black hover:bg-black transition-all flex items-center gap-2">
                     <i className="ph ph-download-simple"></i> DESCARGAR
                  </button>
               </div>
               <div className="p-16 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:border-cobra-primary hover:bg-white transition-all">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 group-hover:text-cobra-primary shadow-sm group-hover:shadow-lg transition-all">
                     <i className="ph ph-cloud-arrow-up text-5xl"></i>
                  </div>
                  <div>
                     <p className="text-base font-black text-cobra-text-main">Cargar Designación Firmada</p>
                     <p className="text-[11px] text-slate-400 font-medium max-w-xs mx-auto">Seleccione el PDF firmado para que el nuevo {mode} pueda iniciar operaciones.</p>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          {step === 2 ? (
            <button onClick={handleBack} className="px-8 py-3 bg-white border border-slate-200 text-slate-400 rounded-2xl text-[11px] font-black hover:bg-slate-100 transition-all uppercase tracking-widest">
              Atrás
            </button>
          ) : <div></div>}
          <div className="flex gap-4">
            <button onClick={onClose} className="px-8 py-3 text-slate-400 rounded-2xl text-[11px] font-black hover:bg-slate-100 transition-all uppercase tracking-widest">
              Cerrar
            </button>
            <button onClick={step === 1 ? handleNext : handleFinish} disabled={isSaving} className={`px-10 py-4 ${step === 2 ? 'bg-emerald-600' : 'bg-cobra-slate'} text-white rounded-2xl text-[11px] font-black shadow-xl transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest`}>
              {isSaving ? <i className="ph ph-circle-notch animate-spin"></i> : step === 1 ? <>Siguiente <i className="ph ph-arrow-right"></i></> : <>Finalizar <i className="ph ph-check-circle"></i></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalField: React.FC<{ label: string; icon: string; children: React.ReactNode }> = ({ label, icon, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1 flex items-center gap-2">
      <i className={`ph ${icon} text-cobra-primary`}></i>
      {label}
    </label>
    {children}
  </div>
);

export default AssignSupervisorModal;
