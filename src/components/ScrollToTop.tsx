import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll to the top of the page on every route change, except when the new
 * URL carries a hash: a section anchor from a cross-reference or a search
 * result. In that case ChapterPage's own effect scrolls to the target once
 * the chapter's content has loaded, and resetting to the top first would
 * just be a visible flash before that jump.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
