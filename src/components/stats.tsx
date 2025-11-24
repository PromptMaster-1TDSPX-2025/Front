import type { StatItem } from '../types/stat';
const statsList: StatItem[] = [
  {
    value: '6+',
    label: 'Categorias de Missões',
  },
  {
    value: '30+',
    label: 'Exercícios Práticos',
  },
  {
    value: '100%',
    label: 'Feedback Personalizado',
  },
];

export function Stats() {
  return (
    <section className="px-8 py-12">
      <div className="rounded-2xl bg-linear-to-r from-purple-600 via-pink-500 to-red-500 p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
          
          {statsList.map((stat) => (
            <div key={stat.label}>
              <h2 className="text-5xl font-bold">
                {stat.value}
              </h2>
              <p className="text-lg text-gray-200 mt-2">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}