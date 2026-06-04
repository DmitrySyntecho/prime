// Build data/seo-pages.json + data/locations.json from the extracted xlsx TSVs
// in _spec/loc_*.tsv (Page Name, Slug, Title, _, Description, _, H1).
//   node scripts/build-seo-pages.mjs
import { promises as fs } from "fs"
import path from "path"

const ROOT = process.cwd()
const SPEC = path.join(ROOT, "_spec")

const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase())

function normPath(slug) {
  let p = slug.trim()
  if (!p.startsWith("/")) p = "/" + p
  // collapse, strip trailing slash (except root)
  p = p.replace(/\/+/g, "/")
  if (p.length > 1) p = p.replace(/\/$/, "")
  return p
}

function pageType(pathNoLoc) {
  const seg = pathNoLoc.replace(/^\//, "").split("/")[0] || ""
  if (seg === "") return "locale-landing"
  if (seg === "av-installations") return "installations"
  if (seg === "av-rental") return "rental"
  if (seg === "store") return "store"
  return "service"
}

async function run() {
  const files = (await fs.readdir(SPEC)).filter((f) => f.startsWith("loc_") && f.endsWith(".tsv"))
  const pages = []
  const locations = []
  const seen = new Set()

  for (const file of files.sort()) {
    const raw = await fs.readFile(path.join(SPEC, file), "utf8")
    const rows = raw.split("\n").map((r) => r.split("\t"))
    const data = rows.slice(1).filter((r) => (r[1] || "").trim()) // skip header + blanks
    if (data.length === 0) continue

    // landing = first data row
    const landingSlug = normPath(data[0][1])
    const isNational = landingSlug === "/" // USA sheet
    const locationSlug = isNational ? "" : landingSlug.replace(/^\//, "").split("/")[0]

    // location display name from landing title "... in {Name} | ..."
    const m = (data[0][2] || "").match(/\bin (.+?)\s*\|/)
    let locationName = isNational ? "United States" : (m ? m[1] : titleCase(locationSlug.replace(/-/g, " ")))
    locationName = locationName.replace(/^the\s+/i, "")

    locations.push({ name: locationName, slug: locationSlug, national: isNational, landing: landingSlug })

    for (const r of data) {
      const p = normPath(r[1])
      if (p === "/") continue // homepage already exists as app/page.tsx
      if (seen.has(p)) continue
      seen.add(p)
      const pathNoLoc = isNational ? p : p.replace(new RegExp(`^/${locationSlug}`), "") || "/"
      pages.push({
        path: p,
        pageName: (r[0] || "").trim(),
        title: (r[2] || "").trim(),
        description: (r[4] || "").trim(),
        h1: (r[6] || "").trim(),
        location: locationName,
        locationSlug,
        national: isNational,
        type: pageType(pathNoLoc),
      })
    }
  }

  await fs.mkdir(path.join(ROOT, "data"), { recursive: true })
  await fs.writeFile(path.join(ROOT, "data", "seo-pages.json"), JSON.stringify(pages, null, 2) + "\n")
  await fs.writeFile(path.join(ROOT, "data", "locations.json"), JSON.stringify(locations, null, 2) + "\n")

  const byType = {}
  pages.forEach((p) => (byType[p.type] = (byType[p.type] || 0) + 1))
  console.log(`Wrote ${pages.length} pages across ${locations.length} locations`)
  console.log("By type:", byType)
  console.log("Sample:", pages.slice(0, 3).map((p) => p.path))
}
run().catch((e) => { console.error(e); process.exit(1) })
