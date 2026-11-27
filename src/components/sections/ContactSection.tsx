import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { CANDIDATE_PROFILE } from '../../data/skills';
import { useLanguage } from '../../i18n/LanguageContext';
import { applyEditorialTheme } from '../../lib/theme';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 65%',
      end: 'bottom bottom',
      onEnter: () => applyEditorialTheme('dark'),
      onEnterBack: () => applyEditorialTheme('dark'),
      onLeaveBack: () => applyEditorialTheme('light'),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
      setCopied(true);
    } catch {
      // Fallback for non-secure contexts
      const input = document.createElement('textarea');
      input.value = CANDIDATE_PROFILE.email;
      input.setAttribute('readonly', '');
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
    }

    window.setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Eyebrow & status */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <p className="font-mono-metric text-xs tracking-[0.14em] text-fg-muted uppercase">
            <span className="text-accent">{t.contact.index}</span> —{' '}
            {t.contact.eyebrow}
          </p>
          <p className="font-mono-metric inline-flex items-center gap-2 text-xs tracking-[0.12em] text-accent-tech uppercase">
            <span
              className="inline-block h-2 w-2 rounded-full bg-accent-tech"
              aria-hidden="true"
            />
            <span>{t.contact.contracts}</span>
          </p>
        </div>

        {/* Monumental closing statement */}
        <div className="py-14 lg:py-20">
          <h2 id="contact-heading" className="display-hero max-w-4xl text-fg">
            {t.contact.title}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
            {t.contact.subtitle}
          </p>

          <p className="font-mono-metric mt-4 text-xs tracking-[0.1em] text-fg-muted uppercase">
            {t.contact.location}
          </p>

          {/* Primary actions */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-live="polite"
              className="font-mono-metric inline-flex cursor-pointer items-center gap-2.5 border border-fg bg-fg px-6 py-3.5 text-xs tracking-[0.12em] text-bg uppercase transition-colors hover:border-accent hover:bg-accent"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={1.5} />
                  <span>{t.contact.emailCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" strokeWidth={1.5} />
                  <span>{CANDIDATE_PROFILE.email}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${CANDIDATE_PROFILE.email}`}
              className="font-mono-metric inline-flex items-center gap-2 border border-border px-5 py-3.5 text-xs tracking-[0.12em] text-fg uppercase transition-colors hover:border-fg hover:bg-surface"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              <span>{t.contact.sendEmail}</span>
            </a>

            <a
              href={CANDIDATE_PROFILE.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-metric inline-flex items-center gap-2 border border-border px-5 py-3.5 text-xs tracking-[0.12em] text-fg uppercase transition-colors hover:border-accent hover:text-accent"
            >
              <span>{t.contact.downloadCv}</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Hairline direct links */}
        <div className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <a
            href={CANDIDATE_PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-6 sm:pr-8"
          >
            <div>
              <span className="font-mono-metric block text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                GitHub
              </span>
              <span className="font-display-editorial mt-1 block text-3xl text-fg transition-colors group-hover:text-accent">
                github.com/Benawll
              </span>
            </div>
            <ArrowUpRight
              className="h-5 w-5 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              strokeWidth={1.5}
            />
          </a>

          <a
            href={CANDIDATE_PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-6 sm:pl-8"
          >
            <div>
              <span className="font-mono-metric block text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                LinkedIn
              </span>
              <span className="font-display-editorial mt-1 block text-3xl text-fg transition-colors group-hover:text-accent">
                Benjamin PEQUIN
              </span>
            </div>
            <ArrowUpRight
              className="h-5 w-5 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
