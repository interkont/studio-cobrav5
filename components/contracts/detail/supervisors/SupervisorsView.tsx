
import React, { useState, useMemo } from 'react';
import { MOCK_CONTRACT, MOCK_SUPPORT_SUPERVISORS, MOCK_SUPPORT_HISTORY, SUPPORT_AREAS_CONFIG } from '../../../../constants';
import { SupportSupervisor } from '../../../../types';
import AssignSupervisorModal from './AssignSupervisorModal';

type MainTab = 'supervisor' | 'support';

const SupervisorsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTab>('supervisor');
  const [supportArea, setSupportArea] = useState<string>(SUPPORT_AREAS_CONFIG[0].id);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Buscamos el profesional activo para el área de apoyo seleccionada (Máximo 1 según regla de negocio)
  const activeSupportProf = useMemo(() => {
    return MOCK_SUPPORT_SUPERVISORS.find(s => s.areas.includes(supportArea as any));
  }, [supportArea]);

  // Historial específico para el área seleccionada
  const filteredHistory = useMemo(() => {
    return MOCK_SUPPORT_HISTORY.filter(s => s.areas.includes(supportArea as any));
  }, [supportArea]);

  const currentAreaLabel = useMemo(() => {
    return SUPPORT_AREAS_CONFIG.find(c => c.id === supportArea)?.label || 'Apoyo';
  }, [supportArea]);

  return (
    <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      <AssignSupervisorModal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)} 
        mode={activeTab === 'support' ? 'support' : 'supervisor'}
        area={activeTab === 'support' ? supportArea : undefined}
      />

      {/* Cabecera y Navegación Principal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('supervisor')}
            className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'supervisor' ? 'bg-cobra-slate text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            Supervisor Principal
          </button>
          <button 
            onClick={() => setActiveTab('support')}
            className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'support' ? 'bg-cobra-slate text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            Apoyo a la Supervisión
          </button>
        </div>

        <button 
          onClick={() => setIsAssignModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-cobra-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
        >
          <i className="ph-bold ph-user-plus text-xl"></i>
          ASIGNAR NUEVO {activeTab === 'supervisor' ? 'SUPERVISOR' : 'APOYO'}
        </button>
      </div>

      {activeTab === 'support' && (
        /* Sub-navegación de Especialidades de Apoyo */
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 animate-in slide-in-from-top-2 duration-300">
          {SUPPORT_AREAS_CONFIG.map(area => (
            <button 
              key={area.id}
              onClick={() => setSupportArea(area.id)}
              className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all whitespace-nowrap flex items-center gap-2 ${
                supportArea === area.id 
                ? 'bg-cobra-primary border-cobra-primary text-white shadow-lg shadow-red-500/20' 
                : 'bg-white border-slate-200 text-slate-400 hover:border-cobra-primary hover:text-cobra-text-main'
              }`}
            >
              <i className={`ph ${area.icon} text-lg`}></i>
              {area.label}
            </button>
          ))}
        </div>
      )}

      {/* Vista Homologada (Principal o Apoyo) */}
      <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-4 duration-500">
        
        {/* Alerta de Documentación Faltante (Se aplica a ambos si falta el acta) */}
        {((activeTab === 'supervisor') || (activeTab === 'support' && activeSupportProf && !activeSupportProf.hasSignedAct)) && (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-[2rem] flex items-center justify-between group">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-amber-200 text-amber-700 rounded-2xl flex items-center justify-center animate-pulse">
                <i className="ph-fill ph-warning-octagon text-2xl"></i>
              </div>
              <div>
                <h4 className="text-sm font-black text-amber-900 uppercase tracking-tight">
                  Acción Requerida: Designación Pendiente en {activeTab === 'supervisor' ? 'Supervisor Principal' : `Área ${currentAreaLabel}`}
                </h4>
                <p className="text-xs text-amber-700 font-medium">No se ha cargado el documento de designación firmado para el profesional activo.</p>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-white border border-amber-300 text-amber-700 rounded-xl text-[11px] font-black hover:bg-amber-100 transition-colors flex items-center gap-2 shadow-sm">
              <i className="ph ph-upload-simple"></i> CARGAR ACTA FIRMADA
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Profesional Actual */}
          <div className="lg:col-span-8">
             {((activeTab === 'supervisor') || (activeTab === 'support' && activeSupportProf)) ? (
               <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm relative overflow-hidden h-full group">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                    <i className={`ph ${activeTab === 'supervisor' ? 'ph-user-circle-gear' : 'ph-identification-badge'} text-[15rem]`}></i>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
                    <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 border-4 border-white shadow-inner shrink-0">
                      <i className="ph ph-user text-5xl"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-black text-cobra-text-main tracking-tight">
                            {activeTab === 'supervisor' ? MOCK_CONTRACT.supervisor : activeSupportProf?.name}
                          </h3>
                          <p className="text-xs font-bold text-cobra-primary uppercase tracking-widest mt-1">
                            {activeTab === 'supervisor' ? 'Supervisor Titular' : `Profesional de Apoyo ${currentAreaLabel}`} • Etapa: Ejecución
                          </p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-100 uppercase tracking-tighter">
                          VIGENTE DESDE {activeTab === 'supervisor' ? '20/02/2025' : activeSupportProf?.startDate}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        <SupervisorDataField 
                          label={activeTab === 'supervisor' ? "Coordinador" : "Designado por"} 
                          value={activeTab === 'supervisor' ? "Andrea Lizeth Moreno Cuervo" : (activeSupportProf?.assignedBy || 'No definido')} 
                          icon="ph-identification-badge" 
                        />
                        <SupervisorDataField 
                          label={activeTab === 'supervisor' ? "Ordenador del Gasto" : "Informa a"} 
                          value={activeTab === 'supervisor' ? "Carlos Carrillo" : (activeSupportProf?.informer || 'No definido')} 
                          icon="ph-scales" 
                        />
                        <SupervisorDataField 
                          label="Correo Electrónico" 
                          value={activeTab === 'supervisor' ? "alvaro.cardenas@gestiondelriesgo.gov.co" : (activeSupportProf?.email || 'No definido')} 
                          icon="ph-envelope-simple" 
                        />
                        <SupervisorDataField 
                          label="Etapa / Gestión" 
                          value={activeTab === 'supervisor' ? "Asignado desde 25-04-2019" : `Área ${currentAreaLabel}`} 
                          icon="ph-path" 
                        />
                      </div>

                      {/* Acciones de Edición */}
                      <div className="mt-10 pt-8 border-t border-slate-50 flex gap-4">
                        <button className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
                           <i className="ph ph-pencil-simple"></i> Editar Perfil
                        </button>
                        <button className="px-6 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all flex items-center gap-2">
                           <i className="ph ph-user-minus"></i> Desvincular
                        </button>
                      </div>
                    </div>
                  </div>
               </div>
             ) : (
               /* Empty State para Apoyo sin asignar */
               <div className="bg-white rounded-[3rem] border border-slate-200 p-20 flex flex-col items-center justify-center text-center shadow-sm h-full relative overflow-hidden">
                  <i className="ph ph-users-four text-6xl text-slate-100 mb-6"></i>
                  <h3 className="text-xl font-black text-cobra-text-main uppercase mb-2">Área {currentAreaLabel} sin Asignación</h3>
                  <p className="text-slate-400 text-sm font-medium italic mb-8 max-w-sm">
                    No existe un profesional vinculado para el apoyo {currentAreaLabel.toLowerCase()} en este contrato.
                  </p>
                  <button onClick={() => setIsAssignModalOpen(true)} className="px-8 py-3 bg-cobra-slate text-white rounded-xl text-xs font-black shadow-lg">
                    ASIGNAR PROFESIONAL
                  </button>
               </div>
             )}
          </div>

          {/* Sidebar Historial Lateral (Homologado) */}
          <div className="lg:col-span-4">
            <div className="bg-cobra-slate rounded-[3rem] p-10 text-white h-full relative overflow-hidden group shadow-2xl">
              <div className="absolute -bottom-10 -right-10 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <i className="ph ph-clock-counter-clockwise text-[12rem]"></i>
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-3">
                 <span className="w-8 h-px bg-slate-500"></span> 
                 HISTORIAL {activeTab === 'supervisor' ? 'SUPERVISORES' : `APOYO ${currentAreaLabel.toUpperCase()}`}
              </h4>
              
              <div className="space-y-8 relative z-10">
                {activeTab === 'supervisor' ? (
                  <>
                    <HistoryItem 
                      name="Alvaro Alberto Cardenas" 
                      period="2019-04-25 al 2026-02-03" 
                      obs="Rotación por reestructuración de la unidad técnica." 
                    />
                    <div className="h-px bg-white/5 w-1/2"></div>
                    <HistoryItem 
                      name="Ing. Mauricio Velasquez" 
                      period="2018-01-10 al 2019-04-24" 
                      obs="Traslado a proyecto vial 4G Red del Norte." 
                    />
                  </>
                ) : (
                  filteredHistory.length > 0 ? (
                    filteredHistory.map((h, i) => (
                      <React.Fragment key={h.id}>
                        <HistoryItem 
                          name={h.name} 
                          period={`${h.startDate} al ${h.endDate}`} 
                          obs={h.observations || 'Finalización de periodo de apoyo.'} 
                        />
                        {i < filteredHistory.length - 1 && <div className="h-px bg-white/5 w-1/2"></div>}
                      </React.Fragment>
                    ))
                  ) : (
                    <div className="py-10 text-center text-slate-600 italic text-[11px] font-medium">
                       No hay registros previos en esta especialidad.
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupervisorDataField: React.FC<{ label: string; value: string; icon: string }> = ({ label, value, icon }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
      <i className={`ph ${icon} text-xl`}></i>
    </div>
    <div className="min-w-0">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">{label}</span>
      <span className="text-[13px] font-bold text-cobra-text-main leading-tight block truncate">{value}</span>
    </div>
  </div>
);

const HistoryItem: React.FC<{ name: string; period: string; obs: string }> = ({ name, period, obs }) => (
  <div className="group cursor-default">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 rounded-full bg-cobra-primary group-hover:scale-125 transition-transform"></div>
      <span className="text-[13px] font-black">{name}</span>
    </div>
    <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-tight">{period}</p>
    <p className="text-[11px] text-slate-500 italic font-medium leading-relaxed pr-6 line-clamp-2 group-hover:line-clamp-none transition-all">{obs}</p>
  </div>
);

export default SupervisorsView;
