import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// interface para os dados que virão do backend
interface TrilhaInfo {
  id: number;
  nome: string;
  descricao: string;
}

// Definição visual dos status das lições
type LessonStatus = 'locked' | 'current' | 'completed' | 'chest';

interface LessonNode {
  id: number;
  icon: string;
  status: LessonStatus;
  title: string;
}

// Mock de dados para simular visualmente (o caminho da cobra)
const lessonsMock: LessonNode[] = [
  { id: 1, icon: '⭐', status: 'completed', title: 'Introdução' },
  { id: 2, icon: 'book', status: 'completed', title: 'Conceitos' },
  { id: 3, icon: 'chest', status: 'chest', title: 'Baú de XP' },
  { id: 4, icon: 'pencil', status: 'current', title: 'Prática 1' },
  { id: 5, icon: 'biceps', status: 'locked', title: 'Desafio' },
  { id: 6, icon: 'book', status: 'locked', title: 'Avançado' },
  { id: 7, icon: 'chest', status: 'locked', title: 'Recompensa' },
  { id: 8, icon: 'star', status: 'locked', title: 'Prova Final' },
];

export function TrilhaMap() {
  const { trilhaId } = useParams();
  const navigate = useNavigate();
  
  // 2. Estado para guardar as informações da trilha (Nome e Descrição)
  const [trilhaInfo, setTrilhaInfo] = useState<TrilhaInfo | null>(null);

  // useEffect para buscar o nome da trilha assim que a tela abrir
  useEffect(() => {
    const fetchTrilhaInfo = async () => {
      try {
        const response = await fetch('https://promptmaster-java.onrender.com/trilhas');
        if (response.ok) {
          const dados: TrilhaInfo[] = await response.json();
          
          const trilhaEncontrada = dados.find(t => t.id === Number(trilhaId));
          
          if (trilhaEncontrada) {
            setTrilhaInfo(trilhaEncontrada);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da trilha:", error);
      }
    };

    if (trilhaId) {
      fetchTrilhaInfo();
    }
  }, [trilhaId]);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'star': return '⭐';
      case 'book': return '📖';
      case 'pencil': return '✏️';
      case 'biceps': return '💪';
      case 'chest': return '🎁';
      default: return '★';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      
      {/* --- Cabeçalho Dinâmico --- */}
      <div className="bg-green-600 p-6 text-center text-white shadow-lg sticky top-[73px] z-40 transition-all">
        
        <button 
            onClick={() => navigate('/dashboard')}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-700 p-2 rounded-full hover:bg-green-800 transition-colors"
            title="Voltar para Trilhas"
        >
            ←
        </button>

        {/* Nome da trilha ou "Carregando..." enquanto busca */}
        <h1 className="text-2xl font-bold uppercase tracking-wider">
          {trilhaInfo ? trilhaInfo.nome : 'Carregando...'}
        </h1>
        
        {/* Descrição da trilha */}
        <p className="opacity-90 text-sm md:text-base mt-1 max-w-2xl mx-auto">
          {trilhaInfo ? trilhaInfo.descricao : 'Preparando seu ambiente de aprendizado...'}
        </p>
      </div>

      {/* --- Caminho das Lições (Visual Mock) --- */}
      <div className="max-w-md mx-auto mt-12 px-4 flex flex-col items-center gap-8 relative">
        
        {lessonsMock.map((lesson, index) => {
          const position = index % 4; 
          let marginClass = '';
          
          if (position === 1) marginClass = 'mr-32'; // Esquerda
          if (position === 3) marginClass = 'ml-32'; // Direita

          const isCompleted = lesson.status === 'completed';
          const isCurrent = lesson.status === 'current';
          const isLocked = lesson.status === 'locked';
          const isChest = lesson.icon === 'chest';

          let bgClass = 'bg-gray-700 shadow-[0_4px_0_#374151]'; 
          if (isCompleted) bgClass = 'bg-yellow-400 shadow-[0_6px_0_#b45309]'; 
          if (isCurrent) bgClass = 'bg-green-500 shadow-[0_6px_0_#15803d] animate-bounce-slow'; 
          if (isChest && !isLocked) bgClass = 'bg-purple-500 shadow-[0_6px_0_#6b21a8]';

          return (
            <div key={lesson.id} className={`relative z-10 ${marginClass}`}>
              
              {isCurrent && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-gray-900 font-bold px-3 py-1 rounded-lg shadow-lg whitespace-nowrap animate-bounce">
                  COMEÇAR
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                </div>
              )}

              <button
                disabled={isLocked}
                onClick={() => !isLocked && navigate(`/atividade/${trilhaId}`)} 
                className={`
                  w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white transition-transform active:translate-y-1 active:shadow-none
                  ${bgClass}
                  ${isLocked ? 'opacity-60 cursor-not-allowed text-gray-400' : 'hover:scale-105 cursor-pointer'}
                `}
              >
                {isCompleted ? '✓' : renderIcon(lesson.icon)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}