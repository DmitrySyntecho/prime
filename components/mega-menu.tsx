"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  ArrowRight,
  Monitor,
  Disc3,
  Volume2,
  Lightbulb,
  Layers,
  Tv,
  Projector,
  Theater,
  Sparkles,
  Building2,
  MapPin,
  Briefcase,
  Images,
  type LucideIcon,
} from "lucide-react"
import { Icon3D } from "@/components/icon-3d"
import { navIcon } from "@/lib/nav-icons"
import { getProductsByCategory } from "@/lib/products-data"

interface MenuItem {
  label: string
  desc: string
  href: string
  image: string
  Icon: LucideIcon
  badge?: string
}

interface MenuDef {
  id: string
  label: string
  /** featured CTA shown in the right rail */
  featured: { title: string; href: string; cta: string }
  items: MenuItem[]
}

const SHOP_MENU: MenuDef = {
  id: "shop",
  label: "Shop",
  featured: { title: "Browse the full rental catalog", href: "/shop", cta: "Open Catalog" },
  items: [
    {
      label: "LED Video Walls",
      desc: "Indoor & outdoor screens, any size",
      href: "/services/led-screen-rental",
      image: "/images/products/led-screens/led-wall-1-9mm-39-3x13-1/main.webp",
      Icon: Monitor,
      badge: `${getProductsByCategory("led-screens").length}`,
    },
    {
      label: "Sound Systems",
      desc: "L-Acoustics line arrays & PA",
      href: "/services/sound-system-rental",
      image: "/images/products/sound-systems/lacoustics-syva-500-package/main.webp",
      Icon: Volume2,
      badge: `${getProductsByCategory("sound-systems").length}`,
    },
    {
      label: "DJ Setups",
      desc: "Pioneer & QSC DJ booths",
      href: "/shop",
      image: "/images/products/dj-setups/dj-setup-04/main.webp",
      Icon: Disc3,
      badge: `${getProductsByCategory("dj-setups").length}`,
    },
    {
      label: "Lighting",
      desc: "Stage & event lighting rigs",
      href: "/services/lighting-rental",
      image: "/images/products/lighting/light-package/main.webp",
      Icon: Lightbulb,
      badge: `${getProductsByCategory("lighting").length}`,
    },
    {
      label: "Stage & Production",
      desc: "Decks, risers & confidence monitors",
      href: "/services/stage-rental",
      image: "/images/products/stage/confidence-monitor/main.webp",
      Icon: Layers,
      badge: `${getProductsByCategory("stage").length}`,
    },
    {
      label: "Pipe & Drape",
      desc: "Backdrops, booth kits & canopies",
      href: "/services/pipe-drape-rental",
      image: "/images/products/pipe-drape/booth-8ft-tall-sides-black-banjo/main.webp",
      Icon: Layers,
      badge: `${getProductsByCategory("pipe-drape").length}`,
    },
    {
      label: "TVs & Displays",
      desc: "4K TVs, monitors & stands",
      href: "/services/tv-rental",
      image: "/images/products/tv/85-inch-4k-smart-tv-with-stand/main.webp",
      Icon: Tv,
      badge: `${getProductsByCategory("tv").length}`,
    },
  ],
}

const SERVICES_MENU: MenuDef = {
  id: "services",
  label: "Services",
  featured: { title: "Not sure what you need? Talk to our team", href: "/quote", cta: "Get a Quote" },
  items: [
    { label: "Full AV Production", desc: "End-to-end event production", href: "/services/full-av-production", image: "/images/services/full-av-card.webp", Icon: Sparkles },
    { label: "LED Screen Rental", desc: "Video walls & displays", href: "/services/led-screen-rental", image: "/images/services/led-screen-card.webp", Icon: Monitor },
    { label: "Sound System Rental", desc: "Line arrays, PA & monitors", href: "/services/sound-system-rental", image: "/images/services/sound-system-hero.webp", Icon: Volume2 },
    { label: "Lighting Rental", desc: "Stage & ambient lighting", href: "/services/lighting-rental", image: "/images/services/lighting-rental-card.webp", Icon: Lightbulb },
    { label: "Stage Rental", desc: "Stages, decks & risers", href: "/services/stage-rental", image: "/images/services/stage-rental-card.webp", Icon: Theater },
    { label: "TV Rental", desc: "Displays & monitors", href: "/services/tv-rental", image: "/images/services/tv-rental-card.webp", Icon: Tv },
    { label: "Projector & Screen", desc: "Projection setups", href: "/services/projector-screen-rental", image: "/images/services/projector-screen.webp", Icon: Projector },
    { label: "Pipe & Drape", desc: "Backdrops & dividers", href: "/services/pipe-drape-rental", image: "/images/services/pipe-drape-card.webp", Icon: Layers },
  ],
}

const COMPANY_MENU: MenuDef = {
  id: "company",
  label: "Company",
  featured: { title: "See our recent productions", href: "/portfolio", cta: "View Portfolio" },
  items: [
    { label: "About Us", desc: "Who we are & how we work", href: "/about", image: "/images/services/full-av-card.webp", Icon: Building2 },
    { label: "Portfolio", desc: "Recent events & case studies", href: "/portfolio", image: "/images/services/led-screen-card.webp", Icon: Images },
    { label: "Locations", desc: "Where we operate", href: "/locations", image: "/images/services/stage-rental-card.webp", Icon: MapPin },
    { label: "Get a Quote", desc: "Tell us about your event", href: "/quote", image: "/images/services/sound-system-hero.webp", Icon: Briefcase },
  ],
}

const MENUS = [SHOP_MENU, SERVICES_MENU, COMPANY_MENU]

function MegaPanel({ menu, accent, accentDeep, onQuote }: { menu: MenuDef; accent: string; accentDeep: string; onQuote: () => void }) {
  const [hovered, setHovered] = useState(0)
  const preview = menu.items[hovered] || menu.items[0]

  return (
    <div
      className="rounded-2xl border border-white/10 overflow-hidden backdrop-blur-2xl"
      style={{ background: "rgba(8, 10, 24, 0.92)", boxShadow: "0 24px 64px -16px rgba(0,0,0,0.7)" }}
    >
      <div className="grid grid-cols-[1.3fr_1fr]">
        {/* Left: links */}
        <div className="p-3">
          <div className={`grid ${menu.items.length > 5 ? "grid-cols-2" : "grid-cols-1"} gap-1`}>
            {menu.items.map((item, i) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onMouseEnter={() => setHovered(i)}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                style={{ background: hovered === i ? "rgba(255,45,111,0.10)" : "transparent" }}
              >
                {navIcon(item.label, item.href) ? (
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-[12px] flex-shrink-0 transition-[background-color] duration-200"
                    style={{ background: hovered === i ? "rgba(255,45,111,0.16)" : "rgba(255,255,255,0.04)" }}
                  >
                    <Icon3D name={navIcon(item.label, item.href)!} size={36} className={`transition-transform duration-300 ${hovered === i ? "scale-110 -rotate-3" : ""}`} />
                  </span>
                ) : (
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 transition-colors"
                    style={{
                      background: hovered === i ? `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)` : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <item.Icon className={`w-[18px] h-[18px] ${hovered === i ? "text-white" : "text-white/55"}`} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-white truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white/70" style={{ background: "rgba(255,255,255,0.08)" }}>
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <span className="block text-[12px] text-white/45 truncate">{item.desc}</span>
                </span>
                <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-all ${hovered === i ? "text-[#FF5E3A] translate-x-0 opacity-100" : "text-white/30 -translate-x-1 opacity-0"}`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Right: interactive image + quote banner */}
        <div className="relative p-3">
          <div className="relative h-full min-h-[240px] rounded-xl overflow-hidden">
            {menu.items.map((item, i) => (
              <Image
                key={item.image + i}
                src={item.image}
                alt={item.label}
                fill
                sizes="360px"
                className="object-cover transition-opacity duration-500"
                style={{ opacity: hovered === i ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />

            {/* label on image */}
            <div className="absolute top-4 left-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md" style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {preview.label}
              </span>
            </div>

            {/* Get a Quote banner */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="rounded-xl p-3" style={{ background: "rgba(8,10,24,0.6)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                <div className="text-[13px] font-bold text-white leading-snug mb-2">{menu.featured.title}</div>
                <div className="flex gap-2">
                  <button
                    onClick={onQuote}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-bold text-white transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)` }}
                  >
                    Get a Quote
                  </button>
                  <Link
                    href={menu.featured.href}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-bold text-white/85 transition-all hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    {menu.featured.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const toSlug = (s: string) => "/" + s.toLowerCase().replace(/\s+/g, "-")
const LOCATION_GROUPS: { title: string; cities: string[] }[] = [
  { title: "Top Metros", cities: ["Los Angeles", "New York", "Miami", "Las Vegas", "Chicago", "Houston", "Dallas", "San Francisco", "Atlanta", "Orlando"] },
  { title: "LA Area", cities: ["Hollywood", "Beverly Hills", "Santa Monica", "West Hollywood", "Pasadena", "Long Beach", "Burbank", "Glendale"] },
  { title: "Florida", cities: ["Miami Beach", "Fort Lauderdale", "Tampa", "Brickell", "Coral Gables", "Boca Raton", "West Palm Beach", "Naples"] },
]

function LocationsPanel({ accent, accentDeep }: { accent: string; accentDeep: string }) {
  return (
    <div
      className="rounded-2xl border border-white/10 overflow-hidden backdrop-blur-2xl p-5"
      style={{ background: "rgba(8, 10, 24, 0.92)", boxShadow: "0 24px 64px -16px rgba(0,0,0,0.7)" }}
    >
      <div className="grid grid-cols-3 gap-6">
        {LOCATION_GROUPS.map((g) => (
          <div key={g.title}>
            <div className="flex items-center gap-1.5 mb-3 text-[11px] font-bold uppercase tracking-wider text-[#FFB366]">
              <MapPin className="w-3.5 h-3.5" /> {g.title}
            </div>
            <ul className="space-y-1.5">
              {g.cities.map((c) => (
                <li key={c}>
                  <Link href={toSlug(c)} className="text-[13px] text-white/70 hover:text-white transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link
        href="/locations"
        className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-bold text-white"
        style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accentDeep} 100%)` }}
      >
        View all locations <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}

export function DesktopNav({
  accent,
  accentDeep,
  accentText,
  accentHoverBg,
  onQuote,
}: {
  accent: string
  accentDeep: string
  accentText: string
  accentHoverBg: string
  onQuote: () => void
}) {
  const [active, setActive] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const open = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActive(id)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActive(null), 140)
  }

  const activeMenu = MENUS.find((m) => m.id === active)

  return (
    <div className="hidden lg:block relative" onMouseLeave={scheduleClose}>
      <nav className="flex items-center gap-1">
        {MENUS.map((menu) => (
          <button
            key={menu.id}
            onMouseEnter={() => open(menu.id)}
            onClick={() => open(menu.id)}
            className={`inline-flex items-center gap-1 px-3.5 py-2.5 rounded-[10px] text-[13px] font-semibold tracking-[0.04em] uppercase transition-all ${
              active === menu.id ? "text-white bg-white/[0.06]" : "text-white/65 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {menu.label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${active === menu.id ? "rotate-180" : ""}`} />
          </button>
        ))}
        <button
          onMouseEnter={() => open("locations")}
          onClick={() => open("locations")}
          className={`inline-flex items-center gap-1 px-3.5 py-2.5 rounded-[10px] text-[13px] font-semibold tracking-[0.04em] uppercase transition-all ${
            active === "locations" ? "text-white bg-white/[0.06]" : "text-white/65 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          Locations
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${active === "locations" ? "rotate-180" : ""}`} />
        </button>
      </nav>

      {/* Panel */}
      {activeMenu && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
          style={{ width: "min(720px, 92vw)" }}
          onMouseEnter={() => open(activeMenu.id)}
        >
          <MegaPanel menu={activeMenu} accent={accent} accentDeep={accentDeep} onQuote={onQuote} />
        </div>
      )}
      {active === "locations" && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
          style={{ width: "min(680px, 92vw)" }}
          onMouseEnter={() => open("locations")}
        >
          <LocationsPanel accent={accent} accentDeep={accentDeep} />
        </div>
      )}
    </div>
  )
}
