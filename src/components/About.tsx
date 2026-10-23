import type { Content } from '../content'
import { tileFor } from '../lib/tiles'
import { Tile } from './Tile'

export function About({ c }: { c: Content }) {
  return (
    <section id="about" className="band band--cotton" aria-labelledby="about-h">
      <div className="wrap sec">
        <div className="sec__label">
          <h2 id="about-h">{c.about.heading}</h2>
          <figure className="portrait">
            <img
              src="/jon.webp"
              width="800"
              height="800"
              alt={c.about.photoAlt}
              loading="lazy"
              decoding="async"
            />
            <Tile tile={tileFor('Jonathan Torres')} size={44} className="portrait__tile" />
          </figure>
        </div>
        <div className="sec__body prose">
          {c.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <h3>{c.about.languagesHeading}</h3>
          <ul className="langs">
            {c.about.languages.map((l) => (
              <li key={l.name} className="langs__item">
                <span
                  className="langs__name"
                  lang={
                    l.name === 'English'
                      ? 'en'
                      : l.name === 'Español'
                        ? 'es'
                        : l.name === 'Français'
                          ? 'fr'
                          : 'pt'
                  }
                >
                  {l.name}
                </span>
                <span className="langs__tiles" aria-hidden="true">
                  {Array.from({ length: 4 }, (_, i) => {
                    const t = tileFor(l.name)
                    const filled = i < l.level
                    return (
                      <Tile
                        key={i}
                        tile={
                          filled
                            ? { ...t, rotation: ((t.rotation + i) & 3) as 0 | 1 | 2 | 3 }
                            : { glyph: t.glyph, rotation: 0, fill: '#000', ink: '#000' }
                        }
                        size={22}
                        className={filled ? undefined : 'langs__empty'}
                      />
                    )
                  })}
                </span>
                <span className="langs__note">{l.note}</span>
              </li>
            ))}
          </ul>
          <h3>{c.about.toolsHeading}</h3>
          <p className="tools">{c.about.tools.join(', ')}.</p>
        </div>
      </div>
    </section>
  )
}
