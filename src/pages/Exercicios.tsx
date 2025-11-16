import { useNavigate, useParams } from 'react-router-dom';

interface Exercise {
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  completed: boolean;
  link: string;
}

// Cada missão tem seus próprios exercícios
const exercisesByMission: Record<string, Exercise[]> = {
  fundamentos: [
    { title: 'Clareza e Objetividade', description: 'Prompt claros e diretos.', difficulty: 'Fácil', xp: 50, completed: true, link: '/atividade/fundamentos-1' },
    { title: 'Contexto é Rei', description: 'Dar contexto adequado para a IA.', difficulty: 'Fácil', xp: 50, completed: false, link: '/atividade/fundamentos-2' },
  ],
  estruturacao: [
    { title: 'Organização de Dados', description: 'Estruture informações corretamente.', difficulty: 'Médio', xp: 60, completed: false, link: '/atividade/estruturacao-1' },
    { title: 'Formatação de Respostas', description: 'Saídas bem formatadas.', difficulty: 'Médio', xp: 60, completed: false, link: '/atividade/estruturacao-2' },
  ],
  'tecnicas-avancadas': [
    { title: 'Comandos Condicionais', description: 'Use condições nos prompts.', difficulty: 'Difícil', xp: 80, completed: false, link: '/atividade/tecnicas-1' },
  ],
  'nivel-expert': [
    { title: 'Prompt Mastery', description: 'Desafios avançados para mestres.', difficulty: 'Expert', xp: 100, completed: false, link: '/atividade/expert-1' },
  ],
};

export function Exercicios() {
  const { missaoId } = useParams<{ missaoId: string }>();
  const navigate = useNavigate();

  if (!missaoId || !exercisesByMission[missaoId]) {
    return <p className="p-5">Missão não encontrada.</p>;
  }

  const exercises = exercisesByMission[missaoId];

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10">
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
      >
        ← Voltar
      </button>

      <h2 className="text-3xl font-bold mb-2">{missaoId.replace('-', ' ')}</h2>
      <p className="text-gray-400 mb-6">Escolha um exercício para começar a praticar</p>

      <div className="grid gap-5">
        {exercises.map((ex) => (
          <div
            key={ex.title}
            className={`p-5 rounded-xl border border-gray-700 bg-gray-800 flex justify-between items-center cursor-pointer hover:shadow-lg transition-all ${
              ex.completed ? 'opacity-70' : ''
            }`}
            onClick={() => navigate(ex.link)}
          >
            <span className={`text-2xl ${ex.completed ? 'text-green-500' : 'text-yellow-400'}`}>
              {ex.completed ? '✓' : '▶'}
            </span>

            <div className="flex-1 ml-4">
              <h4 className="text-xl font-semibold">{ex.title}</h4>
              <p className="text-gray-300">{ex.description}</p>
            </div>

            <div className="flex gap-2">
              <span className="px-2 py-1 rounded bg-gray-700 text-gray-200 text-sm">{ex.difficulty}</span>
              <span className="px-2 py-1 rounded bg-green-500 text-white text-sm">+{ex.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
