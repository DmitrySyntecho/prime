/**
 * Logo + monogram variants derived from the files the site already ships:
 *
 *   public/brand/source/prime-line-av-logo-dark-bg.svg   (header / footer lockup)
 *   public/brand/source/prime-line-av-logo-light-bg.svg  (light-ground lockup)
 *   public/brand/source/prime-line-monogram.svg          (the "PL" disc favicon)
 *
 * Nothing is redrawn. Paths are read straight out of those files; variants only
 * change fills and framing, so a logo update flows through every export by
 * re-running the generator.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const SRC = path.join(ROOT, 'public/brand/source')

export const INK = '#03070A'
const read = (f) => fs.readFileSync(path.join(SRC, f), 'utf8')

const darkSrc = read('prime-line-av-logo-dark-bg.svg')
const lightSrc = read('prime-line-av-logo-light-bg.svg')
const monoSrc = read('prime-line-monogram.svg')

const [, , VB_W, VB_H] = darkSrc.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number)
export const LOGO_VIEWBOX = { width: VB_W, height: VB_H }
export const LOGO_ASPECT = VB_W / VB_H

/** Inner markup of an <svg> (everything between the root tags). */
const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim()

/** Gradient / filter ids are made unique per use so several logos can share a document. */
let uid = 0
const scope = (markup) => {
  const tag = `pl${++uid}`
  return markup.replace(/id="([^"]+)"/g, `id="${tag}_$1"`).replace(/url\(#([^)]+)\)/g, `url(#${tag}_$1)`)
}

/** Recolour every fill (solid and gradient) to one flat colour. */
const flat = (markup, color) =>
  markup
    .replace(/fill="(?:url\([^)]+\)|#[0-9A-Fa-f]{3,6}|white|black)"/g, `fill="${color}"`)
    .replace(/<defs>[\s\S]*?<\/defs>/, (defs) => defs.replace(/<linearGradient[\s\S]*?<\/linearGradient>/g, ''))

/**
 * Lockup body for a tone.
 *   dark  — white wordmark, gradient AV (the header logo)
 *   light — #2F2F2F wordmark, gradient AV (shipped light-bg file)
 *   white — knockout, all white
 *   black — all ink, for one-colour print / fax / engraving
 */
function lockupBody(tone) {
  if (tone === 'light') return inner(lightSrc)
  if (tone === 'white') return flat(inner(darkSrc), '#FFFFFF')
  if (tone === 'black') return flat(inner(darkSrc), INK)
  return inner(darkSrc)
}

export function logoSvg(tone = 'dark') {
  return `<svg width="${VB_W}" height="${VB_H}" viewBox="0 0 ${VB_W} ${VB_H}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${scope(lockupBody(tone))}\n</svg>\n`
}

/** Nested lockup for compositing into banners: top-left at (x, y), `height` px tall. */
export function logoNested({ x = 0, y = 0, height = 40, tone = 'dark' } = {}) {
  const w = height * LOGO_ASPECT
  return `<svg x="${x}" y="${y}" width="${w}" height="${height}" viewBox="0 0 ${VB_W} ${VB_H}">${scope(lockupBody(tone))}</svg>`
}

/* ── monogram ────────────────────────────────────────────────────────────── */

const [, , M_W] = monoSrc.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number)
const circle = monoSrc.match(/<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/)
const DISC = { cx: +circle[1], cy: +circle[2], r: +circle[3] }
const glyphPaths = [...monoSrc.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1])
const monoStops = [...monoSrc.matchAll(/stop-color="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1])
export const MONOGRAM_GRADIENT = monoStops

/**
 * The PL monogram. `tone`:
 *   brand — gradient disc, white glyphs (the shipped favicon)
 *   white — white disc, ink glyphs
 *   black — ink disc, white glyphs
 *   glyph — glyphs only, white, no disc (for use on brand colour)
 * `fill` scales the disc to that share of the canvas (1 = edge to edge), so
 * small favicons can drop the source file's built-in margin and stay legible.
 */
export function monogramSvg({ size = 512, tone = 'brand', fill = 2 * DISC.r / M_W, glyphColor } = {}) {
  const s = (size * fill) / (2 * DISC.r)
  const tx = size / 2 - DISC.cx * s
  const ty = size / 2 - DISC.cy * s
  const disc =
    tone === 'glyph'
      ? ''
      : tone === 'white'
        ? `<circle cx="${DISC.cx}" cy="${DISC.cy}" r="${DISC.r}" fill="#FFFFFF"/>`
        : tone === 'black'
          ? `<circle cx="${DISC.cx}" cy="${DISC.cy}" r="${DISC.r}" fill="${INK}"/>`
          : `<circle cx="${DISC.cx}" cy="${DISC.cy}" r="${DISC.r}" fill="url(#plMono)"/>`
  const gc = glyphColor || (tone === 'white' ? INK : '#FFFFFF')
  const defs =
    tone === 'brand'
      ? `<defs><linearGradient id="plMono" x1="${DISC.cx}" y1="${DISC.cy - DISC.r}" x2="${DISC.cx}" y2="${DISC.cy + DISC.r}" gradientUnits="userSpaceOnUse"><stop stop-color="${monoStops[0]}"/><stop offset="1" stop-color="${monoStops[1]}"/></linearGradient></defs>`
      : ''
  return [
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">`,
    defs,
    `<g transform="translate(${r4(tx)} ${r4(ty)}) scale(${r4(s)})">`,
    disc,
    ...glyphPaths.map((d) => `<path d="${d}" fill="${gc}"/>`),
    '</g>',
    '</svg>',
    '',
  ].join('\n')
}

/** Rounded-square app tile (PWA / apple-touch): monogram on the brand ink. */
export function appTileSvg({ size = 512, radius = 0, bg = INK, fill = 0.78 } = {}) {
  const mono = monogramSvg({ size, fill }).replace(/^<svg[^>]*>|<\/svg>\s*$/g, '')
  return [
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">`,
    `<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>`,
    mono,
    '</svg>',
    '',
  ].join('\n')
}

const r4 = (n) => Number(n.toFixed(4))
