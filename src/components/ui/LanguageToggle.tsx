import { motion } from 'framer-motion';
import { useLanguage, type Language } from '../../i18n/LanguageContext';

const LANGUAGES: Language[] = ['fr', 'en'];

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="font-mono-metric inline-flex items-center border border-border p-0.5 text-[11px] tracking-wider uppercase"
    >
      {LANGUAGES.map((code) => {
        const isActive = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            className={`relative cursor-pointer px-2.5 py-1 transition-colors ${
              isActive ? 'text-bg' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="language-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="absolute inset-0 bg-fg"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{code.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
