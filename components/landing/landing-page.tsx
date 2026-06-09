"use client"

import { LandingHero, type HeroConfig } from "./landing-hero"
import { LandingWhyUs } from "./landing-why-us"
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

/** Default hero collage for the homepage / AV-production landing (full-AV photos). */
export const AV_PRODUCTION_COLLAGE = [
  "/images/services/av-01.webp",
  "/images/services/av-02.webp",
  "/images/services/av-03.webp",
  "/images/services/av-06.webp",
  "/images/services/av-05.webp",
  "/images/services/av-07.webp",
]

/**
 * Shared landing layout used by the homepage, the /lp A/B routes, and every
 * service page. Only the hero (collage + headline) changes per page; the block
 * order is identical everywhere:
 *   hero (collage) → [logos pinned to bottom of first screen] → video Why-Us →
 *   testimonials → why-choose → recent work → services → rentals → FIFA →
 *   about → promos → events → charity → FAQ → contact.
 */
export function LandingPage({ hero }: { hero: HeroConfig }) {
  const handleStartQuote = () => {
    document.dispatchEvent(new CustomEvent("openQuoteForm"))
  }

  return (
    <div className="min-h-screen">
      {/* First screen: hero fills the viewport, logo carousel pinned to the bottom */}
      <div className="flex flex-col min-h-[calc(100svh-92px)]">
        <div className="flex-1 flex flex-col justify-center">
          <LandingHero hero={hero} onQuote={handleStartQuote} />
        </div>
        {/* Company logos pinned to the bottom of the first screen (original carousel design) */}
        <TrustedBySection />
      </div>
      <LandingWhyUs />
      <TestimonialsCarousel />
      <WhyChooseUsSection />
      <CaseStudiesSection />
      <ServicesGridSection />
      <RentalCategoriesSection />
      <FIFAPromoBanner />
      <AboutUsSection />
      <PromoBannersSection />
      <EventTypesSection />
      <CharitySection />
      <FAQSection />
      <ContactSpecialistBanner onStartQuote={handleStartQuote} />
    </div>
  )
}
