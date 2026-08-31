const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', 'utf8');

content = content.replace(
  /if \(diff > 50 && isAtBottom\) {/g,
  `if (diff > 20 && isAtBottom) {`
).replace(
  /\} else if \(diff < -50 && isAtTop\) {/g,
  `} else if (diff < -20 && isAtTop) {`
).replace(
  /if \(diff > 50\) {/g,
  `if (diff > 20) {`
).replace(
  /\} else if \(diff < -50\) {/g,
  `} else if (diff < -20) {`
);

fs.writeFileSync('components/projects/detail/advances/report/AdvanceReportDetail.tsx', content);
