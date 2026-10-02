/**
 * Real Manrope glyphs as SVG path data.
 *
 * The composed banner exports have to be set in the brand typeface, not in
 * whatever sans-serif librsvg happens to fall back to. So instead of emitting
 * <text> and hoping, we load the same Manrope weights the site loads through
 * next/font, and convert every string to outlines with opentype.js.
 *
 * Weight files are cached under scripts/.cache/fonts so repeat runs are offline.
 */

import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'
import * as woff2 from 'wawoff2'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const CACHE = path.join(HERE, '.cache/fonts')

// Fontsource mirrors the Google Fonts release of Manrope / JetBrains Mono —
// the same families app/layout.tsx pulls via next/font/google.
const FS = 'https://cdn.jsdelivr.net/npm/@fontsource'
const SOURCES = {
  'sans-400': `${FS}/manrope@latest/files/manrope-latin-400-normal.woff2`,
  'sans-500': `${FS}/manrope@latest/files/manrope-latin-500-normal.woff2`,
  'sans-600': `${FS}/manrope@latest/files/manrope-latin-600-normal.woff2`,
  'sans-700': `${FS}/manrope@latest/files/manrope-latin-700-normal.woff2`,
  'sans-800': `${FS}/manrope@latest/files/manrope-latin-800-normal.woff2`,
  'mono-500': `${FS}/jetbrains-mono@latest/files/jetbrains-mono-latin-500-normal.woff2`,
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'prime-line-brand-assets' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume()
          return download(res.headers.location).then(resolve, reject)
        }
        if (res.statusCode !== 200) {
          res.resume()
          return reject(new Error(`${res.statusCode} for ${url}`))
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      })
      .on('error', reject)
  })
}

const loaded = new Map()

/** Load (and cache to disk) one font weight, returning an opentype.js Font. */
export async function loadFont(key) {
  if (loaded.has(key)) return loaded.get(key)
  const url = SOURCES[key]
  if (!url) throw new Error(`unknown font key: ${key}`)

  fs.mkdirSync(CACHE, { recursive: true })
  const ttfPath = path.join(CACHE, `prime-${key}.ttf`)

  let ttf
  if (fs.existsSync(ttfPath)) {
    ttf = fs.readFileSync(ttfPath)
  } else {
    const compressed = await download(url)
    ttf = Buffer.from(await woff2.decompress(compressed))
    fs.writeFileSync(ttfPath, ttf)
  }

  const font = opentype.parse(
    ttf.buffer.slice(ttf.byteOffset, ttf.byteOffset + ttf.byteLength)
  )
  loaded.set(key, font)
  return font
}

export async function loadAllFonts() {
  const entries = await Promise.all(
    Object.keys(SOURCES).map(async (k) => [k, await loadFont(k)])
  )
  return Object.fromEntries(entries)
}

/* ── measuring ───────────────────────────────────────────────────────────── */

/** Advance width of `text` at `size` px, including a per-character `tracking`. */
export function measure(font, text, size, tracking = 0) {
  const scale = size / font.unitsPerEm
  let w = 0
  const chars = [...text]
  chars.forEach((ch, i) => {
    const glyph = font.charToGlyph(ch)
    w += glyph.advanceWidth * scale
    if (i < chars.length - 1) {
      const next = font.charToGlyph(chars[i + 1])
      w += font.getKerningValue(glyph, next) * scale + tracking
    }
  })
  return w
}

/**
 * Greedy word wrap that honours explicit `\n` breaks.
 * Returns an array of lines that each fit inside `maxWidth`.
 */
export function wrap(font, text, size, maxWidth, tracking = 0) {
  const lines = []
  for (const paragraph of String(text).split('\n')) {
    const words = paragraph.split(/\s+/).filter(Boolean)
    if (!words.length) {
      lines.push('')
      continue
    }
    let line = words[0]
    for (const word of words.slice(1)) {
      const candidate = `${line} ${word}`
      if (measure(font, candidate, size, tracking) <= maxWidth) {
        line = candidate
      } else {
        lines.push(line)
        line = word
      }
    }
    lines.push(line)
  }
  return lines
}

/* ── outlining ───────────────────────────────────────────────────────────── */

/**
 * Serialise opentype.js path commands to SVG path data.
 *
 * We do this by hand rather than calling `Path.toPathData()`: opentype.js 2.0.0
 * emits the literal string "NaN" for coordinates it considers unchanged from the
 * previous command, which silently kills the rest of the subpath in every SVG
 * renderer. Counters in e/o/a filled solid and single-contour glyphs vanished.
 */
function commandsToPathData(commands, decimals = 3) {
  const n = (v) => {
    const r = Number(Number(v).toFixed(decimals))
    return Number.isFinite(r) ? String(r) : '0'
  }
  const parts = []
  for (const c of commands) {
    switch (c.type) {
      case 'M':
        parts.push(`M${n(c.x)} ${n(c.y)}`)
        break
      case 'L':
        parts.push(`L${n(c.x)} ${n(c.y)}`)
        break
      case 'C':
        parts.push(`C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`)
        break
      case 'Q':
        parts.push(`Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`)
        break
      case 'Z':
        parts.push('Z')
        break
      default:
        break
    }
  }
  return parts.join('')
}

/** One glyph's outline, positioned at a baseline origin. */
function glyphPathData(glyph, x, y, size) {
  return commandsToPathData(glyph.getPath(x, y, size).commands)
}

/**
 * Convert one line of text to SVG path data — **one entry per glyph**.
 *
 * Why per glyph and not one concatenated `d`: libvips/librsvg silently stops
 * parsing a path attribute past a few thousand characters, which drops the tail
 * of any headline. Splitting per glyph keeps every attribute short while still
 * letting each glyph's outer contour and its counters share a path, so the holes
 * in `e`, `o` and `a` still punch through under the nonzero fill rule.
 *
 * `x`/`y` is the baseline origin; `align` shifts the run relative to it.
 */
export function textPath(font, text, { x = 0, y = 0, size = 16, tracking = 0, align = 'left' } = {}) {
  const scale = size / font.unitsPerEm
  const total = measure(font, text, size, tracking)
  let cursor = x
  if (align === 'center') cursor = x - total / 2
  else if (align === 'right') cursor = x - total

  const glyphs = []
  const chars = [...text]
  chars.forEach((ch, i) => {
    const glyph = font.charToGlyph(ch)
    const d = glyphPathData(glyph, cursor, y, size)
    if (d && d !== 'Z') glyphs.push(d)
    cursor += glyph.advanceWidth * scale
    if (i < chars.length - 1) {
      const next = font.charToGlyph(chars[i + 1])
      cursor += font.getKerningValue(glyph, next) * scale + tracking
    }
  })
  return glyphs
}

/**
 * Lay out a wrapped block.
 * Returns `{ ds, lines, lineHeight, width, height }` where `ds` is a flat array
 * of per-glyph path data. `y` is the baseline of the FIRST line.
 */
export function textBlock(
  font,
  text,
  { x = 0, y = 0, size = 16, lineHeight = 1.2, maxWidth = Infinity, tracking = 0, align = 'left' } = {}
) {
  const lines = wrap(font, text, size, maxWidth, tracking)
  const step = size * lineHeight
  const ds = lines.flatMap((line, i) =>
    line ? textPath(font, line, { x, y: y + i * step, size, tracking, align }) : []
  )
  return {
    ds,
    lines,
    lineHeight: step,
    width: Math.max(0, ...lines.map((l) => measure(font, l, size, tracking))),
    height: (lines.length - 1) * step + size,
  }
}

/** XML-escape a string for safe interpolation into SVG markup. */
export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c])
}
