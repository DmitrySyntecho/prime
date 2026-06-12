import { promises as fs } from "fs"
import path from "path"
import type { Product, ProductCategory, ProductTier } from "./cart-context"

const DATA_FILE = path.join(process.cwd(), "data", "products.json")

export async function readProducts(): Promise<Product[]> {
  const raw = await fs.readFile(DATA_FILE, "utf8")
  return JSON.parse(raw) as Product[]
}

async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2) + "\n", "utf8")
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’‘`]/g, "")
    .replace(/[′″]/g, "ft")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

const CATEGORIES: ProductCategory[] = ["led-screens", "dj-setups", "sound-systems", "lighting", "stage", "pipe-drape", "tv"]

/** Coerce arbitrary input into a valid, fully-formed Product. */
export function normalizeProduct(input: any, existingIds: string[] = []): Product {
  const num = (v: any, d = 0) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : d
  }
  const strArr = (v: any): string[] =>
    Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : []

  const category: ProductCategory = CATEGORIES.includes(input.category) ? input.category : "led-screens"
  const tier: ProductTier = input.tier === "premium" ? "premium" : "basic"

  const name = String(input.name || "Untitled Product").trim()
  let slug = String(input.slug || "").trim() || slugify(name)
  slug = slugify(slug)
  // ensure slug uniqueness against the provided id list (excluding self)
  if (existingIds.includes(slug)) {
    let n = 2
    while (existingIds.includes(`${slug}-${n}`)) n++
    slug = `${slug}-${n}`
  }

  const images = strArr(input.images)
  const image = String(input.image || images[0] || "").trim()
  const finalImages = images.length ? images : image ? [image] : []

  // specs / filters as plain string maps
  const toMap = (v: any): Record<string, string> => {
    const out: Record<string, string> = {}
    if (v && typeof v === "object" && !Array.isArray(v)) {
      for (const [k, val] of Object.entries(v)) {
        const key = String(k).trim()
        if (key) out[key] = String(val ?? "").trim()
      }
    }
    return out
  }

  const discount = Math.max(0, Math.min(95, num(input.discount)))
  const price = Math.max(0, num(input.price))
  const originalPrice = num(input.originalPrice) || (discount > 0 ? Math.round(price / (1 - discount / 100)) : price)

  return {
    id: String(input.id || slug),
    name,
    slug,
    category,
    tier,
    tags: strArr(input.tags),
    filters: toMap(input.filters),
    description: String(input.description || "").trim(),
    dimensions: String(input.dimensions || "").trim(),
    price,
    originalPrice,
    discount,
    image: image || finalImages[0] || "",
    images: finalImages,
    features: strArr(input.features),
    specs: toMap(input.specs),
    includes: strArr(input.includes),
    deliveryFee: Math.max(0, num(input.deliveryFee)),
    installationFee: Math.max(0, num(input.installationFee)),
    rentalPeriod: String(input.rentalPeriod || "24h").trim(),
    inStock: input.inStock !== false,
    ...(input.featured ? { featured: true } : {}),
  }
}

export async function createProduct(input: any): Promise<Product> {
  const products = await readProducts()
  const ids = products.map((p) => p.slug)
  const product = normalizeProduct({ ...input, id: undefined }, ids)
  product.id = product.slug
  products.unshift(product)
  await writeProducts(products)
  return product
}

export async function updateProduct(id: string, input: any): Promise<Product | null> {
  const products = await readProducts()
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return null
  const otherSlugs = products.filter((_, i) => i !== idx).map((p) => p.slug)
  const product = normalizeProduct({ ...input, id }, otherSlugs)
  product.id = id // keep stable id
  products[idx] = product
  await writeProducts(products)
  return product
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await readProducts()
  const next = products.filter((p) => p.id !== id)
  if (next.length === products.length) return false
  await writeProducts(next)
  return true
}

/** Reorder the whole catalog by an ordered list of ids. */
export async function reorderProducts(orderedIds: string[]): Promise<void> {
  const products = await readProducts()
  const byId = new Map(products.map((p) => [p.id, p]))
  const next: Product[] = []
  for (const id of orderedIds) {
    const p = byId.get(id)
    if (p) {
      next.push(p)
      byId.delete(id)
    }
  }
  for (const p of byId.values()) next.push(p) // any not listed keep at end
  await writeProducts(next)
}
