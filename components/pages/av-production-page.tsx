"use client"

import { LandingHero } from "@/components/landing/landing-hero"
import { TrustedBySection } from "@/components/trusted-by-section"
import { SectionHeader } from "@/components/section-header"
import { LinkCardGrid, type LinkCard } from "@/components/blocks/link-card-grid"
import { ImageBento, type BentoItem } from "@/components/blocks/image-bento"
import { CallStrip } from "@/components/blocks/call-strip"
import { ReasonsSplit, type Reason } from "@/components/blocks/reasons-split"
import { PullQuote } from "@/components/blocks/pull-quote"
import { rt, plain } from "@/components/blocks/rich-text"
import { HomePortfolioSection, type Study } from "@/components/home/home-portfolio-section"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { TeamSection } from "@/components/team-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { BlogSection } from "@/components/blog-section"
import { FAQSection, type FAQItem } from "@/components/faq-section"
import { clipsForService } from "@/lib/hero-clips"
import { PHONE_DISPLAY } from "@/lib/contact"
import type { Icon3DName } from "@/components/icon-3d"

/* Copy: ClickUp "AV Production page - Prime Line AV" (Hero + Blocks 03–12),
   verbatim. Links mapped: led-screen-rental → /av-rental/led-video-wall,
   lighting-rental → /av-rental/lighting, /cases → /portfolio. */

const NATIONAL_H1 = "AV Production Company for Events in the US"

const BULLETS: { icon: Icon3DName; text: string }[] = [
  { icon: "headset", text: "A dedicated Technical Director on your event from the first call to strike" },
  { icon: "render-3d", text: "Free 3D render of your event setup before you commit" },
  { icon: "flight-case", text: "Turnkey service, with AV equipment and an on-site crew included" },
  { icon: "location-pin", text: "Nationwide production, from a single event to a full series across multiple cities" },
]

const STATS = [
  { value: "15+", label: "years in AV production" },
  { value: "2,500+", label: "events produced" },
  { value: "30+", label: "events monthly" },
  { value: "500+", label: "brands trust us" },
]

/* Block 04 — production services */
const SERVICES: LinkCard[] = [
  {
    title: "Corporate video production",
    href: "/corporate-video-production",
    image: "/images/case-studies/amagi-4.webp",
    icon: "clapperboard",
    body: rt("Brand films, training content, and full event coverage for business use. Our corporate video production crew ==shoots and edits footage ready to post for your marketing team.=="),
  },
  {
    title: "Event video production",
    href: "/event-video-production",
    image: "/images/services/av-04.webp",
    icon: "live-camera",
    body: rt("Multi-camera capture of your event, filmed in up to 4K quality. Event video production covers keynotes, panels, performances, and highlight reels, ==cut and ready to publish the week of your event.=="),
  },
  {
    title: "Live streaming production",
    href: "/live-streaming-production",
    image: "/images/services/av-05.webp",
    icon: "live-stream",
    body: rt("Multi-camera live streaming and broadcast for any event. Our live streaming production crew feeds your show to major streaming platforms and ==runs the broadcast end to end.=="),
  },
  {
    title: "AV equipment rental",
    href: "/av-rental",
    image: "/images/services/stage-rental-card.webp",
    icon: "flight-case",
    body: rt("Sound, lighting, LED wall, and staging gear for productions of any size. AV equipment rental works as a standalone service when you already have a crew or ==with A1/A2 technicians available on request.=="),
  },
  {
    title: "LED video wall",
    href: "/av-rental/led-video-wall",
    image: "/images/services/led-02.webp",
    icon: "led-wall",
    body: rt("Indoor and outdoor LED walls, including curved builds, for stages and sets. ==Every LED video wall arrives with a tech== who installs, calibrates, runs, and strikes it after your event."),
  },
]

/* Block 05 — event formats */
const FORMATS: BentoItem[] = [
  {
    title: "Corporate events",
    image: "/images/case-studies/miami-1.webp",
    body: rt("We provide custom AV production for town halls, sales kickoffs, executive summits, and company celebrations, designed around your presenters and run of show. Book it as [full event production](/event-video-production) or just the technical side."),
  },
  {
    title: "Conferences",
    image: "/images/case-studies/amagi-2.webp",
    body: rt("From single-room summits to conferences with breakout sessions, we build the audio, screens, staging, and recording plan around your agenda and speaker lineup. Every keynote can be [captured on video](/corporate-video-production) for attendees who missed it."),
  },
  {
    title: "Trade shows",
    image: "/images/case-studies/tiktok-3.webp",
    body: rt("Your booth gets an [LED wall](/av-rental/led-video-wall), displays, audio, and power spec’d to your floor plan and exhibitor kit. We install and test everything before the hall opens, so it works from day one."),
  },
  {
    title: "Concerts & Festivals",
    image: "/images/case-studies/lca-1.webp",
    body: rt("We stage indoor and outdoor shows for concerts, festivals, fan events, and brand performances, with touring-grade [sound](/av-rental/sound-system-rental) and [lighting](/av-rental/lighting) rated for open air and scaled to your lineup, crowd, site, and schedule."),
  },
  {
    title: "Fashion Shows",
    image: "/images/services/proj-03.webp",
    body: rt("Runway shows and designer showcases get lighting and sound built around the collection and the choreography, with every cue rehearsed before the first look walks. See how we run them in our [event portfolio](/portfolio)."),
  },
  {
    title: "Experiential/Brand Activations",
    image: "/images/services/led-01.webp",
    body: rt("We produce brand activations, pop-ups, product demos, and immersive installs, engineered around your agency's creative from first render to load-in, and we keep up when the brief changes. See the builds in our [event portfolio](/portfolio)."),
  },
  {
    title: "Galas",
    image: "/images/services/av-02.webp",
    body: rt("For galas, award nights, fundraisers, and donor dinners, we set the podium mics, auction screens, dinner lighting, and dance-floor looks, then follow your program cue by cue from the first toast to the live auction."),
  },
  {
    title: "Product Launches",
    image: "/images/case-studies/tiktok-4.webp",
    body: rt("Product launches get synchronized screens, lighting, sound, and playback, timed to your script and rehearsed with your presenters before doors. Our [corporate video production](/corporate-video-production) crew can film the launch for your marketing."),
  },
  {
    title: "Virtual/Hybrid Events",
    image: "/images/services/permanent-av-3.webp",
    body: rt("We match the [live streaming](/live-streaming-production) and broadcast setup to your platform, program, schedule, and remote audience, so the viewers at home get the same quality as the seats in the room."),
  },
  {
    title: "Film Production",
    image: "/images/services/av-01.webp",
    body: rt("We support film and video shoots with on-set lighting, monitors, sound, and power, working from your shot list and schedule so the crew never waits on gear. That covers studio sets, location shoots, and live tapings."),
  },
]

/* Block 06 — why us */
const REASONS: Reason[] = [
  {
    title: "One accountable partner",
    icon: "walkie-talkie",
    body: rt("Audio, lighting, video, LED, and staging run by a single Technical Director, from concept to strike. ==You deal with one team and one contract for the entire production.=="),
  },
  {
    title: "In-house audio visual production team",
    icon: "sound-console",
    body: rt("Our own audio engineers mix your show on L-Acoustics and d&b systems, and a senior lighting designer runs your lights on GrandMA3, ==the same people from soundcheck to the last cue.=="),
  },
  {
    title: "A free 3D render before you commit",
    icon: "render-3d",
    body: rt("You see the stage, the LED walls, and the sightlines in your actual venue before you sign, and ==you can forward it to whoever approves the budget.=="),
  },
  {
    title: "Tested 2 hours before doors",
    icon: "stopwatch",
    body: rt("Every system is up and running 2 hours before your audience walks in, with ==your team lead prepped weeks ahead of the show.=="),
  },
  {
    title: "Free, no-obligation quote",
    icon: "clipboard",
    body: rt("Call us today, and ==we can give you a free quote in as fast as 30 minutes==, based on your date, venue, and event type."),
  },
  {
    title: "Nationwide coverage with local teams",
    icon: "location-pin",
    body: rt("We operate coast to coast and can ==run your production in any venue in the United States.== Browse our [locations](/locations) or contact us to see if we serve your area."),
  },
]

/* Block 07 — finished shows */
const SHOWS: Study[] = [
  { title: "TikTok Shop Summit 2026", location: "Los Angeles Convention Center", category: "Conference", mux: "KfJ00XD74CFG01AI5eclQ58q439V3U004sBcuSENC2A9IU", thumb: 120 },
  { title: "IDB Group Corporate Summit", location: "Intercontinental Miami", category: "Corporate", mux: "a1VM513vYaAw3u8rBfLB8bG4MMma2FbIFN2YGepuxiA", thumb: 60 },
  { title: "Last Chance for Animals Gala", location: "Los Angeles", category: "Gala", mux: "02w1uQtRVTaeIYfYMvYnHvIFZbFF19lAyoDYU00M00fGHk", thumb: 81 },
]

/* Block 08 — behind-the-scenes reels (filterable) */
const REELS: Study[] = [
  { title: "Ramp Tailgate BTS", location: "Los Angeles", category: "Brand activation", mux: "xIFaCY1GdKzQxjtm01L87JqoPAKob3YBscDUzSiSF1300", thumb: 5 },
  { title: "Asian Flame BTS", location: "Los Angeles", category: "Gala", mux: "Io8Bi00jo3qftxjB01L1qWs7TPQuOhKBxfi02ecvwEl2X00", thumb: 15 },
  { title: "Amagi FAST Conference", location: "Los Angeles", category: "Conference", mux: "BrD9vKSat02duCjNodPZ00a02ZRc5QfKAno007TIKGF5vOU", thumb: 63 },
  { title: "Nike After Dark Tour", location: "Los Angeles", category: "Brand activation", mux: "iqYRqLK301aUIzbLxa9zMXyQ8FxOZIIGTgagNB02spvpY", thumb: 70 },
  { title: "Young Fashion Show BTS", location: "Los Angeles", category: "Fashion show", mux: "eMtzfn01vmRsGxIZ9SWpnmxiavJCupHsJfOV2K68M400E", thumb: 40 },
]

const REEL_FILTERS = [
  { label: "Corporate", match: "Corporate" },
  { label: "Conferences", match: "Conference" },
  { label: "Festivals", match: "Festival" },
  { label: "Galas", match: "Gala" },
  { label: "Activations", match: "Brand activation" },
]

/* Block 12 — FAQ */
const FAQ: { q: string; a: string }[] = [
  {
    q: "What is an AV production company?",
    a: "An AV production company plans, builds, runs, and strikes the technical side of an event: sound, video, lighting, staging, and LED. At Prime Line AV, we do all of it with our own crews, from corporate video and live streaming to full show production across the US.",
  },
  {
    q: "What does AV mean in production?",
    a: "In production, AV stands for audio visual: everything your audience hears and sees at an event. That covers microphones, speakers, cameras, screens, projection, and lighting, plus the crew running them. When we plan and operate those systems as one live show, that is AV production.",
  },
  {
    q: "Do you handle full production or equipment only?",
    a: "Yes, Prime Line AV handles both full production and equipment-only orders. Most clients hire us to design and run the entire show with our own crew. If you only need gear, our [AV equipment rental](/av-rental) service delivers sound, lighting, LED and staging, with technicians available on request.",
  },
  {
    q: "Do you work nationwide?",
    a: "Yes, Prime Line AV produces events nationwide, coast to coast, in any venue in the United States. We run 30+ events every month and send the same standard of crew and gear to every state. See our [locations page](/locations) for coverage details in your city.",
  },
  {
    q: "Do you provide an on-site technical director and crew?",
    a: "Yes, every Prime Line AV production comes with a dedicated Technical Director and our own on-site crew. Our audio engineers mix your show, and a senior lighting designer runs your lights, prepped on your event weeks before doors. The people who plan your show are the people who run it.",
  },
  {
    q: "How fast can I get a quote?",
    a: `You can get a free quote from Prime Line AV in as fast as 30 minutes. Call ${PHONE_DISPLAY} or send your date, venue, and a short description of your event. If you want to see the setup before deciding, we include a free 3D render of your event.`,
  },
  {
    q: "What event types do you produce?",
    a: "We produce corporate events, conferences, trade shows, galas, fashion shows, product launches, festivals, hybrid broadcasts, and film shoots. After 2,500+ events over 15 years, there are very few formats our crews have not run. Read how we approach each one on our [event production page](/event-production).",
  },
  {
    q: "Do you carry insurance and COIs?",
    a: "Yes, Prime Line AV carries insurance and provides certificates of insurance (COIs) for your venue. COIs are standard paperwork for us, so tell us what your venue or procurement team requires when you request your quote, and the documents arrive with it, ready to forward.",
  },
]

const FAQ_ITEMS: FAQItem[] = FAQ.map((f) => ({ question: f.q, answer: <p>{rt(f.a)}</p>, answerText: plain(f.a) }))

/** AV Production page — /av-production (+ city variants) and /services/full-av-production. */
export function AvProductionPage({ h1, location }: { h1?: string; location?: string }) {
  const onQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm", { detail: { serviceSlug: "full-av-production" } }))

  return (
    <div className="min-h-screen">
      {/* Hero / Block 02 + trust strip + client logos (Block 03) */}
      <div className="flex min-h-[calc(100svh-92px)] flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <LandingHero
            hero={{
              title: h1 ?? NATIONAL_H1,
              accentPhrase: location ?? "AV Production Company",
              pillLabel: location ? `${location} · Sound · Video · Lighting · LED` : "Sound · Video · Lighting · Staging · LED",
              lede: rt("Prime Line AV is a full-service AV production company that designs and operates audio, video, lighting, staging, and LED walls ==for any type of event.=="),
              bullets: BULLETS,
              ctaLabel: "Get your custom quote",
              microcopy: "Quote in 30 minutes · No obligation",
              secondary: "portfolio",
              showIncludes: false,
              stats: STATS,
              clips: clipsForService("full-av-production"),
            }}
            onQuote={onQuote}
          />
        </div>
        <TrustedBySection compact />
      </div>

      {/* Block 04 — production services */}
      <section id="production-services" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="What we produce" title="Audio visual production services built around your event" accent="built around your event">
            {rt(
              "Our AV production company plans the technical side of your event and runs it live: sound, video, lighting, staging, and the crew behind them. ==Book all of it as one production, or pick only the AV production services you need.==",
            )}
          </SectionHeader>
          <LinkCardGrid items={SERVICES} />
        </div>
      </section>

      {/* The gear behind every production (all categories) */}
      <HomeShopSection />

      {/* Block 05 — event formats + call strip */}
      <section id="formats" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Event formats" title="We produce every event format, boardroom to main stage" accent="boardroom to main stage">
            {rt(
              "Prime Line AV has produced 2,500+ events, so ==we already know what goes wrong at each type of event and how to prevent it.== Tell us your format, and we build the production around it.",
            )}
          </SectionHeader>
          <ImageBento items={FORMATS} />
          <CallStrip className="mt-10" title="Ready to discuss your event?" subtitle="Talk to us!" />
        </div>
      </section>

      {/* Block 06 — why us */}
      <ReasonsSplit
        id="why-us"
        eyebrow="Need one team to run the whole event?"
        heading={
          <>
            We&apos;re the AV production company <span className="ds-accent-text">trusted by 500+ brands</span>
          </>
        }
        lede={
          <>
            <p>{rt("**Most event problems trace back to one source: multiple vendors, multiple contracts, and nobody accountable for the whole show.**")}</p>
            <p>{rt("**Prime Line AV is an audio visual production company built to remove that risk.** Here’s how we make it possible:")}</p>
          </>
        }
        reasons={REASONS}
      />

      {/* Block 07 — finished shows */}
      <HomePortfolioSection
        id="portfolio"
        studies={SHOWS}
        ctaLabel="View all cases"
        header={
          <SectionHeader eyebrow="Case studies" title="Real shows we produced, from load-in to lights down" accent="from load-in to lights down">
            {rt("From brand summits to charity galas, these events ran on our crews and gear. ==Here is what full production looks like when it is one team's job.==")}
          </SectionHeader>
        }
      />

      {/* Block 08 — behind-the-scenes reels, filterable */}
      <HomePortfolioSection
        id="behind-the-scenes"
        studies={REELS}
        filters={REEL_FILTERS}
        ctaLabel=""
        header={
          <SectionHeader eyebrow="Behind the scenes" title="What our crews build real shows" accent="our crews">
            {rt("Behind-the-scenes reels from real productions, including Ramp Tailgate and Asian Flame. ==Filter by event type and watch how a show like yours comes together.==")}
          </SectionHeader>
        }
      />

      {/* Block 09 — team */}
      <TeamSection
        header={
          <SectionHeader eyebrow="Our team" title="Meet the team running your AV production" accent="your AV production">
            Meet the team behind your event, from the first call to the last truck out.
          </SectionHeader>
        }
      />

      {/* Block 10 — testimonials */}
      <TestimonialsCarousel
        header={
          <>
            <SectionHeader eyebrow="Testimonials" title="What our happy clients say" accent="happy clients" />
            <PullQuote quote="They made our event look like a million bucks" author="Brandon Dawson" company="Cardone Ventures" />
          </>
        }
      />

      {/* Block 11 — blog */}
      <BlogSection header={<SectionHeader eyebrow="Resources" title="From the blog" accent="the blog" align="left" className="!mb-0" />} />

      {/* Block 12 — FAQ + call strip */}
      <FAQSection
        items={FAQ_ITEMS}
        header={<SectionHeader eyebrow="FAQ" title="AV production FAQs" accent="FAQs" />}
        after={<CallStrip className="mt-10" title="Still have more questions?" subtitle="Ask us today!" />}
      />
    </div>
  )
}
