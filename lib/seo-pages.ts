import pagesJson from "@/data/seo-pages.json"
import locationsJson from "@/data/locations.json"

export interface SeoPage {
  path: string
  pageName: string
  title: string
  description: string
  h1: string
  location: string
  locationSlug: string
  national: boolean
  type: "locale-landing" | "service" | "installations" | "rental" | "store"
}

export interface SeoLocation {
  name: string
  slug: string
  national: boolean
  landing: string
}

export const seoPages = pagesJson as SeoPage[]
export const seoLocations = locationsJson as SeoLocation[]

const byPath = new Map(seoPages.map((p) => [p.path, p]))

export function getSeoPage(segments: string[]): SeoPage | undefined {
  const path = "/" + segments.map((s) => s.replace(/\/$/, "")).join("/")
  return byPath.get(path)
}

export function pathExists(path: string): boolean {
  return byPath.has(path)
}

/** City locations only (exclude the national/USA sheet), sorted by name. */
export function getCityLocations(): SeoLocation[] {
  return seoLocations.filter((l) => !l.national).sort((a, b) => a.name.localeCompare(b.name))
}

/** Pages belonging to a location (by slug; "" = national). */
export function getLocationPages(locationSlug: string): SeoPage[] {
  return seoPages.filter((p) => p.locationSlug === locationSlug)
}

/** A few sibling pages within the same location, for interlinking. */
export function getSiblingPages(page: SeoPage, limit = 8): SeoPage[] {
  return seoPages
    .filter((p) => p.locationSlug === page.locationSlug && p.path !== page.path && p.type !== "locale-landing")
    .slice(0, limit)
}
