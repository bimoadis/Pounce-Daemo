import { FormEvent, useState } from 'react';

type Token = {
  ticker: string;
  name: string;
  tagline: string;
  vibeScore: number;
  pumpUrl: string;
};

const BOOT_LINES = ['tickerlab v1.0.0 initialized', 'engine: megallm connected OK', '----------------------------'];

export function TerminalDemo({ title = 'forge_generate · live demo' }: { title?: string }) {
  const [idea, setIdea] = useState('AI agents that trade while you sleep');
  const [lines, setLines] = useState<string[]>(['awaiting token idea...']);
  const [loading, setLoading] = useState(false);

  async function run(e: FormEvent) {
    e.preventDefault();
    if (!idea.trim() || loading) return;
    setLoading(true);
    setLines(['> ' + idea, 'contacting megallm...']);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      const data: Token & { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error || 'generation failed');

      setLines([
        '> ' + idea,
        `ticker      ${data.ticker}`,
        `name        ${data.name}`,
        `tagline     ${data.tagline}`,
        `vibe score  ${data.vibeScore}/10`,
        `launch      ${data.pumpUrl}`,
      ]);
    } catch (err: any) {
      setLines(['> ' + idea, `error: ${err.message || 'something went wrong'}`]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[#14181f]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-xs text-paper/50">{title}</span>
        <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
          Live
        </span>
      </div>

      <form onSubmit={run} className="flex items-center gap-3 border-b border-line px-4 py-3">
        <label htmlFor="terminal-idea" className="font-mono text-xs text-paper/40">
          idea →
        </label>
        <input
          id="terminal-idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="flex-1 bg-transparent font-mono text-sm text-paper outline-none placeholder:text-paper/30"
          placeholder="type any token idea"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-amber px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-ink transition hover:bg-paper disabled:opacity-40"
        >
          {loading ? '…' : 'run →'}
        </button>
      </form>

      <div className="px-4 py-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 font-mono text-[11px] text-paper/40">terminal — tickerlab</span>
        </div>
        <div className="min-h-[110px] rounded-lg bg-black/20 p-4 font-mono text-[13px] leading-relaxed text-paper/70">
          {BOOT_LINES.map((l) => (
            <div key={l}>{l}</div>
          ))}
          {lines.map((l, i) => (
            <div key={i} className={l.startsWith('error') ? 'text-coral' : ''}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
