import { FadeUp } from '../components/FadeUp';
import { HotBadge, Stars, Tag } from '../components/Tag';
import { MCP_SERVERS } from '../data/mcpServers';

export function McpPage() {
  return (
    <div className="relative z-10 bg-transparent px-6 pb-16 pt-36 font-body text-paper md:px-12 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <FadeUp as="h1" className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl uppercase">
          MCP servers
        </FadeUp>
        <FadeUp as="p" delay={0.05} className="mt-3 font-sans text-sm text-white/60 max-w-xl leading-relaxed">
          Connect your agents directly to Tickerlab and Solana data sources. MCP server configurations allow any AI client to talk to Tickerlab systems.
        </FadeUp>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {MCP_SERVERS.map((server, i) => (
            <FadeUp key={server.id} delay={0.05 * i}>
              <div className="h-full premium-card p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">{server.namespace}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/50">
                      HTTP
                    </span>
                    {server.hot && <HotBadge />}
                    <Stars count={server.stars} />
                  </div>
                </div>
                <p className="mt-3 font-sans text-lg font-bold text-white">{server.name}</p>
                <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/60">
                  {server.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {server.tools.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
