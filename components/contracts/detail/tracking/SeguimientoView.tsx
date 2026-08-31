
import React, { useState } from 'react';
import { MOCK_OBLIGATIONS, MOCK_MONITORING } from '../../../../constants';
import { ContractObligation, MonitoringReport } from '../../../../types';

const SeguimientoView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'obligations' | 'history'>('obligations');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-8 max-w-[1400px] w-full mx-auto animate-in fade-in duration-500">
      
      {/* KPIs de Seguimiento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPIItem label="Obligaciones Activas" value={MOCK_OBLIGATIONS.length.toString()} icon="ph-list-checks" color="bg-blue-50 text-blue-600" />
        <KPIItem label="Informes Cargados" value={MOCK_MONITORING.length.toString()} icon="ph-file-arrow-up" color="bg-emerald-50 text-emerald-600" />
        <KPIItem label="Cumplimiento Global" value="85%" icon="ph-chart-pie-slice" color="bg-indigo-50 text-indigo-600" trend="Sobre meta del 90%" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Cabecera de Pestañas Internas */}
        <div className="px-8 pt-8 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-50">
          <div className="flex gap-10">
            <SubTabButton 
              active={activeTab === 'obligations'} 
              label="Obligaciones Contractuales" 
              icon="ph-clipboard-text" 
              onClick={() => setActiveTab('obligations')} 
            />
            <SubTabButton 
              active={activeTab === 'history'} 
              label="Histórico de Seguimientos" 
              icon="ph-clock-counter-clockwise" 
              onClick={() => setActiveTab('history')} 
            />
          </div>
          
          <div className="pb-4">
             <button 
               onClick={() => setIsModalOpen(true)}
               className="px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-[13px] font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2 group active:scale-95"
             >
               <i className={`ph-bold ${activeTab === 'obligations' ? 'ph-plus' : 'ph-file-plus'} text-lg group-hover:rotate-90 transition-transform`}></i>
               {activeTab === 'obligations' ? 'AGREGAR OBLIGACIÓN' : 'NUEVO SEGUIMIENTO'}
             </button>
          </div>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className="px-8 py-4 bg-slate-50/30 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-100">
          <div className="relative w-full max-w-md">
            <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder={`Filtrar ${activeTab === 'obligations' ? 'obligaciones' : 'informes'} por descripción o usuario...`}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none text-sm font-medium transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
            <i className="ph ph-info-bold text-base"></i>
            Mostrando registros oficiales del sistema central
          </div>
        </div>

        {/* Contenido Dinámico */}
        <div className="overflow-x-auto flex-1">
          {activeTab === 'obligations' ? (
            <ObligationsTable obligations={MOCK_OBLIGATIONS} />
          ) : (
            <MonitoringTable reports={MOCK_MONITORING} />
          )}
        </div>
      </div>

      {/* Modal Simulado para Obligación */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-cobra-slate/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-xl relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-black text-cobra-text-main flex items-center gap-2">
                <i className="ph ph-plus-circle text-emerald-600"></i>
                Agregar Nueva Obligación
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
                <i className="ph ph-x font-bold text-slate-400"></i>
              </button>
            </div>
            <div className="p-8 space-y-6">
               <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Descripción de la Obligación</label>
                  <textarea 
                    rows={4}
                    placeholder="Escriba acá sus obligaciones detalladas..."
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none text-sm font-medium italic text-cobra-text-main resize-none"
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Categoría</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold outline-none focus:border-emerald-500 transition-all">
                       <option>Técnica</option>
                       <option>Administrativa</option>
                       <option>Financiera</option>
                       <option>Legal</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest ml-1">Prioridad</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold outline-none focus:border-emerald-500 transition-all">
                       <option>Alta</option>
                       <option>Media</option>
                       <option>Baja</option>
                    </select>
                 </div>
               </div>
               <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95">
                    GUARDAR OBLIGACIÓN
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="px-6 py-4 bg-slate-100 text-cobra-text-main rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
                    Cancelar
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ObligationsTable: React.FC<{ obligations: ContractObligation[] }> = ({ obligations }) => (
  <table className="w-full text-left border-collapse">
    <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
      <tr>
        <th className="px-8 py-4">Consecutivo</th>
        <th className="px-8 py-4">Descripción de la Obligación</th>
        <th className="px-8 py-4">F. Creación</th>
        <th className="px-8 py-4">Usuario</th>
        <th className="px-8 py-4 text-right">Consultar</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-50 bg-white">
      {obligations.map((ob) => (
        <tr key={ob.id} className="hover:bg-slate-50/80 transition-all group">
          <td className="px-8 py-6">
            <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[12px] font-black text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
              {ob.consecutive}
            </span>
          </td>
          <td className="px-8 py-6">
            <div className="flex gap-3">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
              <p className="text-[13px] font-medium text-cobra-text-main leading-relaxed italic max-w-xl group-hover:text-emerald-700 transition-colors">
                "{ob.description}"
              </p>
            </div>
          </td>
          <td className="px-8 py-6">
            <span className="text-[13px] font-bold text-cobra-text-main tabular-nums">{ob.creationDate}</span>
          </td>
          <td className="px-8 py-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <i className="ph ph-user text-[10px]"></i>
              </div>
              <span className="text-[12px] font-bold text-cobra-text-secondary">{ob.user}</span>
            </div>
          </td>
          <td className="px-8 py-6 text-right">
             <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <i className="ph-bold ph-eye text-xl"></i>
             </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const MonitoringTable: React.FC<{ reports: MonitoringReport[] }> = ({ reports }) => (
  <table className="w-full text-left border-collapse">
    <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
      <tr>
        <th className="px-8 py-4">Consecutivo</th>
        <th className="px-8 py-4">Período Seg. (Inicio – Fin)</th>
        <th className="px-8 py-4">F. Informe Cargado</th>
        <th className="px-8 py-4">Usuario</th>
        <th className="px-8 py-4">Estado Seguimiento</th>
        <th className="px-8 py-4 text-right">Consultar</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-50 bg-white">
      {reports.map((report) => (
        <tr key={report.id} className="hover:bg-slate-50/80 transition-all group">
          <td className="px-8 py-6 whitespace-nowrap">
            <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[12px] font-black text-slate-500">
              {report.consecutive}
            </span>
          </td>
          <td className="px-8 py-6">
            <div className="flex items-center gap-2 text-[13px] font-black text-cobra-text-main bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 w-fit">
              <i className="ph ph-calendar text-slate-400"></i>
              ({report.periodStart} – {report.periodEnd})
            </div>
          </td>
          <td className="px-8 py-6">
            <span className="text-[13px] font-bold text-cobra-text-main tabular-nums">{report.uploadDate}</span>
          </td>
          <td className="px-8 py-6">
            <span className="text-[12px] font-bold text-cobra-text-secondary">{report.user}</span>
          </td>
          <td className="px-8 py-6">
            <StatusBadge status={report.status} />
          </td>
          <td className="px-8 py-6 text-right">
             <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <i className="ph-bold ph-eye text-xl"></i>
             </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const StatusBadge: React.FC<{ status: MonitoringReport['status'] }> = ({ status }) => {
  const config = {
    'Completado': 'bg-green-50 text-green-700 border-green-100 ph-check-circle',
    'Firma Supervisor': 'bg-amber-50 text-amber-700 border-amber-100 ph-signature',
    'Borrador': 'bg-slate-50 text-slate-500 border-slate-100 ph-pencil-simple',
    'Pendiente': 'bg-red-50 text-red-700 border-red-100 ph-warning-circle'
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight border ${config[status].split(' ').slice(0,3).join(' ')}`}>
      <i className={`ph-fill ${config[status].split(' ').pop()} text-sm`}></i>
      {status}
    </span>
  );
};

const KPIItem: React.FC<{ label: string; value: string; icon: string; color: string; trend?: string }> = ({ label, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 transition-transform group-hover:rotate-6 ${color}`}>
      <i className={`ph ${icon} text-3xl`}></i>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-3xl font-black text-cobra-text-main tabular-nums leading-none mb-1">{value}</h4>
      {trend && <p className="text-[11px] font-bold text-slate-500">{trend}</p>}
    </div>
  </div>
);

const SubTabButton: React.FC<{ active: boolean; label: string; icon: string; onClick: () => void }> = ({ active, label, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`pb-4 px-2 text-[13px] font-black uppercase tracking-tight flex items-center gap-2 border-b-2 transition-all ${active ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-cobra-text-main'}`}
  >
    <i className={`ph ${icon} ${active ? 'text-emerald-600 font-bold' : 'text-slate-300'}`}></i>
    {label}
  </button>
);

export default SeguimientoView;
