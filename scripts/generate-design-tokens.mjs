/**
 * Derive the Prime Line AV design tokens from the code that already ships.
 *
 * Nothing here is invented: colours, gradients, effects and keyframes are read
 * out of app/globals.css, the logo palette out of the logo / icon SVGs, and the
 * radius / type / spacing / container / motion scales are measured by scanning
 * which Tailwind utilities the site's own components actually use.
 *
 * Outputs
 *   lib/brand/design-tokens.json            consumed by /styleguide
 *   public/brand/tokens/design-tokens.json
 *   public/brand/tokens/design-tokens.css
 *
 * Run: node scripts/generate-design-tokens.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseColor, toHex, toRgbString, toHslString, contrastRatio } from './brand/color.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const css = fs.readFileSync(path.join(ROOT, 'app/globals.css'), 'utf8')
const logoSvg = fs.readFileSync(path.join(ROOT, 'public/images/prime-line-av-logo-dark-bg.svg'), 'utf8')
const logoLightSvg = fs.readFileSync(path.join(ROOT, 'public/images/prime-line-av-logo-light-bg.svg'), 'utf8')
const iconSvg = fs.readFileSync(path.join(ROOT, 'public/brand/source/prime-line-monogram.svg'), 'utf8')

/* ── 1. CSS custom properties ────────────────────────────────────────────── */

function blockBody(selector) {
  const idx = css.indexOf(selector)
  if (idx === -1) throw new Error(`selector ${selector} not found in globals.css`)
  const open = css.indexOf('{', idx)
  // Walk braces so nested blocks (none today, but cheap insurance) don't cut it short.
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i)
  }
  throw new Error(`unbalanced block for ${selector}`)
}

function readVarBlock(selector) {
  const out = {}
  // Values can span lines (the shadow formulas), so match up to the semicolon.
  for (const m of blockBody(selector).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    out[m[1]] = m[2].replace(/\s+/g, ' ').trim()
  }
  return out
}

const rootVars = readVarBlock(':root {')
const darkVars = readVarBlock('.dark {')
const themeVars = readVarBlock('@theme inline')

/** Grab a rule's declaration body, one declaration per line. */
function rule(selector) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const m = css.match(new RegExp(`(^|\\n)\\s*${esc}\\s*\\{([^{}]*)\\}`))
  if (!m) return null
  return m[2]
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*\n\s*/g, ' ')
    .split(/;\s*/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l + ';')
    .join('\n')
}

function prop(body, name) {
  if (!body) return null
  const m = body.match(new RegExp(`(?:^|\\n)${name}:\\s*([^;]+);`))
  return m ? m[1].replace(/\s*!important/, '').trim() : null
}

/* ── 2. Colour system ────────────────────────────────────────────────────── */

// Colours that are authored as literals in globals.css rather than as
// variables — read from the rule that owns them so they still can't drift.
const htmlBase = rule('html')
const orbA = rule('.bg-orb.a')
const orbB = rule('.bg-orb.b')
const literal = {
  '--page-ink': (htmlBase?.match(/background-color:\s*(#[0-9a-f]{6})/i) || [])[1],
  '--page-ink-2': (htmlBase?.match(/#050310 0%, (#[0-9a-f]{6}) 50%/i) || [])[1],
  '--orb-violet': prop(orbA, 'background'),
  '--orb-blue': prop(orbB, 'background'),
}

// Colours the live components hard-code instead of reading a variable.
// Keyed '#HEX' so describe() can tell them apart from CSS custom properties.
const value = (token) => rootVars[token] ?? literal[token] ?? (token.startsWith('#') ? token : undefined)

const BG = parseColor(literal['--page-ink'] || rootVars['--bg-0'])

/** Alpha colours are previewed and contrast-checked over the real page ink. */
function over(c, bg = BG) {
  if (c.a === 1) return c
  return {
    r: Math.round(c.r * c.a + bg.r * (1 - c.a)),
    g: Math.round(c.g * c.a + bg.g * (1 - c.a)),
    b: Math.round(c.b * c.a + bg.b * (1 - c.a)),
    a: 1,
  }
}

const COLOR_GROUPS = [
  {
    id: 'primary',
    name: 'Primary — Prime Pink & Coral',
    blurb:
      'The two colours every CTA, accent word, active state and focus ring is built from. Always used as a 135° pair, pink leading.',
    tokens: [
      ['--emerald', 'Prime Pink', 'Primary accent · CTAs · links · focus ring (legacy var name)'],
      ['--emerald-deep', 'Stage Coral', 'Gradient partner of Prime Pink · --brand-primary'],
      ['--emerald-dark', 'Plum', 'Hover scrim on image cards · --brand-secondary'],
      ['#C41F55', 'Ribbon Shade', 'Folded tail of the discount ribbon (product-card.tsx)'],
    ],
  },
  {
    id: 'accent',
    name: 'Accent — Spotlight Gold & Atmosphere',
    blurb:
      'Gold is the spotlight: eyebrow pills, star ratings, the Best-Seller badge; peach labels the shop. Violet only ever lives in the background atmosphere.',
    tokens: [
      ['--teal', 'Spotlight Gold', 'Eyebrow pills · .ds-accent-text midpoint'],
      ['#FFB366', 'Peach', 'Shop pills (“Rent the Gear”), mega-menu labels'],
      ['#FF9500', 'Best-Seller Orange', 'Gold → orange “Best Seller” badge'],
      ['#FF8A5E', 'Delivery Coral', 'Delivery / setup fee row on product cards'],
      ['--orb-violet', 'Haze Violet', 'Background orb A + page radials — atmosphere only'],
      ['--orb-blue', 'Haze Blue', 'Background orb B — atmosphere only'],
    ],
  },
  {
    id: 'surface',
    name: 'Dark surfaces',
    blurb:
      'Prime Line is a dark-only brand: color-scheme is locked to dark and .dark mirrors :root. Surfaces step up from near-black ink with a cool blue cast.',
    tokens: [
      ['--page-ink', 'Stage Black', 'html background — the page itself'],
      ['--page-ink-2', 'Midnight', 'Middle stop of the page gradient'],
      ['--bg-0', 'Ink 0', '--background · theme-color · scrollbar track'],
      ['--bg-1', 'Ink 1', '--card · --sidebar'],
      ['--bg-2', 'Ink 2', '--popover'],
      ['#0A0A0A', 'Card Black', 'Service card ground (services-grid-section)'],
    ],
  },
  {
    id: 'text',
    name: 'Text & lines',
    blurb: 'A mint-tinted white for type, stepped down with alpha rather than with new greys.',
    tokens: [
      ['--ink', 'Ink White', 'Body text · --foreground'],
      ['--muted-ds', 'Muted 62', 'Secondary copy · --muted-foreground'],
      ['--muted-ds-2', 'Muted 42', 'Captions, meta'],
      ['--line', 'Pink Line', 'Accent hairlines'],
      ['--line-2', 'Hairline', 'Default borders · --border'],
      ['--input', 'Input Line', 'Form field borders'],
    ],
  },
  {
    id: 'status',
    name: 'Status',
    blurb: 'Errors use the destructive token; form messages use Tailwind red-400 on top of it. The brand has no green.',
    tokens: [
      ['--destructive', 'Error Red', 'Destructive / invalid state'],
    ],
  },
]

function describe(token, name, role) {
  const raw = value(token)
  const parsed = parseColor(raw)
  if (!parsed) return null
  const solid = over(parsed)
  return {
    token,
    name,
    role,
    css: token.startsWith('--') && !token.startsWith('--page') && !token.startsWith('--orb') ? `var(${token})` : raw,
    isVar: token.startsWith('--') && !token.startsWith('--page') && !token.startsWith('--orb'),
    uses: token.startsWith('#') ? (source.match(new RegExp(token, 'gi')) || []).length : undefined,
    raw,
    hex: toHex(parsed),
    hexOnInk: toHex(solid),
    rgb: toRgbString(parsed),
    hsl: toHslString(parsed),
    alpha: parsed.a,
    contrastOnInk: Number(contrastRatio(solid, BG).toFixed(2)),
    contrastWithWhite: Number(contrastRatio(solid, { r: 255, g: 255, b: 255 }).toFixed(2)),
  }
}

const buildPalette = () => COLOR_GROUPS.map((g) => ({
  id: g.id,
  name: g.name,
  blurb: g.blurb,
  colors: g.tokens.map(([t, n, r]) => describe(t, n, r)).filter(Boolean),
}))

/* ── 3. Logo palette + geometry ──────────────────────────────────────────── */

const gradientStops = (svg) =>
  [...svg.matchAll(/<linearGradient[^>]*>([\s\S]*?)<\/linearGradient>/g)].map((m) =>
    [...m[1].matchAll(/stop-color="(#[0-9A-Fa-f]{6})"/g)].map((s) => s[1].toUpperCase())
  )

const logoGradient = gradientStops(logoSvg)[0]
const iconGradient = gradientStops(iconSvg)[0]
const wordmarkOnDark = '#FFFFFF'
const wordmarkOnLight = ((logoLightSvg.match(/fill="(#[0-9A-Fa-f]{6})"/) || [])[1] || '').toUpperCase()

const logoPalette = [
  { hex: logoGradient[0], role: '“AV” + underline swoosh — gradient top' },
  { hex: logoGradient[1], role: '“AV” + underline swoosh — gradient bottom' },
  { hex: iconGradient[1], role: 'Monogram disc — gradient bottom (indigo)' },
  { hex: wordmarkOnLight, role: 'PRIMELINE wordmark on light grounds' },
  { hex: wordmarkOnDark, role: 'PRIMELINE wordmark on dark grounds' },
].map((c) => ({ ...c, rgb: toRgbString(parseColor(c.hex)), hsl: toHslString(parseColor(c.hex)) }))

/** Bounding box of every path coordinate — the lockup's ink extent. */
function inkBox(svg, filter = () => true) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  const ds = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]).filter(filter)
  for (const d of ds) {
    for (const m of d.matchAll(/(-?\d*\.?\d+)[ ,](-?\d*\.?\d+)/g)) {
      const x = Number(m[1]), y = Number(m[2])
      minX = Math.min(minX, x); minY = Math.min(minY, y)
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y)
    }
  }
  return { x: r3(minX), y: r3(minY), width: r3(maxX - minX), height: r3(maxY - minY) }
}
const r3 = (n) => Number(n.toFixed(3))

const vb = (logoSvg.match(/viewBox="([^"]+)"/) || [])[1].split(/\s+/).map(Number)
const lettersBox = inkBox(logoSvg, (d) => !d.startsWith('M732'))
const logoGeometry = {
  viewBox: { width: vb[2], height: vb[3] },
  inkBox: inkBox(logoSvg),
  capHeight: lettersBox.height, // P → baseline: the clear-space unit "x"
  aspect: r3(vb[2] / vb[3]),
  headerHeightPx: { desktop: 36, mobile: 36 }, // header.tsx: h-9 lockup ≥ sm, 36px favicon mark below
  footerHeightPx: 36, // footer.tsx: h-9
  minSize: { lockupScreenPx: 140, lockupPrintMm: 35, monogramScreenPx: 16 },
}

/* ── 4. Gradients, effects, keyframes ────────────────────────────────────── */

const btnPrimary = rule('.ds-btn-primary')
const accentText = rule('.ds-accent-text')
const gradients = [
  {
    id: 'brand',
    name: 'Brand gradient',
    usage: '.ds-btn-primary, every CTA, the play button, the footer quote button.',
    css: prop(btnPrimary, 'background'),
    resolved: prop(btnPrimary, 'background').replace('var(--emerald)', rootVars['--emerald']).replace('var(--emerald-deep)', rootVars['--emerald-deep']),
  },
  {
    id: 'accent-text',
    name: 'Accent type',
    usage: '.ds-accent-text — the italic highlighted word in every headline. Animates with gradientShift 6s.',
    css: prop(accentText, 'background'),
    resolved: prop(accentText, 'background')
      .replaceAll('var(--emerald)', rootVars['--emerald'])
      .replace('var(--teal)', rootVars['--teal']),
  },
  {
    id: 'logo',
    name: 'Logo gradient',
    usage: '“AV” and the underline swoosh in the lockup (vertical, top → bottom).',
    css: `linear-gradient(180deg, ${logoGradient[0]} 0%, ${logoGradient[1]} 100%)`,
    resolved: `linear-gradient(180deg, ${logoGradient[0]} 0%, ${logoGradient[1]} 100%)`,
  },
  {
    id: 'monogram',
    name: 'Monogram gradient',
    usage: 'The PL favicon disc — pink into indigo.',
    css: `linear-gradient(180deg, ${iconGradient[0]} 0%, ${iconGradient[1]} 100%)`,
    resolved: `linear-gradient(180deg, ${iconGradient[0]} 0%, ${iconGradient[1]} 100%)`,
  },
  {
    id: 'atmosphere',
    name: 'Stage atmosphere',
    usage: 'The fixed page background on html — three coloured radials over a midnight ramp.',
    css: prop(htmlBase, 'background-image'),
    resolved: prop(htmlBase, 'background-image'),
  },
  {
    id: 'glass-frame',
    name: 'Hero glass frame',
    usage: 'Hero video frame (hero-section.tsx) — a barely-there pink→gold tint.',
    css: 'linear-gradient(135deg, rgba(255, 45, 111,0.10), rgba(255, 210, 74,0.05))',
    resolved: 'linear-gradient(135deg, rgba(255, 45, 111,0.10), rgba(255, 210, 74,0.05))',
  },
].filter((g) => g.css)

const EFFECTS = [
  ['.ds-glass', 'Glass', 'Neutral frosted panel — 24px blur, 180% saturate, inner top highlight.'],
  ['.ds-glass-emerald', 'Glass · pink', 'The same panel tinted with Prime Pink and a plum drop shadow.'],
  ['.ds-card', 'Card', 'Service / event cards. 22px radius, lifts 4px on hover.'],
  ['.ds-card:hover', 'Card · hover', 'Border warms to pink 30%, a pink radial blooms from the top edge.'],
  ['.ds-card::before', 'Card · glow layer', 'The radial that fades in on hover.'],
  ['.shimmer-stroke', 'Shimmer stroke', 'Applied automatically to every pink→coral button/link, and by class to glass buttons (Watch, phone).'],
  ['.shimmer-stroke::after', 'Shimmer stroke · ring', '2px masked conic ring cream → pink → coral → gold on @property --shimmer-angle, 3s linear.'],
  ['.ds-pill', 'Eyebrow pill', 'Gold uppercase kicker above every section heading.'],
  ['.ds-pill .dot', 'Pill dot', 'Glowing gold dot, pulses on pulse-ds 2s.'],
  ['.ds-btn-primary', 'Primary button', 'Brand gradient, pink glow shadow, white inner highlight.'],
  ['.ds-btn-primary:hover', 'Primary · hover', 'Lifts 2px, glow intensifies to 0.7.'],
  ['.ds-btn-secondary', 'Secondary button', 'Glass outline button.'],
  ['.ds-btn-secondary:hover', 'Secondary · hover', 'Fill and border step up.'],
  ['.ds-accent-text', 'Accent text', 'Gradient-clipped italic word, animated.'],
  ['.bg-grid', 'Stage grid', '56px pink grid, masked to a soft ellipse.'],
  ['.bg-orb', 'Orb', '110px-blurred colour orbs drifting behind everything.'],
  ['.bg-noise', 'Film grain', 'SVG fractal noise at 4% — kills banding in the gradients.'],
  ['.ds-reveal', 'Reveal', 'Scroll reveal — 40px rise, 0.9s.'],
]
const effects = EFFECTS.map(([selector, name, usage]) => ({ selector, name, usage, css: rule(selector) })).filter(
  (e) => e.css
)

const keyframes = [...css.matchAll(/@keyframes\s+([\w-]+)\s*\{([\s\S]*?)\n\}/g)].map((m) => ({
  name: m[1],
  css: `@keyframes ${m[1]} {${m[2]}\n}`,
}))

const animations = [...css.matchAll(/^\.(animate-[\w-]+)\s*\{\s*animation:\s*([^;]+);/gm)].map((m) => {
  const [name, dur, ...rest] = m[2].trim().split(/\s+/)
  return { className: m[1], keyframes: name, duration: dur, timing: rest.join(' '), css: m[2].trim() }
})
// Animations wired directly on a rule rather than through an .animate-* class.
for (const sel of ['.bg-orb.a', '.bg-orb.b', '.bg-orb.c', '.ds-pill .dot']) {
  const a = prop(rule(sel), 'animation')
  if (a) {
    const [name, dur, ...rest] = a.split(/\s+/)
    animations.push({ className: sel, keyframes: name, duration: dur, timing: rest.join(' '), css: a })
  }
}

/* ── 5. Measured scales ──────────────────────────────────────────────────── */

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      // FIFA pages run their own red sub-brand — kept out of the core scales.
      if (['node_modules', 'styleguide', 'ui'].includes(e.name) || e.name.startsWith('.') || /fifa/i.test(e.name)) continue
      walk(full, out)
    } else if (/\.(tsx|ts)$/.test(e.name) && !/fifa/i.test(e.name)) out.push(full)
  }
  return out
}
// shadcn primitives (components/ui) and the style guide itself are excluded:
// the scales describe what the brand's own sections reach for.
const files = ['app', 'components'].flatMap((d) => walk(path.join(ROOT, d)))
const source = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n')

function tally(re) {
  const t = new Map()
  for (const m of source.matchAll(re)) t.set(m[1], (t.get(m[1]) || 0) + 1)
  return t
}
const B = `(?=[\\s"'\`\\]]|$)`
const P = `(?:^|[\\s"'\`:])`

// Radius — named + arbitrary px, merged onto one px axis.
const NAMED_RADIUS = { sm: 4, md: 6, lg: 8, xl: 12, '2xl': 16, '3xl': 24, full: 9999 }
const radiusMap = new Map()
for (const [k, n] of tally(new RegExp(`${P}rounded(?:-[trbl]{1,2})?-(sm|md|lg|xl|2xl|3xl|full)${B}`, 'g'))) {
  const px = NAMED_RADIUS[k]
  const cur = radiusMap.get(px) || { px, classes: [], uses: 0 }
  cur.classes.push(`rounded-${k}`); cur.uses += n
  radiusMap.set(px, cur)
}
for (const [k, n] of tally(new RegExp(`${P}rounded(?:-[trbl]{1,2})?-\\[(\\d+)px\\]${B}`, 'g'))) {
  const px = Number(k)
  const cur = radiusMap.get(px) || { px, classes: [], uses: 0 }
  cur.classes.push(`rounded-[${px}px]`); cur.uses += n
  radiusMap.set(px, cur)
}
const RADIUS_ROLE = {
  4: 'Focus chips inside pickers',
  6: 'shadcn primitives, small chips',
  8: 'Small icon tiles, image thumbs',
  10: 'Nav items, header buttons, icon tiles',
  12: 'Buttons (.ds-btn-*), inputs, CTAs',
  14: 'Accordion rows, logo tiles, floating cards',
  16: 'Header bar, sheets, modals',
  18: 'Testimonial video cards',
  20: '.ds-glass panels',
  22: '.ds-card',
  24: 'Hero glass frame, big media',
  28: 'Feature banners',
  9999: 'Pills, dots, avatars',
}
const radius = [...radiusMap.values()]
  .filter((r) => r.uses >= 3)
  .sort((a, b) => a.px - b.px)
  .map((r) => ({ ...r, role: RADIUS_ROLE[r.px] || '' }))
// .ds-glass / .ds-card radii live in CSS, not utilities — add them explicitly.
for (const [sel, px] of [['.ds-glass', 20], ['.ds-card', 22]]) {
  const found = radius.find((r) => r.px === px)
  if (found) found.classes.push(sel)
  else radius.push({ px, classes: [sel], uses: 0, role: RADIUS_ROLE[px] })
}
radius.sort((a, b) => a.px - b.px)

// Type — arbitrary px sizes are the site's real scale.
const typeSizes = [...tally(new RegExp(`${P}(?:[a-z0-9-]+:)?text-\\[(\\d+)px\\]${B}`, 'g'))]
  .map(([px, uses]) => ({ px: Number(px), uses }))
  .sort((a, b) => a.px - b.px)
const tracking = [...tally(new RegExp(`${P}(?:[a-z0-9-]+:)?tracking-\\[(-?[\\d.]+em)\\]${B}`, 'g'))]
  .map(([v, uses]) => ({ value: v, uses }))
  .sort((a, b) => parseFloat(a.value) - parseFloat(b.value))
const weights = [...tally(new RegExp(`${P}font-(normal|medium|semibold|bold|extrabold|black)${B}`, 'g'))]
  .map(([k, uses]) => ({ key: k, weight: { normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 }[k], uses }))
  .sort((a, b) => a.weight - b.weight)

// Spacing
const SPACING = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32]
const spaceTally = tally(new RegExp(`${P}(?:[a-z0-9-]+:)?-?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-y|space-x)-(\\d+(?:\\.5)?)${B}`, 'g'))
const spacing = SPACING.map((s) => ({ step: String(s), px: s * 4, rem: `${s / 4}rem`, uses: spaceTally.get(String(s)) || 0 })).filter(
  (s) => s.uses > 0
)
const sectionPadding = [...tally(new RegExp(`${P}((?:md:|lg:)?py-(?:12|14|16|20|24|28))${B}`, 'g'))]
  .map(([k, uses]) => ({ key: k, uses }))
  .sort((a, b) => b.uses - a.uses)

// Containers
const CONTAINER = { xs: 320, sm: 384, md: 448, lg: 512, xl: 576, '2xl': 672, '3xl': 768, '4xl': 896, '5xl': 1024, '6xl': 1152, '7xl': 1280 }
const ROLE = { '7xl': 'Every section and the header — the site grid', '4xl': 'FAQ, narrow reading sections', '3xl': 'Centered intros', '2xl': 'Lede paragraphs', '6xl': 'Wide galleries', '5xl': 'Section titles' }
const containers = [...tally(new RegExp(`${P}max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)${B}`, 'g'))]
  .map(([k, uses]) => ({ key: `max-w-${k}`, px: CONTAINER[k], uses, role: ROLE[k] || '' }))
  .sort((a, b) => b.px - a.px)
  .filter((c) => c.uses >= 2)

// Breakpoints — Tailwind v4 defaults plus the one custom 1200px the header uses.
const bp = tally(/(?:^|[\s"'`])(sm|md|lg|xl|2xl):/g)
const breakpoints = [
  { key: 'base', px: 0, note: 'Mobile first — favicon mark in the header, bottom nav' },
  { key: 'sm', px: 640, note: 'Two-column grids, side-by-side buttons' },
  { key: 'md', px: 768, note: 'Header phone + quote CTA appear, sticky CTA bar' },
  { key: 'lg', px: 1024, note: 'Desktop mega-menu, two-column hero, 4-column grids' },
  { key: 'xl', px: 1280, note: 'Container hits max-w-7xl' },
].map((b) => ({ ...b, uses: bp.get(b.key) || 0 }))

// Motion
const durations = [...tally(new RegExp(`${P}duration-(\\d+)${B}`, 'g'))]
  .map(([ms, uses]) => ({ ms: Number(ms), uses, source: 'utility' }))
// CSS-authored transitions
for (const sel of ['.ds-btn-primary', '.ds-card', '.ds-card::before', '.ds-reveal']) {
  const t = prop(rule(sel), 'transition')
  if (!t) continue
  for (const m of t.matchAll(/(\d*\.?\d+)s/g)) {
    const ms = Math.round(Number(m[1]) * 1000)
    const ex = durations.find((d) => d.ms === ms)
    if (ex) ex.css = [...new Set([...(ex.css || []), sel])]
    else durations.push({ ms, uses: 0, source: 'css', css: [sel] })
  }
}
durations.sort((a, b) => a.ms - b.ms)
const easeTally = tally(new RegExp(`${P}ease-(linear|in|out|in-out)${B}`, 'g'))
const easings = [
  { key: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', uses: easeTally.get('out') || 0, note: 'Entrances, header slide, fadeIn' },
  { key: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', uses: easeTally.get('in-out') || 0, note: 'Loops: float, orbs, gradientShift, pulse' },
  { key: 'standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)', uses: (css.match(/cubic-bezier\(0\.4, 0, 0\.2, 1\)/g) || []).length, note: '.ds-card and .ds-reveal transforms' },
  { key: 'linear', value: 'linear', uses: (css.match(/\blinear infinite/g) || []).length, note: 'Logo tickers (scroll-left / scroll-right)' },
  { key: 'easeOutQuart', value: '1 - (1 - t)^4', uses: (source.match(/easeOutQuart/g) || []).length, note: 'Hero stat count-up (JS, 2–2.5s)' },
]

const palette = buildPalette()

/* ── 6. Typography ───────────────────────────────────────────────────────── */

const typography = {
  families: [
    {
      name: 'Manrope',
      token: '--font-sans',
      cssVar: '--font-manrope',
      stack: themeVars['--font-sans'],
      loader: 'next/font/google — Manrope, weights 400–800, display: swap (app/layout.tsx)',
      role: 'Everything: display, headings, UI, body. Features ss01 + cv11 are on site-wide.',
      weights: [400, 500, 600, 700, 800],
      features: "font-feature-settings: 'ss01', 'cv11'",
    },
    {
      name: 'JetBrains Mono',
      token: '--font-mono',
      cssVar: '--font-jetbrains-mono',
      stack: themeVars['--font-mono'],
      loader: 'next/font/google — JetBrains_Mono, weights 400–500 (app/layout.tsx)',
      role: 'Phone numbers, time pickers, codes — anything that should read as tabular data.',
      weights: [400, 500],
    },
  ],
  sizes: typeSizes,
  tracking,
  weights,
  // Lifted from the real section components. `classes` is copy-pastable.
  scale: [
    { key: 'Display', sample: 'Full-Service AV Production', accent: 'AV Production', classes: 'text-[30px] sm:text-[38px] lg:text-[42px] font-extrabold tracking-[-0.02em] leading-[1.08]', size: '30 → 38 → 42px', lineHeight: '1.08', weight: 800, tracking: '-0.02em', usage: 'Landing hero H1 (landing/landing-hero.tsx)' },
    { key: 'H2', sample: 'Every Format. Every Industry.', accent: 'Every Industry.', classes: 'text-[32px] md:text-[44px] lg:text-[50px] font-extrabold tracking-[-0.025em] leading-[1.05]', size: '32 → 44 → 50px', lineHeight: '1.05', weight: 800, tracking: '-0.025em', usage: 'Centred section titles (services, event types)' },
    { key: 'H2 · compact', sample: 'Why 1,900+ Events Trust Prime Line', accent: 'Trust Prime Line', classes: 'text-[28px] md:text-[40px] font-extrabold tracking-[-0.025em] leading-[1.1]', size: '28 → 40px', lineHeight: '1.1', weight: 800, tracking: '-0.025em', usage: 'Why-us, products section' },
    { key: 'H3 · service', sample: 'Sound System Rental', classes: 'text-[15px] sm:text-[20px] font-bold tracking-[-0.01em] leading-tight', size: '15 → 20px', lineHeight: '1.25', weight: 700, tracking: '-0.01em', usage: 'Service cards' },
    { key: 'H3 · card', sample: 'One Team, Start to Finish', classes: 'text-[16px] md:text-[17px] font-bold leading-snug', size: '16 → 17px', lineHeight: '1.375', weight: 700, tracking: '0', usage: 'Why-us cards' },
    { key: 'Product', sample: 'Stage + LED Package 1', classes: 'text-[14px] sm:text-lg font-bold', size: '14 → 18px', lineHeight: '1.55', weight: 700, tracking: '0', usage: 'Product card titles' },
    { key: 'Price', sample: '$3,049', classes: 'text-xl sm:text-2xl font-black', size: '20 → 24px', lineHeight: '1.33', weight: 900, tracking: '0', usage: 'Product price (“/ 24h” in text-white/40)' },
    { key: 'Lede', sample: 'Your event runs flawlessly — or we make it right. One team, one contract, zero surprises.', classes: 'text-[15px] md:text-[17px] leading-relaxed text-white/65', size: '15 → 17px', lineHeight: '1.625', weight: 400, tracking: '0', usage: 'Hero paragraph' },
    { key: 'Quote', sample: 'They own the entire production so I can actually focus on my guests.', accent: 'focus on my guests.', classes: 'text-[18px] md:text-[22px] leading-relaxed font-medium text-white/90', size: '18 → 22px', lineHeight: '1.625', weight: 500, tracking: '0', usage: 'Testimonial block (landing-why-us.tsx)' },
    { key: 'Eyebrow', sample: 'Why Prime Line', classes: 'ds-pill', size: '12px', lineHeight: '1.5', weight: 700, tracking: '0.14em', usage: 'Gold pill above centred section titles' },
    { key: 'Shop pill', sample: 'Rent the Gear', classes: 'text-[11px] font-bold tracking-[0.16em] uppercase text-[#FFB366]', size: '11px', lineHeight: '1.5', weight: 700, tracking: '0.16em', usage: 'Shop section eyebrow (home-products-section.tsx)' },
    { key: 'Microcopy', sample: 'Delivered in under 4 hours — not days.', classes: 'text-[11px] font-semibold tracking-[0.01em] text-white/85', size: '11px', lineHeight: '1.5', weight: 600, tracking: '0.01em', usage: 'Under the hero CTA label' },
    { key: 'Badge', sample: 'Brand activations', classes: 'text-[9px] font-extrabold tracking-[0.08em] uppercase', size: '9px', lineHeight: '1.5', weight: 800, tracking: '0.08em', usage: 'Event-type pill (on #FF2D6F)' },
  ],
}

/* ── 7. Assemble + write ─────────────────────────────────────────────────── */

const tokens = {
  meta: {
    brand: 'Prime Line AV',
    tagline: 'When everything is just perfect.',
    positioning: 'The AV partner brands trust',
    generatedFrom: ['app/globals.css', 'app/layout.tsx', 'public/images/prime-line-av-logo-*.svg', 'public/brand/source/prime-line-monogram.svg', 'app/**/*.tsx', 'components/**/*.tsx'],
    generator: 'scripts/generate-design-tokens.mjs',
    note: 'Generated file — do not edit by hand. Change globals.css and re-run the generator.',
    theme: 'dark-only',
  },
  palette,
  logoPalette,
  logoGeometry,
  gradients,
  effects,
  keyframes,
  animations,
  radius: { base: rootVars['--radius'], theme: { sm: themeVars['--radius-sm'], md: themeVars['--radius-md'], lg: themeVars['--radius-lg'], xl: themeVars['--radius-xl'] }, scale: radius },
  spacing: { step: '0.25rem (4px)', scale: spacing, sectionPadding, gutter: 'px-4 (16px) — every max-w-7xl container' },
  containers,
  breakpoints,
  typography,
  motion: { durations, easings },
  // Chart vars are left out: --chart-4 is a green the brand does not use.
  raw: Object.fromEntries(Object.entries({ root: rootVars, dark: darkVars, theme: themeVars }).map(([k, v]) => [k, Object.fromEntries(Object.entries(v).filter(([n]) => !/chart/.test(n)))])),
}

const writeJson = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log('  ✓', path.relative(ROOT, file))
}

writeJson(path.join(ROOT, 'lib/brand/design-tokens.json'), tokens)
writeJson(path.join(ROOT, 'public/brand/tokens/design-tokens.json'), tokens)
fs.writeFileSync(path.join(ROOT, 'public/brand/tokens/design-tokens.css'), buildCss(), 'utf8')
console.log('  ✓ public/brand/tokens/design-tokens.css')

function buildCss() {
  const line = (k, v, c) => `  ${k}: ${v};${c ? ` /* ${c} */` : ''}`
  const out = [
    '/**',
    ' * Prime Line AV — design tokens',
    ' *',
    ' * Generated from app/globals.css by scripts/generate-design-tokens.mjs.',
    ' * Drop-in for any surface that needs the brand outside the Next app',
    ' * (email, landing builders, decks). Dark-only brand.',
    ' */',
    '',
    ':root {',
    '  /* ── Typography ── */',
    line('--font-sans', themeVars['--font-sans']),
    line('--font-mono', themeVars['--font-mono']),
    '',
  ]
  for (const g of palette) {
    out.push(`  /* ── ${g.name} ── */`)
    for (const c of g.colors) {
      const name = c.isVar ? c.token : `--pl-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      out.push(line(name, c.raw, `${c.name}${c.alpha < 1 ? ` · ≈ ${c.hexOnInk} on ink` : ''}`))
    }
    out.push('')
  }
  out.push('  /* ── Semantic (shadcn / Tailwind theme) ── */')
  for (const k of ['--background', '--foreground', '--card', '--card-foreground', '--popover', '--primary', '--primary-foreground', '--secondary', '--muted', '--muted-foreground', '--accent', '--accent-foreground', '--destructive', '--border', '--input', '--ring']) {
    out.push(line(k, rootVars[k]))
  }
  out.push('', '  /* ── Logo ── */')
  logoPalette.forEach((c, i) => out.push(line(`--pl-logo-${i + 1}`, c.hex, c.role)))
  out.push('', '  /* ── Gradients ── */')
  for (const g of gradients) out.push(line(`--pl-gradient-${g.id}`, g.resolved))
  out.push('', '  /* ── Radius ── */', line('--radius', rootVars['--radius']))
  for (const r of radius) if (r.px < 9999) out.push(line(`--pl-radius-${r.px}`, `${r.px}px`, r.role))
  out.push(line('--pl-radius-pill', '999px'))
  out.push('', '  /* ── Motion ── */')
  for (const d of durations) out.push(line(`--pl-duration-${d.ms}`, `${d.ms}ms`))
  for (const e of easings.filter((e) => e.value.startsWith('cubic'))) out.push(line(`--pl-${e.key}`, e.value))
  out.push('}', '', '/* ── Signature effects (verbatim from globals.css) ── */', '')
  for (const e of effects) {
    out.push(`/* ${e.name} — ${e.usage} */`, `${e.selector} {`, ...e.css.split('\n').map((l) => '  ' + l), '}', '')
  }
  out.push('/* ── Keyframes ── */', '')
  for (const k of keyframes) out.push(k.css, '')
  return out.join('\n')
}

console.log(
  `\nTokens: ${palette.reduce((n, g) => n + g.colors.length, 0)} colours · ${gradients.length} gradients · ` +
    `${effects.length} effects · ${keyframes.length} keyframes · ${radius.length} radii · ${typeSizes.length} type sizes · ` +
    `${spacing.length} spacing steps · ${durations.length} durations`
)
