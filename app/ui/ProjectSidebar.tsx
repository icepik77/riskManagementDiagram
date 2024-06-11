import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

interface Project {
  id: number;
  name: string;
}

interface ProjectSidebarProps {
  projects: Project[];
  onSelectProject: (projectId: number) => void;
  onAddProject: () => void;
  onDeleteProject: (projectId: number) => void;
  onCloseSidebar: () => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  projects,
  onSelectProject,
  onAddProject,
  onDeleteProject,
  onCloseSidebar,
}) => {
  return (
    <div className="fixed inset-0 z-50 sm:static sm:inset-auto w-3/4 sm:w-1/4 bg-gray-800 text-white h-screen p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Projects</h2>
        <div className="flex space-x-2">
          <button onClick={onAddProject} className="text-2xl text-green-500">
            <AiOutlinePlus />
          </button>
          <button onClick={onCloseSidebar} className="text-2xl text-red-500 sm:hidden">
            <AiOutlineClose />
          </button>
        </div>
      </div>
      <ul>
        {projects.map((project) => (
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