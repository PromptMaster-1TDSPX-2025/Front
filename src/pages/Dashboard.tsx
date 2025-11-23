import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Interface que espelha o objeto Java 
interface Trilha {
  id: number;
  nome: string;
  descricao: string;
}

export function Dashboard() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [loading, setLoading] = useState(true);

  const getIconePorId = (id: number) => {
    const icones = ['🎯', '📏', '🚀', '👑', '🤖', '🧠'];
    return icones[(id - 1) % icones.length] || '✨';
  };

  useEffect(() => {
    fetch('https://promptmaster-java.onrender.com/trilhas') 
      .then((response) => {
        if (!response.ok) throw new Error('Erro na requisição');
        return response.json();
      })
      .then((data) => {
        setTrilhas(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar trilhas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-10 text-center text-white">
        <p className="text-xl animate-pulse">Carregando trilhas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10">
      <h1 className="text-4xl font-bold mb-2 text-white">Trilhas de Aprendizado</h1>
      <p className="text-gray-400 mb-8">Escolha uma trilha para começar a treinar</p>

      {trilhas.length === 0 ? (
        <div className="text-gray-500 text-center py-10 border border-gray-800 rounded-xl">
          Nenhuma trilha encontrada no sistema.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {trilhas.map((trilha) => (
            <Link key={trilha.id} to={`/exercicios/${trilha.id}`}>
              <div className="bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all hover:border-gray-600 border border-transparent h-full flex flex-col">
                
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-white">
                  <span className="text-2xl">{getIconePorId(trilha.id)}</span>
                  {trilha.nome}
                </h3>
                
                <p className="text-gray-400 mb-6 flex-1">{trilha.descricao}</p>

                <div className="mt-auto">
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: '0%' }} 
                    ></div>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>0 atividades concluídas</span>
                    <span>0%</span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}