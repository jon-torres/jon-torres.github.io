import { tileForToken } from '../lib/tiles'
import { tokenize } from '../lib/tokenize'
import { Tile } from './Tile'

interface Props {
  /** The strip is woven from this text, repeated to fill the row. */
  text: string
  count?: number
}

/** A narrow woven band, used where two sections of the page are sewn together. */
export function Strip({ text, count = 64 }: Props) {
  const tokens = tokenize(text)
  if (tokens.length === 0) return null
  const tiles = Array.from({ length: count }, (_, i) => {
    const tile = tileForToken(tokens[i % tokens.length])
    return { ...tile, rotation: ((tile.rotation + Math.floor(i / tokens.length)) & 3) as 0 | 1 | 2 | 3 }
  })
  return (
    <div className="strip" aria-hidden="true">
      {tiles.map((t, i) => (
        <Tile key={i} tile={t} size="100%" className="strip__tile" />
      ))}
    </div>
  )
}
