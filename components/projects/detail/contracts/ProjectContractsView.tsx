import React, { useState, useMemo } from 'react';
import { ProjectData } from '../../../../types';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';

interface SystemContract {
  id: string;
  code: string;
  type: string;
  object: string;
  executor: string;
  startDate: string;
  endDate: string;
  totalValue: number;
  availableValue: number;
}

const INITIAL_SYSTEM_CONTRACTS: SystemContract[] = [
  { id: 'c1', code: 'CD-2026-001', type: 'Obra Pública', object: 'Construcción de subestación eléctrica', executor: 'Cobra Infraestructuras S.A.', startDate: '2026-01-15', endDate: '2026-12-30', totalValue: 5000000000, availableValue: 1200000000 },
  { id: 'c2', code: 'INT-2026-045', type: 'Interventoría', object: 'Interventoría técnica y administrativa de obra', executor: 'Consorcio Interobras', startDate: '2026-02-01', endDate: '2026-12-30', totalValue: 800000000, availableValue: 800000000 },
  { id: 'c3', code: 'SUM-2026-112', type: 'Suministro', object: 'Suministro de equipos de transformación', executor: 'ElectroEquipos S.A.S.', startDate: '2026-03-10', endDate: '2026-08-10', totalValue: 3500000000, availableValue: 500000000 },
  { id: 'c4', code: 'CD-2025-089', type: 'Obra Pública', object: 'Adecuación de terrenos para nueva fase', executor: 'Construcciones Civiles', startDate: '2025-11-01', endDate: '2026-05-30', totalValue: 2000000000, availableValue: 2000000000 },
  { id: 'c5', code: 'CPS-2026-008', type: 'Prestación de Servicios', object: 'Asesoría jurídica y ambiental', executor: 'Consultores Integrales', startDate: '2026-01-01', endDate: '2026-12-31', totalValue: 120000000, availableValue: 40000000 },
  { id: 'c6', code: 'CPS-2026-041', type: 'Prestación de Servicios', object: 'Diseño arquitectónico de exteriores', executor: 'Arquitectos Asociados', startDate: '2026-03-01', endDate: '2026-09-30', totalValue: 250000000, availableValue: 250000000 },
];

interface Props {
  data: ProjectData;
}

const ProjectContractsView: React.FC<Props> = ({ data }) => {
  const labels = PROJECT_DICTIONARY.CONTRACTS_VIEW;
  const [associatedContracts, setAssociatedContracts] = useState(data.associatedContracts);
  const [systemContracts, setSystemContracts] = useState<SystemContract[]>(INITIAL_SYSTEM_CONTRACTS);
  
  // Modals state
  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false);
  const [contractToUnlink, setContractToUnlink] = useState<any>(null);
  const [contractToAssociate, setContractToAssociate] = useState<SystemContract | null>(null);
  
  // Associate Modal State
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 3;
  const [valueToAssociate, setValueToAssociate] = useState<number | string>('');

  const currentAssociatedValue = associatedContracts.reduce((acc, curr) => acc + curr.projectValue, 0);
  const projectPendingValue = Math.max(0, data.totalValue - currentAssociatedValue);

  // Filter & Paginate
  const filteredContracts = useMemo(() => {
    return systemContracts.filter(c => 
      !associatedContracts.find(a => a.code === c.code) && // exclude already associated
      (c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
       c.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.executor.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [systemContracts, searchTerm, associatedContracts]);

  const totalPages = Math.ceil(filteredContracts.length / ITEMS_PER_PAGE) || 1;
  const paginatedContracts = filteredContracts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleUnlink = (id: string) => {
    const unlinkedContract = associatedContracts.find(c => c.id === id);
    if (unlinkedContract) {
       setSystemContracts(prev => prev.map(c => 
          c.id === id ? { ...c, availableValue: c.availableValue + unlinkedContract.projectValue } : c
       ));
    }
    setAssociatedContracts(prev => prev.filter(c => c.id !== id));
    setContractToUnlink(null);
  };

  const handleSelectToAssociate = (contract: SystemContract) => {
    setContractToAssociate(contract);
    const suggestedValue = Math.min(contract.availableValue, projectPendingValue);
    setValueToAssociate(suggestedValue);
  };

  const confirmAssociation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractToAssociate) return;

    const numericValue = Number(valueToAssociate);
    if (isNaN(numericValue) || numericValue <= 0) return;

    // Simulate discounting the available value
    setSystemContracts(prev => prev.map(c => 
      c.id === contractToAssociate.id 
        ? { ...c, availableValue: c.availableValue - numericValue }
        : c
    ));

    const newAssociated = {
      id: contractToAssociate.id,
      code: contractToAssociate.code,
      object: contractToAssociate.object,
      executor: contractToAssociate.executor,
      duration: `${contractToAssociate.startDate} a ${contractToAssociate.endDate}`,
      totalValue: contractToAssociate.totalValue,
      projectValue: numericValue,
      type: contractToAssociate.type
    };

    setAssociatedContracts([newAssociated, ...associatedContracts]);
    
    // Reset modal
    setContractToAssociate(null);
    setIsAssociateModalOpen(false);
    setSearchTerm('');
    setPage(1);
  };

  const formatCurrency = (val: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header and Summary */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-indigo-50/30">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
               <i className="ph-fill ph-arrows-clockwise text-xl"></i>
             </div>
             <div>
               <h2 className="font-black text-indigo-900 text-sm">{labels.TITLE}</h2>
               <p className="text-[11px] text-indigo-700/70 font-medium">{labels.SUBTITLE}</p>
             </div>
          </div>
          <button 
            onClick={() => setIsAssociateModalOpen(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            <i className="ph-bold ph-plus text-lg"></i> {labels.BTN_ASSOCIATE}
          </button>
        </div>

        {/* List of Associated Contracts (Cards) */}
        <div className="p-8">
           {associatedContracts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                 <i className="ph-fill ph-files text-4xl mb-4 text-slate-200"></i>
                 <p className="text-sm font-medium">No hay contratos asociados al proyecto.</p>
              </div>
           ) : (
              <div className="grid grid-cols-1 gap-4">
                 {associatedContracts.map(contract => (
                    <div key={contract.id} className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                       {/* Icon & Details */}
                       <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0 text-indigo-600">
                             <i className="ph-fill ph-file-text text-xl"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-black uppercase tracking-wider border border-indigo-100">
                                   {contract.type || 'CONTRATO'}
                                </span>
                                <h3 className="font-black text-cobra-slate text-sm truncate">{contract.code}</h3>
                             </div>
                             <p className="text-xs text-slate-500 font-medium truncate mb-1">{contract.object}</p>
                             <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                                <span className="flex items-center gap-1"><i className="ph-fill ph-buildings"></i> {contract.executor}</span>
                                <span className="flex items-center gap-1"><i className="ph-fill ph-calendar-blank"></i> {contract.duration}</span>
                             </div>
                          </div>
                       </div>
                       
                       {/* Financials & Actions */}
                       <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t border-slate-100 sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                          <div className="flex flex-col items-start sm:items-end gap-1">
                             <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Asociado</span>
                             <span className="text-sm font-black text-indigo-700">{formatCurrency(contract.projectValue)}</span>
                          </div>
                          
                          <button 
                             onClick={() => setContractToUnlink(contract)}
                             className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-transparent transition-all"
                             title="Desasociar contrato"
                          >
                             <i className="ph-bold ph-link-break text-lg"></i>
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           )}
        </div>
      </div>

      {/* MODAL: Associate New Contract */}
      {isAssociateModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => {
               setIsAssociateModalOpen(false);
               setContractToAssociate(null);
            }}></div>
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
               
               <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <i className="ph-bold ph-link text-xl"></i>
                     </div>
                     <div>
                        <h3 className="font-black text-slate-800 text-base">Asociar Contrato</h3>
                        <p className="text-xs text-slate-500 font-medium">Busca y asocia un contrato existente al proyecto.</p>
                     </div>
                  </div>
                  <button onClick={() => { setIsAssociateModalOpen(false); setContractToAssociate(null); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                     <i className="ph-bold ph-x text-lg"></i>
                  </button>
               </div>
               
               <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
                  
                  {/* Left Side: Search & Results */}
                  <div className={`flex-1 flex flex-col bg-white overflow-hidden transition-all duration-300 ${contractToAssociate ? 'hidden md:flex md:w-1/2 opacity-50' : 'w-full'}`}>
                     <div className="p-6 border-b border-slate-100 shrink-0">
                        <div className="relative">
                           <i className="ph-bold ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                           <input 
                              type="text" 
                              placeholder="Buscar por código, objeto o ejecutor..."
                              value={searchTerm}
                              onChange={(e) => {
                                 setSearchTerm(e.target.value);
                                 setPage(1);
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                           />
                        </div>
                     </div>
                     
                     <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
                        {paginatedContracts.length === 0 ? (
                           <div className="flex-1 flex items-center justify-center text-slate-400 text-sm font-bold flex-col gap-2">
                              <i className="ph-bold ph-magnifying-glass text-3xl"></i>
                              No se encontraron contratos
                           </div>
                        ) : (
                           paginatedContracts.map(contract => (
                              <div 
                                 key={contract.id} 
                                 onClick={() => handleSelectToAssociate(contract)}
                                 className={`p-4 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md ${contractToAssociate?.id === contract.id ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-100 bg-white hover:border-indigo-200'}`}
                              >
                                 <div className="flex justify-between items-start mb-2 gap-2">
                                    <h4 className="font-black text-sm text-cobra-slate">{contract.code}</h4>
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase tracking-wider shrink-0">
                                       {contract.type}
                                    </span>
                                 </div>
                                 <p className="text-xs text-slate-500 font-medium mb-3 line-clamp-2" title={contract.object}>{contract.object}</p>
                                 <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between text-[10px] font-bold">
                                       <span className="text-slate-400">Ejecutor:</span>
                                       <span className="text-slate-700 truncate ml-2 max-w-[150px]">{contract.executor}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] font-bold">
                                       <span className="text-slate-400">Disponible:</span>
                                       <span className="text-emerald-600">{formatCurrency(contract.availableValue)}</span>
                                    </div>
                                 </div>
                              </div>
                           ))
                        )}
                     </div>

                     {/* Pagination */}
                     {totalPages > 1 && (
                        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                           <button 
                              disabled={page === 1} 
                              onClick={() => setPage(p => Math.max(1, p - 1))}
                              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                           >
                              <i className="ph-bold ph-caret-left"></i>
                           </button>
                           <span className="text-xs font-bold text-slate-500">
                              Página {page} de {totalPages}
                           </span>
                           <button 
                              disabled={page === totalPages} 
                              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                           >
                              <i className="ph-bold ph-caret-right"></i>
                           </button>
                        </div>
                     )}
                  </div>

                  {/* Right Side: Configuration (only visible when a contract is selected) */}
                  {contractToAssociate && (
                     <div className="flex-1 md:w-1/2 bg-slate-50 border-l border-slate-200 flex flex-col relative animate-in slide-in-from-right-8 duration-300">
                        {/* Mobile back button */}
                        <div className="md:hidden p-4 border-b border-slate-200">
                           <button onClick={() => setContractToAssociate(null)} className="text-sm font-bold text-indigo-600 flex items-center gap-1">
                              <i className="ph-bold ph-arrow-left"></i> Volver a la lista
                           </button>
                        </div>

                        <form onSubmit={confirmAssociation} className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col">
                           
                           <div className="mb-6 pb-6 border-b border-slate-200">
                              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1 block">Contrato Seleccionado</span>
                              <h3 className="font-black text-xl text-cobra-slate mb-2">{contractToAssociate.code}</h3>
                              <p className="text-sm text-slate-600 font-medium mb-4">{contractToAssociate.object}</p>
                              
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="bg-white p-3 rounded-xl border border-slate-100">
                                    <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Contrato</div>
                                    <div className="font-bold text-slate-700 text-sm">{formatCurrency(contractToAssociate.totalValue)}</div>
                                 </div>
                                 <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                                    <div className="text-[10px] font-black uppercase text-emerald-600/70 mb-1">Disponible para asociar</div>
                                    <div className="font-bold text-emerald-700 text-sm">{formatCurrency(contractToAssociate.availableValue)}</div>
                                 </div>
                              </div>
                           </div>

                           <div className="flex flex-col gap-2 mb-8">
                              <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                                 Valor a Asociar al Proyecto
                              </label>
                              <div className="relative">
                                 <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">$</span>
                                 <input 
                                    type="number" 
                                    required
                                    min="1"
                                    max={contractToAssociate.availableValue}
                                    value={valueToAssociate}
                                    onChange={(e) => setValueToAssociate(e.target.value)}
                                    className="w-full bg-white border-2 border-indigo-100 rounded-2xl pl-8 pr-4 py-4 text-lg font-black text-indigo-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                 />
                              </div>
                              <div className="flex justify-between items-center mt-2 px-1">
                                 <p className="text-[11px] font-medium text-slate-500">
                                    Pendiente por asociar en proyecto: <strong className="text-indigo-600">{formatCurrency(projectPendingValue)}</strong>
                                 </p>
                                 <button 
                                    type="button"
                                    onClick={() => setValueToAssociate(contractToAssociate.availableValue)}
                                    className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 uppercase"
                                 >
                                    Asociar Máximo
                                 </button>
                              </div>
                           </div>

                           <div className="mt-auto pt-6">
                              <button 
                                 type="submit"
                                 disabled={!valueToAssociate || Number(valueToAssociate) <= 0 || Number(valueToAssociate) > contractToAssociate.availableValue}
                                 className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2 group"
                              >
                                 Confirmar Asociación <i className="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                              </button>
                           </div>
                        </form>
                     </div>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* MODAL: Unlink Warning */}
      {contractToUnlink && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setContractToUnlink(null)}></div>
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
               <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6">
                  <i className="ph-fill ph-warning-circle text-3xl"></i>
               </div>
               <h3 className="font-black text-xl text-cobra-slate mb-2">¿Desasociar Contrato?</h3>
               <p className="text-sm text-slate-500 font-medium mb-6">
                  Estás a punto de desvincular el contrato <strong className="text-slate-700">{contractToUnlink.code}</strong> de este proyecto. El valor asociado de {formatCurrency(contractToUnlink.projectValue)} será liberado.
               </p>
               <div className="flex gap-3 w-full">
                  <button 
                     onClick={() => setContractToUnlink(null)}
                     className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                  >
                     Cancelar
                  </button>
                  <button 
                     onClick={() => handleUnlink(contractToUnlink.id)}
                     className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-sm shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all hover:-translate-y-0.5"
                  >
                     Desasociar
                  </button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};

export default ProjectContractsView;
