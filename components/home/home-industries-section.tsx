import Link from "next/link"
import { SectionHeader } from "@/components/section-header"
import { ImageBento, type BentoItem } from "@/components/blocks/image-bento"
import { CallStrip } from "@/components/blocks/call-strip"

const linkCls = "font-semibold text-white underline decoration-[#FF2D6F]/50 underline-offset-4 transition-colors hover:decoration-[#FF2D6F]"

// Copy from the homepage deck. Inline anchors point at the service hubs this
// site has (the /industry/* pages don't exist here yet).
const INDUSTRIES: BentoItem[] = [
  {
    title: "Corporate & Marketing Events",
    image: "/images/events/corporate.webp",
    body: (
      <>
        We handle the AV for town halls, sales kickoffs, product launches and grand openings across the US. Our{" "}
        <Link href="/av-production" className={linkCls}>AV production</Link> crews build the setup around your agenda and your presenters, and the show is rehearsed before your first speaker steps up.
      </>
    ),
  },
  {
    title: "Conferences & Trade Shows",
    image: "/images/events/trade-shows.webp",
    body: (
      <>
        From the main stage to breakout rooms and booth spaces, we power up conferences and trade shows of any size. Our <Link href="/av-rental" className={linkCls}>AV rental</Link>{" "}
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
        <Link href="/av-rental" className={linkCls}>sound, lighting, staging and LED walls</Link>, sized for open air and fast set changes.
      </>
    ),
  },
  {
    title: "Weddings & Private Events",
    image: "/images/events/weddings.webp",
    body: (
      <>
        For weddings and private events, we bring the same equipment and crews as our corporate shows, sized to your venue. Our{" "}
        <Link href="/event-video-production" className={linkCls}>event video production</Link> team can also film the event as it happens.
      </>
    ),
  },
  {
    title: "Broadcast & Streaming",
    image: "/images/events/hybrid-events.webp",
    body: (
      <>
        We produce broadcasts and hybrid events built around the online viewer. One crew runs both the room and the{" "}
        <Link href="/live-streaming-production" className={linkCls}>live streaming production</Link>, and the stream is planned as part of the show from the first call.
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
          <span className="hl">we bring the right equipment and the right crew</span>.
        </SectionHeader>

        <ImageBento items={INDUSTRIES} />
        <CallStrip className="mt-10" title="Ready to discuss your event?" subtitle="Talk to us!" />
      </div>
    </section>
  )
}
