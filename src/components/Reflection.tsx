import { c, mono } from '@/styles/tokens';
import { useLocalStorage } from '@/lib/useLocalStorage';

interface ReflectionProps {
  /** the chapter slug, used to namespace the saved answer */
  chapterSlug: string;
  /** the terminal path, for example "~/centering/00.1" */
  path: string;
  /** the one good question */
  prompt: string;
  /** a stable id if a chapter has more than one reflection */
  id?: string;
}

/**
 * The terminal-styled reflection block: a pathed header, a prompt line with a
 * blinking cursor, and a saved text area. One good question per chapter.
 */
export function Reflection({ chapterSlug, path, prompt, id = 'reflection' }: ReflectionProps) {
  const [value, setValue] = useLocalStorage<string>(`centering:reflect:${chapterSlug}:${id}`, '');

  return (
    <div
      style={{
        border: `1px solid ${c.line2}`,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 44,
      }}
    >
      <div
        style={{
          ...mono,
          fontSize: 11.5,
          color: c.faint,
          padding: '10px 14px',
          borderBottom: `1px solid ${c.line}`,
          background: c.panel,
        }}
      >
        {path} · reflection.md
      </div>
      <div style={{ padding: '16px 14px 18px', background: c.bg }}>
        <label
          htmlFor={`reflect-${chapterSlug}-${id}`}
          style={{ ...mono, fontSize: 13, color: c.teal, marginBottom: 10, display: 'block' }}
        >
          <span style={{ color: c.faint }}>&gt;</span> {prompt}
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              width: 7,
              height: '1.05em',
              verticalAlign: 'text-bottom',
              background: c.teal,
              marginLeft: 5,
              animation: 'blink 1.1s step-start infinite',
            }}
          />
        </label>
        <textarea
          id={`reflect-${chapterSlug}-${id}`}
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type here…"
          style={{
            ...mono,
            width: '100%',
            boxSizing: 'border-box',
            resize: 'vertical',
            background: c.panel,
            color: c.text,
            border: `1px solid ${c.line}`,
            borderRadius: 8,
            padding: '11px 12px',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        />
      </div>
    </div>
  );
}
