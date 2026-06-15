"use client"

import Image from "next/image"
import Link from "next/link"
import { Layers, Volume2, Monitor, Lightbulb, Box, Tv, Projector, Columns, ArrowRight } from "lucide-react"
import { useCity } from "@/lib/city-context"

export function ServicesGridSection() {
  const city = useCity()
  const citySlug = city === "Miami" ? "-miami" : city === "Orlando" ? "-orlando" : ""
  const services = [
    {
      icon: Box,
      title: "Stage Rental",
      description: `Portable, truss-built, or mobile stages — engineered, certified, and crewed for any event in ${city}.`,
      image: "/images/services/stage-rental-card.webp",
      href: `/services/stage-rental${citySlug}`,
      darkening: "heavy",
    },
    {
      icon: Volume2,
      title: "Sound System Rental",
      description: "L-Acoustics and d&b audio systems, tuned to your room with A1 + A2 engineers on every show.",
      image: "/images/services/sound-system-card.webp",
      href: `/services/sound-system-rental${citySlug}`,
      darkening: "medium",
    },
    {
      icon: Lightbulb,
      title: "Lighting Equipment Rental",
      description: "Designed, pre-vis'd, and programmed by a senior LD — moving heads, washes, and GrandMA3 console.",
      image: "/images/services/lighting-rental-card.webp",
      href: `/services/lighting-rental${citySlug}`,
      darkening: "medium",
    },
    {
      icon: Layers,
      title: "Full AV Production",
      description: "One team, one contract, one producer — sound, lighting, video, LED, and stage from pre-vis to strike.",
      image: "/images/services/full-av-card.webp",
      href: `/services/full-av-production${citySlug}`,
      darkening: "extra",
    },
    {
      icon: Tv,
      title: "TV Rental",
      description: "Confidence monitors to video walls — 32\" to 98\", indoor and outdoor, with on-site video tech.",
      image: "/images/services/tv-rental-card.webp",
      href: `/services/tv-rental${citySlug}`,
      darkening: "medium",
    },
    {
      icon: Projector,
      title: "Projector & Screen Rental",
      description: "Boardroom to ballroom — 6 ft to 40+ ft screens, 4K laser projectors, and projection mapping.",
      image: "/images/services/projector-screen.webp",
      href: `/services/projector-screen-rental${citySlug}`,
      darkening: "medium",
    },
    {
      icon: Columns,
      title: "Pipe & Drape Rental",
      description: `IFR-certified drape in any height and color, installed and struck by our crew across ${city}.`,
      image: "/images/services/pipe-drape-card.webp",
      href: `/services/pipe-drape-rental${citySlug}`,
      darkening: "medium",
    },
    {
      icon: Monitor,
      title: "LED Screen Rental",
      description: "Indoor, outdoor, and curved LED walls — same-day quote, senior LED tech and rigger on every job.",
      image: "/images/services/led-screen-card.webp",
      href: `/services/led-screen-rental${citySlug}`,
      darkening: "medium",
    },
  ]

  return (
    <section id="services" className="py-24 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="ds-pill mb-5">
            <span className="dot" />
            What We Do
          </span>
          <h2 className="text-[32px] md:text-[44px] lg:text-[50px] font-extrabold tracking-[-0.025em] leading-[1.05] text-white mb-4">
            End-to-End AV Production,
            <br />
            <span className="ds-accent-text">Engineered for Impact</span>
          </h2>
          <p className="text-white/55 text-[16px] md:text-[17px] max-w-[640px] mx-auto">
            From concept through strike — audio, video, lighting, staging and LED walls handled by a single accountable
            team.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="keep-original group flex flex-col rounded-[22px] border border-[#FF2D6F]/20 overflow-hidden transition-transform hover:-translate-y-0.5 hover:border-[#FF2D6F]/45 bg-[#0a0a0a]"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)" }}
            >
              {/* Image — fully visible, never covered by text */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content plate below the image */}
              <div className="relative flex flex-col flex-1 p-4 sm:p-6">
                <div
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-[14px] flex items-center justify-center text-[#FF2D6F] -mt-11 sm:-mt-14 mb-3 sm:mb-4 backdrop-blur-md"
                  style={{ background: "rgba(255,45,111,0.22)", border: "1px solid rgba(255,45,111,0.35)" }}
                >
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.7} />
                </div>

                <h3 className="text-[15px] sm:text-[20px] font-bold text-white tracking-[-0.01em] mb-2 leading-tight">
                  {service.title}
                </h3>

                <p className="hidden sm:block text-white/65 text-[14px] leading-[1.6] mb-5 flex-1">
                  {service.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-2 text-[#FF2D6F] font-bold text-[13px] sm:text-[14px] group-hover:gap-3 transition-all">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
