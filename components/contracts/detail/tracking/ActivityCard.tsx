
import React from 'react';
import { ActivityItem } from '../../../../types';

interface Props {
  activities: ActivityItem[];
}

const ActivityCard: React.FC<Props> = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col gap-5">
      <h3 className="text-base font-bold text-cobra-text-main">Actividad Reciente</h3>
      
      <div className="flex flex-col gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 items-start">
            <div className={`p-2.5 rounded-full shrink-0 ${activity.color}`}>
              <i className={`ph-fill ${activity.icon} text-lg`}></i>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-cobra-text-main">{activity.title}</span>
              <span className="text-[13px] text-cobra-text-secondary">{activity.description}</span>
              <span className="text-[11px] text-slate-400 mt-1">{activity.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
