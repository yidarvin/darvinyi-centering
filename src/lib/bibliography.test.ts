import { describe, expect, it } from 'vitest';
import { buildBibliography } from '@/lib/bibliography';

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
