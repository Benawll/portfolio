#!/usr/bin/env node

/**
 * Reusable media capture script for Benjamin PEQUIN's portfolio.
 * Captures live local UIs / HTML reports at 1440x900 (deviceScaleFactor: 2)
 * and optimizes output to .webp (< 400 KB) using sharp.
 *
 * Usage:
 *   node scripts/capture-media.mjs --target=token-optimizer
 *   node scripts/capture-media.mjs --target=pulselake-evidently
 *   node scripts/capture-media.mjs --target=pulselake-mlflow
 *   node scripts/capture-media.mjs --target=pulselake-console [--url=http://localhost:8000/docs]
 *   node scripts/capture-media.mjs --target=agentflow-ui
 *   node scripts/capture-media.mjs --target=agentflow-grafana
 *   node scripts/capture-media.mjs --target=awll-placeholder
 */

import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const MEDIA_DIR = resolve(ROOT, 'public', 'media');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const MAX_BYTES = 400 * 1024;

function parseArgs(argv) {
  const args = {};
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--')) {
      const [key, ...rest] = arg.slice(2).split('=');
      args[key] = rest.length > 0 ? rest.join('=') : true;
    }
  }
  return args;
}

async function saveOptimizedWebp(pngBuffer, outPath) {
  const attempts = [
    { width: 1440, quality: 84 },
    { width: 1440, quality: 72 },
    { width: 1280, quality: 68 },
    { width: 1200, quality: 60 },
  ];

  for (const { width, quality } of attempts) {
    await sharp(pngBuffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(outPath);

    const info = await stat(outPath);
    if (info.size <= MAX_BYTES) {
      console.log(`Saved ${outPath} (${(info.size / 1024).toFixed(1)} KB, w=${width}, q=${quality})`);
      return info.size;
    }
  }

  const finalInfo = await stat(outPath);
  console.warn(`Warning: ${outPath} is ${(finalInfo.size / 1024).toFixed(1)} KB (> 400 KB)`);
  return finalInfo.size;
}

async function withBrowser(fn) {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
    });
    const page = await context.newPage();
    return await fn(page);
  } finally {
    await browser.close();
  }
}

async function captureTokenOptimizer() {
  const outPath = resolve(MEDIA_DIR, 'token-optimizer-dashboard.webp');
  await withBrowser(async (page) => {
    await page.goto('file:///D:/Token%20Optimizer/dashboard.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    // Hide any local filesystem paths or personal email/username elements if present, keeping KPIs & charts clean
    await page.evaluate(() => {
      document.querySelectorAll('[data-sensitive], .user-path, .account-email').forEach((el) => {
        el.style.display = 'none';
      });
    });
    const png = await page.screenshot({ fullPage: false });
    await saveOptimizedWebp(png, outPath);
  });
}

async function capturePulselakeEvidently() {
  const outPath = resolve(MEDIA_DIR, 'pulselake-evidently.webp');
  await withBrowser(async (page) => {
    await page.goto(
      'file:///D:/Antigravity%20Projects/PulseLake-MLOps/data/mlops/reports/drift_report.html',
      { waitUntil: 'networkidle' }
    );
    await page.waitForTimeout(1500);
    const png = await page.screenshot({ fullPage: false });
    await saveOptimizedWebp(png, outPath);
  });
}

async function capturePulselakeMlflow(url = 'http://localhost:5000') {
  const outPath = resolve(MEDIA_DIR, 'pulselake-mlflow.webp');
  await withBrowser(async (page) => {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3500);
    const png = await page.screenshot({ fullPage: false });
    await saveOptimizedWebp(png, outPath);
  });
}

async function capturePulselakeConsole(url = 'http://localhost:8000/docs') {
  const outPath = resolve(MEDIA_DIR, 'pulselake-console.webp');
  await withBrowser(async (page) => {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    const png = await page.screenshot({ fullPage: false });
    await saveOptimizedWebp(png, outPath);
  });
}

async function captureAgentflowUi(url = 'http://localhost:5173') {
  const outPath = resolve(MEDIA_DIR, 'agentflow-ui.webp');
  await withBrowser(async (page) => {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    const input = page.locator('textarea, input[type="text"]').last();
    if (await input.count()) {
      await input.fill('How does the Hybrid RAG pipeline work in AgentFlow Studio?');
      await input.press('Enter');
      await page.waitForTimeout(3000);

      await input.fill('What is the semantic cache threshold and observability stack?');
      await input.press('Enter');
      await page.waitForTimeout(3000);
    }

    const png = await page.screenshot({ fullPage: false });
    await saveOptimizedWebp(png, outPath);
  });
}

async function captureAgentflowGrafana(url = 'http://localhost:3000') {
  const outPath = resolve(MEDIA_DIR, 'agentflow-grafana.webp');
  await withBrowser(async (page) => {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const userInput = page.locator('input[name="user"]');
    if (await userInput.count()) {
      await userInput.fill('admin');
      await page.locator('input[name="password"]').fill('admin');
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(2000);
    }
    await page.goto(`${url}/d/agentflow-overview`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(2000);
    const png = await page.screenshot({ fullPage: false });
    await saveOptimizedWebp(png, outPath);
  });
}

async function createAwllPlaceholder() {
  const outPath = resolve(MEDIA_DIR, 'awll-disk-utility.webp');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
    <rect width="1440" height="900" fill="#111110"/>
    <rect x="48" y="48" width="1344" height="804" rx="16" fill="#1A1A18" stroke="#2C2B28" stroke-width="2"/>
    <text x="96" y="130" fill="#EAE6DF" font-family="system-ui, sans-serif" font-size="36" font-weight="600">Awll Disk Utility — Desktop WPF + WebView2</text>
    <text x="96" y="176" fill="#9E9B93" font-family="monospace" font-size="18">Placeholder temporaire · Capture manuelle requise (vue Space Lens ou Audit)</text>
    <rect x="96" y="230" width="1248" height="540" rx="12" fill="#141413" stroke="#2C2B28" stroke-dasharray="8 8" stroke-width="2"/>
    <text x="720" y="490" text-anchor="middle" fill="#D97736" font-family="monospace" font-size="22">Déposer la capture réelle dans public/media/awll-disk-utility.webp</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  await saveOptimizedWebp(png, outPath);
}

async function main() {
  const args = parseArgs(process.argv);
  await mkdir(MEDIA_DIR, { recursive: true });

  const target = args.target;
  switch (target) {
    case 'token-optimizer':
      await captureTokenOptimizer();
      break;
    case 'pulselake-evidently':
      await capturePulselakeEvidently();
      break;
    case 'pulselake-mlflow':
      await capturePulselakeMlflow(args.url);
      break;
    case 'pulselake-console':
      await capturePulselakeConsole(args.url);
      break;
    case 'agentflow-ui':
      await captureAgentflowUi(args.url);
      break;
    case 'agentflow-grafana':
      await captureAgentflowGrafana(args.url);
      break;
    case 'awll-placeholder':
      await createAwllPlaceholder();
      break;
    default:
      console.error('Unknown or missing --target. Available: token-optimizer, pulselake-evidently, pulselake-mlflow, pulselake-console, agentflow-ui, agentflow-grafana, awll-placeholder');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
