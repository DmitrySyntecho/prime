// FULL REBUILD of the product catalog from the reorganized /Products drop.
// Wipes public/images/products, re-optimizes every photo to WebP, and writes a
// fresh data/products.json. Categories + filters are derived from folder/file
// names (nothing invented beyond representative placeholder pricing).
//   node scripts/rebuild-catalog.mjs
import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"

const ROOT = process.cwd()
const SRC = path.join(ROOT, "Products")
const OUT = path.join(ROOT, "public", "images", "products")
const DATA = path.join(ROOT, "data", "products.json")
const MAX_SIDE = 1280, QUALITY = 80, MAX_IMAGES = 6

const hash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h }
const round = (n, step) => Math.round(n / step) * step
const isImg = (f) => /\.(jpe?g|png|webp)$/i.test(f)

const slugify = (s) =>
  s.toLowerCase()
    .replace(/['’′″"`.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")

const titleCase = (s) =>
  s.replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bLed\b/g, "LED").replace(/\bDj\b/g, "DJ").replace(/\bTv\b/g, "TV")
    .replace(/\bUhd\b/g, "UHD").replace(/\bHd\b/g, "HD").replace(/\bHdr\b/g, "HDR")
    .replace(/L['’]?Acoustics/i, "L-Acoustics")

// strip trailing variant markers: "-1", "(1)", " 2" stays (it's a model no.)
const variantBase = (name) =>
  name.replace(/\s*[-(]\s*\d+\s*\)?$/i, "").trim()

// group a flat file list into { base: [files...] } preserving order
function groupVariants(files) {
  const groups = new Map()
  for (const f of files) {
    const noExt = f.replace(/\.[^.]+$/, "")
    const base = variantBase(noExt)
    if (!groups.has(base)) groups.set(base, [])
    groups.get(base).push(f)
  }
  return groups
}

async function listFiles(dir) {
  const ents = await fs.readdir(dir, { withFileTypes: true })
  return ents.filter((e) => e.isFile() && isImg(e.name)).map((e) => e.name).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
}
async function listDirs(dir) {
  const ents = await fs.readdir(dir, { withFileTypes: true })
  return ents.filter((e) => e.isDirectory()).map((e) => e.name)
}

// optimize a set of source files -> public/images/products/<cat>/<slug>/{main,02,03}.webp
async function emitImages(category, slug, srcFiles) {
  const dir = path.join(OUT, category, slug)
  await fs.mkdir(dir, { recursive: true })
  const picked = srcFiles.slice(0, MAX_IMAGES)
  const urls = []
  for (let i = 0; i < picked.length; i++) {
    const out = i === 0 ? "main.webp" : `${String(i + 1).padStart(2, "0")}.webp`
    await sharp(picked[i].abs)
      .rotate()
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(dir, out))
    urls.push(`/images/products/${category}/${slug}/${out}`)
  }
  return urls
}

const priced = (slug, base, spread = 12, step = 50) => {
  const price = round(base + (hash(slug) % spread) * step, 10) - 1
  const discount = 8 + (hash(slug + "d") % 6)
  const originalPrice = round(price / (1 - discount / 100), 10) - 1
  return { price, originalPrice, discount }
}

const products = []

function parseWH(name) {
  const m = name.match(/([\d.]+)\s*['’′_]?\s*[xX×]\s*([\d.]+)/)
  if (!m) return null
  const w = parseFloat(m[1]), h = parseFloat(m[2])
  if (!w || !h) return null
  return { w, h, area: Math.round(w * h) }
}

// ---------------------------------------------------------------------------
// 1) DJ SETUPS — one product per subfolder, all photos = variants
// ---------------------------------------------------------------------------
async function buildDj() {
  const root = path.join(SRC, "DJ setups")
  const subs = await listDirs(root)
  for (const sub of subs.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
    const files = await listFiles(path.join(root, sub))
    if (!files.length) continue
    const num = (sub.match(/\d+/) || ["1"])[0]
    const slug = `dj-setup-${num.padStart(2, "0")}`
    const club = /0?4$/.test(num)
    const name = club ? `Pro DJ Setup ${num} — Club CDJ Rig` : `Pro DJ Setup ${num} — Controller Booth`
    const srcs = files.map((f) => ({ abs: path.join(root, sub, f) }))
    const images = await emitImages("dj-setups", slug, srcs)
    const { price, originalPrice, discount } = priced(slug, club ? 1199 : 899)
    products.push(base({
      id: slug, name, slug, category: "dj-setups",
      tags: [club ? "club" : "controller"],
      filters: { console: club ? "club" : "controller", size: price >= 1100 ? "pro" : "standard" },
      description: `Professional ${club ? "club-style CDJ + mixer" : "controller-based"} DJ booth available for rental. Delivered, installed and supported by our technical team. Contact us for the full equipment list and availability.`,
      dimensions: "DJ Setup",
      price, originalPrice, discount, image: images[0], images,
      features: club ? ["Pioneer CDJ-3000 + DJM-900", "Booth Monitors", "Delivery & Setup Included", "On-Site Tech Support"] : ["DDJ Controller Booth", "Powered Speakers", "Delivery & Setup Included", "On-Site Tech Support"],
      includes: ["DJ Console", "Speakers & Monitors", "Cabling", "Delivery & Pickup", "On-Site Setup"],
      deliveryFee: round(Math.max(150, price * 0.12), 25), installationFee: round(Math.max(250, price * 0.2), 25),
    }))
  }
}

// ---------------------------------------------------------------------------
// 2) LED SCREENS — one product per file, pitch from subfolder, dims from name
// ---------------------------------------------------------------------------
async function buildLed() {
  const root = path.join(SRC, "LED screen")
  const mid = (await listDirs(root))[0]
  if (!mid) return
  const pitchDirs = await listDirs(path.join(root, mid))
  for (const pd of pitchDirs) {
    const pitchNum = (pd.match(/[\d.]+/) || ["2.6"])[0]
    const pitch = `P${pitchNum}mm`
    const files = await listFiles(path.join(root, mid, pd))
    for (const f of files) {
      const noExt = f.replace(/\.[^.]+$/, "")
      const d = parseWH(noExt)
      const w = d?.w, h = d?.h, area = d?.area || 0
      const slug = `led-wall-${pitchNum.replace(".", "-")}mm-${(w ?? 0).toString().replace(".", "-")}x${(h ?? 0).toString().replace(".", "-")}`
      const name = `LED Video Wall ${pitch}${w ? ` · ${w}′ × ${h}′` : ""}`
      const images = await emitImages("led-screens", slug, [{ abs: path.join(root, mid, pd, f) }])
      const perSqft = pitchNum === "1.9" ? 60 : pitchNum === "2.6" ? 42 : 28
      const price = round(area * perSqft + 800, 10) - 1
      const discount = 8 + (hash(slug) % 6)
      const originalPrice = round(price / (1 - discount / 100), 10) - 1
      const sizeTag = area >= 500 ? "xl-format" : area >= 200 ? "large-format" : area >= 60 ? "mid-format" : "compact"
      const pxW = w ? round((w * 304.8) / parseFloat(pitchNum), 16) : 0
      const pxH = h ? round((h * 304.8) / parseFloat(pitchNum), 16) : 0
      products.push(base({
        id: slug, name, slug, category: "led-screens",
        tags: ["indoor", "outdoor", sizeTag],
        filters: { pitch, size: sizeTag, environment: "indoor-outdoor", ip: "ip65" },
        description: `${d ? `${w}' × ${h}' (${area} sq ft) ` : ""}${pitch} pixel-pitch LED video wall for indoor & outdoor use. Seamless modular panels, high brightness and 4K-ready processing. Contact us for full specifications and availability.`,
        dimensions: d ? `${w}' x ${h}' (${area} sq ft)` : "Modular",
        price, originalPrice, discount, image: images[0], images,
        features: [`${pitch} Pixel Pitch`, "Indoor / Outdoor (IP65)", "4K-Ready Processing", sizeTag === "xl-format" || sizeTag === "large-format" ? "Large-Format" : "Modular Setup"],
        specs: { pixelPitch: pitch, resolution: pxW && pxH ? `${pxW} x ${pxH}` : "Modular", brightness: "5000 nits", refreshRate: "3840Hz", viewingAngle: "160°", lifespan: "100,000 hours" },
        includes: ["LED Panels", "Novastar Video Processor", "Flight Cases", "Power Distribution", "Signal Cables", "Rigging / Ground Support"],
        deliveryFee: round(Math.max(250, price * 0.1), 50), installationFee: round(Math.max(450, price * 0.2), 50),
      }))
    }
  }
}

// ---------------------------------------------------------------------------
// 3) L'ACOUSTICS / LIGHTS bucket -> sound-systems + stage(monitor) + lighting
// ---------------------------------------------------------------------------
async function buildSoundLights() {
  const root = path.join(SRC, "L’acoustics _ Lights")
  const files = await listFiles(root)
  const groups = groupVariants(files)
  for (const [baseName, vs] of groups) {
    const srcs = vs.map((f) => ({ abs: path.join(root, f) }))
    const lname = baseName.toLowerCase()
    if (/confidence monitor/.test(lname)) {
      await pushStage("confidence-monitor", "Confidence Monitor", srcs, { stageType: "led", scale: "small", backdrop: "no", type: "monitor" }, 1299)
    } else if (/light package/.test(lname)) {
      await pushLighting(baseName, srcs)
    } else {
      await pushSound(baseName, srcs)
    }
  }
}

async function pushSound(baseName, srcs) {
  const slug = slugify(baseName)
  if (products.some((p) => p.slug === slug)) return
  const num = parseInt((baseName.match(/(\d{3,4})/) || [])[1] || "0", 10)
  const capacity = num >= 2000 ? "2000+" : num >= 1000 ? "1000" : num >= 500 ? "500" : "350"
  const series = /a15/i.test(baseName) ? "A15" : /fest/i.test(baseName) ? "Fest" : /syva/i.test(baseName) ? "Syva" : "Other"
  const images = await emitImages("sound-systems", slug, srcs)
  const { price, originalPrice, discount } = priced(slug, 2499, 16)
  products.push(base({
    id: slug, name: titleCase(baseName.replace(/L['’]acoustics/i, "L-Acoustics")), slug, category: "sound-systems",
    tags: [series.toLowerCase(), `cap-${capacity}`],
    filters: { capacity, series },
    description: `Professional L-Acoustics ${series} sound system available for rental. Tuned for crowds of up to ${capacity.replace("+", "")} guests. Delivered, installed and supported by our audio team. Contact us for the full equipment list.`,
    dimensions: "Sound System",
    price, originalPrice, discount, image: images[0], images,
    features: ["L-Acoustics Components", "Line Array / Point Source", "Delivery & Setup Included", "On-Site Audio Engineer Available"],
    includes: ["Speakers & Subs", "Amplifiers / Processing", "Cabling", "Delivery & Pickup", "On-Site Setup"],
    deliveryFee: round(Math.max(200, price * 0.1), 25), installationFee: round(Math.max(350, price * 0.18), 25),
  }))
}

async function pushLighting(baseName, srcs) {
  const slug = slugify(baseName)
  if (products.some((p) => p.slug === slug)) return
  const images = await emitImages("lighting", slug, srcs)
  const { price, originalPrice, discount } = priced(slug, 1299)
  products.push(base({
    id: slug, name: titleCase(baseName), slug, category: "lighting",
    tags: ["lighting"], filters: { type: "package" },
    description: `Professional event lighting package available for rental in Los Angeles. Delivered, rigged and operated by our lighting team. Contact us for the full fixture list and availability.`,
    dimensions: "Lighting Package",
    price, originalPrice, discount, image: images[0], images,
    features: ["Stage & Ambient Fixtures", "Trussing & Rigging", "Delivery & Setup Included", "On-Site LD Available"],
    includes: ["Lighting Fixtures", "Trussing / Stands", "DMX Control", "Delivery & Pickup", "On-Site Setup"],
    deliveryFee: round(Math.max(150, price * 0.12), 25), installationFee: round(Math.max(250, price * 0.2), 25),
  }))
}

async function pushStage(slug, name, srcs, filters, basePrice) {
  if (products.some((p) => p.slug === slug)) return
  const images = await emitImages("stage", slug, srcs)
  const { price, originalPrice, discount } = priced(slug, basePrice)
  products.push(base({
    id: slug, name, slug, category: "stage",
    tags: [filters.stageType, filters.type].filter(Boolean),
    filters,
    description: `Professional ${filters.type === "monitor" ? "confidence monitor" : "stage / deck system"} available for rental. Delivered, built and certified by our staging crew. Contact us for load ratings, sizes and availability.`,
    dimensions: filters.type === "monitor" ? "Confidence Monitor" : "Stage / Deck",
    price, originalPrice, discount, image: images[0], images,
    features: filters.type === "monitor" ? ["Large-Format Display", "Floor / Truss Mount", "Delivery & Setup Included", "On-Site Tech Support"] : ["Modular Decking", "Adjustable Height", "Skirting Available", "Delivery & Build Included"],
    includes: ["Staging / Equipment", "Hardware", "Delivery & Pickup", "On-Site Build", "Technical Support"],
    deliveryFee: round(Math.max(200, price * 0.12), 25), installationFee: round(Math.max(350, price * 0.22), 25),
  }))
}

// ---------------------------------------------------------------------------
// 4) PRODUCT LIGHTS -> lighting
// ---------------------------------------------------------------------------
async function buildProductLights() {
  const root = path.join(SRC, "Product lights")
  const groups = groupVariants(await listFiles(root))
  for (const [baseName, vs] of groups) {
    await pushLighting(baseName, vs.map((f) => ({ abs: path.join(root, f) })))
  }
}

// ---------------------------------------------------------------------------
// 5) STAGE (LED packages) + STAGE RENTAL (outdoor / portable)
// ---------------------------------------------------------------------------
function stageScale(name) {
  const d = parseWH(name)
  if (!d) return "medium"
  return d.area >= 400 ? "large" : d.area >= 150 ? "medium" : "small"
}
async function buildStages() {
  // 5a — "Stage" folder = stage + LED screen packages
  {
    const root = path.join(SRC, "Stage")
    const groups = groupVariants(await listFiles(root))
    for (const [baseName, vs] of groups) {
      const slug = slugify(`stage ${baseName}`)
      await pushStage(slug, titleCase(baseName.replace(/^package/i, "Stage + LED Package")), vs.map((f) => ({ abs: path.join(root, f) })),
        { stageType: "led", scale: stageScale(baseName), backdrop: /backdrop|banner|adds/i.test(baseName) ? "yes" : "no", type: "stage" }, 2499)
    }
  }
  // 5b — Outdoor Stages
  {
    const root = path.join(SRC, "Stage rental", "Outdoor Stages")
    const groups = groupVariants(await listFiles(root))
    for (const [baseName, vs] of groups) {
      const slug = slugify(`outdoor stage ${baseName}`)
      await pushStage(slug, titleCase(`Outdoor Stage ${baseName}`), vs.map((f) => ({ abs: path.join(root, f) })),
        { stageType: "outdoor", scale: stageScale(baseName), backdrop: /backdrop|banner|adds/i.test(baseName) ? "yes" : "no", type: "stage" }, 2199)
    }
  }
  // 5c — Portable Stages (route strays out)
  {
    const root = path.join(SRC, "Stage rental", "Portable Stages - equipment")
    const all = await listFiles(root)
    const stageFiles = all.filter((f) => !/acoustics|syva|^tv /i.test(f))
    const groups = groupVariants(stageFiles)
    for (const [baseName, vs] of groups) {
      const isRound = /round/i.test(baseName)
      const isKit = /platform kit/i.test(baseName)
      const stageType = isRound ? "round" : isKit ? "platform-kit" : "portable"
      const slug = slugify(`${stageType} ${baseName}`)
      await pushStage(slug, titleCase(baseName), vs.map((f) => ({ abs: path.join(root, f) })),
        { stageType, scale: stageScale(baseName), backdrop: /backdrop/i.test(baseName) ? "yes" : "no", type: "stage" }, 1799)
    }
  }
}

// ---------------------------------------------------------------------------
// 6) PIPE & DRAPE -> new category
// ---------------------------------------------------------------------------
async function buildPipeDrape() {
  const root = path.join(SRC, "Pipe and drape")
  const groups = groupVariants(await listFiles(root))
  for (const [baseName, vs] of groups) {
    const lname = baseName.toLowerCase()
    const pdType = /booth/.test(lname) ? "booth" : /canopy|chuppah/.test(lname) ? "specialty" : /backdrop|hardware only/.test(lname) ? "backdrop" : "drape"
    const slug = slugify(baseName)
    if (products.some((p) => p.slug === slug)) continue
    const images = await emitImages("pipe-drape", slug, vs.map((f) => ({ abs: path.join(root, f) })))
    const basePrice = pdType === "specialty" ? 1299 : pdType === "booth" ? 899 : pdType === "backdrop" ? 599 : 299
    const { price, originalPrice, discount } = priced(slug, basePrice)
    products.push(base({
      id: slug, name: titleCase(baseName.replace(/_/g, " / ")), slug, category: "pipe-drape",
      tags: [pdType], filters: { pdType },
      description: `Professional pipe & drape ${pdType === "booth" ? "booth kit" : pdType === "specialty" ? "specialty structure" : "backdrop system"} available for rental. Delivered, installed and dressed by our crew. Contact us for sizing, colors and availability.`,
      dimensions: "Pipe & Drape",
      price, originalPrice, discount, image: images[0], images,
      features: ["Adjustable Uprights & Crossbars", "Premium Drape Panels", "Delivery & Setup Included", "Custom Sizing Available"],
      includes: ["Uprights & Bases", "Crossbars", "Drape Panels", "Delivery & Pickup", "On-Site Setup"],
      deliveryFee: round(Math.max(120, price * 0.12), 25), installationFee: round(Math.max(200, price * 0.2), 25),
    }))
  }
}

// ---------------------------------------------------------------------------
// 7) TV RENTAL -> tv (top-level files only, skip subfolders)
// ---------------------------------------------------------------------------
async function buildTv() {
  const root = path.join(SRC, "TV rental")
  const groups = groupVariants(await listFiles(root))
  for (const [baseName, vs] of groups) {
    const inch = parseFloat((baseName.match(/(\d{2,3}(?:\.\d)?)\s*[″"”']?\s*(?:inch|-|\b)/i) || [])[1] || "0")
    const tvSize = inch >= 75 ? "giant" : inch >= 59 ? "large" : inch >= 30 ? "standard" : "monitor"
    const slug = slugify(baseName)
    if (products.some((p) => p.slug === slug)) continue
    const images = await emitImages("tv", slug, vs.map((f) => ({ abs: path.join(root, f) })))
    const basePrice = tvSize === "giant" ? 899 : tvSize === "large" ? 499 : tvSize === "standard" ? 299 : 149
    const { price, originalPrice, discount } = priced(slug, basePrice)
    products.push(base({
      id: slug, name: titleCase(baseName.replace(/[″”]/g, '"').replace(/–/g, "-")), slug, category: "tv",
      tags: [tvSize], filters: { tvSize },
      description: `Professional ${inch ? `${inch}" ` : ""}display available for rental with floor or truss stand. Delivered, mounted and supported by our team. Contact us for availability and bulk pricing.`,
      dimensions: inch ? `${inch}" Display` : "Display",
      price, originalPrice, discount, image: images[0], images,
      features: [inch ? `${inch}" Screen` : "Pro Display", "Floor / Truss Stand Included", "4K Where Available", "Delivery & Setup Included"],
      includes: ["Display", "Stand / Mount", "Cabling", "Delivery & Pickup", "On-Site Setup"],
      deliveryFee: round(Math.max(80, price * 0.12), 25), installationFee: round(Math.max(120, price * 0.18), 25),
    }))
  }
}

function base(p) {
  return {
    id: p.id, name: p.name, slug: p.slug, category: p.category, tier: "basic",
    tags: p.tags || [], filters: p.filters || {}, description: p.description,
    dimensions: p.dimensions, price: p.price, originalPrice: p.originalPrice, discount: p.discount,
    image: p.image, images: p.images, features: p.features, specs: p.specs || {},
    includes: p.includes, deliveryFee: p.deliveryFee, installationFee: p.installationFee,
    rentalPeriod: "24h", inStock: true,
  }
}

async function run() {
  await fs.rm(OUT, { recursive: true, force: true }).catch(() => {})
  console.log("Wiped public/images/products. Building…")

  await buildDj()
  await buildLed()
  await buildSoundLights()
  await buildProductLights()
  await buildStages()
  await buildPipeDrape()
  await buildTv()

  // assign tier per category: priciest ~40% premium
  const CAT_ORDER = ["led-screens", "dj-setups", "sound-systems", "lighting", "stage", "pipe-drape", "tv"]
  for (const cat of CAT_ORDER) {
    const inCat = products.filter((p) => p.category === cat).sort((a, b) => b.price - a.price)
    const premiumCount = inCat.length <= 1 ? 0 : Math.max(1, Math.round(inCat.length * 0.4))
    inCat.forEach((p, i) => { p.tier = i < premiumCount ? "premium" : "basic" })
    // feature top 2 of each category
    inCat.slice(0, 2).forEach((p) => { p.featured = true })
  }

  products.sort((a, b) => CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category) || b.price - a.price)

  await fs.writeFile(DATA, JSON.stringify(products, null, 2) + "\n")
  const byCat = {}
  for (const p of products) byCat[p.category] = (byCat[p.category] || 0) + 1
  console.log(`Wrote ${products.length} products:`, byCat)
  // emit a few slugs for mega-menu wiring
  const pick = (c) => products.find((p) => p.category === c)?.slug
  console.log("mega-menu slugs:", {
    led: pick("led-screens"), sound: pick("sound-systems"), dj: products.find((p) => p.slug === "dj-setup-04")?.slug || pick("dj-setups"),
    lighting: pick("lighting"), stage: pick("stage"), pipe: pick("pipe-drape"), tv: pick("tv"),
  })
}
run().catch((e) => { console.error(e); process.exit(1) })
