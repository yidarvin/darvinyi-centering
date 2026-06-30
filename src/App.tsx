import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '@/components/MDXComponents';
import { TopBar } from '@/components/TopBar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Landing } from '@/pages/Landing';
import { ChapterPage } from '@/pages/ChapterPage';
import { NotFound } from '@/pages/NotFound';

export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MDXProvider components={mdxComponents}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollToTop />
        <TopBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:slug" element={<ChapterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MDXProvider>
    </BrowserRouter>
  );
}
