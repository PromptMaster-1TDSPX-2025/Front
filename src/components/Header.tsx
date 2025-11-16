// src/components/Header.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  currentLevel: number;
  currentXP: number;
  maxXP: number;
  userNameInitial: string;
}

export function Header({ currentLevel, currentXP, maxXP, userNameInitial }: HeaderProps) {
  const location = useLocation(); // Para identificar a rota atual
  const xpPercentage = (currentXP / maxXP) * 100;

  const getLinkClass = (path: string) =>
    `font-semibold p-2 rounded-md transition-colors cursor-pointer ${
      location.pathname === path ? 'text-white bg-green-500' : 'text-gray-300 hover:text-white hover:bg-gray-700'
    }`;

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-800 border-b border-gray-700">
      <div className="text-2xl font-bold text-white">
        <span className="text-green-500">Prompt</span>Master
      </div>

      <nav className="flex gap-4">
        <Link to="/" className={getLinkClass('/')}>Início</Link>
        <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
        <Link to="/integrantes" className={getLinkClass('/integrantes')}>Integrantes</Link>
        <Link to="/sobre" className={getLinkClass('/sobre')}>Sobre</Link>
        <Link to="/faq" className={getLinkClass('/faq')}>FAQ</Link>
      </nav>

      <div className="flex items-center gap-4 text-gray-300">
        <span>Nível {currentLevel}</span>
        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${xpPercentage}%` }} />
        </div>
        <span>{currentXP}/{maxXP} XP</span>
        <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center font-semibold cursor-pointer">
          {userNameInitial}
        </div>
      </div>
    </header>
  );
}
