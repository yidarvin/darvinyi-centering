#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(ROOT, 'dist');
const SERVER_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const SITE_ORIGIN = (process.env.SITE_ORIGIN ?? 'https://centering.darvinyi.com').replace(/\/$/, '');

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function metadata(pathname) {
  const chapter = chapters.find((entry) => `/${entry.slug}` === pathname);
  if (chapter) return { title: `${chapter.title} · Centering`, description: chapter.blurb, type: 'article', image: `/og/${chapter.slug}.png` };
  const route = routes.find((entry) => `/routes/${entry.id}` === pathname);
  if (route) return { title: `${route.label} · Centering`, description: route.gloss, type: 'website' };

  return pageMetadata[pathname] ?? pageMetadata['/'];
}

function headFor(pathname) {
  const url = `${SITE_ORIGIN}${pathname}`;
  return `<link rel="canonical" href="${escapeHtml(url)}" />\n    <meta property="og:url" content="${escapeHtml(url)}" />`;
}

function documentFor(template, pathname, appHtml) {
  const page = metadata(pathname);
  return template
    .replace('<!--ssr-outlet-->', () => appHtml)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/>/, `<meta property="og:type" content="${page.type}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${escapeHtml(`${SITE_ORIGIN}${page.image ?? '/og-image.png'}`)}" />`)
    .replace(/<meta name="twitter:card" content="[^"]*"\s*\/>/, '<meta name="twitter:card" content="summary_large_image" />')
    .replace('<!--prerender-head-->', () => headFor(pathname));
}

const { render, staticPaths, CHAPTERS: chapters, ROUTES: routes } = await import(pathToFileURL(SERVER_ENTRY).href);
const pageMetadata = {
  '/': { title: 'Centering · the philosophies and practices of calm', description: 'Centering: the philosophies and practices of calm. An interactive textbook on Stoicism, Buddhism, Taoism, Zen, Yoga, the modern clinical methods, and more.', type: 'website' },
  '/glossary': { title: 'Glossary · Centering', description: 'A working glossary of the concepts, traditions, and clinical terms used in Centering.', type: 'website' },
  '/sources': { title: 'Sources · Centering', description: 'Sources and further reading for Centering, collected across every chapter.', type: 'website' },
  '/index': { title: 'A–Z Index · Centering', description: 'An alphabetical index to concepts, people, traditions, and practices in Centering.', type: 'website' },
  '/notebook': { title: 'Saved work · Centering', description: 'Your Centering reflections, exercises, and practice settings, saved only in this browser.', type: 'website' },
};

const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');
for (const pathname of staticPaths()) {
  const appHtml = await render(pathname);
  const destination = pathname === '/' ? path.join(DIST, 'index.html') : path.join(DIST, pathname, 'index.html');
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, documentFor(template, pathname, appHtml), 'utf8');
}

console.log(`prerender: wrote ${staticPaths().length} route documents to dist/`);
