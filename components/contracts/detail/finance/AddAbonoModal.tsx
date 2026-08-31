
import React, { useState } from 'react';
import { ScheduledPayment } from '../../../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  payment: ScheduledPayment;
}

const AddAbonoModal: React.FC<Props> = ({ isOpen, onClose, payment }) => {
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
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-teal-700 flex items-center gap-2">
              <i className={`ph ph-money-wavy ${isSuccess ? 'text-green-500' : 'text-teal-600'}`}></i>
              {isSuccess ? 'Abono Registrado' : `Registrar Abono a Pago (${payment.id})`}
            </h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Factura: {payment.invoiceNumber || 'Pendiente'}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
            <i className="ph ph-x font-bold text-slate-400"></i>
          </button>
        </div>

        <div className="p-10 space-y-6">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-green-500/20 rotate-12">
                <i className="ph-fill ph-check-circle text-6xl"></i>
              </div>
              <h4 className="text-2xl font-black text-cobra-text-main mb-2">¡Abono Procesado!</h4>
              <p className="text-cobra-text-secondary font-medium px-12">El abono se ha registrado correctamente y el saldo ha sido actualizado.</p>
            </div>
          ) : (
            <>
              {/* Información resumida del pago */}
              <div className="grid grid-cols-2 gap-4 bg-teal-50/50 p-6 rounded-3xl border border-teal-100/50">
                <div>
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest block mb-1">Monto Programado</span>
                  <span className="text-lg font-black text-teal-900 tabular-nums">{formatCurrency(payment.scheduledValue)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Saldo Pendiente</span>
                  <span className="text-lg font-black text-red-600 tabular-nums">{formatCurrency(payment.scheduledValue - payment.paidValue)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Origen de los Fondos</label>
                  <select className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-50 transition-all outline-none text-sm font-bold text-cobra-text-main shadow-sm">
                    <option>Caja General</option>
                    <option>Anticipo Recibido (22/01/2026)</option>
                    <option>Transferencia Bancaria</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Monto del Abono</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-50 transition-all outline-none text-sm font-bold text-cobra-text-main shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Fecha de Operación</label>
                    <input 
                      type="date" 
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-50 transition-all outline-none text-sm font-bold text-cobra-text-main shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Comprobante de Pago (PDF)</label>
                  <div className="flex items-center gap-3">
                    <button className="px-5 py-3 bg-teal-50 text-teal-700 rounded-xl text-xs font-black border border-teal-100 hover:bg-teal-100 transition-all">
                      Subir archivo soporte
                    </button>
                    <span className="text-xs text-slate-400 font-medium italic">Opcional</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex gap-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 py-4 bg-teal-600 text-white rounded-[1.25rem] font-black text-sm hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSaving ? <i className="ph ph-circle-notch animate-spin text-lg"></i> : 'REGISTRAR ABONO'}
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

export default AddAbonoModal;
