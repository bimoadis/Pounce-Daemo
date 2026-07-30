import { FadeUp } from './FadeUp';
import { Route } from '../hooks/useHashRoute';

export function ClosingCta({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <section className="relative z-10 border-t border-line bg-ink px-6 py-20 text-center md:px-12">
      <FadeUp as="h3" className="font-display text-2xl font-semibold text-paper md:text-3xl">
        Give your idea a shot at pump.fun.
      </FadeUp>
      <FadeUp as="p" delay={0.1} className="mx-auto mt-3 max-w-md font-mono text-sm text-paper/50">
        No hallucinated tickers. One clear concept, ready to launch.
      </FadeUp>
      <FadeUp delay={0.2} className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="rounded-full bg-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition hover:bg-paper"
        >
          Generate a token
        </button>
        <button
          onClick={() => onNavigate('skills')}
          className="rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper/70 transition hover:border-amber hover:text-amber"
        >
          Browse skills
        </button>
      </FadeUp>
    </section>
  );
}
