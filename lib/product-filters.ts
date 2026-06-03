import type { Product, ProductCategory } from "./cart-context"

export interface FilterOption {
  value: string
  label: string
}
export interface FilterFacet {
  key: string
  label: string
  options: FilterOption[]
}

/**
 * The universe of contextual sub-filters. Admin uses this to render the right
 * field per category; the shop derives CATEGORY_FILTERS from the products that
 * actually exist (so a facet only shows when ≥2 distinct values are present).
 */
export const FILTER_META: Record<
  string,
  { label: string; labels: Record<string, string>; order: string[] }
> = {
  environment: { label: "Environment", labels: { indoor: "Indoor", outdoor: "Outdoor / IP65" }, order: ["indoor", "outdoor"] },
  ip: { label: "Weatherproofing", labels: { indoor: "Indoor Use", ip65: "IP65 Outdoor-Rated" }, order: ["indoor", "ip65"] },
  pitch: { label: "Pixel Pitch", labels: {}, order: ["P1.9mm", "P2.6mm", "P3.9mm", "P4.8mm"] },
  size: {
    label: "Screen Size",
    labels: {
      compact: "Compact (<60 sq ft)",
      "mid-format": "Mid (60–200)",
      "large-format": "Large (200–500)",
      "xl-format": "XL / Giant (500+)",
      standard: "Standard",
      pro: "Pro",
    },
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
  stageType: {
    label: "Stage Type",
    labels: { outdoor: "Outdoor", portable: "Portable", round: "Round", "platform-kit": "Platform Kit" },
    order: ["outdoor", "portable", "round", "platform-kit"],
  },
  backdrop: { label: "Backdrop", labels: { yes: "With Backdrop", no: "No Backdrop" }, order: ["yes", "no"] },
}

/** Which filter facets apply to each category (in display order). */
export const CATEGORY_FACET_KEYS: Partial<Record<ProductCategory, string[]>> = {
  "led-screens": ["environment", "pitch", "size", "ip"],
  "sound-systems": ["capacity", "series"],
  "dj-setups": ["console", "size"],
  stage: ["stageType", "scale", "backdrop", "type"],
}

const labelFor = (key: string, value: string) => FILTER_META[key]?.labels[value] || value

/** Full set of options for a facet (used by the admin editor dropdowns). */
export function facetOptions(key: string): FilterOption[] {
  const meta = FILTER_META[key]
  if (!meta) return []
  return meta.order.map((value) => ({ value, label: labelFor(key, value) }))
}

/** Build the shop's CATEGORY_FILTERS from the products that actually exist. */
export function buildCategoryFilters(
  products: Product[]
): Partial<Record<ProductCategory, FilterFacet[]>> {
  const out: Partial<Record<ProductCategory, FilterFacet[]>> = {}
  for (const [cat, keys] of Object.entries(CATEGORY_FACET_KEYS) as [ProductCategory, string[]][]) {
    const inCat = products.filter((p) => p.category === cat)
    const facets: FilterFacet[] = []
    for (const key of keys) {
      const present = new Set(inCat.map((p) => p.filters?.[key]).filter(Boolean) as string[])
      if (present.size <= 1) continue // skip non-discriminating facets
      const meta = FILTER_META[key]
      const ordered = [...present].sort((a, b) => {
        const ia = meta.order.indexOf(a)
        const ib = meta.order.indexOf(b)
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
      })
      facets.push({ key, label: meta.label, options: ordered.map((v) => ({ value: v, label: labelFor(key, v) })) })
    }
    if (facets.length) out[cat] = facets
  }
  return out
}
