const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

// 1. Add new states
content = content.replace(
  'const [sliderPosition, setSliderPosition] = useState(50);',
  `const [sliderPosition, setSliderPosition] = useState(50);

  // Scroll-driven animation states
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('down');
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const changeStep = (direction: 'up' | 'down') => {
    if (isTransitioning) return;
    if (direction === 'down' && activeStep < STEPS.length - 1) {
       setSlideDirection('down');
       setIsTransitioning(true);
       setActiveStep(prev => prev + 1);
       setTimeout(() => setIsTransitioning(false), 800);
    } else if (direction === 'up' && activeStep > 0) {
       setSlideDirection('up');
       setIsTransitioning(true);
       setActiveStep(prev => prev - 1);
       setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  const handleStepClick = (index: number) => {
    if (isTransitioning || index === activeStep) return;
    setSlideDirection(index > activeStep ? 'down' : 'up');
    setIsTransitioning(true);
    setActiveStep(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleWheel = (e: React.WheelEvent) => {
     if (viewerOpen) return;
     const target = e.target as HTMLElement;
     if (target.closest('.prevent-step-scroll')) return;
     
     if (e.deltaY > 50) changeStep('down');
     else if (e.deltaY < -50) changeStep('up');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
     setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
     if (viewerOpen || touchStartY === null) return;
     const target = e.target as HTMLElement;
     if (target.closest('.prevent-step-scroll')) return;

     const currentY = e.touches[0].clientY;
     const diff = touchStartY - currentY;

     if (diff > 50) {
        changeStep('down');
        setTouchStartY(null);
     } else if (diff < -50) {
        changeStep('up');
        setTouchStartY(null);
     }
  };`
);

// 2. Remove old animate-in
content = content.replace(/className="animate-in fade-in slide-in-from-right-8 duration-500"/g, 'className="w-full"');
content = content.replace(/className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full"/g, 'className="flex flex-col h-full w-full"');

// 3. Add .prevent-step-scroll
content = content.replace(/className="overflow-auto max-h-\[500px\] w-full bg-slate-50 flex-1 custom-scrollbar"/g, 'className="overflow-auto max-h-[500px] w-full bg-slate-50 flex-1 custom-scrollbar prevent-step-scroll"');
content = content.replace(/resize-none transition-all shadow-inner"/g, 'resize-none transition-all shadow-inner prevent-step-scroll"');
content = content.replace(/className="overflow-x-auto"/g, 'className="overflow-x-auto prevent-step-scroll"');

// 4. Update pills click
content = content.replace(/onClick=\{\(\) => setActiveStep\(index\)\}/g, 'onClick={() => handleStepClick(index)}');

// 5. Wrap the main Lienzo
content = content.replace(
  '<div className="flex-1 w-full">\n                  {getStepContent()}\n               </div>',
  `<div className="flex-1 w-full overflow-hidden" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                  <div key={activeStep} className={\`w-full h-full animate-in fade-in duration-700 fill-mode-both \${slideDirection === 'down' ? 'slide-in-from-bottom-[100px]' : 'slide-in-from-top-[100px]'}\`}>
                     {getStepContent()}
                  </div>
               </div>`
);

// 6. Replace the Footer
const newFooter = `{/* Navegación Footer */}
               <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex gap-2 hidden sm:flex">
                     {STEPS.map((_, i) => (
                        <div key={i} className={\`h-1.5 rounded-full transition-all duration-500 \${activeStep === i ? 'w-8 bg-cobra-primary' : activeStep > i ? 'w-2 bg-emerald-400' : 'w-2 bg-slate-200'}\`}></div>
                     ))}
                  </div>
                  <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end items-center">
                     {activeStep < STEPS.length - 1 ? (
                        <div className="flex items-center gap-2 text-slate-400 animate-pulse bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100">
                           <span className="text-[10px] font-black uppercase tracking-widest">Desliza para continuar</span>
                           <i className="ph-bold ph-mouse-simple text-xl"></i>
                        </div>
                     ) : (
                        <button 
                           onClick={onClose}
                           className="px-8 py-3 rounded-xl bg-cobra-primary text-white font-black text-sm shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all hover:-translate-y-0.5 flex items-center gap-2 group"
                        >
                           <i className="ph-bold ph-check text-lg"></i> {labels.BTN_FINISH}
                        </button>
                     )}
                  </div>
               </div>`;

const regex = /\{\/\* Navegación Footer \*\/\}[\s\S]*?(?=\n            <\/div>\n         <\/div>\n      <\/div>)/;
content = content.replace(regex, newFooter);

fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
console.log('Wizard patched!');
