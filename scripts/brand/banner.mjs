/**
 * Composes finished advertising banners: a Higgsfield background plate, a
 * readability scrim, and a real ad stack — logo, eyebrow pill, headline with
 * the brand's italic gradient accent word, description, offer chip and CTA.
 *
 * Every value mirrors a site primitive:
 *   eyebrow  → .ds-pill          (gold, 700, 0.14em, uppercase, glowing dot)
 *   headline → hero H1           (Manrope 800, -0.03em, 1.02–1.08 leading)
 *   accent   → .ds-accent-text   (italic, pink → gold → pink, 135°)
 *   offer    → floating glass card in hero-section.tsx
 *   CTA      → .ds-btn-primary   (pink → coral 135°, radius 12, 800 weight)
 */

import { textPath, measure } from './typeset.mjs'
import { logoNested } from './marks.mjs'

export const C = {
  ink: '#050310',
  pink: '#FF2D6F',
  coral: '#FF5E3A',
  gold: '#FFD24A',
  white: '#FFFFFF',
  text: '#E6F4EE',
}

const r = (n, p = 2) => Number(n.toFixed(p))
const ITALIC_SKEW = -11 // degrees — matches the browser's synthesised oblique

/** `[word]` marks the accent run. Returns [{text, accent}] per line. */
function parseLine(line) {
  const out = []
  for (const part of line.split(/(\[[^\]]+\])/)) {
    if (!part) continue
    out.push(part.startsWith('[') ? { text: part.slice(1, -1), accent: true } : { text: part, accent: false })
  }
  return out
}

export function bannerSvg(spec, fonts) {
  const { width: W, height: H, box, type, content, anchor } = spec
  const f = { 400: fonts['sans-400'], 500: fonts['sans-500'], 600: fonts['sans-600'], 700: fonts['sans-700'], 800: fonts['sans-800'] }

  /* ── measure ── */
  const logoH = type.logo
  const gapLogo = type.logo * 1.0

  const pillFont = f[700]
  const pillTrack = type.eyebrow * 0.14
  const pillLabel = content.eyebrow.toUpperCase()
  const pillPadX = type.eyebrow * 1.15
  const pillDot = type.eyebrow * 0.5
  const pillH = type.eyebrow * 2.6
  const pillW = pillPadX + pillDot + type.eyebrow * 0.66 + measure(pillFont, pillLabel, type.eyebrow, pillTrack) + pillPadX
  const gapPill = type.headline * 0.42

  const hlTrack = type.headline * -0.03
  const hlLead = type.headline * 1.06
  const hlLines = content.headline.split('\n').map(parseLine)
  const hlWidth = Math.max(
    ...hlLines.map((segs) => segs.reduce((w, s) => w + measure(f[800], s.text, type.headline, hlTrack), 0))
  )
  if (hlWidth > box.w + 2) console.warn(`  ! ${spec.id}: headline ${Math.round(hlWidth)}px > box ${box.w}px`)
  const hlH = (hlLines.length - 1) * hlLead + type.headline
  const gapHl = type.body * 1.05

  const bodyLines = wrap(f[400], content.body, type.body, box.w)
  const bodyLead = type.body * 1.55
  const bodyH = (bodyLines.length - 1) * bodyLead + type.body
  const gapBody = type.body * 1.45

  const offerH = type.offer * 2.9
  const gapOffer = type.body * 1.1
  const ctaH = type.cta * 3.1

  const stackH = logoH + gapLogo + pillH + gapPill + hlH + gapHl + bodyH + gapBody + offerH + gapOffer + ctaH
  const top = anchor === 'bottom' ? H - spec.padBottom - stackH : (H - stackH) / 2

  /* ── draw ── */
  const out = []
  const defs = []
  out.push(`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`)

  defs.push(
    `<linearGradient id="brand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.pink}"/><stop offset="1" stop-color="${C.coral}"/></linearGradient>`
  )
  out.push(scrim(spec, W, H, defs))

  let y = top
  out.push(logoNested({ x: box.x, y, height: logoH, tone: 'dark' }))
  y += logoH + gapLogo

  // Eyebrow pill (.ds-pill)
  out.push(
    `<rect x="${r(box.x)}" y="${r(y)}" width="${r(pillW)}" height="${r(pillH)}" rx="${r(pillH / 2)}" fill="#FFB837" fill-opacity="0.12" stroke="#FFB837" stroke-opacity="0.38" stroke-width="${r(Math.max(1.2, type.eyebrow * 0.07))}"/>`
  )
  const dotCx = box.x + pillPadX + pillDot / 2
  out.push(`<circle cx="${r(dotCx)}" cy="${r(y + pillH / 2)}" r="${r(pillDot * 1.3)}" fill="${C.gold}" fill-opacity="0.25"/>`)
  out.push(`<circle cx="${r(dotCx)}" cy="${r(y + pillH / 2)}" r="${r(pillDot / 2)}" fill="${C.gold}"/>`)
  out.push(
    glyphs(textPath(pillFont, pillLabel, { x: box.x + pillPadX + pillDot + type.eyebrow * 0.66, y: y + pillH / 2 + type.eyebrow * 0.36, size: type.eyebrow, tracking: pillTrack }), C.gold)
  )
  y += pillH + gapPill

  // Headline with italic gradient accent run
  hlLines.forEach((segs, i) => {
    const base = y + type.headline * 0.8 + i * hlLead
    let x = box.x
    for (const s of segs) {
      const ds = textPath(f[800], s.text, { x, y: base, size: type.headline, tracking: hlTrack })
      if (s.accent) {
        // One gradient per accent run, spanning exactly that word (135° like the CSS).
        const runW = measure(f[800], s.text, type.headline, hlTrack)
        const id = `accent${i}_${Math.round(x)}`
        defs.push(
          `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${r(x)}" y1="${r(base - type.headline * 0.8)}" x2="${r(x + runW)}" y2="${r(base + type.headline * 0.2)}"><stop offset="0" stop-color="${C.pink}"/><stop offset="0.6" stop-color="${C.gold}"/><stop offset="1" stop-color="${C.pink}"/></linearGradient>`
        )
        out.push(`<g transform="translate(${r(x)} ${r(base)}) skewX(${ITALIC_SKEW}) translate(${r(-x)} ${r(-base)})">${glyphs(ds, `url(#${id})`)}</g>`)
      } else out.push(glyphs(ds, C.white))
      x += measure(f[800], s.text, type.headline, hlTrack)
    }
  })
  y += hlH + gapHl

  // Body
  bodyLines.forEach((line, i) => {
    out.push(glyphs(textPath(f[400], line, { x: box.x, y: y + type.body * 0.8 + i * bodyLead, size: type.body }), C.text, 0.72))
  })
  y += bodyH + gapBody

  // Offer chip — the floating glass card from the hero
  const ofont = f[700]
  const oTextW = measure(ofont, content.offer, type.offer)
  const icon = type.offer * 1.55
  const oPad = type.offer * 0.62
  const oW = oPad + icon + type.offer * 0.7 + oTextW + type.offer * 1.1
  out.push(
    `<rect x="${r(box.x)}" y="${r(y)}" width="${r(oW)}" height="${r(offerH)}" rx="${r(type.offer * 0.85)}" fill="#08121A" fill-opacity="0.72" stroke="${C.pink}" stroke-opacity="0.28" stroke-width="${r(Math.max(1.2, type.offer * 0.06))}"/>`
  )
  const ix = box.x + oPad
  const iy = y + (offerH - icon) / 2
  out.push(`<rect x="${r(ix)}" y="${r(iy)}" width="${r(icon)}" height="${r(icon)}" rx="${r(icon * 0.28)}" fill="${C.pink}" fill-opacity="0.18"/>`)
  out.push(check(ix + icon / 2, iy + icon / 2, icon * 0.5, C.pink))
  out.push(glyphs(textPath(ofont, content.offer, { x: ix + icon + type.offer * 0.7, y: y + offerH / 2 + type.offer * 0.36, size: type.offer }), C.white))
  y += offerH + gapOffer

  // CTA (.ds-btn-primary)
  const cfont = f[800]
  const cTextW = measure(cfont, content.cta, type.cta, type.cta * 0.01)
  const arrowW = type.cta * 0.8
  const cPad = type.cta * 1.75
  const cW = cPad + cTextW + type.cta * 0.62 + arrowW + cPad
  defs.push(
    `<filter id="glow" x="-30%" y="-60%" width="160%" height="260%"><feGaussianBlur stdDeviation="${r(type.cta * 0.9)}"/></filter>`
  )
  out.push(`<rect x="${r(box.x + cW * 0.08)}" y="${r(y + ctaH * 0.35)}" width="${r(cW * 0.84)}" height="${r(ctaH * 0.75)}" rx="${r(type.cta * 0.6)}" fill="${C.pink}" fill-opacity="0.55" filter="url(#glow)"/>`)
  out.push(`<rect x="${r(box.x)}" y="${r(y)}" width="${r(cW)}" height="${r(ctaH)}" rx="${r(type.cta * 0.7)}" fill="url(#brand)"/>`)
  out.push(`<rect x="${r(box.x + 2)}" y="${r(y + 1)}" width="${r(cW - 4)}" height="1.4" rx="0.7" fill="#FFFFFF" fill-opacity="0.35"/>`)
  out.push(glyphs(textPath(cfont, content.cta, { x: box.x + cPad, y: y + ctaH / 2 + type.cta * 0.36, size: type.cta, tracking: type.cta * 0.01 }), C.white))
  out.push(arrow(box.x + cPad + cTextW + type.cta * 0.62, y + ctaH / 2, arrowW, C.white))

  out.push('</svg>')
  out.splice(1, 0, `<defs>${defs.join('')}</defs>`)
  return out.join('\n')
}

/* ── pieces ──────────────────────────────────────────────────────────────── */

function wrap(font, text, size, maxWidth) {
  const lines = []
  for (const para of String(text).split('\n')) {
    let line = ''
    for (const w of para.split(/\s+/).filter(Boolean)) {
      const cand = line ? `${line} ${w}` : w
      if (line && measure(font, cand, size) > maxWidth) {
        lines.push(line)
        line = w
      } else line = cand
    }
    if (line) lines.push(line)
  }
  return lines
}

function glyphs(ds, fill, opacity = 1) {
  if (!ds?.length) return ''
  return `<g fill="${fill}"${opacity !== 1 ? ` fill-opacity="${opacity}"` : ''}>${ds.map((d) => `<path d="${d}"/>`).join('')}</g>`
}

function arrow(x, cy, w, color) {
  const sw = Math.max(1.8, w * 0.15)
  const head = w * 0.36
  return (
    `<g stroke="${color}" stroke-width="${r(sw)}" stroke-linecap="round" stroke-linejoin="round" fill="none">` +
    `<path d="M ${r(x)} ${r(cy)} L ${r(x + w)} ${r(cy)}"/>` +
    `<path d="M ${r(x + w - head)} ${r(cy - head)} L ${r(x + w)} ${r(cy)} L ${r(x + w - head)} ${r(cy + head)}"/></g>`
  )
}

function check(cx, cy, s, color) {
  const sw = Math.max(1.6, s * 0.16)
  return (
    `<g stroke="${color}" stroke-width="${r(sw)}" stroke-linecap="round" stroke-linejoin="round" fill="none">` +
    `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(s * 0.5)}"/>` +
    `<path d="M ${r(cx - s * 0.2)} ${r(cy + s * 0.01)} L ${r(cx - s * 0.04)} ${r(cy + s * 0.16)} L ${r(cx + s * 0.22)} ${r(cy - s * 0.14)}"/></g>`
  )
}

/**
 * Readability: deepen the plate's built-in negative space toward Stage Black,
 * then echo the site atmosphere with a faint pink radial in the opposite corner.
 */
function scrim(spec, W, H, defs) {
  const s = spec.scrim || { kind: 'left' }
  const k = s.strength ?? 0.92
  const out = []
  const stops = (list) => list.map(([o, a]) => `<stop offset="${o}" stop-color="${C.ink}" stop-opacity="${a}"/>`).join('')
  if (s.kind === 'left') {
    defs.push(`<linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">${stops([[0, k], [0.38, k * 0.82], [0.66, 0.15], [1, 0]])}</linearGradient>`)
  } else {
    defs.push(`<linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">${stops([[0, 0.25], [0.3, 0.05], [0.5, k * 0.7], [0.68, k], [1, k]])}</linearGradient>`)
  }
  out.push(`<rect width="${W}" height="${H}" fill="url(#scrim)"/>`)
  out.push(`<rect width="${W}" height="${H}" fill="${C.ink}" fill-opacity="${s.floor ?? 0.08}"/>`)
  // Brand underline — the logo swoosh, echoed as a hairline along the bottom edge.
  defs.push(`<linearGradient id="hair" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.pink}" stop-opacity="0"/><stop offset="0.5" stop-color="${C.pink}"/><stop offset="1" stop-color="${C.coral}" stop-opacity="0"/></linearGradient>`)
  out.push(`<rect y="${r(H - Math.max(4, H * 0.004))}" width="${W}" height="${r(Math.max(4, H * 0.004))}" fill="url(#hair)"/>`)
  return out.join('\n')
}
