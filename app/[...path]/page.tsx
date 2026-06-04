import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSeoPage, getSiblingPages } from "@/lib/seo-pages"
import { SeoPageTemplate } from "@/components/seo-page-template"

// On-demand rendered (ISR) — 5k+ pages are not prebuilt at build time.
export const revalidate = 3600
export const dynamicParams = true

export async function generateMetadata(props: { params: Promise<{ path: string[] }> }): Promise<Metadata> {
  const { path } = await props.params
  const page = getSeoPage(path || [])
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
  }
}

export default async function CatchAllPage(props: { params: Promise<{ path: string[] }> }) {
  const { path } = await props.params
  const page = getSeoPage(path || [])
  if (!page) notFound()

  const siblings = getSiblingPages(page).map((s) => ({ path: s.path, pageName: s.pageName }))
  return <SeoPageTemplate page={page} siblings={siblings} />
}
