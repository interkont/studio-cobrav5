const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');
content = content.replace('  );\n}\n\n  const renderPeriodStep', '  );\n\n  const renderPeriodStep');
fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
