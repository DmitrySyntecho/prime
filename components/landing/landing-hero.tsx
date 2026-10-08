"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Play, Gift, Images, LayoutGrid } from "lucide-react"
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
  lede?: React.ReactNode
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
  /** Hero bullet list (defaults to the generic four). */
  bullets?: { icon: Icon3DName; text: string }[]
  /** Secondary button as a plain link — overrides `secondary`. */
  secondaryLink?: { label: string; href?: string; onClick?: () => void }
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

const LIVE_TAG = (
  <div className="inline-flex items-center gap-2 rounded-[10px] border border-white/[0.12] bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
    <span className="relative flex h-2 w-2">
      <span className="absolute inset-0 animate-ping rounded-full bg-[#FFD24A] opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD24A]" />
    </span>
    Real events · Our crews
  </div>
)

/**
 * Desktop: the video fills the whole right half of the first screen — from
 * under the floating header down to the logo strip, out to the window edge —
 * and dissolves into the page on its left and bottom edges.
 */
function HeroVideoBleed({ clips }: { clips: string[] }) {
  return (
    <div className="intro-fade pointer-events-none absolute -top-[92px] bottom-0 right-0 hidden w-[52vw] lg:block" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 16%)",
          WebkitMaskComposite: "source-in",
          maskImage: "linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 16%)",
          maskComposite: "intersect",
        }}
      >
        <HeroVideo clips={clips} className="h-full w-full" />
        {/* Darken the top so the header glass stays readable over bright footage. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
      </div>
    </div>
  )
}

/* Floating proof cards (desktop). They ride the video's dissolving left edge so
   the middle of the footage stays clear. */
function BleedCards() {
  return (
    <div className="pointer-events-none relative hidden h-full min-h-[420px] lg:block">
      <div className="absolute left-0 top-2">{LIVE_TAG}</div>
      <div
        className="animate-float-y absolute -left-8 top-[34%] z-20 flex items-center gap-3 rounded-[14px] border border-[#FFD24A]/25 px-4 py-3 backdrop-blur-2xl"
        style={{ background: "rgba(8,18,26,0.78)", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}
      >
        <Icon3D name="award" size={38} priority />
        <div>
          <b className="block text-[13px] font-bold leading-tight text-white tabular-nums">2,500+ Events</b>
          <span className="text-[11px] text-white/80">Delivered flawlessly</span>
        </div>
      </div>
      <div
        className="animate-float-y absolute bottom-6 left-0 z-20 flex items-center gap-3 rounded-[14px] border border-[#FFD24A]/20 px-4 py-3 backdrop-blur-2xl"
        style={{ animationDelay: "-2.5s", background: "rgba(8,18,26,0.72)", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}
      >
        <Icon3D name="stopwatch" size={38} priority />
        <div>
          <b className="block text-[13px] font-bold leading-tight text-white">2 Hours Early</b>
          <span className="text-[11px] text-white/80">Tested before doors</span>
        </div>
      </div>
    </div>
  )
}

/* Mobile/tablet: framed video between heading and buttons. */
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
          <span className="text-[11px] text-white/70">Delivered flawlessly</span>
        </div>
      </div>
      <div
        className="animate-float-y absolute -bottom-6 -left-6 z-20 hidden items-center gap-3 rounded-[14px] border border-[#FF2D6F]/20 px-4 py-3 backdrop-blur-2xl md:flex"
        style={{ animationDelay: "-2.5s", background: "rgba(8,18,26,0.78)", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}
      >
        <Icon3D name="stopwatch" size={38} priority />
        <div>
          <b className="block text-[13px] font-bold leading-tight text-white">2 Hours Early</b>
          <span className="text-[11px] text-white/70">Tested before doors</span>
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

function Title({ hero }: { hero: HeroConfig }) {
  return (
    <h1 className="text-balance text-[30px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[38px] lg:text-[42px]">
      {renderTitle(hero.title, hero.accentPhrase)}
    </h1>
  )
}

function Lede({ hero, centered }: { hero: HeroConfig; centered?: boolean }) {
  return (
    <p className={`max-w-[560px] text-pretty text-[17px] font-medium leading-[1.65] text-white/90 md:text-[18px] ${centered ? "mx-auto" : ""}`}>
      {hero.lede ?? DEFAULT_LEDE}
    </p>
  )
}

/* Desktop: H1 with its lede directly underneath. */
function Heading({ hero }: { hero: HeroConfig }) {
  return (
    <div>
      <div className="mb-4">
        <Title hero={hero} />
      </div>
      <Lede hero={hero} />
    </div>
  )
}

function Bullets({ items, centered }: { items: { icon: Icon3DName; text: string }[]; centered?: boolean }) {
  return (
    <ul className={`space-y-2.5 ${centered ? "mx-auto max-w-[440px] text-left" : "max-w-[540px]"}`}>
      {items.map(({ icon, text }) => (
        <li key={text} className="flex items-center gap-3">
          <Icon3D name={icon} size={30} className="shrink-0" priority />
          <span className="text-pretty text-[15px] font-medium leading-snug text-white/90 md:text-[16px]">{text}</span>
        </li>
      ))}
    </ul>
  )
}

function CtaButtons({ hero, onQuote, onWatch, centered }: { hero: HeroConfig; onQuote: () => void; onWatch: () => void; centered?: boolean }) {
  // On mobile the buttons stretch to the full content width; from sm up they size to content.
  const fullWidth = centered ? "w-full sm:w-auto" : ""
  const secondaryCls = `inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#FFD24A]/55 bg-[#FFD24A]/[0.08] px-6 py-3.5 text-[14px] font-bold text-[#FFD24A] backdrop-blur-md transition-[background-color,border-color,color] duration-200 hover:border-[#FFD24A] hover:bg-[#FFD24A]/[0.16] hover:text-[#FFE27A] md:py-4 ${fullWidth}`
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${centered ? "sm:justify-center" : ""}`}>
      <button
        onClick={onQuote}
        className={`cta-yellow shimmer-stroke group inline-flex flex-col items-center justify-center gap-0.5 rounded-xl px-6 py-3 text-[#0a0612] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 active:scale-[0.98] md:px-8 ${fullWidth}`}
        style={{ background: "linear-gradient(135deg, #FFE27A 0%, #FFD24A 45%, #FFB01F 100%)", boxShadow: "0 12px 36px -8px rgba(255,190,40,0.55), inset 0 1px 0 rgba(255,255,255,0.55)" }}
      >
        <span className="inline-flex items-center gap-2.5 text-[15px] font-extrabold tracking-[0.01em]">
          {hero.ctaLabel ?? "Get Your Custom Quote"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="text-[11px] font-semibold tracking-[0.01em] text-[#0a0612]/70">{hero.microcopy ?? DEFAULT_MICROCOPY}</span>
      </button>

      {hero.secondaryLink?.href ? (
        <Link href={hero.secondaryLink.href} className={secondaryCls}>
          <LayoutGrid className="h-4 w-4" />
          {hero.secondaryLink.label}
        </Link>
      ) : hero.secondaryLink ? (
        <button type="button" onClick={hero.secondaryLink.onClick} className={secondaryCls}>
          <LayoutGrid className="h-4 w-4" />
          {hero.secondaryLink.label}
        </button>
      ) : hero.secondary === "portfolio" ? (
        <a href="#portfolio" className={secondaryCls}>
          <Images className="h-4 w-4" />
          View event portfolio
        </a>
      ) : (
        <button onClick={onWatch} className={secondaryCls}>
          <Play className="h-4 w-4 fill-current" />
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

/* Desktop: the four figures as a compact row under the CTAs. */
function StatsInline({ stats }: { stats: HeroStat[] }) {
  return (
    <dl className={`mt-8 grid max-w-[600px] gap-5 border-t border-white/10 pt-6 ${stats.length === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd className="text-[24px] font-extrabold leading-none tracking-[-0.03em] tabular-nums xl:text-[28px]">
            <span className="ds-accent-text">{s.value}</span>
          </dd>
          <dd className="mt-1.5 text-[12.5px] font-semibold leading-tight text-white/85">{s.label}</dd>
        </div>
      ))}
    </dl>
  )
}

/* Trust strip: big figures in the accent gradient, hairline dividers. */
function StatsStrip({ stats }: { stats: HeroStat[] }) {
  return (
    <div
      className={`mt-8 grid grid-cols-2 overflow-hidden rounded-[20px] border border-white/10 lg:mt-8 ${stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
    >
      {stats.map((s, i) => (
        <div key={s.label} className={`px-5 py-4 md:px-7 md:py-4 ${i % 2 === 1 ? "border-l border-white/[0.08]" : ""} ${i >= 2 ? "border-t border-white/[0.08] lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} ${stats.length === 3 && i === 2 ? "col-span-2 lg:col-span-1" : ""}`}>
          <p className="text-[26px] font-extrabold leading-none tracking-[-0.03em] tabular-nums md:text-[32px]">
            <span className="ds-accent-text">{s.value}</span>
          </p>
          <p className="mt-1.5 text-[13px] font-semibold leading-tight text-white/90 md:text-[14px]">{s.label}</p>
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
      <section id="top" className="relative overflow-hidden pb-2 pt-6 md:pb-4 md:pt-10 lg:flex lg:flex-1 lg:items-center lg:overflow-visible lg:py-10">
        <HeroVideoBleed clips={clips} />
        <div className="relative mx-auto w-full max-w-7xl px-4">
          {/* MOBILE (centered) — site rule for every first screen on phones:
              H1 → video → buttons → supporting text → bullets */}
          <div className="flex flex-col gap-6 text-center lg:hidden">
            <Title hero={hero} />
            <HeroMedia clips={clips} />
            <div className="flex flex-col gap-4">
              <CtaButtons hero={hero} onQuote={onQuote} onWatch={openVideo} centered />
              {showIncludes && (
                <div>
                  <GiftLine />
                </div>
              )}
            </div>
            <Lede hero={hero} centered />
            <Bullets items={hero.bullets ?? bullets} centered />
          </div>

          {/* DESKTOP: text column; the video bleeds behind the right half */}
          <div className="hidden items-stretch lg:grid lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <div className="intro">
                <Heading hero={hero} />
              </div>
              <div className="intro intro-2 mt-6">
                <Bullets items={hero.bullets ?? bullets} />
              </div>
              <div className="intro intro-3 mt-6 w-fit">
                <CtaButtons hero={hero} onQuote={onQuote} onWatch={openVideo} />
                {showIncludes && (
                  <div className="mt-4 w-0 min-w-full">
                    <GiftLine fullWidth />
                  </div>
                )}
              </div>
              {hero.stats?.length ? (
                <div className="intro intro-4">
                  <StatsInline stats={hero.stats} />
                </div>
              ) : null}
            </div>
            <BleedCards />
          </div>

          {hero.stats?.length ? (
            <div className="lg:hidden">
              <StatsStrip stats={hero.stats} />
            </div>
          ) : null}
        </div>
      </section>

      <VideoOverlay open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  )
}

