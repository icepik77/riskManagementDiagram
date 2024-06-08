"use client"; 

import React from 'react';
import ProjectSidebar from '../ui/ProjectSidebar';
import Header from '../ui/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Диаграмма анализа рисков API(ChatGPT)" onLogout={() => console.log("logout")} />
      <div className="flex flex-row flex-grow">
        <ProjectSidebar />
        <div className="flex-grow p-4 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;





