
import React from 'react';
import { TABS } from '../../../constants';

interface Props {
  activeTab: string;
  onTabChange: (id: string) => void;
}

const NavigationTabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 shrink-0 relative">
      <div className="px-8 flex overflow-x-auto no-scrollbar">
        <nav className="flex gap-4 md:gap-8 min-w-max h-16 items-center">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2.5 h-full px-1 text-[13px] font-black uppercase tracking-tight border-b-2 transition-all group outline-none shrink-0 ${
                activeTab === tab.id
                  ? 'border-cobra-primary text-cobra-primary'
                  : 'border-transparent text-cobra-text-secondary hover:text-cobra-text-main'
              }`}
              title={tab.label}
            >
              <i className={`ph ${tab.icon} text-xl ${activeTab === tab.id ? 'font-bold' : 'text-slate-400 group-hover:text-cobra-text-main'}`}></i>
              {!tab.iconOnly && <span>{tab.label}</span>}
              {tab.count !== undefined && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black tabular-nums ${
                  activeTab === tab.id ? 'bg-red-50 text-cobra-primary' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavigationTabs;
