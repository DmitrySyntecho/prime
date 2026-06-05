// Replace the led-screens catalog with the new /LED drop (organized by pixel
// pitch). Removes existing led-screens products + images, optimizes the new
// photos to WebP, and appends products with a Pixel Pitch filter.
//   node scripts/import-led.mjs
import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"

const ROOT = process.cwd()
const SRC = path.join(ROOT, "LED")
const OUT = path.join(ROOT, "public", "images", "products", "led-screens")
const DATA = path.join(ROOT, "data", "products.json")
const MAX_SIDE = 1280, QUALITY = 80

const hash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h }

function parseDims(name) {
  const nums = (name.match(/\d+(?:\.\d+)?/g) || []).map(Number)
  // first number is the pitch (1.9 / 2.6 / 3.9) -> skip it; next two are W x H
  const dims = nums.slice(1)
  if (dims.length >= 2) return { w: dims[0], h: dims[1], area: Math.round(dims[0] * dims[1]) }
  return null
}

async function run() {
  const all = JSON.parse(await fs.readFile(DATA, "utf8"))
  const kept = all.filter((p) => p.category !== "led-screens")
  console.log(`Removed ${all.length - kept.length} old led-screens products`)

  // wipe old led-screens images, rebuild fresh
  await fs.rm(OUT, { recursive: true, force: true }).catch(() => {})

  const subdirs = (await fs.readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory())
  const added = []

  for (const sub of subdirs) {
    const pitchNum = (sub.name.match(/[\d.]+/) || ["2.6"])[0] // "1.9" / "2.6" / "3.9"
    const pitch = `P${pitchNum}mm`
    const files = (await fs.readdir(path.join(SRC, sub.name))).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()

    for (const file of files) {
      const base = file.replace(/\.[^.]+$/, "")
      const d = parseDims(base)
      const w = d?.w, h = d?.h, area = d?.area || 0
      const dimLabel = d ? `${w}' x ${h}' (${area} sq ft)` : "Modular"
      const slug = `led-wall-${pitchNum.replace(".", "-")}mm-${(w ?? 0).toString().replace(".", "-")}x${(h ?? 0).toString().replace(".", "-")}`
      const name = `LED Video Wall ${pitch} · ${w ?? ""}′ × ${h ?? ""}′`.replace(/\s+·\s+′ × ′/, "")

      // optimize image
      await fs.mkdir(path.join(OUT, slug), { recursive: true })
      await sharp(path.join(SRC, sub.name, file))
        .rotate()
        .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(path.join(OUT, slug, "main.webp"))
      const img = `/images/products/led-screens/${slug}/main.webp`

      // pricing: finer pitch costs more; scale by area
      const perSqft = pitchNum === "1.9" ? 60 : pitchNum === "2.6" ? 42 : 28
      const price = Math.round((area * perSqft + 800) / 10) * 10 - 1
      const discount = 8 + (hash(slug) % 6)
      const originalPrice = Math.round(price / (1 - discount / 100) / 10) * 10 - 1
      const sizeTag = area >= 500 ? "xl-format" : area >= 200 ? "large-format" : area >= 60 ? "mid-format" : "compact"
      const pxW = w ? Math.round((w * 304.8) / parseFloat(pitchNum) / 16) * 16 : 0
      const pxH = h ? Math.round((h * 304.8) / parseFloat(pitchNum) / 16) * 16 : 0

      added.push({
        id: slug,
        name,
        slug,
        category: "led-screens",
        tier: pitchNum === "1.9" || price >= 12000 ? "premium" : "basic",
        tags: ["indoor", "outdoor", sizeTag],
        filters: { pitch, size: sizeTag, environment: "indoor-outdoor", ip: "ip65" },
        description: `${d ? `${w}' × ${h}' (${area} sq ft) ` : ""}${pitch} pixel-pitch LED video wall for indoor & outdoor use. Seamless modular panels with high brightness and 4K-ready processing. Contact us for full specifications and availability.`,
        dimensions: dimLabel,
        price,
        originalPrice,
        discount,
        image: img,
        images: [img],
        features: [`${pitch} Pixel Pitch`, "Indoor / Outdoor (IP65)", "4K-Ready Processing", sizeTag === "xl-format" || sizeTag === "large-format" ? "Large-Format" : "Modular Setup"],
        specs: {
          pixelPitch: pitch,
          resolution: pxW && pxH ? `${pxW} x ${pxH}` : "Modular",
          brightness: "5000 nits",
          refreshRate: "3840Hz",
          viewingAngle: "160°",
          lifespan: "100,000 hours",
        },
        includes: ["LED Panels", "Novastar Video Processor", "Flight Cases", "Power Distribution", "Signal Cables", "Rigging / Ground Support"],
        deliveryFee: Math.round(Math.max(250, price * 0.1) / 50) * 50,
        installationFee: Math.round(Math.max(450, price * 0.2) / 50) * 50,
        rentalPeriod: "24h",
        inStock: true,
      })
    }
  }

  // feature the two priciest
  added.sort((a, b) => b.price - a.price).slice(0, 2).forEach((p) => (p.featured = true))

  const next = [...added, ...kept]
  await fs.writeFile(DATA, JSON.stringify(next, null, 2) + "\n")
  console.log(`Added ${added.length} new LED products. Catalog total: ${next.length}`)
  const pitches = {}; added.forEach((p) => (pitches[p.filters.pitch] = (pitches[p.filters.pitch] || 0) + 1))
  console.log("By pitch:", pitches)
  console.log("Sample slug for mega-menu:", added[0].slug)
}
run().catch((e) => { console.error(e); process.exit(1) })
