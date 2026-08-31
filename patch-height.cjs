const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

content = content.replace(
  'min-h-[600px] relative',
  'h-[70vh] min-h-[550px] max-h-[800px] relative'
);

content = content.replace(
  '<div className="bg-slate-100 -m-8 p-6 lg:px-12 xl:px-20 lg:py-10 flex flex-col min-h-screen">',
  '<div className="bg-slate-100 -m-8 p-6 lg:px-12 xl:px-20 lg:py-10 flex flex-col h-[calc(100vh-64px)] overflow-hidden">'
);

fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
