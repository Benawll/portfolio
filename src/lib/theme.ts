import gsap from 'gsap';

export type EditorialTheme = 'light' | 'dark';

const THEME_TOKENS: Record<EditorialTheme, Record<string, string>> = {
  light: {
    '--bg': '#f5f2eb',
    '--surface': '#ece8df',
    '--fg': '#141413',
    '--fg-muted': '#5e5b54',
    '--border': '#d8d3c8',
    '--accent': '#c84b31',
    '--accent-tech': '#2d6a4f',
  },
  dark: {
    '--bg': '#111110',
    '--surface': '#1a1a18',
    '--fg': '#f2efe9',
    '--fg-muted': '#9e9a90',
    '--border': '#2b2a27',
    '--accent': '#d96045',
    '--accent-tech': '#4e9a74',
  },
};

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function applyEditorialTheme(
  mode: EditorialTheme,
  instant = false,
): void {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const tokens = THEME_TOKENS[mode];
  root.dataset.theme = mode;

  if (instant || prefersReducedMotion()) {
    gsap.killTweensOf(root);
    for (const [prop, value] of Object.entries(tokens)) {
      root.style.setProperty(prop, value);
    }
    return;
  }

  gsap.to(root, {
    ...tokens,
    duration: 0.55,
    ease: 'power2.out',
    overwrite: 'auto',
  });
}
