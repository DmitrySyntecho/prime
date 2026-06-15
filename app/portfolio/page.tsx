"use client"

import { useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Play, ArrowRight, MapPin } from "lucide-react"
import { caseStudies } from "@/components/case-studies-section"
import { ContactSpecialistBanner } from "@/components/contact-specialist-banner"
import { PHONE_TEL } from "@/lib/contact"

// Heavy player loaded only when the visitor hits play.
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false })

const BTN = "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)"

function VideoPlayer({ muxId, thumbnail, title }: { muxId: string; thumbnail: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 keep-original">
      {playing ? (
        <MuxPlayer
          playbackId={muxId}
          autoPlay="any"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      ) : (
        <>
          <img src={thumbnail} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
          />
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label={`Play ${title} video`}
          >
            <span
              className="relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 group-hover:scale-110"
              style={{ background: BTN, boxShadow: "0 16px 48px -8px rgba(255,45,111,0.6)" }}
            >
              <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,45,111,0.25)" }} />
              <Play className="w-8 h-8 fill-white text-white ml-0.5" />
            </span>
          </button>
        </>
      )}
    </div>
  )
}

export default function PortfolioPage() {
  const startQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{
              background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
              border: "1px solid rgba(255,94,58,0.25)",
              color: "#FFB366",
            }}
          >
            See Us At Work
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
            Our Recent{" "}
            <span style={{ background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Work
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            Behind-the-scenes videos showing how our team sets up, builds, and produces events — from
            concept through strike.
          </p>
        </div>
      </section>

      {/* Case studies — all open, video alternating left / right of the text */}
      <section className="pb-8 relative">
        <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
          {caseStudies.map((study, i) => {
            const videoFirst = i % 2 === 0
            return (
              <div key={study.id}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Video */}
                  <div className={videoFirst ? "md:order-1" : "md:order-2"}>
                    <VideoPlayer muxId={study.muxId} thumbnail={study.thumbnail} title={study.title} />
                  </div>

                  {/* Text */}
                  <div className={videoFirst ? "md:order-2" : "md:order-1"}>
                    <div className="flex items-center gap-2 text-[#FFB366] text-[12px] font-bold uppercase tracking-wider mb-3">
                      <MapPin className="w-3.5 h-3.5" /> {study.location}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">{study.title}</h2>
                    <p className="text-white/60 leading-relaxed mb-6">{study.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={startQuote}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-[13px] tracking-[0.02em] transition-all hover:-translate-y-0.5"
                        style={{ background: BTN, boxShadow: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.30)" }}
                      >
                        Get a Similar Quote
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={startQuote}
                        className="shimmer-stroke inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white font-semibold text-[13px] backdrop-blur-md hover:bg-white/[0.10] transition-all"
                      >
                        Talk to an Expert
                      </button>
                    </div>
                  </div>
                </div>

                {/* Photo gallery under the block */}
                {study.gallery?.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mt-6 md:mt-8">
                    {study.gallery.map((photo) => (
                      <div
                        key={photo.src}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.04]"
                        style={{ boxShadow: "0 8px 24px -6px rgba(0,0,0,0.4)" }}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                          quality={70}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <ContactSpecialistBanner onStartQuote={startQuote} />
    </div>
  )
}
