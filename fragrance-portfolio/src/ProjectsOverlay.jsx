import { PROJECTS } from './content.js'

/*
 * Immersive Projects layout — a centered card grid that expands over the
 * bird's-eye view of the presentation plate. Distinct from the side panel.
 */
export default function ProjectsOverlay({ open, onClose }) {
  return (
    <section className={`projects${open ? ' open' : ''}`} aria-hidden={!open}>
      <button className="panel-close projects-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <header className="projects-head">
        <p className="kicker">04 — Projects</p>
        <h2>
          Selected <em>builds</em>
        </h2>
      </header>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <a
            className="proj-card"
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="proj-top">
              <h3>{p.name}</h3>
              <span className="proj-arrow">↗</span>
            </div>
            <p className="proj-tag">{p.tagline}</p>
            <p className="proj-desc">{p.desc}</p>
            <div className="proj-stack">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
