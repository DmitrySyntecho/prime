"use client"

import Link from "next/link"
import { CityProvider } from "@/lib/city-context"
import { ServiceHero } from "@/components/service-hero"
import { RatingsBar } from "@/components/ratings-bar"
import { ServicesGridSection } from "@/components/services-grid-section"
import { EventTypesSection } from "@/components/event-types-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { TrustedBySection } from "@/components/trusted-by-section"
import { WrittenReviewsSection } from "@/components/written-reviews-section"
import { TeamSection } from "@/components/team-section"
import { MediaMentionsSection } from "@/components/media-mentions-section"
import { BlogSection } from "@/components/blog-section"
import { RentalCategoriesSection } from "@/components/rental-categories-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSpecialistBanner } from "@/components/contact-specialist-banner"
import type { SeoPage } from "@/lib/seo-pages"
import { ArrowRight } from "lucide-react"

interface SiblingLink {
  path: string
  pageName: string
}

const HERO_IMAGE = "/images/services/full-av-card.webp"

export function SeoPageTemplate({ page, siblings }: { page: SeoPage; siblings: SiblingLink[] }) {
  const startQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

  return (
    <CityProvider city={page.location}>
      <div className="min-h-screen">
        <ServiceHero
          eyebrow={page.national ? "United States" : page.location}
          h1={page.h1}
          subheadline={page.description}
          heroCta="Get a Quote"
          image={HERO_IMAGE}
          onStartQuote={startQuote}
        />

        <RatingsBar />
        <ServicesGridSection />
        <EventTypesSection />
        <WhyChooseUsSection />
        <CaseStudiesSection />
        <TestimonialsCarousel />
        <TrustedBySection />
        <WrittenReviewsSection />
        <TeamSection />
        <MediaMentionsSection />
        <BlogSection />
        <RentalCategoriesSection />

        {/* Interlinking — other pages in this location */}
        {siblings.length > 0 && (
          <section className="py-14 relative">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-black text-white mb-6">
                More in {page.national ? "the US" : page.location}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {siblings.map((s) => (
                  <Link
                    key={s.path}
                    href={s.path}
                    className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-[13px] text-white/75 hover:text-white transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="truncate">{s.pageName.replace(/-/g, " ")}</span>
                    <ArrowRight className="w-4 h-4 text-[#FF5E3A] flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FAQSection />
        <ContactSpecialistBanner onStartQuote={startQuote} />
      </div>
    </CityProvider>
  )
}
