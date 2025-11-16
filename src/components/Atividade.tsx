import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface AtividadeProps {
  title: string;
  description: string;
  desafio: string;
}

const atividades: Record<string, AtividadeProps> = {
  'fundamentos-1': {
    title: 'Clareza e Objetividade',
    description: 'Aprenda a criar prompts claros e diretos.',
    desafio: 'Crie um prompt para uma IA gerar um resumo executivo de um artigo.',
  },
  'fundamentos-2': {
    title: 'Contexto é Rei',
    description: 'Domine a arte de fornecer contexto adequado para melhorar as respostas da IA.',
    desafio: 'Crie um prompt que instrua a IA a contextualizar dados de forma precisa.',
  },
  'estruturacao-1': {
    title: 'Organização de Dados',
    description: 'Aprenda a estruturar informações para prompts mais eficientes.',
    desafio: 'Organize dados em uma tabela que a IA possa interpretar facilmente.',
  },
  'estruturacao-2': {
    title: 'Formatação de Respostas',
    description: 'Saídas bem formatadas.',
    desafio: 'Crie um prompt que gere respostas formatadas em Markdown.',
  },
  'tecnicas-1': {
    title: 'Comandos Condicionais',
    description: 'Use condições nos prompts.',
    desafio: 'Crie prompts que alterem a saída da IA dependendo de condições específicas.',
  },
  'expert-1': {
    title: 'Prompt Mastery',
    description: 'Desafios avançados para mestres.',
    desafio: 'Crie um prompt complexo que combine várias técnicas avançadas.',
  },
};

export function Atividade() {
  const { missaoId } = useParams<{ missaoId: string }>();
  const navigate = useNavigate();
  const atividade = missaoId ? atividades[missaoId] : undefined;
  const [prompt, setPrompt] = useState('');

  if (!atividade) return <p className="p-5">Atividade não encontrada.</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Prompt enviado para avaliação!');
    setPrompt('');
  };

  return (
    <div className="max-w-3xl mx-auto p-5 md:p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
      >
        ← Voltar
      </button>

      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-2">{atividade.title}</h2>
        <p className="text-gray-300 mb-4">{atividade.description}</p>

        <div className="bg-gray-700 p-4 rounded-md mb-6">
          <strong className="block mb-1">Desafio:</strong>
          <p className="text-gray-200">{atividade.desafio}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="prompt-input" className="font-semibold">
            Seu Prompt:
          </label>
          <textarea
            id="prompt-input"
            placeholder="Digite seu prompt aqui..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-acento"
            rows={5}
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 bg-acento text-white rounded-md font-bold hover:bg-[#16a085] transition-colors"
          >
            Enviar Prompt
          </button>
        </form>
      </div>
    </div>
  );
}
