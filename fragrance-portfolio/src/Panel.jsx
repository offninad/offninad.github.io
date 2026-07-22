import {
  EXPERIENCE,
  SKILLS,
  EDUCATION,
  COURSEWORK,
  CERTS,
  LEADERSHIP,
  LINKS,
} from './content.js'
import LikeButton from './LikeButton.jsx'

function ExperiencePanel() {
  return (
    <>
      <p className="kicker">Experience</p>
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
      <article className="entry">
        <header>
          <h3 className="small-h">Technical capabilities</h3>
        </header>
        <dl className="skills">
          {SKILLS.map((s) => (
            <div className="skills-row" key={s.group}>
              <dt>{s.group}</dt>
              <dd>{s.items}</dd>
            </div>
          ))}
        </dl>
      </article>
    </>
  )
}

function EducationPanel() {
  return (
    <>
      <p className="kicker">Education</p>
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
        </article>
      ))}
      <p className="course-line">
        <span>Coursework</span> {COURSEWORK}
      </p>
      <article className="entry">
        <header>
          <h3 className="small-h">Certifications</h3>
        </header>
        <ul className="certs">
          {CERTS.map((c) => (
            <li key={c.name}>
              <span>
                {c.name}, {c.issuer}
              </span>
              <em>{c.status}</em>
            </li>
          ))}
        </ul>
      </article>
      <article className="entry">
        <header>
          <h3 className="small-h">Leadership</h3>
        </header>
        <p className="entry-org">{LEADERSHIP.role}</p>
        <p className="entry-meta">
          {LEADERSHIP.org} · {LEADERSHIP.period}
        </p>
        <p className="prose">{LEADERSHIP.desc}</p>
      </article>
    </>
  )
}

function BeyondPanel() {
  return (
    <>
      <p className="kicker">Beyond the code</p>
      <h2>
        Outside <em>the work</em>
      </h2>
      <p className="prose">
        I collect fragrances, which is why this portfolio takes the shape of a
        bottle. The rest of my time goes to running and building things for
        the fun of it.
      </p>
      <article className="entry">
        <header>
          <h3 className="small-h">Enjoyed the portfolio?</h3>
        </header>
        <p className="prose">
          If this put a smile on your face, leave a thumbs up. Here is how many
          people have so far.
        </p>
        <LikeButton />
      </article>
      <article className="entry">
        <header>
          <h3 className="small-h">Running</h3>
        </header>
        <p className="prose">
          Running is my reset: where ideas get processed and discipline gets
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
      <button className="panel-close" onClick={onClose} aria-label="Close panel">
        ×
      </button>
      <div className="panel-scroll" key={section}>
        {Body ? <Body /> : null}
      </div>
    </aside>
  )
}
