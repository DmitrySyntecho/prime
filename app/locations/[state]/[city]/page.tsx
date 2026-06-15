"use client"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone, MapPin } from "lucide-react"
import { TrustedBySection } from "@/components/trusted-by-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { QuoteForm } from "@/components/quote-form"
import { StickyCTA } from "@/components/sticky-cta"
import { STATES, NAV_SERVICES, NAV_INDUSTRIES, NAV_RESOURCES } from "@/lib/sitemap-data"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

export default function CityPage() {
  const params = useParams<{ state: string; city: string }>()
  const state = params.state || ""
  // City segment carries the full slug (e.g. "miami-av-production")
  const citySlugWithSuffix = params.city || ""
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  // State slug format: "florida" (from URL) matches "florida-av-production" (in data)
  const stateSlugWithSuffix = `${state}-av-production`
  const stateData = STATES.find((s) => s.slug === stateSlugWithSuffix)
  
  // City slug in data already includes -av-production (e.g., "miami-av-production")
  const cityData = stateData?.cities.find((c) => c.slug === citySlugWithSuffix)

  if (!stateData || !cityData) notFound()

  const nearbyCities = stateData.cities.filter((c) => c.slug !== cityData.slug).slice(0, 4)

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
            <Link href={`/locations/${state}`} className="hover:text-white transition-colors">
              {stateData.state}
            </Link>
            <span>/</span>
            <span className="text-white">{cityData.city}</span>
          </nav>
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-white/10 px-4 py-2 rounded-md mb-6">
              <MapPin className="w-4 h-4 text-[#4ADE80]" />
              {cityData.city}, {stateData.abbr}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-white">
              AV Production in {cityData.city}
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              Prime Line AV delivers full-service AV production for events in {cityData.city}, {stateData.state}. Corporate events, conferences, brand activations, and live productions — managed end-to-end by our certified team.
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

      {/* Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              AV Services Available in {cityData.city}
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Every service below is available for events in {cityData.city} — delivered and operated by our on-site production team.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {NAV_SERVICES.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group text-center"
              >
                <span className="text-gray-800 font-medium group-hover:text-[#16A34A] transition-colors text-sm">
                  {svc.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Industries</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Event Types We Produce in {cityData.city}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NAV_INDUSTRIES.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="bg-white p-5 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group text-center"
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
      <section className="py-16 md:py-20 bg-white">
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
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
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

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Nearby Cities in {stateData.state}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${state}/${city.slug}`}
                  className="bg-white p-5 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group flex items-center gap-3"
                >
                  <MapPin className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                  <span className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors text-sm">
                    {city.city}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#0B1217]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Planning an Event in {cityData.city}?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Tell us about your event and we&apos;ll put together a tailored AV production proposal for your {cityData.city} event.
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
      <QuoteForm
        isOpen={showQuoteForm}
        serviceName={`AV Production in ${cityData.city}`}
        onClose={() => setShowQuoteForm(false)}
      />
    </div>
  )
}
