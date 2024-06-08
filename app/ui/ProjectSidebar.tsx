import React from 'react';

interface Project {
  id: number;
  name: string;
}

const projects: Project[] = [
  { id: 1, name: 'Project 1' },
  { id: 2, name: 'Project 2' },
  { id: 3, name: 'Project 3' },
];

const ProjectSidebar: React.FC = () => {
  return (
    <div className="h-screen bg-purple-600 max-w-[256px] flex flex-row ">
      <div className="flex flex-col w-64 text-white">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Проекты</h2>
        </div>
        <ul>
          {projects.map(project => (
            <li key={project.id} className="p-4 hover:bg-gray-700 cursor-pointer">
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectSidebar;