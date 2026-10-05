"use client"

import { useState } from "react"
import { ArrowRight, Play, Gift, Images } from "lucide-react"
import { VideoOverlay } from "./video-overlay"
import { HeroVideo } from "@/components/hero-video"
import { Icon3D, type Icon3DName } from "@/components/icon-3d"
import { HOME_CLIPS } from "@/lib/hero-clips"

export interface HeroStat {
  value: string
  label: string
}

export interface HeroConfig {
  /** Full H1 text, e.g. "Full-Service AV Production in Los Angeles" */
  title: string
  /** Phrase inside the title to highlight (gradient), e.g. "AV Production" */
  accentPhrase?: string
  /** Eyebrow pill text, e.g. "AV Production in Los Angeles" */
  pillLabel: string
  /** Legacy collage photos — kept for callers; the hero now shows video. */
  collage?: string[]
  /** Paragraph under the H1. */
  lede?: string
  /** Hero clips (public/videos/hero/<name>.mp4), played back to back. */
  clips?: string[]
  /** Microcopy under the primary CTA label. */
  microcopy?: string
  /** Primary CTA label. */
  ctaLabel?: string
  /** Secondary button: showreel overlay (default) or jump to the portfolio block. */
  secondary?: "watch" | "portfolio"
  /** Optional trust strip under the hero. */
  stats?: HeroStat[]
  /** Show the gold "Includes…" plate (default true). */
  showIncludes?: boolean
}

interface LandingHeroProps {
  hero: HeroConfig
  onQuote: () => void
}

const DEFAULT_LEDE = "Your event runs flawlessly — or we make it right. One team, one contract, zero surprises."
const DEFAULT_MICROCOPY = "Delivered in under 4 hours — not days."

const bullets: { icon: Icon3DName; text: string }[] = [
  { icon: "render-3d", text: "Free 3D render of your event setup before you commit" },
  { icon: "clipboard", text: "One dedicated Technical Director from planning to strike" },
  { icon: "stopwatch", text: "Production complete and tested 2 hours before doors open" },
  { icon: "award", text: "Trusted by Apple, Nike, TikTok and 500+ brands" },
]

/* Video showcase in the site's glass hero frame + floating proof cards. */
function HeroMedia({ clips }: { clips: string[] }) {
  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-[24px] border border-white/10 p-2.5 backdrop-blur-2xl md:p-3"
        style={{
          background: "linear-gradient(135deg, rgba(255,45,111,0.14), rgba(255,210,74,0.06))",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7)",
        }}
      >
        <HeroVideo clips={clips} className="aspect-[16/10] w-full rounded-[16px] border border-white/[0.08]" />
        <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-[10px] border border-white/[0.12] bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md md:left-6 md:top-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#FF2D6F] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF2D6F]" />
          </span>
          Real events · Our crews
        </div>
      </div>

      {/* Floating stat cards (desktop only) */}
      <div
        className="animate-float-y absolute -right-4 -top-5 z-20 hidden items-center gap-3 rounded-[14px] border border-[#FF2D6F]/25 px-4 py-3 backdrop-blur-2xl md:flex"
        style={{ background: "rgba(8,18,26,0.85)", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}
      >
        <Icon3D name="award" size={38} priority />
        <div>
          <b className="block text-[13px] font-bold leading-tight text-white tabular-nums">2,500+ Events</b>
          <span className="text-[11px] text-white/45">Delivered flawlessly</span>
        </div>
      </div>
      <div
        className="animate-float-y absolute -bottom-6 -left-6 z-20 hidden items-center gap-3 rounded-[14px] border border-[#FF2D6F]/20 px-4 py-3 backdrop-blur-2xl md:flex"
        style={{ animationDelay: "-2.5s", background: "rgba(8,18,26,0.78)", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}
      >
        <Icon3D name="stopwatch" size={38} priority />
        <div>
          <b className="block text-[13px] font-bold leading-tight text-white">2 Hours Early</b>
          <span className="text-[11px] text-white/45">Tested before doors</span>
        </div>
      </div>
    </div>
  )
}

/* Render the title with accentPhrase highlighted (gradient). */
function renderTitle(title: string, accentPhrase?: string) {
  if (!accentPhrase || !title.includes(accentPhrase)) {
    return title
  }
  const [before, after] = title.split(accentPhrase)
  return (
    <>
      {before}
      <span className="ds-accent-text">{accentPhrase}</span>
      {after}
    </>
  )
}

function Heading({ hero, centered }: { hero: HeroConfig; centered?: boolean }) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h1 className="mb-4 text-balance text-[30px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[38px] lg:text-[42px]">
        {renderTitle(hero.title, hero.accentPhrase)}
      </h1>
      <p className={`max-w-[540px] text-pretty text-[15px] leading-relaxed text-white/65 md:text-[17px] ${centered ? "mx-auto" : ""}`}>
        {hero.lede ?? DEFAULT_LEDE}
      </p>
    </div>
  )
}

function Bullets({ centered }: { centered?: boolean }) {
  return (
    <ul className={`space-y-2.5 ${centered ? "mx-auto max-w-[440px] text-left" : "max-w-[540px]"}`}>
      {bullets.map(({ icon, text }) => (
        <li key={text} className="flex items-center gap-3">
          <Icon3D name={icon} size={30} className="shrink-0" priority />
          <span className="text-pretty text-[14px] leading-snug text-white/80 md:text-[15px]">{text}</span>
        </li>
      ))}
    </ul>
  )
}

function CtaButtons({ hero, onQuote, onWatch, centered }: { hero: HeroConfig; onQuote: () => void; onWatch: () => void; centered?: boolean }) {
  // On mobile the buttons stretch to the full content width; from sm up they size to content.
  const fullWidth = centered ? "w-full sm:w-auto" : ""
  const secondaryCls = `shimmer-stroke inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.05] px-6 py-3.5 text-[14px] font-bold text-white backdrop-blur-md transition-[background-color,border-color] duration-200 hover:border-white/[0.22] hover:bg-white/[0.10] md:py-4 ${fullWidth}`
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${centered ? "sm:justify-center" : ""}`}>
      <button
        onClick={onQuote}
        className={`group inline-flex flex-col items-center justify-center gap-0.5 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] px-6 py-3 text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] md:px-8 ${fullWidth}`}
        style={{ boxShadow: "0 12px 36px -8px rgba(255, 45, 111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)" }}
      >
        <span className="inline-flex items-center gap-2.5 text-[15px] font-extrabold tracking-[0.01em]">
          {hero.ctaLabel ?? "Get Your Custom Quote"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="text-[11px] font-semibold tracking-[0.01em] text-white/85">{hero.microcopy ?? DEFAULT_MICROCOPY}</span>
      </button>

      {hero.secondary === "portfolio" ? (
        <a href="#portfolio" className={secondaryCls}>
          <Images className="h-4 w-4" />
          View event portfolio
        </a>
      ) : (
        <button onClick={onWatch} className={secondaryCls}>
          <Play className="h-4 w-4 fill-white" />
          Watch How We Work
        </button>
      )}
    </div>
  )
}

function GiftLine({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <div className={`items-center gap-2 rounded-[10px] border border-[#FFD24A]/25 bg-[#FFD24A]/[0.08] px-3 py-2 ${fullWidth ? "flex w-full" : "inline-flex max-w-[520px]"}`}>
      <Gift className="h-4 w-4 flex-shrink-0 text-[#FFD24A]" strokeWidth={2.2} />
      <span className="text-[12px] font-semibold leading-snug text-[#FFD24A] md:text-[13px]">Includes: Free 3D render + site survey + dedicated Technical Director</span>
    </div>
  )
}

/* Trust strip: big figures in the accent gradient, hairline dividers. */
function StatsStrip({ stats }: { stats: HeroStat[] }) {
  return (
    <div
      className="mt-8 grid grid-cols-2 overflow-hidden rounded-[20px] border border-white/10 lg:mt-12 lg:grid-cols-4"
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
    >
      {stats.map((s, i) => (
        <div key={s.label} className={`px-5 py-4 md:px-7 md:py-5 ${i % 2 === 1 ? "border-l border-white/[0.08]" : ""} ${i >= 2 ? "border-t border-white/[0.08] lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
          <p className="text-[26px] font-extrabold leading-none tracking-[-0.03em] tabular-nums md:text-[32px]">
            <span className="ds-accent-text">{s.value}</span>
          </p>
          <p className="mt-1.5 text-[13px] font-semibold leading-tight text-white/70 md:text-[14px]">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

export function LandingHero({ hero, onQuote }: LandingHeroProps) {
  const [videoOpen, setVideoOpen] = useState(false)
  const openVideo = () => setVideoOpen(true)
  const clips = hero.clips?.length ? hero.clips : HOME_CLIPS
  const showIncludes = hero.showIncludes ?? true

  return (
    <>
      <section id="top" className="relative overflow-hidden pb-2 pt-6 md:pb-4 md:pt-10">
        <div className="relative mx-auto max-w-7xl px-4">
          {/* MOBILE (centered): heading → video → buttons → bullets */}
          <div className="flex flex-col gap-7 text-center lg:hidden">
            <Heading hero={hero} centered />
            <HeroMedia clips={clips} />
            <div className="flex flex-col gap-4">
              <CtaButtons hero={hero} onQuote={onQuote} onWatch={openVideo} centered />
              {showIncludes && (
                <div>
                  <GiftLine />
                </div>
              )}
            </div>
            <Bullets centered />
          </div>

          {/* DESKTOP: text column + video */}
          <div className="hidden items-center lg:grid lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <Heading hero={hero} />
              <div className="mt-6">
                <Bullets />
              </div>
              <div className="mt-7 w-fit">
                <CtaButtons hero={hero} onQuote={onQuote} onWatch={openVideo} />
                {showIncludes && (
                  <div className="mt-4 w-0 min-w-full">
                    <GiftLine fullWidth />
                  </div>
                )}
              </div>
            </div>
            <HeroMedia clips={clips} />
          </div>

          {hero.stats?.length ? <StatsStrip stats={hero.stats} /> : null}
        </div>
      </section>

      <VideoOverlay open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  )
}

