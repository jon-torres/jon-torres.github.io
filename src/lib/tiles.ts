import { fnv1a } from './hash'
import type { Token } from './tokenize'

export const COLORS = {
  black: '#000000',
  red: '#E3262A',
  green: '#11803D',
  gold: '#F5A21D',
  cotton: '#EFE3C6',
} as const

export type Hue = typeof COLORS.red | typeof COLORS.green | typeof COLORS.gold

/**
 * Glyphs are SVG path data in a 100×100 box, filled with the even-odd rule so
 * inner subpaths become holes. The same string draws on canvas via Path2D and
 * in SVG via <path d>.
 */
export interface Glyph {
  id: string
  d: string
}

const circle = (cx: number, cy: number, r: number) =>
  `M${cx + r} ${cy}A${r} ${r} 0 1 0 ${cx - r} ${cy}A${r} ${r} 0 1 0 ${cx + r} ${cy}Z`

export const GLYPHS: Glyph[] = [
  { id: 'frame', d: 'M8 8H92V92H8Z M30 30V70H70V30Z' },
  { id: 'triangle', d: 'M8 90L50 10L92 90Z' },
  { id: 'wedge', d: 'M8 8H92L8 92Z' },
  { id: 'bars', d: 'M10 8H30V92H10Z M40 8H60V92H40Z M70 8H90V92H70Z' },
  { id: 'zig', d: 'M8 12H92V30L38 70H92V88H8V70L62 30H8Z' },
  {
    id: 'band',
    d: `M0 64L64 0L100 36L36 100Z ${circle(30, 70, 7)} ${circle(50, 50, 7)} ${circle(70, 30, 7)}`,
  },
  {
    id: 'dots',
    d: `${circle(30, 30, 11)} ${circle(70, 30, 11)} ${circle(30, 70, 11)} ${circle(70, 70, 11)}`,
  },
  { id: 'chevron', d: 'M8 66L50 22L92 66V92L50 48L8 92Z' },
  { id: 'tall', d: 'M24 8H76V92H24Z M40 24V76H60V24Z' },
  { id: 'diamond', d: 'M50 6L94 50L50 94L6 50Z M50 30L70 50L50 70L30 50Z' },
  { id: 'steps', d: 'M8 92V64H36V36H64V8H92V92Z' },
  { id: 'comb', d: 'M8 8H92V26H30V41H76V59H30V74H92V92H8Z' },
]

const DOTS = GLYPHS.findIndex((g) => g.id === 'dots')
const HUES: Hue[] = [COLORS.red, COLORS.green, COLORS.gold]

export interface Tile {
  glyph: number
  /** Quarter turns clockwise. */
  rotation: 0 | 1 | 2 | 3
  fill: string
  ink: string
}

function weave(h: number, hue: Hue, glyphCount = GLYPHS.length): Tile {
  const glyph = h % glyphCount
  const rotation = ((h >>> 8) & 3) as Tile['rotation']
  const inverted = ((h >>> 16) & 7) === 0
  return inverted
    ? { glyph, rotation, fill: COLORS.black, ink: hue }
    : { glyph, rotation, fill: hue, ink: COLORS.black }
}

/** The same text always weaves the same tile. Pass a hue to fix the colour and keep only the shape from the text. */
export function tileFor(text: string, hue?: Hue): Tile {
  const h = fnv1a(text.toLowerCase())
  return weave(h, hue ?? HUES[(h >>> 12) % HUES.length])
}

/** Colour is data: gold for closed-class words, black for punctuation, red or green for the rest. */
export function tileForToken(token: Token): Tile {
  const h = fnv1a(token.text.toLowerCase())
  if (token.kind === 'punct') {
    return {
      glyph: DOTS,
      rotation: ((h >>> 8) & 3) as Tile['rotation'],
      fill: COLORS.black,
      ink: COLORS.gold,
    }
  }
  if (token.closedClass) return weave(h, COLORS.gold)
  if (token.kind === 'number') return weave(h, COLORS.green)
  return weave(h, (h >>> 12) & 1 ? COLORS.red : COLORS.green)
}
