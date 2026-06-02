"use client"

export function TrustedBySection() {
  const row1 = [
    { name: "Walmart", src: "/images/brands/walmart.svg" },
    { name: "Amazon", src: "/images/brands/amazon.svg" },
    { name: "Google", src: "/images/brands/google.svg" },
    { name: "Apple", src: "/images/brands/apple.svg" },
    { name: "Meta", src: "/images/brands/meta.svg" },
    { name: "Nike", src: "/images/brands/nike.svg" },
    { name: "Coca-Cola", src: "/images/brands/coca-cola.svg" },
    { name: "Disney", src: "/images/brands/disney.svg" },
    { name: "Tesla", src: "/images/brands/tesla.svg" },
    { name: "TikTok", src: "/images/brands/tiktok.svg" },
  ]

  const row2 = [
    { name: "Sony", src: "/images/brands/sony.svg" },
    { name: "Nestlé", src: "/images/brands/nestle.svg" },
    { name: "Costco", src: "/images/brands/costco.svg" },
    { name: "Bank of America", src: "/images/brands/bank-of-america.svg" },
    { name: "Cisco", src: "/images/brands/cisco.svg" },
    { name: "Mercedes-Benz", src: "/images/brands/mercedes-benz.svg" },
    { name: "JP Morgan", src: "/images/brands/jp-morgan.svg" },
    { name: "Target", src: "/images/brands/target.svg" },
    { name: "Visa", src: "/images/brands/visa.svg" },
    { name: "Vector", src: "/images/brands/vector.svg" },
  ]

  /**
   * Render the set FOUR times so the track is always wider than any viewport.
   * Animate translateX(0 → -50%) — that's exactly TWO sets of shift.
   * Since the track holds 4 sets and we slide by 2, at any moment AT LEAST
   * 2 full sets are visible on screen — no empty space, no seam.
   *
   * Every tile uses margin-right (not flex gap) so the trailing space is
   * uniform — including after the last tile — making the seam math exact.
   */
  const Row = ({ items, direction }: { items: typeof row1; direction: "left" | "right" }) => {
    const repeated = [...items, ...items, ...items, ...items]
    return (
      <div className="overflow-hidden">
        <div
          className={`flex w-max items-center ${
            direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
          }`}
          style={{ animationDuration: direction === "left" ? "120s" : "140s" }}
        >
          {repeated.map((logo, i) => (
            <div
              key={`${direction}-${i}`}
              className="flex-shrink-0 grid place-items-center h-[56px] min-w-[140px] px-5 mr-4 rounded-[14px] border border-white/[0.06] bg-white/[0.03] backdrop-blur-md"
              aria-hidden={i >= items.length}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-6 md:h-7 w-auto max-w-[110px] object-contain"
                style={{ filter: "brightness(0) invert(1) opacity(0.65)" }}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="pb-14 md:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-center text-[13px] md:text-sm font-semibold text-white/55 tracking-[0.18em] uppercase">
          Trusted by Leading Brands, Agencies &amp; Corporate Teams
        </h2>
      </div>

      <div className="space-y-4">
        <Row items={row1} direction="left" />
        <Row items={row2} direction="right" />
      </div>
    </section>
  )
}
