const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

// 1. Update the handleWheel to be more trackpad friendly
content = content.replace(
  /if \(e\.deltaY > 50 && isAtBottom\) {/g,
  `if (e.deltaY > 20 && isAtBottom) {`
).replace(
  /\} else if \(e\.deltaY < -50 && isAtTop\) {/g,
  `} else if (e.deltaY < -20 && isAtTop) {`
).replace(
  /if \(e\.deltaY > 50\) changeStep\('down'\);/g,
  `if (e.deltaY > 20) changeStep('down');`
).replace(
  /else if \(e\.deltaY < -50\) changeStep\('up'\);/g,
  `else if (e.deltaY < -20) changeStep('up');`
);

// 2. Make the whole renderActivitiesStep a single scrolling container
content = content.replace(
  '<div className="w-full flex flex-col h-full overflow-hidden">',
  '<div className="w-full flex flex-col h-full overflow-y-auto custom-scrollbar prevent-step-scroll pr-2 relative">'
);

// Add sticky to the header
content = content.replace(
  '<div className="shrink-0 bg-slate-100/90 backdrop-blur-md z-30 pb-4">',
  '<div className="shrink-0 bg-slate-100/90 backdrop-blur-md z-30 pb-4 sticky top-0">'
);

// Remove the inner scroll and prevent-step-scroll from the activities list wrapper
content = content.replace(
  '<div className="overflow-y-auto flex-1 custom-scrollbar prevent-step-scroll p-2 md:p-4 rounded-2xl bg-slate-50/50 border border-slate-200/50">',
  '<div className="flex-1 p-2 md:p-4 rounded-2xl bg-slate-50/50 border border-slate-200/50">'
);

fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
