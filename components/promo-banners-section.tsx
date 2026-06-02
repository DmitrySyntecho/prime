"use client"

import { useState, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const openQuote = () => document.dispatchEvent(new CustomEvent("openQuoteForm"))

const promoBanners = [
  {
    id: 1,
    headline: "Permanent AV Installation for Your Facility",
    subheadline: "From conference rooms to large venues — we design and install complete AV systems.",
    cta: "Request a Quote",
    ctaLink: "/services/av-installation",
    image: "/images/banners/permanent-av-banner.webp",
  },
  {
    id: 2,
    headline: "LED Wall Rental Specials",
    subheadline: "Exclusive monthly offers for indoor and outdoor LED wall rentals.",
    cta: "Book Now",
    ctaLink: "/rentals/led-walls",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80",
  },
]

export function PromoBannersSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % promoBanners.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + promoBanners.length) % promoBanners.length)
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null
    // require horizontal intent (more X than Y) and a 40px threshold
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) nextSlide()
    else prevSlide()
  }

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Single Banner Carousel */}
        <div className="relative">
          {/* Main Banner */}
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] aspect-[2/1] sm:aspect-[2.5/1] md:aspect-[4/1] touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {promoBanners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.headline}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Gradient overlay - darker on left for text readability, lighter on right */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#03070a]/95 via-[#03070a]/70 via-50% to-transparent" />

                <div className="absolute inset-0 flex items-center">
                  <div className="px-5 sm:px-8 md:px-12 lg:px-16 max-w-[85%] sm:max-w-xl md:max-w-2xl">
                    <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] mb-1.5 sm:mb-2 md:mb-3 leading-tight text-white">
                      {banner.headline}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 text-white/70 line-clamp-2 sm:line-clamp-none">{banner.subheadline}</p>
                    <button
                      type="button"
                      onClick={openQuote}
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-br from-[#FF2D6F] to-[#FF5E3A] text-white font-bold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl transition-all hover:-translate-y-0.5 text-xs sm:text-sm md:text-base"
                      style={{
                        boxShadow:
                          "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.30)",
                      }}
                    >
                      {banner.cta}
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/[0.05] hover:bg-[#FF2D6F]/15 hover:border-[#FF2D6F]/30 border border-white/[0.10] backdrop-blur-md text-white rounded-[12px] items-center justify-center transition-all"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/[0.05] hover:bg-[#FF2D6F]/15 hover:border-[#FF2D6F]/30 border border-white/[0.10] backdrop-blur-md text-white rounded-[12px] items-center justify-center transition-all"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {promoBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#FF2D6F] w-8" : "bg-white/40 hover:bg-white/60 w-2"
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
