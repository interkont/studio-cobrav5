
import React, { useState } from 'react';
import { MOCK_CONTRACT } from '../../../../constants';

const ConfigurationView: React.FC = () => {
  const [formData, setFormData] = useState({ ...MOCK_CONTRACT });
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 z-[100] bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-10 duration-300">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ph-bold ph-check text-white"></i>
          </div>
          <div>
            <p className="font-black text-sm">¡Cambios Guardados!</p>
            <p className="text-[11px] opacity-80 font-medium">Los atributos del contrato se actualizaron con éxito.</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-black text-cobra-text-main flex items-center gap-3">
            <i className="ph ph-gear text-cobra-primary"></i>
            Configuración de Atributos
          </h2>
          <p className="text-sm text-cobra-text-secondary font-medium mt-1">Edición de metadatos y parámetros administrativos del contrato.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-4 bg-cobra-slate text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-3 disabled:bg-slate-300"
        >
          {isSaving ? <i className="ph ph-circle-notch animate-spin"></i> : <i className="ph-bold ph-floppy-disk"></i>}
          GUARDAR CAMBIOS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lado Izquierdo: Formulario Principal */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Tarjeta: Clasificación General */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest mb-6 border-b border-slate-50 pb-4">
              I. Clasificación y Generalidades
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConfigInput 
                label="Sector Administrativo" 
                value={formData.sector} 
                onChange={(v) => setFormData({...formData, sector: v})}
                icon="ph-buildings"
              />
              <ConfigInput 
                label="ID Interno / Código Cobra" 
                value={formData.internalId} 
                onChange={(v) => setFormData({...formData, internalId: v})}
                icon="ph-identification-card"
              />
              <ConfigInput 
                label="Línea de Acción" 
                value={formData.actionLine} 
                onChange={(v) => setFormData({...formData, actionLine: v})}
                icon="ph-path"
              />
              <ConfigInput 
                label="Proceso SECOP (Referencia)" 
                value={formData.secopProcess || ''} 
                onChange={(v) => setFormData({...formData, secopProcess: v})}
                icon="ph-hash"
              />
            </div>
          </div>

          {/* Tarjeta: Gestión Humana y Supervisión */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest mb-6 border-b border-slate-50 pb-4">
              II. Gestión y Supervisión
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConfigInput 
                label="Supervisor Asignado" 
                value={formData.supervisor} 
                onChange={(v) => setFormData({...formData, supervisor: v})}
                icon="ph-user-gear"
              />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Entidad Contratante (Lectura)</label>
                <div className="relative group">
                   <input 
                    type="text" 
                    value={formData.entity}
                    readOnly
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-400 cursor-not-allowed italic"
                  />
                  <i className="ph ph-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta: Descripción */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest mb-4">
              III. Objeto del Contrato (Edición de Texto)
            </h3>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full p-6 rounded-3xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-cobra-primary transition-all outline-none text-sm font-medium leading-relaxed italic text-cobra-text-main resize-none"
            />
          </div>
        </div>

        {/* Lado Derecho: Bloqueados y Alertas */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-amber-50 rounded-[2rem] border border-amber-200 p-8 sticky top-24">
            <div className="w-12 h-12 bg-amber-200 text-amber-700 rounded-2xl flex items-center justify-center mb-6">
              <i className="ph-bold ph-shield-warning text-2xl"></i>
            </div>
            <h3 className="text-lg font-black text-amber-900 leading-tight">Campos Críticos Bloqueados</h3>
            <p className="text-[13px] text-amber-700 font-medium mt-3 leading-relaxed">
              Por seguridad e integridad de datos, los atributos que afectan la **vigencia** o el **valor económico** no pueden editarse directamente desde aquí.
            </p>
            
            <div className="mt-8 space-y-4">
               <LockedField label="Valor Total" value={`$ ${new Intl.NumberFormat('es-CO').format(formData.totalValue)}`} />
               <LockedField label="Fecha de Inicio" value={formData.commencementDate} />
               <LockedField label="Fecha de Terminación" value={formData.endDate} />
            </div>

            <div className="mt-10 p-5 bg-white/50 rounded-2xl border border-amber-200">
               <p className="text-[11px] font-bold text-amber-800 uppercase tracking-tight">¿Necesita cambiar estos valores?</p>
               <p className="text-[12px] text-amber-700 mt-1">Debe iniciar un proceso formal de Adición o Prórroga.</p>
               <button className="mt-4 w-full py-3 bg-amber-600 text-white rounded-xl text-xs font-black hover:bg-amber-700 transition-all flex items-center justify-center gap-2">
                 IR A GESTIÓN DE CAMBIOS <i className="ph ph-arrow-right"></i>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfigInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; icon: string }> = ({ label, value, onChange, icon }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
    <div className="relative group">
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-cobra-primary focus:bg-white transition-all outline-none text-sm font-bold text-cobra-text-main shadow-inner focus:shadow-xl focus:shadow-red-500/5"
        placeholder={`Ingrese ${label.toLowerCase()}...`}
      />
      <i className={`ph ${icon} absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cobra-primary transition-colors text-xl`}></i>
    </div>
  </div>
);

const LockedField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-amber-200/50">
    <span className="text-[11px] font-black text-amber-800/60 uppercase">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm font-black text-amber-900">{value}</span>
      <i className="ph ph-lock text-amber-400 text-xs"></i>
    </div>
  </div>
);

export default ConfigurationView;
