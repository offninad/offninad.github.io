import { PROJECTS, PROJECT_ARCHIVE } from './content.js'

/*
 * Selected work as editorial rows: name and status on one line, evidence in
 * prose, stack as a quiet mono line. The three resume projects lead; earlier
 * work sits in a compact archive index below them.
 */
function ProjectRow({ p }) {
  const heading = (
    <div className="proj-line">
      <h3>{p.name}</h3>
      {p.status ? (
        <span className="proj-status">{p.status}</span>
      ) : (
        <span className="proj-arrow" aria-hidden="true">
          ↗
        </span>
      )}
    </div>
  )

  const body = (
    <>
      <p className="proj-tag">{p.tagline}</p>
      <p className="proj-desc">{p.desc}</p>
      <p className="proj-desc">{p.outcome}</p>
      <p className="proj-stack-line">{p.stack}</p>
    </>
  )

  if (!p.href) {
    return (
      <article className="proj-row">
        {heading}
        {body}
      </article>
    )
  }
  return (
    <a
      className="proj-row linked"
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${p.name} on GitHub`}
    >
      {heading}
      {body}
    </a>
  )
}

export default function ProjectsOverlay({ open, onClose }) {
  return (
    <section className={`projects${open ? ' open' : ''}`} aria-hidden={!open}>
      <button className="panel-close projects-close" onClick={onClose} aria-label="Close projects">
        ×
      </button>
      <header className="projects-head">
        <p className="kicker">Selected work</p>
        <h2>
          Built as <em>evidence</em>
        </h2>
      </header>
      <div className="projects-scroll">
        <div className="projects-list">
          {PROJECTS.map((p) => (
            <ProjectRow key={p.name} p={p} />
          ))}
        </div>
        <div className="proj-archive">
          <h3 className="small-h">Earlier work</h3>
          <ul>
            {PROJECT_ARCHIVE.map((p) => (
              <li key={p.name}>
                <a href={p.href} target="_blank" rel="noopener noreferrer">
                  <span className="proj-archive-name">{p.name}</span>
                  <span className="proj-archive-tag">{p.tagline}</span>
                  <span className="proj-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
