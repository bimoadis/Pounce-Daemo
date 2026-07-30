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
  logoPrompt?: string;
  brandColors?: string[];
  marketingHook?: string;
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${token.tagline ? token.tagline + ' — ' : ''}${token.description}\n\n${token.lore}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

          <p className="mt-4 max-w-lg font-display text-sm italic leading-relaxed text-paper/60 whitespace-pre-wrap">
            {token.lore}
          </p>

          {/* Launch Branding Kit Section */}
          {(token.logoPrompt || token.brandColors || token.marketingHook) && (
            <div className="mt-8 border-t border-line/40 pt-8 max-w-lg">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-amber">
                Launch Branding Kit
              </h4>
              
              {/* Slogan */}
              {token.marketingHook && (
                <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-paper/40">Viral Tweet/Hook</span>
                      <p className="mt-1 text-sm font-medium text-paper">{token.marketingHook}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(token.marketingHook || '');
                        alert('Copied slogan!');
                      }}
                      className="text-paper/40 hover:text-paper transition p-1"
                      title="Copy Slogan"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Brand Colors */}
              {token.brandColors && token.brandColors.length > 0 && (
                <div className="mt-4 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase text-paper/40">Brand Colors:</span>
                  <div className="flex items-center gap-2">
                    {token.brandColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs">
                        <span
                          className="h-2.5 w-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-mono text-[10px] text-paper/70 uppercase">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Logo Prompt */}
              {token.logoPrompt && (
                <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[10px] uppercase text-paper/40">Midjourney / DALL-E Logo Prompt</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(token.logoPrompt || '');
                        alert('Copied Logo Prompt!');
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-amber hover:underline transition"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy Prompt
                    </button>
                  </div>
                  <p className="text-xs font-mono leading-relaxed text-paper/70 bg-black/40 rounded-lg p-3 border border-white/5 select-all">
                    {token.logoPrompt}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a
              href={token.pumpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink transition hover:bg-amber"
            >
              Launch on pump.fun →
            </a>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-white transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? 'Copied!' : 'Copy Desc'}
            </button>
          </div>
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
