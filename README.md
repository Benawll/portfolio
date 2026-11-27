# Benjamin PEQUIN — Portfolio Éditorial

Portfolio personnel de **Benjamin PEQUIN** (Ingénieur Data, IA & Full-Stack · Polytech Nantes & Umeå University).  
Direction artistique *Hybride Éditorial Papier/Encre → Charbon Organique*, i18n FR/EN, études de cas techniques et benchmarks réels.

## Stack Technique

- **Core** : React 19, TypeScript 5.8, Vite 6, React Router 7
- **Styles & Typographie** : Tailwind CSS v4, `@fontsource/instrument-serif`, `@fontsource/plus-jakarta-sans`, `@fontsource/jetbrains-mono`
- **Animations & Scroll** : GSAP (`ScrollTrigger`), Lenis, Framer Motion, Lucide React
- **Tests & Qualité** : Vitest, Testing Library, Playwright, ESLint, TypeScript

## Architecture

```text
src/
├── components/
│   ├── layout/      # Navbar, SmoothScrollProvider
│   ├── sections/    # Hero, Pillars, HorizontalProjects, ExperienceTimeline, SkillsMatrix, ContactSection
│   └── ui/          # ArchitectureDiagram, MediaFrame, MediaLightbox, LanguageToggle
├── data/            # Données réelles (projects.ts, experience.ts, skills.ts)
├── i18n/            # Traductions FR/EN et contexte
└── pages/           # HomePage, ProjectDetailPage, NotFoundPage
public/
├── cv/              # CV PDF
├── media/           # Captures WebP optimisées
├── favicon.svg      # Monogramme éditorial B.P
└── og-image.png     # Aperçu OpenGraph 1200×630
```

## Commandes

```bash
# Développement
npm run dev

# Vérification types, lint et tests unitaires
npx tsc --noEmit && npm run lint && npm run test

# Build de production et prévisualisation
npm run build && npm run preview

# Smoke test Playwright (Desktop 1440×900, Mobile 390×844, reduced-motion)
node tests/smoke.spec.ts
```

## Capture des médias

Les visuels de `public/media/` sont générés via Playwright et optimisés en WebP (`<= 1920px`) avec `sharp` :

```bash
node scripts/capture-media.mjs
```

## Scores Lighthouse (Production)

Mesurés sur le build de production (`npm run preview`) :

- **Performance** : `91`
- **Accessibility** : `97`
- **Best Practices** : `100`
- **SEO** : `100`

## Déploiement

Hébergé sur **Vercel** avec réécriture SPA (`vercel.json`) pour le rechargement direct des routes `/projects/:slug` et en-têtes `Cache-Control` sur `/media/*` et `/cv/*`.
