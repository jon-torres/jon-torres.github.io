import type { Content } from '../content'
import { LINKS } from '../content/shared'

export function Footer({ c }: { c: Content }) {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <p>{c.footer.text}</p>
        <p>
          <a href={LINKS.repo} rel="noopener">
            {c.footer.source}
          </a>{' '}
          <a href={c.nav.switchHref} hrefLang={c.nav.switchLang} lang={c.nav.switchLang}>
            {c.nav.switchLabel}
          </a>
        </p>
      </div>
    </footer>
  )
}
