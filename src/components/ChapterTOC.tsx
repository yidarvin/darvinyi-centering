import { useEffect, useState, type RefObject } from 'react';
import { c, mono } from '@/styles/tokens';

interface TocItem {
  id: string;
  label: string;
}

interface ChapterTOCProps {
  /** the element to scan for `h2[id]` headings, i.e. every SectionMarker */
  containerRef: RefObject<HTMLElement>;
  /** re-scan when any of these change (chapter slug, load status) */
  watch: readonly unknown[];
}

const DESKTOP_BREAKPOINT = 1080;

/**
 * A per-chapter table of contents, built by scanning the rendered chapter for
 * `h2[id]` headings rather than duplicating the chapter's section list by
 * hand. The same markup renders two ways by CSS alone: a sticky right rail on
 * a wide viewport, a collapsible disclosure above the chapter on a narrow
 * one. `<details>` gives the collapse behavior natively, keyboard and all, so
 * there is nothing further to wire up for that.
 */
export function ChapterTOC({ containerRef, watch }: ChapterTOCProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [open, setOpen] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT,
  );

  useEffect(() => {
    const root = containerRef.current;
    if (!root) {
      setItems([]);
      return;
    }
    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2[id]'));
    setItems(
      headings.map((h) => ({
        id: h.id,
        label: (h.textContent ?? '').replace(/^\/\/\s*/, ''),
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, watch);

  if (items.length === 0) return null;

  return (
    <details
      className="chapter-toc"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="chapter-toc-summary" style={{ ...mono }}>
        <span aria-hidden="true" style={{ color: c.tealDim }}>
          {'// '}
        </span>
        contents
      </summary>
      <ol className="chapter-toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} style={{ ...mono }}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
