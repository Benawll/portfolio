#!/usr/bin/env node

/**
 * Generates D:\Portfolio\public\cv\Benjamin-Pequin-CV.pdf
 * from D:\Career-ops\cv.md using Playwright Chromium.
 */

import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CV_MD_PATH = 'D:/Career-ops/cv.md';
const OUT_PDF_PATH = resolve(ROOT, 'public', 'cv', 'Benjamin-Pequin-CV.pdf');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inlineFormat(str) {
  return escapeHtml(str)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>');
}

function markdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      out.push('</ul>');
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      closeList();
      continue;
    }
    if (line === '---') {
      closeList();
      out.push('<hr />');
      continue;
    }
    if (line.startsWith('# ')) {
      closeList();
      out.push(`<h1>${inlineFormat(line.slice(2))}</h1>`);
    } else if (line.startsWith('## ')) {
      closeList();
      out.push(`<h2>${inlineFormat(line.slice(3))}</h2>`);
    } else if (line.startsWith('### ')) {
      closeList();
      out.push(`<h3>${inlineFormat(line.slice(4))}</h3>`);
    } else if (line.startsWith('- ')) {
      if (!inList) {
        out.push('<ul>');
        inList = true;
      }
      out.push(`<li>${inlineFormat(line.slice(2))}</li>`);
    } else {
      closeList();
      out.push(`<p>${inlineFormat(line)}</p>`);
    }
  }
  closeList();
  return out.join('\n');
}

async function main() {
  const md = await readFile(CV_MD_PATH, 'utf-8');
  const bodyHtml = markdownToHtml(md);

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<title>Benjamin PEQUIN — CV</title>
<style>
  @page { size: A4; margin: 13mm 15mm; }
  * { box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    font-size: 9.2pt;
    line-height: 1.38;
    color: #18181b;
    margin: 0;
  }
  h1 {
    font-size: 20pt;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 4pt 0;
    color: #111110;
  }
  h2 {
    font-size: 10.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #9a3412;
    border-bottom: 1px solid #e4e4e7;
    padding-bottom: 2pt;
    margin: 10pt 0 5pt 0;
    page-break-after: avoid;
  }
  h3 {
    font-size: 9.8pt;
    font-weight: 700;
    margin: 6pt 0 2pt 0;
    color: #111110;
    page-break-after: avoid;
  }
  p { margin: 2pt 0 4pt 0; }
  ul { margin: 2pt 0 5pt 0; padding-left: 14pt; }
  li { margin: 1.5pt 0; }
  hr { border: none; border-top: 1px solid #e4e4e7; margin: 6pt 0; }
  code {
    font-family: Consolas, 'Courier New', monospace;
    font-size: 8.5pt;
    background: #f4f4f5;
    padding: 0.5pt 3pt;
    border-radius: 2pt;
  }
  a { color: #1d4ed8; text-decoration: none; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

  await mkdir(dirname(OUT_PDF_PATH), { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.pdf({
      path: OUT_PDF_PATH,
      format: 'A4',
      printBackground: true,
      margin: { top: '13mm', right: '15mm', bottom: '13mm', left: '15mm' },
    });
    console.log(`Generated ${OUT_PDF_PATH}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
