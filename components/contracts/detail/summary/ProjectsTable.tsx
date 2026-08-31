
import React from 'react';
import { AssociatedProject } from '../../../../types';

interface Props {
  projects: AssociatedProject[];
}

const ProjectsTable: React.FC<Props> = ({ projects }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="text-base font-bold text-cobra-text-main flex items-center gap-2">
          <i className="ph ph-projector-screen text-cobra-primary"></i>
          Proyectos Asociados
        </h3>
        <button className="text-[12px] font-bold text-cobra-primary hover:underline">Consultar Todos</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[11px] font-bold text-cobra-text-secondary uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Código</th>
              <th className="px-6 py-3">Nombre Proyecto</th>
              <th className="px-6 py-3">Valor</th>
              <th className="px-6 py-3">Avance</th>
              <th className="px-6 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs font-bold">{project.code}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[13px] font-bold text-cobra-text-main">{project.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[13px] font-mono font-bold text-cobra-text-main">
                    $ {new Intl.NumberFormat('es-CO').format(project.value)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-cobra-primary hover:bg-red-50 rounded-lg transition-all">
                    <i className="ph ph-magnifying-glass text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
