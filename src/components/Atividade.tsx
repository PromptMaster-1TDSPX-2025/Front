import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ResultadoModal } from "../components/ResultadoModal";
import { useAuth } from '../contexts/useAuth';

interface LicaoCompleta {
  id: number;
  titulo: string;
  conteudoTeorico: string;
  instrucaoExercicio: string;
}

const XP_ATIVIDADE = 25;

export function Atividade() {
  const { missaoId } = useParams<{ missaoId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [licao, setLicao] = useState<LicaoCompleta | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [step, setStep] = useState(1); // 1: Teoria, 2: Instrução, 3: Prompt
  const [prompt, setPrompt] = useState("");
  const [lives, setLives] = useState(5); 

  const [modalOpen, setModalOpen] = useState(false);
  const [resultado, setResultado] = useState<{ nota: number; feedback: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLicao = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://promptmaster-java.onrender.com/licoes/${missaoId}`);
        
        if (response.ok) {
          const data = await response.json();
          setLicao(data);
        } else {
          alert("Erro ao carregar lição.");
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    if (missaoId) {
      fetchLicao();
    }
  }, [missaoId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !licao) return;

    setIsSubmitting(true);

    const payload = {
        usuario: { id: user.id },
        licoes: { id: licao.id },
        promptUsuario: prompt
    };

    try {
        const response = await fetch('https://promptmaster-java.onrender.com/prompt/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const feedbackTexto = await response.text();
            let nota = 0;
            let texto = feedbackTexto;

            if (feedbackTexto.includes("NOTA:")) {
                const partes = feedbackTexto.split("|FEEDBACK:");
                nota = parseInt(partes[0].replace("NOTA:", "").trim());
                texto = partes[1] || feedbackTexto;
            }

            setResultado({ nota, feedback: texto });
            setModalOpen(true);

            if (nota < 60) {
                setLives((prev) => Math.max(0, prev - 1));
            }
        } else {
            const erro = await response.text();
            alert("Erro ao enviar: " + erro);
        }
    } catch (error) {
        console.error("Erro na submissão:", error);
        alert("Erro de conexão.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setPrompt("");
    setModalOpen(false);
    setResultado(null);
    setStep(3); 
  };

  const handleNextLicao = () => {
    const nextId = Number(missaoId) + 1;
    navigate(`/atividade/${nextId}`);
    window.location.reload();
  };

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Carregando...</div>;
  if (!licao) return <p className="text-white p-10">Lição não encontrada.</p>;

  // Lógica de renderização de cada passo
  const renderStepContent = () => {
    switch (step) {
      case 1: // TEORIA
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-400">
              📚 Conteúdo Teórico
            </h2>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg leading-loose text-lg text-gray-300 whitespace-pre-wrap">
              {licao.conteudoTeorico}
            </div>
            <div className="flex justify-end mt-8">
              <button 
                onClick={() => setStep(2)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Entendi, Avançar →
              </button>
            </div>
          </div>
        );

      case 2: // INSTRUÇÃO
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-400">
              ⚡ Instruções do Desafio
            </h2>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
              <p className="text-xl text-white leading-relaxed font-medium">
                {licao.instrucaoExercicio}
              </p>
            </div>
            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white font-semibold py-3 px-4 transition-colors"
              >
                ← Rever Teoria
              </button>
              <button 
                onClick={() => setStep(3)}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                Ir para o Prompt →
              </button>
            </div>
          </div>
        );

      case 3: // PROMPT (INPUT)
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-400">
              💻 Sua Vez
            </h2>
            
            {/* Mini lembrete da instrução para não precisar voltar */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mb-6 text-sm text-gray-400">
              <strong>Desafio:</strong> {licao.instrucaoExercicio}
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <textarea
                  placeholder="Escreva seu prompt aqui..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-48 p-4 rounded-lg bg-gray-900 border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none resize-none text-gray-200 font-mono text-lg mb-6"
                  disabled={lives === 0 || isSubmitting}
                />
                
                <div className="flex justify-between items-center">
                   <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-gray-400 hover:text-white font-semibold text-sm"
                  >
                    ← Rever Instruções
                  </button>

                  <button
                    type="submit"
                    disabled={lives === 0 || isSubmitting || prompt.trim().length === 0}
                    className={`
                      px-8 py-3 rounded-lg font-bold text-lg transition-all shadow-lg
                      ${lives === 0 
                        ? "bg-gray-600 cursor-not-allowed text-gray-400" 
                        : "bg-green-600 hover:bg-green-700 text-white hover:scale-105"
                      }
                      ${isSubmitting ? "opacity-70 cursor-wait" : ""}
                    `}
                  >
                    {isSubmitting ? "Avaliando..." : (lives === 0 ? "Sem vidas" : "Enviar Resposta 🚀")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white min-h-screen flex flex-col">
      
      {/* Topo: Voltar e Vidas */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors text-sm"
        >
          ← Sair
        </button>
        
        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
          <span className="text-red-500 text-xl">❤️</span>
          <span className="font-bold text-lg">{lives}</span>
        </div>
      </div>

      {/* Barra de Progresso dos Passos */}
      <div className="mb-8">
        <h1 className="text-center text-xl font-bold mb-4 text-gray-200">{licao.titulo}</h1>
        <div className="flex items-center justify-between relative max-w-xs mx-auto">
            {/* Linha de fundo */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -z-10 rounded-full"></div>
            
            {/* Passo 1 */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>1</div>
            
            {/* Passo 2 */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-400'}`}>2</div>
            
            {/* Passo 3 */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}>3</div>
        </div>
        <div className="flex justify-between max-w-xs mx-auto mt-2 text-xs text-gray-400 px-1">
            <span>Teoria</span>
            <span>Desafio</span>
            <span>Ação</span>
        </div>
      </div>

      {/* Conteúdo Principal (Muda conforme o step) */}
      <div className="flex-1">
        {renderStepContent()}
      </div>

      <ResultadoModal
        open={modalOpen}
        nota={resultado?.nota || 0}
        feedback={resultado?.feedback}
        xp={XP_ATIVIDADE}
        passou={resultado ? resultado.nota >= 60 : false}
        onRetry={handleRetry}
        onNext={resultado && resultado.nota >= 60 ? handleNextLicao : undefined}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}