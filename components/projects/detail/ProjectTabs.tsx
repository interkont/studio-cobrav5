import React, { useRef, useState, useEffect } from 'react';
import { PROJECT_TABS } from '../../../constants';

interface Props {
  activeTab: string;
  onTabChange: (id: string) => void;
}

const ProjectTabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 shrink-0 relative flex justify-center">
      <div className="relative w-full max-w-[1400px]">
        {showLeftScroll && (
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10 flex items-center justify-start pl-4 pointer-events-none">
            <button 
              onClick={() => handleScroll('left')} 
              className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-cobra-primary hover:border-cobra-primary/30 pointer-events-auto transition-colors"
            >
              <i className="ph ph-caret-left font-bold"></i>
            </button>
          </div>
        )}
        
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="px-8 flex overflow-x-auto no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <nav className="flex gap-4 md:gap-8 min-w-max h-16 items-center">
            {PROJECT_TABS.map((tab) => (
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

        {showRightScroll && (
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10 flex items-center justify-end pr-4 pointer-events-none">
            <button 
              onClick={() => handleScroll('right')} 
              className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-cobra-primary hover:border-cobra-primary/30 pointer-events-auto transition-colors"
            >
              <i className="ph ph-caret-right font-bold"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTabs;
