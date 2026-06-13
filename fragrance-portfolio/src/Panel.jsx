import { EXPERIENCE, EDUCATION, CERTS, FRAGRANCES, LINKS } from './content.js'

function ExperiencePanel() {
  return (
    <>
      <p className="kicker">02 — Experience</p>
      <h2>
        Work <em>experience</em>
      </h2>
      {EXPERIENCE.map((e) => (
        <article className="entry" key={e.org}>
          <header>
            <h3>{e.role}</h3>
            <p className="entry-org">{e.org}</p>
            <p className="entry-meta">
              {e.period} · {e.loc}
            </p>
          </header>
          <ul>
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </>
  )
}

function EducationPanel() {
  return (
    <>
      <p className="kicker">03 — Education</p>
      <h2>
        Academic <em>background</em>
      </h2>
      {EDUCATION.map((e) => (
        <article className="entry" key={e.school}>
          <header>
            <h3>{e.school}</h3>
            <p className="entry-org">{e.degree}</p>
            <p className="entry-meta">
              {e.loc} · {e.date} · <strong>{e.gpa}</strong>
            </p>
          </header>
          <div className="tags">
            {e.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </article>
      ))}
      <article className="entry">
        <header>
          <h3 className="small-h">Certifications</h3>
        </header>
        <ul className="certs">
          {CERTS.map((c) => (
            <li key={c.name}>
              <span>
                {c.name} — {c.issuer}
              </span>
              <em>{c.status}</em>
            </li>
          ))}
        </ul>
      </article>
    </>
  )
}

function BeyondPanel() {
  return (
    <>
      <p className="kicker">05 — Beyond</p>
      <h2>
        Outside <em>the work</em>
      </h2>
      <p className="prose">
        I collect fragrances — the reason this portfolio takes the shape of a
        bottle. The rest of my time goes to running and building things for
        the fun of it.
      </p>
      <article className="entry">
        <header>
          <h3 className="small-h">On the shelf</h3>
        </header>
        <ul className="frags">
          {FRAGRANCES.map((f) => (
            <li key={f.name}>
              <span>
                <strong>{f.name}</strong> · {f.house}
              </span>
              <em>{f.notes}</em>
            </li>
          ))}
        </ul>
      </article>
      <article className="entry">
        <header>
          <h3 className="small-h">Running</h3>
        </header>
        <p className="prose">
          Running is my reset — where ideas get processed and discipline gets
          built. Follow along on{' '}
          <a href="https://www.strava.com/athletes/195549700" target="_blank" rel="noopener noreferrer">
            Strava
          </a>
          .
        </p>
      </article>
      <article className="entry">
        <header>
          <h3 className="small-h">Get in touch</h3>
        </header>
        <ul className="links">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                <span>{l.label}</span>
                <em>{l.value}</em>
              </a>
            </li>
          ))}
        </ul>
      </article>
    </>
  )
}

const PANELS = {
  experience: ExperiencePanel,
  education: EducationPanel,
  beyond: BeyondPanel,
}

export default function Panel({ section, onClose }) {
  const Body = PANELS[section]
  return (
    <aside className={`panel${Body ? ' open' : ''}`} aria-hidden={!Body}>
      <button className="panel-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="panel-scroll">{Body ? <Body /> : null}</div>
    </aside>
  )
}
