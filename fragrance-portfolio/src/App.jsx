import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene.jsx'
import Panel from './Panel.jsx'
import ProjectsOverlay from './ProjectsOverlay.jsx'
import ResumeModal from './ResumeModal.jsx'
import { LINKS, NAV } from './content.js'
import { REDUCED_MOTION } from './motion.js'

const PANEL_SECTIONS = ['experience', 'education', 'beyond']
// Cap the pixel ratio on phones — high-DPR + a transmission FBO is brutal on
// mobile GPUs, and the frosted glass hides the lower resolution anyway.
const IS_MOBILE =
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 760px)').matches
const CONTACT_LABELS = new Set(['Email', 'LinkedIn', 'GitHub'])
const CONTACT_LINKS = LINKS.filter((link) => CONTACT_LABELS.has(link.label))

function ContactIcon({ label }) {
  if (label === 'Email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    )
  }

  if (label === 'LinkedIn') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 10v7M8 7.5v.1M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 22v-4.2c0-1 .1-1.4-.5-2 2.8-.3 5.7-1.4 5.7-6.2A4.8 4.8 0 0 0 19 6.2a4.5 4.5 0 0 0-.1-3.4S17.9 2.5 15 4a12 12 0 0 0-6 0C6.1 2.5 5.1 2.8 5.1 2.8A4.5 4.5 0 0 0 5 6.2a4.8 4.8 0 0 0-1.2 3.4c0 4.8 2.9 5.9 5.7 6.2-.5.5-.6 1.1-.6 2V22" />
      <path d="M9 19c-2.4.8-4.2-1.2-4.2-1.2" />
    </svg>
  )
}

export default function App() {
  const [section, setSection] = useState('intro')
  const [synced, setSynced] = useState('home')
  const [showResume, setShowResume] = useState(false)

  // Hero fly-in: after mount, glide from the sky down to the bottle.
  // Under reduced motion the camera cuts straight to the home pose.
  useEffect(() => {
    const t = setTimeout(() => setSection('home'), REDUCED_MOTION ? 0 : 450)
    return () => clearTimeout(t)
  }, [])

  const ready = section !== 'intro'
  const panelOpen = PANEL_SECTIONS.includes(section)
  // Highlight the dock item: the active section, or — while freely orbiting
  // on the home view — whichever anchor the camera is pointed at.
  const activeId = section === 'home' ? synced : section

  return (
    <div className={`app${ready ? ' ready' : ''}${panelOpen ? ' shift' : ''}`}>
      <Canvas
        className="stage"
        dpr={IS_MOBILE ? [1, 1.5] : [1, 1.8]}
        camera={{ fov: 35, position: [0, 9, 0.02], near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        aria-hidden="true"
      >
        <Scene section={section} setSection={setSection} onSync={setSynced} />
      </Canvas>

      <header className="top ui">
        <div className="logo" aria-hidden="true">
          NR<span>.</span>
        </div>
        <div className="top-right">
          <span className="status">
            <span className="pill-dot" />
            Open to 2027 AI engineering roles
          </span>
          <button className="btn-ghost" onClick={() => setShowResume(true)}>
            Résumé
          </button>
        </div>
      </header>

      <main className="hero ui" data-hide={section !== 'home'} aria-hidden={section !== 'home'}>
        <p className="kicker">Ninad Rade · New York, NY</p>
        <h1>
          If My Résumé Were a <em>Fragrance Bottle</em>
        </h1>
        <p className="hero-line">
          AI Integration &amp; Solutions Engineer building dependable AI
          systems, agent workflows, and data products. M.S. Computer
          Engineering at NYU Tandon, GPA 3.84, May 2027.
        </p>
        <div className="hero-actions">
          <button className="btn-solid" onClick={() => setSection('projects')}>
            View selected work
          </button>
          <span className="hero-hint">or turn the bottle to explore</span>
        </div>
      </main>

      <nav className="dock ui" aria-label="Sections">
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`dock-item${activeId === item.id ? ' active' : ''}`}
            aria-current={activeId === item.id ? 'true' : undefined}
            onClick={() => setSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <aside className="contact-card ui" aria-label="Contact information">
        <p className="contact-title">Get in touch</p>
        <div className="contact-actions">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              className="contact-link"
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`${link.label}: ${link.value}`}
              title={link.value}
            >
              <ContactIcon label={link.label} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </aside>

      <Panel section={section} onClose={() => setSection('home')} />
      <ProjectsOverlay open={section === 'projects'} onClose={() => setSection('home')} />
      <ResumeModal open={showResume} onClose={() => setShowResume(false)} />

      <footer className="foot ui">
        <span>© 2026 Ninad Rade</span>
        <span>NYU Tandon · New York</span>
      </footer>
    </div>
  )
}
