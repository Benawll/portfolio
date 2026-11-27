import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, ZoomIn } from 'lucide-react';
import { PROJECTS, type Project } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';
import { applyEditorialTheme, prefersReducedMotion } from '../../lib/theme';
import { MediaLightbox } from '../ui/MediaFrame';

gsap.registerPlugin(ScrollTrigger);

function ProjectPanelContent({
  project,
  index,
  total,
  onOpenMedia,
}: {
  project: Project;
  index: number;
  total: number;
  onOpenMedia: (project: Project) => void;
}) {
  const { t, lang, pick } = useLanguage();
  const primaryMedia = project.media[0];

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
      {/* Editorial project meta & benchmarks */}
      <div className="flex flex-col justify-between lg:col-span-5">
        <div>
          <div className="font-mono-metric flex items-center gap-3 text-xs tracking-[0.14em] text-fg-muted uppercase">
            <span className="text-accent">
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(total).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <p className="font-mono-metric mt-2 text-[11px] tracking-[0.12em] text-fg-muted uppercase">
            {pick(project.category)}
          </p>

          <h3 className="font-display-editorial mt-3 text-4xl text-fg sm:text-5xl lg:text-[3.5rem]">
            {project.name}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-fg-muted md:text-base">
            {pick(project.tagline)}
          </p>

          {/* Measured highlight metrics */}
          <dl className="mt-6 grid grid-cols-3 divide-x divide-border border-y border-border py-4">
            {project.highlightMetrics.map((metric) => (
              <div
                key={metric.value}
                className="flex flex-col gap-1 px-3 first:pl-0 last:pr-0"
              >
                <dt className="font-mono-metric text-[10px] tracking-[0.1em] text-fg-muted uppercase">
                  {pick(metric.label)}
                </dt>
                <dd className="font-mono-metric text-sm font-medium text-fg sm:text-base">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Compact stack tags */}
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((tech) => (
              <li
                key={tech}
                className="font-mono-metric border border-border px-2 py-0.5 text-[11px] text-fg-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            to={`/projects/${project.slug}`}
            className="font-mono-metric inline-flex items-center gap-2 border border-fg bg-fg px-5 py-2.5 text-xs tracking-[0.12em] text-bg uppercase transition-colors hover:border-accent hover:bg-accent"
          >
            <span>{t.projects.viewCaseStudy}</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-metric inline-flex items-center gap-1.5 border border-border px-4 py-2.5 text-xs tracking-[0.12em] text-fg-muted uppercase transition-colors hover:border-fg hover:text-fg"
          >
            <span>{t.projects.viewGithub}</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* Real capture frame with subtle internal parallax & lightbox trigger */}
      <figure className="lg:col-span-7">
        <button
          type="button"
          onClick={() => onOpenMedia(project)}
          aria-label={
            lang === 'fr'
              ? `Agrandir la capture : ${pick(primaryMedia.caption)}`
              : `Enlarge capture: ${pick(primaryMedia.caption)}`
          }
          className="group/media relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden border border-border bg-surface text-left transition-colors hover:border-accent"
        >
          <img
            data-parallax-img
            src={primaryMedia.src}
            alt={pick(primaryMedia.alt)}
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            className="h-full w-full scale-[1.06] object-cover object-top will-change-transform"
          />
          <span
            aria-hidden="true"
            className="font-mono-metric absolute top-3 right-3 inline-flex items-center gap-1.5 border border-border bg-bg/92 px-2.5 py-1 text-[10px] tracking-[0.12em] text-fg uppercase opacity-0 transition-opacity duration-200 group-hover/media:opacity-100 group-focus-visible/media:opacity-100"
          >
            <ZoomIn className="h-3 w-3" strokeWidth={1.5} />
            <span>{lang === 'fr' ? 'Agrandir' : 'Zoom'}</span>
          </span>
        </button>
        <figcaption className="font-mono-metric mt-3 flex items-center justify-between gap-4 text-[11px] text-fg-muted">
          <span>{pick(primaryMedia.caption)}</span>
          <span className="hidden shrink-0 uppercase sm:inline">
            {project.index} / 04
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export function HorizontalProjects() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() =>
    prefersReducedMotion(),
  );

  const openProjectMedia = (project: Project) => {
    setLightboxProject(project);
    setLightboxIndex(0);
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pinEl = pinRef.current;
    const trackEl = trackRef.current;
    if (!section) {
      return;
    }

    const mm = gsap.matchMedia();

    // 1. Chromatic switch Light -> Organic Charcoal Dark across all viewports
    const themeTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 45%',
      onEnter: () => applyEditorialTheme('dark'),
      onEnterBack: () => applyEditorialTheme('dark'),
      onLeave: () => applyEditorialTheme('light'),
      onLeaveBack: () => applyEditorialTheme('light'),
    });

    // 2. Pinned horizontal scroll on desktop >= 1024px when motion is allowed
    if (pinEl && trackEl && !reducedMotion) {
      mm.add('(min-width: 1024px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>(
          trackEl.querySelectorAll('[data-project-panel]'),
        );
        const totalPanels = panels.length;
        if (totalPanels <= 1) {
          return;
        }

        const horizontalTween = gsap.to(trackEl, {
          xPercent: -100 * (totalPanels - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: pinEl,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            end: () => `+=${window.innerWidth * (totalPanels - 1) * 0.95}`,
            onUpdate: (self) => {
              const nextIdx = Math.min(
                totalPanels - 1,
                Math.round(self.progress * (totalPanels - 1)),
              );
              setActiveIndex(nextIdx);
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${Math.max(
                  0.04,
                  self.progress,
                )})`;
              }
            },
          },
        });

        // Subtle internal parallax on real screenshots
        const images = gsap.utils.toArray<HTMLElement>(
          trackEl.querySelectorAll('[data-parallax-img]'),
        );
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -3.5 },
            {
              xPercent: 3.5,
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                containerAnimation: horizontalTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        });
      });
    }

    return () => {
      themeTrigger.kill();
      mm.revert();
    };
  }, [reducedMotion]);

  const totalStr = String(PROJECTS.length).padStart(2, '0');
  const activeStr = String(activeIndex + 1).padStart(2, '0');
  const lightboxItems =
    lightboxProject?.media.filter((item) => item.type === 'image') ?? [];

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        aria-labelledby="projects-heading"
        className="relative border-t border-border"
      >
      {/* Desktop pinned horizontal experience (>= 1024px, motion enabled) */}
      {!reducedMotion && (
        <div
          ref={pinRef}
          className="hidden lg:flex lg:h-screen lg:flex-col lg:justify-between lg:overflow-hidden lg:pt-20 lg:pb-8"
        >
          {/* Top editorial bar inside pinned stage */}
          <div className="mx-auto flex w-full max-w-7xl items-end justify-between border-b border-border px-10 pb-5">
            <div>
              <p className="font-mono-metric text-xs tracking-[0.14em] text-fg-muted uppercase">
                <span className="text-accent">{t.projects.index}</span> —{' '}
                {t.projects.eyebrow}
              </p>
              <h2
                id="projects-heading"
                className="font-display-editorial mt-1 text-4xl text-fg"
              >
                {t.projects.title}
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-mono-metric text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                {t.projects.scrollHint} →
              </span>
              <span
                aria-live="polite"
                className="font-mono-metric border border-border px-3 py-1 text-xs tracking-[0.14em] text-fg"
              >
                {activeStr} / {totalStr}
              </span>
            </div>
          </div>

          {/* Horizontal track */}
          <div className="my-auto overflow-hidden">
            <div ref={trackRef} className="flex will-change-transform">
              {PROJECTS.map((project, idx) => (
                <article
                  key={project.id}
                  data-project-panel
                  className="w-screen shrink-0 py-4"
                >
                  <ProjectPanelContent
                    project={project}
                    index={idx}
                    total={PROJECTS.length}
                    onOpenMedia={openProjectMedia}
                  />
                </article>
              ))}
            </div>
          </div>

          {/* Bottom 1px horizontal progress track */}
          <div className="mx-auto w-full max-w-7xl px-10">
            <div className="relative h-px w-full bg-border">
              <div
                ref={progressBarRef}
                style={{ transform: 'scaleX(0.04)' }}
                className="absolute inset-0 origin-left bg-accent will-change-transform"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile & Tablet (< 1024px) + prefers-reduced-motion clean vertical fallback */}
      <div className={reducedMotion ? 'py-20' : 'py-20 lg:hidden'}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 border-b border-border pb-6">
            <p className="font-mono-metric text-xs tracking-[0.14em] text-fg-muted uppercase">
              <span className="text-accent">{t.projects.index}</span> —{' '}
              {t.projects.eyebrow}
            </p>
            <h2
              id={reducedMotion ? 'projects-heading' : undefined}
              className="display-section mt-2 text-fg"
            >
              {t.projects.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {t.projects.subtitle}
            </p>
          </div>
        </div>

        <div className="divide-y divide-border">
          {PROJECTS.map((project, idx) => (
            <article key={project.id} className="py-12 first:pt-0 last:pb-0">
              <ProjectPanelContent
                project={project}
                index={idx}
                total={PROJECTS.length}
                onOpenMedia={openProjectMedia}
              />
            </article>
          ))}
        </div>
      </div>
    </section>

      <MediaLightbox
        items={lightboxItems}
        activeIndex={lightboxProject ? lightboxIndex : null}
        onClose={() => setLightboxProject(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
