"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone, Package } from "lucide-react"
import { TrustedBySection } from "@/components/trusted-by-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { QuoteForm } from "@/components/quote-form"
import { StickyCTA } from "@/components/sticky-cta"
import { PACKAGES, NAV_SERVICES, NAV_INDUSTRIES, NAV_RESOURCES, EQUIPMENT_CATEGORIES } from "@/lib/sitemap-data"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

export default function PackagePage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const pkg = PACKAGES.find((p) => p.slug === params.slug)

  if (!pkg) notFound()

  const relatedPackages = PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 4)

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
            <span className="text-gray-400">Packages</span>
            <span>/</span>
            <span className="text-white">{pkg.name}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-white/10 px-4 py-2 rounded-md mb-6">
              <Package className="w-4 h-4 text-[#4ADE80]" />
              Production Package
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-white">
              {pkg.headline}
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              A bundled production solution from Prime Line AV — everything your event needs under one quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowQuoteForm(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#4ADE80] text-[#0B1217] font-semibold rounded-md hover:bg-[#22c55e] transition-colors"
              >
                Get a Quote for This Package <ArrowRight className="w-5 h-5" />
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

      {/* What's Included */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            This package bundles the core AV production services your event needs. Equipment, technicians, delivery, setup, and strike are all included. Every package is customizable — tell us about your event and we&apos;ll tailor the scope to fit.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {EQUIPMENT_CATEGORIES.slice(0, 6).map((cat) => (
              <div
                key={cat.slug}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="w-2 h-2 bg-[#4ADE80] rounded-full flex-shrink-0" />
                <span className="text-gray-700 font-medium">{cat.name}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#F0FDF4] rounded-xl border border-[#16A34A]/20">
            <p className="text-gray-900 font-semibold mb-2">Ready to get a quote for this package?</p>
            <p className="text-gray-600 text-sm mb-4">
              Packages are priced based on event size, venue, and production requirements. Share your details and we&apos;ll respond with a tailored proposal.
            </p>
            <button
              onClick={() => setShowQuoteForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#16A34A] text-white font-semibold rounded-md hover:bg-[#14532D] transition-colors"
            >
              Start Your Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <HomeShopSection />

      {/* Services in package */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Services</p>
            <h2 className="text-3xl font-bold text-gray-900">Services Included</h2>
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
            <h2 className="text-3xl font-bold text-gray-900">Best For</h2>
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
            <h2 className="text-3xl font-bold text-gray-900">Planning Guides</h2>
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

      {/* Other Packages */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Other Packages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedPackages.map((p) => (
              <Link
                key={p.slug}
                href={`/packages/${p.slug}`}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors mb-2 text-sm">
                  {p.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-[#16A34A] font-medium">
                  View package <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#0B1217]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Book the {pkg.name}?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Tell us about your event and we&apos;ll confirm availability and send a tailored proposal.
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
      <QuoteForm isOpen={showQuoteForm} serviceName={pkg.name} onClose={() => setShowQuoteForm(false)} />
    </div>
  )
}
