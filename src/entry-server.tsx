import { renderToString } from 'react-dom/server'
import { App } from './App'
import { content, type Locale } from './content'
import { LINKS, NAME, SITE_URL } from './content/shared'

export function render(locale: Locale): string {
  return renderToString(<App locale={locale} />)
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export function head(locale: Locale): string {
  const c = content[locale]
  const url = `${SITE_URL}${c.path}`
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: NAME,
    alternateName: 'Jon Torres',
    honorificSuffix: 'PhD',
    jobTitle:
      locale === 'pt'
        ? 'Linguista computacional e engenheiro de PLN'
        : 'Computational Linguist and NLP Engineer',
    description: c.meta.description,
    url: SITE_URL + '/',
    image: `${SITE_URL}/jon.webp`,
    worksFor: { '@type': 'Organization', name: 'Clarice.ai', url: LINKS.clarice },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Universidade de São Paulo' },
      { '@type': 'CollegeOrUniversity', name: 'Universidade Federal de São Carlos' },
    ],
    address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
    sameAs: [LINKS.linkedin, LINKS.github, LINKS.medium, LINKS.stackoverflow],
    knowsAbout: [
      'Natural language processing',
      'Computational linguistics',
      'Large language models',
      'LLM evaluation',
      'Semantics',
      'Pragmatics',
      'Language acquisition',
    ],
    knowsLanguage: ['pt-BR', 'en', 'es', 'fr'],
  }
  return [
    `<title>${esc(c.meta.title)}</title>`,
    `<meta name="description" content="${esc(c.meta.description)}">`,
    `<meta name="author" content="${NAME}">`,
    `<meta name="robots" content="index, follow">`,
    `<link rel="canonical" href="${url}">`,
    `<link rel="alternate" hreflang="en" href="${SITE_URL}/">`,
    `<link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/pt/">`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">`,
    `<meta property="og:type" content="profile">`,
    `<meta property="og:title" content="${esc(c.meta.title)}">`,
    `<meta property="og:description" content="${esc(c.meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${SITE_URL}/og.png">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:locale" content="${locale === 'pt' ? 'pt_BR' : 'en_US'}">`,
    `<meta property="og:locale:alternate" content="${locale === 'pt' ? 'en_US' : 'pt_BR'}">`,
    `<meta property="profile:first_name" content="Jonathan">`,
    `<meta property="profile:last_name" content="Torres">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(c.meta.title)}">`,
    `<meta name="twitter:description" content="${esc(c.meta.description)}">`,
    `<meta name="twitter:image" content="${SITE_URL}/og.png">`,
    `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export function pages() {
  return (Object.keys(content) as Locale[]).map((locale) => ({
    locale,
    path: content[locale].path,
    htmlLang: content[locale].htmlLang,
  }))
}
