import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
// Self-hosted fonts (bundled by Vite) — no third-party font requests.
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import './index.css'
import App from './App.jsx'

// Without this, a throttled/background tab plays transitions in slow motion
// on return; with it, tweens resync to the clock immediately.
gsap.ticker.lagSmoothing(0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
