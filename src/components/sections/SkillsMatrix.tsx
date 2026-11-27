import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  SKILL_CATEGORIES,
  SKILLS,
  type SkillCategoryId,
} from '../../data/skills';
import { useLanguage } from '../../i18n/LanguageContext';

type FilterId = 'all' | SkillCategoryId;

export function SkillsMatrix() {
  const { t, pick } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const categoryLabelMap = useMemo(() => {
    const map = new Map<SkillCategoryId, string>();
    for (const cat of SKILL_CATEGORIES) {
      map.set(cat.id, pick(cat.label));
    }
    return map;
  }, [pick]);

  const filteredSkills = useMemo(() => {
    if (activeFilter === 'all') {
      return SKILLS;
    }
    return SKILLS.filter((skill) => skill.category === activeFilter);
  }, [activeFilter]);

  const filters: { id: FilterId; label: string; count: number }[] = [
    { id: 'all', label: t.skills.allFilter, count: SKILLS.length },
    ...SKILL_CATEGORIES.map((cat) => ({
      id: cat.id,
      label: pick(cat.label),
      count: SKILLS.filter((s) => s.category === cat.id).length,
    })),
  ];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-border py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono-metric mb-3 text-xs tracking-[0.14em] text-fg-muted uppercase">
              <span className="text-accent">{t.skills.index}</span> —{' '}
              {t.skills.eyebrow}
            </p>
            <h2 id="skills-heading" className="display-section text-fg">
              {t.skills.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-fg-muted lg:col-span-5">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Filter bar */}
        <div
          role="tablist"
          aria-label={t.skills.title}
          className="mb-10 flex flex-wrap gap-2 border-b border-border pb-5"
        >
          {filters.map((filter) => {
            const isSelected = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(filter.id)}
                className={`font-mono-metric relative cursor-pointer border px-4 py-2 text-xs tracking-[0.1em] uppercase transition-colors ${
                  isSelected
                    ? 'border-fg text-bg'
                    : 'border-border text-fg-muted hover:border-fg hover:text-fg'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="skills-filter-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 bg-fg"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <span>{filter.label}</span>
                  <span className="opacity-70">
                    {String(filter.count).padStart(2, '0')}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Evidence-based matrix (zero fake percentage bars) */}
        <motion.div
          layout
          className="grid grid-cols-1 border-t border-l border-border md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.article
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex flex-col justify-between border-r border-b border-border bg-bg p-6 transition-colors hover:bg-surface"
              >
                <div>
                  <span className="font-mono-metric text-[10px] tracking-[0.14em] text-accent uppercase">
                    {categoryLabelMap.get(skill.category)}
                  </span>
                  <h3 className="mt-2 text-base font-medium leading-snug text-fg">
                    {skill.name}
                  </h3>
                </div>

                <div className="mt-5 border-t border-border pt-3">
                  <span className="font-mono-metric block text-[10px] tracking-[0.12em] text-fg-muted uppercase">
                    {t.skills.proofLabel}
                  </span>
                  <ul className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1">
                    {skill.proofs.map((proof, index) => (
                      <li
                        key={proof}
                        className="font-mono-metric inline-flex items-center gap-2 text-xs text-accent-tech"
                      >
                        <span>{proof}</span>
                        {index < skill.proofs.length - 1 && (
                          <span className="text-border" aria-hidden="true">
                            /
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
