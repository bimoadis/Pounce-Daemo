import { FormEvent, useState } from 'react';
import { FadeUp } from './FadeUp';

type Token = {
  ticker: string;
  name: string;
  tagline: string;
  description: string;
  lore: string;
  vibeScore: number;
  pumpUrl: string;
  generatedFrom: string;
};

export function TokenGenerator() {
  const [idea, setIdea] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const [token, setToken] = useState<Token | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!idea.trim() || status === 'loading') return;

    setStatus('loading');
    setError('');
    setToken(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed.');
      setToken(data);
      setStatus('idle');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Try again.');
      setStatus('error');
    }
  }

  return (
    <section id="generate" className="relative z-10 bg-ink px-6 py-24 font-body text-paper md:px-12">
      <div className="mx-auto max-w-3xl">
        <FadeUp as="h3" className="font-display text-3xl font-semibold md:text-4xl">
          Give us the idea. We'll draft the ticket.
        </FadeUp>
        <FadeUp
          as="p"
          delay={0.1}
          className="mt-3 max-w-xl font-mono text-sm leading-relaxed text-paper/60"
        >
          One sentence is enough — a mood, a meme, a headline. Tickerlab turns it into a full
          token concept: ticker, name, tagline, description, and a one-line piece of lore.
        </FadeUp>

        <FadeUp delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label htmlFor="idea" className="font-mono text-xs uppercase tracking-widest text-paper/50">
              Idea
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. an AI agent that only pretends to be busy"
              rows={3}
              className="w-full resize-none rounded-lg border border-line bg-transparent px-4 py-3 font-body text-base text-paper placeholder:text-paper/30"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !idea.trim()}
              className="w-fit rounded-full bg-amber px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === 'loading' ? 'Forging…' : 'Generate token'}
            </button>
          </form>
        </FadeUp>

        {error && (
          <p className="mt-6 rounded-lg border border-coral/40 bg-coral/10 px-4 py-3 font-mono text-sm text-coral">
            {error}
          </p>
        )}

        {token && <TicketCard token={token} />}
      </div>
    </section>
  );
}

function TicketCard({ token }: { token: Token }) {
  return (
    <FadeUp className="relative mt-12 overflow-hidden rounded-2xl border border-line bg-[#151922]">
      {/* perforated ticket-stub edge */}
      <div
        className="absolute left-0 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        aria-hidden
      />
      <div
        className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 translate-x-1/2 rounded-full bg-ink"
        aria-hidden
      />

      <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:p-10">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl font-medium text-amber">{token.ticker}</span>
            <span className="font-display text-2xl font-semibold">{token.name}</span>
          </div>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-paper/50">
            {token.tagline}
          </p>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-paper/80">
            {token.description}
          </p>

          <p className="mt-4 max-w-lg font-display text-sm italic leading-relaxed text-paper/60">
            {token.lore}
          </p>

          <a
            href={token.pumpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink transition hover:bg-amber"
          >
            Launch on pump.fun →
          </a>
        </div>

        <VibeGauge score={token.vibeScore} />
      </div>
    </FadeUp>
  );
}

function VibeGauge({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  return (
    <div className="flex flex-row items-center gap-4 border-t border-line pt-6 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
      <span className="font-mono text-xs uppercase tracking-widest text-paper/50">Vibe score</span>
      <div className="flex items-end gap-3">
        <span className="font-display text-4xl font-semibold text-amber">{score}</span>
        <span className="pb-1 font-mono text-sm text-paper/40">/ 10</span>
      </div>
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-line md:w-24">
        <div
          className="h-full rounded-full bg-amber transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
