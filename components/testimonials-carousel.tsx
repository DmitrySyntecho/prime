"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import Image from "next/image"
import MuxPlayer from "@mux/mux-player-react"

interface Testimonial {
  name: string
  role: string
  event: string
  muxPlaybackId: string
}

const testimonials: Testimonial[] = [
  {
    name: "Lauren Selman",
    role: "Client",
    event: "LCFA Testimonial",
    muxPlaybackId: "r9kWCyYADL4UiiS24LHr7WhsFKCU35NaRoGBE9KKjfw",
  },
  {
    name: "Anaheim Korean",
    role: "Business Forum",
    event: "Korean Business Forum",
    muxPlaybackId: "k02JdrX3uUL3vaLWVwQgwKKAr3zzs02UjfS024lZegwTUs",
  },
  {
    name: "Akansha",
    role: "Fashion Event Organizer",
    event: "Fashion Show Event",
    muxPlaybackId: "V5ohVqK8gSzpZVQVoBZNaBWdBZh7KS3MH902G36B00nPc",
  },
  {
    name: "Brandon Dawson",
    role: "Business Owner, Thought Leader",
    event: "Cardone Ventures",
    muxPlaybackId: "iC1cjBbxH3u016nHxWxl4D9jNSGAsClT00D01ZakHWstgI",
  },
  {
    name: "Miles Canares",
    role: "Co-founder",
    event: "Family Style Fest 2024",
    muxPlaybackId: "w028pMIX89Uq1sxto1b3u8Nxc8dVXFAMFTxUXSHnvUBA",
  },
  {
    name: "Gaby",
    role: "Event Producer",
    event: "McRib Campaign",
    muxPlaybackId: "SHzN01QG01Onqnn741ATcD02sbFFJCj7dE715EAYQjBg500",
  },
]

function MuxVideoCard({ testimonial }: { testimonial: Testimonial }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="flex-shrink-0 w-[260px] md:w-[280px] relative">
      <div
        className="relative w-full overflow-hidden rounded-[18px] border border-white/[0.08] bg-black"
        style={{
          aspectRatio: "9 / 16",
          boxShadow: "0 20px 40px -12px rgba(0,0,0,0.5)",
        }}
      >
        {isPlaying && (
          <MuxPlayer
            playbackId={testimonial.muxPlaybackId}
            autoPlay="any"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        )}
        {!isPlaying && (
          <>
            <Image
              src={`https://image.mux.com/${testimonial.muxPlaybackId}/thumbnail.jpg?time=1&width=400`}
              alt={`${testimonial.name} testimonial thumbnail`}
              fill
              className="object-cover"
              sizes="280px"
              quality={80}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
              }}
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Play video"
            >
              <div
                className="relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                  boxShadow: "0 16px 48px -8px rgba(255,45,111,0.6)",
                }}
              >
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(255,45,111,0.25)" }}
                />
                <Play className="w-5 h-5 fill-white text-white ml-0.5" />
              </div>
            </button>
          </>
        )}
      </div>
      <div className="mt-3 px-1">
        <h3 className="text-white font-semibold text-[14px]">{testimonial.event}</h3>
        <p className="text-[#FF2D6F] text-[13px] font-medium">{testimonial.name}</p>
        <p className="text-white/45 text-[11px]">{testimonial.role}</p>
      </div>
    </div>
  )
}

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 max-w-5xl mx-auto px-2">
          <span className="ds-pill mb-5">
            <span className="dot" />
            Testimonials
          </span>
          <h2 className="text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.025em] leading-[1.1]">
            <span className="text-white">Real Clients. Real Events.</span>{" "}
            <span className="ds-accent-text whitespace-nowrap">Real Results.</span>
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white/[0.04] border border-white/[0.10] hover:bg-[#FF2D6F]/10 hover:border-[#FF2D6F]/30 rounded-[12px] p-2.5 backdrop-blur-md hidden md:block transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 px-2 md:px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <MuxVideoCard key={index} testimonial={testimonial} />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white/[0.04] border border-white/[0.10] hover:bg-[#FF2D6F]/10 hover:border-[#FF2D6F]/30 rounded-[12px] p-2.5 backdrop-blur-md hidden md:block transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
