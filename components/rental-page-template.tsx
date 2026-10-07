"use client"

import React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { TrustedBySection } from "@/components/trusted-by-section"
import { HomeShopSection } from "@/components/home/home-shop-section"
import { getCategoryForPath } from "@/lib/products-data"
import { QuoteForm, type ServiceQuestion } from "@/components/quote-form"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

interface RentalPageProps {
  categoryName: string
  headline: string
  subheadline: string
  ctaButton?: string
  introText: string
  packages: {
    title: string
    description: string
    image: string
    price?: number
    originalPrice?: number
    features: string[]
    isPromo?: boolean
  }[]
  heroImage: string
  serviceQuestions?: ServiceQuestion[]
  additionalContent?: (onOpenQuoteForm: () => void, ctaButton: string) => React.ReactNode
}

const portfolioItems = [
  {
    title: "TikTok Creator Summit",
    category: "Corporate Event",
    categoryColor: "#FF2D6F",
    image: "/tiktok-corporate-summit.jpg",
  },
  {
    title: "Netflix Brand Activation",
    category: "Brand Activation",
    categoryColor: "#E85A5A",
    image: "/netflix-brand-activation-event.jpg",
  },
  {
    title: "Family Style Food Festival",
    category: "Festival",
    categoryColor: "#FF2D6F",
    image: "/food-festival-outdoor-event.jpg",
  },
]

const whyRentFromUs = [
  "Professionally maintained equipment",
  "Delivery, setup, and strike available",
  "Support for corporate, experiential, and live events",
  "Fast turnaround in Los Angeles",
]

export function RentalPageTemplate({
  categoryName,
  headline,
  subheadline,
  ctaButton = "Get a Quote",
  introText,
  packages,
  heroImage,
  serviceQuestions,
  additionalContent,
}: RentalPageProps) {
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  // Load Vidalytics video - same as homepage
  useEffect(() => {
    const container = document.getElementById("rental-vidalytics-container")
    if (!container || container.hasChildNodes()) return

    const embedDiv = document.createElement("div")
    embedDiv.id = "vidalytics_embed_M1gJkHNjodX8sVP6"
    embedDiv.style.cssText = "width: 100%; position: relative; padding-top: 56.25%;"
    container.appendChild(embedDiv)

    const script = document.createElement("script")
    script.type = "text/javascript"
    script.innerHTML = `
      (function (v, i, d, a, l, y, t, c, s) {
        y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}
        var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
        if (!vsl){vsl=function(u,cb){
          if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
          if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}
          else{s.onload=function(){vlf=1;cb();};}
          i.getElementsByTagName("head")[0].appendChild(s);
        };}
        vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
      })(window, document, 'Vidalytics', 'vidalytics_embed_M1gJkHNjodX8sVP6', 'https://fast.vidalytics.com/embeds/o5ZPHiF7/M1gJkHNjodX8sVP6/');
    `
    container.appendChild(script)
  }, [])

  return (
    <div className="bg-white">
      {/* Hero Section with Video */}
      <section className="relative bg-[#0B1217] text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/dji-0996.jpeg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1217]/90 via-[#0B1217]/80 to-[#7C2D5A]/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN - Text */}
            <div className="order-2 lg:order-1">
              <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-4">Equipment Rentals</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-white">
                {headline}
              </h1>

              <p className="text-gray-300 text-lg mb-8 max-w-lg">{subheadline}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="cta-yellow inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF2D6F] text-[#0B1217] font-semibold rounded-md hover:bg-[#22c55e] transition-colors"
                >
                  {ctaButton}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href={PHONE_TEL}
                  suppressHydrationWarning
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN - Video */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <div id="rental-vidalytics-container" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Real Clients Real Events - Testimonials (right after Trusted By) */}
      <TestimonialsCarousel />

      {/* Additional Content Blocks (if provided) */}
      {additionalContent && additionalContent(() => setShowQuoteForm(true), ctaButton)}

      {/* Intro Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg leading-relaxed">{introText}</p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-3">Rental Packages</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Most Popular {categoryName} Packages</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <button
                key={index}
                onClick={() => setShowQuoteForm(true)}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#FF5E3A] hover:shadow-lg transition-all group text-left"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-[#FF5E3A] transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {pkg.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-[#FF2D6F]/10 text-[#FF5E3A] rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="w-full mt-2 py-2 px-4 bg-[#FF5E3A] text-white text-sm font-semibold rounded-lg hover:bg-[#7C2D5A] transition-colors"
                  >
                    Get Quote
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <HomeShopSection initialTab={getCategoryForPath(categoryName)} />

      {/* Portfolio Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-3">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See Our Work With {categoryName}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portfolioItems.map((project, index) => (
              <Link
                key={index}
                href="/portfolio"
                className="group relative rounded-2xl overflow-hidden"
                style={{ height: "260px" }}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span
                    className="inline-block px-3 py-1 text-white text-xs font-medium rounded-md mb-2"
                    style={{ backgroundColor: project.categoryColor }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-white text-lg font-bold">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rent From Us */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Rent From Us</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyRentFromUs.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-5 h-5 text-[#FF2D6F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-[#0B1217]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Need {categoryName} for Your Event?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Get a custom quote for your event. Our team will help you select the right equipment.
          </p>
          <button
            onClick={() => setShowQuoteForm(true)}
            className="cta-yellow inline-flex items-center gap-2 px-10 py-5 bg-[#FF2D6F] text-[#0B1217] font-semibold text-lg rounded-md hover:bg-[#22c55e] transition-colors"
          >
            {ctaButton}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Quote Form Modal - Same style as homepage */}
      <QuoteForm
        isOpen={showQuoteForm}
        serviceName={categoryName}
        serviceQuestions={serviceQuestions}
        onClose={() => setShowQuoteForm(false)}
      />
    </div>
  )
}
