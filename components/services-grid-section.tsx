"use client"

import Image from "next/image"
import Link from "next/link"
import { Layers, Volume2, Monitor, Lightbulb, Box, Tv, Projector, Columns } from "lucide-react"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group relative min-h-[280px] rounded-[22px] border border-[#FF2D6F]/20 overflow-hidden block transition-transform hover:-translate-y-0.5 hover:border-[#FF2D6F]/45 bg-[#0a0a0a]"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)",
              }}
            >
              {/* Background image — always visible, fills entire card */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority={index < 4}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="absolute inset-0 object-cover"
              />

              {/* Dark gradient overlay — opacity varies by card */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    service.darkening === "heavy"
                      ? "linear-gradient(180deg, rgba(3,7,10,0.50) 0%, rgba(3,7,10,0.70) 60%, rgba(3,7,10,0.85) 100%)"
                      : service.darkening === "extra"
                        ? "linear-gradient(180deg, rgba(3,7,10,0.50) 0%, rgba(3,7,10,0.75) 60%, rgba(3,7,10,0.90) 100%)"
                        : "linear-gradient(180deg, rgba(3,7,10,0.40) 0%, rgba(3,7,10,0.60) 60%, rgba(3,7,10,0.80) 100%)",
                }}
                aria-hidden
              />

              {/* Top emerald glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(255, 45, 111,0.18) 0%, transparent 70%)",
                }}
                aria-hidden
              />

              <div className="relative z-10 p-7 md:p-8">
                <div className="w-14 h-14 rounded-[14px] bg-[#FF2D6F]/22 border border-[#FF2D6F]/35 flex items-center justify-center text-[#FF2D6F] mb-5 backdrop-blur-md">
                  <service.icon className="w-6 h-6" strokeWidth={1.7} />
                </div>

                <h3 className="text-[21px] font-bold text-white tracking-[-0.01em] mb-2.5">{service.title}</h3>

                <p className="text-white/70 text-[14px] leading-[1.6]">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
