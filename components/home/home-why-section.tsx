import Link from "next/link"
import { Icon3D, type Icon3DName } from "@/components/icon-3d"
import { QuoteCTA } from "@/components/section-header"

type Reason = { title: string; icon: Icon3DName; body: React.ReactNode }

const REASONS: Reason[] = [
  {
    title: "One AV team, one contract",
    icon: "walkie-talkie",
    body: (
      <>
        Production, equipment rental, installation and LED walls come from the same company. You brief one team with one dedicated account manager, and{" "}
        <span className="hl">one contract covers the whole scope.</span>
      </>
    ),
  },
  {
    title: "Our own equipment inventory",
    icon: "flight-case",
    body: (
      <>
        We keep our own inventory and warehouse of top brand AV equipment. Your gear is reserved and prepped, <span className="hl">ready to deploy the moment your event is booked.</span>
      </>
    ),
  },
  {
    title: "In-house technicians on site",
    icon: "headset",
    body: (
      <>
        Our own technicians build the system and stay through your event. <span className="hl">The person who set up your AV is the same person standing next to it during the show.</span>
      </>
    ),
  },
  {
    title: "Coast-to-coast service",
    icon: "location-pin",
    body: (
      <>
        We staff events in every US state through our local crews, so your show gets <span className="hl">the same standard in any city.</span> Check your city on our{" "}
        <Link href="/locations" className="font-semibold text-white underline decoration-[#FF2D6F]/50 underline-offset-4 hover:decoration-[#FF2D6F]">
          locations page
        </Link>{" "}
        to see if we service your area.
      </>
    ),
  },
  {
    title: "Free quote, no obligation",
    icon: "stopwatch",
    body: (
      <>
        Tell us about your event, and we&apos;ll give you <span className="hl">an itemized quote in as fast as 30 minutes.</span> That speed means you can lock in decisions for your
        client sooner.
      </>
    ),
  },
]

/** Block 07 — sticky heading column + reason rows with 3D icons. */
export function HomeWhySection() {
  return (
    <section id="why-us" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="reveal-left lg:sticky lg:top-28 lg:self-start">
          <span className="ds-pill mb-5">
            <span className="dot" />
            Why choose Prime Line AV
          </span>
          <h2 className="text-balance text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white md:text-[42px]">
            Here&apos;s why <span className="ds-accent-text">nothing goes wrong</span> at our events
          </h2>
          <p className="mt-5 max-w-[540px] text-pretty text-[17px] font-medium leading-[1.65] text-white/90 md:text-[18px]">
            Most event problems start with multiple vendors who never planned the show together. At Prime Line AV, you&apos;ll get professional AV services from one team: <span className="hl">the people who plan your event are the people who run it.</span>
          </p>
          <div className="mt-8 hidden lg:block">
            <QuoteCTA className="!justify-start" />
          </div>
        </div>

        <div className="reveal-stagger grid gap-4">
          {REASONS.map((r, i) => (
            <article
              key={r.title}
              className="fx-spot group flex items-start gap-4 rounded-[24px] border border-white/10 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#FF2D6F]/30 md:gap-5 md:p-6"
              style={{
                background:
                  i === 0
                    ? "linear-gradient(135deg, rgba(255,45,111,0.16), rgba(255,94,58,0.08))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <Icon3D name={r.icon} size={64} className="shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105" />
              <div className="min-w-0">
                <h3 className="text-[20px] font-extrabold leading-tight text-white">{r.title}</h3>
                <p className="mt-2.5 text-pretty text-[15.5px] leading-[1.7] text-white/90">{r.body}</p>
              </div>
            </article>
          ))}
          <div className="lg:hidden">
            <QuoteCTA className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
