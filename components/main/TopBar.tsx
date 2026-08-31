
import React from 'react';

const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="text-xs text-cobra-text-secondary flex items-center gap-2">
        <i className="ph ph-house text-base"></i> / Contratos / <span className="text-cobra-text-main font-semibold">CTOD121</span>
      </div>

      <div className="bg-slate-100 rounded-lg py-2 px-4 flex items-center gap-2 text-cobra-text-secondary text-[13px] w-[300px] border border-transparent hover:border-gray-300 hover:bg-white transition-all group cursor-pointer">
        <i className="ph ph-magnifying-glass"></i>
        <span>Buscar en contratos...</span>
        <span className="ml-auto bg-white border border-gray-300 rounded px-1.5 py-0.5 text-[10px] font-mono shadow-sm">⌘ K</span>
      </div>
    </header>
  );
};

export default TopBar;
