import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

interface Trilha {
  id: number;
  nome: string;
  descricao: string;
}

export function Dashboard() {
  const { user } = useAuth();
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [trilhasAtivas, setTrilhasAtivas] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [activatingId, setActivatingId] = useState<number | null>(null);

  const getVisualDaTrilha = (nome: string) => {
    const n = nome.toLowerCase();
    
    if (n.includes('programação') || n.includes('código')) {
      // 💻 - Computador / Teclado
      return '💻'; 
    }
    if (n.includes('imagens')) {
      // 🎨 - Paleta / Arte
      return '🎨'; 
    }
    if (n.includes('documentos')) {
      // 📝 - Memo / Escrita
      return '📝'; 
    }
    if (n.includes('pesquisa') || n.includes('curadoria')) {
      // 🔎 - Lupa / Pesquisa
      return '🔎'; 
    }
    
    return '✨'; // Fallback
  };

  const carregarDados = useCallback(async () => {
    try {
        setLoading(true);
        const resTrilhas = await fetch('https://promptmaster-java.onrender.com/trilhas');
        const dadosTrilhas = await resTrilhas.json();
        setTrilhas(dadosTrilhas.sort((a: Trilha, b: Trilha) => a.id - b.id));

        if (user) {
            const resAtivas = await fetch(`https://promptmaster-java.onrender.com/trilhas/ativas/${user.id}`);
            if (resAtivas.ok) {
                const idsAtivos = await resAtivas.json();
                setTrilhasAtivas(idsAtivos);
            }
        }
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    } finally {
        setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handleAtivar = async (e: React.MouseEvent, idTrilha: number) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!user) {
        alert("Você precisa estar logado para ativar uma trilha.");
        return;
    }

    setActivatingId(idTrilha);

    try {
        const response = await fetch(`https://promptmaster-java.onrender.com/trilhas/${user.id}/ativar/${idTrilha}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            setTrilhasAtivas([...trilhasAtivas, idTrilha]);
        } else {
            const erroMsg = await response.text();
            alert(`Atenção: ${erroMsg}`);
        }
    } catch (error) {
        console.error("Erro ao ativar trilha:", error);
        alert("Erro de conexão.");
    } finally {
        setActivatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-10 text-center text-white">
        <p className="text-xl animate-pulse">Carregando trilhas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10">
      <h1 className="text-4xl font-bold mb-2 text-white">Suas Missões</h1>
      <p className="text-gray-400 mb-8">Escolha uma categoria para começar a treinar</p>

      {trilhas.length === 0 ? (
        <div className="text-gray-500 text-center py-10 border border-gray-800 rounded-xl">
          Nenhuma trilha encontrada no sistema.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {trilhas.map((trilha) => {
            const isAtiva = trilhasAtivas.includes(trilha.id);
            const icon = getVisualDaTrilha(trilha.nome);

            return (
              <Link key={trilha.id} to={`/exercicios/${trilha.id}`}>
                <div className="bg-gray-800 rounded-xl p-6 transition-all duration-200 ease-out hover:bg-green-600 hover:shadow-xl hover:-translate-y-1 hover:z-10 relative cursor-pointer h-full flex flex-col">
                  
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-white">
                    <span className="text-2xl">{icon}</span>
                    {trilha.nome}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 flex-1">{trilha.descricao}</p>

                  <div className="mt-auto">
                    {isAtiva ? (
                        <>
                            <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                              
                                <div
                                    className="h-full bg-green-400 transition-all duration-500"
                                    style={{ width: '0%' }} 
                                ></div>
                            </div>
                            <div className="flex justify-between text-gray-300 text-sm">
                                <span>0/3 missões</span>
                                <span>0%</span>
                            </div>
                        </>
                    ) : (
                      <div className="flex justify-end pt-2">
                      <button 
                          onClick={(e) => handleAtivar(e, trilha.id)}
                          disabled={activatingId === trilha.id}
                          className={`
                              px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-md w-full sm:w-auto
                              ${activatingId === trilha.id 
                                  ? 'bg-gray-600 cursor-wait text-gray-300' 
                                  : 'bg-white text-green-700 hover:bg-green-700 hover:text-white'
                              }
                          `}
                      >
                          {activatingId === trilha.id ? 'Ativando...' : 'Ativar Trilha'}
                      </button>
                  </div>
                    )}
                  </div>

                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}