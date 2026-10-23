import type { Content, Lane, Role } from '../content'
import { COLORS, tileFor, type Hue } from '../lib/tiles'
import { Tile } from './Tile'
import { Timeline } from './Timeline'

const year = (ym: string) => ym.slice(0, 4)

/** Job markers take the lane colour used in the chart; only the shape comes from the name. */
const LANE_HUE: Record<Lane, Hue> = { industry: COLORS.red, research: COLORS.green, teaching: COLORS.gold }

function range(r: Role, present: string) {
  const a = year(r.start)
  const b = r.end ? year(r.end) : present
  return a === b ? a : `${a}–${b}`
}

export function Work({ c }: { c: Content }) {
  const main = c.work.roles.filter((r) => !r.brief)
  const brief = c.work.roles.filter((r) => r.brief)
  return (
    <section id="work" className="band band--cotton" aria-labelledby="work-h">
      <div className="wrap sec">
        <div className="sec__label">
          <h2 id="work-h">{c.work.heading}</h2>
          <p className="lead">{c.work.lead}</p>
        </div>
        <div className="sec__body">
          <Timeline c={c} />
          <ol className="roles">
            {main.map((r) => (
              <li key={r.org + r.start} className="role">
                <span className="role__when">{range(r, c.work.present)}</span>
                <div className="role__body">
                  <h3 className="role__org">
                    <Tile tile={tileFor(r.org, LANE_HUE[r.lane])} size={26} className="marker" />
                    {r.org}
                  </h3>
                  <p className="role__title">
                    {r.title}
                    {r.location ? <span className="role__where">, {r.location}</span> : null}
                  </p>
                  {r.bullets ? (
                    <ul className="role__bullets">
                      {r.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <h3 className="sub">{c.work.earlierHeading}</h3>
          <ul className="brief">
            {brief.map((r) => (
              <li key={r.org + r.start}>
                <span className="brief__when">{range(r, c.work.present)}</span>
                <span>
                  <strong>{r.org}</strong>, {r.title}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="sub">{c.work.educationHeading}</h3>
          <ul className="brief">
            {c.work.education.map((e) => (
              <li key={e.degree}>
                <span className="brief__when">{e.years}</span>
                <span>
                  <strong>{e.degree}</strong>, {e.school}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap sec sec--projects">
        <div className="sec__label">
          <h2 id="projects-h">{c.work.projectsHeading}</h2>
          <p className="lead">{c.work.projectsLead}</p>
        </div>
        <ul className="projects sec__body" aria-labelledby="projects-h">
          {c.work.projects.map((p) => (
            <li key={p.name} className="project">
              <Tile tile={tileFor(p.name)} size={44} className="project__tile" />
              <div>
                <h3 className="project__name">{p.name}</h3>
                <p className="project__where">{p.where}</p>
                <p className="project__summary">{p.summary}</p>
                <p className="project__stack">
                  {p.stack}
                  {p.link ? (
                    <>
                      {' '}
                      <a href={p.link.href} rel="noopener">
                        {p.link.label}
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
