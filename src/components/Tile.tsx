import { GLYPHS, type Tile as TileSpec } from '../lib/tiles'

interface Props {
  tile: TileSpec
  size?: number | string
  className?: string
  title?: string
}

/** One woven tile as inline SVG. Same path data the canvas uses. */
export function Tile({ tile, size = 32, className, title }: Props) {
  const glyph = GLYPHS[tile.glyph]
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <rect width="100" height="100" fill={tile.fill} />
      <path
        d={glyph.d}
        fill={tile.ink}
        fillRule="evenodd"
        transform={`rotate(${tile.rotation * 90} 50 50)`}
      />
    </svg>
  )
}
