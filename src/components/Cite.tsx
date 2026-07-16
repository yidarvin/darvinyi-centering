import { useId, useState } from 'react';
import { c, mono } from '@/styles/tokens';
import { sourceIdFor } from '@/lib/bibliography';

interface CiteProps {
  /** the URL of the source this claim rests on, matching one entry in this chapter's `sources` array */
  url: string;
  /** a short label for the marker and its tooltip, for example "Goyal et al. 2014" */
  label: string;
}

/**
 * An inline marker placed right after a specific numeric or graded claim,
 * deep-linking to that claim's entry in this chapter's own Sources list below.
 * Reuses sourceIdFor, the same anchor id Sources.tsx and the bibliography page
 * already compute, so there is only one id scheme to keep in sync. A plain
 * anchor, not a router Link: this is a same-page fragment jump to content
 * already mounted, so native browser scroll handles it without help.
 */
export function Cite({ url, label }: CiteProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const id = sourceIdFor({ text: '', url });

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={`#${id}`}
        aria-describedby={tooltipId}
        aria-label={`source: ${label}`}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        style={{
          ...mono,
          fontSize: 10,
          verticalAlign: 'super',
          lineHeight: 1,
          color: c.tealDim,
          textDecoration: 'none',
          borderBottom: `1px dotted ${c.tealEdge}`,
          cursor: 'help',
          marginLeft: 1,
        }}
      >
        [{label}]
      </a>
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
            width: 200,
            maxWidth: '70vw',
            padding: '9px 11px',
            borderRadius: 9,
            border: `1px solid ${c.tealEdge}`,
            background: c.panel2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            fontStyle: 'normal',
            fontSize: 11,
            lineHeight: 1.5,
            color: c.prose,
          }}
        >
          jump to {label} in this chapter's sources
        </span>
      )}
    </span>
  );
}
