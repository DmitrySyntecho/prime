"use client"

import { useEffect } from "react"
import { LandingHero } from "@/components/landing/landing-hero"
import { TrustedBySection } from "@/components/trusted-by-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { RatingsBar } from "@/components/ratings-bar"
import { WrittenReviewsSection } from "@/components/written-reviews-section"
import { TeamSection } from "@/components/team-section"
import { MediaMentionsSection } from "@/components/media-mentions-section"
import { BlogSection } from "@/components/blog-section"
import { SectionHeader } from "@/components/section-header"
import { HomeServicesSection } from "@/components/home/home-services-section"
import { HomePortfolioSection } from "@/components/home/home-portfolio-section"
import { HomeIndustriesSection } from "@/components/home/home-industries-section"
import { HomeWhySection } from "@/components/home/home-why-section"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { HOME_CLIPS } from "@/lib/hero-clips"

/**
 * Homepage — block order and copy follow the homepage copy deck (Blocks 02–13).
 */
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
      {/* Block 02 — hero, with the client logos (Block 09) pinned to the first screen */}
      <div className="flex min-h-[calc(100svh-92px)] flex-col">
        <div className="flex flex-1 flex-col justify-center">
      <LandingHero
        hero={{
          title: "AV Company & Audio Visual Service in the USA",
          accentPhrase: "Audio Visual Service",
          pillLabel: "Lights · Sound · LED · Staging",
          lede: (
            <>
              Prime Line AV is a full-service AV company offering audio, video, lighting, staging and LED walls for events across the USA.{" "}
              <span className="hl">One team. No surprises.</span>
            </>
          ),
          ctaLabel: "Get your custom quote",
          microcopy: "Quote in 30 minutes · No obligation",
          secondary: "portfolio",
          showIncludes: false,
          clips: HOME_CLIPS,
          stats: [
            { value: "15+", label: "years of AV experience" },
            { value: "2,500+", label: "events delivered" },
            { value: "30+", label: "events per month" },
            { value: "Nationwide", label: "coverage" },
          ],
        }}
        onQuote={handleStartQuote}
      />
        </div>
        <TrustedBySection compact />
      </div>

      {/* Block 03 — trust bar */}
      <RatingsBar only={["Google", "G2"]} />

      {/* Block 04 — services */}
      <HomeServicesSection />

      {/* Block 05 — portfolio */}
      <HomePortfolioSection />

      {/* Block 06 — industries + call strip */}
      <HomeIndustriesSection />

      {/* Block 07 — why choose us */}
      <HomeWhySection />

      {/* Equipment rental — the shop catalog, wired to the quote cart */}
      <HomeShopSection />

      {/* Block 08 — video testimonials */}
      <TestimonialsCarousel
        header={
          <SectionHeader eyebrow="Testimonials" title="Hear what our clients have to say" accent="our clients">
            Don&apos;t take our word for it. Just listen to what our happy clients say about their events, <span className="hl">because they say it better than we ever could.</span>
          </SectionHeader>
        }
      />

      {/* Block 10 — written reviews */}
      <WrittenReviewsSection header={<SectionHeader eyebrow="Client reviews" title="What clients say about working with us" accent="working with us" />} />

      {/* Block 11 — team */}
      <TeamSection
        header={
          <SectionHeader eyebrow="Our team" title="Meet the team behind our successful events" accent="successful events">
            Get to know the technical directors, engineers, technicians and account managers <span className="hl">who make every Prime Line AV event possible.</span>
          </SectionHeader>
        }
      />

      {/* Block 12 — press */}
      <MediaMentionsSection header={<SectionHeader eyebrow="Press" title="Prime Line AV in the press" accent="in the press" />} />

      {/* Block 13 — blog */}
      <BlogSection header={<SectionHeader eyebrow="Resources" title="From the blog" accent="the blog" align="left" className="!mb-0" />} />
    </div>
  )
}
