import { describe, expect, it } from 'vitest'
import { fnv1a, mulberry32 } from './hash'

describe('fnv1a', () => {
  it('is deterministic and returns an unsigned 32-bit integer', () => {
    const a = fnv1a('língua')
    expect(a).toBe(fnv1a('língua'))
    expect(Number.isInteger(a)).toBe(true)
    expect(a).toBeGreaterThanOrEqual(0)
    expect(a).toBeLessThan(2 ** 32)
  })
  it('matches the reference vector for an empty string', () => {
    expect(fnv1a('')).toBe(0x811c9dc5)
  })
  it('separates close strings', () => {
    expect(fnv1a('a')).not.toBe(fnv1a('b'))
    expect(fnv1a('tokens')).not.toBe(fnv1a('token'))
  })
})

describe('mulberry32', () => {
  it('yields a reproducible sequence in [0, 1)', () => {
    const r1 = mulberry32(42)
    const r2 = mulberry32(42)
    const xs = Array.from({ length: 5 }, () => r1())
    const ys = Array.from({ length: 5 }, () => r2())
    expect(xs).toEqual(ys)
    for (const x of xs) {
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThan(1)
    }
  })
})
