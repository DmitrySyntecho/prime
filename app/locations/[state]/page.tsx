"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { LandingHero } from "@/components/landing/landing-hero"
import { AV_PRODUCTION_COLLAGE } from "@/components/landing/landing-page"
import { LandingWhyUs } from "@/components/landing/landing-why-us"
import { RatingsBar } from "@/components/ratings-bar"
import { TrustedBySection } from "@/components/trusted-by-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { ContactSpecialistBanner } from "@/components/contact-specialist-banner"
import { STATES, NAV_SERVICES, NAV_INDUSTRIES, NAV_RESOURCES } from "@/lib/sitemap-data"

const GRADIENT = "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)"
const GLASS = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold tracking-[0.16em] uppercase"
      style={{
        background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
        border: "1px solid rgba(255,94,58,0.25)",
        color: "#FFB366",
      }}
    >
      {children}
    </span>
  )
}

function LinkCard({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-2 rounded-xl px-5 py-4 transition-all hover:border-[#FF5E3A]/40"
      style={GLASS}
    >
      <span className="text-[14px] font-semibold text-white/85 group-hover:text-white transition-colors">{label}</span>
      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#FF5E3A] group-hover:translate-x-1 transition-all flex-shrink-0" />
    </Link>
  )
}

export default function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = use(params)
  const stateData = STATES.find((s) => s.slug === `${state}-av-production`)
  if (!stateData) notFound()

  const otherStates = STATES.filter((s) => s.slug !== stateData.slug).slice(0, 8)
  const startQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

  return (
    <div className="min-h-screen">
      {/* Hero — homepage style */}
      <div className="flex flex-col min-h-[calc(100svh-92px)]">
        <div className="flex-1 flex flex-col justify-center">
          <LandingHero
            hero={{
              title: `AV Production in ${stateData.state}`,
              accentPhrase: stateData.state,
              pillLabel: `${stateData.state} — ${stateData.abbr}`,
              collage: AV_PRODUCTION_COLLAGE,
            }}
            onQuote={startQuote}
          />
        </div>
        <TrustedBySection />
      </div>

      <RatingsBar />
      <LandingWhyUs />

      {/* Cities */}
      <section className="py-14 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <Eyebrow>Cities</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              AV Production Across{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {stateData.state}
              </span>
            </h2>
            <p className="text-white/55 mt-3 max-w-2xl mx-auto">
              We serve every major market in {stateData.state}. Select your city for local availability and event-specific information.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {stateData.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${state}/${city.slug}`}
                className="group flex items-center gap-3 rounded-xl px-5 py-4 transition-all hover:border-[#FF5E3A]/40"
                style={GLASS}
              >
                <MapPin className="w-4 h-4 text-[#FF5E3A] flex-shrink-0" />
                <span className="font-semibold text-white/85 group-hover:text-white transition-colors">{city.city}</span>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#FF5E3A] ml-auto transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <Eyebrow>Services</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-black text-white">Services Available in {stateData.state}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {NAV_SERVICES.map((svc) => (
              <LinkCard key={svc.href} href={svc.href} label={svc.label} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      {/* Industries */}
      <section className="py-14 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <Eyebrow>Industries</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-black text-white">Events We Produce in {stateData.state}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {NAV_INDUSTRIES.map((ind) => (
              <LinkCard key={ind.href} href={ind.href} label={ind.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-14 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <Eyebrow>Resources</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-black text-white">Event Planning Guides</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {NAV_RESOURCES.slice(0, 3).map((res) => (
              <Link
                key={res.href}
                href={res.href}
                className="group rounded-2xl p-6 transition-all hover:border-[#FF5E3A]/40"
                style={GLASS}
              >
                <h3 className="font-bold text-white group-hover:text-[#FF5E3A] transition-colors mb-2">{res.label}</h3>
                <span className="inline-flex items-center gap-1 text-sm text-[#FF5E3A] font-semibold">
                  Read guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other states */}
      <section className="py-14 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8">Other States We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherStates.map((s) => (
              <LinkCard key={s.slug} href={`/locations/${s.slug.replace("-av-production", "")}`} label={s.state} />
            ))}
          </div>
        </div>
      </section>

      <ContactSpecialistBanner onStartQuote={startQuote} />
    </div>
  )
}
