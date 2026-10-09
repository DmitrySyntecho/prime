"use client"

import { LandingHero } from "@/components/landing/landing-hero"
import { TrustedBySection } from "@/components/trusted-by-section"
import { RatingsBar } from "@/components/ratings-bar"
import { SectionHeader } from "@/components/section-header"
import { LinkCardGrid, type LinkCard } from "@/components/blocks/link-card-grid"
import { ImageBento, type BentoItem } from "@/components/blocks/image-bento"
import { CallStrip } from "@/components/blocks/call-strip"
import { ReasonsSplit, type Reason } from "@/components/blocks/reasons-split"
import { rt, plain } from "@/components/blocks/rich-text"
import { HomePortfolioSection, type Study } from "@/components/home/home-portfolio-section"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { TeamSection } from "@/components/team-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { BlogSection } from "@/components/blog-section"
import { FAQSection, type FAQItem } from "@/components/faq-section"
import { clipsForService } from "@/lib/hero-clips"
import type { Icon3DName } from "@/components/icon-3d"

/* Copy: "Sound System Rental page - Prime Line AV" (Hero + Blocks 03–13), pasted
   from ClickUp, verbatim. Deck links mapped to this site's routes:
   sound-system-rental/speakers → /av-rental/speaker-rental, …/microphones →
   /av-rental/microphone-rental, …/dj-equipment → /av-rental/dj-equipment-rental,
   lighting-rental → /av-rental/lighting, stage-rental → /av-rental/staging,
   /contact → /quote. "Mixers and PA Systems" has no deck link → audio-equipment-rental. */

const NATIONAL_H1 = "Sound System Rental Company in the United States"

const BULLETS: { icon: Icon3DName; text: string }[] = [
  { icon: "delivery-truck", text: "Turnkey sound system setup with delivery and on-site technicians" },
  { icon: "speaker", text: "Major audio brands including L-Acoustics, d&b, Shure and JBL" },
  { icon: "headset", text: "A1 and A2 engineers available to operate the sound system at your event" },
  { icon: "microphone", text: "Complete audio rentals including speakers, microphones, DJ equipment, mixers and more" },
]

const STATS = [
  { value: "15+", label: "years AV experience" },
  { value: "2,500+", label: "events delivered" },
  { value: "Nationwide", label: "coverage" },
  { value: "500+", label: "brands trust us" },
]

/* Block 04 — equipment */
const EQUIPMENT: LinkCard[] = [
  {
    title: "Speaker Rental",
    href: "/av-rental/speaker-rental",
    image: "/images/case-studies/tiktok-5.webp",
    icon: "speaker",
    body: rt("Portable powered speakers for small rooms and line arrays for full venues. ==We size the boxes to the space and tune them on site.=="),
  },
  {
    title: "Microphone Rental",
    href: "/av-rental/microphone-rental",
    image: "/images/services/sound05.webp",
    icon: "microphone",
    body: rt("Wireless and wired microphones, ==from handheld units for the stage to lapel mics for panel talks.=="),
  },
  {
    title: "DJ Equipment Rental",
    href: "/av-rental/dj-equipment-rental",
    image: "/images/products/dj-setups/dj-setup-04/main.webp",
    icon: "dj-deck",
    body: rt("DJ mixers and controllers, ==plus CDJs and booth monitors for performers.=="),
  },
  {
    title: "Mixers and PA Systems",
    href: "/av-rental/audio-equipment-rental",
    image: "/images/services/sound-audio.webp",
    icon: "sound-console",
    body: rt("Full PA packages with the mixing console and amplification included. ==We match the console to the number of inputs your program needs.=="),
  },
  {
    title: "Lighting Rental",
    href: "/av-rental/lighting",
    image: "/images/services/lighting-rental-card.webp",
    icon: "moving-head",
    body: rt("Stage and room lighting for the same event, ==handled by the same AV team as your sound.=="),
  },
  {
    title: "Stage Rental",
    href: "/av-rental/staging",
    image: "/images/services/stage-rental-card.webp",
    icon: "stage",
    body: rt("Stages and risers built to carry the show, ==from a single speaker platform to a full concert deck.=="),
  },
]

/* Block 05 — events */
const EVENTS: BentoItem[] = [
  {
    title: "Concerts and festivals",
    image: "/images/events/festivals.webp",
    body: rt("A concert needs sound that reaches the last row without crushing the first. We fly a line array sized to the venue and mix the show live from front of house."),
  },
  {
    title: "Conferences and town halls",
    image: "/images/case-studies/amagi-2.webp",
    body: rt("A conference lives on clear speech. We provide wireless microphones for every presenter and keep the mix even from the front tables to the back."),
  },
  {
    title: "Corporate events",
    image: "/images/services/sound-system.webp",
    body: rt("A corporate event needs microphones for the speeches and clean playback for the videos. We cover both, and our sound team works alongside the full [event production](/event-production) team when you need more than audio."),
  },
  {
    title: "Weddings",
    image: "/images/events/weddings.webp",
    body: rt("A wedding sound setup has to carry a quiet ceremony and a loud reception. We can set up separate zones so the vows and the dance floor each get the right system."),
  },
  {
    title: "Sports events",
    image: "/images/case-studies/ramp-4.webp",
    body: rt("A sports event needs announcements that cut through a loud venue. We size the system for crowd noise, indoors or out, so the play-by-play and the sponsor reads stay clear."),
  },
  {
    title: "Private events",
    image: "/images/events/private.webp",
    body: rt("A private party needs a sound system sized for the room and the guest count. We deliver the right setup and handle the music and the toasts."),
  },
]

/* Block 07 — why us */
const REASONS: Reason[] = [
  {
    title: "Latest pro audio brands in stock",
    icon: "speaker",
    body: rt("Our inventory carries the latest sound systems from ==L-Acoustics, d&b, Shure and JBL.== Whatever the event, we match the speakers and the consoles to the size of your venue."),
  },
  {
    title: "A1 and A2 engineers on site",
    icon: "headset",
    body: rt("Choose to rent equipment on its own, or ==have our A1 engineer operate the sound system for you.== On larger shows, an A2 works the stage and the microphones through the whole program."),
  },
  {
    title: "We deliver and set up nationwide",
    icon: "delivery-truck",
    body: rt("Our technicians bring the system to your venue anywhere in the United States and ==complete a full sound check before doors open.== Our [locations](/locations) cover coast to coast, in any city."),
  },
  {
    title: "Free, no-obligation quote",
    icon: "stopwatch",
    body: rt("You can contact us from Monday to Saturday for a consultation, and ==we will build you a custom quote in as fast as 30 minutes.== You can move your event planning fast instead of waiting for vendor response."),
  },
  {
    title: "We can handle more than audio",
    icon: "flight-case",
    body: rt("Aside from your sound system rental, we also offer lighting, staging, LED walls, and video production if you need full [event production](/event-production). ==We are your one partner for the whole setup.=="),
  },
]

/* Block 08 — finished shows where sound carried the event */
const SHOWS: Study[] = [
  { title: "TikTok Shop Summit 2026", location: "Los Angeles Convention Center", category: "Conference", mux: "KfJ00XD74CFG01AI5eclQ58q439V3U004sBcuSENC2A9IU", thumb: 120 },
  { title: "Last Chance for Animals Gala", location: "Los Angeles", category: "Gala", mux: "02w1uQtRVTaeIYfYMvYnHvIFZbFF19lAyoDYU00M00fGHk", thumb: 81 },
  { title: "IDB Group Corporate Summit", location: "Intercontinental Miami", category: "Corporate", mux: "a1VM513vYaAw3u8rBfLB8bG4MMma2FbIFN2YGepuxiA", thumb: 60 },
]

/* Block 09 — behind the scenes: speaker placement to the FOH mix */
const BTS: Study[] = [
  { title: "Ramp Tailgate BTS", location: "Los Angeles", category: "Brand activation", mux: "xIFaCY1GdKzQxjtm01L87JqoPAKob3YBscDUzSiSF1300", thumb: 5 },
  { title: "Asian Flame BTS", location: "Los Angeles", category: "Gala", mux: "Io8Bi00jo3qftxjB01L1qWs7TPQuOhKBxfi02ecvwEl2X00", thumb: 15 },
  { title: "Amagi FAST Conference", location: "Los Angeles", category: "Conference", mux: "BrD9vKSat02duCjNodPZ00a02ZRc5QfKAno007TIKGF5vOU", thumb: 63 },
]

/* Block 13 — FAQ */
const FAQ: { q: string; a: string }[] = [
  {
    q: "What is included in a sound system rental?",
    a: "A sound system rental includes speakers, a mixing console, microphones, and all cabling, plus delivery and setup at the venue. Prime Line AV can also put an engineer at the desk to operate the sound system through the event, so you don’t have to worry about anything.",
  },
  {
    q: "How much does sound system rental cost?",
    a: "Sound system rental cost typically ranges from $100 to $5,000 per day. A small PA for a meeting sits at the low end, and a full line array for a concert sits at the top. If you prefer custom pricing for your event, [contact us](/quote) at Prime Line AV, and we’ll give you a free quote.",
  },
  {
    q: "Is it cheaper to rent or buy a sound system?",
    a: "Renting a sound system is cheaper than buying one for a single event or a few events a year. Buying only pays off with constant use, and it adds the cost of storage and upkeep. Choosing professional sound system rental from providers like Prime Line AV can also include the sound engineer, which owning equipment never does.",
  },
  {
    q: "Do you deliver and set up the sound system?",
    a: "Yes, Prime Line AV delivers and sets up every sound system we rent. Our technicians wire the system at your venue and complete a full sound check before doors open, and an A1 engineer can stay at the desk to operate the sound system.",
  },
  {
    q: "Do you provide sound rental nationwide?",
    a: "Yes, Prime Line AV provides sound system rental for events across the United States. We have local teams who will deliver the audio equipment to your venue, so the same setup and the same standard reach any city you book. Check our [locations](/locations) page to see where we work.",
  },
  {
    q: "Can I rent just speakers or microphones?",
    a: "Yes, you can rent just the speakers or the microphones you need instead of a full system. We rent our sound equipment as individual items priced per day, so you can keep them for as long as your event needs. Feel free to check our [speaker rental](/av-rental/speaker-rental) and [microphone rental](/av-rental/microphone-rental) for the full lineup.",
  },
  {
    q: "What kind of engineer comes with the rental?",
    a: "An A1 engineer is available with any sound system rental from Prime Line AV. The A1 mixes the audio live at the desk, and on larger events, an A2 works the stage and the microphones. You can also rent the sound equipment alone or request engineers to operate it for you.",
  },
]

const FAQ_ITEMS: FAQItem[] = FAQ.map((f) => ({ question: f.q, answer: <p>{rt(f.a)}</p>, answerText: plain(f.a) }))

/** Sound System Rental — /av-rental/sound-system-rental (+ city variants) and /services/sound-system-rental*. */
export function SoundRentalPage({ h1, location }: { h1?: string; location?: string }) {
  const onQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm", { detail: { serviceSlug: "sound-system-rental" } }))

  return (
    <div className="min-h-screen">
      {/* Hero / Block 02 + trust strip + client logos */}
      <div className="flex min-h-[calc(100svh-92px)] flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <LandingHero
            hero={{
              title: h1 ?? NATIONAL_H1,
              accentPhrase: location ?? "Sound System Rental",
              pillLabel: location ? `${location} · Speakers · Mics · Mixers` : "Speakers · Mics · Mixers · DJ",
              lede: rt("Prime Line AV provides full-service sound system rental nationwide, from a portable PA to a full line array, ==with on-site sound engineers by request.=="),
              bullets: BULLETS,
              ctaLabel: "Get your custom quote",
              microcopy: "Quote in 30 minutes · No obligation",
              secondaryLink: { label: "Browse equipment rentals", href: "#shop" },
              showIncludes: false,
              stats: STATS,
              clips: clipsForService("sound-system-rental"),
            }}
            onQuote={onQuote}
          />
        </div>
        <TrustedBySection compact />
      </div>

      {/* Block 03 — Google + G2 */}
      <RatingsBar only={["Google", "G2"]} />

      {/* Block 04 — equipment */}
      <section id="sound-equipment" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Sound equipment" title="Everything you need for a professional sound system rental" accent="professional sound system rental">
            {rt(
              "Prime Line AV offers complete sound rental, including speakers, mixers, microphones, and more, ==with an engineer available to operate the sound system.== You can rent a sound system package or choose only the equipment you need from our [AV rental](/av-rental) catalog.",
            )}
          </SectionHeader>
          <LinkCardGrid items={EQUIPMENT} />
        </div>
      </section>

      {/* Relevant products: sound systems + DJ setups */}
      <HomeShopSection
        categories={["sound-systems", "dj-setups"]}
        header={
          <SectionHeader eyebrow="Rent the gear" title="Sound systems ready to rent" accent="Sound systems">
            Line arrays, PA packages and DJ setups from our own inventory, delivered, set up and tested by our crew. Add what you need to your quote, and our team will
            confirm availability and <span className="hl">send you an itemized price.</span>
          </SectionHeader>
        }
      />

      {/* Block 05 — events + call strip */}
      <section id="events" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Events we power" title="We provide sound rental for all kinds of events nationwide" accent="all kinds of events">
            {rt("Every event puts a different demand on your audio setup. At Prime Line AV, ==we size the system to the room and the program before anything goes on the truck.==")}
          </SectionHeader>
          <ImageBento items={EVENTS} />
          <CallStrip className="mt-10" title="Ready to talk about your event?" subtitle="Talk to us today!" />
        </div>
      </section>

      {/* Block 07 — why us */}
      <ReasonsSplit
        id="why-us"
        eyebrow="Need more than an equipment drop-off?"
        heading={
          <>
            Trust Prime Line AV as your <span className="ds-accent-text">sound system rental company</span>
          </>
        }
        lede={rt(
          "Sound is the one part of an event every guest notices when it fails. With Prime Line AV, you'll get professional sound system rental with the equipment and audio technicians in one call for ==a fail-safe audio system for your event.==",
        )}
        reasons={REASONS}
      />

      {/* Block 08 — case studies */}
      <HomePortfolioSection
        id="case-studies"
        studies={SHOWS}
        header={
          <SectionHeader eyebrow="Our case studies" title="See why 500+ brands trust Prime Line AV" accent="500+ brands">
            {rt("Prime Line AV has delivered 2,500+ events across the United States, with sound as a make-or-break part of every setup. ==Press play to see what our crew delivered on show day.==")}
          </SectionHeader>
        }
      />

      {/* Block 09 — behind the scenes (deck repeats the Block 08 H2) */}
      <HomePortfolioSection
        id="behind-the-scenes"
        studies={BTS}
        ctaLabel=""
        header={
          <SectionHeader eyebrow="Behind the scenes" title="See why 500+ brands trust Prime Line AV" accent="500+ brands">
            {rt("See how Prime Line AV deploys audio sound system rental and full AV at real events, ==from speaker placement to the front-of-house mix position.==")}
          </SectionHeader>
        }
      />

      {/* Block 10 — team */}
      <TeamSection header={<SectionHeader eyebrow="Our team" title="Meet our professional AV team" accent="professional AV team" />} />

      {/* Block 11 — testimonials */}
      <TestimonialsCarousel
        header={
          <SectionHeader eyebrow="Prime Line AV reviews" title="Watch what our clients have to say" accent="our clients">
            Don&apos;t take our word for it. <span className="hl">Hear it from the planners and producers who rented their sound from us.</span>
          </SectionHeader>
        }
      />

      {/* Block 12 — blog */}
      <BlogSection header={<SectionHeader eyebrow="Resources" title="From the blog" accent="the blog" align="left" className="!mb-0" />} />

      {/* Block 13 — FAQ + call strip */}
      <FAQSection
        items={FAQ_ITEMS}
        header={<SectionHeader eyebrow="FAQ" title="Sound system rental FAQs" accent="FAQs" />}
        after={<CallStrip className="mt-10" title="Still have more questions?" subtitle="Ask us today!" />}
      />
    </div>
  )
}
