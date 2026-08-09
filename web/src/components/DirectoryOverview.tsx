import { FadeUp } from './FadeUp';
import { Route } from '../hooks/useHashRoute';

const ITEMS: { n: string; title: string; body: string; route: Route }[] = [
  {
    n: '01',
    title: 'Generator',
    body: 'The core tool. Type an idea, get a full token concept: ticker, name, tagline, lore, vibe score, and a launch URL.',
    route: 'home',
  },
  {
    n: '02',
    title: 'Tools',
    body: 'Standalone utilities for token builders: description audits, launch threads, image prompts, reply strategy.',
    route: 'tools',
  },
  {
    n: '03',
    title: 'Skills',
    body: 'Reusable instruction files for Claude Code. Drop one into your project and your agent generates tokens automatically.',
    route: 'skills',
  },
  {
    n: '04',
    title: 'Bundles & MCP',
    body: 'Full workflows in one install, plus MCP server configs so any AI client can talk to Pounce Daemon directly.',
    route: 'bundles',
  },
];

export function DirectoryOverview({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <section className="relative z-10 bg-ink px-6 py-20 md:px-12">
      <div className="mx-auto max-w-3xl">
        <FadeUp as="p" className="font-mono text-xs uppercase tracking-widest text-paper/40">
          What's in Pounce Daemon
        </FadeUp>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {ITEMS.map((item, i) => (
            <FadeUp key={item.n} delay={i * 0.05}>
              <button
                onClick={() => onNavigate(item.route)}
                className="flex w-full gap-6 py-6 text-left transition hover:bg-white/[0.02]"
              >
                <span className="font-mono text-xs text-paper/30">{item.n}</span>
                <span className="max-w-[7rem] shrink-0 font-display text-base font-semibold text-paper md:max-w-none md:w-40">
                  {item.title}
                </span>
                <span className="font-mono text-sm leading-relaxed text-paper/60">{item.body}</span>
              </button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
