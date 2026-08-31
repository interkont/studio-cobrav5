
import React, { useState, useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddScheduledPaymentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

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
      <div className="bg-white rounded-3xl w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black text-cobra-text-main flex items-center gap-2">
            <i className={`ph ph-calendar-plus ${isSuccess ? 'text-green-500' : 'text-indigo-600'}`}></i>
            {isSuccess ? 'Pago Programado Guardado' : 'Agregar Pago Programado'}
          </h3>
          {!isSaving && !isSuccess && (
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
              <i className="ph ph-x font-bold text-slate-400"></i>
            </button>
          )}
        </div>

        <div className="p-8 space-y-6">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/20">
                <i className="ph-fill ph-check-circle text-6xl"></i>
              </div>
              <h4 className="text-2xl font-black text-cobra-text-main mb-2">¡Pago Creado!</h4>
              <p className="text-cobra-text-secondary font-medium">La programación del pago ha sido registrada satisfactoriamente.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest flex items-center gap-2">
                    <i className="ph ph-calendar text-indigo-500"></i> Fecha Programada <i className="ph ph-info opacity-50"></i>
                  </label>
                  <input 
                    type="date" 
                    ref={dateInputRef}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-sm font-bold text-cobra-text-main"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest flex items-center gap-2">
                    <i className="ph ph-currency-dollar text-green-500"></i> Valor a Pagar <i className="ph ph-info opacity-50"></i>
                  </label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-sm font-bold text-cobra-text-main"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest flex items-center gap-2">
                    <i className="ph ph-hash text-orange-500"></i> Número de Factura (Opcional) <i className="ph ph-info opacity-50"></i>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ej: FAC-001"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-sm font-bold text-cobra-text-main"
                  />
                  <p className="text-[10px] text-slate-400 font-medium italic">Si ingresa el número de factura, el pago se creará en estado "Facturado".</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="mb-4">
                   <h4 className="text-[13px] font-black text-cobra-text-main uppercase tracking-tight">Adjuntar Documentos</h4>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50 flex flex-col md:flex-row gap-6 items-center">
                   <div className="flex-1 space-y-2 w-full">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo de Documento</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold outline-none focus:border-indigo-500 transition-all">
                         <option>Seleccione un tipo...</option>
                         <option>Factura</option>
                         <option>Acta</option>
                      </select>
                      <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 transition-colors">
                         <i className="ph ph-plus-circle font-bold"></i> Añadir Documento
                      </button>
                   </div>
                   <div className="flex-1 text-center md:text-left space-y-2 w-full">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Archivo</label>
                      <div className="flex items-center gap-3">
                         <button className="px-4 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black border border-indigo-100 hover:bg-indigo-100 transition-colors">
                           Seleccionar archivo
                         </button>
                         <span className="text-xs text-slate-400 font-medium italic">Ningún archivo seleccionado</span>
                      </div>
                   </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:bg-slate-200 disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {isSaving ? <i className="ph ph-circle-notch animate-spin text-lg"></i> : 'GUARDAR PAGO'}
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

export default AddScheduledPaymentModal;
