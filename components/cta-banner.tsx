"use client"

import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface CTABannerProps {
  onStartQuote: () => void
}

export function CTABanner({ onStartQuote }: CTABannerProps) {
  const { t } = useLanguage()

  return (
    <section className="keep-original py-24 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          className="reveal-zoom relative px-6 md:px-14 py-14 md:py-20 rounded-[28px] border border-[#FF2D6F]/20 backdrop-blur-2xl text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 45, 111,0.08) 0%, rgba(124, 45, 90,0.04) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 80px -20px rgba(124, 45, 90,0.5)",
          }}
        >
          {/* Decorative radial glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 100%, rgba(255, 45, 111,0.16) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 70% 0%, rgba(255, 210, 74,0.12) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative z-10">
            <h2 className="text-[40px] md:text-[64px] lg:text-[76px] font-black tracking-[-0.035em] leading-[1] text-white mb-2">
              {t("cta.title")}
            </h2>
            <h2 className="text-[40px] md:text-[64px] lg:text-[76px] font-black italic tracking-[-0.035em] leading-[1] mb-7">
              <span className="ds-accent-text">{t("cta.subtitle")}</span>
            </h2>

            <p className="text-white/55 text-[16px] md:text-[18px] max-w-[560px] mx-auto mb-9">
              {t("hero.description")}
            </p>

            <button
              onClick={onStartQuote}
              className="cta-yellow group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] font-extrabold text-[15px] tracking-[0.01em] transition-all hover:-translate-y-0.5"
            >
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p className="text-white/40 text-[13px] mt-7 tracking-[0.04em]">
              Free consultation · No commitment · Response within hours
            </p>
          </div>

          {/* Crosshatch bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-6 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--emerald) 0, var(--emerald) 1px, transparent 1px, transparent 8px)",
            }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  )
}
