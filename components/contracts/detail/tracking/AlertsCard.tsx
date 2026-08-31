
import React from 'react';
import { Alert } from '../../../../types';

interface Props {
  alerts: Alert[];
}

const AlertsCard: React.FC<Props> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-base font-bold text-cobra-text-main mb-5">Alertas Pendientes</h3>
      
      <div className="flex flex-col gap-3">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-3.5 rounded-xl border flex gap-3 ${
              alert.type === 'danger' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'
            }`}
          >
            <i className={`ph-fill ph-warning-circle text-lg mt-0.5 ${
              alert.type === 'danger' ? 'text-red-500' : 'text-amber-500'
            }`}></i>
            <div className="text-[13px]">
              <div className={`font-bold ${alert.type === 'danger' ? 'text-red-900' : 'text-amber-900'}`}>{alert.title}</div>
              <div className={`${alert.type === 'danger' ? 'text-red-700' : 'text-amber-800'}`}>{alert.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsCard;
