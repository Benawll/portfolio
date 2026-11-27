import { afterEach, describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: vi.fn(),
    });

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '0px';
      readonly thresholds: ReadonlyArray<number> = [0];
      disconnect = vi.fn();
      observe = vi.fn();
      takeRecords = vi.fn(() => []);
      unobserve = vi.fn();
    }

    class MockResizeObserver implements ResizeObserver {
      disconnect = vi.fn();
      observe = vi.fn();
      unobserve = vi.fn();
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal('ResizeObserver', MockResizeObserver);

    const store = new Map<string, string>();
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, String(value));
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
        clear: () => {
          store.clear();
        },
      },
    });
  }
});

import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { PROJECTS } from '../src/data/projects';
import { SKILLS, SKILL_CATEGORIES } from '../src/data/skills';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  window.history.pushState({}, '', '/');
});

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('Portfolio App', () => {
  it('renders the Home page in French by default with all main sections', async () => {
    renderAt('/');

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /Ingénierie logicielle/i,
      }),
    ).toBeInTheDocument();

    expect(document.documentElement.lang).toBe('fr');
    expect(
      screen.getByText(/Double culture Logiciel & Données/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Expériences & Formation/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Matrice technique/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Disponible immédiatement/i }),
    ).toBeInTheDocument();
  });

  it('toggles language between FR and EN and updates UI copy', async () => {
    const user = userEvent.setup();
    renderAt('/');

    await screen.findByRole('heading', {
      level: 1,
      name: /Ingénierie logicielle/i,
    });

    const enButton = screen.getByRole('button', { name: 'EN' });
    await user.click(enButton);

    await waitFor(() => {
      expect(document.documentElement.lang).toBe('en');
    });
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Software engineering/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Technical matrix/i)).toBeInTheDocument();

    const frButton = screen.getByRole('button', { name: 'FR' });
    await user.click(frButton);

    await waitFor(() => {
      expect(document.documentElement.lang).toBe('fr');
    });
    expect(screen.getByText(/Matrice technique/i)).toBeInTheDocument();
  });

  it('filters SkillsMatrix by category', async () => {
    const user = userEvent.setup();
    renderAt('/');

    const skillsSection = await screen
      .findByRole('region', { name: /Matrice technique/i })
      .catch(() => document.getElementById('skills')!);
    expect(skillsSection).toBeTruthy();

    const getSkillCards = () =>
      skillsSection.querySelectorAll('article').length;

    expect(getSkillCards()).toBe(SKILLS.length);

    for (const category of SKILL_CATEGORIES) {
      const expectedCount = SKILLS.filter(
        (skill) => skill.category === category.id,
      ).length;
      const tab = screen.getByRole('tab', {
        name: new RegExp(category.label.fr, 'i'),
      });
      await user.click(tab);

      await waitFor(() => {
        expect(getSkillCards()).toBe(expectedCount);
      });
      expect(tab).toHaveAttribute('aria-selected', 'true');
    }

    const allTab = screen.getByRole('tab', { name: /Tous/i });
    await user.click(allTab);
    await waitFor(() => {
      expect(getSkillCards()).toBe(SKILLS.length);
    });
  });

  it.each(PROJECTS.map((project) => [project.slug, project.name] as const))(
    'renders case study page /projects/%s',
    async (slug, name) => {
      renderAt(`/projects/${slug}`);

      expect(
        await screen.findByRole('heading', {
          level: 1,
          name: new RegExp(name, 'i'),
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(/Métriques mesurées/i)).toBeInTheDocument();
      expect(screen.getByText(/Projet suivant/i)).toBeInTheDocument();
    },
  );

  it('renders 404 page for unknown routes and invalid project slugs', async () => {
    renderAt('/route-inexistante');

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /Page introuvable/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Retour à l'accueil/i }),
    ).toHaveAttribute('href', '/');

    cleanup();
    renderAt('/projects/unknown-slug');

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /Page introuvable/i,
      }),
    ).toBeInTheDocument();
  });

  it('opens MediaLightbox with interactive zoom controls on capture click', async () => {
    const user = userEvent.setup();
    renderAt('/projects/token-optimizer');

    const enlargeBtn = await screen.findByRole('button', {
      name: /Agrandir la capture/i,
    });
    await user.click(enlargeBtn);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Zoomer$/i }));
    expect(screen.getByText('125%')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Réinitialiser le zoom/i }));
    expect(screen.getByText('100%')).toBeInTheDocument();

    await user.keyboard('+');
    expect(screen.getByText('125%')).toBeInTheDocument();

    await user.keyboard('0');
    expect(screen.getByText('100%')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
