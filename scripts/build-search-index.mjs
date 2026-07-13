#!/usr/bin/env node
/**
 * Builds src/content/searchIndex.json: one document per chapter section,
 * keyed to the same anchor ids SectionMarker derives at runtime (src/lib/
 * slugify.ts), stripped of MDX/JSX markup down to plain prose.
 *
 * Plain Node, no TypeScript loader, so chapter metadata (part/title/num) is
 * parsed as text from chapters.ts rather than imported. PART_LABELS mirrors
 * that file's own PART map; keep the two in sync if it changes.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CHAPTERS_DIR = path.join(ROOT, 'src/content/chapters');
const CHAPTERS_TS = path.join(ROOT, 'src/content/chapters.ts');
const OUT_FILE = path.join(ROOT, 'src/content/searchIndex.json');

const PART_LABELS = {
  start: 'Start Here',
  one: 'Part I · The Nature of Calm',
  two: 'Part II · The Traditions',
  three: 'Part III · The Common Routes',
  four: 'Part IV · A Life of Calm',
};

/** mirrors src/lib/slugify.ts exactly; anchors must match what SectionMarker renders */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseChapters() {
  const src = readFileSync(CHAPTERS_TS, 'utf8');
  const rowRe =
    /\{\s*num:\s*(\d+),\s*part:\s*PART\.(\w+),\s*title:\s*(?:'([^']*)'|"([^"]*)")\s*,\s*slug:\s*'([^']*)'/g;
  const chapters = [];
  let m;
  while ((m = rowRe.exec(src))) {
    const [, num, partKey, titleSingle, titleDouble, slug] = m;
    const title = titleSingle ?? titleDouble;
    const part = PART_LABELS[partKey];
    if (!part) {
      throw new Error(`build-search-index: unknown PART key "${partKey}" for chapter "${slug}"`);
    }
    chapters.push({ num: Number(num), part, title, slug });
  }
  if (chapters.length === 0) {
    throw new Error('build-search-index: parsed zero chapters from chapters.ts; its format may have changed');
  }
  return chapters;
}

/** Strips `export const NAME = <object-or-array>;` blocks by tracking bracket depth. */
function stripExports(src) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    if (src.startsWith('export const', i)) {
      const eqIdx = src.indexOf('=', i);
      if (eqIdx !== -1) {
        let j = eqIdx + 1;
        while (j < src.length && /\s/.test(src[j])) j++;
        if (src[j] === '{' || src[j] === '[') {
          const open = src[j];
          const close = open === '{' ? '}' : ']';
          let depth = 0;
          let k = j;
          for (; k < src.length; k++) {
            if (src[k] === open) depth++;
            else if (src[k] === close) {
              depth--;
              if (depth === 0) {
                k++;
                break;
              }
            }
          }
          while (k < src.length && (src[k] === ';' || /\s/.test(src[k]))) k++;
          i = k;
          continue;
        }
      }
    }
    out += src[i];
    i++;
  }
  return out;
}

function stripImports(src) {
  return src.replace(/^import .*$/gm, '');
}

function cleanText(chunk) {
  return chunk
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSections(prose) {
  const sectionRe = /<SectionMarker>([^<]+)<\/SectionMarker>/g;
  const matches = [...prose.matchAll(sectionRe)];
  const sections = [];

  const introEnd = matches.length > 0 ? matches[0].index : prose.length;
  const introText = cleanText(prose.slice(0, introEnd));
  if (introText) sections.push({ anchor: null, title: null, text: introText });

  for (let idx = 0; idx < matches.length; idx++) {
    const m = matches[idx];
    const title = m[1].trim();
    const start = m.index + m[0].length;
    const end = idx + 1 < matches.length ? matches[idx + 1].index : prose.length;
    const text = cleanText(prose.slice(start, end));
    if (text) sections.push({ anchor: slugify(title), title, text });
  }
  return sections;
}

function buildIndex() {
  const chapters = parseChapters();
  const docs = [];
  let id = 0;

  for (const chapter of chapters) {
    const mdxPath = path.join(CHAPTERS_DIR, `${chapter.slug}.mdx`);
    let raw;
    try {
      raw = readFileSync(mdxPath, 'utf8');
    } catch {
      continue; // chapter not yet written
    }
    const withoutImports = stripImports(raw);
    const withoutExports = stripExports(withoutImports);
    const sections = extractSections(withoutExports);

    for (const section of sections) {
      docs.push({
        id: id++,
        chapterSlug: chapter.slug,
        chapterTitle: chapter.title,
        part: chapter.part,
        num: chapter.num,
        sectionTitle: section.title,
        anchor: section.anchor,
        text: section.text,
      });
    }
  }

  return docs;
}

const docs = buildIndex();
writeFileSync(OUT_FILE, JSON.stringify(docs), 'utf8');
console.log(`build-search-index: wrote ${docs.length} section documents to ${path.relative(ROOT, OUT_FILE)}`);
