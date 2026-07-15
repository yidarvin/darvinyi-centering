import type { Source } from '@/components/Sources';

export interface ChapterSourceData {
  slug: string;
  title: string;
  sources: Source[];
}

export interface BibliographyEntry extends Source {
  id: string;
  chapters: { slug: string; title: string }[];
  author: string;
  year?: number;
  sourceType: 'primary' | 'scholarship' | 'article' | 'web';
}

export interface BibliographyFilters {
  query?: string;
  chapter?: string;
  sourceType?: BibliographyEntry['sourceType'];
  year?: number;
}

export function filterBibliography(entries: BibliographyEntry[], filters: BibliographyFilters): BibliographyEntry[] {
  const query = filters.query?.trim().toLowerCase();
  return entries.filter((entry) => {
    if (query && !`${entry.author} ${entry.text}`.toLowerCase().includes(query)) return false;
    if (filters.chapter && !entry.chapters.some((chapter) => chapter.slug === filters.chapter)) return false;
    if (filters.sourceType && entry.sourceType !== filters.sourceType) return false;
    if (filters.year && entry.year !== filters.year) return false;
    return true;
  });
}

function normalizedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    parsed.hostname = parsed.hostname.replace(/^www\./, '');
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return url.trim().replace(/\/$/, '');
  }
}

function normalizedText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function hash(value: string): string {
  let current = 2166136261;
  for (const character of value) {
    current ^= character.charCodeAt(0);
    current = Math.imul(current, 16777619);
  }
  return (current >>> 0).toString(36);
}

export function sourceIdFor(source: Source): string {
  return `source-${hash(source.url ? normalizedUrl(source.url) : normalizedText(source.text))}`;
}

function sourceType(source: Source): BibliographyEntry['sourceType'] {
  const value = `${source.text} ${source.url ?? ''}`.toLowerCase();
  if (/suttacentral|accesstoinsight|dhammatalks|sutta|dhammapada|enchiridion|tao te ching|bhagavad gita|yoga sutra/.test(value)) return 'primary';
  if (/journal|review|meta-analysis|proceedings|psychological bulletin|pnas|nature/.test(value)) return 'article';
  if (/stanford encyclopedia|internet encyclopedia|university press|press|oxford|cambridge/.test(value)) return 'scholarship';
  return 'web';
}

function authorFor(text: string): string {
  const candidate = text.split(/[.:([]/, 1)[0]?.trim() ?? '';
  return candidate || 'Unattributed';
}

function yearFor(text: string): number | undefined {
  const match = text.match(/\b(1[89]\d{2}|20\d{2})\b/);
  return match ? Number(match[1]) : undefined;
}

export function buildBibliography(chapters: ChapterSourceData[]): BibliographyEntry[] {
  const entries = new Map<string, BibliographyEntry>();
  for (const chapter of chapters) {
    for (const source of chapter.sources) {
      const key = source.url ? normalizedUrl(source.url) : normalizedText(source.text);
      const existing = entries.get(key);
      if (existing) {
        if (!existing.chapters.some((item) => item.slug === chapter.slug)) {
          existing.chapters.push({ slug: chapter.slug, title: chapter.title });
        }
        continue;
      }
      entries.set(key, {
        ...source,
        id: sourceIdFor(source),
        author: authorFor(source.text),
        year: yearFor(source.text),
        sourceType: sourceType(source),
        chapters: [{ slug: chapter.slug, title: chapter.title }],
      });
    }
  }
  return Array.from(entries.values()).sort((a, b) => a.author.localeCompare(b.author) || a.text.localeCompare(b.text));
}
