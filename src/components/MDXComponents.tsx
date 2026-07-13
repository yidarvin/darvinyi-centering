/* eslint-disable react-refresh/only-export-components --
   This is the MDX prose-typography map, a static config module rather than a
   fast-refresh boundary. The small element renderers live here on purpose. */
import type { ComponentProps, ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { Link } from 'react-router-dom';
import { c, mono } from '@/styles/tokens';
import { Term } from '@/components/Term';

/**
 * The prose typography layer. Renders the Markdown elements of a chapter in the
 * house style, tuned for long-form reading: a ~720px column lives in the layout,
 * here we set leading, spacing, and color. Supplied to MDX via MDXProvider.
 */

const P = (props: { children?: ReactNode }) => (
  <p style={{ fontSize: 16.5, lineHeight: 1.72, color: c.prose, margin: '0 0 18px' }}>
    {props.children}
  </p>
);

const H2 = (props: { children?: ReactNode }) => (
  <h2
    style={{
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: c.text,
      margin: '38px 0 14px',
    }}
  >
    {props.children}
  </h2>
);

const H3 = (props: { children?: ReactNode }) => (
  <h3 style={{ fontSize: 16.5, fontWeight: 600, color: c.text, margin: '28px 0 10px' }}>
    {props.children}
  </h3>
);

const H4 = (props: { children?: ReactNode }) => (
  <h4 style={{ ...mono, fontSize: 13, color: c.tealDim, margin: '24px 0 8px', letterSpacing: '.03em' }}>
    {props.children}
  </h4>
);

const Blockquote = (props: { children?: ReactNode }) => (
  <blockquote
    style={{
      margin: '0 0 28px',
      padding: '4px 0 4px 20px',
      borderLeft: `2px solid ${c.teal}`,
      color: c.text,
      fontSize: 18,
      lineHeight: 1.55,
      fontWeight: 500,
    }}
  >
    {props.children}
  </blockquote>
);

const UL = (props: { children?: ReactNode }) => (
  <ul style={{ margin: '0 0 18px', paddingLeft: 22, color: c.prose, fontSize: 16, lineHeight: 1.7 }}>
    {props.children}
  </ul>
);

const OL = (props: { children?: ReactNode }) => (
  <ol style={{ margin: '0 0 18px', paddingLeft: 22, color: c.prose, fontSize: 16, lineHeight: 1.7 }}>
    {props.children}
  </ol>
);

const LI = (props: { children?: ReactNode }) => (
  <li style={{ margin: '0 0 7px' }}>{props.children}</li>
);

const Strong = (props: { children?: ReactNode }) => (
  <strong style={{ color: c.text, fontWeight: 600 }}>{props.children}</strong>
);

// most `*emphasis*` is plain italics; where the text matches a glossary term
// defined in this chapter, Term renders a hoverable, deep-linkable reference
// instead. See src/components/Term.tsx.
const Em = (props: { children?: ReactNode }) => <Term>{props.children}</Term>;

const Code = (props: { children?: ReactNode }) => (
  <code
    style={{
      ...mono,
      fontSize: '0.86em',
      color: c.teal,
      background: c.tealFog,
      border: `1px solid ${c.line}`,
      borderRadius: 5,
      padding: '1px 5px',
    }}
  >
    {props.children}
  </code>
);

const HR = () => <hr style={{ border: 'none', borderTop: `1px solid ${c.line}`, margin: '34px 0' }} />;

const Cite = (props: { children?: ReactNode }) => (
  <cite style={{ ...mono, fontSize: 12, color: c.faint, fontStyle: 'normal' }}>{props.children}</cite>
);

const Anchor = ({ href = '', children, ...rest }: ComponentProps<'a'>) => {
  const internal = href.startsWith('/');
  const style = { color: c.teal, textDecoration: 'none', borderBottom: `1px solid ${c.tealEdge}` };
  if (internal) {
    return (
      <Link to={href} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" style={style} {...rest}>
      {children}
    </a>
  );
};

export const mdxComponents: MDXComponents = {
  p: P,
  h1: H2, // a chapter's h1 is the ChapterHeader; in-prose top level renders as h2
  h2: H2,
  h3: H3,
  h4: H4,
  blockquote: Blockquote,
  ul: UL,
  ol: OL,
  li: LI,
  strong: Strong,
  em: Em,
  code: Code,
  hr: HR,
  cite: Cite,
  a: Anchor,
};
