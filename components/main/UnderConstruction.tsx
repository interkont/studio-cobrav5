
import React from 'react';

interface Props {
  title: string;
  icon: string;
  description?: string;
}

const UnderConstruction: React.FC<Props> = ({ title, icon, description }) => {
  return (
    <div className="p-8 max-w-[1400px] w-full mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 p-20 flex flex-col items-center justify-center text-center shadow-sm min-h-[500px] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-[0.02] rotate-12">
            <i className={`ph ${icon} text-[200px]`}></i>
        </div>
        
        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-8 border border-slate-100 shadow-inner relative z-10">
          <i className={`ph ${icon} text-5xl animate-pulse`}></i>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-black text-cobra-text-main mb-4 tracking-tight uppercase">{title}</h3>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 border border-amber-100">
             <i className="ph-fill ph-warning-circle"></i>
             Módulo en Desarrollo
          </div>
          <p className="text-cobra-text-secondary max-w-lg mx-auto font-medium leading-relaxed italic">
            {description || `Estamos trabajando en la reconstrucción del módulo de ${title.toLowerCase()} para ofrecerle una experiencia de gestión contractual de alto rendimiento.`}
          </p>
        </div>

        <div className="mt-12 flex gap-4 relative z-10">
           <div className="w-2 h-2 rounded-full bg-cobra-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
           <div className="w-2 h-2 rounded-full bg-cobra-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
           <div className="w-2 h-2 rounded-full bg-cobra-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
