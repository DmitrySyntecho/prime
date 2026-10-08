"use client"

import { rt, plain } from "@/components/blocks/rich-text"
import { LandingHero } from "@/components/landing/landing-hero"
import { TrustedBySection } from "@/components/trusted-by-section"
import { RatingsBar } from "@/components/ratings-bar"
import { SectionHeader } from "@/components/section-header"
import { LinkCardGrid, type LinkCard } from "@/components/blocks/link-card-grid"
import { ImageBento, type BentoItem } from "@/components/blocks/image-bento"
import { CallStrip } from "@/components/blocks/call-strip"
import { ReasonsSplit, type Reason } from "@/components/blocks/reasons-split"
import { PhotoCarousel, type Photo } from "@/components/blocks/photo-carousel"
import { HomePortfolioSection, type Study } from "@/components/home/home-portfolio-section"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { TeamSection } from "@/components/team-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { BlogSection } from "@/components/blog-section"
import { FAQSection, type FAQItem } from "@/components/faq-section"
import { clipsForService } from "@/lib/hero-clips"
import type { Icon3DName } from "@/components/icon-3d"

/* Copy: LED page copy deck (H1 + Blocks 03–12). Inline markup in the strings:
   [text](/href) → link, ==text== → .hl key-sentence highlight. The deck's
   /av-rental/led-screen-rental/* and /cases/ links are mapped to the routes that
   exist on this site. */


/* ── Block 01 · hero ─────────────────────────────────────────────────── */
const HERO_LEDE =
  "Prime Line AV offers custom LED video wall rental, including indoor and outdoor LED screens, with curved configurations available. We deliver and rig nationwide, ==with a senior technician on site.=="

const HERO_BULLETS: { icon: Icon3DName; text: string }[] = [
  { icon: "setup-tools", text: "Turnkey setup and teardown handled by our team" },
  { icon: "pixel-pitch", text: "Pixel pitch matched to your venue and viewing distance" },
  { icon: "content-play", text: "Professional content management available" },
  { icon: "flight-case", text: "Lighting, stage, and sound rental packages also available" },
]

const HERO_STATS = [
  { value: "15+", label: "years AV experience" },
  { value: "2,500+", label: "events delivered" },
  { value: "500+", label: "brands trust us" },
  { value: "Nationwide", label: "service" },
]

/* ── Block 04 · rental options ───────────────────────────────────────── */
const OPTIONS: LinkCard[] = [
  {
    title: "Outdoor LED Screen Rental",
    href: "/av-rental/outdoor-led-wall-rental",
    image: "/images/services/led-04.webp",
    icon: "led-outdoor",
    body: rt("Weatherproof LED screens ==bright enough to read under direct sunlight.== We match the setup to the site and the audience viewing area, from festivals to open-air stages."),
  },
  {
    title: "Indoor LED Screen Rental",
    href: "/av-rental/indoor-led-wall-rental",
    image: "/images/services/led-02.webp",
    icon: "led-wall",
    body: rt("Fine-pitch LED screens for indoor spaces where the audience may sit closer to the LED screen. We choose the setup around ==the distance your guests will actually watch from==, be it for ballrooms or conference stages."),
  },
  {
    title: "Mobile LED Screen Rental",
    href: "/av-rental/mobile-led-wall-rental",
    image: "/images/services/led-03.webp",
    icon: "led-trailer",
    body: rt("Our trailer-mounted LED wall drives in and out of the venue and gets show-ready without building a ground-supported wall on site. ==Perfect when load-in time or site access is limited.=="),
  },
  {
    title: "Large LED Screen Rental",
    href: "/av-rental/large-led-wall-rental",
    image: "/images/services/video-led.webp",
    icon: "stage",
    body: rt("Large-format LED walls are built for stages and audience areas where content needs to stay readable from farther back. At concerts and arena shows, ==the last row sees the same detail as the first.=="),
  },
  {
    title: "Buy an LED Video Wall",
    href: "/store/led-walls",
    image: "/images/services/led-screen.webp",
    icon: "led-billboard",
    body: rt("Need an LED wall beyond a single event? Prime Line AV also sells LED video walls for organizations that want to own their display system. ==It's perfect for churches and other places of worship.=="),
  },
  {
    title: "Video Wall Installation",
    href: "/av-installations/led-wall-installation",
    image: "/images/services/permanent-av-2.webp",
    icon: "installation",
    body: rt("For a fixed display, our permanent LED wall installation service is ==designed for long-term use.== Use it as digital signage or a digital billboard for your business or establishment."),
  },
]

/* ── Block 05 · events ───────────────────────────────────────────────── */
const EVENTS: BentoItem[] = [
  {
    title: "Concerts & Festivals",
    image: "/images/case-studies/lca-1.webp",
    body: "An LED wall keeps performers, live camera feeds, and show content visible across larger audience areas. We size the LED screen around the stage and viewing distance.",
  },
  {
    title: "Conferences",
    image: "/images/case-studies/amagi-2.webp",
    body: "For keynotes and breakout sessions, an LED wall gives presenters a bright display for slides, video, and live camera content without depending on projection conditions.",
  },
  {
    title: "Corporate Events",
    image: "/images/case-studies/miami-1.webp",
    body: "For events like conventions or product launches, an LED video wall carries your content at a scale the whole room can read and see.",
  },
  {
    title: "Trade Shows",
    image: "/images/case-studies/tiktok-3.webp",
    body: "An LED wall makes your booth visible from down the aisle. We install within your move-in window and coordinate with the venue.",
  },
  {
    title: "Brand Activations",
    image: "/images/services/led-01.webp",
    body: "An LED screen can become part of the branded environment, with custom and curved builds shaped to the space and designed for your content.",
  },
  {
    title: "Broadcast & Virtual Events",
    image: "/images/services/permanent-av-3.webp",
    body: "LED walls can serve as an on-camera background or in-room display, with our team coordinating the content as part of the full AV production.",
  },
]

/* ── Block 06 · why trust us ─────────────────────────────────────────── */
const REASONS: Reason[] = [
  {
    title: "We match pixel pitch to viewing distance",
    icon: "pixel-pitch",
    body: rt("Pixel pitch affects how the image looks when people get closer to the LED screen. We plan it around the audience position so ==you do not pay for the wrong panel type== or end up with an LED screen that looks grainy from key seats."),
  },
  {
    title: "A senior LED tech and rigger are on every job",
    icon: "rigging",
    body: rt("You’ll get a full AV team with your LED wall rental who will handle the assembly and its supporting structure. ==Your event team has a clear technical point of contact from setup through strike.=="),
  },
  {
    title: "We handle the LED screen and the content",
    icon: "content-play",
    body: rt("==Our LED screen rental service includes content management.== We coordinate playback and screen operation with the event instead of treating the LED wall as a stand-alone rental."),
  },
  {
    title: "We support events nationwide",
    icon: "location-pin",
    body: rt("Prime Line AV provides LED rental delivery and on-site support through our [nationwide locations](/locations). With us, you’ll work with ==one AV partner even if you have multiple events, coast to coast.=="),
  },
  {
    title: "Rent now or buy later as needed",
    icon: "led-billboard",
    body: rt("With Prime Line AV, you can rent an LED video wall for a single event or [buy an LED wall](/store/led-walls) for a permanent installation. Call us for a consultation, and ==we will help you decide which one fits your needs better.=="),
  },
  {
    title: "Get a free, no-obligation quote",
    icon: "stopwatch",
    body: rt("Tell us about the event and how you plan to use your LED screen, and ==we’ll send a quote in as fast as 30 minutes.== Got a quote from another provider? Send it to us, and we’ll see how we can give you a better offer."),
  },
]

/* ── Block 07 · LED case-study films (Mux) ───────────────────────────── */
const LED_STUDIES: Study[] = [
  { title: "Amagi FAST Conference", location: "Los Angeles", category: "Conference", mux: "BrD9vKSat02duCjNodPZ00a02ZRc5QfKAno007TIKGF5vOU", thumb: 63 },
  { title: "Nike After Dark Tour", location: "Los Angeles", category: "Brand activation", mux: "iqYRqLK301aUIzbLxa9zMXyQ8FxOZIIGTgagNB02spvpY", thumb: 70 },
  { title: "TikTok Shop Summit 2026", location: "Los Angeles Convention Center", category: "Conference", mux: "KfJ00XD74CFG01AI5eclQ58q439V3U004sBcuSENC2A9IU", thumb: 120 },
  { title: "IDB Group Corporate Summit", location: "Intercontinental Miami", category: "Corporate", mux: "a1VM513vYaAw3u8rBfLB8bG4MMma2FbIFN2YGepuxiA", thumb: 60 },
  { title: "Last Chance for Animals Gala", location: "Los Angeles", category: "Gala", mux: "02w1uQtRVTaeIYfYMvYnHvIFZbFF19lAyoDYU00M00fGHk", thumb: 81 },
  { title: "Asian Hall of Fame Gala", location: "Los Angeles", category: "Gala", mux: "Io8Bi00jo3qftxjB01L1qWs7TPQuOhKBxfi02ecvwEl2X00", thumb: 15 },
]

/* ── Block 08 · load-in → showtime photos (real Prime Line AV events) ── */
const PHOTOS: Photo[] = [
  { src: "/images/case-studies/lca-2.webp", caption: "Crew installing the LED screen on truss", event: "Last Chance for Animals Gala", stage: "Load-in" },
  { src: "/images/case-studies/amagi-3.webp", caption: "Hanging LED panels on the truss", event: "Amagi FAST Conference", stage: "Load-in" },
  { src: "/images/case-studies/miami-4.webp", caption: "Testing the LED wall with the crew", event: "IDB Group Corporate Summit", stage: "Load-in" },
  { src: "/images/case-studies/amagi-5.webp", caption: "Main stage LED wall with gradient branding", event: "Amagi FAST Conference", stage: "Showtime" },
  { src: "/images/case-studies/miami-1.webp", caption: "Main stage LED wall", event: "IDB Group Corporate Summit", stage: "Showtime" },
  { src: "/images/case-studies/asian-flame-2.webp", caption: "Ballroom LED wall behind the stage", event: "Asian Hall of Fame Gala", stage: "Showtime" },
  { src: "/images/case-studies/lca-5.webp", caption: "Guests watching outdoor LED content", event: "Last Chance for Animals Gala", stage: "Showtime" },
  { src: "/images/case-studies/lca-4.webp", caption: "Main stage with a large video display", event: "Last Chance for Animals Gala", stage: "Showtime" },
  { src: "/images/case-studies/tiktok-4.webp", caption: "Keynote on the main stage screens", event: "TikTok Shop Summit 2026", stage: "Showtime" },
]

/* ── Block 12 · FAQ ──────────────────────────────────────────────────── */
const FAQ: { q: string; a: string[] }[] = [
  {
    q: "What is an LED video wall and how does renting one work?",
    a: [
      "An LED video wall is a screen built from modular panels, sized on site to fit the venue. The panels join into one surface, so the LED wall can be built to nearly any size or shape your event needs. When you rent one from Prime Line AV, we deliver and rig the LED wall, then support it through the event and strike it when the show ends.",
    ],
  },
  {
    q: "What pixel pitch do I need for my event?",
    a: [
      "Pixel pitch is the space between LEDs, and the right number depends on how close your audience sits. A smaller pitch means a sharper image up close, while a larger pitch stays clear at a distance and costs less per panel.",
      "Prime Line AV specs your fine pitch for indoor rental display video wall where viewers sit near the screen, and wider pitch outdoors where the crowd watches from farther away.",
    ],
  },
  {
    q: "How much does LED wall rental cost?",
    a: [
      "LED wall rental pricing at Prime Line AV depends on the LED wall size and pixel pitch, plus how long your rental LED wall duration will be. Send us the date and the venue, and we will quote the exact LED wall needed for your event.",
    ],
  },
  {
    q: "How do I choose between the LED screen types you rent?",
    a: [
      "Choosing an LED screen type comes down to your venue and event needs. Indoor LED screens are best for rooms with close viewing, while outdoor LED walls handle weather and direct sunlight. Meanwhile, a mobile LED screen fits touring setups, and large-format LED walls fit concert crowds.",
      "At Prime Line AV, we can give you a custom LED screen in any shape or size you need. Contact us today to talk to our project manager.",
    ],
  },
  {
    q: "Should I rent an LED wall or buy one?",
    a: [
      "If you are hosting a one-time event, renting an LED wall is usually the most cost-efficient option. Meanwhile, buying an LED wall through our [LED wall store](/store/led-walls) is best if you have multiple events a year or you need a permanent installation for your establishment.",
      "Prime Line AV both rents and sells LED video walls, and we can also install permanent LED screens.",
    ],
  },
  {
    q: "Do you provide technicians and rigging nationwide?",
    a: [
      "Yes. Prime Line AV sends a senior LED tech and a rigging team with every LED wall rental, anywhere in the United States. We provide delivery and setup wherever your event is and in any venue. You can check our [locations](/locations) to see where we are available or call us to confirm if we serve your area.",
    ],
  },
]

const FAQ_ITEMS: FAQItem[] = FAQ.map((f) => ({
  question: f.q,
  answer: f.a.map((p, i) => <p key={i}>{rt(p)}</p>),
  answerText: f.a.map(plain).join(" "),
}))

/**
 * LED video wall rental page (copy deck "LED page"). Rendered for every
 * /…/av-rental/led-video-wall SEO path and for /services/led-screen-rental*.
 * `location` is the city for local variants; omit it on the national page.
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
              lede: rt(HERO_LEDE),
              bullets: HERO_BULLETS,
              ctaLabel: "Get your custom quote",
              microcopy: "Quote in 30 minutes · No obligation",
              secondaryLink: { label: "Browse LED walls", href: "/shop?category=led-screens" },
              showIncludes: false,
              stats: HERO_STATS,
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
            {rt(
              "An LED screen rental puts a modular video wall at your event, built from panels to ==the exact size your space calls for.== Rent the LED screen on its own or bundle it with other [AV rental](/av-rental) equipment we offer at Prime Line AV.",
            )}
          </SectionHeader>
          <LinkCardGrid items={OPTIONS} />
        </div>
      </section>

      {/* LED walls you can rent now (products are required on every service page) */}
      <HomeShopSection category="led-screens" />

      {/* Block 05 — events + call strip */}
      <section id="led-events" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Events we power" title="We build LED walls for any kind of event" accent="any kind of event">
            {rt(
              "Prime Line AV provides custom LED screen rental based on where your audience is watching and what needs to be shown on screen. ==We have delivered LED walls for 2,500+ events nationwide.==",
            )}
          </SectionHeader>
          <ImageBento items={EVENTS} />
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
        lede={rt("Here's why ==500+ brands like TikTok, Disney, and Netflix== trust Prime Line AV with their LED wall setup:")}
        reasons={REASONS}
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
          <PhotoCarousel photos={PHOTOS} />
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
