import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CANDIDATE_PROFILE } from '../../data/skills';
import { useSmoothScroll } from './SmoothScrollProvider';

export function Footer() {
  const { t, lang } = useLanguage();
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="border-t border-border bg-bg text-fg">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-3">
              <span className="font-display-editorial text-2xl text-fg">
                {CANDIDATE_PROFILE.monogram}
              </span>
              <span className="font-mono-metric text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                {CANDIDATE_PROFILE.fullName}
              </span>
            </div>
            <p className="font-mono-metric text-xs text-fg-muted">
              {t.contact.footerRights}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={CANDIDATE_PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-metric inline-flex items-center gap-1 text-xs tracking-wider text-fg-muted uppercase transition-colors hover:text-accent"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <a
              href={CANDIDATE_PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-metric inline-flex items-center gap-1 text-xs tracking-wider text-fg-muted uppercase transition-colors hover:text-accent"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <a
              href={CANDIDATE_PROFILE.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-metric inline-flex items-center gap-1 text-xs tracking-wider text-fg-muted uppercase transition-colors hover:text-accent"
            >
              <span>{t.nav.cvPdf}</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              aria-label={lang === 'fr' ? 'Retour en haut' : 'Back to top'}
              className="font-mono-metric inline-flex cursor-pointer items-center gap-1.5 border border-border px-3 py-1.5 text-[11px] tracking-wider text-fg-muted uppercase transition-colors hover:border-fg hover:text-fg"
            >
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>{lang === 'fr' ? 'Haut' : 'Top'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
