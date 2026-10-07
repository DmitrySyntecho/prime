import Link from "next/link"
import { SectionHeader, QuoteCTA } from "@/components/section-header"
import { LinkCardGrid, type LinkCard } from "@/components/blocks/link-card-grid"

const SERVICES: LinkCard[] = [
  {
    title: "AV Production",
    href: "/av-production",
    image: "/images/services/full-av-card.webp",
    icon: "sound-console",
    body: (
      <>
        Our in-house crews run the staging, sound, video and lighting for your show, built around your program and your venue.{" "}
        <span className="hl">One AV production team stays with you from load-in to strike.</span>
      </>
    ),
  },
  {
    title: "AV Rental",
    href: "/av-rental",
    image: "/images/services/stage-rental-card.webp",
    icon: "flight-case",
    body: (
      <>
        Sound systems, LED walls, lighting and staging, delivered and set up for your event. Our AV rental crews <span className="hl">test everything before doors open</span>, and a
        technician can stay through the show.
      </>
    ),
  },
  {
    title: "AV Installations",
    href: "/av-installations",
    image: "/images/services/permanent-av-1.webp",
    icon: "installation",
    body: (
      <>
        We design and install permanent AV systems for commercial and residential spaces. Our audio visual installation service also includes documentation and staff
        training, so <span className="hl">your team can run the new system on day one.</span>
      </>
    ),
  },
  {
    title: "Live Streaming Production",
    href: "/live-streaming-production",
    image: "/images/events/hybrid-events.webp",
    icon: "live-stream",
    body: (
      <>
        From cameras and switching to graphics and the platform feed, our live streaming production covers the whole broadcast.{" "}
        <span className="hl">We plan it with you before the event and run it live while it happens.</span>
      </>
    ),
  },
  {
    title: "Video Production",
    href: "/corporate-video-production",
    image: "/images/events/film-production.webp",
    icon: "clapperboard",
    body: (
      <>
        Our crews film brand videos and full event coverage, edited and ready to post for your marketing team. Book{" "}
        <Link href="/corporate-video-production" className="font-semibold text-white underline decoration-[#FF2D6F]/50 underline-offset-4 hover:decoration-[#FF2D6F]">
          corporate video production
        </Link>{" "}
        for the studio side or{" "}
        <Link href="/event-video-production" className="font-semibold text-white underline decoration-[#FF2D6F]/50 underline-offset-4 hover:decoration-[#FF2D6F]">
          event video production
        </Link>{" "}
        for show day.
      </>
    ),
  },
  {
    title: "LED Walls for Sale",
    href: "/store/led-walls",
    image: "/images/services/led-screen-card.webp",
    icon: "led-billboard",
    body: (
      <>
        Indoor and outdoor LED video walls for sale, perfect as a billboard or digital signage for your business. <span className="hl">Every LED wall comes with our 12-month warranty</span>,
        and we handle everything from site survey to installation, with content management on request.
      </>
    ),
  },
]

/** Block 04 — the six service lines, each linking to its hub page. */
export function HomeServicesSection() {
  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="What we do" title="End-to-end audio visual services nationwide" accent="audio visual services">
          Our AV company plans and operates the technical side of your event, including AV equipment rental, permanent AV installation, live streaming and LED walls,
          anywhere in the United States. <span className="hl">You can book the whole package or pick only the service you need.</span>
        </SectionHeader>

        <LinkCardGrid items={SERVICES} />

        <QuoteCTA className="mt-12" />
      </div>
    </section>
  )
}
