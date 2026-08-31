const fs = require('fs');

let content = fs.readFileSync('components/projects/detail/logs/ProjectLogsView.tsx', 'utf8');

// Replace dynamic tailwind classes with a dictionary for safe purging
const colorMap = `
const TYPE_CLASSES: Record<string, { border: string, bg: string, text: string, textLight: string }> = {
  amber: { border: 'border-amber-500', bg: 'bg-amber-100', text: 'text-amber-700', textLight: 'text-amber-600' },
  blue: { border: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-700', textLight: 'text-blue-600' },
  rose: { border: 'border-rose-500', bg: 'bg-rose-100', text: 'text-rose-700', textLight: 'text-rose-600' },
  emerald: { border: 'border-emerald-500', bg: 'bg-emerald-100', text: 'text-emerald-700', textLight: 'text-emerald-600' },
  violet: { border: 'border-violet-500', bg: 'bg-violet-100', text: 'text-violet-700', textLight: 'text-violet-600' },
  slate: { border: 'border-slate-500', bg: 'bg-slate-100', text: 'text-slate-700', textLight: 'text-slate-600' }
};
`;

content = content.replace('const CATEGORIES = [', colorMap + '\\nconst CATEGORIES = [');

content = content.replace(
  /className=\{`absolute \-left-\[11px\] top-1 w-5 h-5 rounded-full bg-white border-4 border-\\\$\{log\.type\}-500 shadow-sm`\}/g,
  "className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 ${TYPE_CLASSES[log.type]?.border || 'border-slate-500'} shadow-sm`}"
);

content = content.replace(
  /className=\{`px-2 py-0\.5 rounded text-\[9px\] font-black uppercase tracking-wider bg-\\\$\{log\.type\}-100 text-\\\$\{log\.type\}-700`\}/g,
  "className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${TYPE_CLASSES[log.type]?.bg || 'bg-slate-100'} ${TYPE_CLASSES[log.type]?.text || 'text-slate-700'}`}"
);

content = content.replace(
  /className=\{`text-\[10px\] font-black text-\\\$\{log\.type\}-600 uppercase tracking-widest mb-1`\}/g,
  "className={`text-[10px] font-black uppercase tracking-widest mb-1 ${TYPE_CLASSES[log.type]?.textLight || 'text-slate-600'}`}"
);

content = content.replace(
  /className=\{`ph-fill ph-file text-\\\$\{log\.type\}-500 text-base`\}/g,
  "className={`ph-fill ph-file text-base ${TYPE_CLASSES[log.type]?.text || 'text-slate-500'}`}"
);

content = content.replace(
  /className=\{`ph ph-image text-\\\$\{log\.type\}-500 text-sm`\}/g,
  "className={`ph ph-image text-sm ${TYPE_CLASSES[log.type]?.text || 'text-slate-500'}`}"
);

// Note: I see a style prop doing borderColor logic. I will also replace that line.
content = content.replace(
  /<div className="absolute -left-\[11px\] top-1 w-5 h-5 rounded-full bg-white border-\[5px\] shadow-sm z-10" style=\{\{ borderColor: `var\(--color-\\\$\{log\.type\}-500, #cbd5e1\)` \}\}\><\/div>/g,
  `<div className={\`absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-[5px] \${TYPE_CLASSES[log.type]?.border || 'border-slate-500'} shadow-sm z-10\`}></div>`
);


fs.writeFileSync('components/projects/detail/logs/ProjectLogsView.tsx', content);
