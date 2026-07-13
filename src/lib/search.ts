import MiniSearch from 'minisearch';
import searchIndexData from '@/content/searchIndex.json';

interface SearchDoc {
  id: number;
  chapterSlug: string;
  chapterTitle: string;
  part: string;
  num: number;
  sectionTitle: string | null;
  anchor: string | null;
  text: string;
}

export interface SearchHit {
  id: number;
  chapterSlug: string;
  chapterTitle: string;
  sectionTitle: string | null;
  anchor: string | null;
  /** a snippet of the section's prose, centered on the first matched term */
  snippet: string;
}

const docs = searchIndexData as SearchDoc[];

const index = new MiniSearch<SearchDoc>({
  idField: 'id',
  fields: ['sectionTitle', 'chapterTitle', 'text'],
  storeFields: ['chapterSlug', 'chapterTitle', 'sectionTitle', 'anchor', 'text'],
  searchOptions: {
    boost: { sectionTitle: 3, chapterTitle: 2, text: 1 },
    fuzzy: 0.2,
    prefix: true,
  },
});
index.addAll(docs);

function snippetAround(text: string, query: string, radius = 90): string {
  const lower = text.toLowerCase();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  let hitIndex = -1;
  for (const term of terms) {
    const idx = lower.indexOf(term);
    if (idx !== -1 && (hitIndex === -1 || idx < hitIndex)) hitIndex = idx;
  }
  if (hitIndex === -1) {
    return text.length > radius * 2 ? `${text.slice(0, radius * 2).trim()}…` : text;
  }
  const start = Math.max(0, hitIndex - radius);
  const end = Math.min(text.length, hitIndex + radius);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

/** Searches the book's per-section index. Empty query returns no results. */
export function search(query: string, limit = 20): SearchHit[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  return index
    .search(trimmed)
    .slice(0, limit)
    .map((hit) => ({
      id: hit.id as number,
      chapterSlug: hit.chapterSlug as string,
      chapterTitle: hit.chapterTitle as string,
      sectionTitle: (hit.sectionTitle as string | null) ?? null,
      anchor: (hit.anchor as string | null) ?? null,
      snippet: snippetAround(hit.text as string, trimmed),
    }));
}
