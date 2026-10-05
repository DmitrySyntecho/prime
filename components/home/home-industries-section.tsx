import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact"
import { SectionHeader } from "@/components/section-header"
import { Icon3D } from "@/components/icon-3d"

const linkCls = "font-semibold text-white underline decoration-[#FF2D6F]/50 underline-offset-4 transition-colors hover:decoration-[#FF2D6F]"

type Industry = { title: string; image: string; body: React.ReactNode }

// Copy from the homepage deck. Inline anchors point at the service hubs this
// site has (the /industry/* pages don't exist here yet).
const INDUSTRIES: Industry[] = [
  {
    title: "Corporate & Marketing Events",
    image: "/images/events/corporate.webp",
    body: (
      <>
        We handle the AV for town halls, sales kickoffs, product launches and grand openings across the US. Our{" "}
        <Link href="/av-production/" className={linkCls}>AV production</Link> crews build the setup around your agenda and your presenters, and the show is rehearsed before your first speaker steps up.
      </>
    ),
  },
  {
    title: "Conferences & Trade Shows",
    image: "/images/events/trade-shows.webp",
    body: (
      <>
        From the main stage to breakout rooms and booth spaces, we power up conferences and trade shows of any size. Our <Link href="/av-rental/" className={linkCls}>AV rental</Link>{" "}
        service brings the sound, screens, lighting and staging, on the venue&apos;s schedule from load-in to pack-out.
      </>
    ),
  },
  {
    title: "Concerts & Festivals",
    image: "/images/events/festivals.webp",
    body: (
      <>
        Outdoor stages and touring acts call for concert-grade equipment and crews who have worked festival grounds before. We provide the{" "}
        <Link href="/av-rental/" className={linkCls}>sound, lighting, staging and LED walls</Link>, sized for open air and fast set changes.
      </>
    ),
  },
  {
    title: "Weddings & Private Events",
    image: "/images/events/weddings.webp",
    body: (
      <>
        For weddings and private events, we bring the same equipment and crews as our corporate shows, sized to your venue. Our{" "}
        <Link href="/event-video-production/" className={linkCls}>event video production</Link> team can also film the event as it happens.
      </>
    ),
  },
  {
    title: "Broadcast & Streaming",
    image: "/images/events/hybrid-events.webp",
    body: (
      <>
        We produce broadcasts and hybrid events built around the online viewer. One crew runs both the room and the{" "}
        <Link href="/live-streaming-production/" className={linkCls}>live streaming production</Link>, and the stream is planned as part of the show from the first call.
      </>
    ),
  },
]

/** Block 06 — industries + call strip. */
export function HomeIndustriesSection() {
  return (
    <section id="industries" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Industries we serve" title="From corporate events to live entertainment, we know AV" accent="live entertainment">
          We are a full-service AV company who can run the AV for any event at any venue in the US. Whether you&apos;re setting up a small boardroom meeting or filling a stadium stage,{" "}
          <strong className="font-semibold text-white">we bring the right equipment and the right crew</strong>.
        </SectionHeader>

        {/* 2 large + 3 regular on desktop: the first two rows read as a bento, not a uniform grid. */}
        <div className="grid gap-4 md:grid-cols-6 lg:gap-5">
          {INDUSTRIES.map((ind, i) => (
            <article
              key={ind.title}
              className={`keep-original group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[22px] border border-white/[0.08] transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-[#FF2D6F]/30 ${
                i < 2 ? "md:col-span-3 md:min-h-[400px]" : "md:col-span-2"
              }`}
            >
              <Image src={ind.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03070a] via-[#03070a]/75 to-[#03070a]/10 transition-colors duration-500 group-hover:from-[#1a0614]" />
              <div className="relative p-5 md:p-6">
                <h3 className="mb-2 text-balance text-[20px] font-bold leading-tight tracking-[-0.01em] text-white md:text-[22px]">{ind.title}</h3>
                <p className="text-pretty text-[14px] leading-[1.6] text-white/70">{ind.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-5 overflow-hidden rounded-[24px] border border-white/10 px-6 py-6 text-center md:flex-row md:px-9 md:text-left"
          style={{ background: "linear-gradient(135deg, rgba(255,45,111,0.16), rgba(255,94,58,0.08))", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Icon3D name="headset" size={64} className="shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)]" />
            <div>
              <p className="text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-white md:text-[26px]">Ready to discuss your event?</p>
              <p className="mt-1 text-[15px] text-white/65">Talk to us!</p>
            </div>
          </div>
          <a
            href={PHONE_TEL}
            suppressHydrationWarning
            className="inline-flex shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl px-7 py-3 text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", boxShadow: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)" }}
          >
            <span className="inline-flex items-center gap-2 text-[15px] font-extrabold">
              <Phone className="h-4 w-4" /> Click here to call now
            </span>
            <span suppressHydrationWarning className="font-mono text-[12px] font-semibold tabular-nums text-white/85">
              {PHONE_DISPLAY}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
