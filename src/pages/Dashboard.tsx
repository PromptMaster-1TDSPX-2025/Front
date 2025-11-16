import { Link } from 'react-router-dom';

interface Missao {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
}

const missoes: Missao[] = [
  { id: 'fundamentos', icon: '🎯', title: 'Fundamentos', description: 'Domine os conceitos básicos de engenharia de prompt.', progress: 2, total: 3 },
  { id: 'estruturacao', icon: '📏', title: 'Estruturação', description: 'Aprenda a organizar informações e formatar saídas.', progress: 0, total: 3 },
  { id: 'tecnicas-avancadas', icon: '🚀', title: 'Técnicas Avançadas', description: 'Técnicas sofisticadas para resultados profissionais.', progress: 0, total: 3 },
  { id: 'nivel-expert', icon: '👑', title: 'Nível Expert', description: 'Desafios para mestres da engenharia de prompt.', progress: 0, total: 2 },
];

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10">
      <h1 className="text-4xl font-bold mb-2">Suas Missões</h1>
      <p className="text-gray-400 mb-8">Escolha uma categoria para começar a treinar</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {missoes.map((missao) => (
          <Link key={missao.id} to={`/exercicios/${missao.id}`}>
            <div className="bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">{missao.icon}</span>
                {missao.title}
              </h3>
              <p className="text-gray-400 mb-4">{missao.description}</p>

              <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(missao.progress / missao.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-gray-300 text-sm">
                <span>{missao.progress}/{missao.total} missões</span>
                <span>{Math.floor((missao.progress / missao.total) * 100)}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
