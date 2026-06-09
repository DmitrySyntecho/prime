"use client"

import { useState } from "react"
import { Play, Users, ShieldCheck, CheckCircle2, Clock, Quote, Star } from "lucide-react"

/* Block 2 showreel — Prime Line reel (Mux). Swap this ID for a dedicated LA cut
   when one is available. The heavy player iframe only mounts after play. */
const SHOWREEL_MUX_ID = "sotNy01Bw9hXSjlHAaTe4lF9vEG00ZRO2Z7Wpf6QF1Ou00"

const cards = [
  { icon: Users, title: "One Team, Start to Finish", body: "Same crew from site survey to strike. No handoffs, no miscommunication." },
  { icon: ShieldCheck, title: "Your Event, Our Reputation", body: "Your Technical Director is on call 24/7 because your event is our name on the line." },
  { icon: CheckCircle2, title: "1,986 Flawless Events", body: "Not 1,986 rentals. 1,986 events where everything went exactly as planned." },
  { icon: Clock, title: "Show-Ready 2 Hours Early", body: "Walk into a venue that's already tested, tuned, and waiting for your guests." },
]

export function LandingWhyUs() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="why-us" className="relative py-16 md:py-24 scroll-mt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <span className="ds-pill mb-4">
            <span className="dot" />
            Why Prime Line
          </span>
          {/* H2 — 2 lines max on desktop */}
          <h2 className="text-[28px] md:text-[40px] font-extrabold tracking-[-0.025em] leading-[1.1] text-white max-w-[20ch] mx-auto text-balance">
            Why 1,900+ Events <span className="ds-accent-text">Trust Prime Line</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-7 md:gap-10 items-stretch">
          {/* LEFT — Video (matches the right cards grid height on desktop) */}
          <div
            className="relative rounded-[20px] overflow-hidden border border-white/10 backdrop-blur-2xl flex lg:h-full"
            style={{
              background: "linear-gradient(135deg, rgba(255, 45, 111,0.10), rgba(255, 210, 74,0.05))",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7)",
            }}
          >
            <div className="m-3 md:m-4 rounded-[14px] overflow-hidden bg-black border border-white/[0.08] flex-1">
              <div className="relative w-full aspect-video lg:aspect-auto lg:h-full">
                {playing ? (
                  <iframe
                    src={`https://player.mux.com/${SHOWREEL_MUX_ID}?autoplay=1`}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: "none" }}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={`https://image.mux.com/${SHOWREEL_MUX_ID}/animated.gif?width=480`}
                      alt="Prime Line AV showreel preview"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <button onClick={() => setPlaying(true)} className="absolute inset-0 flex items-center justify-center group" aria-label="Play showreel">
                      <div
                        className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 group-hover:scale-110"
                        style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)", boxShadow: "0 16px 48px -8px rgba(255,45,111,0.6)" }}
                      >
                        <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,45,111,0.25)" }} />
                        <Play className="w-6 h-6 md:w-8 md:h-8 fill-white text-white ml-1" />
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — 4 cards */}
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {cards.map(({ icon: Icon, title, body }) => (
              <div key={title} className="ds-card p-5 md:p-6">
                <div className="w-11 h-11 rounded-[12px] bg-[#FF2D6F]/14 border border-[#FF2D6F]/24 grid place-items-center text-[#FF2D6F] mb-3.5">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-[16px] md:text-[17px] font-bold text-white mb-1.5 leading-snug">{title}</h3>
                <p className="text-[13px] md:text-[14px] text-white/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div
          className="mt-8 md:mt-12 relative rounded-[24px] border border-white/[0.08] px-6 py-7 md:px-10 md:py-9 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)",
          }}
        >
          {/* Decorative quote marks */}
          <Quote className="absolute -top-2 left-4 w-14 h-14 md:w-16 md:h-16 text-[#FF2D6F]/10 -scale-x-100" aria-hidden />
          <Quote className="absolute -bottom-3 right-4 w-14 h-14 md:w-16 md:h-16 text-[#FF2D6F]/10" aria-hidden />

          <p className="relative text-center text-[18px] md:text-[22px] leading-relaxed text-white/90 font-medium text-balance">
            “We&apos;ve used Prime Line for 6 events now. The difference is{" "}
            <span className="whitespace-nowrap">
              <span className="ds-accent-text">night and day</span>.
            </span>{" "}
            They <span className="ds-accent-text">own the entire production</span> so I can actually focus on my guests.”
          </p>

          {/* Bottom row: author + stars centered, side by side */}
          <div className="relative mt-6 flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] grid place-items-center text-white font-bold text-[14px]"
                style={{ boxShadow: "0 8px 24px -8px rgba(255,45,111,0.6)" }}
              >
                LS
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-[14px] leading-tight">Lauren Selman</p>
                <p className="text-white/50 text-[12px]">Event Producer</p>
              </div>
            </div>

            <span className="hidden sm:block h-8 w-px bg-white/15" aria-hidden />

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#FFD24A] fill-[#FFD24A]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
