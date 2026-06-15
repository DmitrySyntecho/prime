"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone, MapPin } from "lucide-react"
import { TrustedBySection } from "@/components/trusted-by-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { QuoteForm } from "@/components/quote-form"
import { StickyCTA } from "@/components/sticky-cta"
import { STATES, NAV_SERVICES, NAV_INDUSTRIES, NAV_RESOURCES } from "@/lib/sitemap-data"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

export default function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = use(params)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  // State slug in data includes -av-production suffix (e.g., "florida-av-production")
  const stateSlugWithSuffix = `${state}-av-production`
  const stateData = STATES.find((s) => s.slug === stateSlugWithSuffix)

  if (!stateData) notFound()

  const otherStates = STATES.filter((s) => s.slug !== stateData.slug).slice(0, 8)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-[#0B1217] text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/dji-0996.jpeg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1217]/90 via-[#0B1217]/80 to-[#14532D]/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Locations</span>
            <span>/</span>
            <span className="text-white">{stateData.state}</span>
          </nav>
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-white/10 px-4 py-2 rounded-md mb-6">
              <MapPin className="w-4 h-4 text-[#4ADE80]" />
              {stateData.state} — {stateData.abbr}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-white">
              AV Production in {stateData.state}
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              Prime Line AV deploys full-service AV production teams to events across {stateData.state}. Audio, video, lighting, staging, and LED walls — all managed by certified technicians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowQuoteForm(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#4ADE80] text-[#0B1217] font-semibold rounded-md hover:bg-[#22c55e] transition-colors"
              >
                Start Your Quote <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustedBySection />
      <TestimonialsCarousel />

      {/* Cities in this state */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Cities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              AV Production Across {stateData.state}
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              We serve every major market in {stateData.state}. Select your city for local availability and event-specific information.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stateData.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${state}/${city.slug}`}
                className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group flex items-center gap-3"
              >
                <MapPin className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                <span className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors">
                  {city.city}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#16A34A] ml-auto transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Services Available in {stateData.state}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {NAV_SERVICES.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="bg-white p-5 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group text-center"
              >
                <span className="text-gray-800 font-medium group-hover:text-[#16A34A] transition-colors text-sm">
                  {svc.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Industries</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Events We Produce in {stateData.state}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NAV_INDUSTRIES.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group text-center"
              >
                <span className="text-gray-800 font-medium group-hover:text-[#16A34A] transition-colors text-sm">
                  {ind.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Resources</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Event Planning Guides</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {NAV_RESOURCES.slice(0, 3).map((res) => (
              <Link
                key={res.href}
                href={res.href}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors mb-2">
                  {res.label}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm text-[#16A34A] font-medium">
                  Read guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other States */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Other States We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherStates.map((s) => (
              <Link
                key={s.slug}
                href={`/locations/${s.slug.replace("-av-production", "")}`}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group text-center"
              >
                <span className="text-gray-800 font-medium group-hover:text-[#16A34A] transition-colors text-sm">
                  {s.state}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#0B1217]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Planning an Event in {stateData.state}?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Tell us about your event and we&apos;ll put together a tailored AV production proposal for your {stateData.state} event.
          </p>
          <button
            onClick={() => setShowQuoteForm(true)}
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#4ADE80] text-[#0B1217] font-semibold text-lg rounded-md hover:bg-[#22c55e] transition-colors"
          >
            Start Your Quote <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <StickyCTA visible={true} onStartQuote={() => setShowQuoteForm(true)} />
      <QuoteForm isOpen={showQuoteForm} serviceName={`${stateData.state} AV Production`} onClose={() => setShowQuoteForm(false)} />
    </div>
  )
}
