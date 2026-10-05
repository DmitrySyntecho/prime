"use client"

import { ArrowUpRight, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"

const eventTypes = [
  { title: "Experiential Marketing", tag: "Brand Activations", id: "experiential", image: "/images/events/experiential-marketing.webp" },
  { title: "Corporate", tag: "Conferences & Summits", id: "corporate", image: "/images/events/corporate.webp" },
  { title: "Fashion Shows", tag: "Runway & Showrooms", id: "fashion-show", image: "/images/events/fashion-shows.webp" },
  { title: "Trade Shows", tag: "Expos & Booths", id: "trade-show", image: "/images/events/trade-shows.webp" },
  { title: "Weddings", tag: "Celebrations", id: "private", image: "/images/events/weddings.webp" },
  { title: "Festivals", tag: "Live Music & Stages", id: "festival", image: "/images/events/festivals.webp" },
  { title: "Virtual/Hybrid Events", tag: "Streaming & Broadcast", id: "other", image: "/images/events/hybrid-events.webp" },
  { title: "Private", tag: "VIP & Galas", id: "private", image: "/images/events/private.webp" },
  { title: "Film Production", tag: "Studio & Sets", id: "studio", image: "/images/events/film-production.webp" },
  { title: "Grand Opening", tag: "Launches & Ribbon-Cuttings", id: "brand-activation", image: "/images/events/grand-opening.webp" },
]

export function EventTypesSection() {
  const pathname = usePathname()
  const serviceSlug = pathname?.startsWith("/services/") ? pathname.split("/")[2] : undefined

  const openQuote = (eventTypeId?: string) =>
    document.dispatchEvent(new CustomEvent("openQuoteForm", {
      detail: { ...(eventTypeId ? { eventTypeId } : {}), ...(serviceSlug ? { serviceSlug } : {}) },
    }))
  return (
    <section id="events" className="py-24 md:py-28 relative overflow-hidden">
      <div id="event-types" className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="ds-pill mb-5">
            <span className="dot" />
            Event Types
          </span>
          <h2 className="text-[32px] md:text-[44px] lg:text-[50px] font-extrabold tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Every Format. <span className="ds-accent-text">Every Industry.</span>
          </h2>
          <p className="text-white/55 text-[16px] md:text-[17px]">
            We partner with event producers, planners, and marketing agencies to deliver AV support across every event
            format and industry.
          </p>
        </div>

        <div className="reveal-stagger grid grid-cols-2 lg:grid-cols-5 gap-3">
          {eventTypes.map((event) => (
            <button
              key={event.title}
              type="button"
              onClick={() => openQuote(event.id)}
              aria-label={`Get a quote for ${event.title}`}
              className="fx-spot group relative aspect-[3/4] rounded-[16px] overflow-hidden border border-white/[0.08] cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-[#FF2D6F]/30 text-left"
            >
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03070a]/95 via-[#03070a]/55 to-[#03070a]/15 transition-all duration-500 group-hover:from-[#7C2D5A]/92 group-hover:via-[#03070a]/55" />

              {/* Hover overlay with "Get a Quote" CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.06em] uppercase text-white"
                  style={{
                    background: "linear-gradient(135deg, #FF2D6F, #FF5E3A)",
                    boxShadow: "0 8px 22px -6px rgba(255,45,111,0.55)",
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  Get a Quote
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="inline-block px-2 py-0.5 rounded-md bg-[#FF2D6F] text-white text-[9px] font-extrabold tracking-[0.08em] uppercase mb-2">
                  {event.tag}
                </span>
                <h3 className="text-white text-[13px] md:text-[14px] font-bold leading-tight">{event.title}</h3>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => openQuote()}
            className="inline-flex items-center gap-1.5 text-white hover:text-[#FF2D6F] transition-colors font-semibold text-sm"
          >
            Don&apos;t see your event? Get a Quote
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
