import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 border-t border-gray-700 mt-auto">
      <div className="max-w-6xl mx-auto px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              <span className="text-green-500">Prompt</span>Master
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Soluções inteligentes para você dominar a engenharia de prompt e evoluir suas habilidades com IA.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Produto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/login" className="hover:text-green-400 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/missoes" className="hover:text-green-400 transition-colors">Missões</Link>
              </li>
              <li>
                <Link to="/ranking" className="hover:text-green-400 transition-colors">Ranking</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Empresa</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/sobre" className="hover:text-green-400 transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/integrantes" className="hover:text-green-400 transition-colors">Integrantes</Link>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Suporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/faq" className="hover:text-green-400 transition-colors">FAQ / Ajuda</Link>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">Contato</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">Termos de Uso</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; 2024 PromptMaster. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  );
}