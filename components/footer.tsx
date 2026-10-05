"use client"

import type React from "react"
import { ArrowRight } from "lucide-react"
import { Icon3D } from "@/components/icon-3d"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact"

const SERVICES = [
  { label: "Stage Rental", href: "/services/stage-rental" },
  { label: "Sound System Rental", href: "/services/sound-system-rental" },
  { label: "Lighting Rental", href: "/services/lighting-rental" },
  { label: "Full AV Production", href: "/services/full-av-production" },
  { label: "TV Rental", href: "/services/tv-rental" },
  { label: "Projector & Screen Rental", href: "/services/projector-screen-rental" },
  { label: "Pipe & Drape Rental", href: "/services/pipe-drape-rental" },
  { label: "LED Screen Rental", href: "/services/led-screen-rental" },
]

const COMPANY = [
  { label: "Why Us", href: "/#why-us" },
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#our-work" },
  { label: "Industry", href: "/#events" },
  { label: "FIFA 2026", href: "/fifa-2026-packages" },
]

const LEGAL = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
]

// Popular service-area locations (full city list lives across the site).
const LOCATIONS = [
  "Los Angeles", "New York", "Miami", "Las Vegas", "Chicago", "Houston",
  "Dallas", "San Francisco", "Atlanta", "Orlando", "Hollywood", "Beverly Hills",
  "Santa Monica", "Miami Beach", "Fort Lauderdale", "Tampa",
].map((name) => ({ name, href: "/" + name.toLowerCase().replace(/\s+/g, "-") }))

export function Footer() {
  const pathname = usePathname()
  const isFifa = pathname?.startsWith("/fifa-2026-packages")

  const accent = isFifa ? "#E61D25" : "#FF2D6F"
  const accentDeep = isFifa ? "#BF1119" : "#FF5E3A"
  const accentText = isFifa ? "text-[#E61D25]" : "text-[#FF2D6F]"
  const accentBorder = isFifa ? "border-[#E61D25]/10" : "border-[#FF2D6F]/10"
  const accentHover = isFifa ? "hover:text-[#E61D25]" : "hover:text-[#FF2D6F]"

  const openQuote = () => {
    document.dispatchEvent(new CustomEvent("openQuoteForm"))
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split("#")[1]
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) {
      e.preventDefault()
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className={`relative overflow-hidden border-t pb-24 md:pb-0 ${accentBorder}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(3,7,10,0.4) 50%, rgba(3,7,10,0.85) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_0.9fr] gap-10 lg:gap-12 pb-12 border-b border-white/[0.06]">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-flex">
              <Image
                src="/images/prime-line-av-logo-dark-bg.svg"
                alt="Prime Line AV"
                width={200}
                height={75}
                className="h-9 w-auto theme-logo-dark"
              />
              <Image
                src="/images/prime-line-av-logo-light-bg.svg"
                alt="Prime Line AV"
                width={200}
                height={75}
                className="h-9 w-auto theme-logo-light"
              />
            </Link>
            <p className="text-white/50 text-[14px] leading-relaxed max-w-xs">
              Full-service AV production for the brands that demand flawless execution. Coast-to-coast deployment, one team, one bill.
            </p>

            <button
              onClick={openQuote}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[13px] font-extrabold tracking-[0.02em] transition-all hover:-translate-y-0.5 self-start"
              style={{
                background: `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)`,
                color: "#fff",
                boxShadow: isFifa
                  ? "0 12px 36px -8px rgba(230,29,37,0.55), inset 0 1px 0 rgba(255,255,255,0.25)"
                  : "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.30)",
              }}
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Services column */}
          <div>
            <p className={`text-[10px] font-extrabold tracking-[0.16em] uppercase mb-5 ${accentText}`}>
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-[13px] font-medium text-white/55 ${accentHover} transition-colors`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className={`text-[10px] font-extrabold tracking-[0.16em] uppercase mb-5 ${accentText}`}>
              Company
            </p>
            <ul className="flex flex-col gap-2.5 mb-8">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-[13px] font-medium text-white/55 ${accentHover} transition-colors`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact info stacked */}
            <div className="flex flex-col gap-3">
              <a
                href={PHONE_TEL}
                suppressHydrationWarning
                className="group flex items-center gap-2.5"
              >
                <Icon3D name="headset" size={26} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                <span suppressHydrationWarning className={`text-[13px] font-semibold text-white/65 ${accentHover} transition-colors`}>
                  {PHONE_DISPLAY}
                </span>
              </a>
              <div className="flex items-center gap-2.5">
                <Icon3D name="stopwatch" size={26} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                <span className="text-[13px] text-white/45">Mon–Fri 8am–7pm · Sat 10am–4pm</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon3D name="location-pin" size={26} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                <span className="text-[13px] text-white/45">Nationwide · Coast-to-coast</span>
              </div>
            </div>
          </div>

          {/* Legal column */}
          <div className="hidden lg:block">
            <p className={`text-[10px] font-extrabold tracking-[0.16em] uppercase mb-5 ${accentText}`}>
              Legal
            </p>
            <ul className="flex flex-col gap-2.5">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-[13px] font-medium text-white/55 ${accentHover} transition-colors`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Locations band */}
        <div className="py-8 border-b border-white/[0.06]">
          <p className={`text-[10px] font-extrabold tracking-[0.16em] uppercase mb-4 ${accentText}`}>
            Locations We Serve
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className={`text-[13px] font-medium text-white/55 ${accentHover} transition-colors`}
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile legal links */}
        <div className="lg:hidden flex gap-4 justify-center py-6 border-b border-white/[0.06] text-[12px]">
          {LEGAL.map((item, idx) => (
            <div key={item.href} className="flex items-center gap-4">
              <Link
                href={item.href}
                className={`font-medium text-white/55 ${accentHover} transition-colors`}
              >
                {item.label}
              </Link>
              {idx < LEGAL.length - 1 && <span className="text-white/20">·</span>}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/35 text-[12px]">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Prime Line AV. All rights reserved.</p>
          <p>When everything is just perfect.</p>
        </div>
      </div>
    </footer>
  )
}
