import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import LandingPage from './components/landing/LandingPage.tsx'
import AboutPage from './components/layouts/AboutPage.tsx'
import CodeFrameworkProvider from './components/layouts/CodeFrameworkProvider.tsx'
import { ThemeProvider } from './components/ui/Theme/ThemeProvider.tsx'
import { syncFaviconWithTheme } from './core/favicon'
import { SITE_THEME } from './siteTheme'

// The docs app (all showcases + API docs) loads only when a docs route is opened, keeping the landing page light.
const App = lazy(() => import('./App.tsx'))

// The browser-tab icon follows the theme accent.
syncFaviconWithTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CodeFrameworkProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ThemeProvider {...SITE_THEME}><LandingPage /></ThemeProvider>} />
          <Route path="/about" element={<ThemeProvider {...SITE_THEME}><AboutPage /></ThemeProvider>} />
          <Route path="/:navKind/:item" element={<Suspense fallback={null}><App /></Suspense>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CodeFrameworkProvider>
  </StrictMode>,
)
