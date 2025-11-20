import { Link } from 'react-router-dom';

export function Sobre() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-8 py-16">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-6">
              Transformando a maneira como você interage com a <span className="text-green-500">IA</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              O <strong>PromptMaster</strong> nasceu da necessidade de democratizar o conhecimento sobre Engenharia de Prompt. 
              Acreditamos que a Inteligência Artificial não veio para substituir a criatividade humana, mas sim para potencializá-la.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Nossa missão é transformar estudantes e profissionais em especialistas capazes de extrair o máximo potencial 
              de ferramentas como ChatGPT, Claude e Gemini, tudo isso através de uma metodologia prática e divertida.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gray-800 rounded-2xl border border-gray-700 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br  from-teal-600 to-indigo-900 z-0"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
              
              <div className="relative z-10 text-center">
                <span className="block text-6xl mb-2">🚀</span>
                <h3 className="text-2xl font-bold text-white">Aprenda e Domine</h3>
              </div>
            </div>  
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Pilares</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border-l-4 border-green-500 shadow-lg hover:bg-gray-750 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Inovação Prática</h3>
              <p className="text-gray-400">
                Chega de teoria chata. Aqui você aprende colocando a mão na massa com desafios reais do mercado.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border-l-4 border-purple-500 shadow-lg hover:bg-gray-750 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Gamificação</h3>
              <p className="text-gray-400">
                Aprender não precisa ser pesado. Usamos mecânicas de jogos (XP, Níveis, Conquistas) para manter você motivado.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border-l-4 border-blue-500 shadow-lg hover:bg-gray-750 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Comunidade</h3>
              <p className="text-gray-400">
                Ninguém aprende sozinho. Construímos um ambiente colaborativo para troca de prompts e experiências.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar sua jornada?</h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de exploradores e domine a arte de conversar com as máquinas hoje mesmo.
          </p>
          <Link 
            to="/dashboard" 
            className="inline-block px-8 py-4 bg-white text-purple-900 font-bold rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all"
          >
            Acessar o Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}