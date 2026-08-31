import React from 'react';
import { ProjectData } from '../../../../types';
import { ProjectsService } from '../../../../services/projects.service';
import { PROJECT_DICTIONARY } from '../../../../constants/projects.dictionary';

interface Props {
  data: ProjectData;
}

const ProjectDocsView: React.FC<Props> = ({ data }) => {
  const labels = PROJECT_DICTIONARY.DOCS;
  const folders = ProjectsService.getProjectDocsFolders();
  const files = ProjectsService.getProjectDocsFiles();
  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
               <i className="ph ph-folder-open text-xl"></i>
             </div>
             <div>
               <h2 className="font-black text-cobra-slate text-sm">{labels.TITLE}</h2>
               <p className="text-[11px] text-slate-400 font-medium">{labels.SUBTITLE}</p>
             </div>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:-translate-y-0.5 flex items-center gap-2">
            <i className="ph-bold ph-upload-simple text-lg"></i> {labels.BTN_UPLOAD}
          </button>
        </div>
        
        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {folders.map((folder) => (
                <div key={folder.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:bg-slate-100 hover:border-slate-200 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                    <i className="ph-fill ph-folder text-2xl"></i>
                  </div>
                  <h3 className="text-sm font-bold text-cobra-slate mb-1">{folder.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{folder.count} {labels.FILES_COUNT}</p>
                </div>
              ))}
           </div>
           
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{labels.RECENT_DOCS}</h3>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                 <tr>
                   <th className="px-6 py-4">{labels.COL_NAME}</th>
                   <th className="px-6 py-4">{labels.COL_CATEGORY}</th>
                   <th className="px-6 py-4">{labels.COL_DATE}</th>
                   <th className="px-6 py-4">{labels.COL_SIZE}</th>
                   <th className="px-6 py-4 text-right">{labels.COL_OPTIONS}</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 bg-white">
                 {files.map(file => (
                   <tr key={file.id} className="hover:bg-slate-50/80 transition-all">
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <i className={`ph-fill ${file.icon} ${file.color} text-xl`}></i>
                         <span className="text-sm font-bold text-cobra-slate">{file.name}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold">{file.category}</span></td>
                     <td className="px-6 py-4 text-xs font-medium text-slate-500">{file.date}</td>
                     <td className="px-6 py-4 text-xs font-medium text-slate-500">{file.size}</td>
                     <td className="px-6 py-4 text-right">
                       <button className="text-slate-400 hover:text-cobra-primary transition-colors">
                         <i className="ph-bold ph-download-simple text-lg"></i>
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDocsView;
