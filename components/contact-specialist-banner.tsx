"use client"

import Image from "next/image"
import { Phone, CalendarDays, Sparkles } from "lucide-react"

import { PHONE_DISPLAY as PHONE, PHONE_TEL, WHATSAPP_HREF as WHATSAPP_LINK } from "@/lib/contact"

interface ContactSpecialistBannerProps {
  onStartQuote?: () => void
  variant?: "default" | "fifa"
}

export function ContactSpecialistBanner({ onStartQuote, variant = "default" }: ContactSpecialistBannerProps) {
  const isFifa = variant === "fifa"

  // Color tokens per variant
  const accent1 = isFifa ? "#E61D25" : "#FF2D6F"
  const accent2 = isFifa ? "#5BC25A" : "#FF5E3A"
  const borderColor = isFifa ? "rgba(230,29,37,0.25)" : "rgba(255,255,255,0.08)"
  const tagBorder = isFifa ? "rgba(230,29,37,0.35)" : "rgba(255,45,111,0.30)"
  const tagBg = isFifa ? "rgba(230,29,37,0.10)" : "rgba(255,45,111,0.08)"
  const tagText = isFifa ? "#FF6B71" : "#FF2D6F"
  const pillDot = isFifa ? "#E61D25" : "#FF2D6F"

  return (
    <section className="py-10 md:py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative rounded-[24px] overflow-hidden"
          style={{
            border: `1px solid ${borderColor}`,
            background: isFifa
              ? "linear-gradient(120deg, rgba(8,16,8,0.98) 0%, rgba(14,20,10,0.97) 55%, rgba(20,8,8,0.96) 100%)"
              : "linear-gradient(120deg, rgba(10,8,24,0.98) 0%, rgba(20,10,30,0.97) 55%, rgba(30,10,20,0.96) 100%)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isFifa
                ? "radial-gradient(ellipse 50% 80% at 100% 50%, rgba(91,194,90,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 0% 50%, rgba(230,29,37,0.07) 0%, transparent 70%)"
                : "radial-gradient(ellipse 50% 80% at 100% 50%, rgba(255,45,111,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 0% 50%, rgba(255,94,58,0.05) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          {/* Dot grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />

          <div className="relative z-10 grid md:grid-cols-[320px_1fr] lg:grid-cols-[400px_1fr] gap-0 md:gap-8 items-start md:items-center">

            {/* Photo — left side, larger and more prominent */}
            <div className="relative w-full px-6 md:px-0 pt-8 pb-3 md:py-12 flex justify-center md:justify-start md:pl-8">
              <div className="relative">
                {/* Outer glow layer */}
                <div
                  className="absolute -inset-6 md:-inset-8 rounded-full blur-2xl"
                  style={{ background: `radial-gradient(circle, ${accent1}40 0%, transparent 70%)` }}
                  aria-hidden
                />
                {/* Inner subtle glow */}
                <div
                  className="absolute -inset-3 md:-inset-4 rounded-full blur-xl"
                  style={{ background: `radial-gradient(circle, ${accent2}26 0%, transparent 60%)` }}
                  aria-hidden
                />
                {/* Image container — perfectly circular, gradient ring matching the CTA button */}
                <div
                  className="relative w-56 h-56 md:w-80 md:h-80 rounded-full p-[2px] md:p-[3px]"
                  style={{
                    background: `linear-gradient(135deg, ${accent1} 0%, ${accent2} 100%)`,
                    boxShadow: `0 0 0 4px ${accent1}30`,
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden"
                    style={{ boxShadow: `inset 0 0 30px ${accent1}22` }}
                  >
                    <Image
                      src="/egor.webp"
                      alt="Egor — AV Production Specialist"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider on desktop */}
            <div
              className="hidden md:block absolute left-[calc(320px)] lg:left-[calc(400px)] top-1/4 bottom-1/4 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)" }}
              aria-hidden
            />

            {/* Content — right side, expanded */}
            <div className="flex-1 px-6 md:px-10 pt-3 pb-8 md:py-12 text-center md:text-left">

              {/* Tag */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border mb-4"
                style={{ borderColor: tagBorder, background: tagBg }}
              >
                <Sparkles className="w-3 h-3" style={{ color: tagText }} />
                <span className="text-[10px] font-bold tracking-[0.08em] uppercase" style={{ color: tagText }}>
                  {isFifa ? "FIFA 2026 AV Specialist" : "AV Production Specialist"}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-black tracking-[-0.02em] leading-[1.22] mb-5 pb-1">
                {isFifa ? (
                  <>
                    <span className="text-white">Not sure which package </span>
                    <span
                      className="italic inline-block align-baseline"
                      style={{
                        background: `linear-gradient(90deg, ${accent1} 0%, ${accent2} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        paddingRight: "0.22em",
                        marginRight: "-0.06em",
                        paddingBottom: "0.12em",
                        marginBottom: "-0.12em",
                        lineHeight: 1.22,
                      }}
                    >
                      fits your event?
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-white">Not sure which service </span>
                    <span
                      className="italic inline-block align-baseline"
                      style={{
                        background: `linear-gradient(90deg, ${accent1} 0%, ${accent2} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        paddingRight: "0.22em",
                        marginRight: "-0.06em",
                        paddingBottom: "0.12em",
                        marginBottom: "-0.12em",
                        lineHeight: 1.22,
                      }}
                    >
                      fits your event?
                    </span>
                  </>
                )}
              </h2>

              {/* Sub */}
              <p className="text-white/60 text-[14px] md:text-[15px] leading-relaxed mb-7 max-w-2xl">
                Talk to a real Prime Line AV specialist. We&apos;ll help you pick the right setup, find the best package for your budget, and answer any technical questions — no bots, no waiting.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 mb-6">
                <a
                  href={PHONE_TEL}
                  suppressHydrationWarning
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center sm:justify-start"
                  style={{
                    background: `linear-gradient(135deg, ${accent1} 0%, ${accent2} 100%)`,
                    boxShadow: `0 8px 24px -6px ${accent1}80`,
                  }}
                >
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>

                <button
                  type="button"
                  onClick={onStartQuote}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white border border-white/15 bg-white/05 hover:bg-white/10 transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  <CalendarDays className="w-4 h-4" />
                  Request a Quote
                </button>
              </div>

              {/* Topic pills */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5">
                {(isFifa
                  ? ["Watch Party Packages", "LED Wall Rental", "Sound & Lighting", "Full Crew Setup"]
                  : ["LED Wall & Staging", "Audio & Lighting", "Permanent Installs", "Event Packages"]
                ).map((topic) => (
                  <span key={topic} className="flex items-center gap-1.5 text-[11px] text-white/35 tracking-[0.06em] uppercase font-semibold">
                    <span className="w-1 h-1 rounded-full inline-block" style={{ background: `${pillDot}80` }} />
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
