import type { Content } from '../content'
import { NAME } from '../content/shared'

export function Header({ c }: { c: Content }) {
  return (
    <header className="header">
      <a className="skip" href="#main">
        {c.nav.skip}
      </a>
      <a className="header__name" href={c.path}>
        {NAME}
      </a>
      <nav className="header__nav" aria-label="Sections">
        <a href="#about">{c.nav.about}</a>
        <a href="#work">{c.nav.work}</a>
        <a href="#loom">{c.nav.loom}</a>
        <a href="#writing">{c.nav.writing}</a>
        <a href="#contact">{c.nav.contact}</a>
        <a
          className="header__lang"
          href={c.nav.switchHref}
          hrefLang={c.nav.switchLang}
          lang={c.nav.switchLang}
        >
          {c.nav.switchLabel}
        </a>
      </nav>
    </header>
  )
}
