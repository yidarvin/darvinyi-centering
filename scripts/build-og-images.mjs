#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SERVER_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const OUT_DIR = path.join(ROOT, 'public', 'og');

const WIDTH = 1200;
const HEIGHT = 630;

// Matches src/styles/tokens.ts. Kept as plain values (not imported) because
// this script runs as a standalone Node process against the SSR bundle, not
// through the app's module graph.
const COLOR = {
  bg: '#0a0a0b',
  line: 'rgba(255,255,255,0.08)',
  text: '#e6e8ea',
  muted: '#9aa1a8',
  teal: '#2dd4bf',
  tealDim: '#0d9488',
  tealFog: 'rgba(45,212,191,0.10)',
};

// The site's own font stacks (src/styles/tokens.ts), minus the custom
// webfont names: resvg's bundled font parser cannot load the project's woff
// files, so it falls through this same list to a real installed monospace
// or sans-serif face. Using the site's own fallback names keeps the card's
// intent (structure in mono, body in sans) even without the exact typeface.
const MONO_STACK = "ui-monospace, 'SF Mono', Menlo, monospace";
const SANS_STACK = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

/**
 * Greedy word-wrap into at most `maxLines` lines, since SVG text does not
 * wrap on its own. The last line absorbs every remaining word once wrapping
 * would otherwise need another line, then gets an ellipsis if that leaves
 * genuine overflow past the per-line budget.
 */
function wrapLines(text, maxCharsPerLine, maxLines) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    if (last.length > maxCharsPerLine - 1) last = last.slice(0, maxCharsPerLine - 1).trimEnd();
    kept[maxLines - 1] = `${last}…`;
    return kept;
  }
  return lines;
}

function cardSvg({ partLabel, numLabel, title, subtitle }) {
  const titleSize = title.length > 40 ? 52 : 60;
  const titleLines = wrapLines(title, Math.floor(1040 / (titleSize * 0.56)), 2);
  const titleStartY = 330 - (titleLines.length - 1) * (titleSize * 0.6);
  const titleTspans = titleLines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : titleSize * 1.18}">${escapeXml(line)}</tspan>`)
    .join('');
  const subtitleY = titleStartY + titleLines.length * titleSize * 1.18 + 22;

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${COLOR.bg}" />
  <rect x="1" y="1" width="${WIDTH - 2}" height="${HEIGHT - 2}" fill="none" stroke="${COLOR.line}" stroke-width="2" />
  <text x="80" y="60" font-family="${MONO_STACK}" font-size="22" fill="${COLOR.teal}">${escapeXml(partLabel)}</text>
  <rect x="80" y="72" width="1040" height="2" fill="${COLOR.teal}" opacity="0.35" />
  <rect x="80" y="96" width="60" height="26" rx="5" fill="${COLOR.tealFog}" stroke="${COLOR.tealDim}" stroke-width="1.5" />
  <text x="93" y="114" font-family="${MONO_STACK}" font-size="16" fill="${COLOR.teal}">${escapeXml(numLabel)}</text>
  <text x="80" y="${titleStartY}" font-family="${SANS_STACK}" font-weight="700" font-size="${titleSize}" fill="${COLOR.text}">${titleTspans}</text>
  <text x="80" y="${subtitleY}" font-family="${SANS_STACK}" font-size="26" fill="${COLOR.muted}">${escapeXml(subtitle)}</text>
  <rect x="80" y="558" width="16" height="16" rx="4" fill="none" stroke="${COLOR.teal}" stroke-width="2" />
  <circle cx="88" cy="566" r="3.5" fill="${COLOR.teal}" />
  <text x="108" y="572" font-family="${MONO_STACK}" font-size="22" fill="${COLOR.teal}">centering</text>
</svg>`;
}

function renderPng(svg) {
  const resvg = new Resvg(svg, { font: { loadSystemFonts: true } });
  return resvg.render().asPng();
}

const { CHAPTERS: chapters } = await import(pathToFileURL(SERVER_ENTRY).href);

mkdirSync(OUT_DIR, { recursive: true });
let written = 0;
for (const chapter of chapters) {
  const svg = cardSvg({
    partLabel: chapter.part,
    numLabel: `§ ${String(chapter.num).padStart(2, '0')}`,
    title: chapter.title,
    subtitle: chapter.subtitle,
  });
  const png = renderPng(svg);
  writeFileSync(path.join(OUT_DIR, `${chapter.slug}.png`), png);
  written += 1;
}

console.log(`build-og-images: wrote ${written} per-chapter cards to public/og/`);
