/**
 * Design tokens for Centering.
 *
 * The palette mirrors the reference prototypes exactly (dark base, teal as the
 * constant accent) so figures and widgets built in SVG and inline styles match
 * the house style. The same values are exposed as CSS variables in global.css
 * for anything written in plain CSS.
 *
 * Dark base only. Teal #2dd4bf is the through-color of the book: the calm center.
 */

export const c = {
  // surfaces
  bg: '#0a0a0b',
  panel: '#0f1012',
  panel2: '#141517',
  line: 'rgba(255,255,255,0.08)',
  line2: 'rgba(255,255,255,0.14)',

  // text
  text: '#e6e8ea',
  prose: '#c4cace', // long-form body, a touch brighter than muted for readability
  muted: '#9aa1a8',
  faint: '#5f666d',

  // teal: the constant accent
  teal: '#2dd4bf',
  tealDim: '#0d9488',
  tealFog: 'rgba(45,212,191,0.10)',
  tealEdge: 'rgba(45,212,191,0.42)',

  // secondary accents, used semantically within a chapter
  amber: '#f0b429',
  amberFog: 'rgba(240,180,41,0.09)',
  amberEdge: 'rgba(240,180,41,0.42)',
  coral: '#fb7185',
  coralFog: 'rgba(251,113,133,0.10)',
  coralEdge: 'rgba(251,113,133,0.42)',
  violet: '#a78bfa',
  violetFog: 'rgba(167,139,250,0.11)',
  violetEdge: 'rgba(167,139,250,0.45)',

  // extended hues for the seven routes (see content/routes.ts)
  sky: '#38bdf8',
  emerald: '#34d399',
  pink: '#f472b6',
} as const;

export const mono = {
  fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
} as const;

export const sans = {
  fontFamily: "'Inter Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
} as const;

export const space = {
  reading: 720, // the reading-column max width
} as const;

export const radius = {
  sm: 8,
  md: 11,
  lg: 14,
} as const;

export type Color = keyof typeof c;
