import { useEffect, useState } from 'react';
import {
  ACADEMIC_PROJECTS,
  EDUCATION,
  WORK_EXPERIENCES,
} from '../../data/experience';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSmoothScroll } from '../layout/SmoothScrollProvider';

export function ExperienceTimeline() {
  const { t, pick } = useLanguage();
  const { scrollTo } = useSmoothScroll();
  const [activeId, setActiveId] = useState<string>(WORK_EXPERIENCES[0].id);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const targets = document.querySelectorAll<HTMLElement>(
      '[data-experience-step]',
    );
    if (targets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const stepId = entry.target.getAttribute('data-experience-step');
            if (stepId) {
              setActiveId(stepId);
            }
          }
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0.05,
      },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navSteps = [
    ...WORK_EXPERIENCES.map((exp) => ({
      id: exp.id,
      label: exp.company,
      period: exp.period,
    })),
    {
      id: 'education-block',
      label: t.experience.educationHeading,
      period: '2017 – 2025',
    },
  ];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-border py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Column (Swiss editorial index) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono-metric mb-3 text-xs tracking-[0.14em] text-fg-muted uppercase">
              <span className="text-accent">{t.experience.index}</span> —{' '}
              {t.experience.eyebrow}
            </p>
            <h2 id="experience-heading" className="display-section text-fg">
              {t.experience.title}
            </h2>

            {/* Sticky step tracker */}
            <ol className="mt-10 hidden border-l border-border lg:block">
              {navSteps.map((step) => {
                const isActive = activeId === step.id;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(`#step-${step.id}`)}
                      className={`-ml-px flex w-full cursor-pointer items-baseline justify-between border-l-2 py-2.5 pl-4 text-left transition-colors ${
                        isActive
                          ? 'border-accent text-fg'
                          : 'border-transparent text-fg-muted hover:border-fg-muted hover:text-fg'
                      }`}
                    >
                      <span className="text-sm font-medium">{step.label}</span>
                      <span className="font-mono-metric text-[11px] text-fg-muted">
                        {step.period}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right Factual Content Column */}
          <div className="lg:col-span-8">
            {/* Professional Experience */}
            <div>
              <h3 className="font-mono-metric mb-6 text-xs tracking-[0.14em] text-fg-muted uppercase">
                {t.experience.workHeading}
              </h3>

              <div className="divide-y divide-border border-t border-b border-border">
                {WORK_EXPERIENCES.map((exp, idx) => (
                  <article
                    key={exp.id}
                    id={`step-${exp.id}`}
                    data-experience-step={exp.id}
                    className="py-8 first:pt-8 last:pb-8"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono-metric text-xs text-accent">
                          0{idx + 1}
                        </span>
                        <h4 className="font-display-editorial text-3xl text-fg md:text-[2.25rem]">
                          {exp.company}
                        </h4>
                      </div>
                      <span className="font-mono-metric text-xs text-fg-muted">
                        {exp.period}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="font-medium text-fg">
                        {pick(exp.role)}
                      </span>
                      <span className="text-fg-muted" aria-hidden="true">
                        ·
                      </span>
                      <span className="font-mono-metric text-xs text-fg-muted">
                        {pick(exp.location)}
                      </span>
                    </div>

                    {exp.context && (
                      <p className="font-mono-metric mt-2 text-xs text-accent-tech">
                        {pick(exp.context)}
                      </p>
                    )}

                    <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-fg-muted md:text-[15px]">
                      {exp.highlights.map((item) => (
                        <li key={item.fr} className="flex gap-3">
                          <span
                            className="mt-2.5 h-px w-3 shrink-0 bg-accent"
                            aria-hidden="true"
                          />
                          <span>{pick(item)}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {exp.stack.map((tech) => (
                        <li
                          key={tech}
                          className="font-mono-metric border border-border bg-surface px-2 py-0.5 text-[11px] text-fg-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            {/* Education */}
            <div
              id="step-education-block"
              data-experience-step="education-block"
              className="mt-16"
            >
              <h3 className="font-mono-metric mb-6 text-xs tracking-[0.14em] text-fg-muted uppercase">
                {t.experience.educationHeading}
              </h3>

              <div className="grid grid-cols-1 border-t border-l border-border sm:grid-cols-2">
                {EDUCATION.map((edu) => (
                  <article
                    key={edu.id}
                    className="flex flex-col justify-between border-r border-b border-border p-6"
                  >
                    <div>
                      <div className="font-mono-metric flex items-center justify-between gap-2 text-[11px] text-fg-muted">
                        <span>{edu.period}</span>
                        <span>{pick(edu.location)}</span>
                      </div>
                      <h4 className="font-display-editorial mt-3 text-2xl text-fg">
                        {edu.institution}
                      </h4>
                      <p className="mt-1.5 text-sm font-medium text-fg">
                        {pick(edu.degree)}
                      </p>
                      {edu.details && (
                        <p className="font-mono-metric mt-3 text-[11px] leading-relaxed text-fg-muted">
                          {pick(edu.details)}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Academic Projects (Umeå University) */}
            <div className="mt-16">
              <h3 className="font-mono-metric mb-6 text-xs tracking-[0.14em] text-fg-muted uppercase">
                {t.experience.academicProjectsHeading}
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {ACADEMIC_PROJECTS.map((proj) => (
                  <article
                    key={proj.id}
                    className="flex flex-col justify-between border border-border bg-surface p-6"
                  >
                    <div>
                      <div className="font-mono-metric flex items-center justify-between text-[11px] text-fg-muted">
                        <span>{proj.institution}</span>
                        <span>{proj.period}</span>
                      </div>
                      <h4 className="font-display-editorial mt-2 text-2xl text-fg">
                        {proj.title}
                      </h4>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-fg-muted">
                        {proj.highlights.map((h) => (
                          <li key={h.fr} className="flex gap-2.5">
                            <span
                              className="mt-2 h-px w-2.5 shrink-0 bg-accent"
                              aria-hidden="true"
                            />
                            <span>{pick(h)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                      {proj.stack.map((tech) => (
                        <li
                          key={tech}
                          className="font-mono-metric border border-border bg-bg px-2 py-0.5 text-[11px] text-fg-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
