export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-paper/50">
      {children}
    </span>
  );
}

export function HotBadge() {
  return (
    <span className="rounded bg-coral px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink">
      Hot
    </span>
  );
}

export function Stars({ count }: { count: number }) {
  const label = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
  return <span className="font-mono text-xs text-paper/40">★ {label}</span>;
}
