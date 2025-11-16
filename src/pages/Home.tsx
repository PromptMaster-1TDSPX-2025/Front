// src/components/Home.tsx
import React from 'react';

// Tipagem para os dados do recurso
interface Feature {
  icon: string;
  title: string;
  description: string;
}

// Dados dos recursos
const features: Feature[] = [
  { icon: '⚡', title: 'Aprendizado Prático', description: 'Exercícios reais com feedback instantâneo da IA' },
  { icon: '🏆', title: 'Sistema Gamificado', description: 'Ganhe XP, suba de nível e conquiste badges' },
  { icon: '🎯', title: 'Avaliação Inteligente', description: 'Notas e dicas personalizadas para cada prompt' },
  { icon: '🚀', title: 'Progressão Clara', description: 'Trilha de aprendizado estruturada e progressiva' },
  { icon: '👥', title: 'Comunidade Ativa', description: 'Aprenda junto com outros colaboradores' },
  { icon: '📚', title: 'Conteúdo Atualizado', description: 'Exercícios baseados nas melhores práticas atuais' },
];

// Tipagem para os dados das estatísticas
interface Stat {
  count: string;
  label: string;
}

// Dados das estatísticas
const stats: Stat[] = [
  { count: '6+', label: 'Categorias de Missões' },
  { count: '30+', label: 'Exercícios Práticos' },
  { count: '100%', label: 'Feedback Personalizado' },
];

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">

      {/* Hero Card */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-8 md:p-12 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Domine a Arte da <br />
          <span className="text-yellow-400">Engenharia de Prompt</span>
        </h1>
        <p className="text-lg text-gray-100 max-w-lg mb-8">
          Aprenda a criar prompts eficazes através de uma experiência gamificada e divertida. Receba feedback inteligente da IA e evolua suas habilidades!
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-3 rounded-md text-base font-bold bg-white text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer">
            Começar Agora
          </button>
          <button className="px-6 py-3 rounded-md text-base font-bold bg-transparent text-white border border-white hover:bg-white hover:text-gray-800 transition-all">
            Saiba Mais
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-2 text-white">Por que escolher o PromptMaster?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Uma plataforma completa para desenvolver suas habilidades em IA
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left mt-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-gray-800 p-6 rounded-xl">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-1 text-white">{feature.title}</h4>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Card */}
      <section className="bg-gradient-to-r from-purple-700 to-red-500 rounded-xl p-8 md:p-10 mb-12 flex flex-col sm:flex-row justify-around items-center gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center text-white">
            <h3 className="text-5xl font-bold mb-1">{stat.count}</h3>
            <p className="text-lg font-semibold">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gray-800 p-10 rounded-xl mb-10">
        <h2 className="text-3xl font-semibold mb-2 text-white">Pronto para começar?</h2>
        <p className="text-xl text-gray-300 mb-5">
          Junte-se a outros colaboradores e transforme suas habilidades em engenharia de prompt
        </p>
        <button className="px-8 py-3 rounded-md text-lg font-bold bg-teal-500 text-white hover:bg-teal-600 transition-colors">
          Iniciar Treinamento ⚡
        </button>
      </section>

    </div>
  );
}
