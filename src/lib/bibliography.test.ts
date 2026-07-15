import { describe, expect, it } from 'vitest';
import { buildBibliography, filterBibliography } from '@/lib/bibliography';

describe('bibliography data', () => {
  it('groups a repeated source under a stable anchor and preserves every chapter back-link', () => {
    const entries = buildBibliography([
      { slug: 'calm-abiding', title: 'Buddhism: Calm Abiding', sources: [{ text: 'Bhikkhu Bodhi. The Connected Discourses of the Buddha (2000).', url: 'https://example.org/bodhi' }] },
      { slug: 'the-ordinary-mind', title: 'Zen: The Ordinary Mind', sources: [{ text: 'Bodhi, Connected Discourses.', url: 'https://example.org/bodhi/' }] },
    ]);

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      id: 'source-m49j6x',
      author: 'Bhikkhu Bodhi',
      year: 2000,
      chapters: [
        { slug: 'calm-abiding' },
        { slug: 'the-ordinary-mind' },
      ],
    });
  });
});

describe('bibliography filters', () => {
  it('combines author text, chapter, type, and year constraints', () => {
    const entries = buildBibliography([
      { slug: 'calm-abiding', title: 'Buddhism: Calm Abiding', sources: [{ text: 'Bhikkhu Bodhi. The Connected Discourses of the Buddha (2000).', url: 'https://example.org/bodhi' }] },
      { slug: 'the-quiet-mind', title: 'The Quiet Mind', sources: [{ text: 'A. Researcher, Journal of Attention (2024).', url: 'https://example.org/article' }] },
    ]);

    expect(filterBibliography(entries, { query: 'researcher', chapter: 'the-quiet-mind', sourceType: 'article', year: 2024 })).toMatchObject([
      { author: 'A', year: 2024, chapters: [{ slug: 'the-quiet-mind' }] },
    ]);
  });
});
