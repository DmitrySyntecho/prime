"use client"

import { ArrowRight } from "lucide-react"
import { Icon3D } from "@/components/icon-3d"
import { useCity } from "@/lib/city-context"
import {
  Monitor,
  Volume2,
  Lightbulb,
  Mic,
  Projector,
  Tv,
  Video,
  LayoutGrid,
  Box,
  Columns,
  Package,
  Radio,
  Palette,
  Music,
} from "lucide-react"

const categories = [
  { name: "LED Screen & Video Wall Rentals", icon: "led-wall" as const, slug: "led-walls" },
  { name: "Audio System Rental", icon: "speaker" as const, slug: "audio-systems" },
  { name: "Event Lighting Rental", icon: "moving-head" as const, slug: "lighting" },
  { name: "Microphones & Audio Accessories", icon: "microphone" as const, slug: "microphones" },
  { name: "Projectors & Screens", icon: "projector" as const, slug: "projectors" },
  { name: "TV & Monitor Rentals", icon: "tv-display" as const, slug: "tv-monitors" },
  { name: "Video Production & Switching Gear", icon: "live-camera" as const, slug: "video-production" },
  { name: "Stage & Platform Rentals", icon: "stage" as const, slug: "staging" },
  { name: "Truss & Rigging Rentals", icon: "stage" as const, slug: "truss-rigging" },
  { name: "Pipe & Drape Rentals", icon: "pipe-drape" as const, slug: "pipe-drape" },
  { name: "Full AV Production Packages", icon: "flight-case" as const, slug: "full-production" },
  { name: "Live Streaming & Hybrid Packages", icon: "live-stream" as const, slug: "live-streaming" },
  { name: "Event Design & 3D Rendering Services", icon: "render-3d" as const, slug: "event-design" },
  { name: "DJ Equipment Rentals", icon: "dj-deck" as const, slug: "dj-equipment" },
]

export function RentalCategoriesSection() {
  const city = useCity()
  const openQuote = () => {
    document.dispatchEvent(new CustomEvent("openQuoteForm"))
  }

  return (
    <section id="rentals" className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="ds-pill mb-5">
            <span className="dot" />
            Equipment Rentals
          </span>
          <h2 className="text-[32px] md:text-[44px] lg:text-[48px] font-extrabold tracking-[-0.025em] leading-[1.18] text-white mb-4">
            AV Equipment <span className="ds-accent-text">Rental Categories</span> in {city}
          </h2>
          <p className="text-white/55 text-[15px] md:text-[17px]">
            Find the right AV equipment fast — LED walls, staging, audio systems, lighting, pipe &amp; drape, and full
            AV production available across {city}.
          </p>
        </div>

        {/* Flex-wrap with center justify so the last (partial) row is also centered */}
        <div className="reveal-stagger flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
          {categories.map((category) => {
            return (
              <button
                key={category.slug}
                type="button"
                onClick={openQuote}
                className="fx-spot group relative flex items-center justify-between gap-3 p-5 rounded-[14px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-md hover:border-[#FF2D6F]/30 hover:bg-[#FF2D6F]/[0.04] transition-all duration-300 cursor-pointer overflow-hidden text-left w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] xl:w-[calc(25%-0.75rem)]"
              >
                <div className="relative flex items-center gap-3.5 min-w-0">
                  <Icon3D name={category.icon} size={48} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110" />
                  <span className="text-[13px] font-semibold text-white/85 group-hover:text-white transition-colors leading-tight">
                    {category.name}
                  </span>
                </div>

                <div className="relative flex-shrink-0 w-8 h-8 rounded-[10px] bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-[#FF2D6F]/15 group-hover:border-[#FF2D6F]/30 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#FF2D6F] group-hover:translate-x-0.5 transition-all duration-300" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
