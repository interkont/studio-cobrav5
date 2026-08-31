
import { ContractData, ContractStatus, ProjectData, ProjectStatus, NavItem, AssociatedProject, Modification, HistoryState, AssociatedEntity, DocumentFolder, AppDocument, ScheduledPayment, PaymentStatus, Anticipo, InsurancePolicy, ContractObligation, MonitoringReport, SupportSupervisor } from './types';

// Configuración centralizada de áreas de apoyo (Desacoplamiento de UI)
export const SUPPORT_AREAS_CONFIG = [
  { id: 'tecnica', label: 'Técnica', icon: 'ph-gear-six', color: 'text-blue-600' },
  { id: 'juridica', label: 'Jurídica', icon: 'ph-scales', color: 'text-purple-600' },
  { id: 'financiera', label: 'Financiera', icon: 'ph-coins', color: 'text-emerald-600' },
  { id: 'administrativa', label: 'Administrativa', icon: 'ph-briefcase', color: 'text-amber-600' }
] as const;

export const PROJECT_TABS = [
  { id: 'summary', label: 'Detalle del Proyecto', icon: 'ph-chart-line-up' },
  { id: 'advances', label: 'Gestionar Avances', icon: 'ph-gauge' },
  { id: 'modify', label: 'Modificar Proyecto', icon: 'ph-pencil' },
  { id: 'substatus', label: 'Subestado', icon: 'ph-arrows-left-right' },
  { id: 'gallery', label: 'Galería fotográfica', icon: 'ph-camera' },
  { id: 'contracts', label: 'Asociar contratos', icon: 'ph-arrows-clockwise' },
  { id: 'docs', label: 'Documentos del Proyecto', icon: 'ph-file-text' },
  { id: 'logs', label: 'Bitácora del Proyecto', icon: 'ph-floppy-disk' },
  { id: 'finish', label: 'Finalizar Proyecto', icon: 'ph-check-circle' },
  { id: 'participation', label: 'Participación ciudadana', icon: 'ph-trash' }
];

export const MOCK_PROJECT_DETAIL: ProjectData = {
  id: 'PRJ-2026-01',
  code: 'ID: 10',
  title: 'TEST - Dotación De Parque Automotor (Camionetas Y Motocicletas) Para Los Organismos De Seguridad Territorial.',
  subdirection: 'SUBDIRECCIÓN DE PROYECTOS PARA LA SEGURIDAD Y LA CONVIVENCIA CIUDADANA - SPS',
  location: 'Bogota',
  status: ProjectStatus.IN_PROGRESS,
  substatus: 'En Elaboración De Estudios Y Diseños',
  type: 'INFRAESTRUCTURA',
  subtype: 'INTERVENTORÍA',
  years: '2026',
  object: 'Fortalecer la capacidad operativa, logística y de respuesta rápida de los organismos de seguridad y justicia mediante la adquisición y dotación de vehículos terrestres, con el fin de contribuir a la prevención del delito, la preservación del orden público y el',
  specificObjectives: 'El alcance de este proyecto comprende la adquisición, adecuación y entrega oficial de un parque automotor conformado por [Ingresar cantidad, ej: 2 camionetas tipo Pick-Up y 10 motocicletas de alto cilindraje], debidamente uniformadas y equipadas según las',
  contractor: 'Cobra Interkont Apellido',
  executor: '-',
  supervisor: 'Maria C. Lopez',
  technicalCoordinator: 'Cobra Interkont Apellido',
  agreementNo: '-',
  startDate: '01/01/2026',
  endDate: '01/12/2026',
  durationDays: 335,
  totalValue: 18433086627,
  executedValue: 100050000,
  physicalProgress: 12.5,
  plannedPhysicalProgress: 64.46,
  daysRemaining: 96,
  hoursRemaining: 6,
  minutesRemaining: 44,
  associatedContracts: [
    {
      id: 'CTO-1',
      code: 'TEST12356',
      object: 'Fortalecer La Capacidad Operativa, Logística Y De Respuesta Rápida De Los...',
      executor: 'Unión Temporal Territorio Y Convivencia 2024',
      duration: '2026-01-01 Hasta 2027-01-06 (244 Días)',
      totalValue: 100050000,
      projectValue: 18433086627,
      type: 'PRESTACION DE SERVICIOS (APOYO A LA GESTION)'
    }
  ],
  goals: [
    { id: 'g1', name: 'Recursos Ejecutados', type: 'scope', target: 1000000, current: 10000, unit: 'COP' },
    { id: 'g2', name: 'Desembolsos Realizados', type: 'scope', target: 5.0, current: 1.0, unit: 'Cant' },
    { id: 'g3', name: 'Ejecución Financiera', type: 'scope', target: 100.0, current: 15.5, unit: '%' },
    { id: 'g4', name: 'Avance De Obra', type: 'scope', target: 100.0, current: 30.0, unit: '%' },
    { id: 'g5', name: 'Población Beneficiada', type: 'impact', target: 0, current: 15420, unit: 'Personas' },
    { id: 'g6', name: 'Empleos Generados', type: 'impact', target: 0, current: 340, unit: 'Empleos' },
    { id: 'g7', name: 'Vías Mejoradas', type: 'impact', target: 0, current: 45, unit: 'Km' },
    { id: 'g8', name: 'Auditorías Cerradas', type: 'scope', target: 4.0, current: 1.0, unit: 'Cant' }
  ],
  activities: [
    {
      id: 'act-1',
      name: 'Etapa 1',
      startDate: '2026-01-01',
      endDate: '2026-02-28',
      weight: 15,
      executed: 70,
      children: [
        { id: 'act-1-1', name: 'Estructuración técnica, precontractual y apertura del', startDate: '2026-01-01', endDate: '2026-02-28', weight: 15, executed: 70 }
      ]
    },
    {
      id: 'act-2',
      name: 'Etapa 2',
      startDate: '2026-03-01',
      endDate: '2026-04-15',
      weight: 10,
      executed: 20
    },
    {
      id: 'act-3',
      name: 'Etapa 3',
      startDate: '2026-04-16',
      endDate: '2026-10-31',
      weight: 65,
      executed: 0,
      children: [
        { id: 'act-3-1', name: 'Adquisición de vehículos y procesos de', startDate: '2026-04-16', endDate: '2026-08-15', weight: 45, executed: 0 },
        { id: 'act-3-2', name: 'Adecuación institucional, trámites de tránsito y aseguramiento', startDate: '2026-08-16', endDate: '2026-10-31', weight: 20, executed: 0 }
      ]
    },
    {
      id: 'act-4',
      name: 'Etapa 4',
      startDate: '2026-11-01',
      endDate: '2026-12-01',
      weight: 10,
      executed: 0
    }
  ],
  supportTeam: [
    { role: 'Apoyo Técnico', name: 'Laura Martinez' },
    { role: 'Apoyo Jurídico', name: 'Carlos Gomez' },
    { role: 'Apoyo Financiero', name: 'Diana Roa' }
  ],
  beforeAfterPhotos: [
    { id: 'p1', beforeUrl: 'https://images.unsplash.com/photo-1541888052063-e380536fb562?auto=format&fit=crop&w=600&q=80', afterUrl: 'https://images.unsplash.com/photo-1590483838274-0f2c417ea3e3?auto=format&fit=crop&w=600&q=80', description: 'Adecuación de vía principal' },
    { id: 'p2', beforeUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', afterUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', description: 'Remodelación de fachada institucional' }
  ],
  activeLogs: [
    { id: 'log-1', date: '25 Oct 2026', title: 'Aprobación de diseño estructural', author: 'Ing. Carlos Andrés Restrepo', status: 'Aprobado' },
    { id: 'log-2', date: '01 Nov 2026', title: 'Revisión de actas de obra N°3', author: 'Maria C. Lopez', status: 'En Revisión' }
  ]
};

export const MOCK_CONTRACT: ContractData = {
  id: 'ANI-CTO-2025-442',
  internalId: 'C-00442',
  title: 'Interventoría Integral para la Modernización de la Red Vial Terciaria - Lote 04',
  sector: 'INFRAESTRUCTURA Y TRANSPORTE',
  status: ContractStatus.ACTIVE,
  years: '2025 - 2027',
  entity: 'Agencia Nacional de Infraestructura (ANI)',
  type: 'Contrato de Consultoría / Interventoría',
  actionLine: 'Mantenimiento y Rehabilitación Vial',
  supervisor: 'Ing. Carlos Andrés Restrepo',
  secopProcess: 'ANI-LP-012-2024',
  description: 'Servicios de interventoría técnica, administrativa, financiera, jurídica y ambiental para el contrato de obra de rehabilitación de los corredores viales en la zona sur del departamento, asegurando el cumplimiento de los estándares de calidad y cronograma.',
  signatureDate: '22/01/2025',
  commencementDate: '10/02/2025',
  endDate: '09/08/2027',
  durationDays: 910,
  totalValue: 2540500000,
  executedValue: 458200000,
  currency: 'COP',
  daysRemaining: 842,
  hoursRemaining: 14,
  minutesRemaining: 45,
  liquidationDays: 0,
  liquidationHours: 0
};

export const MOCK_SUPPORT_SUPERVISORS: SupportSupervisor[] = [
  {
    id: 'supp-1',
    name: 'Carmen Sofia Bonilla',
    email: 'carmen.bonilla@gestiondelriesgo.gov.co',
    areas: ['tecnica', 'juridica'],
    startDate: '20/02/2026',
    assignedBy: 'Leonidas Name',
    informer: 'Michael Oyuela Vargas',
    stage: 'Ejecución',
    hasSignedAct: true
  },
  {
    id: 'supp-2',
    name: 'Michael Oyuela Vargas',
    email: 'm.oyuela@entidad.gov.co',
    areas: ['financiera', 'administrativa'],
    startDate: '15/01/2026',
    assignedBy: 'Andrea Moreno',
    informer: 'Carlos Carrillo',
    stage: 'Ejecución',
    hasSignedAct: false // Alerta para el usuario
  },
  {
    id: 'supp-3',
    name: 'Alethia Carolina Arango Gil',
    email: 'alethia.arango@gestiondelriesgo.gov.co',
    areas: ['tecnica', 'financiera', 'administrativa'],
    startDate: '01/03/2026',
    assignedBy: 'Carlos Carrillo',
    informer: 'Andrea Moreno',
    stage: 'Ejecución',
    hasSignedAct: true
  }
];

export const MOCK_SUPPORT_HISTORY: SupportSupervisor[] = [
  {
    id: 'hist-supp-1',
    name: 'Ing. Fabio Rodriguez',
    email: 'f.rodriguez@entidad.gov.co',
    areas: ['tecnica'],
    startDate: '10/02/2025',
    endDate: '28/02/2026',
    assignedBy: 'Carlos Carrillo',
    informer: 'Andrea Moreno',
    stage: 'Ejecución',
    hasSignedAct: true,
    observations: 'Finalización de contrato por cumplimiento de objeto.'
  },
  {
    id: 'hist-supp-2',
    name: 'Dra. Patricia Luna',
    email: 'p.luna@entidad.gov.co',
    areas: ['juridica'],
    startDate: '10/02/2025',
    endDate: '15/02/2026',
    assignedBy: 'Leonidas Name',
    informer: 'Carlos Carrillo',
    stage: 'Ejecución',
    hasSignedAct: true,
    observations: 'Renuncia voluntaria.'
  }
];

export const MOCK_OBLIGATIONS: ContractObligation[] = [
  { id: 'ob-1', consecutive: 1, description: 'Realizar visitas técnicas mensuales a los frentes de obra e informar hallazgos.', creationDate: '2024-12-02', user: 'interkont@2', category: 'Técnica', status: 'En Proceso' },
  { id: 'ob-2', consecutive: 2, description: 'Verificar el cumplimiento de las normas de seguridad y salud en el trabajo por parte del constructor.', creationDate: '2025-01-10', user: 'interkont@2', category: 'Administrativa', status: 'Activa' },
  { id: 'ob-3', consecutive: 3, description: 'Garantizar que el personal técnico propuesto se encuentre permanentemente en el proyecto.', creationDate: '2025-01-15', user: 'interkont@1', category: 'Legal', status: 'Activa' },
];

export const MOCK_MONITORING: MonitoringReport[] = [
  { id: 'mon-1', consecutive: 1, periodStart: '2024-10-31', periodEnd: '2024-11-30', uploadDate: '2024-12-18', user: 'interkont@2', status: 'Completado' },
  { id: 'mon-2', consecutive: 2, periodStart: '2024-12-30', periodEnd: '2025-01-29', uploadDate: '2025-02-16', user: 'interkont@2', status: 'Firma Supervisor' },
];

export const MOCK_POLICIES: InsurancePolicy[] = [
  {
    id: 'POL-77281',
    type: 'Garantía Única de Cumplimiento',
    coverage: 'Cumplimiento, Salarios, Calidad y Estabilidad',
    value: 508100000,
    insurer: 'Seguros del Estado S.A.',
    startDate: '10/02/2025',
    endDate: '09/02/2028',
    status: 'Vigente'
  },
  {
    id: 'POL-RC-0092',
    type: 'Responsabilidad Civil Extracontractual',
    coverage: 'Daños a Terceros y Perjuicios Especiales',
    value: 200000000,
    insurer: 'La Previsora Seguros',
    startDate: '10/02/2025',
    endDate: '10/02/2026',
    status: 'Próximo Vencimiento'
  }
];

export const MOCK_PAYMENTS: ScheduledPayment[] = [
  {
    id: 'PAG-01',
    scheduledDate: '2025-03-15',
    scheduledValue: 150000000,
    paidValue: 150000000,
    paymentDate: '2025-03-18',
    status: PaymentStatus.PAGADO,
    abonos: [{ id: 'ab-1', date: '2025-03-18', value: 150000000, origin: 'Giro Directo Tesorería' }],
    documents: [{ type: 'Factura', name: 'FE-001.pdf' }]
  },
  {
    id: 'PAG-02',
    scheduledDate: '2025-04-15',
    scheduledValue: 150000000,
    invoiceNumber: 'FE-0023',
    paidValue: 0,
    status: PaymentStatus.FACTURADO,
    abonos: [],
    documents: [{ type: 'Factura', name: 'FE-0023.pdf' }]
  },
  {
    id: 'PAG-03',
    scheduledDate: '2025-05-15',
    scheduledValue: 125000000,
    paidValue: 45000000,
    invoiceNumber: 'FE-0045',
    status: PaymentStatus.PAGADO_PARCIAL,
    abonos: [{ id: 'ab-2', date: '2025-05-20', value: 45000000, origin: 'Recurso Propio' }],
    documents: [{ type: 'Factura', name: 'FE-0045.pdf' }, { type: 'Comprobante', name: 'Egre-112.pdf' }]
  }
];

export const MOCK_ANTICIPOS: Anticipo[] = [
  {
    id: 'ANT-Init',
    date: '2025-02-15',
    value: 508100000,
    associatedInvoice: 'FE-ANT-01',
    document: 'Acta de Aprobación Plan de Inversión',
    receipt: 'Comprobante 1120'
  }
];

export const ASSOCIATED_PROJECTS: AssociatedProject[] = [
  { id: '1', code: 'PRJ-V04', name: 'Rehabilitación Vial Corredor Sur-Occidente', value: 1850000000, progress: 15 },
  { id: '2', code: 'PRJ-M01', name: 'Mantenimiento Preventivo Red Terciaria', value: 690500000, progress: 5 },
];

export const CONTRACT_HISTORY: HistoryState[] = [
  { id: 'h1', state: 'En Ejecución', subState: 'Operación Normal', observations: 'Suscripción de acta de inicio tras aprobación de garantías y plan de inversión del anticipo.', date: '2025-02-10' },
  { id: 'h2', state: 'Aprobación Pólizas', subState: 'Trámites Previos', observations: 'Garantía única de cumplimiento aprobada satisfactoriamente por la entidad.', date: '2025-01-30' }
];

export const CONTRACT_MODIFICATIONS: Modification[] = [];

export const ENTITIES: AssociatedEntity[] = [
  { name: 'Consorcio Vial del Sur 2025', idNumber: '901.442.110-3', contribution: 2540500000, costCenter: 'CE-ANI-04', role: 'Principal' },
  { name: 'Ingeniería y Diseños S.A.S.', idNumber: '800.221.005-1', role: 'Ejecutora' }
];

export const DOCUMENT_FOLDERS: DocumentFolder[] = [
  { id: 'f1', name: 'Informes Técnicos', icon: 'ph-file-text', count: 12, types: ['Informe Mensual', 'Bitácora Consolidada', 'Reporte Fotográfico'] },
  { id: 'f2', name: 'Financiero', icon: 'ph-money', count: 8, types: ['Factura Electrónica', 'Comprobante Pago SS', 'Garantía Bancaria'] },
  { id: 'f3', name: 'Legales', icon: 'ph-article', count: 5, types: ['Acta de Inicio', 'Contrato Principal', 'Resolución Adjudicación'] },
  { id: 'f4', name: 'HSE y Social', icon: 'ph-scales', count: 4, types: ['Plan de Manejo Ambiental', 'Certificación Social'] },
];

export const MOCK_DOCUMENTS: AppDocument[] = [
  { id: 'd1', name: 'Acta de Inicio - ANI-CTO-2025-442', type: 'Acta de Inicio', folder: 'Legales', date: '10-02-2025', year: '2025', size: '1.2 MB' },
  { id: 'd2', name: 'Informe Mensual de Interventoría No. 01', type: 'Informe Mensual', folder: 'Informes Técnicos', date: '05-03-2025', year: '2025', size: '14.5 MB' },
  { id: 'd3', name: 'Póliza de Cumplimiento Global 2025', type: 'Garantía Bancaria', folder: 'Financiero', date: '15-02-2025', year: '2025', size: '3.1 MB' },
];

export const SIDEBAR_ITEMS: NavItem[] = [
  { id: 'dash', label: 'Dashboard', icon: 'ph-squares-four' },
  { id: 'contracts', label: 'Contratos', icon: 'ph-scroll', active: true },
  { id: 'projects', label: 'Proyectos', icon: 'ph-stack' },
  { id: 'providers', label: 'Proveedores', icon: 'ph-users' },
  { id: 'reports', label: 'Reportes', icon: 'ph-chart-line-up' },
];

export const MOCK_CONTRACTS_LIST = [
  {
    id: 'ANI-CTO-2025-442',
    internalId: 'C-00442',
    title: 'Interventoría Integral para la Modernización de la Red Vial Terciaria - Lote 04',
    entity: 'Agencia Nacional de Infraestructura (ANI)',
    actionLine: 'Mantenimiento y Rehabilitación Vial',
    status: ContractStatus.ACTIVE,
    type: 'Consultoría',
    totalValue: 2540500000,
    executedValue: 458200000,
    endDate: '09/08/2027',
    progress: 18,
    year: '2025'
  },
  {
    id: 'INVIAS-2024-089',
    internalId: 'C-00389',
    title: 'Mantenimiento Rutinario Red Vial Nacional - Sector Andino',
    entity: 'Instituto Nacional de Vías (INVIAS)',
    actionLine: 'Mantenimiento Vial',
    status: ContractStatus.ACTIVE,
    type: 'Obra',
    totalValue: 8500000000,
    executedValue: 4250000000,
    endDate: '15/12/2025',
    progress: 50,
    year: '2024'
  },
  {
    id: 'MINV-2023-112',
    internalId: 'C-00212',
    title: 'Construcción Vivienda de Interés Social - Fase II',
    entity: 'Ministerio de Vivienda',
    actionLine: 'Infraestructura Social',
    status: ContractStatus.SUSPENDED,
    type: 'Obra',
    totalValue: 12400000000,
    executedValue: 8680000000,
    endDate: '30/06/2024',
    progress: 70,
    year: '2023'
  },
  {
    id: 'SENA-2025-005',
    internalId: 'C-00450',
    title: 'Suministro de Equipos Tecnológicos para Centros de Formación',
    entity: 'SENA',
    actionLine: 'Dotación Tecnológica',
    status: ContractStatus.LIQUIDATED,
    type: 'Suministro',
    totalValue: 1500000000,
    executedValue: 1500000000,
    endDate: '28/02/2025',
    progress: 100,
    year: '2025'
  },
  {
    id: 'IDU-2024-055',
    internalId: 'C-00410',
    title: 'Estudios y Diseños Intersección Vial Calle 100',
    entity: 'Instituto de Desarrollo Urbano (IDU)',
    actionLine: 'Diseño y Estudios',
    status: ContractStatus.ACTIVE,
    type: 'Consultoría',
    totalValue: 3200000000,
    executedValue: 640000000,
    endDate: '10/10/2026',
    progress: 20,
    year: '2024'
  },
  {
    id: 'MINED-2026-001',
    internalId: 'C-00501',
    title: 'Construcción de Megacolegio en Zona Rural',
    entity: 'Ministerio de Educación',
    actionLine: 'Infraestructura Educativa',
    status: ContractStatus.ACTIVE,
    type: 'Obra',
    totalValue: 15800000000,
    executedValue: 1580000000,
    endDate: '15/11/2027',
    progress: 10,
    year: '2026'
  },
  {
    id: 'EAAB-2025-120',
    internalId: 'C-00480',
    title: 'Optimización Redes de Acueducto Sector Norte',
    entity: 'Empresa de Acueducto y Alcantarillado',
    actionLine: 'Saneamiento Básico',
    status: ContractStatus.ACTIVE,
    type: 'Obra',
    totalValue: 6750000000,
    executedValue: 3375000000,
    endDate: '20/08/2026',
    progress: 50,
    year: '2025'
  },
  {
    id: 'AERON-2024-033',
    internalId: 'C-00350',
    title: 'Mantenimiento Pista Aeropuerto Regional',
    entity: 'Aeronáutica Civil',
    actionLine: 'Mantenimiento Vial',
    status: ContractStatus.LIQUIDATED,
    type: 'Obra',
    totalValue: 4200000000,
    executedValue: 4200000000,
    endDate: '10/01/2025',
    progress: 100,
    year: '2024'
  },
  {
    id: 'INV-2026-015',
    internalId: 'C-00515',
    title: 'Interventoría Construcción Puente Vehicular',
    entity: 'Instituto Nacional de Vías (INVIAS)',
    actionLine: 'Interventoría',
    status: ContractStatus.ACTIVE,
    type: 'Consultoría',
    totalValue: 1850000000,
    executedValue: 0,
    endDate: '30/12/2027',
    progress: 0,
    year: '2026'
  },
  {
    id: 'MINTIC-2025-088',
    internalId: 'C-00490',
    title: 'Despliegue de Zonas WiFi en Municipios PDET',
    entity: 'Ministerio TIC',
    actionLine: 'Conectividad',
    status: ContractStatus.ACTIVE,
    type: 'Suministro',
    totalValue: 9400000000,
    executedValue: 2820000000,
    endDate: '15/05/2026',
    progress: 30,
    year: '2025'
  },
  {
    id: 'DNP-2024-002',
    internalId: 'C-00310',
    title: 'Consultoría para Evaluación de Políticas Públicas',
    entity: 'Departamento Nacional de Planeación',
    actionLine: 'Diseño y Estudios',
    status: ContractStatus.LIQUIDATED,
    type: 'Consultoría',
    totalValue: 850000000,
    executedValue: 850000000,
    endDate: '20/11/2024',
    progress: 100,
    year: '2024'
  },
  {
    id: 'FND-2026-045',
    internalId: 'C-00545',
    title: 'Suministro de Maquinaria Amarilla para Gobernaciones',
    entity: 'Federación Nacional de Departamentos',
    actionLine: 'Dotación',
    status: ContractStatus.ACTIVE,
    type: 'Suministro',
    totalValue: 22500000000,
    executedValue: 4500000000,
    endDate: '10/09/2026',
    progress: 20,
    year: '2026'
  },
  {
    id: 'ANI-2023-077',
    internalId: 'C-00280',
    title: 'Concesión Corredor Férreo Central',
    entity: 'Agencia Nacional de Infraestructura (ANI)',
    actionLine: 'Infraestructura Férrea',
    status: ContractStatus.SUSPENDED,
    type: 'Obra',
    totalValue: 45000000000,
    executedValue: 18000000000,
    endDate: '31/12/2030',
    progress: 40,
    year: '2023'
  },
  {
    id: 'SENA-2026-012',
    internalId: 'C-00560',
    title: 'Adecuación de Talleres de Bilingüismo',
    entity: 'SENA',
    actionLine: 'Infraestructura Educativa',
    status: ContractStatus.ACTIVE,
    type: 'Obra',
    totalValue: 3100000000,
    executedValue: 155000000,
    endDate: '28/02/2027',
    progress: 5,
    year: '2026'
  },
  {
    id: 'IDRD-2025-034',
    internalId: 'C-00475',
    title: 'Mantenimiento de Parques Zonales',
    entity: 'Instituto Distrital de Recreación y Deporte',
    actionLine: 'Mantenimiento',
    status: ContractStatus.ACTIVE,
    type: 'Obra',
    totalValue: 5600000000,
    executedValue: 3360000000,
    endDate: '15/08/2025',
    progress: 60,
    year: '2025'
  }
];

export const TABS: (NavItem & { iconOnly?: boolean })[] = [
  { id: 'summary', label: 'Resumen', icon: 'ph-info', active: true },
  { id: 'docs', label: 'Documentación', icon: 'ph-files', count: 8 },
  { id: 'finance', label: 'Financiero', icon: 'ph-currency-dollar' },
  { id: 'history', label: 'Gestión de Cambios', icon: 'ph-pencil-circle' },
  { id: 'bitacora', label: 'Bitácora', icon: 'ph-notebook' },
  { id: 'seguimiento', label: 'Seguimiento', icon: 'ph-activity' },
  { id: 'supervisores', label: 'Supervisores', icon: 'ph-user-list' },
  { id: 'config', label: 'Configuración', icon: 'ph-gear', iconOnly: true },
];
