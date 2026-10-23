import type { Content } from '../content'

export function Writing({ c }: { c: Content }) {
  const p = c.writing.paper
  return (
    <section id="writing" className="band band--cotton" aria-labelledby="writing-h">
      <div className="wrap sec">
        <div className="sec__label">
          <h2 id="writing-h">{c.writing.heading}</h2>
        </div>
        <div className="sec__body">
          <h3 className="sub">{c.writing.paperHeading}</h3>
          <article className="paper">
            <p className="paper__title" lang="en">
              {p.title}
            </p>
            <p className="paper__meta">
              {p.authors} ({p.year}). <i>{p.venue}</i>.{' '}
              <a href={p.href} rel="noopener">
                {p.linkLabel}
              </a>
            </p>
          </article>
          <h3 className="sub">{c.writing.essaysHeading}</h3>
          <p className="essays__lead">{c.writing.essaysLead}</p>
          <ul className="essays" lang="pt-BR">
            {c.writing.essays.map((e) => (
              <li key={e.href}>
                <span className="essays__year">{e.year}</span>
                <a href={e.href} rel="noopener">
                  {e.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
