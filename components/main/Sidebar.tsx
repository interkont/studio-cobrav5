
import React, { useState } from 'react';
import { NavItem } from '../../types';
import { SIDEBAR_ITEMS } from '../../constants';

interface SidebarProps {
  onNavigateToContracts?: () => void;
  onNavigateToProjects?: () => void;
  currentModule?: 'contracts' | 'projects';
  currentView?: 'list' | 'detail';
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigateToContracts, onNavigateToProjects, currentModule, currentView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`${isCollapsed ? 'w-[88px]' : 'w-[260px]'} bg-cobra-slate flex flex-col py-6 shrink-0 border-r border-cobra-slate-light h-full overflow-y-auto transition-all duration-300 relative group/sidebar`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-cobra-primary text-white rounded-full flex items-center justify-center shadow-lg z-10 opacity-0 group-hover/sidebar:opacity-100 transition-opacity"
      >
        <i className={`ph ${isCollapsed ? 'ph-caret-right' : 'ph-caret-left'} text-xs`}></i>
      </button>

      <div className={`flex items-center gap-3 text-white font-bold text-xl mb-10 cursor-default transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'pl-9'}`}>
        <i className="ph ph-shield-check text-cobra-primary text-3xl shrink-0"></i>
        {!isCollapsed && <div className="animate-in fade-in duration-300 whitespace-nowrap">Cobra <span className="text-cobra-primary">Corp</span></div>}
      </div>

      <div className="mb-6 px-4">
        {!isCollapsed ? (
          <div className="text-[#475569] text-[11px] uppercase tracking-widest font-bold mb-3 pl-5 animate-in fade-in duration-300">Principal</div>
        ) : (
          <div className="h-4 mb-3 flex justify-center items-center"><div className="w-4 h-[2px] bg-[#475569] rounded-full"></div></div>
        )}
        <nav className="flex flex-col gap-1">
          {SIDEBAR_ITEMS.slice(0, 3).map((item) => (
            <SidebarItem 
              key={item.id} 
              item={{...item, active: item.id === currentModule}}
              isCollapsed={isCollapsed}
              onClick={() => {
                if (item.id === 'contracts' && onNavigateToContracts) onNavigateToContracts();
                if (item.id === 'projects' && onNavigateToProjects) onNavigateToProjects();
              }}
            />
          ))}
        </nav>
      </div>

      <div className="mb-6 px-4">
        {!isCollapsed ? (
          <div className="text-[#475569] text-[11px] uppercase tracking-widest font-bold mb-3 pl-5 animate-in fade-in duration-300">Gestión</div>
        ) : (
          <div className="h-4 mb-3 flex justify-center items-center"><div className="w-4 h-[2px] bg-[#475569] rounded-full"></div></div>
        )}
        <nav className="flex flex-col gap-1">
          {SIDEBAR_ITEMS.slice(3).map((item) => (
            <SidebarItem key={item.id} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>

      <div className={`mt-auto border-t border-cobra-slate-light pt-4 flex items-center text-white transition-all duration-300 ${isCollapsed ? 'justify-center px-0 flex-col gap-4' : 'gap-3 px-8'}`}>
        <div className="w-10 h-10 bg-cobra-slate-light rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-inner border border-cobra-slate-light/50">JD</div>
        {!isCollapsed && (
          <div className="text-[13px] flex-1 min-w-0 animate-in fade-in duration-300">
            <div className="font-semibold truncate">Juan Director</div>
            <div className="text-cobra-text-secondary text-[11px] truncate">Admin</div>
          </div>
        )}
        <i 
          className="ph ph-sign-out text-cobra-primary cursor-pointer hover:scale-110 transition-transform text-lg shrink-0" 
          onClick={() => alert('Sesión cerrada (Simulado)')}
          title="Cerrar sesión"
        ></i>
      </div>
    </aside>
  );
};

const SidebarItem: React.FC<{ item: NavItem, isCollapsed: boolean, onClick?: () => void }> = ({ item, isCollapsed, onClick }) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
      className={`flex items-center p-3 rounded-xl text-sm font-medium transition-all group relative ${onClick ? 'cursor-pointer hover:bg-cobra-slate-light' : 'cursor-default'} ${
        item.active 
          ? 'bg-cobra-primary text-white shadow-lg shadow-cobra-primary/30' 
          : 'text-cobra-text-secondary opacity-60 hover:opacity-100'
      } ${isCollapsed ? 'justify-center' : 'gap-3 pl-5'}`}
      title={isCollapsed ? item.label : undefined}
    >
      <i className={`ph ${item.icon} text-xl shrink-0`}></i>
      {!isCollapsed && <span className="truncate animate-in fade-in duration-300">{item.label}</span>}
      
      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-cobra-slate-light text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 border border-slate-700 shadow-xl">
          {item.label}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-cobra-slate-light rotate-45 border-l border-b border-slate-700"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
