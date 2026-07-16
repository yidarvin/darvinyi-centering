/**
 * The help resources for Chapter 18, verified against official sources as of
 * RESOURCES_VERIFIED_AT below. This is the safety content of the book, so
 * accuracy matters more here than anywhere else. A few notes for whoever
 * maintains this:
 *
 *  - Crisis phone numbers are region-specific and they change. These are US
 *    services, with an international directory (findahelpline.com) as the pointer
 *    for everyone else. Re-verify before any deploy that ships a long time after
 *    RESOURCES_VERIFIED_AT, and bump it when you do.
 *  - "988, press 3" for LGBTQ+ youth was discontinued on 2025-07-17. The main 988
 *    line still serves everyone; the current dedicated route for LGBTQ+ youth is
 *    The Trevor Project's own line, listed below. There has been talk of a
 *    relaunch of a specialized 988 route by the end of 2026. Verify the current
 *    status directly with 988lifeline.org and thetrevorproject.org at each build
 *    rather than trusting this note once time has passed, and update both the
 *    resource list and this comment to match whatever is true then.
 *  - Trans Lifeline is peer support with limited staffed hours, not a 24/7 line.
 *    It is paired here with a note to use a 24/7 option after hours.
 *  - This is information, not diagnosis or therapy. The prose and the widget say
 *    so plainly.
 */

/**
 * The single source of truth for when the resources below were last checked
 * against their official sources. Rendered to readers in SelfCheck.tsx and the
 * chapter sources note, and enforced at build time by
 * scripts/check-resource-freshness.mjs (warns at 30 days, fails the production
 * build at 90). Update this whenever you re-verify the numbers.
 */
export const RESOURCES_VERIFIED_AT = '2026-07-15';

export type ResourceGroup = 'crisis' | 'community' | 'ongoing';

export interface Resource {
  id: string;
  name: string;
  /** who it is for, one short line */
  who: string;
  /** the exact current contact: phone, text, chat, or "how to use it" */
  contact: string;
  /** hours, cost, or a caveat worth surfacing */
  note?: string;
  /** the official URL */
  url: string;
  urlLabel: string;
}

export interface Group {
  id: ResourceGroup;
  label: string;
  gloss: string;
  color: string;
  resources: Resource[];
}

import { c } from '@/styles/tokens';

export const GROUPS: Group[] = [
  {
    id: 'crisis',
    label: 'right now, if you might be in danger',
    gloss: 'free, confidential, 24/7',
    color: c.coral,
    resources: [
      {
        id: '988',
        name: '988 Suicide and Crisis Lifeline',
        who: 'Anyone in the US in crisis, or worried about someone who is.',
        contact: 'Call or text 988. Chat at 988lifeline.org. En español: press 2, or text AYUDA to 988.',
        note: '24/7, free, confidential, with one exception: it may contact emergency services without your consent if it believes your life is in immediate danger. In a life-threatening emergency, call 911.',
        url: 'https://988lifeline.org',
        urlLabel: '988lifeline.org',
      },
      {
        id: 'ctl',
        name: 'Crisis Text Line',
        who: 'Anyone in the US who would rather text than talk.',
        contact: 'Text HOME to 741741. En español: text HOLA to 741741.',
        note: '24/7, free, confidential, with the same immediate-danger exception as 988.',
        url: 'https://www.crisistextline.org',
        urlLabel: 'crisistextline.org',
      },
      {
        id: 'findahelpline',
        name: 'Find A Helpline',
        who: 'Anyone outside the US. It points you to a verified line in your own country.',
        contact: 'Go to findahelpline.com and choose your country. UK and Ireland: Samaritans, call 116 123.',
        note: 'A directory, not a single number. Free and confidential.',
        url: 'https://findahelpline.com',
        urlLabel: 'findahelpline.com',
      },
    ],
  },
  {
    id: 'community',
    label: 'lines for specific people',
    gloss: 'when a shared experience helps',
    color: c.violet,
    resources: [
      {
        id: 'trevor',
        name: 'The Trevor Project',
        who: 'LGBTQ+ young people (under 25).',
        contact: 'Call 1-866-488-7386. Text START to 678678. Chat at thetrevorproject.org.',
        note: '24/7, free, confidential, with the same immediate-danger exception as 988.',
        url: 'https://www.thetrevorproject.org/get-help/',
        urlLabel: 'thetrevorproject.org',
      },
      {
        id: 'veterans',
        name: 'Veterans Crisis Line',
        who: 'Veterans, service members, and their families. No VA enrollment needed.',
        contact: 'Call 988 then press 1. Text 838255. Chat at veteranscrisisline.net.',
        note: '24/7, free, confidential.',
        url: 'https://www.veteranscrisisline.net',
        urlLabel: 'veteranscrisisline.net',
      },
      {
        id: 'trans',
        name: 'Trans Lifeline',
        who: 'Trans and questioning people. Peer support, trans-run, and it will not call emergency services on you without consent.',
        contact: 'US: call 1-877-565-8860. Canada: 1-877-330-6366.',
        note: 'Staffed hours vary and it is not 24/7, so use 988 or Crisis Text Line after hours.',
        url: 'https://translifeline.org/hotline/',
        urlLabel: 'translifeline.org',
      },
    ],
  },
  {
    id: 'ongoing',
    label: 'finding ongoing help',
    gloss: 'not a crisis, but time to talk to a professional',
    color: c.teal,
    resources: [
      {
        id: 'directory',
        name: 'A therapist directory',
        who: 'Anyone looking for a therapist they can search and filter.',
        contact:
          'Psychology Today (psychologytoday.com) lets you filter by location, insurance, and specialty. For identity-affirming care: Inclusive Therapists, Therapy for Black Girls. For a specific method: ACT (contextualscience.org), IFS (ifs-institute.com).',
        url: 'https://www.psychologytoday.com/us/therapists',
        urlLabel: 'psychologytoday.com',
      },
      {
        id: 'insurance',
        name: 'Your insurance, your doctor, your work',
        who: 'The fastest covered routes, often overlooked.',
        contact:
          'Call the number on your insurance card for in-network names. Ask your primary-care doctor for a referral. Ask your employer about an EAP, which usually includes a few free, confidential sessions.',
        url: 'https://www.psychologytoday.com/us/basics/therapy/how-to-find-a-therapist',
        urlLabel: 'how to find a therapist',
      },
      {
        id: 'lowcost',
        name: 'Low-cost and sliding-scale care',
        who: 'If cost is the barrier. It does not have to be.',
        contact:
          'Open Path Collective (openpathcollective.org) offers sliding-scale sessions. University training clinics and community mental health centers charge little or nothing. SAMHSA can route you: findtreatment.gov, or call 1-800-662-4357.',
        note: 'The SAMHSA line is for treatment referrals, not a crisis. For a crisis, use 988.',
        url: 'https://openpathcollective.org/find-a-therapist/',
        urlLabel: 'openpathcollective.org',
      },
    ],
  },
];

export const ALL_RESOURCES: Resource[] = GROUPS.flatMap((g) => g.resources);

export function groupOf(id: ResourceGroup): Group {
  const g = GROUPS.find((x) => x.id === id);
  if (!g) throw new Error(`Unknown resource group: ${id}`);
  return g;
}
