"use client"

import type { ReactNode } from "react"
import { ArrowRight, MapPin } from "lucide-react"
import Image from "next/image"
import { ContactSpecialistBanner } from "@/components/contact-specialist-banner"
import { Icon3D, type Icon3DName } from "@/components/icon-3d"

const stats: { icon: Icon3DName; value: string; label: string }[] = [
  { icon: "stage", value: "500+", label: "Events Produced" },
  { icon: "award", value: "50+", label: "Brand Partners" },
  { icon: "location-pin", value: "2", label: "Office Locations" },
  { icon: "headset", value: "24/7", label: "Support Available" },
]

const team = [
  {
    name: "Production Team",
    role: "Technical Directors, Audio Engineers, Lighting Designers",
    image: "/images/services/full-av-production.webp",
  },
  {
    name: "Creative Team",
    role: "Event Designers, 3D Artists, Content Creators",
    image: "/images/services/event-production.webp",
  },
  {
    name: "Operations Team",
    role: "Project Managers, Logistics Coordinators",
    image: "/images/services/staging-rigging.webp",
  },
]

const GRADIENT = "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)"
const BTN = "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)"
const GLASS = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-[11px] font-bold tracking-[0.16em] uppercase"
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

export default function AboutPage() {
  const startQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow>About Prime Line AV</Eyebrow>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight text-balance">
                The AV Partner Brands{" "}
                <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Trust
                </span>
              </h1>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Full AV production for corporate events, brand activations, experiential marketing, and studio work.
                Based in Los Angeles and Fort Lauderdale, serving clients nationwide.
              </p>
              <button
                onClick={startQuote}
                className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all hover:opacity-90"
                style={{ background: BTN }}
              >
                Work With Us <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
              <Image src="/images/about/brands-trust-1.webp" alt="Prime Line AV Team" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center rounded-2xl p-6" style={GLASS}>
                <Icon3D name={stat.icon} size={56} className="mx-auto mb-4 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
            Built for{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              unforgettable
            </span>{" "}
            experiences
          </h2>
          <div className="space-y-5 text-white/60 text-lg leading-relaxed text-left">
            <p>
              Prime Line AV was founded with a simple mission: to provide world-class audiovisual production services
              that help brands create unforgettable experiences. What started as a small rental company has grown into a
              full-service production house trusted by Fortune 500 companies and global brands.
            </p>
            <p>
              Our team brings together decades of experience in live events, broadcast production, and experiential
              marketing. We understand that every event is unique, which is why we take a consultative approach to every
              project—listening to your goals, understanding your audience, and designing solutions that deliver results.
            </p>
            <p>
              From intimate corporate meetings to large-scale festivals, we bring the same level of professionalism,
              creativity, and technical excellence to every event we produce. Our commitment to quality has earned us
              long-term partnerships with some of the world's most recognized brands.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Eyebrow>Our Team</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-black text-white">The crew behind every show</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center rounded-2xl p-8" style={GLASS}>
                <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden mb-6 border border-white/10">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-white/50 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Eyebrow>Our Locations</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-black text-white">Two coasts. Nationwide reach.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8" style={GLASS}>
              <div className="flex items-center gap-2 text-[#FFB366] text-sm font-bold uppercase tracking-wider mb-3">
                <MapPin className="w-4 h-4" /> West Coast HQ
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Los Angeles</h3>
              <p className="text-white/55">Serving California, Nevada, Arizona, and the Western United States.</p>
            </div>
            <div className="rounded-2xl p-8" style={GLASS}>
              <div className="flex items-center gap-2 text-[#FFB366] text-sm font-bold uppercase tracking-wider mb-3">
                <MapPin className="w-4 h-4" /> Southeast
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fort Lauderdale</h3>
              <p className="text-white/40 text-sm mb-1">5553 Anglers Ave #101, FL 33312</p>
              <p className="text-white/55">Serving Florida, the Southeast, and nationwide events.</p>
            </div>
          </div>
        </div>
      </section>

      <ContactSpecialistBanner onStartQuote={startQuote} />
    </div>
  )
}
