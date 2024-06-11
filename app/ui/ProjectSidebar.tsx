import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';

interface Project {
  id: number;
  name: string;
}

interface ProjectSidebarProps {
  projects: Project[];
  onSelectProject: (projectId: number) => void;
  onAddProject: () => void;
  onDeleteProject: (projectId: number) => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ projects, onSelectProject, onAddProject, onDeleteProject }) => {
  return (
    <div className="w-full sm:w-1/4 bg-gray-800 text-white h-screen p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Projects</h2>
        <button onClick={onAddProject} className="text-2xl text-green-500">
          <AiOutlinePlus />
        </button>
      </div>
      <ul>
        {projects.map(project => (
          <li
            key={project.id}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-600 p-2 rounded mb-2"
            onClick={() => onSelectProject(project.id)}
          >
            <span>{project.name}</span>
            <BsTrash
              onClick={(e) => {
                e.stopPropagation();
                onDeleteProject(project.id);
              }}
              className="text-red-500 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSidebar;






// import React from 'react';

// interface Project {
//   id: number;
//   name: string;
// }

// const projects: Project[] = [
//   { id: 1, name: 'Project 1' },
//   { id: 2, name: 'Project 2' },
//   { id: 3, name: 'Project 3' },
// ];

// const ProjectSidebar: React.FC = () => {
//   return (
//     <div className="h-screen bg-purple-600 max-w-[256px] flex flex-row ">
//       <div className="flex flex-col w-64 text-white">
//         <div className="p-4">
//           <h2 className="text-xl font-semibold">Проекты</h2>
//         </div>
//         <ul>
//           {projects.map(project => (
//             <li key={project.id} className="p-4 hover:bg-gray-700 cursor-pointer">
//               {project.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProjectSidebar;