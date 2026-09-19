import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AboutPage from './components/layouts/AboutPage.tsx'
import CodeFrameworkProvider from './components/layouts/CodeFrameworkProvider.tsx'
import { defaultPathFor } from './core/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CodeFrameworkProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={defaultPathFor('components')} replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/:navKind/:item" element={<App />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CodeFrameworkProvider>
  </StrictMode>,
)
