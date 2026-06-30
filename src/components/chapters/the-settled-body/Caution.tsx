import type { ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';
import { c, mono } from '@/styles/tokens';

/**
 * A small amber safety note, reused by the pacer and the exercises. Breathwork is
 * low-risk done gently, but the honest floor (do not force the breath, stop if
 * lightheaded) belongs next to anything that asks the reader to breathe on a count.
 */
export function Caution({ title = 'before you start', children }: { title?: string; children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 11,
        alignItems: 'flex-start',
        border: `1px solid ${c.amberEdge}`,
        background: c.amberFog,
        borderRadius: 11,
        padding: '13px 15px',
        margin: '0 0 28px',
      }}
    >
      <ShieldAlert size={17} color={c.amber} style={{ marginTop: 2, flexShrink: 0 }} />
      <div>
        <div style={{ ...mono, fontSize: 11, color: c.amber, letterSpacing: '.04em', marginBottom: 5 }}>
          {title}
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.62, color: c.prose }}>{children}</div>
      </div>
    </div>
  );
}
