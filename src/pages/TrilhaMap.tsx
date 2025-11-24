import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/useAuth';

interface TrilhaInfo {
  id: number;
  nome: string;
  descricao: string;
}

interface Licao {
  id: number;
  numeroLicao: number;
  titulo: string;
  status: 'locked' | 'current' | 'completed';
}

export function TrilhaMap() {
  const { trilhaId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [trilhaInfo, setTrilhaInfo] = useState<TrilhaInfo | null>(null);
  const [licoes, setLicoes] = useState<Licao[]>([]);
  const [loading, setLoading] = useState(true);

  const getIconeLicao = (index: number) => {
    const icones = ['book', 'star', 'pencil', 'biceps', 'chest'];
    return icones[index % icones.length];
  };

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

  const carregarDados = useCallback(async () => {
    if (!trilhaId || !user) return;

    try {
      setLoading(true);

      const resTrilhas = await fetch('https://promptmaster-java.onrender.com/trilhas');
      if (resTrilhas.ok) {
        const dados: TrilhaInfo[] = await resTrilhas.json();
        const encontrada = dados.find(t => t.id === Number(trilhaId));
        if (encontrada) setTrilhaInfo(encontrada);
      }

      const resLicoes = await fetch(`https://promptmaster-java.onrender.com/trilhas/${trilhaId}/licoes/${user.id}`);
      
      if (resLicoes.ok) {
        const dadosLicoes: Licao[] = await resLicoes.json();
        
        const totalDesejado = 8; 
        const licoesCompletas = [...dadosLicoes];

        if (dadosLicoes.length < totalDesejado) {
            for (let i = dadosLicoes.length; i < totalDesejado; i++) {
                licoesCompletas.push({
                    id: -i, // ID negativo para não conflitar
                    numeroLicao: i + 1,
                    titulo: "Em breve...",
                    status: "locked" 
                });
            }
        }
        
        setLicoes(licoesCompletas);
      } else {
        console.error("Erro ao buscar lições:", await resLicoes.text());
      }

    } catch (error) {
      console.error("Erro de conexão:", error);
    } finally {
      setLoading(false);
    }
  }, [trilhaId, user]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p className="animate-pulse text-xl">Carregando seu mapa de aprendizado...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      
      <div className="bg-green-600 p-6 text-center text-white shadow-lg sticky top-[73px] z-40 transition-all">
        <button 
            onClick={() => navigate('/dashboard')}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-700 p-2 rounded-full hover:bg-green-800 transition-colors"
            title="Voltar para Trilhas"
        >
            ←
        </button>

        <h1 className="text-2xl font-bold uppercase tracking-wider">
          {trilhaInfo ? trilhaInfo.nome : 'Trilha'}
        </h1>
        <p className="opacity-90 text-sm md:text-base mt-1 max-w-2xl mx-auto">
          {trilhaInfo ? trilhaInfo.descricao : ''}
        </p>
      </div>

      <div className="max-w-md mx-auto mt-12 px-4 flex flex-col items-center gap-8 relative">
        
        {licoes.length === 0 ? (
          <div className="text-gray-500 mt-10">Nenhuma lição encontrada nesta trilha.</div>
        ) : (
          licoes.map((licao, index) => {
            const position = index % 4; 
            let marginClass = '';
            if (position === 1) marginClass = 'mr-32'; 
            if (position === 3) marginClass = 'ml-32'; 

            const isCompleted = licao.status === 'completed';
            const isCurrent = licao.status === 'current';
            const isLocked = licao.status === 'locked';
            
            const iconType = getIconeLicao(index); 
            const isChest = iconType === 'chest';

            let bgClass = 'bg-gray-700 shadow-[0_4px_0_#374151]'; 
            if (isCompleted) bgClass = 'bg-yellow-400 shadow-[0_6px_0_#b45309]'; 
            if (isCurrent) bgClass = 'bg-green-500 shadow-[0_6px_0_#15803d] animate-bounce-slow'; 
            if (isChest && !isLocked && !isCompleted) bgClass = 'bg-purple-500 shadow-[0_6px_0_#6b21a8]';

            return (
              <div key={licao.id} className={`relative z-10 ${marginClass}`}>
                
                {isCurrent && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-gray-900 font-bold px-3 py-1 rounded-lg shadow-lg whitespace-nowrap animate-bounce z-20">
                    COMEÇAR
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                )}

                <button
                  disabled={isLocked}
                  onClick={() => !isLocked && navigate(`/atividade/${licao.id}`)}
                  className={`
                    w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white transition-transform active:translate-y-1 active:shadow-none relative
                    ${bgClass}
                    ${isLocked ? 'opacity-60 cursor-not-allowed text-gray-400' : 'hover:scale-105 cursor-pointer'}
                  `}
                  title={licao.titulo}
                >
                  {isCompleted ? '✓' : renderIcon(iconType)}

                  {!isCompleted && !isLocked && (
                    <span className="absolute -bottom-6 text-xs text-gray-400 font-bold w-32 text-center">
                      {licao.titulo}
                    </span>
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}