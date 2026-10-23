import { describe, expect, it } from 'vitest'
import { COLORS, GLYPHS, tileFor, tileForToken } from './tiles'
import { tokenize } from './tokenize'

describe('GLYPHS', () => {
  it('has at least eight distinct shapes with path data', () => {
    expect(GLYPHS.length).toBeGreaterThanOrEqual(8)
    const ids = new Set(GLYPHS.map((g) => g.id))
    expect(ids.size).toBe(GLYPHS.length)
    for (const g of GLYPHS) expect(g.d.length).toBeGreaterThan(10)
  })
})

describe('tileFor', () => {
  it('always weaves the same tile for the same text, case-insensitively', () => {
    expect(tileFor('Clarice')).toEqual(tileFor('clarice'))
  })
  it('produces a valid glyph index, rotation and colours', () => {
    const t = tileFor('sistema')
    expect(t.glyph).toBeGreaterThanOrEqual(0)
    expect(t.glyph).toBeLessThan(GLYPHS.length)
    expect([0, 1, 2, 3]).toContain(t.rotation)
    expect([COLORS.red, COLORS.green, COLORS.gold, COLORS.black]).toContain(t.fill)
    expect([COLORS.red, COLORS.green, COLORS.gold, COLORS.black]).toContain(t.ink)
    expect(t.fill).not.toBe(t.ink)
  })
  it('keeps the shape but takes the given hue when one is passed', () => {
    const free = tileFor('Clarice.ai')
    const fixed = tileFor('Clarice.ai', COLORS.red)
    expect(fixed.glyph).toBe(free.glyph)
    expect(fixed.rotation).toBe(free.rotation)
    expect([fixed.fill, fixed.ink]).toContain(COLORS.red)
    expect([fixed.fill, fixed.ink]).toContain(COLORS.black)
  })
  it('spreads different words across different tiles', () => {
    const words = [
      'a',
      'língua',
      'é',
      'um',
      'sistema',
      'de',
      'padrões',
      'tokens',
      'cloth',
      'loom',
      'weave',
      'kente',
    ]
    const keys = new Set(words.map((w) => JSON.stringify(tileFor(w))))
    expect(keys.size).toBeGreaterThan(words.length / 2)
  })
})

describe('tileForToken', () => {
  it('weaves punctuation as a black tile with gold ink', () => {
    const [dot] = tokenize('.')
    const t = tileForToken(dot)
    expect(t.fill).toBe(COLORS.black)
    expect(t.ink).toBe(COLORS.gold)
  })
  it('weaves closed-class words in gold', () => {
    const [the] = tokenize('the')
    const t = tileForToken(the)
    expect([t.fill, t.ink]).toContain(COLORS.gold)
  })
  it('weaves content words in red or green', () => {
    for (const w of ['sistema', 'cloth', 'language', 'tokens']) {
      const t = tileForToken(tokenize(w)[0])
      const c = t.fill === COLORS.black ? t.ink : t.fill
      expect([COLORS.red, COLORS.green]).toContain(c)
    }
  })
})
