"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Phone, BookOpen } from "lucide-react"
import { QuoteForm } from "@/components/quote-form"
import { StickyCTA } from "@/components/sticky-cta"
import {
  RESOURCES,
  NAV_SERVICES,
  NAV_PACKAGES,
  NAV_TOOLS,
} from "@/lib/sitemap-data"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

const categoryLabel: Record<string, string> = {
  pricing: "Pricing Guide",
  educational: "Educational Guide",
  planning: "Planning Guide",
  inspiration: "Inspiration Guide",
}

export default function ResourcePage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const resource = RESOURCES.find((r) => r.slug === params.slug)

  if (!resource) notFound()

  const relatedResources = RESOURCES.filter((r) => r.slug !== resource.slug).slice(0, 3)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#0B1217] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Resources</span>
            <span>/</span>
            <span className="text-white">{resource.name}</span>
          </nav>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-white/10 px-4 py-2 rounded-md">
              <BookOpen className="w-4 h-4 text-[#4ADE80]" />
              {categoryLabel[resource.category]}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-[1.1] text-white">
            {resource.headline}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            A practical guide from the Prime Line AV team — covering everything you need to plan and produce your event.
          </p>
        </div>
      </section>

      {/* Content area — placeholder for real editorial content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Answer</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              This guide covers everything you need to know about {resource.name.toLowerCase()}. Whether you&apos;re planning your first event or looking to refine your process, this resource will give you the practical information to make informed decisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Factors to Consider</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Every event is different, and {resource.name.toLowerCase()} depends on a range of variables including event size, venue type, audience profile, and technical requirements. This guide breaks down the most important factors so you can plan with confidence.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Prime Line AV Can Help</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our team has produced hundreds of events and can guide you through every decision. From initial planning to show-day execution, we handle the technical details so you can focus on your event goals.
            </p>
          </div>

          <div className="mt-10 p-6 bg-[#F0FDF4] rounded-xl border border-[#16A34A]/20">
            <p className="text-gray-900 font-semibold mb-3">Need help applying this to your event?</p>
            <p className="text-gray-600 text-sm mb-4">
              Talk to our team — we&apos;ll answer your questions and put together a tailored proposal.
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

      {/* Related Services */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Services</p>
            <h2 className="text-3xl font-bold text-gray-900">Related Services</h2>
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

      {/* Packages */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Packages</p>
            <h2 className="text-3xl font-bold text-gray-900">Ready-to-Book Packages</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {NAV_PACKAGES.slice(0, 4).map((pkg) => (
              <Link
                key={pkg.href}
                href={pkg.href}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors mb-2 text-sm">
                  {pkg.label}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-[#16A34A] font-medium">
                  View package <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Tools</p>
            <h2 className="text-3xl font-bold text-gray-900">Planning Calculators</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {NAV_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors mb-2 text-sm">
                  {tool.label}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-[#16A34A] font-medium">
                  Use tool <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More Resources */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">More Resources</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {relatedResources.map((res) => (
              <Link
                key={res.slug}
                href={`/resources/${res.slug}`}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
              >
                <span className="text-xs font-medium text-[#16A34A] uppercase tracking-wider mb-2 block">
                  {categoryLabel[res.category]}
                </span>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors mb-2">
                  {res.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm text-[#16A34A] font-medium">
                  Read guide <ArrowRight className="w-4 h-4" />
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
            Ready to Plan Your Event?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Our team is available to answer questions and help you build a production plan that fits your event and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowQuoteForm(true)}
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#4ADE80] text-[#0B1217] font-semibold text-lg rounded-md hover:bg-[#22c55e] transition-colors"
            >
              Start Your Quote <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 px-8 py-5 border-2 border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <StickyCTA visible={true} onStartQuote={() => setShowQuoteForm(true)} />
      <QuoteForm isOpen={showQuoteForm} serviceName={resource.name} onClose={() => setShowQuoteForm(false)} />
    </div>
  )
}
