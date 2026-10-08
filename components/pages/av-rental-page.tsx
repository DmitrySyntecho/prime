"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LandingHero } from "@/components/landing/landing-hero"
import { TrustedBySection } from "@/components/trusted-by-section"
import { SectionHeader } from "@/components/section-header"
import { LinkCardGrid, type LinkCard } from "@/components/blocks/link-card-grid"
import { ImageBento, type BentoItem } from "@/components/blocks/image-bento"
import { CallStrip } from "@/components/blocks/call-strip"
import { ReasonsSplit, type Reason } from "@/components/blocks/reasons-split"
import { PullQuote } from "@/components/blocks/pull-quote"
import { rt, plain } from "@/components/blocks/rich-text"
import { HomePortfolioSection } from "@/components/home/home-portfolio-section"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { TeamSection } from "@/components/team-section"
import { WrittenReviewsSection } from "@/components/written-reviews-section"
import { BlogSection } from "@/components/blog-section"
import { FAQSection, type FAQItem } from "@/components/faq-section"
import { HOME_CLIPS } from "@/lib/hero-clips"
import { PHONE_DISPLAY } from "@/lib/contact"
import type { Icon3DName } from "@/components/icon-3d"

/* Copy: ClickUp "AV Rental page - Prime Line AV" (Hero + Blocks 03–11), verbatim.
   Deck links mapped to this site's routes: lighting-rental → /av-rental/lighting,
   led-screen-rental → /av-rental/led-video-wall, stage-rental → /av-rental/staging,
   projector-and-screen-rental → /av-rental/projector-rental, /contacts → /quote,
   /our-team → /about, /cases → /portfolio. */

const NATIONAL_H1 = "AV Rental Service & Equipment in the USA"

const BULLETS: { icon: Icon3DName; text: string }[] = [
  { icon: "flight-case", text: "Rent sound, LED walls, lighting, staging & projection from one team" },
  { icon: "delivery-truck", text: "Delivery, setup, testing, and strike included with every rental" },
  { icon: "calendar", text: "One-day or multi-day rentals, operated by a dedicated technical crew" },
  { icon: "render-3d", text: "Free 3D render: see your AV setup before you commit" },
]

const STATS = [
  { value: "15", label: "years in AV" },
  { value: "2,500+", label: "events delivered" },
  { value: "30+", label: "events per month" },
  { value: "Nationwide", label: "coverage" },
]

/* Block 04 — rental lines */
const RENTALS: LinkCard[] = [
  {
    title: "Sound system rental",
    href: "/av-rental/sound-system-rental",
    image: "/images/services/sound-system-card.webp",
    icon: "speaker",
    body: rt("L-Acoustics and d&b systems tuned to your room by A1 and A2 engineers, so every word reaches the back row. ==This means the speech your CEO rehearsed for weeks actually lands.=="),
  },
  {
    title: "Lighting rental",
    href: "/av-rental/lighting",
    image: "/images/services/lighting-rental-card.webp",
    icon: "moving-head",
    body: rt("Moving heads, washes, uplighting, and DJ looks programmed on GrandMA3 by a senior lighting designer, so the room looks designed and ==the photos look like the event cost twice as much as it did.=="),
  },
  {
    title: "LED screen rental",
    href: "/av-rental/led-video-wall",
    image: "/images/services/led-screen-card.webp",
    icon: "led-wall",
    body: rt("Indoor and outdoor LED walls, flat or curved, in your exact size and pixel pitch, with a technician beside the wall at all times. If a panel blinks, it's fixed before anyone notices. ==You never have to explain a black screen to anyone.=="),
  },
  {
    title: "Stage rental",
    href: "/av-rental/staging",
    image: "/images/services/stage-rental-card.webp",
    icon: "stage",
    body: rt("Portable and mobile decks, or fully custom builds, engineered for your venue and your crowd. ==Every deck is weight-rated and inspected before anyone steps on it==, and our crew handles the strike."),
  },
  {
    title: "Projector & screen rental",
    href: "/av-rental/projector-rental",
    image: "/images/services/projector-screen-card.webp",
    icon: "projector",
    body: rt("4K laser projectors with screens from 6 to 40+ feet, focused and signal-checked before doors. ==The first slide is already on screen when your presenter walks up.=="),
  },
  {
    title: "TV & monitor rental",
    href: "/av-rental/tv-monitor-rental",
    image: "/images/services/tv-rental-card.webp",
    icon: "tv-display",
    body: rt("Screens from 32 to 98 inches on stands or booth structures, positioned at eye level for your demo loop. ==An on-site video tech keeps the content running from open to close.=="),
  },
  {
    title: "Truss rental",
    href: "/av-rental/truss-rental",
    image: "/images/services/staging-rigging.webp",
    icon: "rigging",
    body: rt("Aluminum truss in the spans your rig requires, delivered with hardware and motors and installed by riggers. ==Load ratings come in writing before anything goes up.=="),
  },
  {
    title: "Pipe & drape rental",
    href: "/av-rental/pipe-and-drape",
    image: "/images/services/pipe-drape-card.webp",
    icon: "pipe-drape",
    body: rt("IFR-certified drape in custom heights and colors for backdrops, booth walls, room dividers, and entryways. ==Our crew installs it before your setup starts and removes it after strike.=="),
  },
]

/* Block 05 — event types */
const EVENTS: BentoItem[] = [
  {
    title: "Corporate Events",
    image: "/images/case-studies/miami-1.webp",
    body: rt("From the boardroom to the ballroom, corporate events run on tight agendas in front of the people who matter most. We test every mic, every slide, and the [projector rental](/av-rental/projector-rental) they run on before the room fills."),
  },
  {
    title: "Conferences",
    image: "/images/case-studies/amagi-2.webp",
    body: rt("A conference runs days of programming across main stages and breakout rooms, all on one schedule. Our techs swap mics and cue slides on a conference-grade [sound system rental](/av-rental/sound-system-rental) so every session starts on time."),
  },
  {
    title: "Trade Shows",
    image: "/images/case-studies/tiktok-3.webp",
    body: rt("On a show floor, your booth competes with hundreds of others for attention. We build and test your [TV rental](/av-rental/tv-monitor-rental) inside the hall's load-in window, sized to pull attention from the aisle."),
  },
  {
    title: "Concerts & Festivals",
    image: "/images/case-studies/lca-1.webp",
    body: rt("Outdoor shows bring big crowds, open skies, and unpredictable weather. We build your [stage rental](/av-rental/staging) for exactly that, with gear and power rated for the elements."),
  },
  {
    title: "Weddings",
    image: "/images/events/weddings.webp",
    body: rt("A wedding moves from ceremony to dinner to dancing, and the room has to change with it. The [lighting rental](/av-rental/lighting) that carries that mood shift is set and tested before the first guest arrives."),
  },
  {
    title: "Experiential & Brand Activations",
    image: "/images/services/led-01.webp",
    body: rt("The client changed the creative again, days before load-in? We re-spec fast, so what gets built matches the final version. Our [LED screen rental](/av-rental/led-video-wall) lets you swap content right up to doors."),
  },
  {
    title: "Fashion Shows",
    image: "/images/services/proj-03.webp",
    body: rt("A runway show compresses weeks of preparation into minutes of precision. We rig the lights on a [truss rental](/av-rental/truss-rental) and rehearse every cue before the first look walks."),
  },
  {
    title: "Virtual & Hybrid Events",
    image: "/images/services/permanent-av-3.webp",
    body: rt("Hybrid events play to two audiences at once: the room in front of you and the stream beyond it. We handle the feed end to end while a [projector and screen rental](/av-rental/projector-rental) keeps the room covered."),
  },
  {
    title: "Private Events",
    image: "/images/case-studies/lca-3.webp",
    body: rt("Birthdays, anniversaries, galas and holiday parties rarely happen in venues wired for a show. We check the power and the layout before load-in, then shape the space with a [pipe and drape rental](/av-rental/pipe-and-drape)."),
  },
  {
    title: "Grand Openings",
    image: "/images/case-studies/ramp-1.webp",
    body: rt("A grand opening is one part celebration, one part press event. A [sound system rental](/av-rental/sound-system-rental) carries the speeches and the music on cue, from the moment doors open to the ribbon cutting."),
  },
]

/* Block 06 — why rent from us */
const REASONS: Reason[] = [
  {
    title: "Nationwide delivery, setup and support",
    icon: "location-pin",
    body: rt("We offer AV rentals coast to coast, with delivery, installation, testing, and technicians wherever your event is. One team covers every city on your calendar, which means ==you never start a vendor search from zero again.== See our [locations](/locations)."),
  },
  {
    title: "One dedicated account manager",
    icon: "headset",
    body: rt("A single account manager and Technical Director stay on your event from the first call to strike, so ==you explain your show once.== No ticket queues and no re-briefing a stranger the week of the event."),
  },
  {
    title: "Free 3D render before you commit",
    icon: "render-3d",
    body: rt("You see screen positions and sightlines in your actual venue before you sign, so ==load-in day holds zero surprises.== And you’ll get it for free!"),
  },
  {
    title: "Tested 2 hours before doors",
    icon: "stopwatch",
    body: rt("Every system is installed, tested, and running two hours before doors open, so ==problems are found while the room is still empty==, not in front of your guests."),
  },
  {
    title: "Quote in about 30 minutes",
    icon: "clipboard",
    body: rt("An account manager calls within 5 minutes, and ==a written quote follows in half an hour.== Your planning never stalls waiting on a vendor."),
  },
  {
    title: "Insurance and COIs provided",
    icon: "shield",
    body: rt("We carry insurance and send certificates of insurance straight to your venue, so ==the paperwork is handled before anyone asks twice.=="),
  },
]

/* Block 11 — FAQ */
const FAQ: { q: string; a: string }[] = [
  {
    q: "What audiovisual equipment can I rent?",
    a: "You can rent sound systems, LED video walls, event lighting, stages, projectors and screens, TVs and monitors, truss, and pipe and drape from Prime Line AV. Every rental includes delivery, setup, testing, and on-site support, depending on your package. Our crew handles everything from install to strike.",
  },
  {
    q: "Is it cheaper to rent or buy a sound system or AV equipment?",
    a: "Renting AV equipment costs less than buying it for almost every event. Buying means paying full price for gear you use a few days a year, then paying for storage, transport, repairs and a qualified operator. Renting gets you the latest equipment sized to your event, with engineers included.",
  },
  {
    q: "Do you deliver and set up rentals?",
    a: "Yes, Prime Line AV delivers, installs, tests, and strikes every rental with our crew. Your system is set up and running two hours before doors open, so problems get fixed while the room is still empty. You never touch a road case at any point.",
  },
  {
    q: "Do you work nationwide?",
    a: "Yes, Prime Line AV works nationwide, with delivery, setup, testing, and on-site support coast to coast across the USA. One team and one contract cover every city on your calendar, whether you're planning one show or a season of them. See our [locations](/locations) for our current coverage.",
  },
  {
    q: "Do you provide an on-site technician?",
    a: "Yes, Prime Line AV provides on-site technicians who run the equipment through your entire event. That includes A1 and A2 audio engineers on sound, plus lighting operators and LED wall techs where the setup calls for them. The person who fixes a problem is already in the room.",
  },
  {
    q: "How fast can I get a quote?",
    a: `Prime Line AV sends a written quote in about 30 minutes during business hours, and a real person calls within 5 minutes of your request. Call ${PHONE_DISPLAY} from Mon to Fri, 8 am to 7 pm, or Sat, 10 am to 4 pm. You can also fill out and submit our quote form, which only takes about 60 seconds.`,
  },
  {
    q: "Do you carry insurance and COIs?",
    a: "Yes, Prime Line AV is insured and provides certificates of insurance (COIs) on request. Tell your account manager what your venue requires and the COI goes out directly, before anyone has to chase it. Venues with strict requirements are a normal part of our week.",
  },
  {
    q: "What is the minimum rental period or lead time?",
    a: "Prime Line AV rents AV equipment for as little as one day, with multi-day and long-term custom rentals available for anything bigger. Book as early as you can to lock your date, though we take last-minute rentals when equipment and crew are available.",
  },
]

const FAQ_ITEMS: FAQItem[] = FAQ.map((f) => ({ question: f.q, answer: <p>{rt(f.a)}</p>, answerText: plain(f.a) }))

/** AV Rental page — /av-rental (+ city variants). `location` set on city pages. */
export function AvRentalPage({ h1, location }: { h1?: string; location?: string }) {
  const onQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

  return (
    <div className="min-h-screen">
      {/* Hero / Block 02 + trust bar + client logos (Block 03) */}
      <div className="flex min-h-[calc(100svh-92px)] flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <LandingHero
            hero={{
              title: h1 ?? NATIONAL_H1,
              accentPhrase: location ?? "AV Rental Service",
              pillLabel: location ? `${location} · Sound · LED · Lighting · Staging` : "Sound · LED · Lighting · Staging",
              lede: rt("Prime Line AV offers full-service AV rentals for events anywhere in the USA, ==with a licensed and insured on-site crew.=="),
              bullets: BULLETS,
              ctaLabel: "Get your custom quote",
              microcopy: "Quote in 30 minutes · No obligation",
              secondaryLink: { label: "Browse equipment", href: "#rental-options" },
              showIncludes: false,
              stats: STATS,
              clips: HOME_CLIPS,
            }}
            onQuote={onQuote}
          />
        </div>
        <TrustedBySection compact />
      </div>

      {/* Block 04 — rental lines */}
      <section id="rental-options" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="AV equipment rental" title="Our AV equipment rental, available anywhere in the USA" accent="AV equipment rental">
            {rt(
              "Prime Line AV rents sound systems, microphones, video displays, projectors, lighting, staging and rigging. You get show-ready gear sized to your exact event, with a crew to run it... ==without buying equipment that sits in storage 360 days a year.==",
            )}
          </SectionHeader>
          <LinkCardGrid items={RENTALS} ctaLabel="Browse equipment" cols={4} />
        </div>
      </section>

      {/* Equipment you can add to a quote right now (all categories) */}
      <HomeShopSection />

      {/* Block 05 — events */}
      <section id="events" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Events we equip" title="AV rentals designed for any event" accent="any event">
            <p className="italic text-white">Picture the moment every planner dreads: doors open in ten minutes, and something isn&apos;t working...</p>
            <p className="mt-3">
              {rt(
                "**After 2,500+ events, we know exactly what could cause them, and how to keep them off your show.** That's why we build the package around your event: ==the room, the crowd size, the program, the schedule.==",
              )}
            </p>
          </SectionHeader>
          <ImageBento items={EVENTS} />
          <div className="mt-10 flex justify-center">
            <Link href="/quote" className="cta-yellow shimmer-stroke inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-[16px] font-extrabold">
              Click here to discuss your event <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Block 06 — why rent from us */}
      <ReasonsSplit
        id="why-us"
        eyebrow="Why Prime Line AV"
        heading={
          <>
            Why rent <span className="ds-accent-text">AV equipment</span> from Prime Line AV?
          </>
        }
        lede={
          <>
            <p>{rt("**Here's what nobody tells you about renting AV: the gear is rarely the problem.**")}</p>
            <p>{rt("**The problems are mostly human:** the crew that shows up knowing nothing about your event... or the invoice that comes back higher than the quote. Sounds familiar?")}</p>
            <p>{rt("Prime Line AV is an audiovisual equipment rental service built so those problems never reach your event. Here's why ==brands like TikTok, Apple, Nike and Disney== trust us with theirs:")}</p>
          </>
        }
        reasons={REASONS}
      />

      {/* Block 07 — case studies */}
      <HomePortfolioSection
        id="case-studies"
        ctaLabel="View all our events"
        header={
          <SectionHeader eyebrow="Case studies" title="Watch real events, built by Prime Line AV" accent="real events">
            Don&apos;t take our word for it. <span className="hl">Press play and see our crews build these shows from load-in to doors.</span>
          </SectionHeader>
        }
      />

      {/* Block 08 — team */}
      <TeamSection
        header={
          <SectionHeader eyebrow="Our team" title="Our Team" accent="Team">
            {rt("Meet the team behind your event, from the first call to the last truck out. [See the full team](/about).")}
          </SectionHeader>
        }
      />

      {/* Block 09 — reviews */}
      <WrittenReviewsSection
        header={
          <>
            <SectionHeader eyebrow="Reviews" title="Client reviews" accent="reviews" />
            <PullQuote quote="They made our event look like a million bucks." author="Brandon Dawson" company="Cardone Ventures" />
          </>
        }
      />

      {/* Block 10 — blog */}
      <BlogSection header={<SectionHeader eyebrow="Resources" title="From the blog" accent="the blog" align="left" className="!mb-0" />} />

      {/* Block 11 — FAQ + call strip */}
      <FAQSection
        items={FAQ_ITEMS}
        header={<SectionHeader eyebrow="FAQ" title="AV rental FAQ" accent="FAQ" />}
        after={<CallStrip className="mt-10" title="Still have questions?" subtitle="Ask us today!" />}
      />
    </div>
  )
}
