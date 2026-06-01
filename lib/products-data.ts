import type { Product, ProductCategory } from "./cart-context"
import productsJson from "@/data/products.json"
import { buildCategoryFilters } from "./product-filters"

// Product catalog. Source of truth is data/products.json — edit it through the
// admin panel at /admin (or re-bootstrap from source images via
// scripts/build-product-images.mjs + scripts/generate-products-data.mjs).
// NOTE: prices/discounts and LED spec sheets are representative placeholders.

export const products: Product[] = productsJson as Product[]

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

export type { FilterOption, FilterFacet } from "./product-filters"

// Contextual sub-filters shown when a category is selected — derived from the
// products that actually exist so it always reflects the live catalog.
export const CATEGORY_FILTERS = buildCategoryFilters(products)

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
  const pairings: Record<ProductCategory, ProductCategory[]> = {
    "led-screens": ["sound-systems", "stage", "lighting"],
    "dj-setups": ["sound-systems", "lighting", "led-screens"],
    "sound-systems": ["dj-setups", "stage", "lighting"],
    lighting: ["stage", "led-screens", "sound-systems"],
    stage: ["led-screens", "sound-systems", "lighting"],
  }
  const wanted = pairings[category] || []
  const picked: Product[] = []
  const buckets = wanted.map((c) =>
    products
      .filter((p) => p.category === c)
      .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.price - a.price)
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
