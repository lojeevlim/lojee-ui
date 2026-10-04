import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LandingPage from './components/landing/LandingPage.tsx'
import AboutPage from './components/layouts/AboutPage.tsx'
import CodeFrameworkProvider from './components/layouts/CodeFrameworkProvider.tsx'
import { ThemeProvider } from './components/ui/Theme/ThemeProvider.tsx'

// The site's own default look (until a visitor picks something else in the theme switcher, which is remembered).
const SITE_THEME = { defaultMode: 'dark', defaultAccent: 'orange', defaultDesign: 'clay', defaultActiveVariant: 'solid' } as const

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CodeFrameworkProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ThemeProvider {...SITE_THEME}><LandingPage /></ThemeProvider>} />
          <Route path="/about" element={<ThemeProvider {...SITE_THEME}><AboutPage /></ThemeProvider>} />
          <Route path="/:navKind/:item" element={<App />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CodeFrameworkProvider>
  </StrictMode>,
)
