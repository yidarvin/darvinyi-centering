import { useContext, useId, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { c, mono } from '@/styles/tokens';
import { GLOSSARY, type GlossaryEntry } from '@/content/glossary';
import { slugify } from '@/lib/slugify';
import { ChapterSlugContext } from '@/lib/chapterSlugContext';

function textOf(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(textOf).join('');
  return '';
}

function findEntry(text: string, chapterSlug: string): GlossaryEntry | undefined {
  const norm = text.trim().toLowerCase().replace(/[.,;:!?]+$/, '');
  return GLOSSARY.find((entry) => {
    if (entry.homeSlug !== chapterSlug) return false;
    if (entry.term.toLowerCase() === norm) return true;
    return (entry.aliases ?? []).some((alias) => alias.toLowerCase() === norm);
  });
}

/**
 * Renders MDX's `*emphasis*` in the house style. When the emphasized text
 * matches a glossary term defined in the chapter currently rendering (via
 * ChapterSlugContext), it becomes a hoverable, keyboard-focusable reference
 * that links to that term's glossary entry; every other italic renders as
 * plain emphasis, unchanged.
 */
export function Term({ children }: { children?: ReactNode }) {
  const chapterSlug = useContext(ChapterSlugContext);
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const entry = chapterSlug ? findEntry(textOf(children), chapterSlug) : undefined;

  if (!entry) {
    return <em style={{ color: c.text, fontStyle: 'italic' }}>{children}</em>;
  }

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={`/glossary#${slugify(entry.term)}`}
        aria-describedby={tooltipId}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        style={{
          fontStyle: 'italic',
          color: c.teal,
          textDecoration: 'none',
          borderBottom: `1px dotted ${c.tealEdge}`,
          cursor: 'help',
        }}
      >
        {children}
      </Link>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            ...mono,
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: 6,
            zIndex: 30,
            width: 240,
            maxWidth: '70vw',
            padding: '9px 11px',
            borderRadius: 9,
            border: `1px solid ${c.tealEdge}`,
            background: c.panel2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            fontStyle: 'normal',
            fontSize: 11.5,
            lineHeight: 1.5,
            color: c.prose,
          }}
        >
          {entry.oneLineDef}
        </span>
      )}
    </span>
  );
}
