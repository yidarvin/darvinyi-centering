import { describe, expect, it } from 'vitest';
import { CHAPTERS, chapterNeighbors, chaptersByPart, getChapter } from '@/content/chapters';

describe('chapter manifest', () => {
  it('resolves every published slug and no unknown slug', () => {
    for (const chapter of CHAPTERS) {
      expect(getChapter(chapter.slug)).toEqual(chapter);
    }
    expect(getChapter('not-a-real-chapter')).toBeUndefined();
  });

  it('keeps the book ordered and gives interior chapters both neighbors', () => {
    expect(CHAPTERS.map((chapter) => chapter.num)).toEqual(Array.from({ length: 19 }, (_, index) => index));
    expect(chapterNeighbors('calm-abiding')).toMatchObject({
      prev: { slug: 'enough-and-no-fear' },
      next: { slug: 'the-ordinary-mind' },
    });
    expect(chaptersByPart().flatMap((group) => group.chapters)).toEqual(CHAPTERS);
  });
});
