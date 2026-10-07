import type React from "react"
// "As seen in" press strip. Placeholder publication names — swap for real logos/links later.
const PUBLICATIONS = ["Forbes", "TechCrunch", "Variety", "The Hollywood Reporter", "Billboard", "AdWeek", "Event Marketer", "BizBash"]

export function MediaMentionsSection({ heading = "As Seen In", header }: { heading?: string; header?: React.ReactNode }) {
  return (
    <section className="py-12 md:py-14 relative">
      <div className="max-w-7xl mx-auto px-4">
        {header ?? (
        <h2 className="reveal text-center text-[13px] md:text-sm font-semibold text-white/80 tracking-[0.18em] uppercase mb-8">
          {heading}
        </h2>
        )}
        <div className="reveal-stagger flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {PUBLICATIONS.map((p) => (
            <span
              key={p}
              className="text-[18px] md:text-[22px] font-black tracking-tight text-white/55 hover:text-white/85 transition-colors"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
