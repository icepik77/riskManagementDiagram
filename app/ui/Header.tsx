"use client";

import React from 'react';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title = "Диаграмма анализа рисков", onLogout }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-purple-600 text-white">
      <div className="text-xl font-semibold">
        {title}
      </div>
      <button 
        onClick={onLogout} 
        className="bg-[#fb5607] text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
