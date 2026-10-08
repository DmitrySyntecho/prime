import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSeoPage, getSiblingPages } from "@/lib/seo-pages"
import { SeoPageTemplate } from "@/components/seo-page-template"
import { LedVideoWallPage } from "@/components/led-video-wall-page"
import { AvRentalPage } from "@/components/pages/av-rental-page"
import { AvInstallationPage } from "@/components/pages/av-installation-page"
import { AvProductionPage } from "@/components/pages/av-production-page"
import { CityProvider } from "@/lib/city-context"

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

  // LED video wall rental has its own copy-deck page (national + every city variant).
  if (page.path.endsWith("/av-rental/led-video-wall")) {
    return (
      <CityProvider city={page.location}>
        <LedVideoWallPage h1={page.h1} location={page.national ? undefined : page.location} />
      </CityProvider>
    )
  }

  // Copy-deck hub pages (national + every city variant).
  const Hub = /\/av-rental$/.test(page.path)
    ? AvRentalPage
    : /\/av-installations$/.test(page.path)
      ? AvInstallationPage
      : /\/av-production$/.test(page.path)
        ? AvProductionPage
        : null
  if (Hub) {
    return (
      <CityProvider city={page.location}>
        <Hub h1={page.national ? undefined : page.h1} location={page.national ? undefined : page.location} />
      </CityProvider>
    )
  }

  const siblings = getSiblingPages(page).map((s) => ({ path: s.path, pageName: s.pageName }))
  return <SeoPageTemplate page={page} siblings={siblings} />
}
