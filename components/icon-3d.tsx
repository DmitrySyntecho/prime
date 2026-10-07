/**
 * 3D brand icons rendered in Higgsfield (see /styleguide → Icons). One light
 * setup, one camera, one palette, so they read as a set anywhere on the site.
 *
 * Files: public/brand/icons-3d/ui/<name>.webp (192², transparent). In the light
 * theme <img> is counter-inverted by globals.css, so the icons keep their colours.
 */

export type Icon3DName =
  | "led-wall"
  | "speaker"
  | "moving-head"
  | "stage"
  | "dj-deck"
  | "tv-display"
  | "pipe-drape"
  | "microphone"
  | "projector"
  | "live-camera"
  | "delivery-truck"
  | "quote-cart"
  | "sound-console"
  | "installation"
  | "clapperboard"
  | "led-billboard"
  | "live-stream"
  | "render-3d"
  | "flight-case"
  | "award"
  | "headset"
  | "location-pin"
  | "stopwatch"
  | "shield"
  | "walkie-talkie"
  | "heart"
  | "calendar"
  | "clipboard"
  // price breakdown rows
  | "rental-tag"
  | "setup-tools"
  | "savings"
  | "receipt"
  // LED wall page
  | "led-outdoor"
  | "led-trailer"
  | "pixel-pitch"
  | "content-play"
  | "rigging"

export function Icon3D({
  name,
  size = 40,
  className = "",
  alt = "",
  priority = false,
}: {
  name: Icon3DName
  /** Above-the-fold icons load eagerly. */
  priority?: boolean
  /** Rendered edge length in CSS px. */
  size?: number
  className?: string
  alt?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/icons-3d/ui/${name}.webp`}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      draggable={false}
      className={`pointer-events-none select-none object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

/**
 * Glass tile that holds a 3D icon — replaces the old pink line-icon tiles.
 * The icon overflows the tile slightly so it reads as an object, not a glyph.
 */
export function Icon3DTile({
  name,
  size = 48,
  className = "",
}: {
  name: Icon3DName
  /** Tile edge in px; the icon renders ~1.25× larger and overflows. */
  size?: number
  className?: string
}) {
  const icon = Math.round(size * 1.25)
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-[14px] border border-[#FF2D6F]/25 ${className}`}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(ellipse 80% 80% at 50% 30%, rgba(255,45,111,0.22), rgba(255,45,111,0.06) 70%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <Icon3D name={name} size={icon} className="drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]" />
    </span>
  )
}
