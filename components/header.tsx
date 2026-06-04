"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, Menu, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { PromoTopBanner } from "./promo-top-banner"
import { DesktopNav } from "./mega-menu"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact"

type MobileGroup = { heading: string; links: { label: string; href: string }[] }

const mobileGroups: MobileGroup[] = [
  {
    heading: "Shop",
    links: [
      { label: "Full Rental Catalog", href: "/shop" },
      { label: "LED Video Walls", href: "/services/led-screen-rental" },
      { label: "Sound Systems", href: "/services/sound-system-rental" },
      { label: "Lighting", href: "/services/lighting-rental" },
      { label: "Stage & Production", href: "/services/stage-rental" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Full AV Production", href: "/services/full-av-production" },
      { label: "TV Rental", href: "/services/tv-rental" },
      { label: "Projector & Screen", href: "/services/projector-screen-rental" },
      { label: "Pipe & Drape", href: "/services/pipe-drape-rental" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    heading: "Locations",
    links: [
      { label: "Los Angeles", href: "/los-angeles" },
      { label: "New York", href: "/new-york" },
      { label: "Miami", href: "/miami" },
      { label: "Las Vegas", href: "/las-vegas" },
      { label: "Chicago", href: "/chicago" },
      { label: "All Locations", href: "/locations" },
    ],
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuTop, setMenuTop] = useState(0)
  const lastY = useRef(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isFifa = pathname?.startsWith("/fifa-2026-packages")

  // Close menu when header hides
  useEffect(() => {
    if (hidden) setMobileMenuOpen(false)
  }, [hidden])

  // Notify bottom nav when burger menu opens/closes
  useEffect(() => {
    document.dispatchEvent(new CustomEvent("headerMenuToggle", { detail: { open: mobileMenuOpen } }))
  }, [mobileMenuOpen])

  // CTM swap when mobile menu opens (menu is conditionally rendered, missed by initial scan)
  useEffect(() => {
    if (!mobileMenuOpen) return
    const swap = () => {
      try {
        const ctm = (window as any).__ctm
        if (!ctm) return
        ctm.main?.scan?.()
        ctm.main?.runNow?.()
      } catch (e) {}
    }
    const t1 = setTimeout(swap, 50)
    const t2 = setTimeout(swap, 400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    let raf = 0
    let pending = false
    const handle = () => {
      pending = false
      const y = window.scrollY
      const delta = y - lastY.current

      if (y < 80) {
        setHidden(false)
      } else if (delta > 4) {
        setHidden(true)
      } else if (delta < -4) {
        setHidden(false)
      }

      lastY.current = y
    }
    const onScroll = () => {
      if (!pending) {
        pending = true
        raf = requestAnimationFrame(handle)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const accent = isFifa ? "#E61D25" : "#FF2D6F"
  const accentDeep = isFifa ? "#BF1119" : "#FF5E3A"
  const accentText = isFifa ? "text-[#E61D25]" : "text-[#FF2D6F]"
  const accentHoverBg = isFifa ? "hover:bg-[#E61D25]/10" : "hover:bg-[#FF2D6F]/10"
  const ctaShadow = isFifa
    ? "0 8px 22px -6px rgba(230,29,37,0.55), inset 0 1px 0 rgba(255,255,255,0.25)"
    : "0 8px 22px -6px rgba(255,45,111,0.45), inset 0 1px 0 rgba(255,255,255,0.30)"
  const ctaTextColor = "text-white"
  const headerBg = isFifa ? "rgba(10, 15, 31, 0.62)" : "rgba(10, 8, 24, 0.62)"

  const openQuote = () => {
    setMobileMenuOpen(false)
    document.dispatchEvent(new CustomEvent("openQuoteForm"))
  }

  const toggleMenu = () => {
    if (!mobileMenuOpen && headerRef.current) {
      setMenuTop(headerRef.current.getBoundingClientRect().bottom)
    }
    setMobileMenuOpen((v) => !v)
  }

  return (
    <>
      <div
        ref={headerRef}
        className="sticky top-0 z-50 transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: hidden ? "translateY(-110%)" : "translateY(0)" }}
      >
        <PromoTopBanner />

        <header className="py-3">
          <div className="max-w-7xl mx-auto px-4">
            <div
              className="flex items-center justify-between gap-4 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-md backdrop-saturate-150"
              style={{
                background: headerBg,
                boxShadow:
                  "0 12px 36px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <Link href="/" className="flex items-center shrink-0">
                <Image
                  src="/images/prime-line-av-logo-dark-bg.svg"
                  alt="Prime Line AV"
                  width={210}
                  height={38}
                  className="h-9 w-auto"
                />
              </Link>

              {/* Desktop Navigation — premium hover mega-menu */}
              <DesktopNav
                accent={accent}
                accentDeep={accentDeep}
                accentText={accentText}
                accentHoverBg={accentHoverBg}
                onQuote={openQuote}
              />

              {/* Right side: Phone + Quote CTA */}
              <div className="hidden md:flex items-center gap-2.5">
                <a
                  href={PHONE_TEL}
                  suppressHydrationWarning
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] bg-white/[0.04] border border-white/[0.10] text-white/85 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.20] transition-all text-[13px] font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span suppressHydrationWarning className="hidden xl:inline">{PHONE_DISPLAY}</span>
                </a>

                <button
                  onClick={openQuote}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] ${ctaTextColor} font-extrabold text-[13px] tracking-[0.02em] transition-all hover:-translate-y-0.5`}
                  style={{
                    background: `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)`,
                    boxShadow: ctaShadow,
                  }}
                >
                  Get a Quote
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden text-white p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]"
                onClick={toggleMenu}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu — fixed overlay outside sticky div so it doesn't affect sticky height */}
      {mobileMenuOpen && (
        <nav
          className="lg:hidden fixed left-0 right-0 z-[49] px-4 pt-2"
          style={{ top: menuTop }}
        >
          <div
            className="rounded-2xl border border-white/10 backdrop-blur-md p-4"
            style={{
              background: "rgba(6, 16, 24, 0.92)",
              boxShadow: "0 12px 36px -12px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
              {mobileGroups.map((group) => (
                <div key={group.heading} className="mb-1">
                  <div className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">
                    {group.heading}
                  </div>
                  {group.links.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-[10px] text-[14px] font-semibold tracking-[0.01em] text-white/75 hover:text-white hover:bg-white/[0.05] transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                href="/fifa-2026-packages"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-3 rounded-[10px] text-[14px] font-bold tracking-[0.02em] uppercase ${accentText} ${accentHoverBg} transition-all`}
              >
                FIFA 2026
              </Link>

              <div className="h-px bg-white/[0.08] my-2" />

              <a
                href={PHONE_TEL}
                suppressHydrationWarning
                className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-[10px] bg-white/[0.04] border border-white/[0.10] text-white/85 font-semibold text-[14px]"
              >
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
              <button
                onClick={openQuote}
                className={`flex items-center justify-center gap-2 w-full px-3 py-3 rounded-[10px] ${ctaTextColor} font-extrabold text-[14px] tracking-[0.02em] transition-all`}
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)`,
                  boxShadow: ctaShadow,
                }}
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}
