import { describe, expect, it } from 'vitest'
import { tokenize } from './tokenize'

const texts = (s: string) => tokenize(s).map((t) => t.text)

describe('tokenize', () => {
  it('splits words and punctuation, keeping diacritics intact', () => {
    expect(texts('A língua é um sistema de padrões.')).toEqual([
      'A',
      'língua',
      'é',
      'um',
      'sistema',
      'de',
      'padrões',
      '.',
    ])
  })
  it('returns nothing for blank input', () => {
    expect(tokenize('   ')).toEqual([])
  })
  it('keeps decimals together and splits percent signs', () => {
    const t = tokenize('cost fell 77% from 9.86')
    expect(t.map((x) => x.text)).toEqual(['cost', 'fell', '77', '%', 'from', '9.86'])
    expect(t[2].kind).toBe('number')
    expect(t[3].kind).toBe('punct')
    expect(t[5].kind).toBe('number')
  })
  it('splits a long word into stem and suffix pieces', () => {
    const t = tokenize('linguisticamente')
    expect(t.map((x) => x.text)).toEqual(['linguistica', 'mente'])
    expect(t[0].continuation).toBe(false)
    expect(t[1].continuation).toBe(true)
  })
  it('does not split short words even if they end in a known suffix', () => {
    expect(texts('mente')).toEqual(['mente'])
    expect(texts('nation')).toEqual(['nation'])
  })
  it('marks closed-class words in Portuguese, English, Spanish and French', () => {
    const t = tokenize('A língua é um sistema')
    expect(t.map((x) => x.closedClass)).toEqual([true, false, true, true, false])
    expect(tokenize('the cat')[0].closedClass).toBe(true)
    expect(tokenize('el gato')[0].closedClass).toBe(true)
    expect(tokenize('le chat')[0].closedClass).toBe(true)
  })
  it('splits hyphenated compounds on the hyphen', () => {
    expect(texts('human-in-the-loop')).toEqual(['human', '-', 'in', '-', 'the', '-', 'loop'])
  })
  it('keeps apostrophe contractions as one word', () => {
    expect(texts("don't stop")).toEqual(["don't", 'stop'])
  })
})
