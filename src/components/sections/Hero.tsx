import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CANDIDATE_PROFILE } from '../../data/skills';
import { useSmoothScroll } from '../layout/SmoothScrollProvider';

export function Hero() {
  const { t } = useLanguage();
  const { scrollTo } = useSmoothScroll();

  const proofs = [
    {
      label: t.hero.proofs.reposLabel,
      value: t.hero.proofs.reposValue,
      highlight: false,
    },
    {
      label: t.hero.proofs.experienceLabel,
      value: t.hero.proofs.experienceValue,
      highlight: false,
    },
    {
      label: t.hero.proofs.toeicLabel,
      value: t.hero.proofs.toeicValue,
      highlight: false,
    },
    {
      label: t.hero.proofs.availabilityLabel,
      value: t.hero.proofs.availabilityValue,
      highlight: true,
    },
  ];

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between pt-28 pb-12 lg:pt-32 lg:pb-14"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 lg:px-10">
        {/* Top editorial eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <p className="font-mono-metric inline-flex items-center gap-2.5 text-[11px] tracking-[0.14em] text-fg-muted uppercase">
            <span
              className="inline-block h-2 w-2 rounded-full bg-accent-tech"
              aria-hidden="true"
            />
            <span>{t.hero.eyebrow}</span>
          </p>
          <span className="font-mono-metric hidden text-[11px] tracking-[0.14em] text-fg-muted uppercase md:inline">
            01 / 06 — POLYTECH NANTES · UMEÅ UNIVERSITY
          </span>
        </div>

        {/* Centerpiece monumental headline — LCP-safe (opacity always 1 on first paint) */}
        <div className="my-auto py-12 lg:py-16">
          <h1 className="display-hero max-w-5xl text-fg">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '18%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {t.hero.titleLine1}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '22%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.72,
                  delay: 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block italic text-accent"
              >
                {t.hero.titleLine2}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: '26%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.78,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {t.hero.titleLine3}
              </motion.span>
            </span>
          </h1>

          {/* Subtitle + Dual CTA */}
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg lg:col-span-7">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#projects');
                }}
                className="font-mono-metric inline-flex items-center gap-2 border border-fg bg-fg px-5 py-3 text-xs tracking-[0.12em] text-bg uppercase transition-colors hover:border-accent hover:bg-accent"
              >
                <span>{t.hero.ctaProjects}</span>
                <ArrowDownRight className="h-4 w-4" strokeWidth={1.5} />
              </a>

              <a
                href={CANDIDATE_PROFILE.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-metric inline-flex items-center gap-2 border border-border bg-transparent px-5 py-3 text-xs tracking-[0.12em] text-fg uppercase transition-colors hover:border-fg hover:bg-surface"
              >
                <span>{t.hero.ctaCv}</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom real proofs bar (Swiss hairline grid) */}
        <dl className="grid grid-cols-2 gap-y-6 border-t border-border pt-6 lg:grid-cols-4 lg:gap-x-8">
          {proofs.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 pr-4 lg:border-r lg:border-border lg:last:border-r-0"
            >
              <dt className="font-mono-metric text-[11px] tracking-[0.12em] text-fg-muted uppercase">
                {item.label}
              </dt>
              <dd
                className={`font-mono-metric text-xl font-medium tracking-tight md:text-2xl ${
                  item.highlight ? 'text-accent-tech' : 'text-fg'
                }`}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
