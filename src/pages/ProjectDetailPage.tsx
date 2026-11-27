import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  PROJECTS,
  getNextProject,
  getProjectBySlug,
} from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import { applyEditorialTheme } from '../lib/theme';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ArchitectureDiagram } from '../components/ui/ArchitectureDiagram';
import { MediaFrame, MediaLightbox } from '../components/ui/MediaFrame';
import { NotFoundPage } from './NotFoundPage';

gsap.registerPlugin(ScrollTrigger);

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="font-mono-metric border border-border bg-surface px-1.5 py-0.5 text-[0.86em] text-fg"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={idx}>{part}</Fragment>;
  });
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang, pick } = useLanguage();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [failedSources, setFailedSources] = useState<Set<string>>(
    () => new Set(),
  );

  const project = slug ? getProjectBySlug(slug) : undefined;
  const nextProject = project ? getNextProject(project.slug) : undefined;

  useEffect(() => {
    applyEditorialTheme('light', true);
    setLightboxSrc(null);
    setFailedSources(new Set());

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [slug]);

  useEffect(() => {
    if (!project) {
      return;
    }
    document.title = `${project.name} — ${t.meta.title}`;
    return () => {
      document.title = t.meta.title;
    };
  }, [project, t.meta.title]);

  const validLightboxItems = useMemo(() => {
    if (!project) return [];
    return project.media.filter(
      (item) => item.type === 'image' && !failedSources.has(item.src),
    );
  }, [project, failedSources]);

  const activeLightboxIndex = useMemo(() => {
    if (!lightboxSrc) return null;
    const idx = validLightboxItems.findIndex(
      (item) => item.src === lightboxSrc,
    );
    return idx === -1 ? null : idx;
  }, [lightboxSrc, validLightboxItems]);

  if (!project || !nextProject) {
    return <NotFoundPage />;
  }

  const totalProjectsStr = String(PROJECTS.length).padStart(2, '0');

  const handleMediaError = (src: string) => {
    setFailedSources((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Navbar />

      <main id="main-content" className="pt-16">
        {/* 1. Editorial Case Study Header */}
        <motion.header
          key={project.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="border-b border-border"
        >
          <div className="mx-auto max-w-7xl px-6 pt-12 pb-14 lg:px-10 lg:pt-16 lg:pb-16">
            {/* Top meta row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
              <Link
                to="/#projects"
                className="font-mono-metric inline-flex items-center gap-2 text-xs tracking-[0.14em] text-fg-muted uppercase transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>{t.projects.backToProjects}</span>
              </Link>

              <div className="font-mono-metric flex items-center gap-3 text-xs tracking-[0.14em] text-fg-muted uppercase">
                <span className="text-accent">
                  {project.index} / {totalProjectsStr}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </div>
            </div>

            {/* Title & role */}
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="font-mono-metric text-xs tracking-[0.14em] text-accent uppercase">
                  {pick(project.category)}
                </p>
                <h1 className="display-hero mt-4 text-fg">{project.name}</h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-fg-muted sm:text-lg">
                  {pick(project.summary)}
                </p>
              </div>

              <div className="flex flex-col gap-5 border-t border-border pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <div>
                  <p className="font-mono-metric text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                    {lang === 'fr' ? 'Rôle' : 'Role'}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-fg">
                    {pick(project.role)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-metric inline-flex items-center gap-2 border border-fg bg-fg px-5 py-2.5 text-xs tracking-[0.12em] text-bg uppercase transition-colors hover:border-accent hover:bg-accent"
                  >
                    <span>
                      {lang === 'fr' ? 'Voir sur GitHub' : 'View on GitHub'}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>

                  <Link
                    to="/#projects"
                    className="font-mono-metric inline-flex items-center gap-1.5 border border-border px-4 py-2.5 text-xs tracking-[0.12em] text-fg-muted uppercase transition-colors hover:border-fg hover:text-fg"
                  >
                    <span>{t.projects.backToProjects}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Technical stack tags */}
            <div className="mt-10 border-t border-border pt-6">
              <p className="font-mono-metric mb-3 text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                {t.projects.sections.stack}
              </p>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono-metric border border-border bg-surface/60 px-2.5 py-1 text-[11px] text-fg"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.header>

        {/* 2. Measured Benchmarks Band (4-column Swiss grid) */}
        <section
          aria-labelledby="metrics-heading"
          className="border-b border-border bg-surface/40"
        >
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <h2
                id="metrics-heading"
                className="font-mono-metric text-xs tracking-[0.14em] text-fg-muted uppercase"
              >
                <span className="text-accent">01</span> —{' '}
                {t.projects.sections.metrics}
              </h2>
              <span className="font-mono-metric text-[11px] text-accent-tech">
                {lang === 'fr'
                  ? '100 % benchmarks réels & reproductibles'
                  : '100% real & reproducible benchmarks'}
              </span>
            </div>

            <dl className="grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
              {project.allMetrics.map((metric) => (
                <div
                  key={metric.label.fr + metric.value}
                  className="flex flex-col justify-between border-r border-b border-border bg-bg p-5 sm:p-6"
                >
                  <dt className="font-mono-metric text-[11px] tracking-[0.1em] text-fg-muted uppercase">
                    {pick(metric.label)}
                  </dt>
                  <dd className="mt-3">
                    <span className="font-mono-metric block text-2xl font-medium tracking-tight text-fg">
                      {metric.value}
                    </span>
                    {metric.detail && (
                      <span className="mt-2 block text-xs leading-relaxed text-fg-muted">
                        {pick(metric.detail)}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 3. Real Captures Gallery with Lightbox */}
        <section
          aria-labelledby="gallery-heading"
          className="border-b border-border"
        >
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <h2
                id="gallery-heading"
                className="font-mono-metric text-xs tracking-[0.14em] text-fg-muted uppercase"
              >
                <span className="text-accent">02</span> —{' '}
                {t.projects.sections.gallery}
              </h2>
              <span className="font-mono-metric text-[11px] text-fg-muted">
                {lang === 'fr'
                  ? 'Cliquer sur une capture pour agrandir'
                  : 'Click any capture to enlarge'}
              </span>
            </div>

            <div
              className={
                project.media.length === 1
                  ? 'grid grid-cols-1 gap-8'
                  : 'grid grid-cols-1 gap-8 md:grid-cols-2'
              }
            >
              {project.media.map((item, idx) => (
                <div
                  key={item.src}
                  className={
                    project.media.length === 3 && idx === 0
                      ? 'md:col-span-2'
                      : undefined
                  }
                >
                  <MediaFrame
                    media={item}
                    index={idx}
                    total={project.media.length}
                    onOpen={() => setLightboxSrc(item.src)}
                    onMediaError={() => handleMediaError(item.src)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Bilingual Narrative Sections: Problem -> Architecture -> Engineering Decisions */}
        <div className="divide-y divide-border border-b border-border">
          {/* Problem & Context */}
          <section
            aria-labelledby="problem-heading"
            className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20"
          >
            <div className="lg:col-span-4">
              <p className="font-mono-metric text-xs tracking-[0.14em] text-fg-muted uppercase">
                <span className="text-accent">03</span> —{' '}
                {t.projects.sections.problem}
              </p>
              <h2
                id="problem-heading"
                className="display-section mt-3 text-fg"
              >
                {t.projects.sections.problem}
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p className="text-base leading-relaxed text-fg sm:text-lg sm:leading-relaxed">
                {renderInlineCode(pick(project.problem))}
              </p>
            </div>
          </section>

          {/* Architecture & SVG Diagram */}
          <section
            aria-labelledby="architecture-heading"
            className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="font-mono-metric text-xs tracking-[0.14em] text-fg-muted uppercase">
                  <span className="text-accent">04</span> —{' '}
                  {t.projects.sections.architecture}
                </p>
                <h2
                  id="architecture-heading"
                  className="display-section mt-3 text-fg"
                >
                  {t.projects.sections.architecture}
                </h2>
              </div>

              <div className="lg:col-span-8">
                <p className="text-base leading-relaxed text-fg-muted sm:text-lg sm:leading-relaxed">
                  {renderInlineCode(pick(project.architectureSummary))}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <ArchitectureDiagram projectId={project.id} />
            </div>
          </section>

          {/* Key Engineering Decisions */}
          <section
            aria-labelledby="decisions-heading"
            className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20"
          >
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <p className="font-mono-metric text-xs tracking-[0.14em] text-fg-muted uppercase">
                  <span className="text-accent">05</span> —{' '}
                  {t.projects.sections.decisions}
                </p>
                <h2
                  id="decisions-heading"
                  className="display-section mt-3 text-fg"
                >
                  {t.projects.sections.decisions}
                </h2>
              </div>
            </div>

            <ol className="divide-y divide-border border-t border-border lg:col-span-8">
              {project.decisions.map((decision, idx) => (
                <li
                  key={decision.title.fr}
                  className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-12 sm:gap-6"
                >
                  <span className="font-mono-metric text-xs tracking-[0.14em] text-accent sm:col-span-2 sm:pt-1">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="text-lg font-medium tracking-tight text-fg">
                      {pick(decision.title)}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-fg-muted sm:text-base">
                      {renderInlineCode(pick(decision.description))}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* 5. Sequential Next Project Navigation */}
        <section
          aria-label={t.projects.nextProject}
          className="bg-surface/50"
        >
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group block transition-colors hover:bg-surface"
          >
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-16 sm:flex-row sm:items-end lg:px-10 lg:py-20">
              <div>
                <p className="font-mono-metric text-xs tracking-[0.14em] text-fg-muted uppercase">
                  {t.projects.nextProject} ·{' '}
                  <span className="text-accent">
                    {nextProject.index} / {totalProjectsStr}
                  </span>
                </p>
                <h2 className="display-section mt-3 text-fg transition-colors group-hover:text-accent">
                  {nextProject.name}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-base">
                  {pick(nextProject.tagline)}
                </p>
              </div>

              <span className="font-mono-metric inline-flex shrink-0 items-center gap-2 border border-fg bg-fg px-5 py-3 text-xs tracking-[0.12em] text-bg uppercase transition-colors group-hover:border-accent group-hover:bg-accent">
                <span>{t.projects.viewCaseStudy}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          </Link>
        </section>
      </main>

      <Footer />

      <MediaLightbox
        items={validLightboxItems}
        activeIndex={activeLightboxIndex}
        onClose={() => setLightboxSrc(null)}
        onNavigate={(nextIdx) => {
          const target = validLightboxItems[nextIdx];
          if (target) {
            setLightboxSrc(target.src);
          }
        }}
      />
    </div>
  );
}
