import { FadeUp } from '../components/FadeUp';
import { TerminalDemo } from '../components/TerminalDemo';
import { TOOLS } from '../data/tools';

export function ToolsPage() {
  return (
    <div className="relative z-10 bg-transparent px-6 pb-16 pt-36 font-body text-paper md:px-12 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <FadeUp as="h1" className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl uppercase">
          Tools
        </FadeUp>
        <FadeUp as="p" delay={0.05} className="mt-3 font-sans text-sm text-white/60 max-w-xl leading-relaxed">
          Standalone utilities for token builders: description audits, launch threads, image prompts, and reply strategies. No setup required.
        </FadeUp>

        <FadeUp delay={0.1} className="mt-12">
          <TerminalDemo />
        </FadeUp>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <FadeUp key={tool.id} delay={0.05 * i}>
              <div className="h-full premium-card p-5">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm font-bold text-white">{tool.title}</span>
                  {tool.status === 'live' ? (
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                      Live
                    </span>
                  ) : (
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/40">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-3 font-sans text-xs leading-relaxed text-white/60">{tool.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
