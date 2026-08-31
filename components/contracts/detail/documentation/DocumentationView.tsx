
import React, { useState, useMemo } from 'react';
import { DOCUMENT_FOLDERS, MOCK_DOCUMENTS } from '../../../../constants';
import { AppDocument } from '../../../../types';
import UploadDocumentModal from './UploadDocumentModal';

type SortConfig = {
  key: keyof AppDocument | null;
  direction: 'asc' | 'desc';
};

const DocumentationView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'current' | 'history'>('current');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  // Obtener todos los tipos únicos y sus conteos reales basados en los documentos mock
  const documentTypesWithCounts = useMemo(() => {
    const types: Record<string, number> = {};
    MOCK_DOCUMENTS.forEach(doc => {
      if (selectedFolder && doc.folder !== selectedFolder) return;
      types[doc.type] = (types[doc.type] || 0) + 1;
    });
    return Object.entries(types).sort((a, b) => b[1] - a[1]);
  }, [selectedFolder]);

  // Lógica de ordenamiento
  const handleSort = (key: keyof AppDocument) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filtrado y Ordenamiento de documentos
  const filteredDocuments = useMemo(() => {
    let docs = MOCK_DOCUMENTS.filter(doc => {
      const matchesFolder = selectedFolder ? doc.folder === selectedFolder : true;
      const matchesType = selectedType ? doc.type === selectedType : true;
      const matchesYear = selectedYear ? doc.year === selectedYear : true;
      const matchesSearch = searchQuery 
        ? (doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           doc.type.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      
      return matchesFolder && matchesType && matchesYear && matchesSearch;
    });

    if (sortConfig.key) {
      docs.sort((a, b) => {
        const valA = a[sortConfig.key!] || '';
        const valB = b[sortConfig.key!] || '';
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return docs.slice(0, itemsPerPage); // Simulación de paginación básica
  }, [selectedFolder, selectedType, selectedYear, searchQuery, sortConfig, itemsPerPage]);

  const clearFilters = () => {
    setSelectedFolder(null);
    setSelectedType(null);
    setSelectedYear(null);
    setSearchQuery('');
  };

  const hasActiveFilters = !!(selectedFolder || selectedType || selectedYear || searchQuery);

  const SortIcon = ({ column }: { column: keyof AppDocument }) => {
    if (sortConfig.key !== column) return <i className="ph ph-caret-up-down opacity-30 ml-1"></i>;
    return sortConfig.direction === 'asc' 
      ? <i className="ph-fill ph-caret-up text-cobra-primary ml-1"></i> 
      : <i className="ph-fill ph-caret-down text-cobra-primary ml-1"></i>;
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-[1400px] w-full mx-auto">
      <UploadDocumentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Cabecera de Documentos con Sub-Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveSubTab('current')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeSubTab === 'current' ? 'bg-cobra-primary text-white shadow-md shadow-red-500/20' : 'text-cobra-text-secondary hover:bg-slate-50'
            }`}
          >
            Documentos Actuales
          </button>
          <button 
            onClick={() => setActiveSubTab('history')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeSubTab === 'history' ? 'bg-cobra-primary text-white shadow-md shadow-red-500/20' : 'text-cobra-text-secondary hover:bg-slate-50'
            }`}
          >
            Histórico
          </button>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-cobra-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-red-500/30 hover:bg-cobra-hover hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <i className="ph ph-plus-circle text-xl"></i>
          SUBIR DOCUMENTO
        </button>
      </div>

      {/* Sección de Carpetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DOCUMENT_FOLDERS.map((folder) => (
          <div 
            key={folder.id} 
            onClick={() => {
              setSelectedFolder(selectedFolder === folder.name ? null : folder.name);
              setSelectedType(null);
            }}
            className={`p-6 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${
              selectedFolder === folder.name 
              ? 'bg-red-50 border-cobra-primary shadow-md' 
              : 'bg-white border-slate-200 shadow-sm hover:border-cobra-primary'
            }`}
          >
            {selectedFolder === folder.name && (
              <div className="absolute top-2 right-2">
                <i className="ph-fill ph-check-circle text-cobra-primary text-lg"></i>
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                selectedFolder === folder.name ? 'bg-cobra-primary text-white' : 'bg-slate-50 text-cobra-primary group-hover:bg-cobra-soft'
              }`}>
                <i className={`ph-fill ${folder.icon} text-2xl`}></i>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full transition-all ${
                selectedFolder === folder.name ? 'bg-cobra-primary text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-cobra-primary group-hover:text-white'
              }`}>
                {folder.count} DOCS
              </span>
            </div>
            <h4 className={`text-sm font-black uppercase tracking-widest ${selectedFolder === folder.name ? 'text-cobra-primary' : 'text-cobra-text-main'}`}>
              {folder.name}
            </h4>
            <p className="text-[11px] text-cobra-text-secondary mt-1 font-medium italic">Gestión de {folder.name.toLowerCase()}</p>
          </div>
        ))}
      </div>

      {/* Barra de Filtros Activos */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300 bg-white/50 p-2 pl-4 rounded-2xl border border-dashed border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest mr-2">Filtros Activos:</span>
            {selectedFolder && <FilterTag label="Carpeta" value={selectedFolder} onRemove={() => setSelectedFolder(null)} />}
            {selectedType && <FilterTag label="Tipo" value={selectedType} onRemove={() => setSelectedType(null)} />}
            {selectedYear && <FilterTag label="Año" value={selectedYear} onRemove={() => setSelectedYear(null)} />}
            {searchQuery && <FilterTag label="Búsqueda" value={searchQuery} onRemove={() => setSearchQuery('')} />}
          </div>
          <button 
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-cobra-primary rounded-xl text-[12px] font-bold hover:bg-red-100 transition-all shadow-sm shrink-0 border border-red-100"
            title="Limpiar todos los filtros"
          >
            <i className="ph ph-funnel-simple-x text-base"></i>
            Limpiar Filtros
          </button>
        </div>
      )}

      {/* Listado y Filtros Principales */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        {/* Sidebar de Tipos */}
        <div className="w-full lg:w-72 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-100 p-6">
          <h5 className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest mb-6">Tipos de Documentos</h5>
          <div className="space-y-1">
            <button 
              onClick={() => setSelectedType(null)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
                selectedType === null ? 'bg-white border-slate-200 shadow-sm text-cobra-primary' : 'border-transparent text-cobra-text-secondary hover:bg-slate-100 hover:text-cobra-text-main'
              } group`}
            >
              <div className="flex items-center gap-3">
                <i className={`ph ph-squares-four ${selectedType === null ? 'text-cobra-primary' : 'text-slate-300'}`}></i>
                <span className="text-[13px] font-bold">Todos los tipos</span>
              </div>
            </button>
            {documentTypesWithCounts.map(([type, count]) => (
              <button 
                key={type}
                onClick={() => setSelectedType(type)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
                  selectedType === type ? 'bg-white border-slate-200 shadow-sm text-cobra-primary' : 'border-transparent text-cobra-text-secondary hover:bg-slate-100 hover:text-cobra-text-main'
                } group`}
              >
                <div className="flex items-center gap-3">
                  <i className={`ph ph-file ${selectedType === type ? 'text-cobra-primary' : 'text-slate-300'}`}></i>
                  <span className="text-[13px] font-bold text-left leading-tight">{type}</span>
                </div>
                <span className="text-[11px] font-black tabular-nums shrink-0">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabla de Documentos */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o palabra clave..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-slate-200 outline-none text-sm transition-all shadow-inner"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <select 
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value || null)}
                className="flex-1 md:flex-none px-4 py-3 bg-slate-50 rounded-2xl text-xs font-bold border border-transparent outline-none focus:bg-white focus:border-slate-200 transition-all cursor-pointer"
              >
                <option value="">Todos los Años</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <button 
                onClick={clearFilters}
                className={`px-4 py-3 rounded-2xl transition-all ${hasActiveFilters ? 'bg-red-50 text-cobra-primary hover:bg-red-100' : 'bg-slate-100 text-slate-400 cursor-default'}`}
                title="Limpiar filtros"
              >
                <i className="ph ph-funnel-simple-x text-lg"></i>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-slate-50 text-[11px] font-bold text-cobra-text-secondary uppercase tracking-wider border-b border-slate-100 z-10">
                <tr>
                  <th className="px-8 py-4 cursor-pointer hover:text-cobra-text-main transition-colors" onClick={() => handleSort('name')}>
                    <div className="flex items-center">Nombre Documento <SortIcon column="name" /></div>
                  </th>
                  <th className="px-8 py-4 cursor-pointer hover:text-cobra-text-main transition-colors" onClick={() => handleSort('type')}>
                    <div className="flex items-center">Tipo <SortIcon column="type" /></div>
                  </th>
                  <th className="px-8 py-4 cursor-pointer hover:text-cobra-text-main transition-colors" onClick={() => handleSort('date')}>
                    <div className="flex items-center">Fecha Carga <SortIcon column="date" /></div>
                  </th>
                  <th className="px-8 py-4 cursor-pointer hover:text-cobra-text-main transition-colors" onClick={() => handleSort('year')}>
                    <div className="flex items-center">Año <SortIcon column="year" /></div>
                  </th>
                  <th className="px-8 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-red-50 text-cobra-primary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-cobra-primary group-hover:text-white transition-colors shadow-sm">
                            <i className="ph-fill ph-file-pdf text-xl"></i>
                          </div>
                          <div>
                            <div className="text-[14px] font-black text-cobra-text-main leading-tight mb-0.5 group-hover:text-cobra-primary transition-colors">{doc.name}</div>
                            <div className="text-[11px] text-slate-400 font-medium italic">Archivo PDF • {doc.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-[12px] font-bold text-cobra-text-secondary bg-slate-100 px-2 py-1 rounded-lg">{doc.type}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-[12px] font-bold text-cobra-text-main tabular-nums">{doc.date}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-[11px] font-black text-slate-500">{doc.year}</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Ver Documento"><i className="ph-bold ph-eye text-lg"></i></button>
                          <button className="p-2 text-slate-400 hover:text-cobra-primary hover:bg-red-50 rounded-xl transition-all" title="Descargar"><i className="ph-bold ph-download-simple text-lg"></i></button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Eliminar"><i className="ph-bold ph-trash text-lg"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <i className="ph ph-magnifying-glass text-4xl text-slate-200"></i>
                        <p className="text-sm font-bold text-slate-400">No se encontraron documentos</p>
                        <button onClick={clearFilters} className="text-xs font-black text-cobra-primary uppercase mt-2 hover:underline">Restablecer búsqueda</button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer de Paginación con Selector de Registros */}
          <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mostrando:</span>
                <select 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-cobra-text-main outline-none focus:border-cobra-primary shadow-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">registros por página</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {filteredDocuments.length} de {MOCK_DOCUMENTS.length} registros totales
              </span>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all shadow-sm">
                  <i className="ph ph-caret-left"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-cobra-primary text-white font-black text-xs shadow-md shadow-red-500/20">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all shadow-sm">
                  <i className="ph ph-caret-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Interno para los Tags de Filtro
const FilterTag: React.FC<{ label: string; value: string; onRemove: () => void }> = ({ label, value, onRemove }) => (
  <button 
    onClick={onRemove}
    className="px-4 py-1.5 bg-[#5cb85c] text-white rounded-full text-[12px] font-bold flex items-center gap-2 hover:bg-[#4cae4c] transition-colors shadow-sm animate-in zoom-in duration-150"
  >
    <span className="opacity-80 font-medium">{label}:</span> {value} 
    <i className="ph ph-x text-[10px]"></i>
  </button>
);

export default DocumentationView;
