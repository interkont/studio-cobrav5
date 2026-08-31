
import React, { useState, useRef, useEffect } from 'react';
import { DOCUMENT_FOLDERS } from '../../../../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UploadDocumentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  
  // Limpiar estados al abrir/cerrar
  useEffect(() => {
    if (isOpen) {
      setSelectedFolderId('');
      setDocumentDate('');
      setSelectedFile(null);
      setIsUploading(false);
      setUploadProgress(0);
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedFolder = DOCUMENT_FOLDERS.find(f => f.id === selectedFolderId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        setUploadProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setIsSuccess(true);
          // Auto cerrar después de mostrar éxito
          setTimeout(() => {
            onClose();
          }, 1500);
        }, 500);
      } else {
        setUploadProgress(progress);
      }
    }, 400);
  };

  const triggerDatePicker = () => {
    if (dateInputRef.current && !isUploading) {
      // Intenta abrir el picker nativo (soportado en navegadores modernos)
      try {
        (dateInputRef.current as any).showPicker();
      } catch (e) {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cobra-slate/60 backdrop-blur-sm" onClick={isUploading ? undefined : onClose}></div>
      
      <div className="bg-white rounded-3xl w-full max-w-xl relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black text-cobra-text-main flex items-center gap-2">
            <i className={`ph ph-upload-simple ${isSuccess ? 'text-green-500' : 'text-cobra-primary'}`}></i>
            {isSuccess ? 'Documento Cargado' : 'Subir Documento'}
          </h3>
          {!isUploading && !isSuccess && (
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
              <i className="ph ph-x font-bold text-slate-400"></i>
            </button>
          )}
        </div>

        <div className="p-8 space-y-6">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/20">
                <i className="ph-fill ph-check-circle text-6xl"></i>
              </div>
              <h4 className="text-2xl font-black text-cobra-text-main mb-2">¡Carga Exitosa!</h4>
              <p className="text-cobra-text-secondary font-medium px-8">El documento ha sido procesado y almacenado correctamente en la carpeta seleccionada.</p>
            </div>
          ) : (
            <>
              {/* Nombre y Fecha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest">Nombre del Documento</label>
                  <input 
                    type="text" 
                    disabled={isUploading}
                    placeholder="Ej: Acta de Inicio Enero"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-cobra-primary focus:ring-4 focus:ring-red-50 transition-all outline-none text-sm font-bold text-cobra-text-main disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest">Fecha Documento</label>
                  <div className="relative group">
                    <input 
                      ref={dateInputRef}
                      type="date" 
                      value={documentDate}
                      onChange={(e) => setDocumentDate(e.target.value)}
                      disabled={isUploading}
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:border-cobra-primary focus:ring-4 focus:ring-red-50 transition-all outline-none text-sm font-bold text-cobra-text-main disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
                    />
                    <button 
                      type="button"
                      onClick={triggerDatePicker}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cobra-primary transition-colors disabled:pointer-events-none"
                      disabled={isUploading}
                    >
                      <i className="ph ph-calendar-blank text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Carpeta y Tipo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest">Carpeta Destino</label>
                  <select 
                    value={selectedFolderId}
                    disabled={isUploading}
                    onChange={(e) => setSelectedFolderId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cobra-primary focus:ring-4 focus:ring-red-50 transition-all outline-none text-sm font-bold text-cobra-text-main bg-white disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">Seleccione Carpeta</option>
                    {DOCUMENT_FOLDERS.map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest">Tipo de Documento</label>
                  <select 
                    disabled={!selectedFolderId || isUploading}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cobra-primary focus:ring-4 focus:ring-red-50 transition-all outline-none text-sm font-bold text-cobra-text-main bg-white disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">{selectedFolderId ? 'Seleccione Tipo' : 'Seleccione carpeta primero'}</option>
                    {selectedFolder?.types.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dropzone de Archivo */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-cobra-text-secondary tracking-widest">Archivo Adjunto (PDF)</label>
                {!selectedFile ? (
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => isUploading ? null : fileInputRef.current?.click()}
                    className="w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-cobra-primary hover:bg-red-50/30 transition-all group"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden" 
                    />
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-cobra-primary transition-colors">
                      <i className="ph ph-cloud-arrow-up text-2xl"></i>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-cobra-text-main">Arrastra tu archivo aquí</p>
                      <p className="text-[11px] text-cobra-text-secondary font-medium mt-0.5">o haz clic para buscar en tu equipo (Máx. 10MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className={`w-full p-4 rounded-2xl border flex items-center justify-between group transition-all ${isUploading ? 'bg-slate-50 border-slate-200' : 'bg-red-50/30 border-cobra-primary'} animate-in slide-in-from-bottom-2 duration-200`}>
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors ${isUploading ? 'bg-slate-400 text-white' : 'bg-cobra-primary text-white shadow-red-500/20'}`}>
                        <i className="ph-fill ph-file-pdf text-2xl"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-cobra-text-main truncate pr-4">{selectedFile.name}</p>
                        <p className="text-[11px] text-cobra-text-secondary font-bold uppercase tracking-tighter">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
                        </p>
                      </div>
                    </div>
                    {!isUploading && (
                      <button 
                        onClick={clearFile}
                        className="w-8 h-8 rounded-full bg-white border border-red-100 text-cobra-primary hover:bg-red-50 transition-colors shadow-sm flex items-center justify-center shrink-0"
                      >
                        <i className="ph ph-trash font-bold"></i>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-cobra-text-secondary">
                    <span>Subiendo documento...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cobra-primary transition-all duration-300 ease-out shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="flex-1 py-4 bg-cobra-primary text-white rounded-2xl font-black text-sm hover:bg-cobra-hover transition-all shadow-xl shadow-red-500/20 active:scale-95 disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <i className="ph ph-circle-notch animate-spin text-lg"></i>
                      CARGANDO...
                    </>
                  ) : (
                    <>
                      <i className="ph ph-upload-simple font-bold"></i>
                      INICIAR CARGA DE DOCUMENTO
                    </>
                  )}
                </button>
                {!isUploading && (
                  <button 
                    onClick={onClose} 
                    className="px-6 py-4 bg-slate-100 text-cobra-text-main rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all active:scale-95"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
