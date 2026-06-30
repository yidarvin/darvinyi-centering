declare module '*.mdx' {
  import type { ComponentType } from 'react';

  /** the reflection block content a chapter exports for its layout to render */
  export const reflection: { path: string; prompt: string; id?: string } | undefined;

  /** the chapter's Sources list, rendered by the layout */
  export const sources: { text: string; url?: string }[] | undefined;

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
