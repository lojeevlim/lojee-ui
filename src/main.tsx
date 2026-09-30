import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LandingPage from './components/landing/LandingPage.tsx'
import AboutPage from './components/layouts/AboutPage.tsx'
import CodeFrameworkProvider from './components/layouts/CodeFrameworkProvider.tsx'
import { ThemeProvider } from './components/ui/Theme/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CodeFrameworkProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ThemeProvider><LandingPage /></ThemeProvider>} />
          <Route path="/about" element={<ThemeProvider><AboutPage /></ThemeProvider>} />
          <Route path="/:navKind/:item" element={<App />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CodeFrameworkProvider>
  </StrictMode>,
)
