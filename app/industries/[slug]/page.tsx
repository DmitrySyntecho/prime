"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { TrustedBySection } from "@/components/trusted-by-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { QuoteForm } from "@/components/quote-form"
import { StickyCTA } from "@/components/sticky-cta"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  INDUSTRIES,
  NAV_SERVICES,
  NAV_LOCATIONS,
  NAV_RESOURCES,
  NAV_PACKAGES,
} from "@/lib/sitemap-data"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

export default function IndustryPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const industry = INDUSTRIES.find((i) => i.slug === params.slug)

  if (!industry) notFound()

  const relatedIndustries = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 4)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-[#0B1217] text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/dji-0996.jpeg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1217]/90 via-[#0B1217]/80 to-[#14532D]/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/industries/corporate-events" className="hover:text-white transition-colors">Industries</Link>
            <span>/</span>
            <span className="text-white">{industry.name}</span>
          </nav>
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-white/10 px-4 py-2 rounded-md mb-6">
              <span className="w-2 h-2 bg-[#4ADE80] rounded-md" />
              {industry.name}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-white">
              {industry.headline}
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">{industry.subheadline}</p>
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

      {/* Event Overview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Overview</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Understanding {industry.name}
            </h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {industry.intro}
            </p>
            <div className="bg-gray-50 border-l-4 border-[#4ADE80] p-6 rounded-md mt-8">
              <p className="text-gray-700 font-semibold mb-3">AV Requirements for {industry.name}:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-[#4ADE80] font-bold mt-1">•</span>
                  <span>Clear audio system with microphones and monitors for speakers and performers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4ADE80] font-bold mt-1">•</span>
                  <span>LED displays or projection for presentations, video content, and visual storytelling</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4ADE80] font-bold mt-1">•</span>
                  <span>Professional lighting design to set atmosphere and highlight key areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4ADE80] font-bold mt-1">•</span>
                  <span>Live streaming or recording capabilities for hybrid or remote participants</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4ADE80] font-bold mt-1">•</span>
                  <span>On-site technical support and contingency planning for seamless execution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Commonly Used */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Equipment</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Equipment Commonly Used for {industry.name}
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Here are the equipment types we typically deploy for {industry.name.toLowerCase()} events.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/equipment/speakers"
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
            >
              <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">Equipment</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors mb-2">
                PA Systems & Speakers
              </h3>
              <p className="text-sm text-gray-600 mb-3">Professional audio for clear speaker reinforcement</p>
              <span className="inline-flex items-center gap-1 text-sm text-[#16A34A] font-medium">
                View specs <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/equipment/led-panels"
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
            >
              <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">Equipment</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors mb-2">
                LED Displays & Screens
              </h3>
              <p className="text-sm text-gray-600 mb-3">Dynamic visuals and content display systems</p>
              <span className="inline-flex items-center gap-1 text-sm text-[#16A34A] font-medium">
                View specs <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/equipment/lighting"
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
            >
              <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">Equipment</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors mb-2">
                Lighting & Effects
              </h3>
              <p className="text-sm text-gray-600 mb-3">Professional lighting design and control systems</p>
              <span className="inline-flex items-center gap-1 text-sm text-[#16A34A] font-medium">
                View specs <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <HomeShopSection />

      {/* Services for this industry */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              AV Services for {industry.name}
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Every service below is available for {industry.name.toLowerCase()} — delivered by certified technicians with industry-leading equipment.
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

      {/* Locations */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Locations</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {industry.name} — Nationwide Coverage
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              We produce {industry.name.toLowerCase()} across the country. Select your state to see local coverage.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {NAV_LOCATIONS.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="bg-white p-3 rounded-md border border-gray-200 hover:border-[#16A34A] hover:bg-[#16A34A]/5 transition-all text-center"
              >
                <span className="text-gray-700 text-xs font-medium">{loc.label}</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Planning Guides</h2>
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

      {/* Packages */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Packages</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Production Packages for {industry.name}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {NAV_PACKAGES.slice(0, 4).map((pkg) => (
              <Link
                key={pkg.href}
                href={pkg.href}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
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

      {/* Process */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How We Execute {industry.name} Events
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              From consultation to breakdown, our proven process ensures flawless AV production for your {industry.name.toLowerCase()} event.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Initial Consultation",
                description: "We meet with your team to understand event goals, audience size, venue, budget, and technical vision.",
              },
              {
                step: 2,
                title: "Site Survey & Design",
                description: "Our technical team visits the venue to assess layout, power, acoustics, and creates a custom design proposal.",
              },
              {
                step: 3,
                title: "3D Rendering & Proposal",
                description: "We deliver detailed renderings, equipment specs, timeline, and pricing for your review and approval.",
              },
              {
                step: 4,
                title: "Equipment Booking & Planning",
                description: "Upon approval, we secure all equipment, confirm technical specifications, and finalize logistics.",
              },
              {
                step: 5,
                title: "Pre-Event Technical Meeting",
                description: "Final walkthrough with your team to confirm setup, power, contingencies, and any last-minute changes.",
              },
              {
                step: 6,
                title: "Setup & Rehearsal",
                description: "Our crew arrives early to set up all equipment, test systems, and conduct full rehearsal with your presenters.",
              },
              {
                step: 7,
                title: "Live Event Execution",
                description: "Dedicated technicians manage all AV throughout the event, troubleshooting issues and responding to changes in real-time.",
              },
              {
                step: 8,
                title: "Post-Event Breakdown",
                description: "Professional breakdown and removal of all equipment, leaving your venue clean and ready for the next use.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4ADE80] text-[#0B1217] font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#4ADE80] font-semibold uppercase tracking-wider text-sm mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Common Questions About {industry.name}
            </h2>
          </div>
          <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  question: `How much does AV production cost for ${industry.name}?`,
                  answer: `Pricing varies based on event size, technical complexity, and equipment needs. We provide customized quotes after understanding your specific requirements. Contact us for a detailed proposal tailored to your event.`,
                },
                {
                  question: `What's included in your ${industry.name} AV service?`,
                  answer: `Our complete service includes equipment rental, delivery and setup, on-site technical management, operator support during the event, and professional breakdown. We can customize packages to fit your specific needs.`,
                },
                {
                  question: `Can you provide live streaming for a ${industry.name} event?`,
                  answer: `Yes! We offer hybrid event capabilities including live streaming, multi-camera video production, and remote participant management for ${industry.name.toLowerCase()} events of any size.`,
                },
                {
                  question: `What happens if equipment fails during the event?`,
                  answer: `We carry backup equipment for all critical components and perform thorough pre-event testing. Our on-site technicians are trained to troubleshoot and resolve issues immediately to keep your event running smoothly.`,
                },
                {
                  question: `How far in advance should we book for a ${industry.name} event?`,
                  answer: `We recommend booking 4-6 weeks in advance for optimal availability. For urgent requests, we often accommodate rush bookings depending on equipment availability. Contact us to discuss your timeline.`,
                },
                {
                  question: `Do you provide technical support during the event?`,
                  answer: `Absolutely. We provide dedicated on-site technicians throughout your entire event to manage equipment, monitor systems, and respond to any issues in real-time.`,
                },
                {
                  question: `Can I see examples of past ${industry.name} events you've produced?`,
                  answer: `Yes! We're happy to provide client references and video samples of our work on similar ${industry.name.toLowerCase()} events. Contact our team to request a portfolio specific to your event type.`,
                },
                {
                  question: `Do you coordinate with other vendors and event planners?`,
                  answer: `Absolutely. We work seamlessly with other vendors, venues, caterers, and event professionals. Our team is experienced in collaborative production environments and integrates smoothly into any vendor ecosystem.`,
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-gray-50 rounded-md border border-gray-200 px-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline text-sm md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Industries</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors text-sm">
                  {ind.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#0B1217]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Planning a {industry.name} Event?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Tell us about your event and our team will put together a tailored production proposal.
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
      <QuoteForm isOpen={showQuoteForm} serviceName={industry.name} onClose={() => setShowQuoteForm(false)} />
    </div>
  )
}
