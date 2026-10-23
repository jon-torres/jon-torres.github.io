/**
 * Renders the app to static HTML for each locale so the page is indexable
 * without JavaScript. Runs after `vite build` and the SSR build.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const { render, head, pages } = await import(resolve(dist, 'server/entry-server.js'))

for (const { locale, path, htmlLang } of pages()) {
  const html = template
    .replace('<html lang="en">', `<html lang="${htmlLang}">`)
    .replace('<!--app-head-->', head(locale))
    .replace('<!--app-html-->', render(locale))
  const file = resolve(dist, `.${path}index.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  if (path === '/') writeFileSync(resolve(dist, '404.html'), html)
  console.log(`prerendered ${path} (${html.length} bytes)`)
}

rmSync(resolve(dist, 'server'), { recursive: true, force: true })
