
import React from 'react';
import { ContractData, AssociatedEntity } from '../../../../types';
import FinancialCard from '../finance/FinancialCard';

interface Props {
  data: ContractData;
  principalEntity?: AssociatedEntity;
}

const GeneralInfoCard: React.FC<Props> = ({ data, principalEntity }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Primer Contenedor: Datos Generales + Finanzas */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-cobra-text-main flex items-center gap-2">
            <i className="ph ph-identification-card text-cobra-primary"></i>
            Información del Contrato
          </h3>
          <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">ID INTERNO: {data.internalId}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Lado Izquierdo: Campos de datos */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
              <InfoField icon="ph-buildings" label="Entidad Contratante" value={data.entity} />
              <InfoField icon="ph-file-text" label="Tipo de Contrato" value={data.type} />
              <InfoField icon="ph-path" label="Línea de Acción" value={data.actionLine} />
              <InfoField icon="ph-user-gear" label="Supervisor" value={data.supervisor} />
              <InfoField icon="ph-hash" label="Proceso SECOP" value={data.secopProcess || 'No definido'} />
              <InfoField icon="ph-calendar" label="Vigencia" value={data.years} />
            </div>
            
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] uppercase font-bold text-cobra-text-secondary block mb-1 tracking-wider">Objeto del Contrato</span>
              <p className="text-[13px] text-cobra-text-main leading-relaxed font-medium italic">
                "{data.description}"
              </p>
            </div>
          </div>

          {/* Lado Derecho: Integración de FinancialCard */}
          <div className="lg:col-span-4">
            <FinancialCard data={data} />
          </div>
        </div>
      </div>

      {/* Segundo Contenedor: Contrato Principal Asociado */}
      {principalEntity && (
        <div className="mt-auto bg-slate-100/50 border-t border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <i className="ph ph-link-simple-horizontal text-cobra-primary text-xl"></i>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-cobra-text-main">Contrato Principal Asociado</h4>
              <p className="text-[11px] text-cobra-text-secondary font-medium">Información de la entidad aportante</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Nombre del Principal</span>
              <span className="text-[13px] text-cobra-text-main font-bold truncate block">{principalEntity.name}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Valor Aportado</span>
              <span className="text-[13px] text-cobra-text-main font-bold tabular-nums">
                $ {new Intl.NumberFormat('es-CO').format(principalEntity.contribution || 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoField: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex gap-3 items-start">
    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
      <i className={`ph ${icon} text-cobra-primary text-lg`}></i>
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] text-cobra-text-secondary font-bold uppercase tracking-tight">{label}</span>
      <span className="text-[13px] text-cobra-text-main font-semibold leading-tight">{value}</span>
    </div>
  </div>
);

export default GeneralInfoCard;
