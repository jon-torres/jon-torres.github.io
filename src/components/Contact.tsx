import { useSyncExternalStore } from 'react'
import type { Content } from '../content'
import { EMAIL } from '../content/shared'

const noop = () => () => {}
/** True after hydration; false in the prerendered HTML, so the address is never in the static page. */
const useIsClient = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )

export function Contact({ c }: { c: Content }) {
  const isClient = useIsClient()
  const email = isClient ? `${EMAIL.user}@${EMAIL.domain}` : null
  return (
    <section id="contact" className="band band--gold" aria-labelledby="contact-h">
      <div className="wrap sec">
        <div className="sec__label">
          <h2 id="contact-h">{c.contact.heading}</h2>
          <p className="lead">{c.contact.lead}</p>
        </div>
        <div className="sec__body contact">
          <p className="contact__email">
            <span className="visually-hidden">{c.contact.emailLabel}</span>
            {email ? (
              <a href={`mailto:${email}`}>{email}</a>
            ) : (
              <span>
                {EMAIL.user} [at] {EMAIL.domain}
              </span>
            )}
          </p>
          <ul className="contact__links">
            {c.contact.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} rel="me noopener">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="button" href={c.contact.resume.href} rel="noopener">
            {c.contact.resume.label}
          </a>
        </div>
      </div>
    </section>
  )
}
