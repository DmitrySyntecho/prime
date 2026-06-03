// Import the /stages drop into the catalog: group photo variants into models,
// optimize to WebP, sort into categories + sub-filters, and append to
// data/products.json (skipping slugs that already exist).
//   node scripts/import-stages.mjs           # dry run (preview only)
//   node scripts/import-stages.mjs --write    # write images + data
import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"

const ROOT = process.cwd()
const SRC = path.join(ROOT, "stages")
const OUTBASE = path.join(ROOT, "public", "images", "products")
const DATA = path.join(ROOT, "data", "products.json")
const WRITE = process.argv.includes("--write")
const MAX_SIDE = 1280, QUALITY = 80, MAX_GALLERY = 8

const slugify = (s) =>
  s.toLowerCase()
    .replace(/['’‘`]/g, "")
    .replace(/[″”]/g, "in")
    .replace(/[′]/g, "ft")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

// strip ONLY duplicate markers: " (1)", " copy", "-1" (trailing). Keep meaningful
// trailing numbers like "package 3" / "16x8".
function groupKey(nameNoExt) {
  let s = nameNoExt.trim(), prev
  do {
    prev = s
    s = s.replace(/\s*\(\d\)$/, "").replace(/\s*copy(\s*\d)?$/i, "").replace(/-\d$/, "").trim()
  } while (s !== prev)
  return s
}
const pickMain = (files) => [...files].sort((a, b) => a.length - b.length || a.localeCompare(b))[0]

function dims(raw) {
  const nums = (raw.match(/\d+(?:\.\d+)?/g) || []).map(Number)
  if (nums.length >= 2) return { w: nums[0], h: nums[1], area: Math.round(nums[0] * nums[1]) }
  return null
}

function pretty(raw) {
  let s = raw.replace(/_/g, " ")
  s = s.replace(/(\d+)\s*[x×]\s*(\d+)(?:\s*[x×]\s*(\d+))?/gi, (m, a, b, c) =>
    c ? `${a}′ × ${b}′ × ${c}′` : `${a}′ × ${b}′`)
  s = s.replace(/(\d+′)\s*[x×]\s*(\d+′)/gi, "$1 × $2") // feet-marked dims: 24′ x 16′ -> ×
  s = s.replace(/\s*[–-]\s*/g, " — ").replace(/\s+/g, " ").trim()
  s = s.replace(/\b\w/g, (c) => c.toUpperCase())
  s = s.replace(/\bTv\b/g, "TV").replace(/\bFt\b/g, "FT").replace(/\bWith\b/g, "with")
  s = s.replace(/\bAdds\b/gi, "Add-ons").replace(/\+(\d+)\s*Add\s*Banner/gi, "+ $1 Banner Add-ons")
  return s
}

function classify(folder, raw) {
  const n = raw.toLowerCase()
  if (/l['’]?acoustics|syva/.test(n)) return { category: "sound-systems", skip: true } // dupes of existing
  if (/\btv\b/.test(n)) return { category: "led-screens", tv: true }
  let stageType = "portable"
  if (folder.toLowerCase().startsWith("outdoor")) stageType = "outdoor"
  else if (/round/.test(n)) stageType = "round"
  else if (/platform kit/.test(n)) stageType = "platform-kit"
  return { category: "stage", stageType, backdrop: /backdrop/.test(n) ? "yes" : "no" }
}

function buildName(raw, info) {
  if (info.tv) {
    const m = raw.match(/(\d+)/)
    return `${m ? m[1] : ""}″ TV Display`.trim()
  }
  let name = pretty(raw)
  if (info.category === "stage") {
    if (/^[\d\s′×x]+$/i.test(raw.replace(/[^0-9x×′\s]/gi, ""))&& !/[a-z]/i.test(raw)) {
      // pure dimensions only
      name = `${info.stageType === "outdoor" ? "Outdoor" : "Portable"} Stage ${name}`
    } else if (!/stage|kit/i.test(name)) {
      name = `${info.stageType === "outdoor" ? "Outdoor" : "Portable"} Stage ${name}`
    } else if (info.stageType === "outdoor" && /^Stage\b/.test(name)) {
      name = `Outdoor ${name}`
    }
  }
  return name.replace(/\s+/g, " ").trim()
}

function priceFor(info, d) {
  if (info.tv) {
    const inch = d ? d.w : 55
    return Math.round((199 + inch * 4) / 10) * 10 - 1
  }
  const area = d?.area || 0
  let base
  if (info.stageType === "platform-kit") base = 499 + area * 3
  else if (info.stageType === "round") base = 699 + area * 2
  else base = area ? 600 + area * 4 : 1499
  return Math.round(base / 10) * 10 - 1
}

const hash = (str) => { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h }

async function listImages(dir) {
  return (await fs.readdir(dir, { withFileTypes: true }))
    .filter((e) => e.isFile() && /\.(jpe?g|png|webp)$/i.test(e.name)).map((e) => e.name)
}

async function run() {
  const existing = JSON.parse(await fs.readFile(DATA, "utf8"))
  const existingSlugs = new Set(existing.map((p) => p.slug))
  const newProducts = []
  const summary = []

  const folders = (await fs.readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory())
  for (const folder of folders) {
    const dir = path.join(SRC, folder.name)
    const files = await listImages(dir)
    const groups = new Map()
    for (const f of files) {
      const key = groupKey(f.replace(/\.[^.]+$/, ""))
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(f)
    }
    for (const [key, groupFiles] of [...groups.entries()].sort()) {
      const info = classify(folder.name, key)
      if (info.skip) { summary.push(`SKIP (dupe sound): ${key}`); continue }
      const d = dims(key)
      const name = buildName(key, info)
      const slug = slugify(name) || slugify(key)
      if (existingSlugs.has(slug) || newProducts.some((p) => p.slug === slug)) {
        summary.push(`SKIP (exists): ${slug}`); continue
      }

      const price = priceFor(info, d)
      const discount = 8 + (hash(slug) % 6)
      const originalPrice = Math.round(price / (1 - discount / 100) / 10) * 10 - 1
      const area = d?.area || 0
      const scale = area ? (area < 120 ? "small" : area < 300 ? "medium" : "large") : "medium"

      const filters = {}
      let tags = []
      let dimensions = ""
      if (info.category === "stage") {
        filters.type = "stage"; filters.stageType = info.stageType
        filters.scale = scale; filters.backdrop = info.backdrop
        tags = ["stage", info.stageType, info.backdrop === "yes" ? "backdrop" : null].filter(Boolean)
        dimensions = d ? `${d.w}' x ${d.h}'` : (info.stageType === "round" ? "Round" : "Custom")
      } else if (info.tv) {
        filters.environment = "indoor"; filters.size = "compact"
        tags = ["tv", "indoor"]
        dimensions = d ? `${d.w}"` : "TV"
      }

      // optimize + copy images
      const ordered = [pickMain(groupFiles), ...groupFiles.filter((f) => f !== pickMain(groupFiles))].slice(0, MAX_GALLERY)
      const destDir = path.join(OUTBASE, info.category, slug)
      const publicPaths = []
      for (let i = 0; i < ordered.length; i++) {
        const destName = `${i === 0 ? "main" : i}.webp`
        publicPaths.push(`/images/products/${info.category}/${slug}/${destName}`)
        if (WRITE) {
          await fs.mkdir(destDir, { recursive: true })
          await sharp(path.join(dir, ordered[i])).rotate()
            .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
            .webp({ quality: QUALITY, effort: 5 }).toFile(path.join(destDir, destName))
        }
      }

      const labelType = info.tv ? "professional display" : `${info.stageType} stage`
      newProducts.push({
        id: slug, name, slug, category: info.category,
        tier: price >= 2500 ? "premium" : "basic",
        tags, filters,
        description: `Professional ${labelType}${d ? ` (${d.w}' × ${d.h}')` : ""} available for rental in Los Angeles. Delivered, set up and supported by our crew. Contact us for the full spec sheet and availability.`,
        dimensions,
        price, originalPrice, discount,
        image: publicPaths[0], images: publicPaths,
        features: ["Professional Grade", "Delivery & Setup Included", "On-Site Crew", "Event-Ready"],
        specs: {},
        includes: info.tv
          ? ["Display", "Floor / Wall Mount", "Cabling", "Delivery & Setup"]
          : ["Stage Decking", "Adjustable Legs", "Safety Railings", "Stairs & Skirting", "Delivery & Setup"],
        deliveryFee: Math.round(Math.max(150, price * 0.12) / 25) * 25,
        installationFee: Math.round(Math.max(250, price * 0.2) / 25) * 25,
        rentalPeriod: "24h", inStock: true,
      })
      summary.push(`${info.category.padEnd(12)} | ${slug.padEnd(40)} | $${price} | imgs ${publicPaths.length} | ${name}`)
    }
  }

  console.log(summary.join("\n"))
  console.log(`\n${WRITE ? "WROTE" : "DRY"} — ${newProducts.length} new products (skipped existing/dupes).`)
  const byCat = {}; newProducts.forEach((p) => byCat[p.category] = (byCat[p.category] || 0) + 1)
  console.log("By category:", byCat)

  if (WRITE) {
    await fs.writeFile(DATA, JSON.stringify([...existing, ...newProducts], null, 2) + "\n")
    console.log(`data/products.json now has ${existing.length + newProducts.length} products.`)
  }
}
run().catch((e) => { console.error(e); process.exit(1) })
