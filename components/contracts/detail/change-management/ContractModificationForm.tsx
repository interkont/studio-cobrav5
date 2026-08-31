
import React, { useState, useMemo } from 'react';
import { ContractData } from '../../../../types';

interface Props {
  modType: string;
  modLabel: string;
  contract: ContractData;
  onBack: () => void;
}

interface FundingSource {
  id: string;
  entity: string;
  vigencia: string;
  role: string;
  value: number;
}

interface NewPolicy {
  id: string;
  type: string;
  number: string;
  value: number;
  approvalDate: string;
  endDate: string;
  insurer: string;
  fileName?: string;
}

const ContractModificationForm: React.FC<Props> = ({ modType, modLabel, contract, onBack }) => {
  const [plazoAction, setPlazoAction] = useState<string>('NO MODIFICAR PLAZO');
  const [newEndDate, setNewEndDate] = useState<string>('');
  const [newTotalValue, setNewTotalValue] = useState<number>(contract.totalValue);
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([
    { id: '1', entity: 'ANI', vigencia: '2025', role: 'CLIENTE', value: 1250000000 }
  ]);
  const [requiresPolicies, setRequiresPolicies] = useState<boolean | null>(null);
  const [policies, setPolicies] = useState<NewPolicy[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalSourceOpen, setIsModalSourceOpen] = useState(false);
  const [isModalPolicyOpen, setIsModalPolicyOpen] = useState(false);

  // Lógica de habilitación total
  const isOthersType = modType === 'otros';

  const projectedImpact = useMemo(() => {
    const valueDiff = newTotalValue - contract.totalValue;
    let daysDiff = 0;
    if (newEndDate && plazoAction !== 'NO MODIFICAR PLAZO') {
      const [d, m, y] = contract.endDate.split('/').map(Number);
      const originalDate = new Date(y, m - 1, d);
      const updatedDate = new Date(newEndDate);
      const diffTime = updatedDate.getTime() - originalDate.getTime();
      daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return { valueDiff, daysDiff };
  }, [newTotalValue, newEndDate, plazoAction, contract]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP', maximumFractionDigits: 0
    }).format(val);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('¡Modificación registrada exitosamente!');
      onBack();
    }, 2000);
  };

  return (
    <div className="p-8 max-w-[1250px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-10">
        <button onClick={onBack} className="flex items-center gap-2 text-cobra-text-secondary font-black hover:text-cobra-primary transition-colors text-xs uppercase tracking-widest">
          <i className="ph ph-arrow-left"></i> DESCARTAR Y VOLVER
        </button>
        <div className="text-right">
          <h2 className="text-3xl font-black text-cobra-text-main flex items-center justify-end gap-3 uppercase tracking-tighter">
             <span className={`w-2 h-10 rounded-full ${modType === 'adicion' ? 'bg-emerald-500' : modType === 'prorroga' ? 'bg-blue-500' : 'bg-cobra-primary'}`}></span>
             {modLabel}
          </h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">TRÁMITE REF: {modType.toUpperCase()}-2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Formulario Principal */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          <Section icon="ph-calendar" title="1. Tiempos y Plazos" active={isOthersType || modType === 'prorroga' || modType === 'otrosi' || modType === 'suspension'}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Fecha de Trámite</label>
                  <input type="date" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold outline-none focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Acción sobre Plazo</label>
                  <select value={plazoAction} onChange={(e) => setPlazoAction(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold outline-none">
                    <option>NO MODIFICAR PLAZO</option>
                    <option>ADICIONAR PLAZO</option>
                    <option>DISMINUIR PLAZO</option>
                  </select>
                </div>
                
                {plazoAction !== 'NO MODIFICAR PLAZO' && (
                  <div className="space-y-2 col-span-full animate-in zoom-in duration-300">
                    <label className="text-[11px] font-black uppercase text-indigo-600 ml-1">Nueva Fecha de Terminación Contractual</label>
                    <input type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} className="w-full px-5 py-4 rounded-2xl border-2 border-indigo-200 font-bold outline-none" />
                  </div>
                )}

                <div className="col-span-full space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Justificación Técnica</label>
                  <textarea rows={4} className="w-full p-6 rounded-[2rem] bg-slate-50 border border-slate-100 text-sm font-medium italic resize-none outline-none focus:bg-white" placeholder="Describa el sustento legal/técnico del cambio..." />
                </div>
             </div>
          </Section>

          <Section icon="ph-currency-dollar" title="2. Financiero y Presupuesto" active={isOthersType || modType === 'adicion' || modType === 'otrosi'}>
             <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Valor Final Proyectado</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 text-2xl font-black">$</span>
                    <input type="number" value={newTotalValue} onChange={(e) => setNewTotalValue(Number(e.target.value))} className="w-full pl-14 pr-8 py-6 rounded-[2.5rem] bg-emerald-50/20 border-2 border-emerald-100 text-2xl font-black outline-none" />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-sm font-black text-cobra-text-main uppercase">Fuentes de Financiación</h4>
                    <button onClick={() => setIsModalSourceOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black hover:scale-105 transition-transform">VINCULAR RECURSO</button>
                  </div>
                  <table className="w-full text-left text-xs border border-slate-100 rounded-2xl overflow-hidden">
                    <thead className="bg-slate-50 text-slate-400 font-black">
                      <tr><th className="px-6 py-3">Entidad</th><th className="px-6 py-3">Vigencia</th><th className="px-6 py-3">Valor</th><th className="px-6 py-3"></th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {fundingSources.map(s => (
                        <tr key={s.id} className="font-bold">
                          <td className="px-6 py-4">{s.entity}</td>
                          <td className="px-6 py-4"><span className="px-2 py-0.5 bg-slate-100 rounded">{s.vigencia}</span></td>
                          <td className="px-6 py-4">{formatCurrency(s.value)}</td>
                          <td className="px-6 py-4 text-right"><i className="ph ph-trash text-slate-200 hover:text-red-500 cursor-pointer"></i></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          </Section>

          {/* GESTIÓN DE PÓLIZAS ADICIONALES CON SELECTOR SI/NO */}
          <Section icon="ph-shield-plus" title="3. Gestión de Pólizas Adicionales" active={isOthersType || modType !== 'suspension'}>
             <div className="space-y-8">
                {/* Selector Si/No */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                   <div>
                      <p className="text-[13px] font-black text-cobra-text-main uppercase tracking-tight">¿Requiere registro de pólizas adicionales?</p>
                      <p className="text-[11px] text-slate-400 font-medium">Aplica para adiciones de valor o prórrogas que afecten la vigencia.</p>
                   </div>
                   <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                      <button 
                        onClick={() => setRequiresPolicies(true)}
                        className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${requiresPolicies === true ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                      >
                        SÍ
                      </button>
                      <button 
                        onClick={() => {
                          setRequiresPolicies(false);
                          setPolicies([]);
                        }}
                        className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${requiresPolicies === false ? 'bg-cobra-slate text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                      >
                        NO
                      </button>
                   </div>
                </div>

                {/* Contenido Condicional */}
                <div className={`space-y-6 transition-all duration-300 ${requiresPolicies === true ? 'opacity-100 translate-y-0' : 'opacity-40 grayscale pointer-events-none'}`}>
                   <div className="flex justify-between items-center">
                      <div>
                         <p className="text-[13px] font-bold text-cobra-text-main">Pólizas y Amparos del Trámite</p>
                         <p className="text-[11px] text-slate-400 font-medium">Registro estructurado de amparos adicionales.</p>
                      </div>
                      <button 
                        disabled={requiresPolicies !== true}
                        onClick={() => setIsModalPolicyOpen(true)} 
                        className={`px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:bg-slate-300 disabled:shadow-none`}
                      >
                         <i className="ph ph-plus-circle text-lg"></i> AGREGAR PÓLIZA
                      </button>
                   </div>

                   <div className="rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm min-h-[120px] flex items-center justify-center bg-slate-50/30">
                      {policies.length > 0 ? (
                         <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 font-black text-slate-400 uppercase tracking-widest">
                               <tr><th className="px-8 py-4">No. Póliza</th><th className="px-8 py-4">Tipo de Amparo</th><th className="px-8 py-4">Vencimiento</th><th className="px-8 py-4 text-right"></th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                               {policies.map(p => (
                                  <tr key={p.id} className="font-bold hover:bg-slate-50 transition-colors">
                                     <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-indigo-600">
                                           <i className="ph ph-file-text"></i> {p.number}
                                        </div>
                                     </td>
                                     <td className="px-8 py-5">{p.type}</td>
                                     <td className="px-8 py-5">{p.endDate}</td>
                                     <td className="px-8 py-5 text-right flex items-center justify-end gap-2">
                                        <button className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><i className="ph ph-file-pdf"></i></button>
                                        <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"><i className="ph ph-trash"></i></button>
                                     </td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                      ) : (
                         <div className="flex flex-col items-center gap-2 text-slate-400 p-8">
                            <i className="ph ph-shield-warning text-3xl opacity-20"></i>
                            <p className="text-xs font-medium italic">
                               {requiresPolicies === true ? 'Haga clic en Agregar Póliza para iniciar el registro.' : 'No se requieren pólizas adicionales para este trámite.'}
                            </p>
                         </div>
                      )}
                   </div>
                </div>
             </div>
          </Section>

          <Section icon="ph-paperclip" title="4. Documentos Anexos (General)" active={true}>
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">Tipo de Anexo</label>
                      <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-xs outline-none focus:bg-white">
                         <option>ACTA DE MODIFICACIÓN</option>
                         <option>RESOLUCIÓN ADMINISTRATIVA</option>
                         <option>OTROSÍ SUSCRITO</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">Referencia Documental</label>
                      <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-xs outline-none focus:bg-white" placeholder="Ej: Oficio No. 042..." />
                   </div>
                </div>
                <div className="p-12 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:border-cobra-primary hover:bg-white transition-all">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-cobra-primary shadow-sm transition-all">
                      <i className="ph ph-cloud-arrow-up text-4xl"></i>
                   </div>
                   <div>
                      <p className="text-sm font-black text-cobra-text-main">Cargar Otros Soporte</p>
                      <p className="text-[11px] text-slate-400 font-medium max-w-xs mx-auto">Arrastre minutas, actas u oficios que no sean certificados de póliza.</p>
                   </div>
                </div>
             </div>
          </Section>
        </div>

        {/* Sidebar Impacto */}
        <div className="lg:col-span-4">
           <div className="bg-cobra-slate text-white rounded-[3.5rem] p-12 shadow-2xl sticky top-24 border border-white/5 overflow-hidden">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-cobra-primary mb-12 flex items-center gap-3">
                 <span className="w-10 h-px bg-cobra-primary"></span> IMPACTO PROYECTADO
              </h3>
              <div className="space-y-12 relative z-10">
                 <div className="flex flex-col gap-3">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Afectación Valor</p>
                    <span className={`text-3xl font-black tabular-nums ${projectedImpact.valueDiff >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {projectedImpact.valueDiff >= 0 ? '+' : ''}{formatCurrency(projectedImpact.valueDiff)}
                    </span>
                 </div>
                 <div className="h-px bg-white/10 w-2/3"></div>
                 <div className="flex flex-col gap-3">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Afectación Tiempo</p>
                    <span className={`text-3xl font-black tabular-nums ${projectedImpact.daysDiff >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                      {projectedImpact.daysDiff >= 0 ? '+' : ''}{projectedImpact.daysDiff} Días
                    </span>
                 </div>
                 <div className="pt-10">
                    <button onClick={handleSave} disabled={isSaving} className="w-full py-6 bg-cobra-primary text-white rounded-[2rem] font-black text-sm hover:bg-red-600 transition-all shadow-2xl shadow-red-600/40 flex items-center justify-center gap-3">
                      {isSaving ? <i className="ph ph-circle-notch animate-spin text-xl"></i> : <><i className="ph-fill ph-check-circle text-2xl"></i> CONFIRMAR REGISTRO</>}
                    </button>
                    <p className="text-[10px] text-center text-slate-500 font-medium mt-6 italic">Esta acción registrará el cambio en la base de datos central.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* MODAL: REGISTRO DE PÓLIZA (REFERENCIA VISUAL) */}
      {isModalPolicyOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-cobra-slate/80 backdrop-blur-md animate-in fade-in" onClick={() => setIsModalPolicyOpen(false)}></div>
          <div className="bg-white rounded-[3rem] w-full max-w-2xl relative z-10 shadow-3xl overflow-hidden animate-in zoom-in duration-300">
             <div className="bg-cobra-slate p-8 text-white flex justify-between items-center">
               <h3 className="text-xl font-black tracking-tighter uppercase">Registro de Póliza Adicional</h3>
               <button onClick={() => setIsModalPolicyOpen(false)}><i className="ph ph-x text-2xl text-white/50 hover:text-white transition-colors"></i></button>
             </div>
             
             <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">(*) Tipo de Póliza:</label>
                   <select className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm outline-none focus:border-indigo-600">
                      <option>SELECCIONE LA OPCIÓN</option>
                      <option>CUMPLIMIENTO</option>
                      <option>RESPONSABILIDAD CIVIL</option>
                      <option>ESTABILIDAD DE OBRA</option>
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">(*) Número de Póliza:</label>
                   <input type="text" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm outline-none" placeholder="Ingrese número..." />
                </div>
                <div className="space-y-1">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">(*) Valor Asegurado:</label>
                   <input type="number" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm outline-none" placeholder="$ 0,00" />
                </div>
                <div className="space-y-1">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">(*) Entidad Aseguradora:</label>
                   <select className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm outline-none">
                      <option>SELECCIONE LA OPCIÓN</option>
                      <option>Seguros del Estado</option>
                      <option>Previsora</option>
                      <option>SURA</option>
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">(*) Fecha de Aprobación:</label>
                   <input type="date" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm outline-none" />
                </div>
                <div className="space-y-1">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">(*) Vencimiento:</label>
                   <input type="date" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm outline-none" />
                </div>
                <div className="col-span-full pt-4 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <i className="ph ph-file-pdf text-3xl text-red-500"></i>
                      <div className="text-[11px]">
                         <p className="font-black text-cobra-text-main">Adjunto Certificado (Opcional)</p>
                         <p className="text-slate-400 font-medium">Formato PDF Máx. 10MB</p>
                      </div>
                   </div>
                   <button className="px-6 py-2 bg-slate-100 rounded-xl text-[10px] font-black hover:bg-slate-200 transition-colors">SELECCIONAR ARCHIVO</button>
                </div>
                <button onClick={() => {
                  setPolicies([...policies, { id: Date.now().toString(), type: 'CUMPLIMIENTO', number: 'POL-' + Math.floor(Math.random()*10000), value: 500000000, approvalDate: '2025-01-01', endDate: '2026-01-01', insurer: 'Seguros del Estado' }]);
                  setIsModalPolicyOpen(false);
                }} className="col-span-full py-5 bg-cobra-slate text-white rounded-2xl font-black text-sm mt-4 hover:shadow-2xl shadow-slate-900/20 active:scale-95 transition-all">
                  AGREGAR PÓLIZA AL TRÁMITE
                </button>
             </div>
          </div>
        </div>
      )}

      {/* MODAL SIMULADO: FUENTE FINANCIACIÓN */}
      {isModalSourceOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-cobra-slate/80 backdrop-blur-md animate-in fade-in" onClick={() => setIsModalSourceOpen(false)}></div>
          <div className="bg-white rounded-[3rem] w-full max-w-lg relative z-10 p-12">
             <h3 className="text-xl font-black mb-8 text-cobra-text-main">Vincular Nueva Fuente</h3>
             <div className="space-y-6">
                <input type="text" placeholder="Entidad / Aportante..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold" />
                <input type="number" placeholder="Valor del Aporte..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold" />
                <button onClick={() => setIsModalSourceOpen(false)} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg">VINCULAR RECURSO</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Section: React.FC<{ icon: string; title: string; active?: boolean; children: React.ReactNode }> = ({ icon, title, active = true, children }) => (
  <div className={`bg-white rounded-[3.5rem] p-12 border border-slate-200 shadow-sm relative group overflow-hidden transition-all ${!active ? 'opacity-50 grayscale pointer-events-none blur-[1px]' : ''}`}>
     <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
        <i className={`ph ${icon} text-[12rem]`}></i>
     </div>
     <h3 className="text-[13px] font-black text-cobra-text-main uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${active ? 'bg-indigo-50 text-cobra-primary' : 'bg-slate-50 text-slate-300'}`}>
          <i className={`ph-fill ${icon} text-2xl`}></i>
       </div>
       {title}
       {!active && <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full tracking-normal ml-auto">No prioritario</span>}
     </h3>
     <div className="relative z-10">{children}</div>
  </div>
);

export default ContractModificationForm;
