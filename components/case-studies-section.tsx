"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { Play, ChevronLeft, ChevronRight, ArrowRight, X } from "lucide-react"
import MuxPlayer from "@mux/mux-player-react"
import { PHONE_TEL } from "@/lib/contact"

const MUX_TIKTOK_ID = "KfJ00XD74CFG01AI5eclQ58q439V3U004sBcuSENC2A9IU"
const MUX_MIAMI_ID = "a1VM513vYaAw3u8rBfLB8bG4MMma2FbIFN2YGepuxiA"
const MUX_LCA_ID = "02w1uQtRVTaeIYfYMvYnHvIFZbFF19lAyoDYU00M00fGHk"
const MUX_AMAGI_ID = "BrD9vKSat02duCjNodPZ00a02ZRc5QfKAno007TIKGF5vOU"
const MUX_RAMP_ID = "xIFaCY1GdKzQxjtm01L87JqoPAKob3YBscDUzSiSF1300"
const MUX_ASIAN_FLAME_ID = "Io8Bi00jo3qftxjB01L1qWs7TPQuOhKBxfi02ecvwEl2X00"

const caseStudies = [
  {
    id: "tiktok-shop-summit-2026",
    title: "TikTok Shop Summit 2026",
    location: "Los Angeles Convention Center",
    description:
      "Full-scale AV production for TikTok's flagship creator summit — main stage, exhibition floor, LED walls, lighting design, and live streaming for 5,000+ attendees.",
    muxId: MUX_TIKTOK_ID,
    thumbnail: `https://image.mux.com/${MUX_TIKTOK_ID}/thumbnail.jpg?time=30&width=800`,
    gallery: [
      { src: "/images/case-studies/tiktok-1.webp", alt: "TikTok Shop Summit main stage presentation" },
      { src: "/images/case-studies/tiktok-2.webp", alt: "Summit stage setup with disco ball and lighting" },
      { src: "/images/case-studies/tiktok-3.webp", alt: "TikTok Shop Summit exhibition floor" },
      { src: "/images/case-studies/tiktok-4.webp", alt: "Speaker presenting TikTok Shop ecosystem milestones" },
      { src: "/images/case-studies/tiktok-5.webp", alt: "L-Acoustics speaker array setup" },
      { src: "/images/case-studies/tiktok-6.webp", alt: "Lighting console operator at work" },
    ],
  },
  {
    id: "miami-hotel-corporate-summit",
    title: "IDB Group Corporate Summit",
    location: "Intercontinental Miami",
    description:
      "Full AV production for an international corporate summit featuring LED video walls, professional staging with truss rigging, dynamic blue and magenta lighting design, and complete audio-visual support for executive panel discussions.",
    muxId: MUX_MIAMI_ID,
    thumbnail: `https://image.mux.com/${MUX_MIAMI_ID}/thumbnail.jpg?time=5&width=800`,
    gallery: [
      { src: "/images/case-studies/miami-1.webp", alt: "IDB Group main stage with LED wall" },
      { src: "/images/case-studies/miami-2.webp", alt: "Conference session with blue lighting" },
      { src: "/images/case-studies/miami-3.webp", alt: "Panel discussion on stage" },
      { src: "/images/case-studies/miami-4.webp", alt: "LED wall testing with crew" },
      { src: "/images/case-studies/miami-5.webp", alt: "Truss rigging and lighting setup" },
      { src: "/images/case-studies/miami-6.webp", alt: "Moving head lights preparation" },
    ],
  },
  {
    id: "last-chance-for-animals-gala",
    title: "Last Chance for Animals Gala",
    location: "Los Angeles",
    description:
      "Full-scale AV production for Last Chance for Animals' 40th anniversary gala featuring main stage with truss rigging, moving head lighting with red and green accent lights, outdoor LED video walls, live band performance, and elegant table setup for 300+ guests.",
    muxId: MUX_LCA_ID,
    thumbnail: `https://image.mux.com/${MUX_LCA_ID}/thumbnail.jpg?time=5&width=800`,
    gallery: [
      { src: "/images/case-studies/lca-1.webp", alt: "LCA gala live performance with colorful stage lighting" },
      { src: "/images/case-studies/lca-2.webp", alt: "Crew installing LED video screen on truss structure" },
      { src: "/images/case-studies/lca-3.webp", alt: "Outdoor gala dinner event with band on stage" },
      { src: "/images/case-studies/lca-4.webp", alt: "Main stage with large video display during presentation" },
      { src: "/images/case-studies/lca-5.webp", alt: "Gala crowd watching outdoor LED video content" },
      { src: "/images/case-studies/lca-6.webp", alt: "Main stage facade at night with LCA branding and truss lighting" },
    ],
  },
  {
    id: "amagi-fast-conference",
    title: "Amagi FAST Conference",
    location: "Los Angeles",
    description:
      "Full AV production for Amagi's FAST Conference 2024 featuring massive LED video wall with gradient branding, 3D stage letters, multi-camera live production, Allen & Heath audio mixing, breakout room setups, and professional lighting design.",
    muxId: MUX_AMAGI_ID,
    thumbnail: `https://image.mux.com/${MUX_AMAGI_ID}/thumbnail.jpg?time=5&width=800`,
    gallery: [
      { src: "/images/case-studies/amagi-1.webp", alt: "Amagi breakout room setup with podium and displays" },
      { src: "/images/case-studies/amagi-2.webp", alt: "Keynote speaker on main stage with IMAG screens" },
      { src: "/images/case-studies/amagi-3.webp", alt: "Crew installing LED panels on truss" },
      { src: "/images/case-studies/amagi-4.webp", alt: "Live camera operation with multi-cam monitors" },
      { src: "/images/case-studies/amagi-5.webp", alt: "Main stage LED wall with gradient FAST branding" },
      { src: "/images/case-studies/amagi-6.webp", alt: "Allen & Heath audio mixing console during session" },
    ],
  },
  {
    id: "ramp-tailgate-bts",
    title: "Ramp Tailgate BTS",
    location: "Los Angeles",
    description:
      "Behind-the-scenes production for Ramp's branded tailgate activation — full staging, lighting design, sound reinforcement, and on-site camera coverage capturing every moment of the outdoor fan experience.",
    muxId: MUX_RAMP_ID,
    thumbnail: `https://image.mux.com/${MUX_RAMP_ID}/thumbnail.jpg?time=5&width=800`,
    gallery: [
      { src: "/images/case-studies/ramp-1.webp", alt: "Ramp Tailgate activation behind-the-scenes setup" },
      { src: "/images/case-studies/ramp-2.webp", alt: "Outdoor staging and rigging during build" },
      { src: "/images/case-studies/ramp-3.webp", alt: "Branded production area with Ramp signage" },
      { src: "/images/case-studies/ramp-4.webp", alt: "Lighting and audio gear positioned around the event" },
      { src: "/images/case-studies/ramp-5.webp", alt: "Crew capturing live footage during the activation" },
      { src: "/images/case-studies/ramp-6.webp", alt: "Tailgate brand experience in full production" },
    ],
  },
  {
    id: "asian-flame-bts",
    title: "Asian Flame BTS",
    location: "Los Angeles",
    description:
      "Behind-the-scenes production for the Asian Hall of Fame 20th Anniversary Gala — full AV build including stage, truss rigging, LED video wall, lighting design with moving heads, live band support, and on-site crew coverage across the ornate ballroom.",
    muxId: MUX_ASIAN_FLAME_ID,
    thumbnail: `https://image.mux.com/${MUX_ASIAN_FLAME_ID}/thumbnail.jpg?time=5&width=800`,
    gallery: [
      { src: "/images/case-studies/asian-flame-1.webp", alt: "Live band performance on stage with 20th anniversary branding" },
      { src: "/images/case-studies/asian-flame-2.webp", alt: "Ballroom wide shot with LED wall and feather centrepieces" },
      { src: "/images/services/lighting-rental-card.webp", alt: "Professional lighting equipment setup for live event production" },
      { src: "/images/case-studies/asian-flame-4.webp", alt: "Empty grand ballroom during load-in" },
      { src: "/images/case-studies/asian-flame-5.webp", alt: "Crew rigging truss inside the ornate venue" },
      { src: "/images/case-studies/asian-flame-6.webp", alt: "Technician focusing follow-spot lights on the balcony rail" },
    ],
  },
]

function PlayButton({ size = "lg" }: { size?: "lg" | "md" }) {
  const dim = size === "lg" ? "w-20 h-20" : "w-14 h-14"
  const icon = size === "lg" ? "w-8 h-8" : "w-6 h-6"
  return (
    <div
      className={`relative flex items-center justify-center ${dim} rounded-full transition-all duration-300 group-hover:scale-110`}
      style={{
        background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
        boxShadow: "0 16px 48px -8px rgba(255,45,111,0.6)",
      }}
    >
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ background: "rgba(255,45,111,0.25)" }}
      />
      <Play className={`${icon} fill-white text-white ml-0.5`} />
    </div>
  )
}

export function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const activeStudy = caseStudies[activeIndex]

  const galleryPhotos = activeStudy.gallery || []

  const [imgVisible, setImgVisible] = useState(true)
  const touchStartX = useRef<number | null>(null)

  const resetPlayer = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const closeLightbox = useCallback(() => { setLightboxIndex(null); setImgVisible(true) }, [])

  const changePhoto = useCallback((newIdx: number) => {
    setImgVisible(false)
    setTimeout(() => { setLightboxIndex(newIdx); setImgVisible(true) }, 160)
  }, [])

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return
    changePhoto((lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length)
  }, [lightboxIndex, galleryPhotos.length, changePhoto])

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null) return
    changePhoto((lightboxIndex + 1) % galleryPhotos.length)
  }, [lightboxIndex, galleryPhotos.length, changePhoto])

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50) nextPhoto()
    else if (delta < -50) prevPhoto()
    touchStartX.current = null
  }

  // Lock body scroll while lightbox is open
  const isLightboxOpen = lightboxIndex !== null
  useEffect(() => {
    if (!isLightboxOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [isLightboxOpen])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prevPhoto()
      if (e.key === "ArrowRight") nextPhoto()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto])

  const handlePrev = () => {
    resetPlayer()
    setLightboxIndex(null)
    setActiveIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1))
  }

  const handleNext = () => {
    resetPlayer()
    setLightboxIndex(null)
    setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="our-work" className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div className="max-w-3xl">
            <span className="ds-pill mb-5">
              <span className="dot" />
              See Us At Work
            </span>
            <h2 className="text-[32px] md:text-[44px] lg:text-[48px] font-extrabold tracking-[-0.025em] leading-[1.05] text-white mb-3">
              Our Recent <span className="ds-accent-text">Work</span>
            </h2>
            <p className="text-white/55 text-[16px] md:text-[17px]">
              Behind-the-scenes videos showing how our team sets up, builds, and produces events.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-[12px] border border-white/[0.10] bg-white/[0.04] flex items-center justify-center text-white/65 hover:border-[#FF2D6F]/30 hover:bg-[#FF2D6F]/10 hover:text-white transition-all backdrop-blur-md"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-[12px] border border-white/[0.10] bg-white/[0.04] flex items-center justify-center text-white/65 hover:border-[#FF2D6F]/30 hover:bg-[#FF2D6F]/10 hover:text-white transition-all backdrop-blur-md"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Video Player */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
            {isPlaying && (
              <MuxPlayer
                playbackId={activeStudy.muxId}
                autoPlay="any"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            )}
            {!isPlaying && (
              <>
                <img
                  src={activeStudy.thumbnail}
                  alt={activeStudy.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                  }}
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label="Play video"
                >
                  <PlayButton size="lg" />
                </button>
              </>
            )}
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeStudy.title}</h3>
              <p className="text-white/45">{activeStudy.location}</p>
            </div>

            <p className="text-white/65 leading-relaxed">{activeStudy.description}</p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => document.dispatchEvent(new CustomEvent("openQuoteForm"))}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-extrabold text-[13px] tracking-[0.02em] transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                  boxShadow: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.30)",
                }}
              >
                Get a Similar Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={PHONE_TEL}
                suppressHydrationWarning
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white font-semibold text-[13px] backdrop-blur-md hover:bg-white/[0.10] transition-all"
              >
                Talk to an Expert
              </a>
            </div>

            {/* Thumbnails — same grid as the photo gallery so they align */}
            <div className="pt-4">
              <div className="grid grid-cols-6 gap-2 md:gap-3">
                {caseStudies.map((study, index) => (
                  <button
                    key={study.id}
                    onClick={() => {
                      resetPlayer()
                      setActiveIndex(index)
                    }}
                    className={`relative aspect-video w-full rounded-lg overflow-hidden transition-all ${
                      index === activeIndex
                        ? "ring-2 ring-[#FF2D6F] ring-offset-2 ring-offset-[#0a0a12]"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={study.thumbnail}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mt-8 md:mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
            {galleryPhotos.map((photo, i) => (
              <button
                /* key includes the study id so React fully remounts each Image
                   when the active project changes — prevents the previous
                   project's photos from lingering while the new ones load. */
                key={`${activeStudy.id}-${photo.src}`}
                onClick={() => setLightboxIndex(i)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.07] group cursor-zoom-in bg-white/[0.04]"
                style={{ boxShadow: "0 8px 24px -6px rgba(0,0,0,0.4)" }}
                aria-label={`View photo: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  quality={70}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)", touchAction: "none" }}
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
            {lightboxIndex + 1} / {galleryPhotos.length}
          </span>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto() }}
            className="absolute left-3 md:left-6 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl mx-12 md:mx-24"
            style={{ aspectRatio: "16/9", opacity: imgVisible ? 1 : 0, transition: "opacity 160ms ease" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryPhotos[lightboxIndex].src}
              alt={galleryPhotos[lightboxIndex].alt}
              fill
              className="object-contain rounded-xl"
              sizes="100vw"
              quality={90}
              priority
            />
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto() }}
            className="absolute right-3 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  )
}
