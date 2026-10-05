"use client"

import { Check, ArrowRight, Phone } from "lucide-react"
import { CountUp } from "./count-up"
import { PHONE_TEL } from "@/lib/contact"

const features = [
  "Full-service AV production from concept to execution",
  "Nationwide coverage with local expertise",
  "24/7 dedicated support during your event",
  "In-house creative and technical teams",
]

const openQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

export function AboutUsSection() {
  return (
    <section id="about" className="py-24 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="reveal-left space-y-6">
            <span className="ds-pill">
              <span className="dot" />
              About Us
            </span>
            <h2 className="text-[32px] md:text-[44px] lg:text-[48px] font-extrabold tracking-[-0.025em] leading-[1.08] text-white">
              The AV Partner <span className="ds-accent-text">Brands Trust</span>
            </h2>

            <p className="text-white/60 leading-relaxed text-[16px] md:text-[17px]">
              For over 15 years, we&apos;ve been the go-to AV production partner for the world&apos;s most demanding
              brands. From intimate corporate gatherings to large-scale festivals, we deliver flawless execution every
              time.
            </p>

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#FF2D6F]/15 border border-[#FF2D6F]/25 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#FF2D6F]" strokeWidth={3} />
                  </div>
                  <span className="text-white/75 text-[14px] md:text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <button
                onClick={openQuote}
                className="cta-yellow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] font-bold transition-all hover:-translate-y-0.5"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={openQuote}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white font-semibold backdrop-blur-md transition-all hover:bg-white/[0.10]"
              >
                <Phone className="w-4 h-4" />
                Talk to an Expert
              </button>
            </div>
          </div>

          <div className="reveal-right relative h-[420px] md:h-[520px]">
            {/* Main top image - full width, positioned to overlap */}
            <div 
              className="absolute top-0 left-[5%] w-[90%] h-[55%] rounded-2xl overflow-hidden border border-white/10 z-10 transition-transform duration-500 hover:scale-[1.02]"
              style={{
                boxShadow: "0 25px 50px -15px rgba(0,0,0,0.5), 0 10px 20px -10px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src="/images/about/brands-trust-2.webp"
                alt="Large-scale professional conference with blue lighting and LED screen"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats glass card - floating above collage */}
            <div
              className="absolute top-4 right-[-10px] md:right-[-20px] px-5 py-4 rounded-[14px] border border-[#FF2D6F]/25 backdrop-blur-2xl z-40"
              style={{
                background: "rgba(8,18,26,0.85)",
                boxShadow:
                  "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-3xl md:text-4xl font-extrabold text-[#FF2D6F] tracking-[-0.02em]">
                <CountUp end={500} suffix="+" />
              </p>
              <p className="text-white/55 text-[12px] tracking-[0.04em] uppercase font-semibold">Successful Events</p>
            </div>

            {/* Bottom left image - rotated, overlaps top image */}
            <div 
              className="absolute bottom-[5%] left-[-3%] w-[55%] h-[48%] rounded-2xl overflow-hidden border-2 border-white/15 z-20 transition-transform duration-500 hover:scale-[1.03] hover:z-30"
              style={{
                transform: "rotate(-3deg)",
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6), 0 15px 30px -10px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src="/images/about/brands-trust-1.webp"
                alt="Event production team managing stage with warm lighting and camera operators"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom right image - rotated opposite, overlaps both */}
            <div 
              className="absolute bottom-[8%] right-[-5%] w-[52%] h-[45%] rounded-2xl overflow-hidden border-2 border-white/15 z-30 transition-transform duration-500 hover:scale-[1.03]"
              style={{
                transform: "rotate(2.5deg)",
                boxShadow: "0 35px 70px -20px rgba(0,0,0,0.65), 0 18px 36px -12px rgba(0,0,0,0.45)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80"
                alt="Professional lighting and video control software"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
