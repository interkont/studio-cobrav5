
import React from 'react';
import { AssociatedEntity } from '../../../../types';

interface Props {
  entities: AssociatedEntity[];
}

const EntitiesCard: React.FC<Props> = ({ entities }) => {
  const executors = entities.filter(e => e.role === 'Ejecutora');

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-base font-bold text-cobra-text-main mb-5 flex items-center gap-2">
        <i className="ph ph-users-three text-cobra-primary"></i>
        Organizaciones Ejecutoras
      </h3>
      
      <div className="space-y-4">
        {executors.map((ent, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-300 transition-all cursor-default">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-700 tracking-tighter">
                {ent.role}
              </span>
              <i className="ph ph-buildings text-slate-300"></i>
            </div>
            <div className="font-bold text-cobra-text-main text-[14px] leading-tight mb-1">{ent.name}</div>
            <div className="text-[11px] text-cobra-text-secondary font-medium">NIT/ID: <span className="text-cobra-text-main font-bold">{ent.idNumber}</span></div>
          </div>
        ))}
        {executors.length === 0 && (
          <div className="text-center py-4 text-slate-400 text-sm italic">No hay ejecutoras asignadas</div>
        )}
      </div>
    </div>
  );
};

export default EntitiesCard;
