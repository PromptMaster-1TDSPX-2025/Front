import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation(); 

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
        <Link to="/integrantes" className={getLinkClass('/integrantes')}>Integrantes</Link>
        <Link to="/sobre" className={getLinkClass('/sobre')}>Sobre</Link>
        <Link to="/faq" className={getLinkClass('/faq')}>FAQ</Link>
      </nav>

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

    </header>
  );
}