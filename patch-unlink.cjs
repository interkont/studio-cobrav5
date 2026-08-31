const fs = require('fs');
let content = fs.readFileSync('components/projects/detail/contracts/ProjectContractsView.tsx', 'utf8');

const oldUnlink = `  const handleUnlink = (id: string) => {
    setAssociatedContracts(prev => prev.filter(c => c.id !== id));
    setContractToUnlink(null);
  };`;

const newUnlink = `  const handleUnlink = (id: string) => {
    const unlinkedContract = associatedContracts.find(c => c.id === id);
    if (unlinkedContract) {
       setSystemContracts(prev => prev.map(c => 
          c.id === id ? { ...c, availableValue: c.availableValue + unlinkedContract.projectValue } : c
       ));
    }
    setAssociatedContracts(prev => prev.filter(c => c.id !== id));
    setContractToUnlink(null);
  };`;

content = content.replace(oldUnlink, newUnlink);
fs.writeFileSync('components/projects/detail/contracts/ProjectContractsView.tsx', content);
