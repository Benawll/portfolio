import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { LanguageProvider } from './i18n/LanguageContext';
import { SmoothScrollProvider } from './components/layout/SmoothScrollProvider';
import { HomePage } from './pages/HomePage';

const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({
    default: m.ProjectDetailPage,
  })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({
    default: m.NotFoundPage,
  })),
);

export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <SmoothScrollProvider>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </SmoothScrollProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
