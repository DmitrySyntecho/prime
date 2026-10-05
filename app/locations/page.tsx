import { Metadata } from "next"
import Link from "next/link"
import { MapPin, ChevronRight, ArrowRight, ShoppingCart } from "lucide-react"
import { STATES } from "@/lib/sitemap-data"
import { CATEGORIES, getProductsByCategory } from "@/lib/products-data"
import { Icon3D } from "@/components/icon-3d"
import { CATEGORY_ICON_3D } from "@/lib/nav-icons"

export const metadata: Metadata = {
  title: "AV Production Locations | Nationwide Event AV Services | Prime Line AV",
  description:
    "Prime Line AV provides professional AV production services across the United States. Find AV rental and production services in your city.",
}

const GRADIENT = "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)"
const BTN = "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)"
const GLASS = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }

export default function LocationsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-[11px] font-bold tracking-[0.16em] uppercase"
              style={{
                background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
                border: "1px solid rgba(255,94,58,0.25)",
                color: "#FFB366",
              }}
            >
              <MapPin className="w-3.5 h-3.5" /> Nationwide Coverage
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight text-balance">
              AV Production Services{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Nationwide
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Professional AV production, LED wall rental, sound systems, and event lighting available in major markets
              across the United States. Local expertise, national reach.
            </p>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-10">Select Your State</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {STATES.map((state) => (
              <Link
                key={state.slug}
                href={`/locations/${state.slug.replace("-av-production", "")}`}
                className="group rounded-xl p-5 transition-all hover:border-[#FF5E3A]/40"
                style={GLASS}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-[#FF5E3A] transition-colors">
                      {state.state}
                    </h3>
                    <p className="text-sm text-white/40 mt-1">{state.cities?.length || 0} cities</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#FF5E3A] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment & rentals — product interlinking */}
      <section className="py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white">Rent Equipment in Every Market</h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-[#FF5E3A] hover:text-white transition-colors"
            >
              <ShoppingCart className="w-4 h-4" /> Browse full catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => {
              const count = getProductsByCategory(c.slug).length
              const href = c.serviceSlug ? `/services/${c.serviceSlug}` : "/shop"
              return (
                <Link
                  key={c.slug}
                  href={href}
                  className="group flex items-center gap-4 rounded-xl p-5 transition-all hover:border-[#FF5E3A]/40"
                  style={GLASS}
                >
                  <Icon3D name={CATEGORY_ICON_3D[c.slug] ?? "flight-case"} size={56} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold group-hover:text-[#FF5E3A] transition-colors truncate">
                      {c.label}
                    </h3>
                    <p className="text-sm text-white/40 mt-0.5">{count} products available</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#FF5E3A] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">{"Don't See Your City?"}</h2>
          <p className="text-white/55 mb-8 max-w-xl mx-auto">
            We provide AV production services nationwide. Contact us for a custom quote for your event location.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all hover:opacity-90"
            style={{ background: BTN }}
          >
            Get a Quote
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
