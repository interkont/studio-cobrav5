import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_CONTRACTS_LIST } from '../../constants';
import { ContractStatus } from '../../types';

interface ContractsListViewProps {
  onSelectContract: (id: string) => void;
}

const ContractsListView: React.FC<ContractsListViewProps> = ({ onSelectContract }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [yearFilter, setYearFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, yearFilter]);

  const yearFilteredContracts = useMemo(() => {
    return MOCK_CONTRACTS_LIST.filter(c => yearFilter === 'ALL' || c.year === yearFilter);
  }, [yearFilter]);

  // Calculate KPIs based on year filter
  const totalContracts = yearFilteredContracts.length;
  const totalValue = yearFilteredContracts.reduce((sum, c) => sum + c.totalValue, 0);
  const activeContracts = yearFilteredContracts.filter(c => c.status === ContractStatus.ACTIVE).length;
  const suspendedContracts = yearFilteredContracts.filter(c => c.status === ContractStatus.SUSPENDED).length;

  // Filter logic
  const filteredContracts = useMemo(() => {
    return yearFilteredContracts.filter(contract => {
      const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            contract.entity.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || contract.status === statusFilter;
      const matchesType = typeFilter === 'ALL' || contract.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [yearFilteredContracts, searchTerm, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredContracts.length / itemsPerPage));
  const paginatedContracts = filteredContracts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadge = (status: ContractStatus) => {
    switch (status) {
      case ContractStatus.ACTIVE:
        return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-200">Activo</span>;
      case ContractStatus.SUSPENDED:
        return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase tracking-wider border border-amber-200">Suspendido</span>;
      case ContractStatus.LIQUIDATED:
        return <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">Liquidado</span>;
      default:
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-bold uppercase tracking-wider border border-gray-200">{status}</span>;
    }
  };

  return (
    <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-cobra-slate tracking-tight">Gestión de Contratos</h1>
          <p className="text-cobra-text-secondary mt-1">Administración y seguimiento del portafolio de contratos</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <select 
              className="w-full sm:w-auto appearance-none bg-white border border-slate-200 text-cobra-slate font-bold py-3 pl-5 pr-12 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cobra-primary/20 focus:border-cobra-primary transition-all cursor-pointer text-sm"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="ALL">Todos los Años</option>
              <option value="2026">Vigencia 2026</option>
              <option value="2025">Vigencia 2025</option>
              <option value="2024">Vigencia 2024</option>
              <option value="2023">Vigencia 2023</option>
            </select>
            <i className="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
          </div>
          <button className="w-full sm:w-auto bg-cobra-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-cobra-primary/20 hover:bg-cobra-hover transition-all flex items-center justify-center gap-2">
            <i className="ph ph-plus-circle text-lg"></i>
            Nuevo Contrato
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="text-blue-600 mb-4">
            <i className="ph ph-scroll text-3xl"></i>
          </div>
          <div className="text-3xl font-black text-cobra-slate mb-1">{totalContracts}</div>
          <div className="text-sm text-cobra-text-secondary font-medium">Total Contratos</div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="text-emerald-600 mb-4">
            <i className="ph ph-currency-dollar text-3xl"></i>
          </div>
          <div className="text-2xl font-black text-cobra-slate mb-1 truncate" title={formatCurrency(totalValue)}>{formatCurrency(totalValue)}</div>
          <div className="text-sm text-cobra-text-secondary font-medium">Valor Total Contratado</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="text-indigo-600 mb-4">
            <i className="ph ph-check-circle text-3xl"></i>
          </div>
          <div className="text-3xl font-black text-cobra-slate mb-1">{activeContracts}</div>
          <div className="text-sm text-cobra-text-secondary font-medium">Contratos Activos</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="text-amber-600 mb-4">
            <i className="ph ph-warning-circle text-3xl"></i>
          </div>
          <div className="text-3xl font-black text-cobra-slate mb-1">{suspendedContracts}</div>
          <div className="text-sm text-cobra-text-secondary font-medium">Suspendidos / En Riesgo</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
          <input 
            type="text" 
            placeholder="Buscar por ID, título o entidad..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cobra-primary/20 focus:border-cobra-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <i className="ph ph-funnel absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <select 
              className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-cobra-primary/20 focus:border-cobra-primary transition-all cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Todos los Estados</option>
              <option value={ContractStatus.ACTIVE}>Activos</option>
              <option value={ContractStatus.SUSPENDED}>Suspendidos</option>
              <option value={ContractStatus.LIQUIDATED}>Liquidados</option>
            </select>
            <i className="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
          </div>

          <div className="relative w-full md:w-48">
            <i className="ph ph-tag absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <select 
              className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-cobra-primary/20 focus:border-cobra-primary transition-all cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">Todos los Tipos</option>
              <option value="Consultoría">Consultoría</option>
              <option value="Obra">Obra</option>
              <option value="Suministro">Suministro</option>
            </select>
            <i className="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-3">
        {paginatedContracts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <i className="ph ph-magnifying-glass text-3xl"></i>
            </div>
            <h3 className="text-lg font-bold text-cobra-slate mb-2">No se encontraron contratos</h3>
            <p className="text-slate-500 text-sm max-w-md">Intenta ajustar los filtros de búsqueda para encontrar lo que necesitas.</p>
            <button 
              onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); setTypeFilter('ALL'); setYearFilter('ALL'); }}
              className="mt-6 px-6 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          paginatedContracts.map(contract => (
            <div 
              key={contract.id} 
              onClick={() => onSelectContract(contract.id)}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-cobra-primary/30 transition-all cursor-pointer group relative overflow-hidden flex flex-col lg:flex-row lg:items-center gap-4"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-cobra-primary transition-colors"></div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{contract.id}</span>
                  {getStatusBadge(contract.status)}
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 truncate max-w-[120px]">{contract.type}</span>
                </div>
                <h3 className="text-sm font-bold text-cobra-slate group-hover:text-cobra-primary transition-colors truncate mb-1.5">
                  {contract.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 truncate">
                  <div className="flex items-center gap-1.5 truncate">
                    <i className="ph ph-buildings shrink-0"></i>
                    <span className="truncate">{contract.entity}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></div>
                  <div className="flex items-center gap-1.5 truncate">
                    <i className="ph ph-briefcase shrink-0"></i>
                    <span className="truncate">{contract.actionLine}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center gap-4 lg:gap-6 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 overflow-x-auto no-scrollbar">
                <div className="flex flex-col w-28 shrink-0">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Valor Total</span>
                  <span className="text-sm font-black text-cobra-slate truncate" title={formatCurrency(contract.totalValue)}>{formatCurrency(contract.totalValue)}</span>
                </div>

                <div className="flex flex-col w-24 shrink-0">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Fecha Fin</span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                    <i className="ph ph-calendar-blank text-slate-400"></i>
                    {contract.endDate}
                  </div>
                </div>

                <div className="flex flex-col w-32 shrink-0">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Ejecución</span>
                    <span className="text-[10px] font-bold text-cobra-slate">{contract.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cobra-primary rounded-full transition-all duration-1000"
                      style={{ width: `${contract.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="hidden lg:flex w-8 h-8 rounded-full bg-slate-50 items-center justify-center text-slate-400 group-hover:bg-cobra-primary group-hover:text-white transition-colors shrink-0">
                  <i className="ph ph-caret-right text-base"></i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Pagination */}
      {filteredContracts.length > 0 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-sm text-slate-500 font-medium">
            Mostrando <span className="font-bold text-cobra-slate">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-bold text-cobra-slate">{Math.min(currentPage * itemsPerPage, filteredContracts.length)}</span> de <span className="font-bold text-cobra-slate">{filteredContracts.length}</span> contratos
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ph ph-caret-left"></i>
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm transition-colors ${
                  currentPage === i + 1 
                    ? 'bg-cobra-primary text-white font-bold shadow-md shadow-cobra-primary/20' 
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ph ph-caret-right"></i>
            </button>
          </div>
        </div>
      )}
      
      <div className="h-8"></div>
    </div>
  );
};

export default ContractsListView;
