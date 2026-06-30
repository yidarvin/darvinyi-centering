import { mono } from '@/styles/tokens';
import { getRoute, type RouteId } from '@/content/routes';

interface RouteTagsProps {
  /** the routes this chapter leans on */
  routes: RouteId[];
  /** an optional leading label, defaults to "routes" */
  label?: string;
}

/**
 * The small route tags shown near the top of a tradition chapter: which of the
 * seven recurring routes to calm this chapter uses. Colors come from the shared
 * route definition so they stay consistent through to Part III.
 */
export function RouteTags({ routes, label = 'routes' }: RouteTagsProps) {
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
      {routes.map((id) => {
        const route = getRoute(id);
        return (
          <span
            key={id}
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
            }}
          >
            {route.label}
          </span>
        );
      })}
    </div>
  );
}
