import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';
import { prefersReducedMotion } from '../../lib/theme';

gsap.registerPlugin(ScrollTrigger);

const RIBBON_ITEMS = [
  'AWS Lambda · S3 · Athena',
  'PySpark · Pandera · dbt Core',
  'Redpanda / Kafka',
  'LangGraph · Hybrid RAG',
  'PostgreSQL · pgvector',
  'Java Quarkus · Angular',
  'React 19 · TypeScript',
  'FastAPI · MLflow · Evidently AI',
  'Terraform · Kubernetes',
];

export function Pillars() {
  const { t } = useLanguage();
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ribbonRef.current;
    if (!el || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: 0 },
        {
          xPercent: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      );
    }, ribbonRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pillars"
      aria-labelledby="pillars-heading"
      className="border-t border-border py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono-metric mb-3 text-xs tracking-[0.14em] text-fg-muted uppercase">
              <span className="text-accent">{t.pillars.index}</span> —{' '}
              {t.pillars.eyebrow}
            </p>
            <h2 id="pillars-heading" className="display-section text-fg">
              {t.pillars.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-fg-muted lg:col-span-5">
            {t.pillars.subtitle}
          </p>
        </div>

        {/* Swiss 3-column grid with 1px hairlines */}
        <div className="grid grid-cols-1 divide-y divide-border border-y border-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {t.pillars.items.map((pillar, idx) => (
            <motion.article
              key={pillar.index}
              data-reveal
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-between py-8 lg:px-8 lg:py-10 lg:first:pl-0 lg:last:pr-0"
            >
              <div>
                <span className="font-display-editorial block text-5xl text-fg-muted/45">
                  {pillar.index}
                </span>
                <h3 className="font-display-editorial mt-5 text-3xl text-fg lg:text-[2.15rem]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted md:text-[15px]">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 border-t border-border pt-4">
                <span className="font-mono-metric text-[11px] tracking-[0.1em] text-accent-tech uppercase">
                  {pillar.proof}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Subtle scroll-velocity typographic ribbon (no aggressive loop) */}
      <div
        aria-hidden="true"
        className="mt-16 overflow-hidden border-y border-border py-3.5"
      >
        <div
          ref={ribbonRef}
          className="font-mono-metric flex w-max items-center gap-8 whitespace-nowrap text-xs tracking-[0.14em] text-fg-muted uppercase"
        >
          {[...RIBBON_ITEMS, ...RIBBON_ITEMS].map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center gap-8">
              <span>{item}</span>
              <span className="h-1 w-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
