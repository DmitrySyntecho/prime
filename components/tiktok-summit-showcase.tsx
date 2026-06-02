"use client"

import { useState } from "react"
import Image from "next/image"
import { Sparkles, Play } from "lucide-react"
import MuxPlayer from "@mux/mux-player-react"

// Images with Next.js Image optimization
const images = {
  topRight1: { src: "/images/case-studies/tiktok-3.webp", alt: "TikTok Shop Summit exhibition floor" },
  topRight2: { src: "/images/case-studies/tiktok-6.webp", alt: "Lighting console operator at work" },
  midRight1: { src: "/images/case-studies/tiktok-4.webp", alt: "Speaker presenting TikTok Shop ecosystem milestones" },
  midRight2: { src: "/images/case-studies/tiktok-5.webp", alt: "L-Acoustics speaker array setup" },
}

function GalleryImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 50vw, 25vw",
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/[0.08] group ${className}`}
      style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.4)" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={sizes}
        quality={75}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)" }}
      />
    </div>
  )
}

const TIKTOK_PLAYBACK_ID = "KfJ00XD74CFG01AI5eclQ58q439V3U004sBcuSENC2A9IU"

export function TikTokSummitShowcase() {
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(255,45,111,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 20%, rgba(255,94,58,0.04) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF2D6F]/25 bg-[#FF2D6F]/08 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D6F]" />
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#FF2D6F]">
              Case Study
            </span>
          </div>
          <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-black tracking-[-0.025em] leading-[1.1] text-white mb-4">
            TikTok Shop{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Summit 2026
            </span>
          </h2>
          <p className="text-white/50 text-[14px] md:text-[15px] max-w-2xl mx-auto leading-relaxed">
            Full-scale AV production for TikTok&apos;s flagship creator summit — main stage, exhibition floor,
            LED walls, lighting design, and live streaming for 5,000+ attendees.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div
          className="rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] p-2 md:p-3"
          style={{
            background: "linear-gradient(135deg, rgba(20,15,30,0.8) 0%, rgba(15,10,25,0.9) 100%)",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Desktop: Bento grid — 2 cols video left, 2 cols images right */}
          <div className="hidden md:flex gap-2 md:gap-3">
            {/* Video player left — fixed aspect ratio with custom thumbnail */}
            <div
              className="relative overflow-hidden rounded-xl border border-white/[0.08] flex-shrink-0 bg-black"
              style={{ width: "50%", aspectRatio: "16/9", boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)" }}
            >
              {videoPlaying && (
                <MuxPlayer
                  playbackId={TIKTOK_PLAYBACK_ID}
                  autoPlay="any"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              )}
              {!videoPlaying && (
                <>
                  <Image
                    src={`https://image.mux.com/${TIKTOK_PLAYBACK_ID}/thumbnail.jpg?time=30&width=800`}
                    alt="TikTok Summit BTS video thumbnail"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    quality={80}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                    }}
                  />
                  <button
                    onClick={() => setVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                    aria-label="Play video"
                  >
                    <div
                      className="relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                        boxShadow: "0 16px 48px -8px rgba(255,45,111,0.6)",
                      }}
                    >
                      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,45,111,0.25)" }} />
                      <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                    </div>
                  </button>
                </>
              )}
            </div>

            {/* Right side — 2x2 image grid matching video height */}
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2 md:gap-3">
              <GalleryImage src={images.topRight1.src} alt={images.topRight1.alt} className="min-h-0" />
              <GalleryImage src={images.topRight2.src} alt={images.topRight2.alt} className="min-h-0" />
              <GalleryImage src={images.midRight1.src} alt={images.midRight1.alt} className="min-h-0" />
              <GalleryImage src={images.midRight2.src} alt={images.midRight2.alt} className="min-h-0" />
            </div>
          </div>

          {/* Mobile: Simplified stacked layout */}
          <div className="md:hidden flex flex-col gap-2">
            {/* Video player with custom thumbnail */}
            <div
              className="relative overflow-hidden rounded-xl border border-white/[0.08] aspect-video"
              style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)" }}
            >
              {videoPlaying && (
                <MuxPlayer
                  playbackId={TIKTOK_PLAYBACK_ID}
                  autoPlay="any"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              )}
              {!videoPlaying && (
                <>
                  <Image
                    src={`https://image.mux.com/${TIKTOK_PLAYBACK_ID}/thumbnail.jpg?time=30&width=640`}
                    alt="TikTok Summit BTS video thumbnail"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={75}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                    }}
                  />
                  <button
                    onClick={() => setVideoPlaying(true)}
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
                      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,45,111,0.25)" }} />
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    </div>
                  </button>
                </>
              )}
            </div>

            {/* Images grid 2x2 */}
            <div className="grid grid-cols-2 gap-2">
              <GalleryImage src={images.topRight1.src} alt={images.topRight1.alt} className="aspect-[4/3]" />
              <GalleryImage src={images.topRight2.src} alt={images.topRight2.alt} className="aspect-[4/3]" />
              <GalleryImage src={images.midRight1.src} alt={images.midRight1.alt} className="aspect-[4/3]" />
              <GalleryImage src={images.midRight2.src} alt={images.midRight2.alt} className="aspect-[4/3]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
