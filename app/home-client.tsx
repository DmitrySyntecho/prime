"use client"

import { useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
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

export function HomeClient() {
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
      {/* Block order per Blocks-On-Pages spec (Home/Locale, 15 blocks). Extra
          existing sections kept and slotted in sensibly. */}
      <HeroSection onStartQuote={handleStartQuote} />
      <RatingsBar />
      <TrustedBySection />
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
