/**
 * A small rule-based tokenizer. No model behind it: whitespace and
 * punctuation splitting, a suffix list for a WordPiece-style split of long
 * words, and a closed-class word list for pt, en, es and fr.
 */
export type TokenKind = 'word' | 'number' | 'punct'

export interface Token {
  text: string
  kind: TokenKind
  /** True for the second piece of a split word (rendered with a leading ##). */
  continuation: boolean
  /** Articles, prepositions, pronouns, conjunctions, copulas, auxiliaries. */
  closedClass: boolean
}

const CLOSED_CLASS = new Set(
  `
  o a os as um uma uns umas de do da dos das em no na nos nas por pelo pela pelos pelas
  para pra com sem sob sobre entre até e ou mas nem que se não sim eu tu ele ela nós vós
  eles elas me te lhe lhes vos meu minha teu tua seu sua nosso nossa este esta esse essa
  aquele aquela isto isso aquilo ao à aos às é são foi era ser estar está estão há tem têm
  como mais menos muito já também onde quando porque qual quais quem cujo
  an the of in on at to for from by with without about into onto over under and or but
  nor so yet if that which who whom whose this these those it its is are was were be been
  being has have had does did not yes i you he she we they him her us them my your his our
  their
  el la los las unos unas del con sin hasta y pero ni si yo tú él nosotros ellos ellas le
  les mi tu su es son fue al más muy ya
  le les l une des du au aux dans sur sous avec pour par et mais ne pas non oui je il elle
  nous vous ils lui leur mon ma mes ton ta tes ce cet cette ces est sont était être avoir
  ont
  `
    .split(/\s+/)
    .filter(Boolean),
)

const SUFFIXES = [
  'ization',
  'isation',
  'ational',
  'ciones',
  'mentos',
  'idades',
  'mente',
  'ância',
  'ência',
  'áveis',
  'íveis',
  'ismos',
  'istas',
  'iendo',
  'ções',
  'ção',
  'mento',
  'idade',
  'ismo',
  'ista',
  'ável',
  'ível',
  'ando',
  'endo',
  'indo',
  'ados',
  'adas',
  'idos',
  'idas',
  'ción',
  'idad',
  'able',
  'ible',
  'tion',
  'sion',
  'ness',
  'ment',
  'ling',
  'ical',
  'ally',
  'less',
  'euse',
  'ique',
  'isme',
  'iste',
  'ing',
  'ity',
  'ous',
  'ful',
  'ize',
  'ise',
  'ers',
  'ado',
  'ada',
  'ido',
  'ida',
  'ité',
  'eur',
].sort((a, b) => b.length - a.length)

const MIN_SPLIT_LENGTH = 8
const MIN_STEM_LENGTH = 4

const PATTERN = /(\d+(?:[.,]\d+)*)|([\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*)|([^\s\p{L}\p{M}\d])/gu

function splitSuffix(word: string): [string, string] | null {
  if (word.length < MIN_SPLIT_LENGTH) return null
  const lower = word.toLowerCase()
  for (const suffix of SUFFIXES) {
    if (lower.endsWith(suffix) && lower.length - suffix.length >= MIN_STEM_LENGTH) {
      const cut = word.length - suffix.length
      return [word.slice(0, cut), word.slice(cut)]
    }
  }
  return null
}

export function tokenize(text: string): Token[] {
  const tokens: Token[] = []
  for (const match of text.matchAll(PATTERN)) {
    const [, number, word, punct] = match
    if (number !== undefined) {
      tokens.push({ text: number, kind: 'number', continuation: false, closedClass: false })
    } else if (word !== undefined) {
      const closedClass = CLOSED_CLASS.has(word.toLowerCase())
      const split = closedClass ? null : splitSuffix(word)
      if (split) {
        tokens.push({ text: split[0], kind: 'word', continuation: false, closedClass: false })
        tokens.push({ text: split[1], kind: 'word', continuation: true, closedClass: false })
      } else {
        tokens.push({ text: word, kind: 'word', continuation: false, closedClass })
      }
    } else if (punct !== undefined) {
      tokens.push({ text: punct, kind: 'punct', continuation: false, closedClass: false })
    }
  }
  return tokens
}
