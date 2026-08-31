import React, { useState } from 'react';
import { ProjectData } from '../../../../types';

interface Props {
  data: ProjectData;
}

const MOCK_MULTIMEDIA = [
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1541888052063-e380536fb562?auto=format&fit=crop&w=1200&q=80', label: 'Estructura Inicial', date: '15 Feb 2026', size: '2.4 MB' },
  { id: 2, type: 'video', videoType: 'youtube', url: 'https://www.youtube.com/embed/tPI_m1tW4Wk', thumb: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', label: 'Vista Aérea (Drone)', date: '18 Feb 2026', duration: '03:45', size: 'YouTube' },
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&w=1200&q=80', label: 'Cimentación Profunda', date: '22 Feb 2026', size: '3.1 MB' },
  { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', label: 'Interiores Nivel 1', date: '25 Feb 2026', size: '1.8 MB' },
  { id: 5, type: 'video', videoType: 'file', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumb: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=600&q=80', label: 'Recorrido Obra Blanca', date: '01 Mar 2026', size: '84.2 MB', duration: '01:12' },
  { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80', label: 'Plataforma Superior', date: '05 Mar 2026', size: '2.9 MB' },
  { id: 7, type: 'image', url: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1200&q=80', label: 'Estructura Metálica', date: '10 Mar 2026', size: '4.5 MB' },
  { id: 8, type: 'image', url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80', label: 'Fachada Principal', date: '12 Mar 2026', size: '3.8 MB' }
];

const MULTIMEDIA_TYPES = [
  "Avance de Obra",
  "Calidad y Acabados",
  "Seguridad y Salud (SST)",
  "Medio Ambiente",
  "Hallazgo / Incidencia",
  "Planos y Diseños"
];

const ProjectGalleryView: React.FC<Props> = ({ data }) => {
  // Estados para la Galería y Modal de Comparación
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentMediaIdx, setCurrentMediaIdx] = useState(0);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareMediaIdx, setCompareMediaIdx] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  // Estado para Menú de Carga
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState<'file' | 'youtube' | null>(null);

  const openViewer = (index: number) => {
    setCurrentMediaIdx(index);
    setViewerOpen(true);
    setIsCompareMode(false);
    setCompareMediaIdx(null);
    setSliderPosition(50);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setIsCompareMode(false);
    setCompareMediaIdx(null);
    // Pause any playing videos (handled naturally by React unmounting the video/iframe)
  };

  const currentMedia = MOCK_MULTIMEDIA[currentMediaIdx];
  const canCompare = currentMedia?.type === 'image';

  return (
    <>
    <div className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-visible flex flex-col">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center relative">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
               <i className="ph-fill ph-play-circle text-xl"></i>
             </div>
             <div>
               <h2 className="font-black text-cobra-slate text-sm">Multimedia</h2>
               <p className="text-[11px] text-slate-400 font-medium">Fotos y videos del avance del proyecto</p>
             </div>
          </div>
          
          <div className="relative">
             <button 
                onClick={() => setShowUploadMenu(!showUploadMenu)}
                className="px-6 py-3 bg-purple-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all flex items-center gap-2"
             >
               <i className="ph-bold ph-plus text-lg"></i> AGREGAR MULTIMEDIA
             </button>
             
             {showUploadMenu && (
                <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUploadMenu(false)}></div>
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                   <div className="p-2 flex flex-col gap-1">
                      <button 
                         onClick={() => { setShowUploadModal('file'); setShowUploadMenu(false); }}
                         className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-3 group"
                      >
                         <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <i className="ph-bold ph-upload-simple text-sm"></i>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-xs font-black text-cobra-slate">Archivo Local</span>
                            <span className="text-[9px] font-bold text-slate-400">Foto o Video (Max 150MB)</span>
                         </div>
                      </button>
                      <button 
                         onClick={() => { setShowUploadModal('youtube'); setShowUploadMenu(false); }}
                         className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-3 group"
                      >
                         <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <i className="ph-bold ph-youtube-logo text-sm"></i>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-xs font-black text-cobra-slate">Enlace YouTube</span>
                            <span className="text-[9px] font-bold text-slate-400">Vincular URL externa</span>
                         </div>
                      </button>
                   </div>
                </div>
                </>
             )}
          </div>
        </div>
        
        <div className="p-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_MULTIMEDIA.map((item, idx) => (
                <div key={item.id} className="group relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow" onClick={() => openViewer(idx)}>
                  <img src={item.type === 'video' ? item.thumb : item.url} alt={item.label} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 flex items-center justify-center transition-colors duration-300">
                    
                    {/* Video Play Icon Indicator */}
                    {item.type === 'video' && (
                       <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/50 shadow-lg">
                             <i className="ph-fill ph-play text-xl ml-1"></i>
                          </div>
                       </div>
                    )}

                    <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 absolute bottom-4">
                      <span className="text-white font-bold text-xs bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-xl text-center">
                        {item.label}
                      </span>
                      <span className="text-white/80 text-[10px] bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1.5">
                        <i className={`ph-bold ${item.type === 'video' ? 'ph-video-camera' : 'ph-image'}`}></i>
                        {item.date} {item.duration && `• ${item.duration}`}
                      </span>
                    </div>
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 z-10">
                     {item.type === 'video' ? (
                        <div className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-white/20">
                           <i className={item.videoType === 'youtube' ? 'ph-fill ph-youtube-logo text-red-500' : 'ph-fill ph-file-video text-blue-400'}></i>
                           Video
                        </div>
                     ) : (
                        <div className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-white/20">
                           <i className="ph-fill ph-image text-emerald-400"></i>
                           Foto
                        </div>
                     )}
                  </div>

                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-white/30 z-10">
                     <i className="ph-bold ph-arrows-out-simple"></i>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>

    {/* Modal de Carga de Multimedia */}
    {showUploadModal && (
       <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-sm font-black text-cobra-slate flex items-center gap-2">
                   {showUploadModal === 'file' ? <><i className="ph-fill ph-upload-simple text-blue-600 text-lg"></i> Cargar Archivo Local</> : <><i className="ph-fill ph-youtube-logo text-red-600 text-lg"></i> Vincular YouTube</>}
                </h3>
                <button onClick={() => setShowUploadModal(null)} className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-300 transition-colors">
                   <i className="ph-bold ph-x"></i>
                </button>
             </div>
             
             <div className="p-6">
                {showUploadModal === 'file' ? (
                   <div className="flex flex-col gap-5">
                      <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-colors cursor-pointer group">
                         <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                            <i className="ph-bold ph-cloud-arrow-up text-2xl"></i>
                         </div>
                         <h4 className="text-sm font-black text-cobra-slate mb-1">Arrastra tu archivo aquí</h4>
                         <p className="text-[10px] text-slate-500 font-medium px-4">Soporta JPG, PNG, MP4, MOV. <br/>Max: <span className="font-bold text-cobra-slate">150 MB</span></p>
                         <button className="mt-4 px-5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-cobra-slate shadow-sm hover:border-blue-500 hover:text-blue-600 transition-colors">
                            Explorar Archivos
                         </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tipo de Recurso</label>
                            <div className="relative">
                               <select className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm font-bold text-cobra-slate focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none bg-white">
                                  <option value="" disabled selected>Seleccionar...</option>
                                  {MULTIMEDIA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                               </select>
                               <i className="ph-bold ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                            </div>
                         </div>
                         <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Fecha</label>
                            <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-cobra-slate focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all" defaultValue={new Date().toISOString().split('T')[0]} />
                         </div>
                      </div>

                      <button className="w-full py-3 bg-cobra-slate text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                         <i className="ph-bold ph-check-circle text-base"></i> Iniciar Carga
                      </button>
                   </div>
                ) : (
                   <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                         <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">URL del Video (YouTube)</label>
                         <div className="relative">
                            <i className="ph-bold ph-link absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" placeholder="https://www.youtube.com/watch?v=..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-cobra-slate focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" />
                         </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                         <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Título descriptivo</label>
                         <input type="text" placeholder="Ej: Vaciado Losa Nivel 2" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-cobra-slate focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tipo de Recurso</label>
                            <div className="relative">
                               <select className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm font-bold text-cobra-slate focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all appearance-none bg-white">
                                  <option value="" disabled selected>Seleccionar...</option>
                                  {MULTIMEDIA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                               </select>
                               <i className="ph-bold ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                            </div>
                         </div>
                         <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Fecha</label>
                            <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-cobra-slate focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" defaultValue={new Date().toISOString().split('T')[0]} />
                         </div>
                      </div>

                      <button className="mt-2 w-full py-3 bg-cobra-slate text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                         <i className="ph-bold ph-check-circle text-base"></i> Guardar Enlace
                      </button>
                   </div>
                )}
             </div>
          </div>
       </div>
    )}

    {/* Visualizador Inmersivo y Comparador (Modal) */}
    {viewerOpen && (
      <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
        
        {/* Top Bar Viewer */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 relative z-20 bg-slate-900/50">
           <div className="flex items-center gap-4">
              <button onClick={closeViewer} className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all">
                <i className="ph-bold ph-x text-xl"></i>
              </button>
              <div className="flex flex-col">
                <span className="text-white font-black text-sm flex items-center gap-2">
                   {currentMedia.type === 'video' ? <i className="ph-fill ph-video-camera text-blue-400"></i> : <i className="ph-fill ph-image text-emerald-400"></i>}
                   {currentMedia.label}
                </span>
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-0.5">
                   {currentMedia.size} • {currentMedia.date} {currentMedia.duration && `• ${currentMedia.duration}`}
                </span>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              {/* Solo mostrar botón de comparar si es una imagen y no un video */}
              {canCompare ? (
                 <button 
                   onClick={() => {
                      setIsCompareMode(!isCompareMode);
                      if(isCompareMode) setCompareMediaIdx(null);
                   }}
                   className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${isCompareMode ? 'bg-cobra-primary text-white shadow-lg shadow-red-600/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
                 >
                   <i className="ph-bold ph-arrows-split"></i>
                   {isCompareMode ? 'Cancelar Comparación' : 'Comparar Evidencia'}
                 </button>
              ) : (
                 <div className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 bg-white/5 text-white/30 border border-white/5" title="La comparación solo está disponible para fotografías">
                   <i className="ph-bold ph-arrows-split"></i>
                   Comparación No Disponible
                 </div>
              )}
              
              <div className="w-px h-6 bg-white/10 mx-2"></div>
              
              <button className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-black flex items-center gap-2 hover:bg-white/20 transition-all">
                <i className="ph-bold ph-download-simple text-lg"></i>
                Descargar
              </button>
           </div>
        </div>

        {/* Main Stage */}
        <div className="flex-1 w-full flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
           
           {/* Not In Compare Mode OR Compare Mode without 2nd photo selected */}
           {(!isCompareMode || (isCompareMode && compareMediaIdx === null)) && (
             <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                
                {/* Media Renderer */}
                <div className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
                   {currentMedia.type === 'image' && (
                      <img 
                        src={currentMedia.url} 
                        alt={currentMedia.label} 
                        className="max-w-full max-h-full object-contain rounded-2xl"
                      />
                   )}
                   
                   {currentMedia.type === 'video' && currentMedia.videoType === 'youtube' && (
                      <iframe 
                         src={currentMedia.url} 
                         title={currentMedia.label}
                         className="w-full max-w-5xl aspect-video rounded-2xl bg-black border border-white/10 shadow-2xl"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowFullScreen
                      ></iframe>
                   )}

                   {currentMedia.type === 'video' && currentMedia.videoType === 'file' && (
                      <video 
                         src={currentMedia.url} 
                         controls
                         className="w-full max-w-5xl aspect-video rounded-2xl bg-black border border-white/10 shadow-2xl"
                      ></video>
                   )}
                </div>

                {/* Arrows overlay for base media */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 w-full max-w-7xl mx-auto z-10 pointer-events-none">
                  <button 
                    className={`pointer-events-auto w-12 h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-cobra-primary transition-colors shadow-lg border border-white/10 ${currentMediaIdx === 0 ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                    onClick={(e) => { e.stopPropagation(); if(currentMediaIdx > 0) setCurrentMediaIdx(prev => prev - 1); }}
                  >
                    <i className="ph-bold ph-caret-left text-xl"></i>
                  </button>
                  <button 
                    className={`pointer-events-auto w-12 h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-cobra-primary transition-colors shadow-lg border border-white/10 ${currentMediaIdx === MOCK_MULTIMEDIA.length - 1 ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                    onClick={(e) => { e.stopPropagation(); if(currentMediaIdx < MOCK_MULTIMEDIA.length - 1) setCurrentMediaIdx(prev => prev + 1); }}
                  >
                    <i className="ph-bold ph-caret-right text-xl"></i>
                  </button>
                </div>

                {/* Pulse Guide for Comparison */}
                {isCompareMode && compareMediaIdx === null && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-dashed border-white/30 animate-pulse pointer-events-none">
                      <div className="bg-slate-900/90 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-white/10">
                         <i className="ph-fill ph-hand-pointing text-2xl text-cobra-primary"></i>
                         <span className="font-bold text-sm">Selecciona una imagen en la parte inferior para comparar</span>
                      </div>
                   </div>
                )}
             </div>
           )}

           {/* Compare Mode Active (Split View) */}
           {isCompareMode && compareMediaIdx !== null && (
              <div className="relative w-full max-w-5xl h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 animate-in zoom-in-95 duration-500 select-none">
                 
                 {/* Image 1 (Base - Right Side Underneath) */}
                 <img 
                   src={currentMedia.url} 
                   className="absolute inset-0 w-full h-full object-contain" 
                   alt="Base"
                   draggable={false}
                 />
                 
                 {/* Image 2 (Target - Left Side Clipped) */}
                 <div 
                   className="absolute inset-0 bg-black"
                   style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                 >
                   <img 
                     src={MOCK_MULTIMEDIA[compareMediaIdx].url} 
                     className="absolute inset-0 w-full h-full object-contain" 
                     alt="Target"
                     draggable={false}
                   />
                 </div>

                 {/* Slider visual line */}
                 <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                 >
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center">
                       <i className="ph-bold ph-arrows-left-right text-slate-800 text-sm"></i>
                    </div>
                 </div>

                 {/* Hidden range input for drag logic */}
                 <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderPosition} 
                    onChange={(e) => setSliderPosition(Number(e.target.value))} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0" 
                 />

                 {/* Labels */}
                 <div className="absolute top-6 left-6 z-40 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border border-white/10 shadow-lg flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                       {MOCK_MULTIMEDIA[compareMediaIdx].label}
                    </div>
                 </div>
                 <div className="absolute top-6 right-6 z-40 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border border-white/10 shadow-lg flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-cobra-primary"></div>
                       {currentMedia.label}
                    </div>
                 </div>
              </div>
           )}
        </div>

        {/* Thumbnail Strip Footer */}
        <div className="bg-slate-900/80 border-t border-white/10 p-6 relative z-20">
           
           {/* Dots Navigation (Only visible when not comparing) */}
           {!isCompareMode && (
              <div className="flex justify-center gap-2 mb-4">
                 {MOCK_MULTIMEDIA.map((_, idx) => (
                    <button 
                       key={idx} 
                       onClick={() => setCurrentMediaIdx(idx)}
                       className={`h-1.5 rounded-full transition-all duration-300 ${currentMediaIdx === idx ? 'w-6 bg-cobra-primary' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
                    />
                 ))}
              </div>
           )}

           <div className="flex items-center justify-center gap-4 overflow-x-auto hide-scrollbar max-w-7xl mx-auto px-4">
              {MOCK_MULTIMEDIA.map((item, idx) => {
                 // Logic to highlight thumbnails based on mode
                 const isBaseMedia = currentMediaIdx === idx;
                 const isCompareTarget = compareMediaIdx === idx;
                 
                 // In compare mode, dim out videos since they can't be selected as targets
                 const isDisabledInCompare = isCompareMode && item.type === 'video';
                 
                 let containerClass = "border-transparent opacity-50 hover:opacity-100 hover:border-white/30";
                 
                 if(isDisabledInCompare) {
                    containerClass = "border-transparent opacity-20 cursor-not-allowed grayscale";
                 } else if(isBaseMedia) {
                    containerClass = "border-cobra-primary opacity-100 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                 } else if (isCompareMode && isCompareTarget) {
                    containerClass = "border-emerald-500 opacity-100 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-110";
                 }

                 return (
                    <div 
                       key={item.id} 
                       onClick={() => {
                          if(isDisabledInCompare) return;

                          if(!isCompareMode) {
                             setCurrentMediaIdx(idx);
                          } else {
                             // Si está en modo comparador
                             if(!isBaseMedia) setCompareMediaIdx(idx);
                          }
                       }}
                       className={`w-24 h-16 shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 relative group ${containerClass}`}
                       title={isDisabledInCompare ? "Videos no disponibles para comparación" : item.label}
                    >
                       <img src={item.type === 'video' ? item.thumb : item.url} className="w-full h-full object-cover" alt="thumb" />
                       
                       {/* Video Icon Indicator in Thumb */}
                       {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                             <i className="ph-fill ph-play-circle text-white/80 text-xl drop-shadow-md"></i>
                          </div>
                       )}

                       {isBaseMedia && (
                          <div className="absolute inset-x-0 bottom-0 bg-cobra-primary text-white text-[8px] font-black uppercase text-center py-0.5">
                             Original
                          </div>
                       )}
                       {(isCompareMode && isCompareTarget) && (
                          <div className="absolute inset-x-0 bottom-0 bg-emerald-500 text-white text-[8px] font-black uppercase text-center py-0.5">
                             Vs
                          </div>
                       )}
                    </div>
                 )
              })}
           </div>
        </div>

      </div>
    )}
    </>
  );
};

export default ProjectGalleryView;
