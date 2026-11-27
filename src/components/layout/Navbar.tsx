import { useState, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CANDIDATE_PROFILE } from '../../data/skills';
import { LanguageToggle } from '../ui/LanguageToggle';
import { useSmoothScroll } from './SmoothScrollProvider';

export function Navbar() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const navItems = [
    { href: '#projects', label: t.nav.projects },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    setMobileOpen(false);

    if (pathname !== '/') {
      navigate(`/${href}`);
      return;
    }

    scrollTo(href);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (pathname === '/') {
      event.preventDefault();
      scrollTo(0);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-fg focus:px-4 focus:py-2 focus:text-xs focus:text-bg"
      >
        {t.nav.skipToContent}
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Monogram */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="group inline-flex items-baseline gap-3"
          aria-label={CANDIDATE_PROFILE.fullName}
        >
          <span className="font-display-editorial text-2xl tracking-tight text-fg transition-colors group-hover:text-accent">
            {CANDIDATE_PROFILE.monogram}
          </span>
          <span className="font-mono-metric hidden text-[11px] tracking-[0.14em] text-fg-muted uppercase sm:inline">
            {CANDIDATE_PROFILE.fullName}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className="font-mono-metric relative py-1 text-[11px] tracking-[0.14em] text-fg-muted uppercase transition-colors hover:text-fg after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <LanguageToggle />

          <a
            href={CANDIDATE_PROFILE.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-metric hidden items-center gap-1.5 border border-fg bg-fg px-3.5 py-1.5 text-[11px] tracking-[0.12em] text-bg uppercase transition-colors hover:border-accent hover:bg-accent sm:inline-flex"
          >
            <span>{t.nav.cvPdf}</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center border border-border text-fg transition-colors hover:border-fg md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            aria-label="Mobile navigation"
            className="overflow-hidden border-t border-border bg-bg md:hidden"
          >
            <div className="flex flex-col divide-y divide-border px-6 py-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="font-mono-metric py-3.5 text-xs tracking-[0.14em] text-fg uppercase transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={CANDIDATE_PROFILE.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="font-mono-metric flex items-center justify-between py-3.5 text-xs tracking-[0.14em] text-accent uppercase"
              >
                <span>{t.nav.cvPdf}</span>
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 1px Terracotta scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px origin-left bg-accent"
      />
    </header>
  );
}
