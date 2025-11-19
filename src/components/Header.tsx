import { Link, useLocation } from 'react-router-dom';
import type { UserProfile } from '../types/user'; 

export function Header({ currentLevel, currentXP, maxXP, userNameInitial }: UserProfile) {
  const location = useLocation(); 
  const xpPercentage = (currentXP / maxXP) * 100;

  const getLinkClass = (path: string) =>
    `font-semibold p-2 rounded-md transition-colors cursor-pointer ${
      location.pathname === path ? 'text-white bg-green-500' : 'text-gray-300 hover:text-white hover:bg-gray-700'
    }`;

  return (
    
    <header className="flex justify-between items-center px-8 py-4 bg-gray-800 border-b border-gray-700">
      <Link to="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
        <span className="text-green-500">Prompt</span>Master
      </Link>

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