import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import cytoscape, { type Core, type ElementDefinition } from 'cytoscape';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import {
  ROUTES,
  TRADITIONS,
  getRoute,
  getTradition,
  routeBreadth,
  type RouteId,
  type TraditionId,
} from './convergence';

/**
 * widget_14.1, the convergence explorer. The graph-viz payoff of Part III. Ten
 * traditions and seven routes drawn as one network around a single calm center,
 * built with Cytoscape. Pick a route and every door that opens onto it lights up,
 * each tradition named in its own words. Pick a tradition and the routes it walks
 * light up instead. The felt point is the chapter's thesis in one gesture: strip
 * the worldviews and the same handful of moves keep reappearing, named
 * differently each time. The graph is the picture; the chips below it are the
 * keyboard-operable controls; the inspector is where the names live.
 *
 * The whole thing reads off convergence.ts, the same data as fig_14.1, so the
 * figure and the widget can never disagree, and every edge matches the RouteTags
 * its tradition's chapter declared back in Part II.
 */

type Selection =
  | { kind: 'route'; id: RouteId }
  | { kind: 'tradition'; id: TraditionId }
  | { kind: 'calm' }
  | null;

const CENTER = { x: 300, y: 300 };
const R_ROUTE = 138;
const R_TRAD = 268;

function buildElements(): ElementDefinition[] {
  const els: ElementDefinition[] = [];

  els.push({ data: { id: 'calm', label: 'calm', type: 'calm' }, position: { ...CENTER } });

  ROUTES.forEach((route, i) => {
    const a = (-90 + (360 / ROUTES.length) * i) * (Math.PI / 180);
    els.push({
      data: {
        id: `r:${route.id}`,
        label: route.label,
        type: 'route',
        color: route.color,
        breadth: routeBreadth(route.id),
      },
      position: { x: CENTER.x + R_ROUTE * Math.cos(a), y: CENTER.y + R_ROUTE * Math.sin(a) },
    });
    els.push({
      data: { id: `spine:${route.id}`, source: `r:${route.id}`, target: 'calm', type: 'spine' },
    });
  });

  TRADITIONS.forEach((t, i) => {
    const a = (-90 + (360 / TRADITIONS.length) * i + 8) * (Math.PI / 180);
    els.push({
      data: { id: `t:${t.id}`, label: t.short, type: 'tradition' },
      position: { x: CENTER.x + R_TRAD * Math.cos(a), y: CENTER.y + R_TRAD * Math.sin(a) },
    });
    t.cells.forEach((cell) => {
      els.push({
        data: {
          id: `e:${t.id}:${cell.route}`,
          source: `t:${t.id}`,
          target: `r:${cell.route}`,
          color: getRoute(cell.route).color,
          soft: cell.soft ? 1 : 0,
          type: 'link',
        },
      });
    });
  });

  return els;
}

function stylesheet(reduced: boolean): cytoscape.StylesheetJson {
  const dur = reduced ? 0 : 0.22;
  return [
    {
      selector: 'node',
      style: {
        'font-family': mono.fontFamily,
        'transition-property': 'opacity, border-width, background-opacity',
        'transition-duration': dur,
      },
    },
    {
      selector: 'node[type = "calm"]',
      style: {
        label: 'data(label)',
        width: 46,
        height: 46,
        'background-color': c.teal,
        'background-opacity': 0.12,
        'border-color': c.teal,
        'border-width': 2,
        'text-valign': 'center',
        'text-halign': 'center',
        color: c.teal,
        'font-size': 12,
        'font-weight': 600,
      },
    },
    {
      selector: 'node[type = "route"]',
      style: {
        label: 'data(label)',
        width: 'mapData(breadth, 1, 8, 34, 60)',
        height: 'mapData(breadth, 1, 8, 34, 60)',
        'background-color': 'data(color)',
        'background-opacity': 0.16,
        'border-color': 'data(color)',
        'border-width': 2,
        'text-valign': 'center',
        'text-halign': 'center',
        color: c.text,
        'font-size': 10.5,
        'text-wrap': 'wrap',
        'text-max-width': '64px',
        'text-outline-color': c.bg,
        'text-outline-width': 2,
      },
    },
    {
      selector: 'node[type = "tradition"]',
      style: {
        label: 'data(label)',
        width: 16,
        height: 16,
        'background-color': c.panel2,
        'border-color': c.faint,
        'border-width': 1.5,
        shape: 'round-rectangle',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 5,
        color: c.muted,
        'font-size': 10.5,
        'text-wrap': 'wrap',
        'text-max-width': '78px',
        'text-outline-color': c.bg,
        'text-outline-width': 2,
      },
    },
    {
      selector: 'edge',
      style: {
        width: 1.2,
        'curve-style': 'straight',
        'line-color': 'data(color)',
        opacity: 0.4,
        'transition-property': 'opacity, width',
        'transition-duration': dur,
      },
    },
    {
      selector: 'edge[type = "spine"]',
      style: { 'line-color': c.teal, width: 1, opacity: 0.18 },
    },
    { selector: 'edge[soft = 1]', style: { 'line-style': 'dashed', opacity: 0.22 } },
    { selector: '.faded', style: { opacity: 0.07 } },
    { selector: 'node.faded', style: { opacity: 0.1 } },
    { selector: 'edge.hl', style: { opacity: 0.95, width: 2.2 } },
    {
      selector: 'node.hl',
      style: { opacity: 1, 'background-opacity': 0.28, 'border-width': 2.5 },
    },
    { selector: 'node.sel', style: { opacity: 1, 'border-width': 3.5, 'background-opacity': 0.34 } },
  ];
}

function applyHighlight(cy: Core, sel: Selection) {
  cy.batch(() => {
    const all = cy.elements();
    all.removeClass('faded hl sel');
    if (!sel) return;

    if (sel.kind === 'calm') {
      all.addClass('faded');
      cy.$id('calm').removeClass('faded').addClass('sel');
      cy.edges('[type = "spine"]').removeClass('faded').addClass('hl');
      cy.nodes('[type = "route"]').removeClass('faded').addClass('hl');
      return;
    }

    all.addClass('faded');
    const node = cy.$id(sel.kind === 'route' ? `r:${sel.id}` : `t:${sel.id}`);
    node.removeClass('faded').addClass('sel');
    const edges = node.connectedEdges('[type = "link"]');
    edges.removeClass('faded').addClass('hl');
    edges.connectedNodes().removeClass('faded').addClass('hl');
    node.removeClass('hl'); // keep the selected node on .sel, not .hl
  });
}

export function ConvergenceExplorer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);
  const selRef = useRef<Selection>(null);
  const [sel, setSel] = useState<Selection>(null);
  const elements = useMemo(buildElements, []);

  const reduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // keep a ref in sync so the cytoscape tap handler reads current selection
  useEffect(() => {
    selRef.current = sel;
  }, [sel]);

  // mount cytoscape once
  useEffect(() => {
    if (!containerRef.current) return;
    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: stylesheet(reduced),
      layout: { name: 'preset' },
      userZoomingEnabled: false,
      userPanningEnabled: false,
      boxSelectionEnabled: false,
      autounselectify: true,
      autoungrabify: true,
      minZoom: 0.2,
      maxZoom: 2,
    });
    cyRef.current = cy;
    cy.fit(undefined, 36);

    cy.on('tap', 'node', (evt) => {
      const n = evt.target;
      const type = n.data('type') as string;
      const raw = n.id();
      if (type === 'calm') setSel((s) => (s?.kind === 'calm' ? null : { kind: 'calm' }));
      else if (type === 'route') {
        const id = raw.slice(2) as RouteId;
        setSel((s) => (s?.kind === 'route' && s.id === id ? null : { kind: 'route', id }));
      } else if (type === 'tradition') {
        const id = raw.slice(2) as TraditionId;
        setSel((s) => (s?.kind === 'tradition' && s.id === id ? null : { kind: 'tradition', id }));
      }
    });
    cy.on('tap', (evt) => {
      if (evt.target === cy) setSel(null);
    });

    // keep the graph fitted to its container across viewport and column changes.
    // a ResizeObserver and a window listener cover live resizes. the watchdog
    // self-heals the lazy-loaded mount, where the container can report zero width
    // for a beat: it refits until the canvas matches the container, then stops, so
    // the graph never gets stranded at a stale or zero size.
    const refit = () => {
      const el = containerRef.current;
      if (!el || el.clientWidth < 2 || el.clientHeight < 2) return;
      cy.resize();
      cy.fit(undefined, 36);
    };
    const ro = new ResizeObserver(refit);
    ro.observe(containerRef.current);
    window.addEventListener('resize', refit);

    let ticks = 0;
    const watchdog = window.setInterval(() => {
      const el = containerRef.current;
      const cv = el?.querySelector('canvas');
      if (el && el.clientWidth >= 2 && cv) {
        const drawn = parseFloat(getComputedStyle(cv).width) || 0;
        if (Math.abs(drawn - el.clientWidth) > 2) refit();
        else window.clearInterval(watchdog);
      }
      if (++ticks > 24) window.clearInterval(watchdog);
    }, 250);

    return () => {
      window.clearInterval(watchdog);
      window.removeEventListener('resize', refit);
      ro.disconnect();
      cy.destroy();
      cyRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reflect the selection into the graph
  useEffect(() => {
    if (cyRef.current) applyHighlight(cyRef.current, sel);
  }, [sel]);

  const reset = () => setSel(null);

  return (
    <WidgetShell
      id="14.1"
      name="convergence_explorer"
      title="Ten traditions, seven routes, one calm"
      legend={
        <span style={{ ...mono, fontSize: 11, color: c.faint }}>
          pick a <span style={{ color: c.teal }}>route</span> or a{' '}
          <span style={{ color: c.muted }}>tradition</span>
        </span>
      }
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 11.5, color: sel ? c.teal : c.faint }}>
            {sel === null
              ? '28 doors · 7 routes · 10 traditions'
              : sel.kind === 'route'
                ? `route: ${getRoute(sel.id).label} · ${routeBreadth(sel.id)} traditions`
                : sel.kind === 'tradition'
                  ? `tradition: ${getTradition(sel.id).label}`
                  : 'all roads, one center'}
          </span>
          <button
            type="button"
            onClick={reset}
            style={{
              ...mono,
              fontSize: 12,
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${c.line2}`,
              background: 'transparent',
              color: c.muted,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <RotateCcw size={12} /> show all
          </button>
        </div>
      }
    >
      {/* the graph: a faint teal glow at the center marks the one calm all routes run to */}
      <div
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(45,212,191,0.07), ${c.bg} 60%)`,
          borderBottom: `1px solid ${c.line}`,
        }}
      >
        <div
          ref={containerRef}
          role="img"
          aria-label="A network of seven routes to calm and ten traditions around a single calm center. Use the route and tradition buttons below to explore which traditions walk each route."
          style={{ width: '100%', height: 'clamp(290px, 68vw, 400px)' }}
        />
      </div>

      {/* keyboard-operable controls: the accessible path to the same selection */}
      <div style={{ padding: '14px 16px 4px' }}>
        <ChipRow label="routes">
          {ROUTES.map((r) => {
            const on = sel?.kind === 'route' && sel.id === r.id;
            return (
              <Chip
                key={r.id}
                color={r.color}
                active={on}
                onClick={() => setSel(on ? null : { kind: 'route', id: r.id })}
              >
                {r.label}
                <span style={{ opacity: 0.6, marginLeft: 5 }}>{routeBreadth(r.id)}</span>
              </Chip>
            );
          })}
        </ChipRow>
        <ChipRow label="traditions">
          {TRADITIONS.map((t) => {
            const on = sel?.kind === 'tradition' && sel.id === t.id;
            return (
              <Chip
                key={t.id}
                color={c.muted}
                active={on}
                onClick={() => setSel(on ? null : { kind: 'tradition', id: t.id })}
              >
                {t.short}
              </Chip>
            );
          })}
        </ChipRow>
      </div>

      <Inspector sel={sel} />
    </WidgetShell>
  );
}

function ChipRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
      <span style={{ ...mono, fontSize: 11, color: c.faint, paddingTop: 6, minWidth: 72 }}>{label}:</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{children}</div>
    </div>
  );
}

function Chip({
  color,
  active,
  onClick,
  children,
}: {
  color: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{
        ...mono,
        cursor: 'pointer',
        fontSize: 11.5,
        padding: '5px 9px',
        borderRadius: 7,
        border: `1px solid ${active ? color : c.line2}`,
        background: active ? `${color}1f` : 'transparent',
        color: active ? color : c.muted,
        transition: 'all .14s ease',
      }}
    >
      {children}
    </button>
  );
}

function TraditionLink({ id }: { id: TraditionId }) {
  const t = getTradition(id);
  return (
    <Link
      to={`/${t.slug}`}
      style={{
        ...mono,
        fontSize: 11,
        color: c.teal,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
      }}
    >
      ch{String(t.num).padStart(2, '0')} <ArrowUpRight size={11} />
    </Link>
  );
}

function SoftTag() {
  return (
    <span style={{ ...mono, fontSize: 9.5, color: c.faint, border: `1px solid ${c.line2}`, borderRadius: 5, padding: '1px 5px' }}>
      a looser fit
    </span>
  );
}

function Inspector({ sel }: { sel: Selection }) {
  if (sel === null || sel.kind === 'calm') {
    return (
      <div style={{ padding: '16px 18px 20px', background: c.panel, borderTop: `1px solid ${c.line}` }}>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: c.muted, margin: 0 }}>
          {sel?.kind === 'calm'
            ? 'Every route runs to the same center. That is the wager of the whole book, drawn as one picture: many doors, one room behind them.'
            : 'Pick a route to see every tradition that walks it, each in its own words. Or pick a tradition to see the routes it leans on. The same move keeps turning up under a new name.'}
        </p>
      </div>
    );
  }

  if (sel.kind === 'route') {
    const route = getRoute(sel.id);
    const doors = TRADITIONS.flatMap((t) => {
      const cell = t.cells.find((x) => x.route === sel.id);
      return cell ? [{ t, cell }] : [];
    });
    return (
      <div style={{ padding: '16px 18px 20px', background: `${route.color}0c`, borderTop: `1px solid ${c.line}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap', marginBottom: 4 }}>
          <span style={{ ...mono, fontSize: 14, color: route.color, fontWeight: 600 }}>{route.label}</span>
          <span style={{ ...mono, fontSize: 11, color: c.faint }}>{doors.length} doors</span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: c.muted, margin: '0 0 14px' }}>{route.gloss}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {doors.map(({ t, cell }) => (
            <div key={t.id} style={{ borderLeft: `2px solid ${route.color}55`, paddingLeft: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: c.text }}>{cell.name}</span>
                <span style={{ ...mono, fontSize: 10.5, color: c.muted }}>{t.label}</span>
                {cell.soft && <SoftTag />}
                <TraditionLink id={t.id} />
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.5, color: c.muted }}>{cell.how}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // tradition selected
  const t = getTradition(sel.id);
  return (
    <div style={{ padding: '16px 18px 20px', background: c.panel, borderTop: `1px solid ${c.line}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap', marginBottom: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: c.text }}>{t.label}</span>
        <span style={{ ...mono, fontSize: 11, color: c.faint }}>
          {t.cells.length} routes
        </span>
        <TraditionLink id={t.id} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 8 }}>
        {t.cells.map((cell) => {
          const route = getRoute(cell.route);
          return (
            <div key={cell.route} style={{ borderLeft: `2px solid ${route.color}55`, paddingLeft: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
                <span
                  style={{
                    ...mono,
                    fontSize: 10.5,
                    color: route.color,
                    border: `1px solid ${route.color}55`,
                    borderRadius: 5,
                    padding: '1px 6px',
                  }}
                >
                  {route.label}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: c.text }}>{cell.name}</span>
                {cell.soft && <SoftTag />}
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.5, color: c.muted }}>{cell.how}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
