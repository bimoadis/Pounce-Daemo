import { useState } from 'react';
import { FadeUp } from '../components/FadeUp';

const FAQS = [
  {
    q: 'What does Tickerlab actually generate?',
    a: 'A token concept from your idea: a ticker, a name, a short tagline, hype-style description copy, a one-line piece of lore, and a vibe score from 1–10 — plus a link to pump.fun/create.',
  },
  {
    q: 'Does Tickerlab launch the token for me?',
    a: "No. Tickerlab only writes the concept and copy. Launching, funding, and everything on-chain happens on pump.fun, and that decision is entirely yours.",
  },
  {
    q: 'Can I use this from Claude Code?',
    a: 'Yes — the Skills and MCP sections list instruction files and server configs you can drop into a Claude Code project so your agent can generate concepts directly from the terminal.',
  },
  {
    q: 'Is this free?',
    a: 'The generator and directory are free to browse and use. You bring your own MegaLLM API key if you self-host the project.',
  },
];

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="relative z-10 bg-transparent px-6 pb-16 pt-36 font-body text-paper md:px-12 md:pt-36">
      <div className="mx-auto max-w-3xl">
        <FadeUp as="h1" className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl uppercase">
          Common Questions
        </FadeUp>
        <FadeUp as="p" delay={0.05} className="mt-3 font-mono text-xs uppercase tracking-widest text-white/50">
          Find answers to frequently asked questions about Tickerlab.
        </FadeUp>

        <div className="mt-12 space-y-4">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={item.q} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/40">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 text-left"
                  >
                    <span className="font-sans text-base font-bold text-white">{item.q}</span>
                    <span className="font-mono text-lg text-white/40">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <p className="mt-4 font-sans text-sm leading-relaxed text-white/70 border-t border-white/5 pt-4">
                      {item.a}
                    </p>
                  )}
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </div>
  );
}
