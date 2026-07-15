/* eslint-disable react-refresh/only-export-components */
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import { ServerApp } from '@/App';
import { CHAPTERS } from '@/content/chapters';
import { ROUTES } from '@/content/routes';
import { serverChapterModules } from '@/lib/serverChapterModules';

export { CHAPTERS, ROUTES };

/** Render a route after every lazy reference page has resolved. */
export function render(url: string): Promise<string> {
  (globalThis as typeof globalThis & { __centeringServerChapterModules?: typeof serverChapterModules }).__centeringServerChapterModules = serverChapterModules;
  return new Promise((resolve, reject) => {
    let html = '';
    let didError = false;
    const output = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    output.on('finish', () => (didError ? reject(new Error(`Could not render ${url}`)) : resolve(html)));

    const { pipe } = renderToPipeableStream(<ServerApp url={url} />, {
      onAllReady() {
        pipe(output);
      },
      onError(error) {
        didError = true;
        console.error(error);
      },
      onShellError: reject,
    });
  });
}

/** Every public page whose content can be known at build time. */
export function staticPaths(): string[] {
  return [
    '/',
    '/glossary',
    '/sources',
    '/index',
    ...CHAPTERS.map((chapter) => `/${chapter.slug}`),
    ...ROUTES.map((route) => `/routes/${route.id}`),
  ];
}
