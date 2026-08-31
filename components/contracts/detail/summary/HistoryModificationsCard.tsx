
import React from 'react';
import { HistoryState, Modification } from '../../../../types';

interface Props {
  history: HistoryState[];
  modifications: Modification[];
}

const HistoryModificationsCard: React.FC<Props> = ({ history, modifications }) => {
  const allEvents = [
    ...history.map(h => ({ ...h, eventType: 'state' })),
    ...modifications.map(m => ({ ...m, eventType: 'modification' }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="text-base font-bold text-cobra-text-main flex items-center gap-2">
          <i className="ph ph-clock-counter-clockwise text-cobra-primary"></i>
          Trazabilidad, Estados y Modificaciones
        </h3>
        <div className="flex gap-2">
          <span className="text-[10px] bg-blue-50 border border-blue-100 px-2 py-1 rounded-full font-bold text-blue-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Estados
          </span>
          <span className="text-[10px] bg-amber-50 border border-amber-100 px-2 py-1 rounded-full font-bold text-amber-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Modificaciones
          </span>
        </div>
      </div>

      <div className="p-0">
        {allEvents.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <i className="ph ph-scroll text-3xl opacity-20"></i>
            </div>
            <p className="text-sm font-bold">Sin eventos de trazabilidad registrados</p>
            <p className="text-xs mt-1">El historial aparecerá aquí a medida que ocurran cambios de estado o adiciones.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 text-[10px] font-extrabold text-cobra-text-secondary uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Fecha Evento</th>
                  <th className="px-6 py-4">Categoría / Estado Actual</th>
                  <th className="px-6 py-4">Detalle de la Acción</th>
                  <th className="px-6 py-4 text-right">Documentación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allEvents.map((event, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-[13px] font-bold text-cobra-text-main">{(event as any).date}</div>
                      <div className="text-[10px] text-slate-400 font-medium">Hace 15 días</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${(event as any).eventType === 'state' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                        <div className="text-[13px] font-bold text-cobra-text-main group-hover:text-cobra-primary transition-colors">
                          {(event as any).eventType === 'state' ? (event as HistoryState).state : 'Modificación Contractual'}
                        </div>
                      </div>
                      <div className="text-[11px] text-cobra-text-secondary font-medium mt-0.5 ml-4 italic">
                        {(event as any).eventType === 'state' ? `Etapa: ${(event as HistoryState).subState}` : 'Ajuste de tiempos / Otros'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-[12px] text-cobra-text-main font-medium max-w-sm leading-relaxed border-l-2 border-slate-100 pl-3">
                        {(event as any).eventType === 'state' ? (event as HistoryState).observations : (event as Modification).description}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="inline-flex items-center gap-2 text-[11px] font-bold text-cobra-text-secondary hover:text-cobra-primary hover:bg-red-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-red-100 transition-all">
                        <i className="ph ph-file-pdf text-lg"></i> Soporte PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryModificationsCard;
