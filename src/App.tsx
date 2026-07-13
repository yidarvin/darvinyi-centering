import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '@/components/MDXComponents';
import { TopBar } from '@/components/TopBar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Landing } from '@/pages/Landing';
import { ChapterPage } from '@/pages/ChapterPage';
import { NotFound } from '@/pages/NotFound';

// code-split: MiniSearch and the search index (a few hundred KB) should not
// weigh down every page's initial load, only a visit to /search.
const Search = lazy(() => import('@/pages/Search').then((m) => ({ default: m.Search })));

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
          <Route
            path="/search"
            element={
              <Suspense fallback={null}>
                <Search />
              </Suspense>
            }
          />
          <Route path="/:slug" element={<ChapterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MDXProvider>
    </BrowserRouter>
  );
}
