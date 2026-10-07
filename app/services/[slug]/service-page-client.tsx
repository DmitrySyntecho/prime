"use client"

import { LandingHero } from "@/components/landing/landing-hero"
import { clipsForService } from "@/lib/hero-clips"
import { LandingWhyUs } from "@/components/landing/landing-why-us"
import { AV_PRODUCTION_COLLAGE } from "@/components/landing/landing-page"
import { TrustedBySection } from "@/components/trusted-by-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { AboutUsSection } from "@/components/about-us-section"
import { EventTypesSection } from "@/components/event-types-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { CharitySection } from "@/components/charity-section"
import { RentalCategoriesSection } from "@/components/rental-categories-section"
import { PromoBannersSection } from "@/components/promo-banners-section"
import { ServicesGridSection } from "@/components/services-grid-section"
import { FAQSection } from "@/components/faq-section"
import { FIFAPromoBanner } from "@/components/fifa-promo-banner"
import { ContactSpecialistBanner } from "@/components/contact-specialist-banner"
import { CategoryProductsShowcase } from "@/components/category-products-showcase"
import { GeneralEquipmentShowcase } from "@/components/general-equipment-showcase"
import { RatingsBar } from "@/components/ratings-bar"
import { TeamSection } from "@/components/team-section"
import { WrittenReviewsSection } from "@/components/written-reviews-section"
import { BlogSection } from "@/components/blog-section"
import { useCity } from "@/lib/city-context"
import { LedVideoWallPage } from "@/components/led-video-wall-page"
import { applyCity } from "@/lib/service-pages"
import { getCategoryForServiceSlug } from "@/lib/products-data"
import type { ServicePage } from "@/lib/service-pages"

interface ServicePageClientProps {
  service: ServicePage
  slug: string
}

export function ServicePageClient({ service, slug }: ServicePageClientProps) {
  const city = useCity()

  // The nav's "LED Video Walls" lands here: same copy-deck page as /av-rental/led-video-wall.
  if (slug.startsWith("led-screen-rental")) {
    const local = slug.endsWith("-miami") ? "Miami" : slug.endsWith("-orlando") ? "Orlando" : undefined
    return <LedVideoWallPage h1={`LED Video Wall Rental Company in ${local ?? "the USA"}`} location={local} />
  }
  const s = city !== "Los Angeles"
    ? {
        ...service,
        h1: applyCity(service.h1, city),
        subheadline: applyCity(service.subheadline, city),
        descriptionHeading: applyCity(service.descriptionHeading, city),
        description: applyCity(service.description, city),
        highlights: service.highlights.map((h) => applyCity(h, city)),
      }
    : service

  const handleStartQuote = () => {
    document.dispatchEvent(new CustomEvent("openQuoteForm", { detail: { serviceSlug: slug } }))
  }

  const productCategory = getCategoryForServiceSlug(slug)

  const heroCollage = [...(s.collage || []), ...AV_PRODUCTION_COLLAGE].slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Homepage-style hero: image collage + "Watch How We Work" video */}
      <div className="flex flex-col min-h-[calc(100svh-92px)]">
        <div className="flex-1 flex flex-col justify-center">
          <LandingHero
            hero={{ title: s.h1, accentPhrase: city, pillLabel: s.eyebrow, collage: heroCollage, clips: clipsForService(slug) }}
            onQuote={handleStartQuote}
          />
        </div>
        <TrustedBySection />
      </div>

      <RatingsBar />
      {/* Second block is now the showreel video (replaces the description collage) */}
      <LandingWhyUs />

      {productCategory ? (
        <CategoryProductsShowcase category={productCategory} />
      ) : (
        <GeneralEquipmentShowcase />
      )}

      <EventTypesSection />
      <WhyChooseUsSection />
      <CaseStudiesSection />

      <ServicesGridSection />
      <TeamSection />
      <WrittenReviewsSection />
      <TestimonialsCarousel />
      <BlogSection />
      <RentalCategoriesSection />
      <AboutUsSection />
      <PromoBannersSection />
      <CharitySection />
      <FIFAPromoBanner />
      <FAQSection />
      <ContactSpecialistBanner onStartQuote={handleStartQuote} />
    </div>
  )
}
