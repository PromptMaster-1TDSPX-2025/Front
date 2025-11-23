import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

export function Header() {
  const location = useLocation();
  // Usamos a lógica da feature branch (Auth Context)
  const { user, isAuthenticated, logout } = useAuth();

  // Cálculo de XP baseado no usuário real
  const xpAtualNoNivel = user ? user.totalXp % 100 : 0; 
  const xpPercentage = (xpAtualNoNivel / 100) * 100;

  const getLinkClass = (path: string) =>
    `font-semibold p-2 rounded-md transition-colors cursor-pointer ${
      location.pathname === path
        ? 'text-white bg-green-500'
        : 'text-gray-300 hover:text-white hover:bg-gray-700'
    }`;

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-800 border-b border-gray-700">
      
      <Link to="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
        <span className="text-green-500">Prompt</span>Master
      </Link>

      <nav className="hidden md:flex gap-4 items-center">
        <Link to="/" className={getLinkClass('/')}>Início</Link>
        {/* Link condicional da feature branch */}
        {isAuthenticated && <Link to="/dashboard" className={getLinkClass('/dashboard')}>Trilhas</Link>}
        <Link to="/integrantes" className={getLinkClass('/integrantes')}>Integrantes</Link>
        <Link to="/sobre" className={getLinkClass('/sobre')}>Sobre</Link>
        <Link to="/faq" className={getLinkClass('/faq')}>FAQ</Link>
      </nav>

      {/* Lógica de exibição baseada no AuthContext */}
      {isAuthenticated && user ? (

        <div className="flex items-center gap-4 text-gray-300">
          <span className="text-sm font-medium text-green-400">Nível {user.nivel}</span>
          
          {/* Barra de XP */}
          <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden" title={`XP Total: ${user.totalXp}`}>
            <div 
              className="h-full bg-green-500 transition-all duration-1000" 
              style={{ width: `${xpPercentage}%` }} 
            />
          </div>
          
          <span className="text-sm font-medium hidden sm:block">{user.totalXp} XP</span>
          
          {/* Avatar com Inicial */}
          <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center font-semibold text-white cursor-pointer border border-purple-500" title={user.nome}>
            {user.nome.charAt(0).toUpperCase()}
          </div>

          {/* Botão Sair */}
          <button onClick={logout} className="text-xs text-red-400 hover:text-red-300 ml-2">
            Sair
          </button>
        </div>
      ) : (
        // === MODO VISITANTE ===
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="font-semibold text-gray-300 hover:text-white transition-colors"
          >
            Entrar
          </Link>

          <Link 
            to="/cadastro" 
            className="font-semibold px-4 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-600 transition-colors"
          >
            Cadastre-se
          </Link>
        </div>
      )}
    </header>
  );
}