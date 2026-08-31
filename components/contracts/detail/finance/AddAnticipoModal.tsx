
import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddAnticipoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(onClose, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cobra-slate/60 backdrop-blur-sm" onClick={isSaving ? undefined : onClose}></div>
      <div className="bg-white rounded-3xl w-full max-xl relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black text-emerald-700 flex items-center gap-2">
            <i className={`ph ph-hand-coins ${isSuccess ? 'text-green-500' : 'text-emerald-600'}`}></i>
            {isSuccess ? 'Anticipo Registrado' : 'Agregar Anticipo'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
            <i className="ph ph-x font-bold text-slate-400"></i>
          </button>
        </div>

        <div className="p-8 space-y-6">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/20">
                <i className="ph-fill ph-check-circle text-6xl"></i>
              </div>
              <h4 className="text-2xl font-black text-cobra-text-main mb-2">¡Anticipo Guardado!</h4>
              <p className="text-cobra-text-secondary font-medium">El registro del anticipo ha sido completado con éxito.</p>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest flex items-center gap-2">
                    <i className="ph ph-calendar text-emerald-500"></i> Fecha del Anticipo <i className="ph ph-info opacity-50"></i>
                  </label>
                  <input type="date" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all outline-none text-sm font-bold text-cobra-text-main" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest flex items-center gap-2">
                    <i className="ph ph-currency-dollar text-emerald-500"></i> Valor del Anticipo <i className="ph ph-info opacity-50"></i>
                  </label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all outline-none text-sm font-bold text-cobra-text-main" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest flex items-center gap-2">
                    <i className="ph ph-file-pdf text-emerald-500"></i> Documento de Soporte (Opcional) <i className="ph ph-info opacity-50"></i>
                  </label>
                  <div className="flex items-center gap-3">
                    <button className="px-5 py-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-black border border-emerald-100 hover:bg-emerald-100 transition-all">Seleccionar archivo</button>
                    <span className="text-xs text-slate-400 font-medium italic">Ningún archivo seleccionado</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest flex items-center gap-2">
                    <i className="ph ph-article text-emerald-500"></i> Comprobante de Egreso (Opcional) <i className="ph ph-info opacity-50"></i>
                  </label>
                  <div className="flex items-center gap-3">
                    <button className="px-5 py-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-black border border-emerald-100 hover:bg-emerald-100 transition-all">Seleccionar archivo</button>
                    <span className="text-xs text-slate-400 font-medium italic">Ningún archivo seleccionado</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSaving ? <i className="ph ph-circle-notch animate-spin text-lg"></i> : 'GUARDAR ANTICIPO'}
                </button>
                <button onClick={onClose} className="px-8 py-4 bg-slate-100 text-cobra-text-main rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAnticipoModal;
