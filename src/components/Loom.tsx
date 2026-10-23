import { useId, useMemo, useState } from 'react'
import type { Content } from '../content'
import { COLORS, tileForToken } from '../lib/tiles'
import { tokenize } from '../lib/tokenize'
import { Tile } from './Tile'

export function Loom({ c }: { c: Content }) {
  const [text, setText] = useState(c.loom.defaultText)
  const [active, setActive] = useState<number | null>(null)
  const id = useId()
  const tokens = useMemo(() => tokenize(text), [text])
  const tiles = useMemo(() => tokens.map(tileForToken), [tokens])
  const closed = tokens.filter((t) => t.closedClass).length
  const pieces = tokens.filter((t) => t.continuation).length

  const sample = (fill: string, ink: string, glyph: number) => ({ glyph, rotation: 0 as const, fill, ink })

  return (
    <section id="loom" className="band band--black loom" aria-labelledby="loom-h">
      <div className="wrap sec">
        <div className="sec__label">
          <h2 id="loom-h">{c.loom.heading}</h2>
          <p className="lead">{c.loom.lead}</p>
        </div>
        <div className="sec__body">
          <label className="loom__label" htmlFor={id}>
            {c.loom.inputLabel}
          </label>
          <input
            id={id}
            className="loom__input"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setActive(null)
            }}
            autoComplete="off"
            spellCheck={false}
            maxLength={160}
          />
          <ol className="tokens" aria-label="Tokens" onPointerLeave={() => setActive(null)}>
            {tokens.map((t, i) => {
              const hue = tiles[i].fill === COLORS.black ? tiles[i].ink : tiles[i].fill
              return (
                <li
                  key={i}
                  className={`token${active === i ? ' is-active' : ''}`}
                  style={{ '--hue': hue } as React.CSSProperties}
                  onPointerEnter={() => setActive(i)}
                >
                  {t.continuation ? <span className="token__hash">##</span> : null}
                  {t.text}
                </li>
              )
            })}
          </ol>
          <p className="loom__count">{c.loom.count(tokens.length, closed, pieces)}</p>
          <div className="weft" aria-hidden="true" onPointerLeave={() => setActive(null)}>
            {tiles.map((t, i) => (
              <span
                key={i}
                className={`weft__cell${active === i ? ' is-active' : ''}`}
                onPointerEnter={() => setActive(i)}
              >
                <Tile tile={t} size="100%" />
              </span>
            ))}
          </div>
          <dl className="legend">
            <div>
              <dt>
                <Tile tile={sample(COLORS.gold, COLORS.black, 0)} size={22} />
              </dt>
              <dd>{c.loom.legend.function}</dd>
            </div>
            <div>
              <dt>
                <Tile tile={sample(COLORS.red, COLORS.black, 1)} size={22} />
                <Tile tile={sample(COLORS.green, COLORS.black, 4)} size={22} />
              </dt>
              <dd>{c.loom.legend.content}</dd>
            </div>
            <div>
              <dt>
                <Tile tile={sample(COLORS.black, COLORS.gold, 6)} size={22} />
              </dt>
              <dd>{c.loom.legend.punct}</dd>
            </div>
            <div>
              <dt>
                <span className="token__hash legend__hash">##</span>
              </dt>
              <dd>{c.loom.legend.piece}</dd>
            </div>
          </dl>
          <p className="loom__note">{c.loom.note}</p>
        </div>
      </div>
    </section>
  )
}
