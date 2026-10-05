import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Icon3D, type Icon3DName } from "@/components/icon-3d"
import { SectionHeader, QuoteCTA } from "@/components/section-header"

type Service = {
  title: string
  href: string
  image: string
  icon: Icon3DName
  body: React.ReactNode
}

const SERVICES: Service[] = [
  {
    title: "AV Production",
    href: "/av-production/",
    image: "/images/services/full-av-card.webp",
    icon: "sound-console",
    body: "Our in-house crews run the staging, sound, video and lighting for your show, built around your program and your venue. One AV production team stays with you from load-in to strike.",
  },
  {
    title: "AV Rental",
    href: "/av-rental/",
    image: "/images/services/stage-rental-card.webp",
    icon: "flight-case",
    body: "Sound systems, LED walls, lighting and staging, delivered and set up for your event. Our AV rental crews test everything before doors open, and a technician can stay through the show.",
  },
  {
    title: "AV Installations",
    href: "/av-installations/",
    image: "/images/services/permanent-av-1.webp",
    icon: "installation",
    body: "We design and install permanent AV systems for commercial and residential spaces. Our audio visual installation service also includes documentation and staff training, so your team can run the new system on day one.",
  },
  {
    title: "Live Streaming Production",
    href: "/live-streaming-production/",
    image: "/images/events/hybrid-events.webp",
    icon: "live-stream",
    body: "From cameras and switching to graphics and the platform feed, our live streaming production covers the whole broadcast. We plan it with you before the event and run it live while it happens.",
  },
  {
    title: "Video Production",
    href: "/corporate-video-production/",
    image: "/images/events/film-production.webp",
    icon: "clapperboard",
    body: (
      <>
        Our crews film brand videos and full event coverage, edited and ready to post for your marketing team. Book{" "}
        <Link href="/corporate-video-production/" className="font-semibold text-white underline decoration-[#FF2D6F]/50 underline-offset-4 hover:decoration-[#FF2D6F]">
          corporate video production
        </Link>{" "}
        for the studio side or{" "}
        <Link href="/event-video-production/" className="font-semibold text-white underline decoration-[#FF2D6F]/50 underline-offset-4 hover:decoration-[#FF2D6F]">
          event video production
        </Link>{" "}
        for show day.
      </>
    ),
  },
  {
    title: "LED Walls for Sale",
    href: "/store/led-walls/",
    image: "/images/services/led-screen-card.webp",
    icon: "led-billboard",
    body: "Indoor and outdoor LED video walls for sale, perfect as a billboard or digital signage for your business. Every LED wall comes with our 12-month warranty, and we handle everything from site survey to installation, with content management on request.",
  },
]

/** Block 04 — the six service lines, each linking to its hub page. */
export function HomeServicesSection() {
  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="What we do" title="End-to-end audio visual services nationwide" accent="audio visual services">
          Our AV company plans and operates the technical side of your event, including AV equipment rental, permanent AV installation, live streaming and LED walls,
          anywhere in the United States. You can book the whole package or pick only the service you need.
        </SectionHeader>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="keep-original group relative flex flex-col overflow-hidden rounded-[22px] border border-[#FF2D6F]/20 bg-[#0a0a0a] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#FF2D6F]/45"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)" }}
            >
              <Link href={s.href} className="relative block aspect-[16/10] overflow-hidden" aria-label={s.title} tabIndex={-1}>
                <Image src={s.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
              </Link>
              <div className="relative flex flex-1 flex-col px-5 pb-6 sm:px-6">
                <div
                  className="-mt-12 mb-3 grid h-[68px] w-[68px] place-items-center rounded-[18px] backdrop-blur-md"
                  style={{ background: "radial-gradient(ellipse 80% 80% at 50% 30%, rgba(255,45,111,0.32), rgba(10,10,10,0.75) 75%)", border: "1px solid rgba(255,45,111,0.35)" }}
                >
                  <Icon3D name={s.icon} size={58} className="drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105" />
                </div>
                <h3 className="mb-2 text-[20px] font-bold leading-tight tracking-[-0.01em] text-white">
                  <Link href={s.href} className="transition-colors hover:text-[#FF2D6F]">
                    {s.title}
                  </Link>
                </h3>
                <p className="mb-5 flex-1 text-pretty text-[14px] leading-[1.6] text-white/65">{s.body}</p>
                <Link href={s.href} className="mt-auto inline-flex items-center gap-2 self-start text-[14px] font-bold text-[#FF2D6F] transition-[gap] hover:gap-3">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <QuoteCTA className="mt-12" />
      </div>
    </section>
  )
}
