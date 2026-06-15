"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { CATEGORIES, getProductsByCategory } from "@/lib/products-data"
import type { ProductCategory } from "@/lib/cart-context"
import {
  Home,
  Layers,
  Sparkles,
  ShoppingCart,
  ShoppingBag,
  Store,
  Box,
  Volume2,
  Lightbulb,
  Monitor,
  Tv,
  Disc3,
  Columns,
  ChevronUp,
  X,
  Phone,
  ArrowRight,
} from "lucide-react"
import type React from "react"

import { WHATSAPP_HREF, PHONE_TEL as PHONE_HREF, PHONE_DISPLAY as PHONE_LABEL } from "@/lib/contact"

const CATEGORY_ICONS: Record<ProductCategory, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "led-screens": Monitor,
  "dj-setups": Disc3,
  "sound-systems": Volume2,
  lighting: Lightbulb,
  stage: Box,
  "pipe-drape": Columns,
  tv: Tv,
}

// Product categories for the Shop panel — link to the category page (which shows
// its products) or to the full catalog when there's no dedicated page.
const SHOP_CATEGORIES = CATEGORIES.map((c) => ({
  label: c.shortLabel,
  href: c.serviceSlug ? `/services/${c.serviceSlug}` : "/shop",
  icon: CATEGORY_ICONS[c.slug],
  count: getProductsByCategory(c.slug).length,
}))

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface MobileBottomNavProps {
  onStartQuote: () => void
}

export function MobileBottomNav({ onStartQuote }: MobileBottomNavProps) {
  const pathname = usePathname()
  const isFifa = pathname?.startsWith("/fifa-2026-packages")
  const [shopOpen, setShopOpen] = useState(false)
  const [chooserOpen, setChooserOpen] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { isCartOpen } = useCart()

  // Show nav only after scrolling past the first block
  useEffect(() => {
    let raf = 0
    let pending = false
    const handle = () => {
      pending = false
      const y = window.scrollY
      const threshold = Math.max(window.innerHeight * 0.8, 480)
      setNavVisible(y >= threshold)
    }
    const onScroll = () => {
      if (!pending) { pending = true; raf = requestAnimationFrame(handle) }
    }
    handle()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  // Lock body scroll when a sheet/panel is open
  useEffect(() => {
    if (!chooserOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [chooserOpen])

  useEffect(() => {
    if (!chooserOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setChooserOpen(false) }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [chooserOpen])

  // Close panels when navigating
  useEffect(() => {
    setShopOpen(false)
    setChooserOpen(false)
  }, [pathname])

  // Hide when header burger menu is open
  useEffect(() => {
    const handler = (e: Event) => setHeaderMenuOpen((e as CustomEvent).detail.open)
    document.addEventListener("headerMenuToggle", handler)
    return () => document.removeEventListener("headerMenuToggle", handler)
  }, [])

  // Hide when the shop filters drawer is open
  useEffect(() => {
    const handler = (e: Event) => setFiltersOpen((e as CustomEvent).detail.open)
    document.addEventListener("shopFiltersToggle", handler)
    return () => document.removeEventListener("shopFiltersToggle", handler)
  }, [])

  // Close shop panel on outside tap
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!shopOpen) return
    const handler = (e: TouchEvent | MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setShopOpen(false)
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [shopOpen])

  const accent = isFifa ? "#E61D25" : "#FF2D6F"
  const accentDeep = isFifa ? "#BF1119" : "#FF5E3A"
  const accentSoft = isFifa ? "#FF6B71" : "#FFD24A"
  const ringShadow = isFifa
    ? "0 14px 36px -8px rgba(230,29,37,0.65), 0 0 0 4px rgba(10,15,31,0.95), inset 0 1px 0 rgba(255,255,255,0.30)"
    : "0 14px 36px -8px rgba(255,45,111,0.65), 0 0 0 4px rgba(10,8,24,0.95), inset 0 1px 0 rgba(255,255,255,0.30)"
  const railBg = isFifa ? "rgba(10,15,31,0.92)" : "rgba(10,8,24,0.92)"

  const isShopActive = pathname === "/shop" || pathname?.startsWith("/services/") || shopOpen
  const panelsHidden = !navVisible || headerMenuOpen || isCartOpen || filtersOpen

  return (
    <>
      {/* Shop categories panel */}
      <div
        ref={panelRef}
        className={`md:hidden fixed bottom-[72px] left-3 right-3 z-50 transition-all duration-300 ease-out ${
          shopOpen && !panelsHidden ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className="max-w-md mx-auto rounded-2xl border border-white/10 backdrop-blur-2xl overflow-hidden"
          style={{ background: railBg, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
            <span className="text-[10px] font-extrabold tracking-[0.16em] uppercase" style={{ color: accent }}>Shop by Category</span>
            <button onClick={() => setShopOpen(false)} className="text-white/40 hover:text-white/80 transition-colors p-1" aria-label="Close">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="px-2 pb-2 grid grid-cols-2 gap-1">
            {SHOP_CATEGORIES.map(({ label, href, icon: Icon, count }) => {
              const active = pathname === href
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setShopOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all"
                  style={{ background: active ? `${accent}18` : "rgba(255,255,255,0.04)", color: active ? accent : "rgba(255,255,255,0.82)" }}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: active ? `${accent}22` : "rgba(255,255,255,0.05)" }}>
                    {Icon ? <Icon className="w-4 h-4" strokeWidth={2.2} /> : <Box className="w-4 h-4" strokeWidth={2.2} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-semibold leading-tight truncate">{label}</span>
                    <span className="block text-[10px] text-white/40">{count} items</span>
                  </span>
                </Link>
              )
            })}
          </div>
          {/* View full catalog */}
          <div className="px-2 pb-3">
            <Link
              href="/shop"
              onClick={() => setShopOpen(false)}
              className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-white font-extrabold text-[13px]"
              style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)` }}
            >
              <Store className="w-4 h-4" /> View Full Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom nav bar */}
      <nav
        className="md:hidden fixed bottom-3 left-3 right-3 z-50 pointer-events-none transition-all duration-500 ease-out"
        style={{
          opacity: panelsHidden ? 0 : 1,
          transform: panelsHidden ? "translateY(48px)" : "translateY(0)",
        }}
        aria-hidden={panelsHidden}
      >
        <div className="relative max-w-md mx-auto pointer-events-auto">
          <div
            className="relative grid grid-cols-5 items-center gap-1 px-2 py-1.5 rounded-full border backdrop-blur-2xl backdrop-saturate-150"
            style={{
              background: railBg,
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Home */}
            <NavLink href="/" icon={Home} label="Home" active={pathname === "/"} accent={accent} />

            {/* Categories panel */}
            <button
              onClick={() => setShopOpen((v) => !v)}
              className="group flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-full transition-colors"
              style={{ color: isShopActive ? accent : "rgba(255,255,255,0.55)" }}
              aria-label="Shop by category"
              aria-expanded={shopOpen}
            >
              {shopOpen ? <ChevronUp className="w-[18px] h-[18px]" strokeWidth={2.2} /> : <Layers className="w-[18px] h-[18px]" strokeWidth={2.2} />}
              <span className="text-[9px] font-bold tracking-[0.06em] uppercase">Categories</span>
            </button>

            {/* Centered raised Shop button → full catalog */}
            <div className="flex justify-center">
              <Link
                href="/shop"
                className="relative -translate-y-4 w-[58px] h-[58px] rounded-full flex flex-col items-center justify-center text-white transition-transform active:scale-95"
                style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)`, boxShadow: ringShadow }}
                aria-label="Shop all products"
              >
                <Store className="w-[22px] h-[22px]" strokeWidth={2.2} />
                <span
                  className="absolute -bottom-5 text-[9px] font-extrabold tracking-[0.14em] uppercase whitespace-nowrap"
                  style={{ color: accentSoft }}
                >
                  Shop
                </span>
              </Link>
            </div>

            {/* Quote / contact — opens the global channel chooser */}
            <button
              onClick={onStartQuote}
              className="group flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-full transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
              aria-label="Get a quote"
            >
              <Sparkles className="w-[18px] h-[18px]" strokeWidth={2.2} />
              <span className="text-[9px] font-bold tracking-[0.06em] uppercase">Quote</span>
            </button>

            {/* Call */}
            <a
              href={PHONE_HREF}
              suppressHydrationWarning
              className="group flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-full transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
              aria-label="Call us"
            >
              <Phone className="w-[18px] h-[18px]" strokeWidth={2.2} />
              <span className="text-[9px] font-bold tracking-[0.06em] uppercase">Call</span>
            </a>
          </div>
        </div>
      </nav>

    </>
  )
}

function ContactSheet({
  open,
  onClose,
  onStartQuote,
  accent,
  accentDeep,
}: {
  open: boolean
  onClose: () => void
  onStartQuote: () => void
  accent: string
  accentDeep: string
}) {
  return (
    <div
      className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-black/65 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contact us"
        className={`fixed left-0 right-0 bottom-0 transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className="mx-3 mb-3 rounded-3xl border backdrop-blur-2xl backdrop-saturate-150 overflow-hidden"
          style={{
            background: "rgba(10,8,24,0.96)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 24px 60px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
            paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
          }}
        >
          <div className="flex justify-center pt-3">
            <div className="w-10 h-1 rounded-full bg-white/15" />
          </div>
          <div className="px-5 pt-3 pb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-white text-[18px] font-extrabold tracking-[-0.01em]">How can we help?</h3>
              <p className="text-white/55 text-[13px] mt-0.5 leading-snug">
                Pick a channel — we usually reply within minutes.<br />
                <span className="text-white/35">We Speak English and Spanish</span>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors shrink-0"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="px-3 pb-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={onStartQuote}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left text-white font-bold transition-transform active:scale-[0.99]"
              style={{
                background: `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)`,
                boxShadow: "0 10px 30px -10px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
                <Sparkles className="w-5 h-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] leading-tight">Request a Quote</span>
                <span className="text-[12px] font-medium text-white/80">Get a tailored proposal</span>
              </span>
            </button>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-transform active:scale-[0.99]"
              style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.30)", color: "#25D366" }}
            >
              <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(37,211,102,0.18)" }}>
                <WhatsAppGlyph className="w-5 h-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] leading-tight font-bold">WhatsApp</span>
                <span className="text-[12px] font-medium text-[#25D366]/80">Worldwide — chat anywhere</span>
              </span>
            </a>
            <a
              href={PHONE_HREF}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-transform active:scale-[0.99]"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.92)" }}
            >
              <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.10)" }}>
                <Phone className="w-5 h-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] leading-tight font-bold">Call us</span>
                <span className="text-[12px] font-medium text-white/55">USA only · {PHONE_LABEL}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavLink({
  href,
  icon: Icon,
  label,
  active,
  accent,
}: {
  href: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
  active: boolean
  accent: string
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-full transition-colors"
      style={{ color: active ? accent : "rgba(255,255,255,0.55)" }}
    >
      <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
      <span className="text-[9px] font-bold tracking-[0.06em] uppercase">{label}</span>
    </Link>
  )
}
