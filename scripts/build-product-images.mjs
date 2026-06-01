// One-off: group raw Products/ photos into models, copy into public/images/products/,
// and emit a manifest the catalog data is authored from.
// Run from project root:  node scripts/build-product-images.mjs
import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"

const ROOT = process.cwd()
const SRC = path.join(ROOT, "Products")
const OUT = path.join(ROOT, "public", "images", "products")

// optimization settings — small files, fast load, minimal visible quality loss
const MAX_SIDE = 1280 // longest edge in px
const QUALITY = 80
const MAX_GALLERY = 8 // main + up to 7 extra photos per product

// raw top-level folder -> category slug used in the catalog
const CATEGORY_BY_FOLDER = {
  "DJ setups": "dj-setups",
  "LED screen": "led-screens",
  "L’acoustics _ Lights": "sound-lighting", // split per-item later in manifest review
  "Stage": "stage",
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/['’‘`]/g, "")
    .replace(/[′″]/g, "ft") // ′ ″ -> ft
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

// strip duplicate / variant markers so photos of the same model collapse together
function groupKey(nameNoExt) {
  let s = nameNoExt.trim()
  let prev
  do {
    prev = s
    s = s
      .replace(/\s*\(\d\)$/i, "")        // " (1)" " (2)"
      .replace(/\s*copy(\s*\d)?$/i, "")  // " copy" " copy 2"
      .replace(/\s*-\s*event$/i, "")     // " - event"
      .replace(/\s+event$/i, "")         // " event"
      .replace(/-\d$/i, "")              // "-1" .. "-9"
      .replace(/\s+\d$/i, "")            // trailing " 3"
      .trim()
  } while (s !== prev)
  // merge LED Video Wall panel-tech variants (COB / IP / plain) into one size model
  s = s.replace(/\s*(COB|IP)\s*$/i, "").trim()
  return s
}

// pick the cleanest filename of a group as the representative (shortest = fewest markers)
function pickMain(files) {
  return [...files].sort((a, b) => a.length - b.length || a.localeCompare(b))[0]
}

async function listImages(dir) {
  const out = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    if (e.isFile() && /\.(jpe?g|png|webp)$/i.test(e.name)) out.push(e.name)
  }
  return out
}

async function run() {
  await fs.rm(OUT, { recursive: true, force: true }).catch(() => {})
  const manifest = []

  const topDirs = await fs.readdir(SRC, { withFileTypes: true })
  for (const top of topDirs) {
    if (!top.isDirectory()) continue
    const category = CATEGORY_BY_FOLDER[top.name] || slugify(top.name)
    const topPath = path.join(SRC, top.name)

    // subfolders => each subfolder is one model (DJ setups)
    const subDirs = (await fs.readdir(topPath, { withFileTypes: true })).filter((d) => d.isDirectory())

    if (subDirs.length > 0) {
      for (const sub of subDirs) {
        const subPath = path.join(topPath, sub.name)
        const files = (await listImages(subPath)).sort()
        if (!files.length) continue
        const slug = slugify(sub.name)
        await emitGroup(manifest, category, sub.name, slug, subPath, files, files[0])
      }
      continue
    }

    // flat folder => group by normalized base name.
    // Stage packages ("package 1".."package 8") use a trailing digit as the real
    // identifier, so there we treat every file as its own model (no normalization).
    const isStage = category === "stage"
    const files = await listImages(topPath)
    const groups = new Map()
    for (const f of files) {
      const base = f.replace(/\.[^.]+$/, "")
      const key = isStage ? base.trim() : groupKey(base)
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(f)
    }
    for (const [key, groupFiles] of [...groups.entries()].sort()) {
      const slug = slugify(key)
      await emitGroup(manifest, category, key, slug, topPath, groupFiles.sort(), pickMain(groupFiles))
    }
  }

  await fs.writeFile(path.join(ROOT, "scripts", "product-image-manifest.json"), JSON.stringify(manifest, null, 2))
  console.log(`Models: ${manifest.length}`)
  const byCat = {}
  for (const m of manifest) byCat[m.category] = (byCat[m.category] || 0) + 1
  console.log("By category:", byCat)
}

async function emitGroup(manifest, category, rawName, slug, srcDir, files, mainFile) {
  const destDir = path.join(OUT, category, slug)
  await fs.mkdir(destDir, { recursive: true })
  // main first, then the rest as gallery — capped to keep the catalog light
  const ordered = [mainFile, ...files.filter((f) => f !== mainFile)].slice(0, MAX_GALLERY)
  const publicPaths = []
  for (let i = 0; i < ordered.length; i++) {
    const destName = `${i === 0 ? "main" : i}.webp`
    await sharp(path.join(srcDir, ordered[i]))
      .rotate()
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(destDir, destName))
    publicPaths.push(`/images/products/${category}/${slug}/${destName}`)
  }
  manifest.push({ category, rawName, slug, main: publicPaths[0], images: publicPaths })
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
