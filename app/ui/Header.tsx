"use client";


import React from 'react';

interface HeaderProps {
  title: string;
  email: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, email, onLogout }) => {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl">{title}</h1>
      </div>
      <div className="flex items-center">
        <span className="mr-4">{email}</span>
        <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;

