import { Hero } from '../components/hero';
import { Features } from '../components/features';
import { Stats } from '../components/stats';
export function Home() {
  return (
    <div>
      <Hero />
      <Features /> 
      <Stats />
    </div>
  );
}