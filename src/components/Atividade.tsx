import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface AtividadeProps {
  title: string;
  description: string;
  desafio: string;
}

const atividades: Record<string, AtividadeProps> = {
  'programacao-1': {
    title: 'Clareza e Objetividade',
    description: 'Aprenda a criar prompts claros e diretos.',
    desafio: 'Crie um prompt para uma IA gerar um resumo executivo de um artigo.'
  },
  'programacao-2': {
    title: 'Contexto é Rei',
    description: 'Como dar contexto adequado para IA.',
    desafio: 'Crie um prompt que contextualize um dado antes da resposta.'
  },

  'imagens-1': {
    title: 'Organização de Dados',
    description: 'Aprenda a estruturar informações de forma eficiente.',
    desafio: 'Organize dados em formato de tabela.'
  },
  'imagens-2': {
    title: 'Formatação de Respostas',
    description: 'Crie prompts que geram respostas bem formatadas.',
    desafio: 'Crie um prompt que exige formatação markdown.'
  },

  'documentos-1': {
    title: 'Comandos Condicionais',
    description: 'Use condições dentro dos prompts.',
    desafio: 'Crie um prompt usando "se", "então" e "caso contrário".'
  },

  'curadoria-1': {
    title: 'Prompt Mastery',
    description: 'Capacidade de curadoria e refinamento.',
    desafio: 'Crie um prompt que avalie credibilidade de fontes.'
  }
};


export function Atividade() {
  const { missaoId } = useParams<{ missaoId: string }>();
  const navigate = useNavigate();

  const atividade = missaoId ? atividades[missaoId] : undefined;

  const [prompt, setPrompt] = useState("");
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState<number | null>(null);

  if (!atividade) return <p className="p-5">Atividade não encontrada.</p>;

  function avaliarPrompt(): number {
    return Math.floor(Math.random() * 101);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nota = avaliarPrompt();
    setScore(nota);

    if (nota <= 60) {
      setLives(prev => Math.max(0, prev - 1));
      alert(`Sua nota foi ${nota}. Você perdeu 1 vida.`);
    } else {
      alert(`Sua nota foi ${nota}. Bom trabalho!`);
    }

    setPrompt("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
      >
        ← Voltar
      </button>

      {/* VIDAS + NOTA */}
      <div className="flex gap-6 mb-6 text-lg items-center">
        <div className="flex items-center gap-2">
          <div className="mb-4">
            <p className="font-semibold">Vidas:</p>
            <div className="flex gap-1 text-2xl">
              {Array.from({ length: lives }).map((_, index) => (
                <span key={index}>❤️</span>
              ))}
            </div>
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
    </div>
  );
}
