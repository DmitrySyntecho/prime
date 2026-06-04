"use client"

import { useRef } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Review {
  text: string
  name: string
  role: string
  source: "Google" | "G2"
}

// Placeholder written reviews — replace with verified G2 / Google pulls later.
const REVIEWS: Review[] = [
  { text: "Prime Line handled our 2,000-person conference flawlessly — LED walls, sound, and staging were dialed in and the crew was invisible in the best way.", name: "Jessica M.", role: "Event Director, Tech Summit", source: "Google" },
  { text: "Best AV partner in LA, hands down. They delivered a massive outdoor stage and full production on a tight timeline.", name: "David R.", role: "Brand Activation Lead", source: "G2" },
  { text: "From quote to teardown everything was professional. The LED video wall looked incredible on camera for our livestream.", name: "Priya S.", role: "Producer, Fashion Week", source: "Google" },
  { text: "We rent from Prime Line for every corporate gala. Reliable gear, on-site techs, zero surprises.", name: "Marcus T.", role: "Corporate Events Manager", source: "G2" },
  { text: "The team designed a sound system that filled the venue perfectly. Clients keep asking who did our AV.", name: "Elena K.", role: "Wedding Planner", source: "Google" },
  { text: "Outstanding service and top-tier equipment. They made our product launch feel like a flagship Apple event.", name: "Tom W.", role: "Marketing Director", source: "G2" },
]

export function WrittenReviewsSection({ heading = "What Our Clients Say" }: { heading?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" })
  }

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold tracking-[0.16em] uppercase"
              style={{
                background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
                border: "1px solid rgba(255,94,58,0.25)",
                color: "#FFB366",
              }}
            >
              <Star className="w-3.5 h-3.5" fill="currentColor" />
              Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {heading.split(" ").slice(0, -1).join(" ")}{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {heading.split(" ").slice(-1)}
              </span>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll("left")} className="p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:bg-[#FF2D6F]/15 transition-all" aria-label="Previous">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => scroll("right")} className="p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:bg-[#FF2D6F]/15 transition-all" aria-label="Next">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] md:w-[360px] snap-start rounded-2xl p-6 flex flex-col"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <Quote className="w-7 h-7 text-[#FF5E3A]/40 mb-3" />
              <div className="flex gap-0.5 mb-3">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} className="w-4 h-4 text-[#FFD24A]" fill="currentColor" />
                ))}
              </div>
              <p className="text-white/75 text-[14px] leading-relaxed flex-1">{r.text}</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                <div>
                  <div className="text-[14px] font-bold text-white">{r.name}</div>
                  <div className="text-[12px] text-white/45">{r.role}</div>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-1 rounded-full text-white/70"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  via {r.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
