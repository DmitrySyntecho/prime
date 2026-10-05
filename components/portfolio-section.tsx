"use client"

import Image from "next/image"
import { Play, Sparkles } from "lucide-react"

const openQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

const projects = [
  {
    title: "HBO Max Launch Event",
    category: "Brand Activation",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
    size: "large",
  },
  {
    title: "10X Real Estate Summit",
    category: "Conference",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    size: "small",
  },
  {
    title: "UC Berkeley Welcome Event",
    category: "Corporate Event",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    size: "small",
  },
  {
    title: "McKinsey Game Changers",
    category: "Corporate Event",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
    size: "small",
  },
  {
    title: "Corporate Conference LA",
    category: "Conference",
    image:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=80",
    size: "small",
    hasVideo: true,
  },
]

export function PortfolioSection() {
  return (
    <section id="our-work" className="py-24 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section head */}
        <div className="reveal text-center mb-12 max-w-3xl mx-auto">
          <span className="ds-pill mb-5">
            <span className="dot" />
            Portfolio
          </span>
          <h2 className="text-[32px] md:text-[44px] lg:text-[50px] font-extrabold tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Featured <span className="ds-accent-text">Work</span>
          </h2>
          <p className="text-white/55 text-[16px] md:text-[17px]">
            A glimpse of recent productions — from corporate keynotes to nationally broadcast brand activations.
          </p>
        </div>

        <div
          className="reveal hidden md:grid md:grid-cols-3 gap-4"
          style={{ gridTemplateRows: "1fr 1fr", minHeight: "560px" }}
        >
          {/* Large card */}
          <button
            type="button"
            onClick={openQuote}
            aria-label={`Get a quote like ${projects[0].title}`}
            className="group relative rounded-[22px] overflow-hidden row-span-2 cursor-pointer border border-white/[0.08] transition-all hover:-translate-y-1 hover:border-[#FF2D6F]/30 text-left"
          >
            <Image
              src={projects[0].image || "/placeholder.svg"}
              alt={projects[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070a] via-[#03070a]/15 to-transparent" />
            <PortfolioHoverCTA />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-3 py-1.5 rounded-md bg-[#E85A5A] text-white text-[10px] font-extrabold tracking-[0.08em] uppercase mb-3">
                {projects[0].category}
              </span>
              <h3 className="text-white text-2xl font-bold leading-tight">{projects[0].title}</h3>
            </div>
          </button>

          {/* Small cards */}
          {projects.slice(1, 5).map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={openQuote}
              aria-label={`Get a quote like ${project.title}`}
              className="group relative rounded-[22px] overflow-hidden cursor-pointer border border-white/[0.08] transition-all hover:-translate-y-1 hover:border-[#FF2D6F]/30 text-left"
              style={{ minHeight: "230px" }}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03070a] via-[#03070a]/15 to-transparent" />

              {project.hasVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/[0.16] backdrop-blur-md border border-white/30 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              )}
              <PortfolioHoverCTA />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#FF2D6F] text-white text-[10px] font-extrabold tracking-[0.08em] uppercase mb-2">
                  {project.category}
                </span>
                <h3 className="text-white text-[17px] font-bold leading-tight">{project.title}</h3>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile */}
        <div className="reveal-stagger md:hidden space-y-4">
          {projects.map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={openQuote}
              aria-label={`Get a quote like ${project.title}`}
              className="group relative rounded-[22px] overflow-hidden block border border-white/[0.08] text-left w-full"
              style={{ height: "240px" }}
            >
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03070a] via-[#03070a]/15 to-transparent" />
              {project.hasVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/[0.16] backdrop-blur-md border border-white/30 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#FF2D6F] text-white text-[10px] font-extrabold tracking-[0.08em] uppercase mb-2">
                  {project.category}
                </span>
                <h3 className="text-white text-[17px] font-bold leading-tight">{project.title}</h3>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}

function PortfolioHoverCTA() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      <span
        className="cta-yellow inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.06em] uppercase"
        style={{
          background: "linear-gradient(135deg, #FF2D6F, #FF5E3A)",
        }}
      >
        <Sparkles className="w-3 h-3" />
        Get a Similar Quote
      </span>
    </div>
  )
}
