
import React from 'react';
import { InsurancePolicy } from '../../../../types';

interface Props {
  policies: InsurancePolicy[];
  onNavigateToManagement: () => void;
}

const InsurancePoliciesCard: React.FC<Props> = ({ policies, onNavigateToManagement }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="text-base font-black text-cobra-text-main flex items-center gap-2">
          <i className="ph-fill ph-shield-check text-cobra-primary text-xl"></i>
          Garantías y Seguros (Cumplimiento)
        </h3>
        <button 
          onClick={onNavigateToManagement}
          className="text-[12px] font-black text-cobra-primary hover:underline flex items-center gap-1.5 uppercase tracking-tight"
        >
          Ir a Gestión de Pólizas <i className="ph-bold ph-arrow-right"></i>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-8 py-4">Tipo de Póliza / ID</th>
              <th className="px-8 py-4">Cobertura Principal</th>
              <th className="px-8 py-4">Aseguradora</th>
              <th className="px-8 py-4">Valor Asegurado</th>
              <th className="px-8 py-4">Vigencia</th>
              <th className="px-8 py-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {policies.map((policy) => (
              <tr key={policy.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="text-[13px] font-black text-cobra-text-main leading-tight">{policy.type}</div>
                  <div className="text-[11px] text-slate-400 font-bold mt-0.5">#{policy.id}</div>
                </td>
                <td className="px-8 py-5">
                  <div className="text-[12px] text-cobra-text-secondary font-medium max-w-[200px] leading-snug">
                    {policy.coverage}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white rounded-lg border border-slate-100 flex items-center justify-center text-slate-400">
                      <i className="ph ph-buildings text-sm"></i>
                    </div>
                    <span className="text-[13px] font-bold text-cobra-text-main">{policy.insurer}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[13px] font-black text-cobra-text-main tabular-nums">
                    {formatCurrency(policy.value)}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-cobra-text-main">{policy.endDate}</span>
                    <span className="text-[10px] text-slate-400 font-medium italic">Inicio: {policy.startDate}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <PolicyStatusBadge status={policy.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PolicyStatusBadge: React.FC<{ status: InsurancePolicy['status'] }> = ({ status }) => {
  const styles = {
    'Vigente': 'bg-green-50 text-green-700 border-green-100',
    'Vencida': 'bg-red-50 text-red-700 border-red-100',
    'Próximo Vencimiento': 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
  };
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Vigente' ? 'bg-green-500' : status === 'Vencida' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
      {status}
    </span>
  );
};

export default InsurancePoliciesCard;
