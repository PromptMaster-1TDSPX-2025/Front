import type { Feature } from '../types/features'; 
const featuresList: Feature[] = [
  {
    icon: '⚡', 
    title: 'Aprendizado Prático',
    description: 'Exercícios mão na massa com feedback instantâneo da IA.',
  },
  {
    icon: '🎮',
    title: 'Sistema Gamificado',
    description: 'Ganhe XP, suba de nível e compita no ranking.',
  },
  {
    icon: '🎯',
    title: 'Avaliação Inteligente',
    description: 'Notas e dicas pessoais únicas para cada prompt.',
  },
  {
    icon: '📈',
    title: 'Progressão Clara',
    description: 'Trilha de aprendizado estruturada e progressiva.',
  },
  {
    icon: '🤝',
    title: 'Comunidade Ativa',
    description: 'Aprenda junto com outros colaboradores.',
  },
  {
    icon: '📚',
    title: 'Conteúdo Atualizado',
    description: 'Baseado nas melhores práticas atuais.',
  },
];

function FeatureCard({ icon, title, description }: Feature) {
  return (
    <div className="bg-gray-800 p-13 pr-5 rounded-lg flex flex-col gap-4">
      <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-2xl">
        <span>{icon}</span> 
      </div>
      <h3 className="text-xl font-semibold text-white mt-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section className="px-8 py-20 text-white">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Por que escolher o PromptMaster?</h2>
          <p className="text-lg text-gray-400 mt-4">
            Uma plataforma completa para desenvolver suas habilidades em IA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {featuresList.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>
      </div>
    </section>
  );
}