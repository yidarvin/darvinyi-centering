import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
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
const Glossary = lazy(() => import('@/pages/Glossary').then((m) => ({ default: m.Glossary })));
const RouteIndex = lazy(() => import('@/pages/RouteIndex').then((m) => ({ default: m.RouteIndex })));
const Bibliography = lazy(() => import('@/pages/Bibliography').then((m) => ({ default: m.Bibliography })));
const Index = lazy(() => import('@/pages/Index').then((m) => ({ default: m.Index })));
const Notebook = lazy(() => import('@/pages/Notebook').then((m) => ({ default: m.Notebook })));

function ReferencePageLoading() {
  return (
    <main id="main" aria-busy="true" aria-live="polite" style={{ maxWidth: 720, margin: '0 auto', padding: '56px 22px' }}>
      <p>Loading reference page…</p>
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Application />
    </BrowserRouter>
  );
}

export function ServerApp({ url }: { url: string }) {
  return (
    <StaticRouter location={url}>
      <Application />
    </StaticRouter>
  );
}

function Application() {
  return (
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
              <Suspense fallback={<ReferencePageLoading />}>
                <Search />
              </Suspense>
            }
          />
          <Route
            path="/glossary"
            element={
              <Suspense fallback={<ReferencePageLoading />}>
                <Glossary />
              </Suspense>
            }
          />
          <Route
            path="/routes/:id"
            element={
              <Suspense fallback={<ReferencePageLoading />}>
                <RouteIndex />
              </Suspense>
            }
          />
          <Route
            path="/sources"
            element={
              <Suspense fallback={<ReferencePageLoading />}>
                <Bibliography />
              </Suspense>
            }
          />
          <Route
            path="/index"
            element={
              <Suspense fallback={<ReferencePageLoading />}>
                <Index />
              </Suspense>
            }
          />
          <Route
            path="/notebook"
            element={
              <Suspense fallback={<ReferencePageLoading />}>
                <Notebook />
              </Suspense>
            }
          />
          <Route path="/:slug" element={<ChapterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MDXProvider>
  );
}
