const fs = require('fs');
let content = fs.readFileSync('services/projects.service.ts', 'utf8');

const newActivities = `activities: [
        {
          id: 'ph1',
          name: 'Cimentación y Estructura',
          isPhase: true,
          children: [
            { id: 'act1', name: 'Excavación mecánica para cimentación profunda incluyendo retiro de sobrantes', start: '2026-05-30', end: '2026-06-15', unit: 'M3', progQty: 1250.00, progVal: 45000000, weight: 12.5, execPercent: 100, execVal: 45000000, execQty: 1250, advance: 0 },
            { id: 'act2', name: 'Suministro y figurado de acero de refuerzo 60000 PSI para zapatas y vigas de amarre', start: '2026-06-16', end: '2026-07-05', unit: 'KG', progQty: 8500.00, progVal: 38000000, weight: 10.5, execPercent: 85, execVal: 32300000, execQty: 7225, advance: 5 },
            { id: 'act3', name: 'Vaciado de concreto premezclado f\\'c 4000 PSI para columnas de primer nivel (incluye formaleta metálica y vibrado)', start: '2026-07-06', end: '2026-07-20', unit: 'M3', progQty: 420.00, progVal: 85000000, weight: 23.6, execPercent: 40, execVal: 34000000, execQty: 168, advance: 15 },
            { id: 'act4', name: 'Montaje de estructura metálica principal para cubierta tipo cercha en área de maniobras', start: '2026-07-21', end: '2026-08-10', unit: 'TON', progQty: 45.50, progVal: 120000000, weight: 33.3, execPercent: 0, execVal: 0, execQty: 0, advance: 0 },
          ]
        },
        {
          id: 'ph2',
          name: 'Mampostería y Acabados',
          isPhase: true,
          children: [
            { id: 'act5', name: 'Levante de muro en bloque número 5 de arcilla cocida a la vista (ambas caras)', start: '2026-08-11', end: '2026-09-05', unit: 'M2', progQty: 850.00, progVal: 25000000, weight: 6.9, execPercent: 0, execVal: 0, execQty: 0, advance: 0 },
            { id: 'act6', name: 'Pañete liso interior en muros, incluyendo impermeabilización en zonas húmedas', start: '2026-09-06', end: '2026-09-25', unit: 'M2', progQty: 920.00, progVal: 18000000, weight: 5.0, execPercent: 0, execVal: 0, execQty: 0, advance: 0 },
            { id: 'act7', name: 'Instalación de piso en porcelanato 60x60 formato industrial de alto tráfico (incluye mortero de nivelación)', start: '2026-09-26', end: '2026-10-15', unit: 'M2', progQty: 450.00, progVal: 29000000, weight: 8.2, execPercent: 0, execVal: 0, execQty: 0, advance: 0 },
          ]
        }
      ],`;

content = content.replace(/activities:\s*\[[\s\S]*?\],(?=\s*qualitative:)/, newActivities);
fs.writeFileSync('services/projects.service.ts', content);
