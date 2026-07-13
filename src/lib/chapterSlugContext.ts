import { createContext } from 'react';

/**
 * The slug of the chapter currently rendering its MDX content, so components
 * inside that content (like Term) can look up chapter-scoped data without
 * threading it through MDX's own prop chain.
 */
export const ChapterSlugContext = createContext<string>('');
