import { Hero } from '../components/Hero';
import { TickerTape } from '../components/TickerTape';
import { TokenGenerator } from '../components/TokenGenerator';
import { Route } from '../hooks/useHashRoute';

export function HomePage({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <>
      <Hero />
      <TickerTape />
      <TokenGenerator />
    </>
  );
}
