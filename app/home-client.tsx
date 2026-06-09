"use client"

import { useEffect } from "react"
import { LandingHero } from "@/components/landing/landing-hero"
import { AV_PRODUCTION_COLLAGE } from "@/components/landing/landing-page"
import { LandingWhyUs } from "@/components/landing/landing-why-us"
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
import { HomeProductsSection } from "@/components/home-products-section"
import { RatingsBar } from "@/components/ratings-bar"
import { WrittenReviewsSection } from "@/components/written-reviews-section"
import { TeamSection } from "@/components/team-section"
import { MediaMentionsSection } from "@/components/media-mentions-section"
import { BlogSection } from "@/components/blog-section"
import { useCity } from "@/lib/city-context"

export function HomeClient() {
  const city = useCity()

  const handleStartQuote = () => {
    document.dispatchEvent(new CustomEvent("openQuoteForm"))
  }

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const tryScroll = () => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
    tryScroll()
    const t = setTimeout(tryScroll, 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen">
      {/* New hero (with "Watch How We Work" video) fills the first screen,
          brand logos pinned to its bottom. */}
      <div className="flex flex-col min-h-[calc(100svh-92px)]">
        <div className="flex-1 flex flex-col justify-center">
          <LandingHero
            hero={{
              title: `Full-Service AV Production in ${city}`,
              accentPhrase: "AV Production",
              pillLabel: "Lights · Sound · LED · Staging",
              collage: AV_PRODUCTION_COLLAGE,
            }}
            onQuote={handleStartQuote}
          />
        </div>
        <TrustedBySection />
      </div>

      <RatingsBar />
      <LandingWhyUs />
      <ServicesGridSection />
      <HomeProductsSection />
      <CaseStudiesSection />
      <EventTypesSection />
      <WhyChooseUsSection />
      <TestimonialsCarousel />
      <WrittenReviewsSection />
      <RentalCategoriesSection />
      <TeamSection />
      <MediaMentionsSection />
      <BlogSection />
      <AboutUsSection />
      <PromoBannersSection />
      <CharitySection />
      <FIFAPromoBanner />
      <FAQSection />
      <ContactSpecialistBanner onStartQuote={handleStartQuote} />
    </div>
  )
}
