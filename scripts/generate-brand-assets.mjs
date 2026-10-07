/**
 * Build every downloadable brand asset the style guide links to.
 *
 * Derived from what already ships: the logo SVGs and PL monogram in
 * public/brand/source, the Manrope family next/font loads, and the Higgsfield
 * background plates in public/brand/banners/plates. Re-running after a logo or
 * token change refreshes the whole kit.
 *
 * Outputs
 *   public/brand/logo/       lockups (dark/light/white/black) + monogram, SVG + PNG 128–2048
 *   public/brand/favicon/    svg, ico, 16/32/48/96/180/192/512 PNG
 *   public/brand/banners/    4 finished ad banners (16:9, 1:1, 4:5, 9:16)
 *   public/brand/social/     one campaign recomposed for 1080², 1080×1350, 1080×1920, 1200×628
 *   public/brand/zip/*.zip
 *   lib/brand/asset-manifest.json
 *
 * Writes ONLY under public/brand/ and lib/brand/ — never touches the site's own
 * favicons, app icons or images. The live site is not modified by this script.
 *
 * Needs dev-only packages that are deliberately not in package.json:
 *   npm i --no-save opentype.js wawoff2
 *
 * Run: node scripts/generate-brand-assets.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { loadAllFonts } from './brand/typeset.mjs'
import { bannerSvg } from './brand/banner.mjs'
import { createZip } from './brand/zip.mjs'
import { logoSvg, monogramSvg, appTileSvg, LOGO_ASPECT, LOGO_VIEWBOX, INK } from './brand/marks.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BRAND = path.join(ROOT, 'public/brand')
const PLATES = path.join(BRAND, 'banners/plates')

const written = []
function out(file, buf) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, buf)
  written.push(path.relative(ROOT, file).replace(/\\/g, '/'))
}
const svgBuf = (s) => Buffer.from(s, 'utf8')
const rasterise = (svg, w, h = w) =>
  sharp(svgBuf(svg), { density: 600 })
    .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer()

/* ══ 1. Logo system ═══════════════════════════════════════════════════════ */

const PNG_WIDTHS = [128, 256, 512, 1024, 2048]
const LOGOS = [
  { slug: 'prime-line-av-logo', tone: 'dark', label: 'Primary — for dark grounds', ground: 'ink' },
  { slug: 'prime-line-av-logo-light', tone: 'light', label: 'Primary — for light grounds', ground: 'paper' },
  { slug: 'prime-line-av-logo-white', tone: 'white', label: 'White knockout', ground: 'brand' },
  { slug: 'prime-line-av-logo-black', tone: 'black', label: 'Black mono', ground: 'paper' },
]
const MONOGRAMS = [
  { slug: 'prime-line-monogram', tone: 'brand', label: 'Monogram — gradient disc', ground: 'ink' },
  { slug: 'prime-line-monogram-white', tone: 'white', label: 'Monogram — white disc', ground: 'brand' },
  { slug: 'prime-line-monogram-black', tone: 'black', label: 'Monogram — ink disc', ground: 'paper' },
]

async function buildLogos() {
  const dir = path.join(BRAND, 'logo')
  const manifest = []
  for (const v of LOGOS) {
    const svg = logoSvg(v.tone)
    out(path.join(dir, `${v.slug}.svg`), svgBuf(svg))
    const pngs = []
    for (const w of PNG_WIDTHS) {
      const file = `${v.slug}-${w}.png`
      out(path.join(dir, 'png', file), await rasterise(svg, w, Math.round(w / LOGO_ASPECT)))
      pngs.push({ width: w, src: `/brand/logo/png/${file}` })
    }
    manifest.push({ ...v, kind: 'lockup', svg: `/brand/logo/${v.slug}.svg`, pngs })
  }
  for (const v of MONOGRAMS) {
    const svg = monogramSvg({ size: 512, tone: v.tone })
    out(path.join(dir, `${v.slug}.svg`), svgBuf(svg))
    const pngs = []
    for (const w of PNG_WIDTHS) {
      const file = `${v.slug}-${w}.png`
      out(path.join(dir, 'png', file), await rasterise(svg, w))
      pngs.push({ width: w, src: `/brand/logo/png/${file}` })
    }
    manifest.push({ ...v, kind: 'monogram', svg: `/brand/logo/${v.slug}.svg`, pngs })
  }

  out(
    path.join(dir, 'CLEARSPACE.txt'),
    svgBuf(
      [
        'Prime Line AV — logo construction (generated)',
        '',
        `Lockup artboard   ${LOGO_VIEWBOX.width} × ${LOGO_VIEWBOX.height}  (aspect ${LOGO_ASPECT.toFixed(3)} : 1)`,
        'Clear space x     = cap height of the “P” in PRIMELINE.',
        '                  Keep x clear on all four sides; nothing enters it.',
        '',
        'Minimum size',
        '  Lockup, screen     140 px wide  (header renders 36 px tall ≈ 242 px wide)',
        '  Lockup, print       35 mm wide',
        '  Monogram, screen    16 px       (favicon)',
        '',
        'Tones',
        '  dark   — white wordmark + gradient AV. Default; the site is dark-only.',
        '  light  — #2F2F2F wordmark + gradient AV. Print, partner decks, light pages.',
        '  white  — all-white knockout over photography or the brand gradient.',
        '  black  — one-colour print, embroidery, engraving.',
        '',
      ].join('\n')
    )
  )
  return manifest
}

/* ══ 2. Favicon set ══════════════════════════════════════════════════════ */

async function buildFavicons() {
  const dir = path.join(BRAND, 'favicon')
  // The shipped disc keeps a 13% margin — right at 512, mush at 16. Small sizes
  // run the disc edge-to-edge so the PL stays readable in a browser tab.
  const discFull = monogramSvg({ size: 64, fill: 1 })
  const discSource = monogramSvg({ size: 512 })
  const tile = appTileSvg({ size: 512, fill: 0.8 })

  out(path.join(dir, 'favicon.svg'), svgBuf(monogramSvg({ size: 64, fill: 0.96 })))

  const sized = {}
  for (const s of [16, 32, 48, 96]) {
    sized[s] = await rasterise(s <= 48 ? discFull : discSource, s)
    out(path.join(dir, `favicon-${s}x${s}.png`), sized[s])
  }

  // Apple masks its own corners and fills transparency with black — give it the ink tile.
  const apple = await rasterise(tile, 180)
  out(path.join(dir, 'apple-touch-icon.png'), apple)

  for (const s of [192, 512]) {
    const disc = await rasterise(discSource, s)
    out(path.join(dir, `icon-${s}.png`), disc)
    out(path.join(dir, `maskable-${s}.png`), await rasterise(appTileSvg({ size: 512, fill: 0.62 }), s))
  }

  const ico = buildIco([sized[16], sized[32], sized[48]])
  out(path.join(dir, 'favicon.ico'), ico)

  return {
    svg: '/brand/favicon/favicon.svg',
    ico: '/brand/favicon/favicon.ico',
    sizes: [16, 32, 48, 96].map((s) => ({ size: s, src: `/brand/favicon/favicon-${s}x${s}.png`, label: `${s}×${s}` })),
    apple: { size: 180, src: '/brand/favicon/apple-touch-icon.png' },
    pwa: [192, 512].map((s) => ({ size: s, src: `/brand/favicon/icon-${s}.png`, maskable: `/brand/favicon/maskable-${s}.png` })),
  }
}

/** PNG-compressed ICO container — accepted by every browser since IE11. */
function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + pngs.length * 16
  const entries = pngs.map((png) => {
    const w = png.readUInt32BE(16), h = png.readUInt32BE(20)
    const e = Buffer.alloc(16)
    e.writeUInt8(w >= 256 ? 0 : w, 0)
    e.writeUInt8(h >= 256 ? 0 : h, 1)
    e.writeUInt16LE(1, 4)
    e.writeUInt16LE(32, 6)
    e.writeUInt32LE(png.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += png.length
    return e
  })
  return Buffer.concat([header, ...entries, ...pngs])
}

/* ══ 4. Banners + social ═════════════════════════════════════════════════ */

const BANNERS = [
  {
    id: 'banner-16x9-full-av',
    label: 'YouTube / display leaderboard',
    ratio: '16:9',
    plate: 'plate-16x9-keynote.jpg',
    width: 1920,
    height: 1080,
    anchor: 'center',
    box: { x: 128, w: 760 },
    type: { logo: 40, eyebrow: 19, headline: 84, body: 26, offer: 21, cta: 24 },
    scrim: { kind: 'left', strength: 0.94 },
    content: {
      eyebrow: 'Full AV production',
      headline: 'Your event runs\n[flawlessly.]',
      body: 'Stages, sound, lighting and LED walls — one team, one contract, zero surprises.',
      offer: 'Free 3D render + site survey',
      cta: 'Get Your Custom Quote',
    },
  },
  {
    id: 'banner-1x1-sound',
    label: 'Feed square',
    ratio: '1:1',
    plate: 'plate-1x1-sound.jpg',
    width: 1080,
    height: 1080,
    anchor: 'center',
    box: { x: 72, w: 420 },
    type: { logo: 28, eyebrow: 15, headline: 66, body: 21, offer: 17, cta: 20 },
    scrim: { kind: 'left', strength: 0.95 },
    content: {
      eyebrow: 'Sound system rental',
      headline: 'Every word,\n[heard.]',
      body: 'L-Acoustics and d&b systems, tuned to your room by A1 + A2 engineers.',
      offer: 'Quote in under 4 hours',
      cta: 'Get a Quote',
    },
  },
  {
    id: 'banner-4x5-lighting',
    label: 'Portrait feed post',
    ratio: '4:5',
    plate: 'plate-4x5-gala.jpg',
    width: 1080,
    height: 1350,
    anchor: 'bottom',
    padBottom: 84,
    box: { x: 80, w: 920 },
    type: { logo: 34, eyebrow: 18, headline: 76, body: 26, offer: 21, cta: 25 },
    scrim: { kind: 'bottom', strength: 0.94 },
    content: {
      eyebrow: 'Lighting & staging',
      headline: 'Light the room.\nOwn the [night.]',
      body: 'Designed, pre-vis’d and programmed by a senior LD — moving heads, washes, GrandMA3.',
      offer: '1,986+ events delivered',
      cta: 'Plan My Event',
    },
  },
  {
    id: 'banner-9x16-stage',
    label: 'Story / Reel',
    ratio: '9:16',
    plate: 'plate-9x16-festival.jpg',
    width: 1080,
    height: 1920,
    anchor: 'bottom',
    padBottom: 360,
    box: { x: 84, w: 912 },
    type: { logo: 40, eyebrow: 21, headline: 96, body: 31, offer: 25, cta: 29 },
    scrim: { kind: 'bottom', strength: 0.92 },
    content: {
      eyebrow: 'Stage & LED rental',
      headline: 'Built for\n[the big stage.]',
      body: 'Portable, truss-built or mobile stages — engineered, certified and crewed.',
      offer: 'Show-ready 2 hours early',
      cta: 'Get Your Custom Quote',
    },
  },
]

const LAUNCH = {
  eyebrow: 'Product launches',
  headline: 'Launch it\n[louder.]',
  body: 'LED walls, sound and show lighting for product reveals — designed, delivered and run by one crew.',
  bodyShort: 'LED walls, sound and show lighting, fully crewed.',
  offer: 'Quote in under 4 hours — not days',
  cta: 'Plan My Launch',
}

const SOCIAL = [
  {
    id: 'social-1080x1080-product-launch',
    label: 'Feed square · 1080 × 1080',
    plate: 'plate-1x1-launch.jpg',
    width: 1080, height: 1080, anchor: 'bottom', padBottom: 72,
    box: { x: 72, w: 760 },
    type: { logo: 30, eyebrow: 16, headline: 74, body: 24, offer: 19, cta: 23 },
    scrim: { kind: 'bottom', strength: 0.95 },
    short: true,
    note: 'Body drops to one line; headline keeps two. Copy sits low under the LED wall.',
  },
  {
    id: 'social-1080x1350-product-launch',
    label: 'Portrait feed · 1080 × 1350',
    plate: 'plate-4x5-launch.jpg',
    width: 1080, height: 1350, anchor: 'bottom', padBottom: 84,
    box: { x: 80, w: 900 },
    type: { logo: 34, eyebrow: 18, headline: 86, body: 27, offer: 21, cta: 25 },
    scrim: { kind: 'bottom', strength: 0.94 },
    note: 'Extra height buys back the full description and a bigger headline.',
  },
  {
    id: 'social-1080x1920-product-launch',
    label: 'Story / Reel · 1080 × 1920',
    plate: 'plate-9x16-launch.jpg',
    width: 1080, height: 1920, anchor: 'bottom', padBottom: 380,
    box: { x: 84, w: 900 },
    type: { logo: 40, eyebrow: 21, headline: 100, body: 31, offer: 25, cta: 29 },
    scrim: { kind: 'bottom', strength: 0.92 },
    safe: { top: 250, bottom: 340 },
    note: 'Stack lifted above the bottom 340 px reply bar; nothing in the top 250 px profile strip.',
  },
  {
    id: 'social-1200x628-product-launch',
    label: 'Link preview / LinkedIn · 1200 × 628',
    plate: 'plate-16x9-launch.jpg',
    width: 1200, height: 628, anchor: 'center',
    box: { x: 64, w: 520 },
    type: { logo: 20, eyebrow: 12, headline: 50, body: 16, offer: 13, cta: 15 },
    scrim: { kind: 'left', strength: 0.95 },
    short: true,
    note: 'Rotated into a left column — a centre-cropped square would lose the CTA.',
  },
]

async function composite(spec, fonts) {
  const plate = path.join(PLATES, spec.plate)
  if (!fs.existsSync(plate)) {
    console.warn(`  ! missing plate ${spec.plate} — skipping ${spec.id}`)
    return null
  }
  const base = await sharp(plate).resize(spec.width, spec.height, { fit: 'cover', position: spec.position || 'centre' }).toBuffer()
  return sharp(base)
    .composite([{ input: svgBuf(bannerSvg(spec, fonts)), top: 0, left: 0 }])
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer()
}

async function buildBanners(fonts) {
  const list = []
  for (const spec of BANNERS) {
    const jpg = await composite(spec, fonts)
    if (!jpg) continue
    out(path.join(BRAND, 'banners', `${spec.id}.jpg`), jpg)
    const preview = await sharp(jpg).resize({ width: 900 }).webp({ quality: 82 }).toBuffer()
    out(path.join(BRAND, 'banners/preview', `${spec.id}.webp`), preview)
    list.push({
      id: spec.id, kind: 'banner', label: spec.label, ratio: spec.ratio, width: spec.width, height: spec.height,
      src: `/brand/banners/${spec.id}.jpg`, preview: `/brand/banners/preview/${spec.id}.webp`,
      plate: `/brand/banners/plates/${spec.plate}`, content: spec.content, bytes: jpg.length,
    })
  }
  for (const spec of SOCIAL) {
    const content = { ...LAUNCH, body: spec.short ? LAUNCH.bodyShort : LAUNCH.body }
    delete content.bodyShort
    const jpg = await composite({ ...spec, content }, fonts)
    if (!jpg) continue
    out(path.join(BRAND, 'social', `${spec.id}.jpg`), jpg)
    const preview = await sharp(jpg).resize({ width: 900 }).webp({ quality: 82 }).toBuffer()
    out(path.join(BRAND, 'social/preview', `${spec.id}.webp`), preview)
    list.push({
      id: spec.id, kind: 'social', label: spec.label, ratio: `${spec.width}×${spec.height}`, width: spec.width, height: spec.height,
      src: `/brand/social/${spec.id}.jpg`, preview: `/brand/social/preview/${spec.id}.webp`,
      plate: `/brand/banners/plates/${spec.plate}`, content, note: spec.note, safe: spec.safe || null, bytes: jpg.length,
    })
  }
  return list
}

/** Raw model output is multi-MB PNG; q92 JPEG is visually identical at ~1/5 the weight. */
async function normalizePlates() {
  if (!fs.existsSync(PLATES)) return []
  for (const f of fs.readdirSync(PLATES).filter((f) => f.endsWith('.png'))) {
    const src = path.join(PLATES, f)
    out(src.replace(/\.png$/, '.jpg'), await sharp(src).jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' }).toBuffer())
    fs.unlinkSync(src)
  }
  const plates = []
  for (const f of fs.readdirSync(PLATES).filter((f) => f.endsWith('.jpg')).sort()) {
    const meta = await sharp(path.join(PLATES, f)).metadata()
    const slug = f.replace(/\.jpg$/, '')
    out(path.join(PLATES, 'preview', `${slug}.webp`), await sharp(path.join(PLATES, f)).resize({ width: 900 }).webp({ quality: 80 }).toBuffer())
    plates.push({ slug, src: `/brand/banners/plates/${f}`, preview: `/brand/banners/plates/preview/${slug}.webp`, width: meta.width, height: meta.height })
  }
  return plates
}

/* ══ 4b. 3D icon pack ═════════════════════════════════════════════════════ */

const ICONS_3D = [
  ['led-wall', 'LED Wall'],
  ['speaker', 'Sound System'],
  ['moving-head', 'Lighting'],
  ['stage', 'Stage & Truss'],
  ['dj-deck', 'DJ Setup'],
  ['tv-display', 'TVs & Displays'],
  ['pipe-drape', 'Pipe & Drape'],
  ['microphone', 'Microphones'],
  ['projector', 'Projector & Screen'],
  ['live-camera', 'Live Streaming'],
  ['delivery-truck', 'Delivery & Setup'],
  ['quote-cart', 'Add to Quote'],
  ['sound-console', 'AV Production'],
  ['installation', 'AV Installation'],
  ['clapperboard', 'Video Production'],
  ['led-billboard', 'LED Walls for Sale'],
  ['live-stream', 'Live Streaming'],
  ['render-3d', '3D Event Render'],
  ['flight-case', 'Packages'],
  ['award', 'Premium Quality'],
  ['headset', '24/7 Support'],
  ['location-pin', 'Nationwide'],
  ['stopwatch', 'On Time'],
  ['shield', 'Insured & Safe'],
  ['walkie-talkie', 'One Crew'],
  ['heart', 'Giving Back'],
  ['calendar', 'Booking'],
  ['clipboard', 'Planning'],
  ['rental-tag', 'Rental Price'],
  ['setup-tools', 'Setup'],
  ['savings', 'Savings'],
  ['receipt', 'Total'],
  ['led-outdoor', 'Outdoor LED'],
  ['led-trailer', 'Mobile LED'],
  ['pixel-pitch', 'Pixel Pitch'],
  ['content-play', 'Content'],
  ['rigging', 'Rigging'],
]

/**
 * Higgsfield renders, kept as lossless 1024² WebP masters in public/brand/icons-3d/source
 * The page shows 512 WebP; downloads are palette-quantised PNG at 1024 and 256.
 */
async function buildIcons3d() {
  const dir = path.join(BRAND, 'icons-3d')
  const src = path.join(dir, 'source')
  if (!fs.existsSync(src)) return []
  const list = []
  for (const [slug, label] of ICONS_3D) {
    const file = path.join(src, `${slug}.webp`)
    if (!fs.existsSync(file)) {
      console.warn(`  ! missing 3D icon ${slug}`)
      continue
    }
    const webp = await sharp(file).resize(512, 512).webp({ quality: 88, alphaQuality: 100 }).toBuffer()
    out(path.join(dir, 'web', `${slug}.webp`), webp)
    // Site UI size: tiles render the icon at 36–64 CSS px, so 192 covers 3x DPR.
    out(path.join(dir, 'ui', `${slug}.webp`), await sharp(file).resize(192, 192).webp({ quality: 86, alphaQuality: 100 }).toBuffer())
    const png = {}
    for (const size of [1024, 256]) {
      png[size] = await sharp(file).resize(size, size).png({ palette: true, quality: 92, effort: 10, compressionLevel: 9 }).toBuffer()
      out(path.join(dir, 'png', `${slug}-${size}.png`), png[size])
    }
    list.push({
      slug,
      label,
      web: `/brand/icons-3d/web/${slug}.webp`,
      png1024: `/brand/icons-3d/png/${slug}-1024.png`,
      png256: `/brand/icons-3d/png/${slug}-256.png`,
      bytes: png[1024].length,
    })
  }
  return list
}

/* ══ 5. Docs + ZIP ═══════════════════════════════════════════════════════ */

function buildDocs() {
  out(
    path.join(BRAND, 'README.txt'),
    svgBuf(
      [
        'PRIME LINE AV — BRAND KIT',
        '=========================',
        '',
        'Generated by scripts/generate-brand-assets.mjs from the live site.',
        'Documented at https://primelineav.com/styleguide',
        '',
        'logo/        Lockup in 4 tones (dark, light, white, black) + PL monogram in 3,',
        '             SVG and PNG at 128 / 256 / 512 / 1024 / 2048 px. CLEARSPACE.txt.',
        'icons-3d/    37 Higgsfield 3D icons (equipment, services, values), transparent PNG 1024 + 256.',
        'favicon/     favicon.svg, favicon.ico (16/32/48), PNG 16–96, apple-touch 180,',
        '             PWA 192/512 + maskable variants.',
        'tokens/      design-tokens.css + design-tokens.json, generated from app/globals.css.',
        'banners/     4 finished ad banners (16:9, 1:1, 4:5, 9:16) + raw Higgsfield plates.',
        'social/      One campaign (product launch) recomposed for 1080², 1080×1350, 1080×1920, 1200×628.',
        'AI-PROMPTS.md  Higgsfield prompt templates for new on-brand visuals.',
        '',
        'Typefaces: Manrope + JetBrains Mono (SIL Open Font License), via Google Fonts.',
        '',
      ].join('\n')
    )
  )
  const ai = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib/brand/ai-prompts.json'), 'utf8'))
  const md = [
    '# Prime Line AV — AI visual guidelines',
    '',
    `Tool: **${ai.meta.tool}** · model \`${ai.meta.model}\` · ${ai.meta.resolution}`,
    '',
    ai.meta.note,
    '',
    '## Palette to name in every prompt',
    '',
    ...Object.entries(ai.palette).map(([k, v]) => `- \`${v}\` — ${k}`),
    '',
    '## Rules',
    '',
    ...ai.rules.map((r) => `- ${r}`),
    '',
    ...ai.templates.flatMap((t) => [`## ${t.name}`, '', `**When:** ${t.use}`, '', `**Ratios:** ${t.aspectRatios.join(' · ')}`, '', `**Variables:** ${t.variables.join(' ')}`, '', '```text', t.prompt, '```', '']),
  ].join('\n')
  out(path.join(BRAND, 'AI-PROMPTS.md'), svgBuf(md))
}

function zipOf(name, dirs, extra = []) {
  const files = []
  const addDir = (dir, prefix) => {
    if (!fs.existsSync(dir)) return
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name === 'preview' || e.name === 'web' || e.name === 'ui') continue // web previews are page furniture, not kit
      const full = path.join(dir, e.name)
      if (e.isDirectory()) addDir(full, `${prefix}/${e.name}`)
      else files.push({ name: `${prefix}/${e.name}`, data: fs.readFileSync(full) })
    }
  }
  for (const [dir, prefix] of dirs) addDir(path.join(BRAND, dir), prefix)
  for (const f of extra) if (fs.existsSync(path.join(BRAND, f))) files.push({ name: f, data: fs.readFileSync(path.join(BRAND, f)) })
  const zip = createZip(files)
  out(path.join(BRAND, 'zip', name), zip)
  return { src: `/brand/zip/${name}`, bytes: zip.length, count: files.length }
}

/* ══ run ═════════════════════════════════════════════════════════════════ */

const t0 = Date.now()
console.log('Fonts…')
const fonts = await loadAllFonts()
console.log('Logos…')
const logos = await buildLogos()
console.log('Favicons…')
const favicons = await buildFavicons()
console.log('Plates…')
const plates = await normalizePlates()
console.log('3D icons…')
const icons3d = await buildIcons3d()
console.log('Banners…')
const creatives = await buildBanners(fonts)
buildDocs()
console.log('ZIPs…')
const packages = {
  icons3d: zipOf('prime-line-av-3d-icons.zip', [['icons-3d/png', 'icons-3d']]),
  logo: zipOf('prime-line-av-logo-package.zip', [['logo', 'logo']]),
  favicon: zipOf('prime-line-av-favicons.zip', [['favicon', 'favicon']]),
  tokens: zipOf('prime-line-av-design-tokens.zip', [['tokens', 'tokens']]),
  social: zipOf('prime-line-av-banners-social.zip', [['banners', 'banners'], ['social', 'social']]),
  kit: zipOf('prime-line-av-brand-kit.zip', [['logo', 'logo'], ['favicon', 'favicon'], ['icons-3d/png', 'icons-3d'], ['tokens', 'tokens'], ['banners', 'banners'], ['social', 'social'], ['source', 'source']], ['AI-PROMPTS.md', 'README.txt']),
}

const manifest = {
  meta: { generator: 'scripts/generate-brand-assets.mjs', note: 'Generated file — do not edit by hand.', ink: INK },
  logos,
  favicons,
  icons3d,
  banners: creatives.filter((c) => c.kind === 'banner'),
  social: creatives.filter((c) => c.kind === 'social'),
  plates,
  packages,
  docs: { prompts: '/brand/AI-PROMPTS.md', readme: '/brand/README.txt', clearspace: '/brand/logo/CLEARSPACE.txt' },
}
fs.writeFileSync(path.join(ROOT, 'lib/brand/asset-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8')
written.push('lib/brand/asset-manifest.json')

console.log(`\n${written.length} files in ${((Date.now() - t0) / 1000).toFixed(1)}s`)
for (const [k, p] of Object.entries(packages)) console.log(`  ${k.padEnd(7)} ${p.count} files  ${(p.bytes / 1024 / 1024).toFixed(2)} MB`)
