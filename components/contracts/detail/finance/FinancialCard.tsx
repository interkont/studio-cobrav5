
import React from 'react';
import { ContractData } from '../../../../types';

interface Props {
  data: ContractData;
}

const FinancialCard: React.FC<Props> = ({ data }) => {
  const percentage = Math.round((data.executedValue / data.totalValue) * 100);
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-cobra-slate text-white rounded-2xl p-6 shadow-xl border-none overflow-hidden relative group h-full flex flex-col">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <i className="ph ph-bank text-8xl rotate-12"></i>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cobra-primary animate-pulse"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Ejecución Financiera</h3>
          </div>
          <i className="ph ph-trend-up text-cobra-primary text-xl"></i>
        </div>
        
        <div className="mb-auto">
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Valor Total Contrato</span>
          <span className="text-2xl font-black tracking-tighter tabular-nums leading-none">
            {formatCurrency(data.totalValue)}
          </span>
        </div>

        <div className="mt-8">
          <div className="flex justify-between text-[10px] mb-2 font-bold uppercase tracking-wider">
            <span className="text-slate-400">Ejecutado</span>
            <span className="text-cobra-primary">{percentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5 mb-4">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(239,68,68,0.4)]" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-tighter">Ejecutado</span>
              <span className="text-sm font-bold tabular-nums text-slate-200">{formatCurrency(data.executedValue)}</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-tighter">Saldo</span>
              <span className="text-sm font-bold tabular-nums text-white">{formatCurrency(data.totalValue - data.executedValue)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCard;
