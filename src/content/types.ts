export type Locale = 'en' | 'pt'
export type Lane = 'industry' | 'research' | 'teaching'

export interface Role {
  org: string
  title: string
  /** YYYY-MM */
  start: string
  /** YYYY-MM, or null for the present. */
  end: string | null
  lane: Lane
  location?: string
  bullets?: string[]
  /** Short roles shown as one line. */
  brief?: boolean
}

export interface Project {
  name: string
  where: string
  summary: string
  stack: string
  link?: { label: string; href: string }
}

export interface Content {
  locale: Locale
  htmlLang: string
  path: string
  meta: { title: string; description: string }
  nav: {
    about: string
    work: string
    loom: string
    writing: string
    contact: string
    switchLabel: string
    switchHref: string
    switchLang: string
    skip: string
  }
  hero: { headline: string; intro: string; hint: string; clothLabel: string }
  about: {
    heading: string
    paragraphs: string[]
    photoAlt: string
    languagesHeading: string
    languages: { name: string; level: number; note: string }[]
    toolsHeading: string
    tools: string[]
  }
  work: {
    heading: string
    lead: string
    laneLabels: Record<Lane, string>
    present: string
    roles: Role[]
    earlierHeading: string
    educationHeading: string
    education: { degree: string; school: string; years: string }[]
    projectsHeading: string
    projectsLead: string
    projects: Project[]
  }
  loom: {
    heading: string
    lead: string
    inputLabel: string
    defaultText: string
    legend: { function: string; content: string; punct: string; piece: string }
    note: string
    count: (tokens: number, closed: number, pieces: number) => string
  }
  writing: {
    heading: string
    paperHeading: string
    paper: { authors: string; year: number; title: string; venue: string; href: string; linkLabel: string }
    essaysHeading: string
    essaysLead: string
    essays: { title: string; year: number; href: string }[]
  }
  contact: {
    heading: string
    lead: string
    emailLabel: string
    links: { label: string; href: string }[]
    resume: { label: string; href: string }
  }
  footer: { text: string; source: string }
}
