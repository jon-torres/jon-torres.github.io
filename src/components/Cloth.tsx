import { useEffect, useRef } from 'react'
import { fnv1a, mulberry32 } from '../lib/hash'
import { COLORS, GLYPHS, tileFor, tileForToken, type Tile } from '../lib/tiles'
import { tokenize } from '../lib/tokenize'

interface Cell {
  tile: Tile
  next: Tile | null
  revealAt: number
  flipAt: number
  lastFlip: number
}

const REVEAL_MS = 420
const FLIP_MS = 480
const HOVER_COOLDOWN_MS = 1400
const IDLE_EVERY_MS = 1700

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)

interface Props {
  /** The cloth is woven from this text. */
  seed: string
  label: string
}

/**
 * A full-bleed generative cloth on a canvas. Tiles come from the seed
 * sentence's tokens, repeated like a weave with the rotation shifting each
 * row. It weaves in once on load; after that it only moves in answer to the
 * pointer (hover re-weaves a patch, click re-weaves everything) and a slow
 * idle flip. With reduced motion it renders once and stays still.
 */
export function Cloth({ seed, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const paths = GLYPHS.map((g) => new Path2D(g.d))
    const tokens = tokenize(seed).filter((t) => t.kind !== 'punct')
    const rng = mulberry32(fnv1a(seed))

    let cols = 0
    let rows = 0
    let size = 0
    let grout = 0
    let cells: Cell[] = []
    let raf = 0
    let generation = 0

    const variant = (i: number, gen: number): Tile => {
      const base = tokens.length
        ? tileForToken(tokens[(i + Math.floor(i / cols) * 5) % tokens.length])
        : tileFor(String(i))
      const row = Math.floor(i / cols)
      const t = gen === 0 ? base : tileFor(`${seed}:${i}:${gen}`)
      return { ...t, rotation: ((t.rotation + row + gen) & 3) as Tile['rotation'] }
    }

    const layout = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      size = rect.width < 640 ? 46 : rect.width < 1100 ? 60 : 72
      grout = Math.round(size * 0.14)
      cols = Math.ceil(rect.width / size)
      rows = Math.ceil(rect.height / size)
    }

    const weave = (originCol: number, originRow: number, instant: boolean) => {
      const now = performance.now()
      generation += 1
      cells = Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const dist = Math.hypot(col - originCol, row - originRow)
        const delay = generation === 1 ? row * 70 + col * 9 : dist * 42
        return {
          tile: variant(i, generation - 1),
          next: null,
          revealAt: instant ? now - REVEAL_MS : now + delay,
          flipAt: -1,
          lastFlip: 0,
        }
      })
      start()
    }

    const draw = (now: number) => {
      const w = canvas.width / Math.min(window.devicePixelRatio || 1, 2)
      const h = canvas.height / Math.min(window.devicePixelRatio || 1, 2)
      ctx.fillStyle = COLORS.black
      ctx.fillRect(0, 0, w, h)
      let animating = false
      const inner = size - grout
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i]
        const p = clamp01((now - c.revealAt) / REVEAL_MS)
        let q = 1
        if (c.flipAt >= 0) {
          q = clamp01((now - c.flipAt) / FLIP_MS)
          if (q >= 0.5 && c.next) {
            c.tile = c.next
            c.next = null
          }
          if (q >= 1) c.flipAt = -1
        }
        if (p < 1 || q < 1) animating = true
        const sx = easeOut(p) * Math.abs(Math.cos(Math.PI * q))
        if (sx <= 0.02) continue
        const col = i % cols
        const row = Math.floor(i / cols)
        const cx = col * size + size / 2
        const cy = row * size + size / 2
        ctx.save()
        ctx.translate(cx, cy)
        ctx.scale(sx, 1)
        ctx.rotate((c.tile.rotation * Math.PI) / 2)
        ctx.fillStyle = c.tile.fill
        ctx.fillRect(-inner / 2, -inner / 2, inner, inner)
        ctx.scale(inner / 100, inner / 100)
        ctx.translate(-50, -50)
        ctx.fillStyle = c.tile.ink
        ctx.fill(paths[c.tile.glyph], 'evenodd')
        ctx.restore()
      }
      return animating
    }

    const frame = (now: number) => {
      raf = 0
      if (draw(now)) raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const flip = (i: number, now: number) => {
      const c = cells[i]
      if (!c || c.flipAt >= 0 || now - c.lastFlip < HOVER_COOLDOWN_MS || now < c.revealAt + REVEAL_MS) return
      c.next = tileFor(`${seed}:${i}:${Math.floor(rng() * 1e9)}`)
      c.flipAt = now
      c.lastFlip = now
      start()
    }

    const cellAt = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect()
      const col = Math.floor((x - rect.left) / size)
      const row = Math.floor((y - rect.top) / size)
      return { col, row }
    }

    const onMove = (e: PointerEvent) => {
      if (reduced) return
      const { col, row } = cellAt(e.clientX, e.clientY)
      const now = performance.now()
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const c = col + dc
          const r = row + dr
          if (c < 0 || r < 0 || c >= cols || r >= rows) continue
          flip(r * cols + c, now)
        }
      }
    }

    const onClick = (e: PointerEvent) => {
      const { col, row } = cellAt(e.clientX, e.clientY)
      weave(col, row, reduced)
    }

    layout()
    weave(0, 0, reduced)

    const ro = new ResizeObserver(() => {
      layout()
      weave(0, 0, true)
    })
    ro.observe(canvas)

    let idle = 0
    if (!reduced) {
      idle = window.setInterval(() => {
        if (document.hidden || cells.length === 0) return
        flip(Math.floor(rng() * cells.length), performance.now())
      }, IDLE_EVERY_MS)
    }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerdown', onClick)
    return () => {
      ro.disconnect()
      window.clearInterval(idle)
      if (raf) cancelAnimationFrame(raf)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onClick)
    }
  }, [seed])

  return <canvas ref={canvasRef} className="cloth" role="img" aria-label={label} />
}
