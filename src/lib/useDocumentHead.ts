import { useEffect } from 'react';

interface HeadOptions {
  /** the page's own title, without the site suffix */
  title: string;
  description: string;
  /** the route path, e.g. "/tranquility-by-judgment" */
  path: string;
}

const SITE_NAME = 'Centering';
const DEFAULT_TITLE = 'Centering · the philosophies and practices of calm';
const DEFAULT_DESCRIPTION =
  'Centering: the philosophies and practices of calm. An interactive textbook on Stoicism, Buddhism, Taoism, Zen, Yoga, the modern clinical methods, and more.';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets this route's title, description, canonical link, and Open Graph tags,
 * and restores the site's defaults on unmount. Static builds write matching
 * metadata into each route document in scripts/prerender.mjs.
 */
export function useDocumentHead({ title, description, path }: HeadOptions) {
  useEffect(() => {
    if (!title) return;
    const fullTitle = `${title} · ${SITE_NAME}`;
    const url = `${window.location.origin}${path}`;
    const image = `${window.location.origin}/og-image.png`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setCanonical(url);

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('name', 'description', DEFAULT_DESCRIPTION);
      setMeta('property', 'og:title', DEFAULT_TITLE);
      setMeta('property', 'og:description', DEFAULT_DESCRIPTION);
      setCanonical(`${window.location.origin}/`);
    };
  }, [title, description, path]);
}
