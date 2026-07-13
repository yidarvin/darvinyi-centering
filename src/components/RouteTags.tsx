import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mono } from '@/styles/tokens';
import { getRoute, type RouteId } from '@/content/routes';
import { getChapter } from '@/content/chapters';
import { ChapterSlugContext } from '@/lib/chapterSlugContext';

interface RouteTagsProps {
  /** the routes this chapter leans on. Omit to resolve from the chapter manifest (the usual case). */
  routes?: RouteId[];
  /** an optional leading label, defaults to "routes" */
  label?: string;
}

/**
 * The small route tags shown near the top of a tradition chapter: which of the
 * seven recurring routes to calm this chapter uses, each clickable through to
 * that route's browse page. Colors come from the shared route definition so
 * they stay consistent through to Part III. Most chapters call this with no
 * `routes` prop at all; it resolves the chapter's routes from the manifest
 * (src/content/chapters.ts), the single source of truth. Pass `routes`
 * explicitly only for a bespoke display, such as listing all seven under a
 * custom label.
 */
export function RouteTags({ routes, label = 'routes' }: RouteTagsProps) {
  const chapterSlug = useContext(ChapterSlugContext);
  const resolved = routes ?? getChapter(chapterSlug)?.routes ?? [];

  if (resolved.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        margin: '0 0 28px',
      }}
    >
      <span style={{ ...mono, fontSize: 11, color: 'var(--faint, #5f666d)' }}>{label}:</span>
      {resolved.map((id) => {
        const route = getRoute(id);
        return (
          <Link
            key={id}
            to={`/routes/${id}`}
            title={route.gloss}
            style={{
              ...mono,
              fontSize: 11,
              color: route.color,
              border: `1px solid ${route.color}66`,
              background: `${route.color}14`,
              borderRadius: 6,
              padding: '3px 8px',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
            }}
          >
            {route.label}
          </Link>
        );
      })}
    </div>
  );
}
