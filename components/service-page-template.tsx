"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrustedBySection } from "@/components/trusted-by-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { QuoteForm, type ServiceQuestion } from "@/components/quote-form"
import { ServiceQuoteForm } from "@/components/service-quote-form"
import { PHONE_TEL } from "@/lib/contact"

interface ServicePageProps {
  serviceName: string
  headline: string
  subheadline: string
  introText: string
  whyChooseUs: {
    title: string
    description: string
  }[]
  packages: {
    title: string
    description: string
    image: string
  }[]
  heroImage?: string
  serviceQuestions?: ServiceQuestion[]
}

const portfolioItems = [
  {
    title: "USA Teqball Tour",
    category: "Sports Event",
    categoryColor: "#E85A5A",
    image: "/teqball-sports-event-arena.jpg",
  },
  {
    title: "Netflix Brand Activation",
    category: "Brand Activation",
    categoryColor: "#E85A5A",
    image: "/netflix-brand-activation-event.jpg",
  },
  {
    title: "Marriott Annual Conference",
    category: "Conference",
    categoryColor: "#FF2D6F",
    image: "/marriott-hotel-conference.jpg",
    hasVideo: true,
  },
]

export function ServicePageTemplate({
  serviceName,
  headline,
  subheadline,
  introText,
  whyChooseUs,
  packages,
  serviceQuestions = [],
}: ServicePageProps) {
  const [quoteFormOpen, setQuoteFormOpen] = useState(false)

  useEffect(() => {
    const container = document.getElementById("service-vidalytics-container")
    if (!container || container.hasChildNodes()) return

    // Create the embed div
    const embedDiv = document.createElement("div")
    embedDiv.id = "vidalytics_embed_M1gJkHNjodX8sVP6_service"
    embedDiv.style.cssText = "width: 100%; position: relative; padding-top: 56.25%;"
    container.appendChild(embedDiv)

    // Create and inject the Vidalytics script (same video as homepage)
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
      })(window, document, 'Vidalytics', 'vidalytics_embed_M1gJkHNjodX8sVP6_service', 'https://fast.vidalytics.com/embeds/o5ZPHiF7/M1gJkHNjodX8sVP6/');
    `
    container.appendChild(script)
  }, [])

  const handleStartQuote = () => {
    setQuoteFormOpen(true)
  }

  return (
    <div className="bg-white">
      {/* Hero Section with Video */}
      <section className="relative bg-[#0B1217] text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/dji-0996.jpeg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1217]/90 via-[#0B1217]/80 to-[#7C2D5A]/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN - Text */}
            <div className="order-2 lg:order-1">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md mb-6">
                <span className="w-2 h-2 bg-[#FF2D6F] rounded-md" />
                {serviceName}
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                <span className="text-white" dangerouslySetInnerHTML={{ __html: headline }} />
              </h1>

              <p className="text-gray-300 text-lg mb-8 max-w-lg">{subheadline}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleStartQuote}
                  className="bg-[#FF2D6F] hover:bg-[#FF2D6F]/90 text-[#0B1217] font-bold px-8 py-6 text-base rounded-lg"
                >
                  Start Your Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a
                  href={PHONE_TEL}
                  suppressHydrationWarning
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Talk to Our Team
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN - Video */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <div id="service-vidalytics-container" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Real Clients Real Events - Testimonials (right after Trusted By) */}
      <TestimonialsCarousel />

      {/* Intro Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What This Service Covers</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{introText}</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-3">Our Approach</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Us for {serviceName}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#FF2D6F] hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 bg-[#FF2D6F]/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#FF2D6F]" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-3">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See This Service in Action</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A look at recent events where we provided {serviceName.toLowerCase()}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portfolioItems.map((project, index) => (
              <Link
                key={index}
                href="/portfolio"
                className="group relative rounded-2xl overflow-hidden"
                style={{ height: "280px" }}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {project.hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                )}
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

      {/* Packages Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-3">Packages</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular {serviceName} Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Ready-to-go options tailored for common event needs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#FF2D6F] hover:shadow-lg transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  <button
                    onClick={handleStartQuote}
                    className="inline-flex items-center gap-2 text-[#FF2D6F] font-medium text-sm hover:underline"
                  >
                    Start Your Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-[#0B1217]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Talk About {serviceName}?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Share your project details and our team will follow up with a tailored proposal.
          </p>
          <Button
            onClick={handleStartQuote}
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#FF2D6F] text-[#0B1217] font-semibold text-lg rounded-md hover:bg-[#3ab8c9] transition-colors"
          >
            Start Your Quote
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Service Quote Form */}
      <ServiceQuoteForm
        isOpen={quoteFormOpen}
        onClose={() => setQuoteFormOpen(false)}
        serviceName={serviceName}
        serviceQuestions={serviceQuestions}
      />
    </div>
  )
}
