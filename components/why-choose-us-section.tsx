"use client"

import { Icon3D } from "@/components/icon-3d"
import { useLanguage } from "@/lib/i18n/language-context"
import { CountUp } from "./count-up"

export function WhyChooseUsSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: "award" as const,
      title: t("whyUs.equipment"),
      description: t("whyUs.equipment.desc"),
    },
    {
      icon: "headset" as const,
      title: t("whyUs.support"),
      description: t("whyUs.support.desc"),
    },
    {
      icon: "walkie-talkie" as const,
      title: t("whyUs.experience"),
      description: t("whyUs.experience.desc"),
    },
    {
      icon: "location-pin" as const,
      title: t("whyUs.nationwide"),
      description: t("whyUs.nationwide.desc"),
    },
  ]

  return (
    <section id="why-us" className="py-24 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="reveal-left">
            <span className="ds-pill mb-5">
              <span className="dot" />
              {t("whyUs.title")}
            </span>
            <h2 className="text-[32px] md:text-[44px] lg:text-[48px] font-extrabold tracking-[-0.025em] leading-[1.08] text-white mb-5">
              {t("whyUs.subtitle")}
            </h2>
            <p className="text-white/55 text-[16px] md:text-[17px] mb-8 leading-relaxed">{t("about.description")}</p>

            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-3.5 p-4 rounded-[14px] border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl transition-all hover:bg-[#FF2D6F]/[0.05] hover:border-[#FF2D6F]/[0.18]"
                >
                  <Icon3D name={feature.icon} size={44} className="flex-shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
                  <div>
                    <b className="block text-white font-bold text-[14px] mb-1">{feature.title}</b>
                    <span className="text-white/45 text-[12px] leading-[1.5]">{feature.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - equalizer visual (no image, no overflow) */}
          <div
            className="reveal-right relative aspect-[1/1.05] rounded-[24px] overflow-hidden border border-[#FF2D6F]/[0.18] backdrop-blur-2xl flex flex-col p-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 45, 111,0.08) 0%, rgba(255, 210, 74,0.03) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -20px rgba(0,0,0,0.6)",
            }}
          >
            {/* Top text */}
            <div className="flex flex-col gap-3">
              <div
                className="text-[72px] md:text-[100px] font-black tracking-[-0.04em] leading-none"
                style={{
                  background: "linear-gradient(135deg, #e6f4ee 0%, #FF2D6F 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                15<span className="text-[0.6em]">+</span>
              </div>
              <p className="text-white/55 text-[14px] md:text-[15px] max-w-[320px]">
                Years delivering brand-tier AV production for Fortune 500s and global event producers.
              </p>
            </div>

            {/* Equalizer takes the middle, bounded by flex */}
            <div className="flex-1 flex items-end gap-1.5 my-5 overflow-hidden rounded-md">
              {Array.from({ length: 16 }).map((_, i) => {
                const delays = [-0.2, -0.6, -0.1, -0.8, -0.4, -0.5, -0.3, -0.7, -0.2, -0.9, -0.4, -0.6, -0.1, -0.8, -0.5, -0.3]
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm animate-eq"
                    style={{
                      animationDelay: `${delays[i]}s`,
                      background: "linear-gradient(to top, #FF5E3A, #FF2D6F, #FFD24A)",
                      boxShadow: "0 0 8px rgba(255, 45, 111,0.35)",
                    }}
                  />
                )
              })}
            </div>

            {/* Mini stats footer */}
            <div className="flex justify-between gap-3">
              <div
                className="flex-1 px-4 py-3 rounded-[12px] border border-white/[0.10] backdrop-blur-md"
                style={{ background: "rgba(8,18,26,0.85)" }}
              >
                <b className="block text-[20px] font-extrabold text-[#FF2D6F] tracking-[-0.02em]">
                  <CountUp end={1986} suffix="+" />
                </b>
                <span className="text-[10px] tracking-[0.08em] uppercase text-white/45">Events</span>
              </div>
              <div
                className="flex-1 px-4 py-3 rounded-[12px] border border-white/[0.10] backdrop-blur-md"
                style={{ background: "rgba(8,18,26,0.85)" }}
              >
                <b className="block text-[20px] font-extrabold text-[#FF2D6F] tracking-[-0.02em]">
                  <CountUp end={49} duration={1800} format={(n) => (n / 10).toFixed(1)} suffix="★" />
                </b>
                <span className="text-[10px] tracking-[0.08em] uppercase text-white/45">Rating</span>
              </div>
              <div
                className="flex-1 px-4 py-3 rounded-[12px] border border-white/[0.10] backdrop-blur-md"
                style={{ background: "rgba(8,18,26,0.85)" }}
              >
                <b className="block text-[20px] font-extrabold text-[#FF2D6F] tracking-[-0.02em]">
                  <CountUp end={500} suffix="+" />
                </b>
                <span className="text-[10px] tracking-[0.08em] uppercase text-white/45">Brands</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
