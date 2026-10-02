"use client"

/**
 * Live-site building blocks, reproduced class-for-class from the components this
 * site renders (landing/landing-hero.tsx, landing/landing-why-us.tsx,
 * services-grid-section.tsx, product-card.tsx, event-types-section.tsx,
 * ratings-bar.tsx, home-products-section.tsx). ThemeToggle is imported directly.
 *
 * Every <button>/<a> whose inline style or class carries the #FF2D6F → #FF5E3A
 * gradient automatically gets the rotating .shimmer-stroke ring from globals.css,
 * so these previews shimmer exactly like the site.
 */

import type React from "react"
import {
  ArrowRight,
  Box,
  CheckCircle2,
  Clock,
  Eye,
  Gift,
  Package,
  Play,
  Quote,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  UserCheck,
  Users,
  Volume2,
  Wrench,
} from "lucide-react"

export { ThemeToggle } from "@/components/theme-toggle"

const BRAND = "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)"
type IconType = React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>

/* ── Hero (landing-hero.tsx) ──────────────────────────────────────────────── */

export const HERO_BULLETS: { Icon: IconType; text: string }[] = [
  { Icon: Box, text: "Free 3D render — see your event before you commit" },
  { Icon: UserCheck, text: "One dedicated Technical Director from planning to strike" },
  { Icon: Clock, text: "Production complete and tested 2 hours before doors open" },
  { Icon: ShieldCheck, text: "Trusted by Apple, Nike, TikTok and 500+ brands" },
]

export function HeroBullets() {
  return (
    <ul className="max-w-[540px] space-y-3">
      {HERO_BULLETS.map(({ Icon, text }) => (
        <li key={text} className="flex items-center gap-3">
          <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-[8px] border border-[#FF2D6F]/24 bg-[#FF2D6F]/14 text-[#FF2D6F]">
            <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          <span className="text-[14px] leading-snug text-white/80 md:text-[15px]">{text}</span>
        </li>
      ))}
    </ul>
  )
}

export function HeroCTA({ label = "Get Your Custom Quote" }: { label?: string }) {
  return (
    <button
      type="button"
      className="group inline-flex flex-col items-center justify-center gap-0.5 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] px-6 py-3 text-white transition-all hover:-translate-y-0.5 md:px-8"
      style={{ boxShadow: "0 12px 36px -8px rgba(255, 45, 111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)" }}
    >
      <span className="inline-flex items-center gap-2.5 text-[15px] font-extrabold tracking-[0.01em]">
        {label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
      <span className="text-[11px] font-semibold tracking-[0.01em] text-white/85">Delivered in under 4 hours — not days.</span>
    </button>
  )
}

export function WatchButton() {
  return (
    <button
      type="button"
      className="shimmer-stroke inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.05] px-6 py-3.5 text-[14px] font-bold text-white backdrop-blur-md transition-all hover:border-white/[0.22] hover:bg-white/[0.10] md:py-4"
    >
      <Play className="h-4 w-4 fill-white" />
      Watch How We Work
    </button>
  )
}

export function IncludesBar() {
  return (
    <div className="inline-flex items-center gap-2 rounded-[10px] border border-[#FFD24A]/25 bg-[#FFD24A]/[0.08] px-3 py-2">
      <Gift className="h-4 w-4 flex-shrink-0 text-[#FFD24A]" strokeWidth={2.2} />
      <span className="text-[12px] font-semibold leading-snug text-[#FFD24A] md:text-[13px]">Includes: Free 3D render + site survey + dedicated Technical Director</span>
    </div>
  )
}

export function FloatingCard({ title = "1,986+ Events", sub = "Delivered flawlessly", Icon = Sparkles }: { title?: string; sub?: string; Icon?: IconType }) {
  return (
    <div
      className="animate-float-y inline-flex items-center gap-3 rounded-[14px] border border-[#FF2D6F]/25 px-4 py-3.5 backdrop-blur-2xl"
      style={{ background: "rgba(8,18,26,0.85)", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}
    >
      <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#FF2D6F]/16 text-[#FF2D6F]">
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <div className="text-left">
        <b className="block text-[13px] font-bold leading-tight text-white">{title}</b>
        <span className="text-[11px] text-white/45">{sub}</span>
      </div>
    </div>
  )
}

export const HERO_CODE = `{/* Primary CTA — gradient via classes, so the site's .shimmer-stroke ring applies automatically */}
<button
  className="group inline-flex flex-col items-center justify-center gap-0.5 px-6 md:px-8 py-3 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] text-white transition-all hover:-translate-y-0.5"
  style={{ boxShadow: "0 12px 36px -8px rgba(255, 45, 111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)" }}
>
  <span className="inline-flex items-center gap-2.5 font-extrabold text-[15px] tracking-[0.01em]">
    Get Your Custom Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
  </span>
  <span className="text-[11px] font-semibold text-white/85 tracking-[0.01em]">Delivered in under 4 hours — not days.</span>
</button>

{/* Secondary — glass + explicit .shimmer-stroke */}
<button className="shimmer-stroke inline-flex items-center justify-center gap-2.5 px-6 py-3.5 md:py-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white font-bold text-[14px] backdrop-blur-md hover:bg-white/[0.10] hover:border-white/[0.22] transition-all">
  <Play className="w-4 h-4 fill-white" /> Watch How We Work
</button>

{/* Includes bar */}
<div className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] bg-[#FFD24A]/[0.08] border border-[#FFD24A]/25">
  <Gift className="w-4 h-4 text-[#FFD24A]" strokeWidth={2.2} />
  <span className="text-[#FFD24A] text-[12px] md:text-[13px] font-semibold">Includes: Free 3D render + site survey + dedicated Technical Director</span>
</div>`

/* ── Section eyebrows ─────────────────────────────────────────────────────── */

export function ShopPill({ children = "Rent the Gear" }: { children?: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]"
      style={{ background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)", border: "1px solid rgba(255,94,58,0.25)", color: "#FFB366" }}
    >
      <Package className="h-3.5 w-3.5" />
      {children}
    </span>
  )
}

/* ── Ratings bar (ratings-bar.tsx — values are placeholders in the source) ── */

export function RatingsBar() {
  const sources = [
    ["Google", "4.9", "180+ reviews"],
    ["G2", "4.8", "95+ reviews"],
    ["Yelp", "5.0", "60+ reviews"],
  ]
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-4 rounded-2xl px-6 py-5 md:gap-8"
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.10)" }}
    >
      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/45">Trusted &amp; top-rated</span>
      {sources.map(([label, rating, reviews], i) => (
        <span key={label} className="flex items-center gap-2.5">
          {i > 0 && <span className="-ml-4 mr-4 hidden h-6 w-px bg-white/10 md:block" />}
          <span className="text-[14px] font-bold text-white">{label}</span>
          <span className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((n) => (
              <Star key={n} className="h-3.5 w-3.5 text-[#FFD24A]" fill="currentColor" />
            ))}
          </span>
          <span className="text-[14px] font-black text-white">{rating}</span>
          <span className="text-[12px] text-white/45">{reviews}</span>
        </span>
      ))}
    </div>
  )
}

/* ── Service card (services-grid-section.tsx) ─────────────────────────────── */

export function ServiceCard({
  title = "Sound System Rental",
  body = "L-Acoustics and d&b audio systems, tuned to your room with A1 + A2 engineers on every show.",
  image = "/images/services/sound-system-card.webp",
  Icon = Volume2,
}: {
  title?: string
  body?: string
  image?: string
  Icon?: IconType
}) {
  return (
    <div
      className="keep-original group flex cursor-pointer flex-col overflow-hidden rounded-[22px] border border-[#FF2D6F]/20 bg-[#0a0a0a] transition-transform hover:-translate-y-0.5 hover:border-[#FF2D6F]/45"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="relative flex flex-1 flex-col p-4 sm:p-6">
        <div
          className="-mt-11 mb-3 flex h-11 w-11 items-center justify-center rounded-[14px] text-[#FF2D6F] backdrop-blur-md sm:-mt-14 sm:mb-4 sm:h-14 sm:w-14"
          style={{ background: "rgba(255,45,111,0.22)", border: "1px solid rgba(255,45,111,0.35)" }}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.7} />
        </div>
        <h3 className="mb-2 text-[15px] font-bold leading-tight tracking-[-0.01em] text-white sm:text-[20px]">{title}</h3>
        <p className="mb-5 hidden flex-1 text-[14px] leading-[1.6] text-white/65 sm:block">{body}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-[13px] font-bold text-[#FF2D6F] transition-all group-hover:gap-3 sm:text-[14px]">
          Get a Quote <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  )
}

export const SERVICE_CARD_CODE = `<Link
  className="keep-original group flex flex-col rounded-[22px] border border-[#FF2D6F]/20 overflow-hidden transition-transform hover:-translate-y-0.5 hover:border-[#FF2D6F]/45 bg-[#0a0a0a]"
  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)" }}
>
  <div className="relative aspect-[4/3] overflow-hidden">
    <Image fill className="object-cover transition-transform duration-500 group-hover:scale-105" … />
  </div>
  <div className="relative flex flex-col flex-1 p-4 sm:p-6">
    {/* icon tile overlaps the photo */}
    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-[14px] flex items-center justify-center text-[#FF2D6F] -mt-11 sm:-mt-14 mb-3 sm:mb-4 backdrop-blur-md"
      style={{ background: "rgba(255,45,111,0.22)", border: "1px solid rgba(255,45,111,0.35)" }}>
      <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.7} />
    </div>
    <h3 className="text-[15px] sm:text-[20px] font-bold text-white tracking-[-0.01em] mb-2 leading-tight">Sound System Rental</h3>
    <p className="hidden sm:block text-white/65 text-[14px] leading-[1.6] mb-5 flex-1">…</p>
    <span className="mt-auto inline-flex items-center gap-2 text-[#FF2D6F] font-bold text-[13px] sm:text-[14px] group-hover:gap-3 transition-all">
      Get a Quote <ArrowRight className="w-4 h-4" />
    </span>
  </div>
</Link>`

/* ── Why-us card (landing-why-us.tsx → .ds-card) ──────────────────────────── */

export function WhyCard({ title = "One Team, Start to Finish", body = "Same crew from site survey to strike. No handoffs, no miscommunication.", Icon = Users }: { title?: string; body?: string; Icon?: IconType }) {
  return (
    <div className="ds-card p-5 md:p-6">
      <div className="mb-3.5 grid h-11 w-11 place-items-center rounded-[12px] border border-[#FF2D6F]/24 bg-[#FF2D6F]/14 text-[#FF2D6F]">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="mb-1.5 text-[16px] font-bold leading-snug text-white md:text-[17px]">{title}</h3>
      <p className="text-[13px] leading-relaxed text-white/60 md:text-[14px]">{body}</p>
    </div>
  )
}

export const WHY_CARD_CODE = `<div className="ds-card p-5 md:p-6">
  <div className="w-11 h-11 rounded-[12px] bg-[#FF2D6F]/14 border border-[#FF2D6F]/24 grid place-items-center text-[#FF2D6F] mb-3.5">
    <Users className="w-5 h-5" strokeWidth={2} />
  </div>
  <h3 className="text-[16px] md:text-[17px] font-bold text-white mb-1.5 leading-snug">One Team, Start to Finish</h3>
  <p className="text-[13px] md:text-[14px] text-white/60 leading-relaxed">…</p>
</div>`

/* ── Testimonial (landing-why-us.tsx) ─────────────────────────────────────── */

export function Testimonial() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] border border-white/[0.08] px-6 py-7 md:px-10 md:py-9"
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)" }}
    >
      <Quote className="absolute -top-2 left-4 h-14 w-14 -scale-x-100 text-[#FF2D6F]/10" aria-hidden />
      <Quote className="absolute -bottom-3 right-4 h-14 w-14 text-[#FF2D6F]/10" aria-hidden />
      <p className="relative text-balance text-center text-[18px] font-medium leading-relaxed text-white/90 md:text-[22px]">
        “We&apos;ve used Prime Line for 6 events now. The difference is <span className="ds-accent-text">night and day</span>. They{" "}
        <span className="ds-accent-text">own the entire production</span> so I can actually focus on my guests.”
      </p>
      <div className="relative mt-6 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] text-[14px] font-bold text-white" style={{ boxShadow: "0 8px 24px -8px rgba(255,45,111,0.6)" }}>
            LS
          </div>
          <div className="text-left">
            <p className="text-[14px] font-bold text-white">Lauren Selman</p>
            <p className="text-[12px] text-white/45">Event Producer</p>
          </div>
        </div>
        <span className="hidden h-8 w-px bg-white/10 sm:block" />
        <span className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((n) => (
            <Star key={n} className="h-4 w-4 text-[#FFD24A]" fill="currentColor" />
          ))}
        </span>
      </div>
    </div>
  )
}

/* ── Product card (product-card.tsx; data from data/products.json) ────────── */

export function ProductCard({
  title = "Stage + LED Package 1",
  body = "Professional stage / deck system available for rental. Delivered, built and certified.",
  image = "/images/products/stage/stage-package-1/main.webp",
  badge = "Stage / Deck",
  features = ["Modular Decking", "Adjustable Height", "Skirting Available"],
  price = "3,049",
  original = "3,349",
  save = "300",
  discount = 9,
  delivery = "375",
  setup = "675",
}: {
  title?: string
  body?: string
  image?: string
  badge?: string
  features?: string[]
  price?: string
  original?: string
  save?: string
  discount?: number
  delivery?: string
  setup?: string
}) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)" }}
    >
      <div className="absolute -right-[2px] top-4 z-20">
        <div
          className="relative px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-white"
          style={{ background: BRAND, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%)", boxShadow: "0 4px 12px rgba(255,45,111,0.5)" }}
        >
          -{discount}% OFF
        </div>
        <div className="absolute -bottom-1 right-0 h-0 w-0" style={{ borderLeft: "6px solid transparent", borderTop: "4px solid #C41F55" }} />
      </div>
      <div className="absolute left-4 top-4 z-20">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{ background: "linear-gradient(135deg, #FFD24A 0%, #FF9500 100%)", color: "#000", boxShadow: "0 4px 12px rgba(255,210,74,0.4)" }}
        >
          <Star className="h-3 w-3" fill="currentColor" /> Best Seller
        </span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}>
            {badge}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold text-white backdrop-blur-md" style={{ background: "rgba(255,45,111,0.9)", boxShadow: "0 8px 24px rgba(255,45,111,0.5)" }}>
            <Eye className="h-4 w-4" /> Quick View
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-[#FF2D6F]">{title}</h3>
        <p className="mb-4 line-clamp-2 text-[13px] text-white/50">{body}</p>
        <div className="mb-4 flex min-h-[28px] flex-wrap gap-1.5">
          {features.map((f) => (
            <span key={f} className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white/70" style={{ background: "rgba(255,255,255,0.06)" }}>
              <CheckCircle2 className="h-2.5 w-2.5 text-[#FF5E3A]" /> {f}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">${price}</span>
              <span className="text-[13px] text-white/40">/ 24h</span>
            </div>
            <div className="mt-0.5 flex h-5 items-center gap-2">
              <span className="text-[13px] text-white/40 line-through">${original}</span>
              <span className="text-[11px] font-bold text-[#FF5E3A]">Save ${save}</span>
            </div>
          </div>
          <div className="mb-4 flex items-center gap-3 rounded-xl p-3" style={{ background: "rgba(255,94,58,0.08)", border: "1px solid rgba(255,94,58,0.18)" }}>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#FF8A5E" }}>
              <Truck className="h-3.5 w-3.5" style={{ color: "#FF5E3A" }} /> Delivery: ${delivery}
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#FF8A5E" }}>
              <Wrench className="h-3.5 w-3.5" style={{ color: "#FF5E3A" }} /> Setup: ${setup}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold transition-all hover:opacity-90"
              style={{ background: BRAND, color: "#fff", boxShadow: "0 8px 20px -4px rgba(255,45,111,0.5)" }}
            >
              <ShoppingCart className="h-4 w-4" /> Add to Quote
            </button>
            <span className="flex w-12 items-center justify-center rounded-xl transition-all hover:bg-white/10" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
              <ArrowRight className="h-4 w-4 text-white/70" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const PRODUCT_CARD_CODE = `{/* Card shell */}
<div className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)" }}>

{/* Discount ribbon */}
<div className="relative px-3 py-1.5 text-[11px] font-black tracking-wide text-white uppercase"
  style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%)", boxShadow: "0 4px 12px rgba(255,45,111,0.5)" }}>-9% OFF</div>
<div className="absolute -bottom-1 right-0 w-0 h-0" style={{ borderLeft: "6px solid transparent", borderTop: "4px solid #C41F55" }} />

{/* Best Seller */}
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
  style={{ background: "linear-gradient(135deg, #FFD24A 0%, #FF9500 100%)", color: "#000", boxShadow: "0 4px 12px rgba(255,210,74,0.4)" }}>
  <Star className="w-3 h-3" fill="currentColor" /> Best Seller
</span>

{/* Price */}
<span className="text-xl sm:text-2xl font-black text-white">$3,049</span> <span className="text-[12px] sm:text-[13px] text-white/40">/ 24h</span>
<span className="text-[13px] text-white/40 line-through">$3,349</span> <span className="text-[11px] font-bold text-[#FF5E3A]">Save $300</span>

{/* Fees */}
<div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,94,58,0.08)", border: "1px solid rgba(255,94,58,0.18)" }}>
  <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#FF8A5E" }}><Truck className="w-3.5 h-3.5" style={{ color: "#FF5E3A" }} />Delivery: $375</div>
</div>

{/* Add to Quote */}
<button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold"
  style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", color: "#fff", boxShadow: "0 8px 20px -4px rgba(255,45,111,0.5)" }}>
  <ShoppingCart className="w-4 h-4" /> Add to Quote
</button>`

/* ── Event-type card (event-types-section.tsx) ────────────────────────────── */

export function EventCard({ title = "Experiential Marketing", tag = "Brand activations", image = "/images/events/experiential-marketing.webp" }: { title?: string; tag?: string; image?: string }) {
  return (
    <div className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-[16px] border border-white/[0.08] text-left transition-all duration-500 hover:-translate-y-1 hover:border-[#FF2D6F]/30">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03070a]/95 via-[#03070a]/55 to-[#03070a]/15 transition-all duration-500 group-hover:from-[#7C2D5A]/92 group-hover:via-[#03070a]/55" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white" style={{ background: "linear-gradient(135deg, #FF2D6F, #FF5E3A)", boxShadow: "0 8px 22px -6px rgba(255,45,111,0.55)" }}>
          <Sparkles className="h-3 w-3" /> Get a Quote
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <span className="mb-2 inline-block rounded-md bg-[#FF2D6F] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-white">{tag}</span>
        <h3 className="text-[13px] font-bold leading-tight text-white md:text-[14px]">{title}</h3>
      </div>
    </div>
  )
}

export const EVENT_CARD_CODE = `<button className="group relative aspect-[3/4] rounded-[16px] overflow-hidden border border-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:border-[#FF2D6F]/30">
  <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" … />
  <div className="absolute inset-0 bg-gradient-to-t from-[#03070a]/95 via-[#03070a]/55 to-[#03070a]/15 group-hover:from-[#7C2D5A]/92" />
  <div className="absolute bottom-0 left-0 right-0 p-3">
    <span className="inline-block px-2 py-0.5 rounded-md bg-[#FF2D6F] text-white text-[9px] font-extrabold tracking-[0.08em] uppercase mb-2">Brand activations</span>
    <h3 className="text-white text-[13px] md:text-[14px] font-bold leading-tight">Experiential Marketing</h3>
  </div>
</button>`
