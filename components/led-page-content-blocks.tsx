"use client"

import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Icon3D, type Icon3DName } from "@/components/icon-3d"

const services: { icon: Icon3DName; label: string }[] = [
  { icon: "led-wall", label: "LED wall rental (indoor & outdoor)" },
  { icon: "live-camera", label: "Video engineering & content playback" },
  { icon: "speaker", label: "Audio / sound systems" },
  { icon: "moving-head", label: "Lighting design & control" },
  { icon: "stage", label: "Staging & rigging" },
  { icon: "tv-display", label: "Confidence monitors & teleprompters" },
  { icon: "live-stream", label: "Live streaming & recording" },
  { icon: "headset", label: "Translation & interpretation support" },
  { icon: "clipboard", label: "On-site technical crew & show callers" },
]

const eventTypes = [
  "Corporate conferences & meetings",
  "Experiential marketing & brand activations",
  "Awards shows for executive-level organizations",
  "Trade shows & expos",
  "Product launches",
  "Movie premieres & entertainment events",
  "Investor & financial events",
  "Live seminars & large-scale presentations",
]

const trustReasons = [
  "Operating since 2018, delivering hundreds of events every year",
  "Trusted by high-profile brands and decision-makers",
  "Senior technicians on-site — not freelancers learning on the job",
  "Redundancy built into power, processing, and signal flow",
  "Calm execution when timelines change or problems arise",
  "We don't disappear after load-in — we stay until the job is done",
]

interface LEDPageContentBlocksProps {
  onOpenQuoteForm: () => void
  ctaButton?: string
}

export function LEDPageContentBlocks({ onOpenQuoteForm, ctaButton = "Get a Fail-Safe Event Plan" }: LEDPageContentBlocksProps) {
  return (
    <>
      {/* Block 4 - Services We Provide */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="reveal text-center mb-12">
              <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-3">Full-Service Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                More Than LED Screens — Complete Event Video Production
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                We don't just rent LED walls. We support events end-to-end with the technical expertise and crew required to execute flawlessly under pressure.
              </p>
            </div>

            <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#FF5E3A]/30 transition-colors"
                  >
                    <Icon3D name={service.icon} size={48} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                    <span className="text-gray-700 font-medium">{service.label}</span>
                  </div>
                )
              })}
            </div>

            <p className="text-center text-gray-500 text-sm mt-8 italic">
              Services scale based on your needs — from rental-only to full-service production.
            </p>
          </div>
        </div>
      </section>

      {/* Block 5 - Types of Events We Handle */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="reveal text-center mb-12">
              <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-3">Event Expertise</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built for High-Stakes Events
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Our team supports events where expectations are high, timelines are tight, and failure isn't acceptable.
              </p>
            </div>

            <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventTypes.map((eventType, index) => (
                <div
                  key={index}
                  className="p-5 bg-white rounded-xl border border-gray-200 text-center hover:border-[#FF2D6F] hover:shadow-md transition-all"
                >
                  <span className="text-gray-800 font-medium">{eventType}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              From intimate executive rooms to massive show floors — we scale without losing control.
            </p>
          </div>
        </div>
      </section>

      {/* Block 6 - Why Clients Choose Our Team */}
      <section className="py-16 md:py-20 bg-[#0B1217]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="reveal text-center mb-12">
              <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-3">Why Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Teams Trust Us With Their Reputation
              </h2>
              <p className="text-gray-400 text-lg">
                AV vendors come and go. Production partners stay. Here's why clients work with us year after year.
              </p>
            </div>

            <div className="reveal-stagger space-y-4">
              {trustReasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FF2D6F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{reason}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white/5 rounded-xl border border-white/10 text-center">
              <p className="text-gray-300">
                <span className="text-white font-semibold">Experience working with brands like</span>{" "}
                Netflix, YouTube, Google, and enterprise corporate teams across conferences, activations, and product launches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 7 - Mission & Commitment */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="reveal max-w-3xl mx-auto text-center">
            <p className="text-[#FF2D6F] font-semibold uppercase tracking-wider text-sm mb-3">Our Promise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Commitment Is Simple
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100 mb-8">
              <p className="text-xl md:text-2xl font-semibold text-[#0B1217] leading-relaxed">
                Our mission is to help our clients deliver successful events 100% of the time — no exceptions.
              </p>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              That means going beyond the written scope when needed, solving problems before they reach the client, and taking responsibility when others won't.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We're not here for one-off jobs — we're here to build long-term partnerships with teams who value reliability and accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Block 8 - Second CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-[#FF5E3A] to-[#7C2D5A]">
        <div className="reveal container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Let's Make Sure Your Event Runs Perfectly
          </h2>
          
          <button
            onClick={onOpenQuoteForm}
            className="cta-yellow inline-flex items-center gap-2 px-10 py-5 bg-[#FF2D6F] text-[#0B1217] font-semibold text-lg rounded-md hover:bg-[#22c55e] transition-colors shadow-lg"
          >
            {ctaButton}
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-white/90 text-sm mt-6">
            Reviewed by senior production staff &bull; No spam &bull; No pressure
          </p>
        </div>
      </section>
    </>
  )
}
