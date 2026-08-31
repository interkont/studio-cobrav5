
import React, { useState } from 'react';
import { MOCK_PAYMENTS, MOCK_ANTICIPOS, MOCK_CONTRACT } from '../../../../constants';
import { PaymentStatus, ScheduledPayment, Anticipo } from '../../../../types';
import AddScheduledPaymentModal from './AddScheduledPaymentModal';
import AddAnticipoModal from './AddAnticipoModal';
import AddAbonoModal from './AddAbonoModal';
import PaymentDetailsModal from './PaymentDetailsModal';
import AddInvoiceModal from './AddInvoiceModal';

const FinanceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scheduled' | 'advances'>('scheduled');
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isAddAnticipoOpen, setIsAddAnticipoOpen] = useState(false);
  const [isAddAbonoOpen, setIsAddAbonoOpen] = useState(false);
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [selectedPayment, setSelectedPayment] = useState<ScheduledPayment | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAction = (action: string, payment: ScheduledPayment) => {
    setSelectedPayment(payment);
    setOpenMenuId(null);
    if (action === 'details') setIsDetailsOpen(true);
    if (action === 'abono') setIsAddAbonoOpen(true);
    if (action === 'invoice') setIsAddInvoiceOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1400px] w-full mx-auto relative animate-in fade-in duration-500">
      {/* Modales */}
      <AddScheduledPaymentModal isOpen={isAddPaymentOpen} onClose={() => setIsAddPaymentOpen(false)} />
      <AddAnticipoModal isOpen={isAddAnticipoOpen} onClose={() => setIsAddAnticipoOpen(false)} />
      {selectedPayment && (
        <>
          <AddAbonoModal isOpen={isAddAbonoOpen} onClose={() => setIsAddAbonoOpen(false)} payment={selectedPayment} />
          <AddInvoiceModal isOpen={isAddInvoiceOpen} onClose={() => setIsAddInvoiceOpen(false)} payment={selectedPayment} />
          <PaymentDetailsModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} payment={selectedPayment} />
        </>
      )}

      {/* Bento KPIs Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          label="Valor Total Contrato" 
          value={formatCurrency(MOCK_CONTRACT.totalValue)} 
          icon="ph-bank" 
          color="text-cobra-slate"
          trend="Total comprometido"
        />
        <KPICard 
          label="Ejecución Real" 
          value={formatCurrency(MOCK_CONTRACT.executedValue)} 
          icon="ph-trend-up" 
          color="text-emerald-600"
          trend="+12.4% este mes"
          progress={11.6}
        />
        <KPICard 
          label="Saldo Pendiente" 
          value={formatCurrency(MOCK_CONTRACT.totalValue - MOCK_CONTRACT.executedValue)} 
          icon="ph-piggy-bank" 
          color="text-indigo-600"
          trend="Por facturar/pagar"
        />
        <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col justify-between group relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <i className="ph ph-clock-countdown text-xl"></i>
            </div>
            <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">Próximo</span>
          </div>
          <div className="relative z-10 mt-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vencimiento Cercano</h4>
            <p className="text-lg font-black text-cobra-text-main mt-1">15 de Abril, 2026</p>
            <p className="text-[11px] text-slate-500 font-medium">Pago ID #15 • $ 15.200</p>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
            <i className="ph ph-warning-circle text-8xl"></i>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-4">
        <div className="px-8 pt-8 pb-0 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-50">
          <div className="flex gap-8">
            <TabButton active={activeTab === 'scheduled'} label="Pagos Programados" icon="ph-list-numbers" count={MOCK_PAYMENTS.length} onClick={() => setActiveTab('scheduled')} />
            <TabButton active={activeTab === 'advances'} label="Anticipos Recibidos" icon="ph-wallet" count={MOCK_ANTICIPOS.length} onClick={() => setActiveTab('advances')} />
          </div>
          
          <div className="pb-4">
            {activeTab === 'scheduled' ? (
              <button 
                onClick={() => setIsAddPaymentOpen(true)} 
                className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <i className="ph-bold ph-plus text-lg"></i> PROGRAMAR PAGO
              </button>
            ) : (
              <button 
                onClick={() => setIsAddAnticipoOpen(true)} 
                className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <i className="ph-bold ph-plus text-lg"></i> NUEVO ANTICIPO
              </button>
            )}
          </div>
        </div>

        <div className="px-8 py-4 bg-slate-50/30 flex justify-between items-center border-b border-slate-100">
          <div className="relative w-full max-w-md">
            <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder={`Buscar en ${activeTab === 'scheduled' ? 'cronograma' : 'anticipos'}...`}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 focus:border-cobra-primary focus:ring-4 focus:ring-red-50 outline-none text-sm transition-all shadow-sm font-medium"
            />
          </div>
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest hidden md:block italic">
            Mostrando {activeTab === 'scheduled' ? 'proyecciones financieras' : 'historial de anticipos'}
          </div>
        </div>

        <div className="overflow-x-auto min-h-[450px]">
          {activeTab === 'scheduled' ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Ref/ID</th>
                  <th className="px-8 py-4">Cronograma</th>
                  <th className="px-8 py-4">Importe Programado</th>
                  <th className="px-8 py-4">Documento Fiscal</th>
                  <th className="px-8 py-4">Ejecución</th>
                  <th className="px-8 py-4">Estado Actual</th>
                  <th className="px-8 py-4 text-right">Opciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                {MOCK_PAYMENTS.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-8 py-5">
                      <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">{payment.id}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-[13px] font-bold text-cobra-text-main">{payment.scheduledDate}</div>
                      <div className="text-[10px] text-slate-400 font-medium">Límite de pago</div>
                    </td>
                    <td className="px-8 py-5 font-black text-cobra-text-main tabular-nums text-[14px]">
                      {formatCurrency(payment.scheduledValue)}
                    </td>
                    <td className="px-8 py-5">
                      {payment.invoiceNumber ? (
                        <div className="flex items-center gap-2">
                          <i className="ph-bold ph-file-text text-indigo-500 text-lg"></i>
                          <span className="text-[13px] font-bold text-indigo-600">{payment.invoiceNumber}</span>
                        </div>
                      ) : <span className="text-slate-300 font-medium italic text-xs">Sin factura</span>}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-black text-cobra-text-main">{formatCurrency(payment.paidValue)}</span>
                        <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${(payment.paidValue / payment.scheduledValue) * 100}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="px-8 py-5 text-right relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === payment.id ? null : payment.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openMenuId === payment.id ? 'bg-cobra-primary text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                      >
                        <i className="ph-bold ph-dots-three-vertical text-xl"></i>
                      </button>
                      {openMenuId === payment.id && (
                        <ActionMenu 
                          payment={payment} 
                          onClose={() => setOpenMenuId(null)} 
                          onAction={(act) => handleAction(act, payment)} 
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Ref/ID</th>
                  <th className="px-8 py-4">Fecha Recibido</th>
                  <th className="px-8 py-4">Valor Anticipo</th>
                  <th className="px-8 py-4">Factura Asociada</th>
                  <th className="px-8 py-4">Soporte/Comprobante</th>
                  <th className="px-8 py-4 text-right">Opciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                {MOCK_ANTICIPOS.map((adv) => (
                  <tr key={adv.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-8 py-5">
                      <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <i className="ph ph-hand-coins text-xl"></i>
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-[13px] font-bold text-cobra-text-main">{adv.date}</div>
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Registro Inicial</div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[14px] font-black text-cobra-text-main tabular-nums">{formatCurrency(adv.value)}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-[13px] font-bold text-indigo-600">{adv.associatedInvoice || 'N/A'}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-cobra-text-secondary">
                          <i className="ph ph-file-pdf"></i> {adv.document || 'Sin Acta'}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 italic">
                          <i className="ph ph-article"></i> {adv.receipt || 'Sin Comprobante'}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === adv.id ? null : adv.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openMenuId === adv.id ? 'bg-cobra-primary text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                      >
                        <i className="ph-bold ph-dots-three-vertical text-xl"></i>
                      </button>
                      {openMenuId === adv.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)}></div>
                          <div className="absolute right-8 top-16 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in zoom-in duration-200 origin-top-right">
                            <MenuBtn icon="ph-eye" label="Ver Detalles" onClick={() => setOpenMenuId(null)} />
                            <MenuBtn icon="ph-pencil-simple" label="Editar" onClick={() => setOpenMenuId(null)} />
                            <div className="h-px bg-slate-50 my-1"></div>
                            <MenuBtn icon="ph-trash" label="Eliminar" color="text-red-500" onClick={() => setOpenMenuId(null)} />
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Sub-componentes Visuales ---

const KPICard: React.FC<{ label: string; value: string; icon: string; color: string; trend: string; progress?: number }> = ({ label, value, icon, color, trend, progress }) => (
  <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        <i className={`ph ${icon} text-2xl`}></i>
      </div>
      {progress !== undefined && (
        <div className="text-right">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Ejecución</span>
           <span className="text-xs font-black text-emerald-600">{progress}%</span>
        </div>
      )}
    </div>
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</h4>
    <p className="text-xl font-black text-cobra-text-main tabular-nums leading-none mb-3">{value}</p>
    <div className="flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
      <span className="text-[10px] font-bold text-slate-500">{trend}</span>
    </div>
  </div>
);

const TabButton: React.FC<{ active: boolean; label: string; icon: string; count: number; onClick: () => void }> = ({ active, label, icon, count, onClick }) => (
  <button 
    onClick={onClick}
    className={`pb-4 px-2 text-[13px] font-black uppercase tracking-tight flex items-center gap-2 border-b-2 transition-all ${active ? 'border-cobra-primary text-cobra-primary' : 'border-transparent text-slate-400 hover:text-cobra-text-main'}`}
  >
    <i className={`ph ${icon} ${active ? 'text-cobra-primary font-bold' : 'text-slate-300'}`}></i>
    {label}
    <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-red-50 text-cobra-primary' : 'bg-slate-100 text-slate-400'}`}>{count}</span>
  </button>
);

const StatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const config = {
    [PaymentStatus.PROYECTADO]: { color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: 'ph-calendar-blank' },
    [PaymentStatus.FACTURADO]: { color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: 'ph-file-text' },
    [PaymentStatus.PAGADO]: { color: 'bg-green-100 text-green-700 border-green-200', icon: 'ph-check-circle' },
    [PaymentStatus.PAGADO_PARCIAL]: { color: 'bg-amber-50 text-amber-600 border-amber-100', icon: 'ph-clock-countdown' },
    [PaymentStatus.CANCELADO]: { color: 'bg-red-50 text-red-600 border-red-100', icon: 'ph-prohibit' },
  };
  return (
    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight border flex items-center gap-1.5 w-fit ${config[status].color}`}>
      <i className={`ph ${config[status].icon}`}></i>
      {status}
    </span>
  );
};

const ActionMenu: React.FC<{ payment: ScheduledPayment; onClose: () => void; onAction: (a: string) => void }> = ({ payment, onClose, onAction }) => (
  <>
    <div className="fixed inset-0 z-40" onClick={onClose}></div>
    <div className="absolute right-8 top-16 w-52 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 py-3 z-50 animate-in zoom-in duration-200 origin-top-right backdrop-blur-xl">
      <MenuBtn icon="ph-eye" label="Ver Detalles" onClick={() => onAction('details')} />
      
      {payment.status === PaymentStatus.PROYECTADO && (
        <MenuBtn icon="ph-file-plus" label="Cargar Factura" color="text-indigo-600" onClick={() => onAction('invoice')} />
      )}

      {(payment.status === PaymentStatus.FACTURADO || payment.status === PaymentStatus.PAGADO_PARCIAL) && (
        <MenuBtn icon="ph-plus-circle" label="Registrar Abono" color="text-emerald-600" onClick={() => onAction('abono')} />
      )}

      {payment.status !== PaymentStatus.PAGADO && (
        <MenuBtn icon="ph-pencil-simple" label="Editar Registro" onClick={onClose} />
      )}

      <div className="h-px bg-slate-50 my-2"></div>
      <MenuBtn icon="ph-trash" label="Eliminar" color="text-red-500" onClick={onClose} />
    </div>
  </>
);

const MenuBtn: React.FC<{ icon: string; label: string; onClick: () => void; color?: string }> = ({ icon, label, onClick, color = 'text-cobra-text-main' }) => (
  <button onClick={onClick} className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 text-[13px] font-bold transition-colors group text-left">
    <i className={`ph ${icon} text-lg ${color === 'text-cobra-text-main' ? 'text-slate-400 group-hover:text-cobra-primary' : color}`}></i>
    <span className={color}>{label}</span>
  </button>
);

export default FinanceView;
