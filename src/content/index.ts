import { en } from './en'
import { pt } from './pt'
import type { Content, Locale } from './types'

export const content: Record<Locale, Content> = { en, pt }
export const locales: Locale[] = ['en', 'pt']
export type { Content, Locale, Lane, Role, Project } from './types'
