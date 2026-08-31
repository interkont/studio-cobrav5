
import React, { useState } from 'react';
import { ScheduledPayment } from '../../../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  payment: ScheduledPayment;
}

const AddInvoiceModal: React.FC<Props> = ({ isOpen, onClose, payment }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

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
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <div>
            <h3 className="text-xl font-black text-cobra-text-main flex items-center gap-2">
              <i className={`ph ph-file-text-bold ${isSuccess ? 'text-green-500' : 'text-indigo-600'}`}></i>
              {isSuccess ? 'Vinculación Exitosa' : 'Vincular Factura Fiscal'}
            </h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Referencia Pago: {payment.id}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
            <i className="ph ph-x font-bold text-slate-400"></i>
          </button>
        </div>

        <div className="p-10 space-y-8">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-green-500/20 rotate-12">
                <i className="ph-fill ph-check-circle text-6xl"></i>
              </div>
              <h4 className="text-2xl font-black text-cobra-text-main mb-2">¡Factura Vinculada!</h4>
              <p className="text-cobra-text-secondary font-medium px-12 text-center">El pago ha cambiado a estado <b>Facturado</b> y ya es elegible para recibir abonos.</p>
            </div>
          ) : (
            <>
              {/* Resumen del Pago */}
              <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Monto a Facturar</span>
                  <span className="text-xl font-black text-indigo-900 tabular-nums">{formatCurrency(payment.scheduledValue)}</span>
                </div>
                <div className="text-right">
                   <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Fecha Programada</span>
                   <span className="text-sm font-black text-indigo-900">{payment.scheduledDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Número de Factura</label>
                  <input 
                    type="text" 
                    placeholder="Ej: FE-1092-2026"
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-sm font-bold text-cobra-text-main shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Fecha Emisión</label>
                  <input 
                    type="date" 
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-sm font-bold text-cobra-text-main shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Documento XML/PDF de Factura</label>
                <div className="w-full p-8 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer group text-center">
                   <i className="ph ph-cloud-arrow-up text-3xl text-slate-300 group-hover:text-indigo-500 transition-colors mb-2"></i>
                   <p className="text-sm font-bold text-cobra-text-main">Arrastra el archivo aquí</p>
                   <p className="text-[11px] text-slate-400 font-medium">Soporte legal obligatorio para la gestión de abonos</p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex gap-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-[1.25rem] font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSaving ? <i className="ph ph-circle-notch animate-spin text-lg"></i> : 'CONFIRMAR VINCULACIÓN'}
                </button>
                <button onClick={onClose} className="px-10 py-4 bg-slate-100 text-cobra-text-main rounded-[1.25rem] font-bold text-sm hover:bg-slate-200 transition-all">
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

export default AddInvoiceModal;
