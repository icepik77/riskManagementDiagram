"use client"; 

import React, { useState } from 'react';
import ProjectSidebar from '../ui/ProjectSidebar';
import Home from '../project/page';
import Tree from '../ui/Tree';
import initialProjectsData from '../lib/projectData';
import EventTreeElement from '@/types/EventTree';
import { AiOutlineMenu } from 'react-icons/ai';

interface ProjectData {
  id: number;
  name: string;
  context: string;
  eventTreeElements: EventTreeElement[];
}

const MainLayout: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjectsData);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const handleSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    if (window.innerWidth < 640) {
      setIsSidebarVisible(false);
    }
  };

  const handleUpdateProjectContext = (projectId: number, newContext: string) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, context: newContext } : project
    );
    setProjects(updatedProjects);
  };

  const handleUpdateProjectTreeEvents = (projectId: number, newTreeEvents: EventTreeElement[]) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, eventTreeElements: newTreeEvents } : project
    );
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    const newProject: ProjectData = {
      id: projects.length + 1,
      name: `Project ${projects.length + 1}`,
      context: '',
      eventTreeElements: [],
    };
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (projectId: number) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const selectedProject = projects.find((project) => project.id === selectedProjectId);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-4 bg-gray-800 text-white">
        <button onClick={toggleSidebar} className="text-2xl mr-4">
          <AiOutlineMenu />
        </button>
        <h1 className="text-xl">Диаграмма анализа событий API chatGPT</h1>
      </div>
      <div className="flex flex-row flex-grow">
        {isSidebarVisible && (
          <ProjectSidebar
            projects={projects}
            onSelectProject={handleSelectProject}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
            onCloseSidebar={() => setIsSidebarVisible(false)}
          />
        )}
        <div className="flex-grow p-4 bg-gray-100 overflow-auto">
          {selectedProject && (
            <>
              <Home
                selectedProject={selectedProject}
                onUpdateProjectContext={handleUpdateProjectContext}
                onUpdateProjectTreeEvents={handleUpdateProjectTreeEvents}
              />
              <Tree
                eventTreeElements={selectedProject.eventTreeElements}
                onUpdateTreeEvents={(newTreeEvents: any) =>
                  handleUpdateProjectTreeEvents(selectedProject.id, newTreeEvents)
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;




