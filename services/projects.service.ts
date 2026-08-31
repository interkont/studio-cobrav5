import { MOCK_PROJECT_DETAIL } from '../constants';
import { ProjectData } from '../types';

export const ProjectsService = {
  getProjectDetail: (id: string): ProjectData => {
    return MOCK_PROJECT_DETAIL;
  },

  getProjectSummaryChartData: () => {
    return [
      { name: 'Ene', projected: 10, actual: 8 },
      { name: 'Feb', projected: 25, actual: 20 },
      { name: 'Mar', projected: 40, actual: 35 },
      { name: 'Abr', projected: 55, actual: 48 },
      { name: 'May', projected: 70, actual: 60 },
      { name: 'Jun', projected: 85, actual: 72 },
      { name: 'Jul', projected: 100, actual: null },
      { name: 'Ago', projected: 100, actual: null },
      { name: 'Sep', projected: 100, actual: null },
      { name: 'Oct', projected: 100, actual: null },
      { name: 'Nov', projected: 100, actual: null },
      { name: 'Dic', projected: 100, actual: null },
    ];
  },

  getProjectUpcomingMilestones: () => {
    return [
      { name: 'Cimentación y Estructura Base', date: 'En curso (Vence 15 Nov)', status: 'En Riesgo', progress: 65, color: 'text-orange-500', bg: 'bg-orange-50' },
      { name: 'Levantamiento de Muros y Mampostería', date: 'Inicia 16 Nov', status: 'Programado', progress: 0, color: 'text-slate-400', bg: 'bg-slate-50' },
      { name: 'Instalaciones Hidrosanitarias', date: 'Inicia 01 Dic', status: 'Programado', progress: 0, color: 'text-slate-400', bg: 'bg-slate-50' },
      { name: 'Adecuación Terreno Inicial', date: 'Completado 30 Oct', status: 'Completado', progress: 100, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ];
  },

  getProjectGanttTasks: () => {
    return [
      { id: 1, name: 'Fase 1: Preliminares y Cimentación', start: 0, duration: 3, progress: 100, isPhase: true },
      { id: 2, name: '1.1 Adecuación del terreno', start: 0, duration: 1, progress: 100, isPhase: false },
      { id: 3, name: '1.2 Excavaciones profundas', start: 0.5, duration: 1.5, progress: 100, isPhase: false },
      { id: 4, name: '1.3 Fundición de zapatas', start: 1.5, duration: 1.5, progress: 100, isPhase: false },
      { id: 5, name: 'Fase 2: Estructura y Mampostería', start: 3, duration: 4, progress: 65, isPhase: true },
      { id: 6, name: '2.1 Columnas 1er nivel', start: 3, duration: 1, progress: 100, isPhase: false },
      { id: 7, name: '2.2 Placa de entrepiso', start: 3.5, duration: 1.5, progress: 80, isPhase: false },
      { id: 8, name: '2.3 Muros divisorios', start: 4.5, duration: 2, progress: 30, isPhase: false },
      { id: 9, name: '2.4 Cubierta principal', start: 6, duration: 1, progress: 0, isPhase: false },
      { id: 10, name: 'Fase 3: Acabados e Instalaciones', start: 6.5, duration: 4.5, progress: 0, isPhase: true },
      { id: 11, name: '3.1 Redes hidrosanitarias', start: 6.5, duration: 2, progress: 0, isPhase: false },
      { id: 12, name: '3.2 Redes eléctricas', start: 7, duration: 2, progress: 0, isPhase: false },
      { id: 13, name: '3.3 Pañetes y pinturas', start: 8, duration: 2, progress: 0, isPhase: false },
      { id: 14, name: '3.4 Carpintería y detalles', start: 9.5, duration: 1.5, progress: 0, isPhase: false },
      { id: 15, name: 'Fase 4: Entrega y Cierre', start: 11, duration: 1, progress: 0, isPhase: true },
    ];
  },

  getProjectGallery: () => {
    return [
      { id: 1, url: 'https://images.unsplash.com/photo-1541888052063-e380536fb562?auto=format&fit=crop&w=600&q=80', label: 'Estructura Inicial' },
      { id: 2, url: 'https://images.unsplash.com/photo-1590483838274-0f2c417ea3e3?auto=format&fit=crop&w=600&q=80', label: 'Cimentación' },
      { id: 3, url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', label: 'Fachada Lateral' },
      { id: 4, url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', label: 'Interiores' },
      { id: 5, url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80', label: 'Plataforma Superior' },
      { id: 6, url: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&w=600&q=80', label: 'Obras Exteriores' },
      { id: 7, url: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=600&q=80', label: 'Estructura Metálica' },
      { id: 8, url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=600&q=80', label: 'Vista General' }
    ];
  },

  getProjectAdvancesHistory: () => {
    return [
      { id: 1, type: 'physical', period: 'Feb 01, 2026 - Feb 28, 2026', subtitle: 'Corte Mensual', value: '+ 2.5%', author: 'Maria C. Lopez', authorInitials: 'ML', status: 'En Revisión', isApproved: false },
      { id: 2, type: 'physical', period: 'Ene 01, 2026 - Ene 31, 2026', subtitle: 'Corte Mensual', value: '+ 10.0%', author: 'Maria C. Lopez', authorInitials: 'ML', status: 'Aprobado', isApproved: true },
      { id: 3, type: 'financial', period: 'Feb 01, 2026 - Feb 28, 2026', subtitle: 'Corte Mensual', value: '+ $350M', author: 'Carlos R. Perez', authorInitials: 'CP', status: 'En Revisión', isApproved: false },
      { id: 4, type: 'financial', period: 'Ene 01, 2026 - Ene 31, 2026', subtitle: 'Corte Mensual', value: '+ $900M', author: 'Carlos R. Perez', authorInitials: 'CP', status: 'Aprobado', isApproved: true },
    ];
  },

  getProjectDocsFolders: () => {
    return [
      { id: 1, name: 'Informes', count: 4 },
      { id: 2, name: 'Contratos', count: 2 },
      { id: 3, name: 'Planos', count: 8 },
      { id: 4, name: 'Anexos', count: 12 },
    ];
  },

  getProjectDocsFiles: () => {
    return [
      { id: 1, name: 'Informe_Inicial_Feb2026.pdf', category: 'Informes', date: '15 Feb 2026', size: '2.4 MB', icon: 'ph-file-pdf', color: 'text-red-500' },
      { id: 2, name: 'Acta_Inicio_Firmada.pdf', category: 'Contratos', date: '01 Ene 2026', size: '1.1 MB', icon: 'ph-file-pdf', color: 'text-red-500' },
    ];
  },

  getProjectLogs: () => {
    return [
      { id: 1, date: '15 Febrero, 2026 • 10:30 AM', title: 'Visita técnica de verificación', author: 'Supervisor', text: 'Se realizó visita de verificación a los predios donde se ubicarán los equipos. Se encontraron las condiciones adecuadas para iniciar el proceso de adecuación según lo estipulado en el cronograma (Etapa 1).', files: ['Foto_Verificacion.jpg'], type: 'amber' },
      { id: 2, date: '01 Enero, 2026 • 08:00 AM', title: 'Firma de Acta de Inicio', author: 'Sistema', text: 'Se formaliza el inicio de la ejecución del proyecto con la firma del acta correspondiente por todas las partes interesadas. Los plazos del cronograma comienzan a correr a partir de esta fecha.', files: [], type: 'emerald' }
    ];
  },
  getProjectAdvancesPeriods: () => {
    return [
      { id: '1', period: '20-Jun-2026 - 26-Jun-2026', date: '24-06-2026', author: 'Cobra Interkont Apellido', percent: 0, status: 'En Revisión' },
      { id: '2', period: '13-Jun-2026 - 19-Jun-2026', date: '04-06-2026', author: 'Cobra Interkont Apellido', percent: 612.36, status: 'Reportado' },
      { id: '3', period: '06-Jun-2026 - 12-Jun-2026', date: '02-06-2026', author: 'Cobra Interkont Apellido', percent: 0, status: 'Reportado' },
      { id: '4', period: '30-May-2026 - 05-Jun-2026', date: '31-05-2026', author: 'Cobra Interkont Apellido', percent: 214.32, status: 'Reportado' }
    ];
  },
  getProjectAdvanceReportData: () => {
    return {
      currentStatus: { current: 826.69, target: 112.50, delay: -714.19 },
      activities: [
        {
          id: 'ph1',
          name: 'Cimentación y Estructura',
          isPhase: true,
          children: [
            { id: 'act1', name: 'Excavación mecánica para cimentación profunda incluyendo retiro de sobrantes', start: '2026-05-30', end: '2026-06-15', unit: 'M3', progQty: 1250.00, progVal: 45000000, weight: 12.5, execPercent: 100, execVal: 45000000, execQty: 1250, advance: 0 },
            { id: 'act2', name: 'Suministro y figurado de acero de refuerzo 60000 PSI para zapatas y vigas de amarre', start: '2026-06-16', end: '2026-07-05', unit: 'KG', progQty: 8500.00, progVal: 38000000, weight: 10.5, execPercent: 85, execVal: 32300000, execQty: 7225, advance: 5 },
            { id: 'act3', name: 'Vaciado de concreto premezclado f\'c 4000 PSI para columnas de primer nivel (incluye formaleta metálica y vibrado)', start: '2026-07-06', end: '2026-07-20', unit: 'M3', progQty: 420.00, progVal: 85000000, weight: 23.6, execPercent: 40, execVal: 34000000, execQty: 168, advance: 15 },
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
      ],
      qualitative: {
        financial: { achievements: 'Se cumplió el presupuesto del periodo.', difficulties: 'Se canceló CDP de las fuentes de recursos.' }
      },
      indicators: [
        { id: 'ind1', name: 'Recursos ejecutados', unit: '$', progQty: 50000000, execQty: 10000, advancePercent: 20.00 }
      ],
      evaluations: [
         { period: '13-Jun-2026 al 19-Jun-2026', reviewer: 'Cobra Interkont Apellido', author: 'Cobra Interkont Apellido', status: 'Aprobado', conclusions: 'Todo ok', actions: '', date: '24-Jun-2026' }
      ]
    };
  }
};
