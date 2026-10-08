"use client"

import { LandingHero } from "@/components/landing/landing-hero"
import { SectionHeader } from "@/components/section-header"
import { LinkCardGrid, type LinkCard } from "@/components/blocks/link-card-grid"
import { ChecklistSplit } from "@/components/blocks/checklist-split"
import { ProcessSteps, type Step } from "@/components/blocks/process-steps"
import { ReasonsSplit, type Reason } from "@/components/blocks/reasons-split"
import { ProseSection } from "@/components/blocks/prose-section"
import { CtaPair } from "@/components/blocks/cta-pair"
import { CallStrip } from "@/components/blocks/call-strip"
import { rt, plain } from "@/components/blocks/rich-text"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { WrittenReviewsSection } from "@/components/written-reviews-section"
import { FAQSection, type FAQItem } from "@/components/faq-section"
import { HOME_CLIPS } from "@/lib/hero-clips"
import { PHONE_DISPLAY } from "@/lib/contact"
import type { Icon3DName } from "@/components/icon-3d"

/* Copy: ClickUp "AV Installation page - Prime Line AV" (Hero + Blocks 03–09),
   verbatim. video-wall-installation → /av-installations/led-wall-installation.
   The trust-strip figures are marked "please confirm with Prime Line AV" in the
   deck. Residential/commercial card photos are Higgsfield renders
   (public/images/installations). */

const NATIONAL_H1 = "Audio Visual Installation Service in the U.S."

const BULLETS: { icon: Icon3DName; text: string }[] = [
  { icon: "installation", text: "Permanent installs: LED video walls, sound systems, conference room AV & more" },
  { icon: "shield", text: "Insured crew, with COIs provided for your building or venue" },
  { icon: "render-3d", text: "Free 3D rendering and site survey before any work starts" },
  { icon: "location-pin", text: "Offices, retail spaces, venues and private homes" },
]

const STATS = [
  { value: "15+", label: "years in AV industry" },
  { value: "1,000+", label: "systems installed" },
  { value: "12-month", label: "warranty" },
]

const INCLUDED: { icon: Icon3DName; text: string }[] = [
  { icon: "clipboard", text: "Site survey and measurements" },
  { icon: "render-3d", text: "System design and engineering" },
  { icon: "flight-case", text: "Equipment supply" },
  { icon: "installation", text: "Installation and wiring" },
  { icon: "sound-console", text: "Configuration and programming" },
  { icon: "shield", text: "Testing and commissioning" },
  { icon: "award", text: "Documentation and training" },
]

/* Block 04 — installation services */
const SERVICES: LinkCard[] = [
  {
    title: "Audio installation",
    href: "/av-installations/audio-installation",
    image: "/images/installations/audio.webp",
    icon: "speaker",
    body: rt("Sound systems for offices, venues, retail floors and conference rooms. Our audio installation service covers ==speaker layout, amplification, DSP configuration and acoustic tuning.=="),
  },
  {
    title: "Video installation",
    href: "/av-installations/video-installation",
    image: "/images/installations/video.webp",
    icon: "live-camera",
    body: rt("Displays, video conferencing and presentation systems for meeting rooms and commercial spaces. Every video installation is ==engineered around the room's sightlines and lighting.=="),
  },
  {
    title: "Video wall installation",
    href: "/av-installations/led-wall-installation",
    image: "/images/installations/video-wall.webp",
    icon: "led-wall",
    body: rt("LED video walls and digital signage for lobbies, venues, retail spaces, and control rooms. Our video wall installation includes ==structural mounting, power, calibration, and content setup.=="),
  },
  {
    title: "Smart home installation",
    href: "/av-installations/smart-home-installation",
    image: "/images/installations/smart-home.webp",
    icon: "content-play",
    body: rt("Home automation and integrated AV control for residential spaces. One smart home installation puts ==lighting, climate, audio, and security on a single control system.=="),
  },
  {
    title: "Home audio & video installation",
    href: "/av-installations/home-audio-video-installation",
    image: "/images/installations/home-audio-video.webp",
    icon: "tv-display",
    body: rt("Whole-home audio and video, tailored to each room. Home audio video installation covers ==distributed speakers, hidden wiring, displays, and central control.=="),
  },
  {
    title: "Commercial audio & video installation",
    href: "/av-installations/commercial-audio-video-installation",
    image: "/images/services/permanent-av-2.webp",
    icon: "sound-console",
    body: rt("AV systems for offices, retail stores, restaurants and venues. Commercial audio video installation is scoped around ==how your team and your customers actually use the space.=="),
  },
  {
    title: "Home theater installation",
    href: "/av-installations/home-theater-installation",
    image: "/images/installations/home-theater.webp",
    icon: "projector",
    body: rt("Custom home theater design and installation for any room and budget. ==From projector and screen selection to acoustics, wiring, and seating layout.=="),
  },
  {
    title: "Billboard installation",
    href: "/av-installations/billboard-installation",
    image: "/images/services/led-04.webp",
    icon: "led-outdoor",
    body: rt("Digital billboard using LED wall technology, including permitting and structural work. ==One team handles design, engineering, permits, and the install itself.=="),
  },
]

/* Block 05 — process */
const STEPS: Step[] = [
  { icon: "headset", title: "Request and consultation", body: "Call and tell us about your space and goals. We discuss your project and outline what the setup involves." },
  { icon: "clipboard", title: "Site survey and measurements", body: "Our team visits the site, measures the space, and checks power, network, acoustics, and mounting conditions." },
  { icon: "render-3d", title: "Design and quote", body: "You receive a system design and an itemized quote. Work begins only after you approve both." },
  { icon: "delivery-truck", title: "Preparation and logistics", body: "We order equipment, schedule the crew, and coordinate access with your facility or general contractor." },
  { icon: "installation", title: "Installation and commissioning", body: "Our installers mount, wire, connect, and label every component with clean cable management." },
  { icon: "shield", title: "Testing and handover", body: "We test every input, output, and use case before sign-off. You see the system working before we leave." },
  { icon: "award", title: "Documentation and training", body: "You’ll receive as-built documentation and hands-on training for your team, backed by a 12-month workmanship warranty." },
]

/* Block 06 — why us */
const REASONS: Reason[] = [
  {
    title: "Nationwide coverage",
    icon: "location-pin",
    body: rt("Our audio and video installation company ==designs, installs, services, and supports AV systems across the country.== See our [locations](/locations) or call us to confirm if we service your area."),
  },
  {
    title: "One accountable team",
    icon: "walkie-talkie",
    body: rt("Design, installation, programming, and support stay under one roof. ==No handoffs between contractors, and no finger-pointing when something needs adjusting.=="),
  },
  {
    title: "Commercial and residential under one roof",
    icon: "installation",
    body: rt("==The same engineering standards apply== whether we are wiring a boardroom or a living room."),
  },
  {
    title: "Insured, with COIs available",
    icon: "clipboard",
    body: rt("We carry insurance and ==provide certificates of insurance for your building or venue.=="),
  },
  {
    title: "Certified installers",
    icon: "award",
    body: rt("Our installers hold ==CTS certification, the industry standard for AV integration==, plus manufacturer training on the lines we carry."),
  },
  {
    title: "12-month workmanship warranty",
    icon: "shield",
    body: rt("Every installation is covered for 12 months. If a covered issue comes up, call us, and ==we fix it at no additional charge.=="),
  },
]

/* Block 07 — long-form */
const PROSE = [
  "Prime Line AV has spent **15 years designing and installing AV systems**, from single boardrooms to giant billboards in stadiums. Every project starts with a design, and you see that design before you pay for it. **We provide a free 3D rendering of your AV system**, showing exactly where each screen hangs and each speaker sits in your actual space.",
  "Work begins only after you approve what you see. From there, we handle the full project: wiring, mounting, programming, testing, and staff training. ==The team that designs your system is the same team that installs it and stands behind it.==",
  "As a full-service audio video installation company, we work with **all the leading AV brands, including Crestron, Extron, Biamp, L-Acoustics, Q-SYS, Samsung, and more**. Each system is spec’d to your room size, acoustics, and budget, not to whatever is sitting in our warehouse.",
  "**We provide full AV installation nationwide, coast to coast.** Whether you need a [commercial audio video installation](/av-installations/commercial-audio-video-installation) across multiple offices or a [home theater installation](/av-installations/home-theater-installation) in one room, we deliver the same high standards. Browse our [locations](/locations), or see how we work in our [project cases](/portfolio).",
]

/* Block 09 — FAQ */
const FAQ: { q: string; a: string }[] = [
  {
    q: "What does an audio visual installation company do?",
    a: "An audio visual installation company like Prime Line AV designs, supplies, installs, and configures the AV systems in a building, then tests them to ensure they meet specific use cases. We handle audio, video, video walls, and control systems in commercial and residential spaces, from the first site survey to staff training.",
  },
  {
    q: "How much does AV installation cost?",
    a: "AV installation can cost anywhere from about $1,500 for a single room to $100,000 or more for a full commercial system. Price depends on your space size, the equipment, the wiring, and the construction. For a custom quote, call us at Prime Line AV, and we'll give you a free quote in as fast as 30 minutes.",
  },
  {
    q: "Do you install for both commercial and residential spaces?",
    a: "Yes, Prime Line AV installs for both commercial and residential spaces. Offices, retail stores, restaurants, and venues fall under our commercial audio-video installation service, while homeowners come to us for smart home installation and home theater installation. Every project runs through the same team and the same process.",
  },
  {
    q: "Do you work nationwide?",
    a: `Yes, Prime Line AV provides AV installation nationwide in all 50 states. See our [locations](/locations) page for coverage details, or call us at ${PHONE_DISPLAY} and we'll confirm if we serve your area.`,
  },
  {
    q: "Can I hire you for installation only, without buying equipment from you?",
    a: "Yes, you can hire Prime Line AV for installation only. If you already own the equipment, we survey the space, install your gear, configure it, and test the finished system before handover. You get the same crew and the same workmanship standard as a full-service project.",
  },
  {
    q: "Do you provide a warranty and post-install support?",
    a: "Yes, every Prime Line AV installation is covered by a 12-month workmanship warranty, with post-install support available after handover. If a covered issue comes up, call us, and we fix it at no additional charge. If you want longer support coverage, ask our account manager when you request your quote.",
  },
  {
    q: "Are your installers certified and insured?",
    a: "Yes, Prime Line AV installers are certified and insured. We provide certificates of insurance for your building or venue on request, so just tell us what your venue requires. Our installers hold CTS certification, the industry standard for AV integration, plus manufacturer training on the lines we carry.",
  },
  {
    q: "How long does an AV installation take?",
    a: "A Prime Line AV installation takes between one day and a few weeks, depending on scope. A single conference room is typically done in one or two days, while a multi-floor office or a full smart home takes longer. Our site survey gives you a firm schedule before any work begins.",
  },
]

const FAQ_ITEMS: FAQItem[] = FAQ.map((f) => ({ question: f.q, answer: <p>{rt(f.a)}</p>, answerText: plain(f.a) }))

const openQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

/** AV Installation page — /av-installations (+ city variants). */
export function AvInstallationPage({ h1, location }: { h1?: string; location?: string }) {
  return (
    <div className="min-h-screen">
      {/* Hero / Block 02 + trust strip */}
      <div className="flex min-h-[calc(100svh-92px)] flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <LandingHero
            hero={{
              title: h1 ?? NATIONAL_H1,
              accentPhrase: location ?? "Audio Visual Installation",
              pillLabel: location ? `${location} · Commercial · Residential` : "Commercial · Residential · Nationwide",
              lede: rt("Prime Line AV is an audiovisual installation company that designs, installs, configures, and supports AV systems ==for commercial and residential spaces nationwide.=="),
              bullets: BULLETS,
              ctaLabel: "Get your custom quote",
              microcopy: "Quote in 30 minutes · No obligation",
              secondaryLink: { label: "Request a consultation", onClick: openQuote },
              showIncludes: false,
              stats: STATS,
              clips: HOME_CLIPS,
            }}
            onQuote={openQuote}
          />
        </div>
      </div>

      {/* Block 03 — start to finish */}
      <ChecklistSplit
        id="start-to-finish"
        eyebrow="Design · install · support"
        heading={
          <>
            We handle your audio visual installation <span className="ds-accent-text">from start to finish</span>
          </>
        }
        lede={
          <p>
            {rt(
              "Prime Line AV is an audio visual installation company that designs the audio, video, control and connectivity systems in your building, then configures and tests them until they run as one. That removes the most common failure in AV projects: ==separate contractors who design in isolation and blame each other when the system does not work.==",
            )}
          </p>
        }
        listTitle="With us, every AV installation includes:"
        items={INCLUDED}
        cta={<CtaPair align="left" secondary={{ label: "Tell us about your space" }} />}
      />

      {/* Block 04 — installation services */}
      <section id="installation-services" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Installation services" title="We install AV systems built around your space" accent="built around your space">
            {rt("We provide full-service AV installation from start to finish, ==so all you have to do is press play.==")}
          </SectionHeader>
          <LinkCardGrid items={SERVICES} cols={4} />
        </div>
      </section>

      {/* Relevant gear: the LED walls, sound and displays we install, also available to rent */}
      <HomeShopSection
        categories={["led-screens", "sound-systems", "tv"]}
        header={
          <SectionHeader eyebrow="Need it for one event?" title="Rent the same gear we install" accent="the same gear">
            LED walls, sound systems and displays from our own inventory, available for a single event. Add what you need to your quote, and our team will confirm
            availability and <span className="hl">send you an itemized price.</span>
          </SectionHeader>
        }
      />

      {/* Block 05 — process */}
      <section id="process" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Our installation process" title="Here's how we take your AV project from plan to installation" accent="from plan to installation">
            {rt(
              "We make professional AV installation fast and simple, whether you're a church upgrading your sanctuary visuals or an office that needs a conference room working now. Here's ==our 7-step process, from consultation to implementation:==",
            )}
          </SectionHeader>
          <ProcessSteps steps={STEPS} />
        </div>
      </section>

      {/* Block 06 — why us */}
      <ReasonsSplit
        id="why-us"
        eyebrow="Why Prime Line AV"
        heading={
          <>
            Why choose Prime Line AV for <span className="ds-accent-text">audio visual installation</span>
          </>
        }
        reasons={REASONS}
      />

      {/* Block 07 — long-form */}
      <ProseSection
        id="nationwide"
        eyebrow="Need permanent AV installed in one or multiple locations?"
        heading={
          <>
            Prime Line AV is your trusted <span className="ds-accent-text">audio visual installation company</span> nationwide
          </>
        }
        paragraphs={PROSE.map((p) => rt(p))}
        image="/images/installations/video-wall.webp"
        imageAlt="Permanently installed LED video wall in a corporate lobby"
        cta={<CtaPair align="left" secondary={{ label: "Request a consultation" }} />}
      />

      {/* Block 08 — text reviews */}
      <WrittenReviewsSection header={<SectionHeader eyebrow="Client reviews" title="What clients say about working with us" accent="working with us" />} />

      {/* Block 09 — FAQ + call strip */}
      <FAQSection
        items={FAQ_ITEMS}
        header={<SectionHeader eyebrow="FAQ" title="FAQs about our audio visual installation service" accent="FAQs" />}
        after={<CallStrip className="mt-10" title="Still have questions?" subtitle="Ask us today!" />}
      />
    </div>
  )
}
