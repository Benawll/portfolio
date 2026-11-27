import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import { applyEditorialTheme } from '../lib/theme';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function NotFoundPage() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    applyEditorialTheme('light', true);
    document.title = `404 — ${t.meta.title}`;
    return () => {
      document.title = t.meta.title;
    };
  }, [t.meta.title]);

  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Navbar />

      <main
        id="main-content"
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 pb-20 lg:px-10"
      >
        <div className="max-w-2xl">
          <p className="font-mono-metric text-xs tracking-[0.16em] text-accent uppercase">
            {lang === 'fr' ? 'ERREUR' : 'ERROR'} · {t.notFound.code}
          </p>
          <h1 className="display-hero mt-4 text-fg">{t.notFound.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            {t.notFound.description}
          </p>

          <div className="mt-8">
            <Link
              to="/"
              className="font-mono-metric inline-flex items-center gap-2 border border-fg bg-fg px-5 py-3 text-xs tracking-[0.12em] text-bg uppercase transition-colors hover:border-accent hover:bg-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>{t.notFound.backHome}</span>
            </Link>
          </div>
        </div>

        {/* Quick index to the 4 case studies */}
        <div className="mt-16 border-t border-border pt-8">
          <p className="font-mono-metric text-[11px] tracking-[0.14em] text-fg-muted uppercase">
            {lang === 'fr'
              ? 'Études de cas disponibles'
              : 'Available case studies'}
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.map((project) => (
              <li key={project.id}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group flex items-center justify-between border border-border bg-surface/50 px-4 py-3.5 transition-colors hover:border-accent"
                >
                  <div>
                    <span className="font-mono-metric block text-[10px] tracking-[0.14em] text-accent">
                      {project.index} / 04
                    </span>
                    <span className="mt-0.5 block text-sm font-medium text-fg group-hover:text-accent">
                      {project.name}
                    </span>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-fg-muted transition-colors group-hover:text-accent"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
