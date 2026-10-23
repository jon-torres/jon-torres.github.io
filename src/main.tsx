import '@fontsource-variable/syne'
import '@fontsource-variable/literata'
import './styles/global.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import type { Locale } from './content'

const locale: Locale = window.location.pathname.startsWith('/pt') ? 'pt' : 'en'
const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
