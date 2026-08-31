
import React, { useState } from 'react';
import { ScheduledPayment, Abono, PaymentStatus } from '../../../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  payment: ScheduledPayment;
}

const PaymentDetailsModal: React.FC<Props> = ({ isOpen, onClose, payment }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'abonos' | 'docs'>('general');

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getStatusBadge = (status: PaymentStatus) => {
    const styles = {
      [PaymentStatus.PROYECTADO]: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      [PaymentStatus.FACTURADO]: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      [PaymentStatus.PAGADO]: 'bg-green-100 text-green-700 border-green-200',
      [PaymentStatus.PAGADO_PARCIAL]: 'bg-amber-50 text-amber-600 border-amber-100',
      [PaymentStatus.CANCELADO]: 'bg-red-50 text-red-600 border-red-100',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-tighter border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cobra-slate/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-3xl w-full max-w-4xl relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black text-cobra-text-main flex items-center gap-2">
            <i className="ph ph-info-circle text-cobra-primary"></i>
            Detalles del Pago Programado ({payment.id})
          </h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
            <i className="ph ph-x font-bold text-slate-400"></i>
          </button>
        </div>

        <div className="p-0">
          <div className="px-8 pt-4 border-b border-slate-100 flex gap-8">
            <TabButton active={activeTab === 'general'} icon="ph ph-info" label="Información General" onClick={() => setActiveTab('general')} />
            <TabButton active={activeTab === 'abonos'} icon="ph ph-coins" label="Abonos Realizados" onClick={() => setActiveTab('abonos')} />
            <TabButton active={activeTab === 'docs'} icon="ph ph-files" label="Documentos" onClick={() => setActiveTab('docs')} />
          </div>

          <div className="p-8 min-h-[400px]">
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                <DetailItem label="ID Pago" value={payment.id} />
                <DetailItem label="Fecha Programada" value={payment.scheduledDate} />
                <DetailItem label="Valor Programado" value={formatCurrency(payment.scheduledValue)} />
                <DetailItem label="Número de Factura" value={payment.invoiceNumber || 'No aplica'} />
                <div className="flex flex-col gap-1.5">
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Estado</span>
                   <div>{getStatusBadge(payment.status)}</div>
                </div>
                <div className="flex flex-col items-end justify-center">
                   <span className="text-[11px] font-black text-green-600 uppercase tracking-widest">Total Abonado</span>
                   <span className="text-2xl font-black text-green-700 tabular-nums">{formatCurrency(payment.paidValue)}</span>
                </div>
              </div>
            )}

            {activeTab === 'abonos' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="relative w-72">
                    <i className="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" placeholder="Buscar Abonos..." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium outline-none" />
                  </div>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-4 py-3 border-b border-slate-100">Fecha</th>
                      <th className="px-4 py-3 border-b border-slate-100">Valor</th>
                      <th className="px-4 py-3 border-b border-slate-100">Origen</th>
                      <th className="px-4 py-3 border-b border-slate-100">Documento</th>
                      <th className="px-4 py-3 border-b border-slate-100">Comprobante</th>
                      <th className="px-4 py-3 border-b border-slate-100 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {payment.abonos.length > 0 ? payment.abonos.map((abono) => (
                      <tr key={abono.id} className="text-xs font-bold text-cobra-text-main">
                        <td className="px-4 py-4">{abono.date}</td>
                        <td className="px-4 py-4 tabular-nums">{formatCurrency(abono.value)}</td>
                        <td className="px-4 py-4">{abono.origin}</td>
                        <td className="px-4 py-4 text-slate-400">-</td>
                        <td className="px-4 py-4 text-slate-400 flex items-center gap-1.5">
                          <i className="ph ph-file-pdf"></i> {abono.receipt || 'N/A'}
                        </td>
                        <td className="px-4 py-4 text-right">
                           <button className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                              <i className="ph ph-dots-three-vertical-bold"></i>
                           </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="py-20 text-center text-slate-400 italic">No se han registrado abonos para este pago</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'docs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {payment.documents.length > 0 ? payment.documents.map((doc, i) => (
                   <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center gap-4 hover:border-cobra-primary transition-all cursor-pointer group">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm group-hover:bg-cobra-primary group-hover:text-white transition-all">
                         <i className="ph-fill ph-file-pdf text-xl"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-xs font-black text-cobra-text-main truncate uppercase tracking-tighter">{doc.type}</p>
                         <p className="text-[10px] text-slate-400 font-bold truncate">{doc.name}</p>
                      </div>
                   </div>
                 )) : (
                   <div className="col-span-full py-20 text-center text-slate-400 italic">No hay documentos adjuntos</div>
                 )}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-10 py-3.5 bg-green-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all active:scale-95"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`pb-4 px-2 text-[13px] font-black uppercase tracking-tight flex items-center gap-2 border-b-2 transition-all ${active ? 'border-cobra-primary text-cobra-primary' : 'border-transparent text-slate-400 hover:text-cobra-text-main'}`}
  >
    <i className={`${icon} ${active ? 'text-cobra-primary' : 'text-slate-300'}`}></i>
    {label}
  </button>
);

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-black text-cobra-text-main">{value}</span>
  </div>
);

export default PaymentDetailsModal;
