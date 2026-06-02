"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ArrowRight, Sparkles, HandHeart, Users2, CalendarHeart } from "lucide-react"

const photos = [
  { src: "/images/charity/charity-1.webp", alt: "Young girl with walker giving thumbs up" },
  { src: "/images/charity/charity-2.webp", alt: "Girl with leg braces in front of flower wall" },
  { src: "/images/charity/charity-3.webp", alt: "Girl smiling with her dog" },
]

function useCount(end: number, duration = 2200) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (t: number) => {
            const p = Math.min((t - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 4)
            setN(Math.floor(eased * end))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end, duration])

  return { n, ref }
}

function AnimatedNumber({ end, format }: { end: number; format: (n: number) => string }) {
  const { n, ref } = useCount(end)
  return <span ref={ref}>{format(n)}</span>
}

function FloatingStat({
  icon: Icon,
  value,
  label,
  positionClass,
  delay = "0s",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  value: React.ReactNode
  label: string
  positionClass: string
  delay?: string
}) {
  // Wrap animation in inner div so the outer can do positioning transforms
  return (
    <div className={`absolute z-20 ${positionClass}`}>
      <div
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[14px] backdrop-blur-2xl"
        style={{
          background: "rgba(10,8,32,0.85)",
          border: "1px solid rgba(255,45,111,0.30)",
          boxShadow:
            "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
          animation: "floatYCharity 5s ease-in-out infinite",
          animationDelay: delay,
        }}
      >
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[#FF2D6F] flex-shrink-0"
          style={{
            background: "rgba(255,45,111,0.18)",
            border: "1px solid rgba(255,45,111,0.30)",
          }}
        >
          <Icon className="w-[16px] h-[16px]" strokeWidth={2.2} />
        </div>
        <div>
          <div
            className="text-[16px] font-black tracking-[-0.02em] leading-none tabular-nums"
            style={{
              background: "linear-gradient(135deg, #FFD24A 0%, #FF2D6F 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {value}
          </div>
          <div className="text-[9px] tracking-[0.12em] uppercase font-bold text-white/55 mt-0.5">
            {label}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CharitySection() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative rounded-[24px] border backdrop-blur-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,45,111,0.10) 0%, rgba(255,210,74,0.06) 50%, rgba(255,94,58,0.10) 100%)",
            border: "1px solid rgba(255,45,111,0.25)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), 0 30px 80px -24px rgba(255,45,111,0.30)",
          }}
        >
          <div
            className="absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,45,111,0.55), transparent 70%)",
              filter: "blur(80px)",
              animation: "charityGlowA 14s ease-in-out infinite",
            }}
            aria-hidden
          />
          <div
            className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,210,74,0.40), transparent 70%)",
              filter: "blur(80px)",
              animation: "charityGlowB 16s ease-in-out infinite",
            }}
            aria-hidden
          />

          {[
            { top: "12%", left: "18%", delay: "0s" },
            { top: "70%", left: "8%", delay: "1.2s" },
            { top: "30%", right: "22%", delay: "0.6s" },
            { top: "78%", right: "12%", delay: "2.1s" },
            { top: "50%", left: "45%", delay: "1.5s" },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute pointer-events-none"
              style={{
                ...p,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: i % 2 ? "#FFD24A" : "#FF2D6F",
                boxShadow: `0 0 8px ${i % 2 ? "#FFD24A" : "#FF2D6F"}`,
                animation: `sparkleCharity 3s ease-in-out infinite`,
                animationDelay: p.delay,
              }}
              aria-hidden
            />
          ))}

          <div className="relative z-10 grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 p-7 md:p-10 lg:p-14 items-center">
            {/* LEFT — text + CTA */}
            <div>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase backdrop-blur-md"
                style={{
                  background: "rgba(255,45,111,0.14)",
                  border: "1px solid rgba(255,45,111,0.32)",
                  color: "#FF8FAA",
                }}
              >
                <Heart className="w-3.5 h-3.5 fill-[#FF2D6F] text-[#FF2D6F] animate-pulse-ds" />
                Giving Back
              </span>

              <h2 className="text-[26px] md:text-[34px] lg:text-[40px] font-black tracking-[-0.025em] leading-[1.18] text-white mb-4 text-balance">
                Every rental helps{" "}
                <span
                  className="italic inline-block"
                  style={{
                    background: "linear-gradient(135deg, #FFD24A 0%, #FF2D6F 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    paddingRight: "0.18em",
                    marginRight: "-0.04em",
                    lineHeight: 1.18,
                  }}
                >
                  change a child&apos;s life.
                </span>
              </h2>

              <p className="text-white/65 text-[14px] md:text-[15px] leading-relaxed mb-6 max-w-[480px]">
                A portion of every booking goes to local children&apos;s charities and educational programs.
                Together we&apos;ve helped thousands of kids in our community.
              </p>

              <Link
                href="https://unlimbited.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-[13px] tracking-[0.02em] transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                  boxShadow:
                    "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.30)",
                }}
              >
                <Sparkles className="w-4 h-4" />
                Learn About Our Mission
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* RIGHT — kids photo collage with floating stat cards */}
            <div className="relative pt-6 pb-10 px-2">
              <div className="grid grid-cols-3 gap-2.5 md:gap-3">
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative aspect-[3/4] rounded-[14px] overflow-hidden border border-white/[0.10]"
                    style={{
                      boxShadow: "0 18px 40px -16px rgba(0,0,0,0.6)",
                      transform: i === 1 ? "translateY(-14px)" : "translateY(0)",
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 30vw, 200px"
                    />
                    <div
                      className="absolute inset-0 mix-blend-overlay opacity-25 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,45,111,0.0), rgba(255,45,111,0.45))",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Floating stat cards positioned around the photo collage */}
              <FloatingStat
                icon={HandHeart}
                value={<AnimatedNumber end={250} format={(n) => `$${n}K+`} />}
                label="Donated"
                positionClass="-top-2 -left-4 sm:-left-6"
                delay="0s"
              />
              <FloatingStat
                icon={Users2}
                value={
                  <AnimatedNumber
                    end={5000}
                    format={(n) => {
                      const k = Math.floor(n / 1000)
                      return k > 0 ? `${k.toLocaleString()},000+` : `${n}`
                    }}
                  />
                }
                label="Children Helped"
                positionClass="top-[42%] -right-3 sm:-right-6"
                delay="-1.5s"
              />
              <FloatingStat
                icon={CalendarHeart}
                value={<AnimatedNumber end={50} format={(n) => `${n}+`} />}
                label="Charity Events"
                positionClass="-bottom-3 left-1/2 -translate-x-1/2"
                delay="-3s"
              />
            </div>
          </div>

          {/* Crosshatch border bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-5 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #FF2D6F 0, #FF2D6F 1px, transparent 1px, transparent 8px)",
            }}
            aria-hidden
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes charityGlowA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.1); }
        }
        @keyframes charityGlowB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -25px) scale(1.15); }
        }
        @keyframes sparkleCharity {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes floatYCharity {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}
