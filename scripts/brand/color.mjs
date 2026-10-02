/**
 * Colour maths for the brand token pipeline.
 *
 * The site authors its colours as hex and rgba() in app/globals.css (oklch is
 * supported too). The style guide shows HEX / RGB / HSL for every colour, so
 * this module derives them rather than duplicating hand-written values that
 * would drift the moment a token changes.
 */

/* ── parsing ─────────────────────────────────────────────────────────────── */

/**
 * Parse any colour string the stylesheet uses: `oklch(L C H)`,
 * `oklch(L C H / A)`, `#RGB`, `#RRGGBB`, `#RRGGBBAA`.
 * Returns `{ r, g, b, a }` with r/g/b in 0..255, or null when unparseable.
 */
export function parseColor(input) {
  if (!input) return null
  const value = String(input).trim()

  const oklch = value.match(/^oklch\(\s*([^)]+)\)$/i)
  if (oklch) {
    const parts = oklch[1].split('/')
    const [l, c, h] = parts[0].trim().split(/\s+/).map(Number)
    if ([l, c, h].some((n) => !Number.isFinite(n))) return null
    const alpha = parts[1] !== undefined ? parseAlpha(parts[1]) : 1
    return { ...oklchToRgb(l, c, h), a: alpha }
  }

  const rgba = value.match(/^rgba?\(\s*([^)]+)\)$/i)
  if (rgba) {
    const [r, g, b, a] = rgba[1].split(/[\s,/]+/).filter(Boolean).map(Number)
    if ([r, g, b].some((n) => !Number.isFinite(n))) return null
    return { r, g, b, a: Number.isFinite(a) ? clamp(a, 0, 1) : 1 }
  }

  const hex = value.match(/^#([0-9a-f]{3,8})$/i)
  if (hex) {
    let h = hex[1]
    if (h.length === 3 || h.length === 4) h = [...h].map((ch) => ch + ch).join('')
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
    return { r, g, b, a }
  }

  return null
}

function parseAlpha(raw) {
  const t = raw.trim()
  if (t.endsWith('%')) return clamp(parseFloat(t) / 100, 0, 1)
  const n = Number(t)
  return Number.isFinite(n) ? clamp(n, 0, 1) : 1
}

/* ── oklch -> sRGB ───────────────────────────────────────────────────────── */

/** OKLCH (L 0..1, C, H in degrees) -> gamma-encoded sRGB 0..255, gamut-clipped. */
export function oklchToRgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)

  // OKLab -> LMS (cube-rooted)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  // LMS -> linear sRGB
  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

  return {
    r: Math.round(clamp(linearToSrgb(lr), 0, 1) * 255),
    g: Math.round(clamp(linearToSrgb(lg), 0, 1) * 255),
    b: Math.round(clamp(linearToSrgb(lb), 0, 1) * 255),
  }
}

function linearToSrgb(x) {
  return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055
}

/* ── formatting ──────────────────────────────────────────────────────────── */

export function toHex({ r, g, b }) {
  return '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase()
}

export function toRgbString({ r, g, b, a = 1 }) {
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${round(a, 3)})` : `rgb(${r}, ${g}, ${b})`
}

export function toHslString({ r, g, b, a = 1 }) {
  const { h, s, l } = rgbToHsl(r, g, b)
  const base = `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
  return a < 1 ? `hsla(${base}, ${round(a, 3)})` : `hsl(${base})`
}

export function rgbToHsl(r255, g255, b255) {
  const r = r255 / 255
  const g = g255 / 255
  const b = b255 / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60
    else if (max === g) h = ((b - r) / d + 2) * 60
    else h = ((r - g) / d + 4) * 60
  }
  return { h, s, l }
}

/** WCAG relative luminance of a gamma-encoded sRGB colour. */
export function relativeLuminance({ r, g, b }) {
  const f = (v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

/** WCAG 2.1 contrast ratio between two sRGB colours (1..21). */
export function contrastRatio(a, b) {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const light = Math.max(la, lb)
  const dark = Math.min(la, lb)
  return (light + 0.05) / (dark + 0.05)
}

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))
const round = (n, p) => Number(n.toFixed(p))
