import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"
import { ADMIN_COOKIE, isValidToken } from "@/lib/admin-auth"
import { slugify } from "@/lib/admin-store"

export const runtime = "nodejs"

const MAX_SIDE = 1280
const QUALITY = 80

export async function POST(req: NextRequest) {
  if (!isValidToken(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const form = await req.formData().catch(() => null)
  if (!form) return NextResponse.json({ error: "Invalid form" }, { status: 400 })

  const file = form.get("file") as File | null
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

  // folder = product slug (or "_misc"); optimized to webp
  const folder = slugify(String(form.get("slug") || "_misc")) || "_misc"
  const category = slugify(String(form.get("category") || "uploads")) || "uploads"
  const destDir = path.join(process.cwd(), "public", "images", "products", category, folder)
  await fs.mkdir(destDir, { recursive: true })

  const buf = Buffer.from(await file.arrayBuffer())
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image"
  // unique-ish name from base + length (no Date.now available constraints here, but route runtime is fine)
  let name = `${base}.webp`
  let i = 1
  while (await fs.access(path.join(destDir, name)).then(() => true).catch(() => false)) {
    name = `${base}-${i++}.webp`
  }

  const out = await sharp(buf)
    .rotate()
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer()
  await fs.writeFile(path.join(destDir, name), out)

  const url = `/images/products/${category}/${folder}/${name}`
  return NextResponse.json({ url })
}
