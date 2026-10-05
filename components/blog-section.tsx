import type React from "react"
import Link from "next/link"
import { RESOURCES } from "@/lib/sitemap-data"
import { BookOpen, ArrowRight } from "lucide-react"

const CATEGORY_LABEL: Record<string, string> = {
  pricing: "Pricing",
  guide: "Guide",
  howto: "How-To",
  planning: "Planning",
  technical: "Technical",
}

/** Blog / articles block — cards from RESOURCES (link to /resources/[slug]). */
export function BlogSection({ heading = "From Our Blog", limit = 3, header }: { heading?: string; limit?: number; header?: React.ReactNode }) {
  const items = RESOURCES.slice(0, limit)

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          {header ?? (
          <div>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold tracking-[0.16em] uppercase"
              style={{
                background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
                border: "1px solid rgba(255,94,58,0.25)",
                color: "#FFB366",
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Resources
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
          )}
        </div>

        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((r) => (
            // wrapper takes the reveal animation so the card's hover lift still works
            <div key={r.slug}>
            <Link
              href={`/resources/${r.slug}`}
              className="fx-spot group h-full rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <span
                className="self-start text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4"
                style={{ background: "rgba(255,45,111,0.15)", color: "#FF5E3A" }}
              >
                {CATEGORY_LABEL[(r as { category?: string }).category || ""] || "Article"}
              </span>
              <h3 className="text-[17px] font-bold text-white leading-snug group-hover:text-[#FF2D6F] transition-colors flex-1">
                {r.headline}
              </h3>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#FF5E3A]">
                Read more
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
