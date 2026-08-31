
export enum ContractStatus {
  ACTIVE = 'En Ejecución',
  FINISHED = 'Finalizado',
  SUSPENDED = 'Suspendido',
  DRAFT = 'Borrador'
}

export enum ProjectStatus {
  IN_PROGRESS = 'En Progreso',
  PLANNING = 'En Planeación',
  FINISHED = 'Finalizado',
  SUSPENDED = 'Suspendido'
}

export interface ProjectGoal {
  id: string;
  name: string;
  type: 'impact' | 'scope';
  target: number;
  current: number;
  unit: string;
}

export interface ProjectActivity {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  weight: number;
  executed: number;
  children?: ProjectActivity[];
}

export interface ProjectData {
  id: string;
  code: string;
  title: string;
  subdirection: string;
  location: string;
  status: ProjectStatus;
  substatus: string;
  type: string;
  subtype: string;
  years: string;
  object: string;
  specificObjectives: string;
  contractor: string;
  executor: string;
  supervisor: string;
  technicalCoordinator: string;
  agreementNo: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalValue: number;
  executedValue: number;
  physicalProgress: number;
  plannedPhysicalProgress: number;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  associatedContracts: {
    id: string;
    code: string;
    object: string;
    executor: string;
    duration: string;
    totalValue: number;
    projectValue: number;
    type: string;
  }[];
  supportTeam: { role: string; name: string }[];
  beforeAfterPhotos: { id: string; beforeUrl: string; afterUrl: string; description: string }[];
  activeLogs: { id: string; date: string; title: string; author: string; status: string }[];
  goals: ProjectGoal[];
  activities: ProjectActivity[];
}

export enum PaymentStatus {
  PROYECTADO = 'Proyectado',
  FACTURADO = 'Facturado',
  PAGADO_PARCIAL = 'Pagado Parcial',
  PAGADO = 'Pagado',
  CANCELADO = 'Cancelado'
}

export interface Abono {
  id: string;
  date: string;
  value: number;
  origin: string;
  document?: string;
  receipt?: string;
}

export interface ScheduledPayment {
  id: string;
  scheduledDate: string;
  scheduledValue: number;
  invoiceNumber?: string;
  paidValue: number;
  paymentDate?: string;
  status: PaymentStatus;
  abonos: Abono[];
  documents: { type: string; name: string }[];
}

export interface Anticipo {
  id: string;
  date: string;
  value: number;
  associatedInvoice?: string;
  document?: string;
  receipt?: string;
}

export interface AssociatedProject {
  id: string;
  code: string;
  name: string;
  value: number;
  progress: number;
}

export interface Modification {
  id: string;
  date: string;
  previousEndDate: string;
  newEndDate: string;
  previousValue: number;
  currentValue: number;
  description: string;
}

export interface HistoryState {
  id: string;
  state: string;
  subState: string;
  observations: string;
  date: string;
}

export interface AssociatedEntity {
  name: string;
  idNumber: string;
  contribution?: number;
  costCenter?: string;
  role: 'Principal' | 'Ejecutora';
}

export interface InsurancePolicy {
  id: string;
  type: string;
  coverage: string;
  value: number;
  insurer: string;
  startDate: string;
  endDate: string;
  status: 'Vigente' | 'Vencida' | 'Próximo Vencimiento';
}

export interface ContractObligation {
  id: string;
  consecutive: number;
  description: string;
  creationDate: string;
  user: string;
  category: 'Técnica' | 'Administrativa' | 'Financiera' | 'Legal';
  status: 'Activa' | 'Cumplida' | 'En Proceso';
}

export interface MonitoringReport {
  id: string;
  consecutive: number;
  periodStart: string;
  periodEnd: string;
  uploadDate: string;
  user: string;
  status: 'Completado' | 'Firma Supervisor' | 'Borrador' | 'Pendiente';
}

export interface SupportSupervisor {
  id: string;
  name: string;
  email: string;
  areas: ('tecnica' | 'juridica' | 'financiera' | 'administrativa')[];
  startDate: string;
  endDate?: string; // Para el historial
  assignedBy: string;
  informer: string;
  stage: 'Ejecución' | 'Liquidación';
  hasSignedAct?: boolean;
  observations?: string;
}

export interface ContractData {
  id: string;
  internalId: string;
  title: string;
  sector: string;
  status: ContractStatus;
  years: string;
  entity: string;
  type: string;
  actionLine: string;
  supervisor: string;
  secopProcess?: string;
  description: string;
  
  // Dates
  signatureDate: string;
  commencementDate: string;
  endDate: string;
  durationDays: number;

  // Financial
  totalValue: number;
  executedValue: number;
  currency: string;
  
  // Timers
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  liquidationDays: number;
  liquidationHours: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
  count?: number;
}

export interface AppDocument {
  id: string;
  name: string;
  type: string;
  folder: string;
  date: string;
  year: string;
  size?: string;
}

export interface DocumentFolder {
  id: string;
  name: string;
  icon: string;
  count: number;
  types: string[];
}

export interface ActivityItem {
  id: string;
  color: string;
  icon: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  type: 'danger' | 'warning';
  title: string;
  message: string;
}
