import type { ChapterModule } from '@/content/loadChapter';

/**
 * Eager chapter modules exist only in the server build. The client keeps using
 * the lazy glob in loadChapter.ts, preserving one bundle per chapter.
 */
const modules = import.meta.glob<ChapterModule>('../content/chapters/*.mdx', {
  eager: true,
});

export const serverChapterModules = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => [`./chapters/${path.split('/').at(-1)}`, module]),
) as Record<string, ChapterModule>;
