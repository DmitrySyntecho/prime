// Optimize every raster image under public/images for minimal weight / fast
// load with little visible quality loss:
//   - jpg/jpeg/png  -> webp (original deleted, code refs rewritten)
//   - webp          -> re-encoded & resized; kept only if the result is smaller
// SVG/GIF are left untouched. /images/products is skipped (build-product-images.mjs
// already emits optimized webp there).
//
// Run from project root:  node scripts/optimize-images.mjs
import { promises as fs } from "node:fs"
import path from "node:path"
import sharp from "sharp"

const ROOT = process.cwd()
const IMG_DIR = path.join(ROOT, "public", "images")
const SRC_DIRS = ["app", "components", "lib"].map((d) => path.join(ROOT, d))

const MAX_SIDE = 1600
const QUALITY = 80

async function walk(dir, hit) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) await walk(p, hit)
    else await hit(p)
  }
}

const toPublic = (abs) => abs.slice(path.join(ROOT, "public").length).replace(/\\/g, "/")

const renames = []
let savedBytes = 0
let processed = 0

async function optimize(file) {
  const ext = path.extname(file).toLowerCase()
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return
  if (file.replace(/\\/g, "/").includes("/public/images/products/")) return

  const input = await fs.readFile(file) // read fully first (avoids same-path R/W lock on Windows)
  const before = input.length
  const buf = await sharp(input)
    .rotate()
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer()

  if (ext === ".webp") {
    if (buf.length < before) {
      await fs.writeFile(file, buf)
      savedBytes += before - buf.length
      processed++
    }
    return
  }

  const webpFile = file.slice(0, -ext.length) + ".webp"
  await fs.writeFile(webpFile, buf)
  await fs.rm(file)
  renames.push({ from: toPublic(file), to: toPublic(webpFile) })
  savedBytes += before - buf.length
  processed++
}

async function rewriteRefs() {
  if (renames.length === 0) return
  for (const dir of SRC_DIRS) {
    await walk(dir, async (file) => {
      if (!/\.(ts|tsx|js|jsx|mjs|json)$/.test(file)) return
      let txt = await fs.readFile(file, "utf8")
      let changed = false
      for (const { from, to } of renames) {
        if (txt.includes(from)) {
          txt = txt.split(from).join(to)
          changed = true
        }
      }
      if (changed) await fs.writeFile(file, txt)
    })
  }
}

await walk(IMG_DIR, optimize)
await rewriteRefs()

console.log(`Optimized ${processed} images, saved ~${(savedBytes / 1024 / 1024).toFixed(1)}MB`)
console.log(`Renamed (jpg/png -> webp): ${renames.length}`)
for (const r of renames) console.log(`  ${r.from} -> ${r.to}`)
