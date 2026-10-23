import type { Content } from '../content'
import { NAME } from '../content/shared'
import { Cloth } from './Cloth'

export function Hero({ c }: { c: Content }) {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <Cloth seed={`${NAME} ${c.hero.intro}`} label={c.hero.clothLabel} />
      <div className="hero__label">
        <h1 id="hero-name" className="hero__name">
          {NAME}, PhD
        </h1>
        <p className="hero__headline">{c.hero.headline}</p>
        <p className="hero__intro">{c.hero.intro}</p>
        <p className="hero__hint">{c.hero.hint}</p>
      </div>
    </section>
  )
}
