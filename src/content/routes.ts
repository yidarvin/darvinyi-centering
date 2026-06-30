import { c } from '@/styles/tokens';

/**
 * The seven recurring routes to calm. The book's backbone: the same handful of
 * moves appear across very different traditions, named differently each time.
 * Part II tags each tradition chapter with the routes it leans on. Part III
 * (One Calm, Many Doors) collects them, so these ids, labels, and colors must
 * stay stable across every chapter.
 */

export type RouteId =
  | 'letting-go'
  | 'presence'
  | 'the-body'
  | 'perspective'
  | 'enough'
  | 'connection'
  | 'meaning';

export interface Route {
  id: RouteId;
  label: string;
  color: string;
  gloss: string;
}

export const ROUTES: Route[] = [
  {
    id: 'letting-go',
    label: 'letting go',
    color: c.teal,
    gloss: 'release the grip on what was never yours to hold',
  },
  {
    id: 'presence',
    label: 'presence',
    color: c.violet,
    gloss: 'come back to this moment, the only one you are in',
  },
  {
    id: 'the-body',
    label: 'the body',
    color: c.coral,
    gloss: 'enter calm through breath, posture, and the nervous system',
  },
  {
    id: 'perspective',
    label: 'perspective',
    color: c.amber,
    gloss: 'change the frame and the size of the trouble changes',
  },
  {
    id: 'enough',
    label: 'enough',
    color: c.sky,
    gloss: 'want less, and the gap that anxiety lives in narrows',
  },
  {
    id: 'connection',
    label: 'connection',
    color: c.emerald,
    gloss: 'a calm shared with others, and with something larger',
  },
  {
    id: 'meaning',
    label: 'meaning',
    color: c.pink,
    gloss: 'let a larger purpose hold the weight of the small day',
  },
];

const BY_ID = new Map(ROUTES.map((r) => [r.id, r]));

export function getRoute(id: RouteId): Route {
  const route = BY_ID.get(id);
  if (!route) throw new Error(`Unknown route id: ${id}`);
  return route;
}
