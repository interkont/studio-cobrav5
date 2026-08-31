
import React, { useState } from 'react';
import { CONTRACT_HISTORY, CONTRACT_MODIFICATIONS, MOCK_CONTRACT } from '../../../../constants';
import { HistoryState, Modification } from '../../../../types';
import ContractModificationForm from './ContractModificationForm';
import ContractSuspensionForm from './ContractSuspensionForm';
import UnderConstruction from '../../../main/UnderConstruction';

type FlowMode = 'list' | 'modify' | 'finish';

const ChangeManagementView: React.FC = () => {
  const [mode, setMode] = useState<FlowMode>('list');
  const [selectedModType, setSelectedModType] = useState<string>('');
  const [selectedModLabel, setSelectedModLabel] = useState<string>('');
  const [selectedFinishType, setSelectedFinishType] = useState<string>('');
  const [selectedFinishLabel, setSelectedFinishLabel] = useState<string>('');

  const allEvents = [
    ...CONTRACT_HISTORY.map(h => ({ ...h, eventType: 'state' })),
    ...CONTRACT_MODIFICATIONS.map(m => ({ ...m, eventType: 'modification' }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleStartModification = () => {
    if (!selectedModType) return;
    setMode('modify');
  };

  const handleStartFinish = () => {
    if (!selectedFinishType) return;
    setMode('finish');
  };

  const onModSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedModType(value);
    setSelectedModLabel(e.target.options[e.target.selectedIndex].text);
    setSelectedFinishType('');
    setSelectedFinishLabel('');
  };

  const onFinishSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedFinishType(value);
    setSelectedFinishLabel(e.target.options[e.target.selectedIndex].text);
    setSelectedModType('');
    setSelectedModLabel('');
  };

  if (mode === 'modify') {
    // Si es suspensión, usamos el nuevo componente especializado
    if (selectedModType === 'suspension') {
      return (
        <ContractSuspensionForm 
          contract={MOCK_CONTRACT}
          onBack={() => {
            setMode('list');
            setSelectedModType('');
          }}
        />
      );
    }
    
    return (
      <ContractModificationForm 
        modType={selectedModType} 
        modLabel={selectedModLabel}
        contract={MOCK_CONTRACT}
        onBack={() => {
          setMode('list');
          setSelectedModType('');
        }} 
      />
    );
  }

  if (mode === 'finish') {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-8 max-w-[1400px] mx-auto">
          <button 
            onClick={() => setMode('list')}
            className="mb-6 flex items-center gap-2 text-cobra-text-secondary font-black hover:text-cobra-primary transition-colors text-xs uppercase tracking-widest"
          >
            <i className="ph ph-arrow-left"></i> VOLVER A LA LISTA
          </button>
          <UnderConstruction 
            title={selectedFinishLabel || "Trámite de Finalización"} 
            icon="ph-flag-checkered" 
            description="Módulo especializado en el cierre jurídico: Actas de liquidación, balance financiero final y gestión de saldos remanentes."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-10 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-cobra-text-main flex items-center gap-3">
          <i className="ph ph-pencil-circle text-cobra-primary text-3xl"></i>
          Gestión de Novedades y Cambios
        </h2>
        <p className="text-sm text-cobra-text-secondary font-medium italic">Seleccione una categoría de trámite administrativo para este contrato.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`bg-white rounded-[2.5rem] p-10 border transition-all relative overflow-hidden ${selectedModType ? 'border-indigo-600 shadow-2xl scale-[1.02] z-10' : 'border-slate-200 shadow-sm opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'}`}>
           <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${selectedModType ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
           <div className="flex items-center gap-4 mb-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${selectedModType ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-300'}`}>
                <i className="ph ph-stack-overflow text-4xl"></i>
              </div>
              <div>
                <h3 className={`text-xl font-black ${selectedModType ? 'text-cobra-text-main' : 'text-slate-400'}`}>Modificar Contrato</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Plazos, Valores y Otrosí</p>
              </div>
           </div>
           
           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Tipo de Trámite</label>
                <select 
                  className={`w-full px-6 py-4 rounded-2xl border text-sm font-bold outline-none transition-all cursor-pointer ${selectedModType ? 'bg-white border-indigo-200' : 'bg-slate-50 border-slate-100'}`}
                  value={selectedModType}
                  onChange={onModSelect}
                >
                  <option value="">ELIJA UNA OPCIÓN...</option>
                  <option value="prorroga">PRÓRROGA DE TIEMPO</option>
                  <option value="adicion">ADICIÓN PRESUPUESTAL</option>
                  <option value="otrosi">OTROSÍ / MODIFICATORIO</option>
                  <option value="suspension">SUSPENSIÓN TEMPORAL / REINICIO</option>
                  <option value="otros">OTROS CAMBIOS (HABILITA TODO EL FORMULARIO)</option>
                </select>
              </div>
              
              {selectedModType && (
                <button 
                  onClick={handleStartModification}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all animate-in slide-in-from-top-2 flex items-center justify-center gap-2"
                >
                  INICIAR TRÁMITE <i className="ph ph-arrow-right"></i>
                </button>
              )}
           </div>
        </div>

        <div className={`bg-white rounded-[2.5rem] p-10 border transition-all relative overflow-hidden ${selectedFinishType ? 'border-red-600 shadow-2xl scale-[1.02] z-10' : 'border-slate-200 shadow-sm opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'}`}>
           <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${selectedFinishType ? 'bg-red-600' : 'bg-slate-300'}`}></div>
           <div className="flex items-center gap-4 mb-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${selectedFinishType ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-300'}`}>
                <i className="ph ph-flag-checkered text-4xl"></i>
              </div>
              <div>
                <h3 className={`text-xl font-black ${selectedFinishType ? 'text-cobra-text-main' : 'text-slate-400'}`}>Finalizar Contrato</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Liquidación y Cierre</p>
              </div>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Tipo de Cierre</label>
                <select 
                  className={`w-full px-6 py-4 rounded-2xl border text-sm font-bold outline-none transition-all cursor-pointer ${selectedFinishType ? 'bg-white border-red-200' : 'bg-slate-50 border-slate-100'}`}
                  value={selectedFinishType}
                  onChange={onFinishSelect}
                >
                  <option value="">ELIJA UNA OPCIÓN...</option>
                  <option value="terminacion">TERMINACIÓN ANTICIPADA</option>
                  <option value="liquidacion">LIQUIDACIÓN DE MUTUO ACUERDO</option>
                  <option value="unilateral">LIQUIDACIÓN UNILATERAL</option>
                </select>
              </div>

              {selectedFinishType && (
                <button 
                  onClick={handleStartFinish}
                  className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all animate-in slide-in-from-top-2 flex items-center justify-center gap-2"
                >
                  INICIAR CIERRE <i className="ph ph-arrow-right"></i>
                </button>
              )}
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mt-2">
        <div className="p-8 border-b border-slate-100 bg-slate-50/30">
          <h3 className="text-lg font-black text-cobra-text-main flex items-center gap-2">
            <i className="ph ph-clock-counter-clockwise text-cobra-primary"></i>
            Trazabilidad Histórica de Cambios
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-10 py-5">Fecha</th>
                <th className="px-10 py-5">Trámite</th>
                <th className="px-10 py-5">Observaciones</th>
                <th className="px-10 py-5 text-right">Ver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {allEvents.map((event, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-7 text-[13px] font-black text-cobra-text-main">{(event as any).date}</td>
                  <td className="px-10 py-7">
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase border ${(event as any).eventType === 'state' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                      {(event as any).eventType === 'state' ? (event as HistoryState).state : 'Modificación'}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-[13px] text-cobra-text-secondary italic max-w-sm truncate">
                    {(event as any).eventType === 'state' ? (event as HistoryState).observations : (event as Modification).description}
                  </td>
                  <td className="px-10 py-7 text-right">
                    <button className="p-2.5 bg-slate-50 text-slate-300 rounded-xl hover:text-cobra-primary transition-all">
                      <i className="ph-bold ph-file-pdf text-xl"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChangeManagementView;
