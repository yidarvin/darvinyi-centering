import type { ComponentType } from 'react';

export interface ChapterModule {
  default: ComponentType;
  /** the per-chapter reflection block, rendered by the layout */
  reflection?: { path: string; prompt: string; id?: string };
  /** the per-chapter Sources list, rendered by the layout */
  sources?: { text: string; url?: string }[];
}

// lazy, code-split loaders for every chapter MDX file present in the repo
const modules = import.meta.glob('./chapters/*.mdx');

/** the loader for a chapter, or null if its MDX has not been written yet */
export function getChapterLoader(slug: string): (() => Promise<ChapterModule>) | null {
  const path = `./chapters/${slug}.mdx`;
  const loader = modules[path] as (() => Promise<ChapterModule>) | undefined;
  return loader ?? null;
}

/** The already-loaded module used only while generating static HTML in Node. */
export function getServerChapterModule(slug: string): ChapterModule | null {
  if (!import.meta.env.SSR) return null;
  const registry = (globalThis as typeof globalThis & {
    __centeringServerChapterModules?: Record<string, ChapterModule>;
  }).__centeringServerChapterModules;
  return registry?.[`./chapters/${slug}.mdx`] ?? null;
}
