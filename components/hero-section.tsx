"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight, Play, Star, Clock, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { useCity } from "@/lib/city-context"
import MuxPlayer from "@mux/mux-player-react"

interface HeroSectionProps {
  onStartQuote: () => void
}

function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startOnView, hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    let startTime: number
    let animationFrame: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, hasStarted])

  return { count, ref }
}

export function HeroSection({ onStartQuote }: HeroSectionProps) {
  const eventsCounter = useCountUp(1986, 2500)
  const ratingCounter = useCountUp(49, 2000, false)
  const { t } = useLanguage()
  const city = useCity()
  const [videoPlaying, setVideoPlaying] = useState(false)



  return (
    <section className="relative pt-6 pb-12 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <span className="ds-pill mb-3 md:mb-6 text-[10px] md:text-[12px]">
              <span className="dot" />
              AV Company in {city}
            </span>

            <h1 className="text-[34px] sm:text-[48px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white mt-3 mb-4 md:my-6">
              The AV Partner
              <br />
              Brands <span className="ds-accent-text">Trust</span>
            </h1>

            <p className="text-white/60 text-[14px] md:text-[17px] lg:text-[18px] leading-relaxed max-w-[540px] mb-5 md:mb-9">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-12">
              <button
                onClick={onStartQuote}
                className="group inline-flex items-center justify-center gap-2.5 px-6 md:px-7 py-3.5 md:py-4 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] text-white font-extrabold text-[14px] md:text-[15px] tracking-[0.01em] transition-all hover:-translate-y-0.5"
                style={{
                  boxShadow:
                    "0 12px 36px -8px rgba(255, 45, 111,0.55), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                {t("hero.cta.quote")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            <div ref={eventsCounter.ref} className="flex gap-x-7 sm:gap-x-12 gap-y-4 flex-wrap">
              <div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] tabular-nums text-white leading-none">
                  {eventsCounter.count.toLocaleString()}+
                </p>
                <p className="text-[10px] md:text-[11px] tracking-[0.14em] md:tracking-[0.16em] uppercase text-white/45 mt-1.5 md:mt-2 font-semibold">
                  {t("hero.stats.events")}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] tabular-nums text-white leading-none">
                    {(ratingCounter.count / 10).toFixed(1)}
                  </p>
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFD24A] fill-[#FFD24A]" />
                </div>
                <p className="text-[10px] md:text-[11px] tracking-[0.14em] md:tracking-[0.16em] uppercase text-white/45 mt-1.5 md:mt-2 font-semibold">
                  {t("hero.stats.rating")}
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-white leading-none">24/7</p>
                <p className="text-[10px] md:text-[11px] tracking-[0.14em] md:tracking-[0.16em] uppercase text-white/45 mt-1.5 md:mt-2 font-semibold">
                  {t("hero.stats.support")}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT - video with glass frame + floating cards */}
          <div className="order-1 lg:order-2 relative">
            <div
              className="relative rounded-[24px] overflow-hidden border border-white/10 backdrop-blur-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255, 45, 111,0.10), rgba(255, 210, 74,0.05))",
                boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7)",
              }}
            >
              <div className="m-3 md:m-5 rounded-[14px] md:rounded-[18px] overflow-hidden bg-black border border-white/[0.08]">
                <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                  {videoPlaying && (
                    <MuxPlayer
                      playbackId="sotNy01Bw9hXSjlHAaTe4lF9vEG00ZRO2Z7Wpf6QF1Ou00"
                      autoPlay="any"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                    />
                  )}
                  {!videoPlaying && (
                    <>
                      <img
                        src="https://image.mux.com/sotNy01Bw9hXSjlHAaTe4lF9vEG00ZRO2Z7Wpf6QF1Ou00/animated.gif?width=320"
                        alt="Video preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <button
                        onClick={() => setVideoPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center group"
                        aria-label="Play video"
                      >
                        <div
                          className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                            boxShadow: "0 16px 48px -8px rgba(255,45,111,0.6)",
                          }}
                        >
                          <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,45,111,0.25)" }} />
                          <Play className="w-6 h-6 md:w-8 md:h-8 fill-white text-white ml-1" />
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Top tag */}
              <div className="absolute left-6 top-6 md:left-9 md:top-9 z-10 inline-flex items-center gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-[10px] bg-black/55 backdrop-blur-md border border-white/[0.12] text-[9px] md:text-[10px] font-bold tracking-[0.14em] uppercase text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                Live · Reel
              </div>
            </div>

            {/* Floating glass cards */}
            <div
              className="hidden md:flex absolute top-[12%] -left-6 z-20 items-center gap-3 px-4 py-3.5 rounded-[14px] border border-[#FF2D6F]/20 backdrop-blur-2xl animate-float-y"
              style={{
                background: "rgba(8,18,26,0.7)",
                boxShadow:
                  "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="w-9 h-9 rounded-[10px] bg-[#FF2D6F]/16 grid place-items-center text-[#FF2D6F]">
                <CheckCircle2 className="w-[18px] h-[18px]" />
              </div>
              <div>
                <b className="block text-[13px] font-bold text-white leading-tight">1,986+ Events</b>
                <span className="text-[11px] text-white/45">Delivered flawlessly</span>
              </div>
            </div>

            <div
              className="hidden md:flex absolute bottom-[14%] -right-6 z-20 items-center gap-3 px-4 py-3.5 rounded-[14px] border border-[#FF2D6F]/20 backdrop-blur-2xl animate-float-y"
              style={{
                animationDelay: "-2.5s",
                background: "rgba(8,18,26,0.7)",
                boxShadow:
                  "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="w-9 h-9 rounded-[10px] bg-[#FF2D6F]/16 grid place-items-center text-[#FF2D6F]">
                <Clock className="w-[18px] h-[18px]" />
              </div>
              <div>
                <b className="block text-[13px] font-bold text-white leading-tight">24/7 On-Call</b>
                <span className="text-[11px] text-white/45">Crew on standby</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
