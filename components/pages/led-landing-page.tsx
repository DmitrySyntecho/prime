"use client"

import { useEffect } from "react"
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
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { FAQSection, type FAQItem } from "@/components/faq-section"
import { LpHeader } from "@/components/lp/lp-header"
import { LpFooter } from "@/components/lp/lp-footer"
import { LpMobileBar } from "@/components/lp/lp-mobile-bar"
import { LedProductsGrid, LED_WALLS } from "@/components/lp/led-products-grid"
import { clipsForService } from "@/lib/hero-clips"
import {
  LED_EVENTS,
  LED_EVENTS_LEDE,
  LED_FAQ,
  LED_H1,
  LED_HERO_BULLETS,
  LED_HERO_LEDE,
  LED_HERO_STATS,
  LED_OPTIONS,
  LED_OPTIONS_LEDE,
  LED_PHOTOS,
  LED_REASONS,
  LED_STUDIES,
  LED_WHY_LEDE,
  type LedOption,
} from "@/lib/copy/led-page"

/* One-page LED landing (/lp/led-video-walls): the LED page copy plus every LED
   wall in the catalog, with a light header/footer and no links off the page.
   Copy links become plain text; "#quote" anchors open the quote form. */

// Follows the page order: trust and work first, products after.
const NAV = [
  { label: "Why us", href: "#why-us" },
  { label: "Our work", href: "#case-studies" },
  { label: "Events", href: "#events" },
  { label: "Options", href: "#options" },
  { label: "LED walls", href: "#led-walls" },
  { label: "FAQ", href: "#faq" },
]

const unlink = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
const t = (s: string) => rt(unlink(s))

// Rental formats jump to the LED wall grid; buying and installing go to a quote.
const OPTION_TARGET: Record<LedOption["key"], { href: string; cta: string }> = {
  outdoor: { href: "#led-walls", cta: "See LED walls" },
  indoor: { href: "#led-walls", cta: "See LED walls" },
  large: { href: "#led-walls", cta: "See LED walls" },
  mobile: { href: "#quote", cta: "Get a quote" },
  buy: { href: "#quote", cta: "Ask about buying" },
  install: { href: "#quote", cta: "Ask about installation" },
}

const PITCHES = [...new Set(LED_WALLS.map((p) => p.filters?.pitch).filter(Boolean))].sort().join(", ").replace(/mm/g, "")

const FAQ_ITEMS: FAQItem[] = LED_FAQ.map((f) => ({
  question: f.q,
  answer: f.a.map((p, i) => <p key={i}>{t(p)}</p>),
  answerText: f.a.map(plain).join(" "),
}))

export function LedLandingPage() {
  const openQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm", { detail: { serviceSlug: "led-screen-rental" } }))

  // Any link to "#quote" on this page opens the quote form instead of jumping.
  // Capture phase, so next/link never gets the click (it would push "#quote").
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href="#quote"]')) {
        e.preventDefault()
        e.stopPropagation()
        openQuote()
      }
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  return (
    <div className="min-h-screen">
      <LpHeader nav={NAV} onQuote={openQuote} />

      {/* Hero + trust strip + client logos */}
      <div className="flex min-h-[calc(100svh-92px)] flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <LandingHero
            hero={{
              title: LED_H1,
              accentPhrase: "LED Video Wall Rental",
              pillLabel: "Indoor · Outdoor · Curved LED",
              lede: rt(LED_HERO_LEDE),
              bullets: LED_HERO_BULLETS,
              ctaLabel: "Get your custom quote",
              microcopy: "Quote in 30 minutes · No obligation",
              secondaryLink: { label: `Browse all ${LED_WALLS.length} LED walls`, href: "#led-walls" },
              showIncludes: false,
              stats: LED_HERO_STATS,
              clips: clipsForService("led-screen-rental"),
            }}
            onQuote={openQuote}
          />
        </div>
        <TrustedBySection compact />
      </div>

      <RatingsBar only={["Google", "G2"]} />

      {/* 1. About us — why trust us */}
      <ReasonsSplit
        id="why-us"
        eyebrow="Why Prime Line AV"
        heading={
          <>
            Why trust Prime Line AV for your <span className="ds-accent-text">LED screen rental</span>
          </>
        }
        lede={t(LED_WHY_LEDE)}
        reasons={LED_REASONS.map((r) => ({ ...r, body: t(r.body) }))}
      />

      {/* 2. Our work — case-study films */}
      <HomePortfolioSection
        id="case-studies"
        studies={LED_STUDIES}
        ctaLabel=""
        header={
          <SectionHeader eyebrow="Case studies" title="See Prime Line AV LED walls in action" accent="LED walls in action">
            Press play to see some of our latest LED video wall rental projects at real events.
          </SectionHeader>
        }
      />

      {/* 3. Events we build for + call strip */}
      <section id="events" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Events we power" title="We build LED walls for any kind of event" accent="any kind of event">
            {t(LED_EVENTS_LEDE)}
          </SectionHeader>
          <ImageBento items={LED_EVENTS} />
          <CallStrip className="mt-10" title="Ready to discuss your event?" subtitle="Talk to us today!" />
        </div>
      </section>

      {/* 4. Our work — load-in to showtime photos */}
      <section id="led-portfolio" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Our portfolio" title="Our LED walls, from load-in to showtime" accent="from load-in to showtime" />
          <PhotoCarousel photos={LED_PHOTOS} />
        </div>
      </section>

      {/* 5. Rental options — leads into the products */}
      <section id="options" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="LED wall rental options" title="Explore our LED video wall rental options" accent="LED video wall rental">
            {t(LED_OPTIONS_LEDE)}
          </SectionHeader>
          <LinkCardGrid items={LED_OPTIONS.map((o) => ({ ...o, ...OPTION_TARGET[o.key], body: t(o.body) }))} />
        </div>
      </section>

      {/* 6. Products — every LED wall in the catalog, below the trust & work blocks */}
      <section id="led-walls" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Every LED wall we rent" title="Choose your LED video wall" accent="LED video wall">
            {rt(
              `All ${LED_WALLS.length} LED walls in our rental inventory, rated for indoor and outdoor use (IP65), in ${PITCHES} mm pixel pitch. Filter by pitch and size, add the walls you like to your quote, and ==we’ll send you an itemized price.==`,
            )}
          </SectionHeader>
          <LedProductsGrid />
        </div>
      </section>

      <TestimonialsCarousel header={<SectionHeader eyebrow="Reviews" title="What clients say about Prime Line AV" accent="clients say" />} />

      <div id="faq" className="scroll-mt-24">
        <FAQSection
          items={FAQ_ITEMS}
          header={<SectionHeader eyebrow="FAQ" title="LED video wall rental FAQs" accent="FAQs" />}
          after={<CallStrip className="mt-10" title="Still have more questions?" subtitle="Ask us today!" />}
        />
      </div>

      <LpFooter tagline="LED video wall rental with delivery, rigging and an on-site technician, anywhere in the USA." />
      <LpMobileBar onQuote={openQuote} />
    </div>
  )
}
