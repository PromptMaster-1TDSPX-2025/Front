import { QuestaoFaq } from '../components/questao-faq';
import type { ItemFaq } from '../types/faq';

const faqData: ItemFaq[] = [
  {
    question: "O que é Engenharia de Prompt?",
    answer: "Engenharia de Prompt é a arte e ciência de criar comandos (prompts) eficazes para guiar modelos de Inteligência Artificial (como o ChatGPT) a gerarem os melhores resultados possíveis."
  },
  {
    question: "Preciso saber programar para usar o PromptMaster?",
    answer: "Não! O PromptMaster foi desenhado para todos, desde iniciantes completos até desenvolvedores experientes. Nossa trilha começa do básico e avança gradualmente."
  },
  {
    question: "O curso é gratuito?",
    answer: "Sim! Toda a nossa plataforma é gratuita, focada no seu desenvolmimento na criação de prompts."
  },
  {
    question: "Como funciona o sistema de XP e Níveis?",
    answer: "Cada missão completada te dá pontos de experiência (XP). Acumulando XP, você sobe de nível, desbloqueia novas categorias de desafios e ganha badges exclusivos para seu perfil."
  },
  {
    question: "Posso usar os prompts que eu criar em meus projetos?",
    answer: "Com certeza! Tudo o que você desenvolve e aprende aqui é seu. Inclusive, incentivamos que você crie um portfólio com seus melhores prompts."
  },
];

export function Faq() {
  return (
    <div className="px-8 py-16 min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Perguntas Frequentes</h1>
          <p className="text-gray-400 text-lg">
            Tire suas dúvidas sobre a plataforma e comece a aprender sem barreiras.
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700">
          {faqData.map((item, index) => (
            <QuestaoFaq 
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Ainda tem dúvidas? <a href="#" className="text-green-400 hover:underline font-semibold">Fale com nosso suporte</a>.
          </p>
        </div>

      </div>
    </div>
  );
}