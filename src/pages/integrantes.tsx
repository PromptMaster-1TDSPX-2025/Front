import type { Member } from '../types/membro.ts';
import fotoGustavo from '../assets/gustavo.jpg';
import fotoGuilherme from '../assets/guilherme.jpg';
import fotoAnthony from '../assets/anthony.jpg';

const membersList: Member[] = [
  {
    name: 'Gustavo Araujo da Silva',
    rm: 'RM: 556526',
    turma: 'Turma: 1TDSPX-2025',
    image: fotoGustavo,
    githubUrl: 'https://github.com/gustavoDev02',
    linkedinUrl: 'https://www.linkedin.com/in/gustavo-araujo-677aa12b1/',
  },
  {
    name: 'Guilherme Santos Fonseca',
    rm: 'RM: 564232',
    turma: 'Turma: 1TDSPX-2025',
    image: fotoGuilherme,
    githubUrl: 'https://github.com/guifo2604',
    linkedinUrl: 'https://www.linkedin.com/in/guilherme-fonseca-2b57b5358',
  },
  {
    name: 'Anthony de Souza Henriques',
    rm: 'RM: 566188',
    turma: 'Turma: 1TDSPX-2025',
    image: fotoAnthony,
    githubUrl: 'https://github.com/Anthony566188',
    linkedinUrl: 'https://br.linkedin.com/in/anthony-henriques-69b256368',
  },
];

export function Integrantes() {
  return (
    <div className="px-8 py-16 min-h-screen">
      {/* Título da Página */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white">Nossos Integrantes</h1>
        <p className="text-gray-400 mt-4 text-lg">
          Conheça a equipe responsável pelo projeto PromptMaster.
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {membersList.map((member) => (
          <div 
            key={member.rm} 
            className="bg-gray-800 rounded-xl p-8 flex flex-col items-center text-center border border-gray-700 hover:border-purple-500 transition-colors"
          >
            {/* Foto Redonda com Borda */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-600 mb-6 shadow-lg">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
                // Adiciona uma imagem padrão caso a URL falhe
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=User';
                }}
              />
            </div>

            {/* Informações */}
            <h2 className="text-xl font-bold text-white mb-2">{member.name}</h2>
            <p className="text-gray-400 font-medium">{member.rm}</p>
            <p className="text-gray-500 text-sm mt-1">{member.turma}</p>

            {/* Ícones Sociais */}
            <div className="flex gap-4 mt-6">
              {/* LinkedIn Icon */}
              <a 
                href={member.linkedinUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* GitHub Icon */}
              <a 
                href={member.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}