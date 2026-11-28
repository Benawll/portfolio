import { chromium, type Page } from 'playwright';

const BASE_URL = 'http://127.0.0.1:4173';
const PROJECT_SLUGS = [
  'agentflow-studio',
  'pulselake-mlops',
  'awll-disk-utility',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

interface Diagnostics {
  consoleErrors: string[];
  pageErrors: string[];
  notFoundUrls: string[];
}

function attachDiagnostics(page: Page): Diagnostics {
  const diagnostics: Diagnostics = {
    consoleErrors: [],
    pageErrors: [],
    notFoundUrls: [],
  };

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      diagnostics.consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    diagnostics.pageErrors.push(err.message);
  });

  page.on('response', (res) => {
    if (res.status() === 404) {
      diagnostics.notFoundUrls.push(res.url());
    }
  });

  return diagnostics;
}

async function assertAllImagesLoaded(page: Page, contextLabel: string) {
  const brokenImages = await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img')).filter(
      (img) => img.getClientRects().length > 0,
    );

    await Promise.all(
      imgs.map((img) => {
        img.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
          setTimeout(resolve, 4000);
        });
      }),
    );

    return imgs
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.getAttribute('src') ?? '(no src)');
  });

  assert(
    brokenImages.length === 0,
    `${contextLabel}: broken images found: ${brokenImages.join(', ')}`,
  );
}

async function runDesktopCheck() {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    const diag = attachDiagnostics(page);

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const initialTheme = await page.evaluate(
      () => document.documentElement.dataset.theme,
    );
    assert(
      initialTheme === 'light',
      `Expected initial desktop theme to be 'light', got '${initialTheme}'`,
    );

    // Scroll to #projects to trigger GSAP ScrollTrigger dark theme switch
    await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY + 120,
          behavior: 'instant',
        });
      }
    });
    await page.waitForTimeout(700);

    const projectsTheme = await page.evaluate(
      () => document.documentElement.dataset.theme,
    );
    assert(
      projectsTheme === 'dark',
      `Expected theme at #projects to switch to 'dark', got '${projectsTheme}'`,
    );

    // Verify theme stays 'dark' across projects 2, 3, and 4 of the pinned horizontal scroll
    const projectScrollPositions = await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (!el) return null;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(0, el.getBoundingClientRect().height - window.innerHeight);
      return [
        { label: 'project 2 (~33%)', y: Math.round(top + travel * 0.33) },
        { label: 'project 3 (~66%)', y: Math.round(top + travel * 0.66) },
        { label: 'project 4 (~95%)', y: Math.round(top + travel * 0.95) },
      ];
    });

    assert(projectScrollPositions !== null, '#projects section not found');
    for (const pos of projectScrollPositions) {
      await page.evaluate((y) => {
        window.scrollTo({ top: y, behavior: 'instant' });
      }, pos.y);
      await page.waitForTimeout(300);
      const themeAtPos = await page.evaluate(
        () => document.documentElement.dataset.theme,
      );
      assert(
        themeAtPos === 'dark',
        `Expected theme at ${pos.label} (y=${pos.y}) to remain 'dark', got '${themeAtPos}'`,
      );
    }

    // Scroll to #experience (Parcours) and verify theme switches back to 'light'
    await page.evaluate(() => {
      const exp = document.getElementById('experience');
      if (exp) {
        window.scrollTo({
          top: exp.getBoundingClientRect().top + window.scrollY + 200,
          behavior: 'instant',
        });
      }
    });
    await page.waitForTimeout(700);

    const experienceTheme = await page.evaluate(
      () => document.documentElement.dataset.theme,
    );
    assert(
      experienceTheme === 'light',
      `Expected theme at #experience to switch back to 'light', got '${experienceTheme}'`,
    );

    await assertAllImagesLoaded(page, 'Desktop Home');

    // Navigate to all 4 case study pages
    for (const slug of PROJECT_SLUGS) {
      await page.goto(`${BASE_URL}/projects/${slug}`, {
        waitUntil: 'networkidle',
      });
      await page.waitForSelector('h1', { state: 'visible' });
      await assertAllImagesLoaded(page, `Desktop /projects/${slug}`);
    }

    assert(
      diag.consoleErrors.length === 0,
      `Desktop console errors: ${diag.consoleErrors.join(' | ')}`,
    );
    assert(
      diag.pageErrors.length === 0,
      `Desktop page errors: ${diag.pageErrors.join(' | ')}`,
    );
    assert(
      diag.notFoundUrls.length === 0,
      `Desktop 404 responses: ${diag.notFoundUrls.join(' | ')}`,
    );
  } finally {
    await browser.close();
  }
}

async function runMobileCheck() {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    const diag = attachDiagnostics(page);

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    // Check horizontal overflow across full page scroll
    const overflowResults = await page.evaluate(() => {
      const checks: Array<{ y: number; scrollWidth: number; innerWidth: number }> = [];
      const maxScroll = document.documentElement.scrollHeight;
      for (const ratio of [0, 0.25, 0.5, 0.75, 1]) {
        const y = Math.floor(maxScroll * ratio);
        window.scrollTo({ top: y, behavior: 'instant' });
        checks.push({
          y,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        });
      }
      return checks;
    });

    for (const check of overflowResults) {
      assert(
        check.scrollWidth <= check.innerWidth,
        `Mobile horizontal overflow at y=${check.y}: scrollWidth (${check.scrollWidth}) > innerWidth (${check.innerWidth})`,
      );
    }

    // Verify vertical stacking of projects on mobile
    const articleTops = await page.evaluate(() => {
      const section = document.getElementById('projects');
      if (!section) return [];
      const articles = Array.from(section.querySelectorAll('article')).filter(
        (el) => el.getBoundingClientRect().height > 0,
      );
      return articles.map((el) => el.getBoundingClientRect().top);
    });

    assert(
      articleTops.length === 3,
      `Expected 3 visible vertical project cards on mobile, found ${articleTops.length}`,
    );
    for (let i = 1; i < articleTops.length; i += 1) {
      assert(
        articleTops[i] > articleTops[i - 1],
        `Mobile project card ${i} is not stacked vertically below card ${i - 1}`,
      );
    }

    assert(
      diag.consoleErrors.length === 0,
      `Mobile console errors: ${diag.consoleErrors.join(' | ')}`,
    );
    assert(
      diag.pageErrors.length === 0,
      `Mobile page errors: ${diag.pageErrors.join(' | ')}`,
    );
    assert(
      diag.notFoundUrls.length === 0,
      `Mobile 404 responses: ${diag.notFoundUrls.join(' | ')}`,
    );
  } finally {
    await browser.close();
  }
}

async function runReducedMotionCheck() {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    // Scroll through every section and check none is stuck at opacity: 0
    const hiddenSections = await page.evaluate(async () => {
      const targets = Array.from(
        document.querySelectorAll('main > section, footer'),
      );
      const stuck: string[] = [];

      for (const el of targets) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        await new Promise((r) => setTimeout(r, 150));
        const opacity = Number.parseFloat(window.getComputedStyle(el).opacity);
        if (Number.isNaN(opacity) || opacity === 0) {
          stuck.push(el.id || el.tagName);
        }
      }
      return stuck;
    });

    assert(
      hiddenSections.length === 0,
      `Sections stuck at opacity: 0 in reduced-motion mode: ${hiddenSections.join(', ')}`,
    );
  } finally {
    await browser.close();
  }
}

async function runShortDesktopCheck(width: number, height: number) {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    // Scroll to #projects and verify all project action buttons fit within the viewport height
    const panels = await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (!el) return null;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(0, el.getBoundingClientRect().height - window.innerHeight);
      return [0, 0.5, 0.99].map((ratio, idx) => ({
        idx,
        y: Math.round(top + travel * ratio),
      }));
    });

    assert(panels !== null, '#projects section not found');
    for (const panel of panels) {
      await page.evaluate((y) => {
        window.scrollTo({ top: y, behavior: 'instant' });
      }, panel.y);
      await page.waitForTimeout(350);

      const clipped = await page.evaluate((panelIdx) => {
        const articles = Array.from(
          document.querySelectorAll('#projects [data-project-panel]'),
        );
        const article = articles[panelIdx];
        if (!article) return ['article missing'];
        const actions = Array.from(article.querySelectorAll('a'));
        const issues: string[] = [];
        for (const a of actions) {
          const rect = a.getBoundingClientRect();
          if (rect.height === 0 || rect.bottom > window.innerHeight) {
            issues.push(
              `${a.textContent?.trim() ?? 'link'} bottom=${Math.round(rect.bottom)} > innerHeight=${window.innerHeight}`,
            );
          }
        }
        return issues;
      }, panel.idx);

      assert(
        clipped.length === 0,
        `Viewport ${width}x${height} panel ${panel.idx + 1} clipped actions: ${clipped.join('; ')}`,
      );
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  await runDesktopCheck();
  console.log('✓ Desktop 1440x900 smoke check passed');
  await runShortDesktopCheck(1280, 720);
  console.log('✓ Short desktop 1280x720 action visibility check passed');
  await runShortDesktopCheck(1024, 640);
  console.log('✓ Compact desktop 1024x640 action visibility check passed');
  await runMobileCheck();
  console.log('✓ Mobile 390x844 smoke check passed');
  await runReducedMotionCheck();
  console.log('✓ prefers-reduced-motion: reduce smoke check passed');
}

main().catch((err) => {
  console.error(err);
  throw err;
});
