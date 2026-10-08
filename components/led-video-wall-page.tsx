"use client"

import { rt, plain } from "@/components/blocks/rich-text"
import { LandingHero } from "@/components/landing/landing-hero"
import { TrustedBySection } from "@/components/trusted-by-section"
import { RatingsBar } from "@/components/ratings-bar"
import { SectionHeader } from "@/components/section-header"
import { LinkCardGrid } from "@/components/blocks/link-card-grid"
import { ImageBento } from "@/components/blocks/image-bento"
import { CallStrip } from "@/components/blocks/call-strip"
import { ReasonsSplit } from "@/components/blocks/reasons-split"
import { PhotoCarousel } from "@/components/blocks/photo-carousel"
import { HomePortfolioSection } from "@/components/home/home-portfolio-section"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { TeamSection } from "@/components/team-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { BlogSection } from "@/components/blog-section"
import { FAQSection, type FAQItem } from "@/components/faq-section"
import { clipsForService } from "@/lib/hero-clips"
import {
  LED_EVENTS,
  LED_EVENTS_LEDE,
  LED_FAQ,
  LED_HERO_BULLETS,
  LED_HERO_LEDE,
  LED_HERO_STATS,
  LED_OPTIONS,
  LED_OPTIONS_LEDE,
  LED_PHOTOS,
  LED_REASONS,
  LED_STUDIES,
  LED_WHY_LEDE,
} from "@/lib/copy/led-page"

const FAQ_ITEMS: FAQItem[] = LED_FAQ.map((f) => ({
  question: f.q,
  answer: f.a.map((p, i) => <p key={i}>{rt(p)}</p>),
  answerText: f.a.map(plain).join(" "),
}))

/**
 * LED video wall rental page (copy deck "LED page", lib/copy/led-page.ts).
 * Rendered for every /…/av-rental/led-video-wall SEO path and for
 * /services/led-screen-rental*. `location` is the city for local variants.
 */
export function LedVideoWallPage({ h1, location }: { h1: string; location?: string }) {
  const onQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm", { detail: { serviceSlug: "led-screen-rental" } }))

  return (
    <div className="min-h-screen">
      {/* Block 01 — hero + trust strip, client logos pinned to the first screen */}
      <div className="flex min-h-[calc(100svh-92px)] flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <LandingHero
            hero={{
              title: h1,
              accentPhrase: location ?? "LED Video Wall Rental",
              pillLabel: location ? `${location} · Indoor · Outdoor · Curved` : "Indoor · Outdoor · Curved LED",
              lede: rt(LED_HERO_LEDE),
              bullets: LED_HERO_BULLETS,
              ctaLabel: "Get your custom quote",
              microcopy: "Quote in 30 minutes · No obligation",
              secondaryLink: { label: "Browse LED walls", href: "/shop?category=led-screens" },
              showIncludes: false,
              stats: LED_HERO_STATS,
              clips: clipsForService("led-screen-rental"),
            }}
            onQuote={onQuote}
          />
        </div>
        <TrustedBySection compact />
      </div>

      {/* Block 03 — Google + G2 */}
      <RatingsBar only={["Google", "G2"]} />

      {/* Block 04 — rental options */}
      <section id="led-options" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="LED wall rental options" title="Explore our LED video wall rental options" accent="LED video wall rental">
            {rt(LED_OPTIONS_LEDE)}
          </SectionHeader>
          <LinkCardGrid items={LED_OPTIONS.map((o) => ({ ...o, body: rt(o.body) }))} />
        </div>
      </section>

      {/* LED walls you can rent now (products are required on every service page) */}
      <HomeShopSection category="led-screens" />

      {/* Block 05 — events + call strip */}
      <section id="led-events" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Events we power" title="We build LED walls for any kind of event" accent="any kind of event">
            {rt(LED_EVENTS_LEDE)}
          </SectionHeader>
          <ImageBento items={LED_EVENTS} />
          <CallStrip className="mt-10" title="Ready to discuss your event?" subtitle="Talk to us today!" />
        </div>
      </section>

      {/* Block 06 — why trust us */}
      <ReasonsSplit
        id="why-us"
        eyebrow="Why Prime Line AV"
        heading={
          <>
            Why trust Prime Line AV for your <span className="ds-accent-text">LED screen rental</span>
          </>
        }
        lede={rt(LED_WHY_LEDE)}
        reasons={LED_REASONS.map((r) => ({ ...r, body: rt(r.body) }))}
      />

      {/* Block 07 — LED case-study films */}
      <HomePortfolioSection
        id="case-studies"
        studies={LED_STUDIES}
        header={
          <SectionHeader eyebrow="Case studies" title="See Prime Line AV LED walls in action" accent="LED walls in action">
            {rt("Press play to see some of our latest LED video wall rental projects at real events. You can find more of them in our [event portfolio](/portfolio).")}
          </SectionHeader>
        }
      />

      {/* Block 08 — load-in to showtime photos */}
      <section id="led-portfolio" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Our portfolio" title="Our LED walls, from load-in to showtime" accent="from load-in to showtime" />
          <PhotoCarousel photos={LED_PHOTOS} />
        </div>
      </section>

      {/* Block 09 — team */}
      <TeamSection header={<SectionHeader eyebrow="Our team" title="Meet our professional AV team" accent="professional AV team" />} />

      {/* Block 10 — video testimonials */}
      <TestimonialsCarousel header={<SectionHeader eyebrow="Reviews" title="What clients say about Prime Line AV" accent="clients say" />} />

      {/* Block 11 — blog */}
      <BlogSection header={<SectionHeader eyebrow="Resources" title="From the blog" accent="the blog" align="left" className="!mb-0" />} />

      {/* Block 12 — FAQ + call strip */}
      <FAQSection
        items={FAQ_ITEMS}
        header={<SectionHeader eyebrow="FAQ" title="LED video wall rental FAQs" accent="FAQs" />}
        after={<CallStrip className="mt-10" title="Still have more questions?" subtitle="Ask us today!" />}
      />
    </div>
  )
}
