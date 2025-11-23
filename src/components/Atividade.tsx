import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ResultadoModal } from "../components/ResultadoModal";

interface AtividadeProps {
  title: string;
  description: string;
  desafio: string;
}

const XP_ATIVIDADE = 25;

const atividades: Record<string, AtividadeProps> = {
  "programacao-1": {
    title: "Clareza e Objetividade",
    description: "Aprenda a criar prompts claros e diretos.",
    desafio: "Crie um prompt para uma IA gerar um resumo executivo."
  },
  "programacao-2": {
    title: "Contexto é Rei",
    description: "Como dar contexto adequado.",
    desafio: "Crie um prompt que contextualize um dado antes da resposta."
  },

  "imagens-1": {
    title: "Organização de Dados",
    description: "Estruture informações de forma eficiente.",
    desafio: "Organize dados em formato de tabela."
  },
  "imagens-2": {
    title: "Formatação",
    description: "Prompts com formatação markdown.",
    desafio: "Crie um prompt que exija markdown."
  },

  "documentos-1": {
    title: "Condicionais",
    description: "Use condições dentro de prompts.",
    desafio: "Use 'se', 'então' e 'caso contrário'."
  },

  "curadoria-1": {
    title: "Prompt Mastery",
    description: "Refinamento e curadoria.",
    desafio: "Crie um prompt que avalie credibilidade de fontes."
  },
};

export function Atividade() {
  const { missaoId } = useParams<{ missaoId: string }>();
  const navigate = useNavigate();

  const atividade = missaoId ? atividades[missaoId] : undefined;

  const [prompt, setPrompt] = useState("");
  const [lives, setLives] = useState(5);

  const [modalOpen, setModalOpen] = useState(false);
  const [notaFinal, setNotaFinal] = useState<number | null>(null);

  
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem("userXP");
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("userXP", xp.toString());
  }, [xp]);

  if (!atividade) return <p className="p-5">Atividade não encontrada.</p>;

  function avaliarPrompt(): number {
    return Math.floor(Math.random() * 101);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nota = avaliarPrompt();
    setNotaFinal(nota);

    // Se foi aprovado → ganha XP
    if (nota > 60) {
      setXp((prev) => prev + XP_ATIVIDADE);
    } else {
      setLives((prev) => Math.max(0, prev - 1));
    }

    setModalOpen(true);
  };

  // Volta a jogar a mesma atividade
  const handleRetry = () => {
    setPrompt("");
    setModalOpen(false);
  };

  // Vai para próxima atividade automaticamente
  const handleNext = () => {
    const ids = Object.keys(atividades);
    const currentIndex = ids.indexOf(missaoId!);

    if (currentIndex < ids.length - 1) {
      navigate(`/atividade/${ids[currentIndex + 1]}`);
      window.location.reload();
    }

    setModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
      >
        ← Voltar
      </button>

      {/* VIDAS */}
      <div className="flex gap-6 mb-6 text-lg items-center">
        <div>
          <p className="font-semibold">Vidas:</p>
          <div className="flex gap-1 text-2xl">
            {Array.from({ length: lives }).map((_, index) => (
              <span key={index}>❤️</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">{atividade.title}</h2>
        <p className="text-gray-300 mb-4">{atividade.description}</p>

        <div className="bg-gray-700 p-4 rounded-md mb-6">
          <strong>Desafio:</strong>
          <p>{atividade.desafio}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            placeholder="Digite seu prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="p-3 rounded-md bg-gray-900 border border-gray-600"
            rows={5}
            disabled={lives === 0}
          />

          <button
            type="submit"
            disabled={lives === 0}
            className={`px-4 py-2 rounded-md ${lives === 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {lives === 0 ? "Sem vidas" : "Enviar Prompt"}
          </button>
        </form>
      </div>

      <ResultadoModal
        open={modalOpen}
        nota={notaFinal}
        xp={25}
        passou={notaFinal !== null && notaFinal > 60}
        onRetry={handleRetry}
        onNext={notaFinal !== null && notaFinal > 60 ? handleNext : undefined}
        onClose={() => setModalOpen(false)}
      />

    </div>
  );
}
