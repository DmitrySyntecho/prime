// One-off: turn the image manifest into lib/products-data.ts.
// Names + dimensions are derived from the source filenames (nothing invented).
// Prices and LED spec sheets are REPRESENTATIVE PLACEHOLDERS — see header in output.
// Run from project root:  node scripts/generate-products-data.mjs
import { promises as fs } from "fs"
import path from "path"

const ROOT = process.cwd()
const manifest = JSON.parse(await fs.readFile(path.join(ROOT, "scripts", "product-image-manifest.json"), "utf8"))

// ----- helpers -------------------------------------------------------------
const title = (s) =>
  s.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/Led/g, "LED").replace(/Dj/g, "DJ")

// Pull the "(30_ x 15_)" / "(11.48′ x 6.56′)" trailer out of a raw name.
function parseDimensions(raw) {
  const m = raw.match(/\(?\s*([\d.]+)\s*[_'’′]*\s*[x×]\s*([\d.]+)\s*[_'’′]*\)?\s*$/)
  if (!m) return null
  const w = parseFloat(m[1])
  const h = parseFloat(m[2])
  if (!w || !h) return null
  const nameWithout = raw.replace(/\s*\(?[\d.]+\s*[_'’′]*\s*[x×].*$/, "").trim()
  return { w, h, nameWithout }
}

const fmtFt = (n) => (Number.isInteger(n) ? `${n}` : `${n}`)
const round = (n, step) => Math.round(n / step) * step

// deterministic per-slug jitter so prices/discounts don't all look identical
function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

// ----- category definitions ------------------------------------------------
function resolveCategory(m) {
  if (m.category === "led-screens") return "led-screens"
  if (m.category === "dj-setups") return "dj-setups"
  if (m.category === "stage") return "stage"
  // sound-lighting bucket gets split
  if (m.slug === "light-package") return "lighting"
  if (m.slug === "confidence-monitor") return "stage"
  return "sound-systems" // L'acoustics packages
}

function buildLed(m) {
  const dims = parseDimensions(m.rawName)
  const w = dims?.w ?? 0
  const h = dims?.h ?? 0
  const sqft = Math.round(w * h)
  const baseName = dims?.nameWithout || m.rawName
  const name = title(baseName) || "LED Video Wall"
  const dimStr = dims ? `${fmtFt(w)}' x ${fmtFt(h)}' (${sqft} sq ft)` : "Modular"

  const outdoor = /outdoor|billboard|stadium|highway|baggage|terminal|gate/i.test(m.rawName)
  // diversify pixel pitch by environment + scale so the filter is meaningful
  let pitch
  if (outdoor) pitch = sqft >= 600 ? "P4.8mm" : "P3.9mm"
  else pitch = sqft < 60 ? "P1.9mm" : sqft < 200 ? "P2.6mm" : "P3.9mm"
  const pitchMm = parseFloat(pitch.replace(/[^\d.]/g, "")) || 2.6
  const brightness = outdoor ? "6500 nits" : "4500 nits"
  const ip = outdoor ? "IP65" : "Indoor"
  const sizeTag = sqft >= 500 ? "xl-format" : sqft >= 200 ? "large-format" : sqft >= 60 ? "mid-format" : "compact"
  // rough horizontal pixel count from width + pitch (representative)
  const px = Math.round((w * 304.8) / pitchMm / 16) * 16
  const py = Math.round((h * 304.8) / pitchMm / 16) * 16

  const price = round(900 + sqft * 17, 10) - 1
  const discount = 8 + (hash(m.slug) % 6) // 8–13%
  const originalPrice = round(price / (1 - discount / 100), 10) - 1

  return {
    name,
    dimensions: dimStr,
    price,
    discount,
    originalPrice,
    description: `${dims ? `${fmtFt(w)}' x ${fmtFt(h)}' (${sqft} sq ft) ` : ""}professional ${
      outdoor ? "outdoor-rated " : "indoor "
    }LED video wall. Broadcast-quality visuals for events, watch parties, and installations. Contact us for full specifications and availability.`,
    features: [
      `${pitch} Pixel Pitch`,
      outdoor ? "Outdoor IP65 Rated" : "High-Brightness Indoor",
      "4K-Ready Processing",
      sqft >= 200 ? "Large-Format" : "Modular Setup",
    ],
    specs: {
      pixelPitch: pitch,
      resolution: px && py ? `${px} x ${py}` : "Modular",
      brightness,
      refreshRate: "3840Hz",
      viewingAngle: "160°",
      lifespan: "100,000 hours",
    },
    includes: [
      "LED Panels",
      "Novastar Video Processor",
      "Flight Cases",
      "Power Distribution",
      "Signal Cables",
      "Rigging / Ground Support",
    ],
    deliveryFee: round(Math.max(200, price * 0.12), 50),
    installationFee: round(Math.max(400, price * 0.22), 50),
    filters: {
      environment: outdoor ? "outdoor" : "indoor",
      pitch,
      size: sizeTag,
      ip: outdoor ? "ip65" : "indoor",
    },
  }
}

function buildGeneric(m, category) {
  const cleaned = title(
    m.rawName
      .replace(/L’acoustics|L'acoustics/i, "L-Acoustics")
      .replace(/\bpackage\b/i, "Package")
      .replace(/\s+/g, " ")
      .trim()
  )
  const labels = {
    "dj-setups": "DJ Setup",
    "sound-systems": "Sound System",
    lighting: "Lighting Package",
    stage: "Stage Package",
  }
  let name = cleaned
  if (category === "dj-setups") name = name.replace(/Dj Setup/i, "Pro DJ Setup")
  if (category === "stage" && /^Package/i.test(name)) name = name.replace(/^Package/i, "Stage Package")

  const basePrice = {
    "dj-setups": 899,
    "sound-systems": 2499,
    lighting: 1299,
    stage: 1799,
  }[category]
  const price = round(basePrice + (hash(m.slug) % 12) * 50, 10) - 1
  const discount = 8 + (hash(m.slug) % 6)
  const originalPrice = round(price / (1 - discount / 100), 10) - 1

  // category-specific filter facets
  const filters = {}
  if (category === "sound-systems") {
    const num = parseInt((m.rawName.match(/(\d{3,4})/) || [])[1] || "0", 10)
    filters.capacity = num >= 2000 ? "2000+" : num >= 1000 ? "1000" : num >= 500 ? "500" : "350"
    filters.series = /a15/i.test(m.rawName) ? "A15" : /fest/i.test(m.rawName) ? "Fest" : /syva/i.test(m.rawName) ? "Syva" : "Other"
  } else if (category === "dj-setups") {
    // setup 04 is a club CDJ rig; the rest are controller-based booths
    filters.console = /-0?4$/.test(m.slug) ? "club" : "controller"
    filters.size = price >= 1100 ? "pro" : "standard"
  } else if (category === "stage") {
    filters.type = m.slug === "confidence-monitor" ? "monitor" : "stage"
    filters.scale = price >= 2100 ? "large" : price >= 1850 ? "medium" : "small"
  } else if (category === "lighting") {
    filters.type = "package"
  }

  return {
    name,
    dimensions: labels[category],
    price,
    discount,
    originalPrice,
    description: `Professional ${labels[category].toLowerCase()} available for rental in Los Angeles. Delivered, installed, and supported by our technical team. Contact us for the full equipment list and availability.`,
    features: ["Professional Grade", "Delivery & Setup Included", "On-Site Tech Support", "Event-Ready"],
    specs: {},
    includes: ["Professional Equipment", "Delivery & Pickup", "On-Site Setup", "Technical Support"],
    deliveryFee: round(Math.max(150, price * 0.12), 25),
    installationFee: round(Math.max(250, price * 0.2), 25),
    filters,
  }
}

// ----- build products ------------------------------------------------------
const products = []
const featuredCount = {}

for (const m of manifest) {
  const category = resolveCategory(m)
  const built = category === "led-screens" ? buildLed(m) : buildGeneric(m, category)

  // feature the first two (by size for LED) of each category
  featuredCount[category] = featuredCount[category] || 0
  const featured = featuredCount[category] < 2 && (category !== "led-screens" || built.price > 6000)
  if (featured) featuredCount[category]++

  // facet tags
  const tags = []
  if (category === "led-screens") {
    const outdoor = /outdoor|billboard|stadium|highway|baggage|terminal|gate/i.test(m.rawName)
    tags.push(outdoor ? "outdoor" : "indoor")
    const sq = parseInt((built.dimensions.match(/\((\d+)\s*sq/) || [])[1] || "0", 10)
    if (sq >= 500) tags.push("xl-format")
    else if (sq >= 200) tags.push("large-format")
    else if (sq >= 60) tags.push("mid-format")
    else tags.push("compact")
  }

  products.push({
    id: m.slug,
    name: built.name,
    slug: m.slug,
    category,
    tier: "basic", // assigned per-category below
    tags,
    filters: built.filters || {},
    description: built.description,
    dimensions: built.dimensions,
    price: built.price,
    originalPrice: built.originalPrice,
    discount: built.discount,
    image: m.main,
    images: m.images,
    features: built.features,
    specs: built.specs,
    includes: built.includes,
    deliveryFee: built.deliveryFee,
    installationFee: built.installationFee,
    rentalPeriod: "24h",
    inStock: true,
    ...(featured ? { featured: true } : {}),
  })
}

// assign tier per category: priciest ~40% are "premium", the rest "basic"
const CAT_ORDER = ["led-screens", "dj-setups", "sound-systems", "lighting", "stage"]
for (const cat of CAT_ORDER) {
  const inCat = products.filter((p) => p.category === cat).sort((a, b) => b.price - a.price)
  const premiumCount = inCat.length <= 1 ? 0 : Math.max(1, Math.round(inCat.length * 0.4))
  inCat.forEach((p, i) => {
    p.tier = i < premiumCount ? "premium" : "basic"
  })
}

// stable order: by category (catalog order), then price desc
products.sort(
  (a, b) => CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category) || b.price - a.price
)

// ----- build CATEGORY_FILTERS (contextual sub-filters per category) --------
const FILTER_META = {
  environment: { label: "Environment", labels: { indoor: "Indoor", outdoor: "Outdoor / IP65" }, order: ["indoor", "outdoor"] },
  ip: { label: "Weatherproofing", labels: { indoor: "Indoor Use", ip65: "IP65 Outdoor-Rated" }, order: ["indoor", "ip65"] },
  pitch: { label: "Pixel Pitch", labels: {}, order: ["P1.9mm", "P2.6mm", "P3.9mm", "P4.8mm"] },
  size: {
    label: "Screen Size",
    labels: { compact: "Compact (<60 sq ft)", "mid-format": "Mid (60–200)", "large-format": "Large (200–500)", "xl-format": "XL / Giant (500+)", standard: "Standard", pro: "Pro" },
    order: ["compact", "mid-format", "large-format", "xl-format", "standard", "pro"],
  },
  capacity: {
    label: "Audience Size",
    labels: { "350": "Up to 350", "500": "Up to 500", "1000": "Up to 1,000", "2000": "Up to 2,000", "2000+": "2,000+ guests" },
    order: ["350", "500", "1000", "2000", "2000+"],
  },
  series: { label: "Series", labels: { Other: "Other" }, order: ["A15", "Syva", "Fest", "Other"] },
  console: { label: "Console", labels: { controller: "Controller (DDJ)", club: "Club (CDJ + Mixer)" }, order: ["controller", "club"] },
  type: { label: "Type", labels: { stage: "Stage / Deck", monitor: "Confidence Monitor", package: "Package" }, order: ["stage", "monitor", "package"] },
  scale: { label: "Scale", labels: { small: "Small", medium: "Medium", large: "Large" }, order: ["small", "medium", "large"] },
}
const CATEGORY_FACET_KEYS = {
  "led-screens": ["environment", "pitch", "size"],
  "sound-systems": ["capacity", "series"],
  "dj-setups": ["console", "size"],
  stage: ["type", "scale"],
}
const CATEGORY_FILTERS = {}
for (const [cat, keys] of Object.entries(CATEGORY_FACET_KEYS)) {
  const inCat = products.filter((p) => p.category === cat)
  const facets = []
  for (const key of keys) {
    const present = new Set(inCat.map((p) => p.filters?.[key]).filter(Boolean))
    if (present.size <= 1) continue // skip non-discriminating facets
    const meta = FILTER_META[key]
    const ordered = [...present].sort((a, b) => {
      const ia = meta.order.indexOf(a), ib = meta.order.indexOf(b)
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
    facets.push({
      key,
      label: meta.label,
      options: ordered.map((v) => ({ value: v, label: meta.labels[v] || v })),
    })
  }
  if (facets.length) CATEGORY_FILTERS[cat] = facets
}

// ----- emit TS -------------------------------------------------------------
const header = `import type { Product, ProductCategory } from "./cart-context"

// AUTO-GENERATED from scripts/generate-products-data.mjs (source images in /Products).
// Names & dimensions are derived from the source filenames.
// NOTE: prices, discounts and LED spec sheets are REPRESENTATIVE PLACEHOLDERS —
// replace with real rates before launch.

export interface CategoryMeta {
  slug: ProductCategory
  label: string
  shortLabel: string
  /** related rental service page, if any */
  serviceSlug?: string
}

export const CATEGORIES: CategoryMeta[] = [
  { slug: "led-screens", label: "LED Video Walls & Screens", shortLabel: "LED Screens", serviceSlug: "led-screen-rental" },
  { slug: "dj-setups", label: "DJ Setups", shortLabel: "DJ Setups" },
  { slug: "sound-systems", label: "Sound Systems", shortLabel: "Sound", serviceSlug: "sound-system-rental" },
  { slug: "lighting", label: "Lighting", shortLabel: "Lighting", serviceSlug: "lighting-rental" },
  { slug: "stage", label: "Stage & Production", shortLabel: "Stage", serviceSlug: "stage-rental" },
]

export const CATEGORY_LABEL: Record<ProductCategory, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label])
) as Record<ProductCategory, string>

export interface FilterOption {
  value: string
  label: string
}
export interface FilterFacet {
  key: string
  label: string
  options: FilterOption[]
}

// Contextual sub-filters shown when a category is selected in the shop.
export const CATEGORY_FILTERS: Partial<Record<ProductCategory, FilterFacet[]>> = ${JSON.stringify(CATEGORY_FILTERS, null, 2)}

`

const body = `export const products: Product[] = ${JSON.stringify(products, null, 2)}
`

const footer = `
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductsByTier(category: ProductCategory, tier: "basic" | "premium"): Product[] {
  return products
    .filter((p) => p.category === category && p.tier === tier)
    .sort((a, b) => b.price - a.price)
}

/** Complementary products from OTHER categories — for "frequently ordered together". */
export function getComplementaryProducts(category: ProductCategory, limit = 8): Product[] {
  // sensible cross-sell pairings per category
  const pairings: Record<ProductCategory, ProductCategory[]> = {
    "led-screens": ["sound-systems", "stage", "lighting"],
    "dj-setups": ["sound-systems", "lighting", "led-screens"],
    "sound-systems": ["dj-setups", "stage", "lighting"],
    lighting: ["stage", "led-screens", "sound-systems"],
    stage: ["led-screens", "sound-systems", "lighting"],
  }
  const wanted = pairings[category] || []
  const picked: Product[] = []
  // round-robin one from each complementary category, featured/priciest first
  const buckets = wanted.map((c) =>
    products.filter((p) => p.category === c).sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.price - a.price)
  )
  let i = 0
  while (picked.length < limit && buckets.some((b) => b.length)) {
    const b = buckets[i % buckets.length]
    if (b.length) picked.push(b.shift() as Product)
    i++
  }
  return picked.slice(0, limit)
}

/** Map a rental service page slug (incl. city-suffixed variants) to a product category. */
export function getCategoryForServiceSlug(slug: string): ProductCategory | undefined {
  const match = CATEGORIES.find((c) => c.serviceSlug && slug.startsWith(c.serviceSlug))
  return match?.slug
}
`

await fs.writeFile(path.join(ROOT, "lib", "products-data.ts"), header + body + footer)
console.log(`Wrote ${products.length} products to lib/products-data.ts`)
const byCat = {}
for (const p of products) byCat[p.category] = (byCat[p.category] || 0) + 1
console.log(byCat)
