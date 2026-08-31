import React, { useState } from 'react';
import { ProjectData } from '../../../../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GanttModal from './GanttModal';
import { ProjectsService } from '../../../../services/projects.service';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';

interface Props {
  data: ProjectData;
}

const ProjectSummary: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'financial' | 'physical'>('physical');
  const [showGantt, setShowGantt] = useState(false);
  const labels = PROJECT_DICTIONARY.SUMMARY;

  const chartData = ProjectsService.getProjectSummaryChartData();

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-6 animate-in fade-in duration-500">
        
        {/* Fila 1: Info General */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-cobra-text-main flex items-center gap-2">
                <i className="ph ph-identification-card text-cobra-primary"></i>
                {labels.INFO_TITLE}
              </h3>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{labels.INTERNAL_ID} {data.id}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                  <InfoField icon="ph-buildings" label={labels.CONTRACTOR} value={data.contractor} />
                  <InfoField icon="ph-hard-hat" label={labels.EXECUTOR} value={data.executor} />
                  <InfoField icon="ph-file-text" label={labels.TYPE} value={data.type} />
                  <InfoField icon="ph-folders" label={labels.SUBTYPE} value={data.subtype} />
                  <InfoField icon="ph-flag" label={labels.STATUS} value={data.status} />
                  <InfoField icon="ph-tag" label={labels.SUBSTATUS} value={data.substatus} />
                                    <InfoField icon="ph-user-gear" label={labels.SUPERVISOR} value={data.supervisor} />
                  
                  <div className="md:col-span-2 mt-1">
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm shadow-indigo-200/50">
                        <i className="ph-fill ph-currency-circle-dollar text-2xl"></i>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500/80 mb-0.5 block">Valor Total del Proyecto</span>
                        <span className="text-xl font-black text-indigo-950 tracking-tight">
                          {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(data.totalValue)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mt-auto">
                  <span className="text-[11px] uppercase font-bold text-cobra-text-secondary block mb-1 tracking-wider">{labels.OBJECT_TITLE}</span>
                  <p className="text-[13px] text-cobra-text-main leading-relaxed font-medium italic">
                    "{data.object}"
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-cobra-slate text-white rounded-2xl p-6 shadow-xl border-none overflow-hidden relative group h-full flex flex-col">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <i className="ph ph-rocket text-8xl rotate-12"></i>
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cobra-primary animate-pulse"></div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{labels.PHYSICAL_EXECUTION}</h3>
                      </div>
                      <i className="ph ph-trend-up text-cobra-primary text-xl"></i>
                    </div>
                    <div className="mb-auto">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">{labels.TOTAL_DURATION}</span>
                      <span className="text-2xl font-black tracking-tighter tabular-nums leading-none">
                        {data.durationDays} Días
                      </span>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between text-[10px] mb-2 font-bold uppercase tracking-wider">
                        <span className="text-slate-400">{labels.EXECUTED_REAL}</span>
                        <span className="text-cobra-primary">{data.physicalProgress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5 mb-4">
                        <div 
                          className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(239,68,68,0.4)]" 
                          style={{ width: `${data.physicalProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <div>
                          <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-tighter">{labels.PROJECTED}</span>
                          <span className="text-sm font-bold tabular-nums text-slate-200">{data.plannedPhysicalProgress}%</span>
                        </div>
                        <div className="flex-1 flex justify-center">
                          {(() => {
                            const diff = data.plannedPhysicalProgress - data.physicalProgress;
                            if (diff > 10) return <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-[9px] font-bold uppercase tracking-widest">{labels.DELAYED}</span>;
                            if (diff > 0) return <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-[9px] font-bold uppercase tracking-widest">{labels.AT_RISK}</span>;
                            return <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[9px] font-bold uppercase tracking-widest">{labels.ON_TIME}</span>;
                          })()}
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-tighter">{labels.PENDING}</span>
                          <span className="text-sm font-bold tabular-nums text-white">{100 - data.physicalProgress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fila 2: Fechas/Cronograma y Contratos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <i className="ph ph-calendar text-cobra-primary text-lg"></i>
              <h3 className="font-bold text-cobra-text-main text-sm">{labels.DATES_TITLE}</h3>
            </div>
            <div className="p-6 flex flex-col justify-center h-full gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{labels.START_DATE}</span>
                  <span className="text-sm font-bold text-cobra-text-main">{data.startDate}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{labels.END_DATE}</span>
                  <span className="text-sm font-bold text-cobra-text-main">{data.endDate}</span>
                </div>
              </div>
              
              <div className="relative pt-8 pb-4">
                <div className="absolute top-2 right-0 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{data.daysRemaining} {labels.DAYS_REMAINING}</div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cobra-primary rounded-full transition-all duration-1000" 
                    style={{ width: `${(data.durationDays - data.daysRemaining) / data.durationDays * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[11px] font-bold text-slate-500">{labels.START_LABEL}</span>
                  <span className="text-[11px] font-bold text-slate-500">{labels.END_LABEL}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <i className="ph ph-file-text text-cobra-primary text-lg"></i>
              <h3 className="font-bold text-cobra-text-main text-sm">{labels.CONTRACTS_TITLE}</h3>
            </div>
            <div className="p-6 h-full flex flex-col">
              {data.associatedContracts && data.associatedContracts.length > 0 ? (
                <div className="space-y-4 flex-1">
                  {data.associatedContracts.map((contract, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-cobra-primary/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-cobra-text-main bg-white px-2 py-1 rounded border border-slate-200">{contract.code}</span>
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{contract.type}</span>
                      </div>
                      <p className="text-xs text-cobra-text-main line-clamp-2 mb-3">{contract.object}</p>
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
                        <span>{contract.executor}</span>
                        <span className="text-cobra-primary">${contract.totalValue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic text-center py-4 m-auto">{labels.NO_CONTRACTS}</div>
              )}
            </div>
          </div>
        </div>

        {/* Fila 3: Bitácoras y Equipo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <i className="ph ph-notebook text-cobra-primary text-lg"></i>
              <h3 className="font-bold text-cobra-text-main text-sm">{labels.LOGS_TITLE}</h3>
            </div>
            <div className="p-6 h-full flex flex-col">
              {data.activeLogs && data.activeLogs.length > 0 ? (
                <div className="space-y-4 flex-1">
                  {data.activeLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <i className="ph ph-file-text text-cobra-primary"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-bold text-cobra-text-main">{log.title}</span>
                          <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded font-bold uppercase tracking-widest text-slate-500">{log.date}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-[11px] font-medium text-slate-500">{labels.AUTHOR} {log.author}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${log.status === 'Aprobado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {log.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic text-center py-4 m-auto">{labels.NO_LOGS}</div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <i className="ph ph-users text-cobra-primary text-lg"></i>
              <h3 className="font-bold text-cobra-text-main text-sm">{labels.TEAM_TITLE}</h3>
            </div>
            <div className="p-6 flex flex-col gap-4 h-full">
              {data.supportTeam && data.supportTeam.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-start">
                  {data.supportTeam.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-cobra-text-main line-clamp-1">{member.name}</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic text-center py-4 m-auto">{labels.NO_TEAM}</div>
              )}
            </div>
          </div>
        </div>

        {/* Fila 4: Ubicación y Fotos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <i className="ph ph-map-pin text-cobra-primary text-lg"></i>
              <h3 className="font-bold text-cobra-text-main text-sm">{labels.LOCATION_TITLE}</h3>
            </div>
            <div className="p-6 flex flex-col justify-between h-full gap-4">
              <div className="w-full h-48 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden">
                <i className="ph ph-map-trifold text-5xl text-slate-300"></i>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/40 relative z-10 animate-bounce">
                    <i className="ph ph-lightning"></i>
                  </div>
                  <div className="absolute w-12 h-12 bg-blue-600/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{labels.LOCATION_LABEL}</span>
                  <span className="text-xs font-bold text-cobra-text-main line-clamp-1">{data.location}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{labels.MUNICIPALITIES}</span>
                  <span className="text-xs font-bold text-cobra-text-main line-clamp-1">{data.location}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{labels.DEPARTMENTS}</span>
                  <span className="text-xs font-bold text-cobra-text-main line-clamp-1">{data.location} D.C.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <i className="ph ph-camera text-cobra-primary text-lg"></i>
              <h3 className="font-bold text-cobra-text-main text-sm">{labels.GALLERY_TITLE}</h3>
            </div>
            <div className="p-6 h-full flex flex-col justify-center">
              {data.beforeAfterPhotos && data.beforeAfterPhotos.length > 0 ? (
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col gap-3 h-full">
                  <span className="text-xs font-bold text-cobra-text-main text-center mb-1">{data.beforeAfterPhotos[0].description}</span>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="relative group rounded-lg overflow-hidden border border-slate-200 h-full min-h-[140px]">
                      <img src={data.beforeAfterPhotos[0].beforeUrl} alt={labels.BEFORE} className="w-full h-full object-cover absolute inset-0" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-bold text-xs bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-xl">{labels.BEFORE}</span>
                      </div>
                    </div>
                    <div className="relative group rounded-lg overflow-hidden border border-slate-200 h-full min-h-[140px]">
                      <img src={data.beforeAfterPhotos[0].afterUrl} alt={labels.AFTER} className="w-full h-full object-cover absolute inset-0" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-bold text-xs bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-xl">{labels.AFTER}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic text-center py-4 m-auto">{labels.NO_PHOTOS}</div>
              )}
            </div>
          </div>
        </div>

        {/* Fila 5: Indicadores (Alcance e Impacto) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="ph ph-target text-cobra-primary text-lg"></i>
              <h3 className="font-bold text-cobra-text-main text-sm">{labels.INDICATORS_TITLE}</h3>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-cobra-primary"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{labels.SCOPE}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{labels.IMPACT}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.goals && data.goals.map((goal, idx) => {
                const isImpact = goal.type === 'impact';
                const percent = !isImpact && goal.target > 0 ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0;
                
                return (
                  <div key={idx} className={`rounded-xl border p-4 flex flex-col justify-between h-32 transition-colors hover:shadow-sm ${isImpact ? 'bg-blue-50/50 border-blue-100' : 'bg-red-50/30 border-red-100'}`}>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <i className={`ph ${isImpact ? 'ph-trend-up text-blue-500' : 'ph-bullseye text-cobra-primary'} text-lg`}></i>
                        {!isImpact && (
                          <span className="text-xl font-black text-cobra-primary tabular-nums leading-none">{percent}%</span>
                        )}
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-600 leading-tight line-clamp-2">{goal.name}</h4>
                    </div>
                    
                    <div>
                      {isImpact ? (
                        <div className="flex items-baseline gap-1 mt-2">
                          <span className="text-xl font-black text-blue-700 tabular-nums leading-none">{goal.current.toLocaleString()}</span>
                          <span className="text-[9px] font-bold text-blue-500 uppercase">{goal.unit}</span>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-xs font-black text-cobra-text-main tabular-nums">
                              {goal.current.toLocaleString()} <span className="text-[9px] font-bold text-slate-400">/ {goal.target.toLocaleString()} {goal.unit}</span>
                            </span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{labels.EXECUTED_GOAL}</span>
                          </div>
                          <div className="w-full h-1.5 bg-red-100 rounded-full overflow-hidden">
                            <div className="h-full bg-cobra-primary rounded-full transition-all duration-1000" style={{ width: `${percent}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fila 6: Próximos Hitos y Evolución */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-cobra-primary">
                  <i className="ph ph-kanban text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-cobra-text-main text-sm">{labels.GANTT_TITLE}</h3>
                  <p className="text-[10px] text-slate-500 font-medium">{labels.GANTT_SUBTITLE}</p>
                </div>
              </div>
              <button onClick={() => setShowGantt(true)} className="text-[10px] font-bold text-slate-400 hover:text-cobra-primary transition-all uppercase tracking-widest flex items-center gap-1.5 bg-slate-50 hover:bg-red-50 px-3 py-2 rounded-lg border border-transparent hover:border-red-100">
                {labels.VIEW_GANTT} <i className="ph ph-arrows-out-simple"></i>
              </button>
            </div>
            <div className="p-6 h-[260px] overflow-y-auto">
              <div className="space-y-4">
                {ProjectsService.getProjectUpcomingMilestones().map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <i className={`ph ${item.progress === 100 ? 'ph-check' : item.progress > 0 ? 'ph-spinner animate-spin-slow' : 'ph-calendar-blank'} ${item.color} text-lg`}></i>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-cobra-text-main leading-tight">{item.name}</h4>
                          <span className="text-[11px] font-medium text-slate-500 mt-1 block">{item.date}</span>
                        </div>
                      </div>
                      <span className={`text-[12px] font-black tabular-nums tracking-tight px-3 py-1 rounded-lg border ${item.progress === 100 ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : item.progress > 0 ? 'bg-orange-100 border-orange-200 text-orange-700' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <i className="ph ph-chart-line-up text-cobra-primary text-lg"></i>
                <h3 className="font-bold text-cobra-text-main text-sm">Proyectado vs Real</h3>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col h-[260px]">
              <div className="flex justify-center gap-4 mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Proyección</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Ejecución</span>
                </div>
              </div>
              <div className="flex-1 w-full -ml-4 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} dx={-10} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '4px 8px' }}
                      itemStyle={{ fontSize: '10px', fontWeight: 'bold', padding: 0 }}
                      labelStyle={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold', marginBottom: '2px' }}
                    />
                    <Area type="monotone" dataKey="projected" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill="url(#colorProjected)" />
                    <Area type="monotone" dataKey="actual" stroke="#f97316" strokeWidth={1.5} fillOpacity={1} fill="url(#colorActual)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Fila 7: Reportes */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <i className="ph ph-file-arrow-down text-cobra-primary text-lg"></i>
            <h3 className="font-bold text-cobra-text-main text-sm">Reportes y Exportación</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-cobra-primary/30 transition-colors group">
              <i className="ph-fill ph-file-pdf text-red-500 text-3xl mb-4 group-hover:scale-110 transition-transform"></i>
              <span className="text-sm font-bold text-cobra-text-main mb-1">Reporte Individual</span>
              <span className="text-[11px] text-slate-500 mb-6 line-clamp-2">Resumen completo del proyecto en formato imprimible PDF.</span>
              <button className="mt-auto py-2 w-full bg-white border border-slate-200 text-cobra-text-main font-bold rounded-lg text-xs hover:bg-slate-100 transition-all shadow-sm">
                Descargar PDF
              </button>
            </div>

            <div className="flex flex-col p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-cobra-primary/30 transition-colors group">
              <i className="ph-fill ph-file-doc text-blue-500 text-3xl mb-4 group-hover:scale-110 transition-transform"></i>
              <span className="text-sm font-bold text-cobra-text-main mb-1">Supervisión e Interventoría</span>
              <span className="text-[11px] text-slate-500 mb-6 line-clamp-2">Actas y formatos de seguimiento técnico en DOC.</span>
              <button className="mt-auto py-2 w-full bg-white border border-slate-200 text-cobra-text-main font-bold rounded-lg text-xs hover:bg-slate-100 transition-all shadow-sm">
                Descargar DOCX
              </button>
            </div>

            <div className="flex flex-col p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-cobra-primary/30 transition-colors group">
              <i className="ph-fill ph-file-xls text-emerald-500 text-3xl mb-4 group-hover:scale-110 transition-transform"></i>
              <span className="text-sm font-bold text-cobra-text-main mb-1">Sabana de Datos</span>
              <span className="text-[11px] text-slate-500 mb-6 line-clamp-2">Exportación estructurada de hitos y finanzas en Excel.</span>
              <button className="mt-auto py-2 w-full bg-white border border-slate-200 text-cobra-text-main font-bold rounded-lg text-xs hover:bg-slate-100 transition-all shadow-sm">
                Descargar Excel
              </button>
            </div>
          </div>
        </div>
        
      </div>
      
      <GanttModal isOpen={showGantt} onClose={() => setShowGantt(false)} />
    </div>
  );
};

const InfoField: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex gap-3 items-start">
    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
      <i className={`ph ${icon} text-cobra-primary text-lg`}></i>
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] text-cobra-text-secondary font-bold uppercase tracking-tight">{label}</span>
      <span className="text-[13px] text-cobra-text-main font-semibold leading-tight">{value}</span>
    </div>
  </div>
);

export default ProjectSummary;
