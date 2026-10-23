import { useEffect } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Loom } from './components/Loom'
import { Strip } from './components/Strip'
import { Work } from './components/Work'
import { Writing } from './components/Writing'
import { content, type Locale } from './content'

export function App({ locale }: { locale: Locale }) {
  const c = content[locale]
  useEffect(() => {
    document.title = c.meta.title
    document.documentElement.lang = c.htmlLang
  }, [c])
  return (
    <>
      <Header c={c} />
      <main id="main">
        <Hero c={c} />
        <Strip text={c.hero.headline} />
        <About c={c} />
        <Strip text={c.work.heading + ' ' + c.work.lead} />
        <Work c={c} />
        <Loom c={c} />
        <Strip text={c.writing.heading + ' ' + c.writing.paper.title} />
        <Writing c={c} />
        <Contact c={c} />
      </main>
      <Footer c={c} />
    </>
  )
}
