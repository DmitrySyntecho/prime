"use client"

import { Play } from "lucide-react"
import Image from "next/image"
import { ContactSpecialistBanner } from "@/components/contact-specialist-banner"

const projects = [
  {
    title: "USA Teqball Tour",
    category: "Sports Event",
    location: "Long Beach Arena & Anaheim",
    image: "/images/case-studies/ramp-1.webp",
  },
  {
    title: "Family Style Food Festival",
    category: "Festival",
    location: "CBS Television City, LA",
    image: "/images/events/festivals.webp",
  },
  {
    title: "Netflix Brand Activation",
    category: "Brand Activation",
    location: "Los Angeles",
    image: "/images/case-studies/asian-flame-1.webp",
  },
  {
    title: "TikTok Creator Summit",
    category: "Corporate Event",
    location: "Miami Beach",
    image: "/images/case-studies/tiktok-1.webp",
  },
  {
    title: "Marriott Annual Conference",
    category: "Conference",
    location: "Fort Lauderdale",
    image: "/images/events/corporate.webp",
  },
  {
    title: "ESPN Live Broadcast",
    category: "Live Production",
    location: "Multiple Locations",
    image: "/images/case-studies/miami-1.webp",
  },
]

export default function PortfolioPage() {
  const startQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{
              background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
              border: "1px solid rgba(255,94,58,0.25)",
              color: "#FFB366",
            }}
          >
            Our Work
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Our{" "}
            <span style={{ background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Portfolio
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            Explore our work with Fortune 500 companies, global brands, and world-class events.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="our-recent-work" className="py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer border border-white/10"
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[#FF5E3A] text-sm font-bold mb-2">{project.category}</p>
                  <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-gray-300 text-sm">{project.location}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSpecialistBanner onStartQuote={startQuote} />
    </div>
  )
}
