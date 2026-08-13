const SAMPLE_TICKERS = [
  '$DREAM · Dreaming Agents · vibe 8/10',
  '$LOOP · Recursion Rex · vibe 6/10',
  '$SOGGY · Wet Paper Ticket · vibe 9/10',
  '$PNCE · Pounce Daemon · vibe 10/10',
  '$GHOST · Overheard Ghost · vibe 5/10',
  '$NAP · Chronic Napper · vibe 10/10',
];

export function TickerTape() {
  const items = [...SAMPLE_TICKERS, ...SAMPLE_TICKERS];

  return (
    <div className="relative z-10 overflow-hidden border-y border-line bg-ink py-3">
      <div className="flex w-max animate-marquee gap-10 font-mono text-xs uppercase tracking-wide text-paper/60">
        {items.map((item, i) => (
          <span key={i} className="whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
