import { useMemo, useState } from 'react';
import { FadeUp } from '../components/FadeUp';
import { HotBadge, Stars, Tag } from '../components/Tag';
import { SKILLS } from '../data/skills';

const CATEGORIES = ['all', 'tokens', 'dev', 'social', 'image', 'lore'] as const;

export function SkillsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('all');
  const [officialOnly, setOfficialOnly] = useState(false);

  const results = useMemo(() => {
    return SKILLS.filter((s) => {
      if (category !== 'all' && s.category !== category) return false;
      if (officialOnly && !s.official) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = `${s.name} ${s.description} ${s.tags.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, officialOnly]);

  return (
    <div className="relative z-10 bg-transparent px-6 pb-16 pt-36 font-body text-paper md:px-12 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <FadeUp as="h1" className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl uppercase">
          Skills for token builders
        </FadeUp>
        <FadeUp as="p" delay={0.05} className="mt-3 font-sans text-sm text-white/60 max-w-xl leading-relaxed">
          Reusable instruction files for Claude Code. Drop one into your project and your agent generates tokens automatically. Find skills to teach your agent new capabilities.
        </FadeUp>


        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {results.map((skill, i) => (
            <FadeUp key={skill.id} delay={0.03 * i}>
              <div className="h-full premium-card p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">{skill.namespace}</span>
                  <div className="flex items-center gap-2">
                    {skill.hot && <HotBadge />}
                    <Stars count={skill.stars} />
                  </div>
                </div>
                <p className="mt-3 font-sans text-base font-bold text-white">{skill.name}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">{skill.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {skill.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}

          {results.length === 0 && (
            <p className="col-span-full py-16 text-center font-mono text-sm text-white/40">
              No skills match that search yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
