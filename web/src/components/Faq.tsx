import { useState } from 'react';
import { FadeUp } from './FadeUp';

const FAQS = [
  {
    q: 'What does Pounce Daemon actually generate?',
    a: 'A token concept from your idea: a ticker, a name, a short tagline, hype-style description copy, a one-line piece of lore, and a vibe score from 1–10, plus a link to pump.fun/create.',
  },
  {
    q: 'Does Pounce Daemon launch the token for me?',
    a: "No. Pounce Daemon only writes the concept and copy. Launching, funding, and everything on-chain happens on pump.fun, and that decision is entirely yours.",
  },
  {
    q: 'Can I use this from Claude Code?',
    a: 'Yes, the Skills and MCP sections list instruction files and server configs you can drop into a Claude Code project so your agent can generate concepts directly from the terminal.',
  },
  {
    q: 'Is this free?',
    a: 'The generator and directory are free to browse and use. You bring your own MegaLLM API key if you self-host the project.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative z-10 bg-ink px-6 py-20 md:px-12">
      <div className="mx-auto max-w-3xl">
        <FadeUp as="p" className="font-mono text-xs uppercase tracking-widest text-paper/40">
          Common questions
        </FadeUp>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={item.q} delay={i * 0.05}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-paper">{item.q}</span>
                    <span className="font-mono text-lg text-paper/40">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <p className="max-w-2xl pb-5 font-mono text-sm leading-relaxed text-paper/60">{item.a}</p>
                  )}
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
