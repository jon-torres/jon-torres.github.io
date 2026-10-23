import type { Content, Lane } from '../content'

const START = 2012
const END_MONTHS = (2027 - START) * 12
const NOW = '2026-10'
const LANES: Lane[] = ['industry', 'research', 'teaching']

const months = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return (y - START) * 12 + (m - 1)
}
const pct = (n: number) => `${(n / END_MONTHS) * 100}%`

/** Two-lane career chart in plain HTML: left and width are percentages of the 2012–2027 span. */
export function Timeline({ c }: { c: Content }) {
  const years = Array.from({ length: 8 }, (_, i) => START + i * 2)
  return (
    <div className="chart" aria-hidden="true">
      {LANES.map((lane) => (
        <div className="chart__row" key={lane}>
          <span className="chart__lane">{c.work.laneLabels[lane]}</span>
          <div className="chart__track">
            {c.work.roles
              .filter((r) => r.lane === lane)
              .map((r) => {
                const s = months(r.start)
                const e = months(r.end ?? NOW) + 1
                return (
                  <span
                    key={r.org + r.start}
                    className={`chart__bar chart__bar--${lane}`}
                    style={{ left: pct(s), width: pct(e - s) }}
                    title={`${r.org}, ${r.title}`}
                  />
                )
              })}
          </div>
        </div>
      ))}
      <div className="chart__row">
        <span className="chart__lane" />
        <div className="chart__years">
          {years.map((y) => (
            <span key={y} style={{ left: pct((y - START) * 12) }}>
              {y}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
