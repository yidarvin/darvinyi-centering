#!/usr/bin/env node
/**
 * Writes public/sitemap.xml and public/robots.txt from src/content/chapters.ts
 * and src/content/routes.ts. Plain Node, no TypeScript loader, so both are
 * parsed as text the same way scripts/build-search-index.mjs parses
 * chapters.ts; keep the two scripts' parsing in sync if either file's format
 * changes.
 *
 * SITE_ORIGIN can override the canonical domain for a preview or future
 * migration. Local and production builds otherwise use the known public domain
 * so that generated metadata never contains a placeholder or deployment origin.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CHAPTERS_TS = path.join(ROOT, 'src/content/chapters.ts');
const ROUTES_TS = path.join(ROOT, 'src/content/routes.ts');
const PUBLIC_DIR = path.join(ROOT, 'public');

const SITE_ORIGIN = process.env.SITE_ORIGIN ?? 'https://centering.darvinyi.com';

function parseChapterSlugs() {
  const src = readFileSync(CHAPTERS_TS, 'utf8');
  const slugRe = /slug:\s*'([^']*)'/g;
  const slugs = [];
  let m;
  while ((m = slugRe.exec(src))) slugs.push(m[1]);
  if (slugs.length === 0) {
    throw new Error('build-sitemap: parsed zero chapter slugs from chapters.ts; its format may have changed');
  }
  return slugs;
}

function parseRouteIds() {
  const src = readFileSync(ROUTES_TS, 'utf8');
  const idRe = /id:\s*'([^']*)'/g;
  const ids = [];
  let m;
  while ((m = idRe.exec(src))) ids.push(m[1]);
  if (ids.length === 0) {
    throw new Error('build-sitemap: parsed zero route ids from routes.ts; its format may have changed');
  }
  return ids;
}

function buildSitemap(paths) {
  const urls = paths
    .map((p) => `  <url><loc>${SITE_ORIGIN}${p}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots() {
  return `User-agent: *\nAllow: /\nDisallow: /search\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

const chapterPaths = parseChapterSlugs().map((slug) => `/${slug}`);
const routePaths = parseRouteIds().map((id) => `/routes/${id}`);
const paths = ['/', '/glossary', '/sources', '/index', '/notebook', ...chapterPaths, ...routePaths];

mkdirSync(PUBLIC_DIR, { recursive: true });
writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemap(paths), 'utf8');
writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), buildRobots(), 'utf8');
console.log(`build-sitemap: wrote sitemap.xml (${paths.length} urls) and robots.txt to public/`);
