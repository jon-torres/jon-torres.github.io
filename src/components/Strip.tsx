import { useEffect, useRef, useState } from 'react'
import { tileForToken } from '../lib/tiles'
import { tokenize } from '../lib/tokenize'
import { Tile } from './Tile'

interface Props {
  /** The strip is woven from this text, repeated to fill the row. */
  text: string
}

const TILE = 22
const GAP = 4
const DEFAULT_COUNT = 64

/** A narrow woven band, used where two sections of the page are sewn together. Fills whatever width it gets. */
export function Strip({ text }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(DEFAULT_COUNT)
  const tokens = tokenize(text)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const needed = Math.ceil(entry.contentRect.width / (TILE + GAP)) + 1
      setCount((c) => (needed > c ? needed : c))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (tokens.length === 0) return null
  const tiles = Array.from({ length: count }, (_, i) => {
    const tile = tileForToken(tokens[i % tokens.length])
    return { ...tile, rotation: ((tile.rotation + Math.floor(i / tokens.length)) & 3) as 0 | 1 | 2 | 3 }
  })
  return (
    <div className="strip" aria-hidden="true" ref={ref}>
      {tiles.map((t, i) => (
        <Tile key={i} tile={t} size="100%" className="strip__tile" />
      ))}
    </div>
  )
}
