"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart, Truck } from "lucide-react"
import { useCart, type Product, type ProductCategory } from "@/lib/cart-context"
import { products, CATEGORIES, CATEGORY_FILTERS } from "@/lib/products-data"
import { CATEGORY_ICON_3D } from "@/lib/nav-icons"
import { ProductCard, formatPrice } from "@/components/product-card"
import { Icon3D, type Icon3DName } from "@/components/icon-3d"
import { SectionHeader } from "@/components/section-header"

type TabKey = "popular" | ProductCategory

/** Heading for a category page, where the block shows only that category. */
const CATEGORY_COPY: Record<ProductCategory, { title: string; accent: string }> = {
  "led-screens": { title: "LED video walls ready to rent", accent: "LED video walls" },
  "dj-setups": { title: "DJ setups ready to rent", accent: "DJ setups" },
  "sound-systems": { title: "Sound systems ready to rent", accent: "Sound systems" },
  lighting: { title: "Lighting packages ready to rent", accent: "Lighting packages" },
  stage: { title: "Stages ready to rent", accent: "Stages" },
  "pipe-drape": { title: "Pipe & drape ready to rent", accent: "Pipe & drape" },
  tv: { title: "TVs & displays ready to rent", accent: "TVs & displays" },
}

const byShowcase = (a: Product, b: Product) => Number(!!b.featured) - Number(!!a.featured) || b.price - a.price

type Tab = {
  key: TabKey
  label: string
  /** Spotlight heading. */
  title: string
  icon: Icon3DName
  image: string
  items: Product[]
  /** Items in the full catalog for this tab. */
  total: number
  from: number
  href: string
}

const SPOTLIGHT_IMAGE: Record<TabKey, string> = {
  popular: "/images/services/full-av-card.webp",
  "led-screens": "/images/services/led-screen-card.webp",
  "dj-setups": "/images/products/dj-setups/dj-setup-04/main.webp",
  "sound-systems": "/images/services/sound-system-card.webp",
  lighting: "/images/services/lighting-rental-card.webp",
  stage: "/images/services/stage-rental-card.webp",
  "pipe-drape": "/images/services/pipe-drape-card.webp",
  tv: "/images/services/tv-rental-card.webp",
}

const PER_TAB = 10

const minPrice = (list: Product[]) => Math.min(...list.map((p) => p.price))

function buildTabs(): Tab[] {
  // Best sellers: round-robin across categories so the first cards in view
  // aren't two LED walls in a row (featured items come in category pairs).
  const rank: Record<string, number> = {}
  const featured = products
    .filter((p) => p.featured)
    .map((p) => ({ p, r: (rank[p.category] = (rank[p.category] ?? -1) + 1) }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.p)

  const categoryTabs = CATEGORIES.flatMap((c): Tab[] => {
    const list = products.filter((p) => p.category === c.slug)
    if (!list.length) return []
    return [
      {
        key: c.slug,
        label: c.shortLabel,
        title: c.label,
        icon: CATEGORY_ICON_3D[c.slug] ?? "quote-cart",
        image: SPOTLIGHT_IMAGE[c.slug],
        items: [...list].sort(byShowcase).slice(0, PER_TAB),
        total: list.length,
        from: minPrice(list),
        href: `/shop?category=${c.slug}`,
      },
    ]
  })

  return [
    {
      key: "popular",
      label: "Best sellers",
      title: "Our most-booked gear",
      icon: "award",
      image: SPOTLIGHT_IMAGE.popular,
      items: featured,
      total: products.length,
      from: minPrice(featured),
      href: "/shop",
    },
    ...categoryTabs,
  ]
}

const TABS = buildTabs()

const STEPS: { icon: Icon3DName; title: string; body: string }[] = [
  { icon: "quote-cart", title: "Add gear to your quote", body: "Pick items here or in the full catalog." },
  { icon: "stopwatch", title: "Get an itemized quote", body: "In as fast as 30 minutes, no obligation." },
  { icon: "delivery-truck", title: "We deliver and set up", body: "Our crew tests everything before doors open." },
]

function Spotlight({ tab }: { tab: Tab }) {
  return (
    <aside
      className="tab-swap keep-original fx-spot group relative flex flex-col overflow-hidden rounded-[22px] border border-[#FF2D6F]/25 bg-[#0a0a0a]"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)" }}
    >
      {/* Desktop: photo on top. Below lg the card is a compact strip and the photo becomes a dimmed backdrop. */}
      <div className="absolute inset-0 overflow-hidden lg:relative lg:inset-auto lg:aspect-[4/3]">
        <Image src={tab.image} alt="" fill sizes="(max-width: 1024px) 100vw, 300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/55 lg:bg-gradient-to-t lg:from-[#0a0a0a] lg:via-[#0a0a0a]/10 lg:to-transparent" />
      </div>

      <div className="relative flex flex-1 flex-wrap items-center gap-4 p-4 sm:flex-nowrap sm:p-5 lg:flex-col lg:items-stretch lg:gap-0 lg:px-6 lg:pb-6 lg:pt-0">
        <div
          className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] backdrop-blur-md lg:-mt-12 lg:mb-4 lg:h-[76px] lg:w-[76px] lg:rounded-[20px]"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 30%, rgba(255,45,111,0.32), rgba(10,10,10,0.75) 75%)", border: "1px solid rgba(255,45,111,0.35)" }}
        >
          <Icon3D
            name={tab.icon}
            size={62}
            className="!h-[52px] !w-[52px] drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-3 lg:!h-[62px] lg:!w-[62px]"
          />
        </div>
        <div className="min-w-0 flex-1 lg:mb-6 lg:flex-none">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFD24A]">
            {tab.key === "popular" ? `${tab.items.length} best sellers` : `${tab.total} rental options`}
          </p>
          <h3 className="mt-1 text-balance text-[19px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white lg:mt-1.5 lg:text-[24px]">{tab.title}</h3>
          <p className="mt-1 text-[13px] text-white/85 lg:mt-2 lg:text-[14px]">
            From <span className="text-[18px] font-black tracking-[-0.01em] text-white lg:text-[22px]">${formatPrice(tab.from)}</span> / 24h
          </p>
          <p className="mt-3 hidden items-center gap-2 text-[13px] text-white/90 lg:flex">
            <Truck className="h-4 w-4 shrink-0 text-[#FF5E3A]" />
            Delivered, set up and tested by our crew
          </p>
        </div>
        <Link
          href={tab.href}
          className="cta-yellow shimmer-stroke inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-extrabold sm:w-auto lg:mt-auto lg:w-full"
        >
          View all {tab.total} items <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  )
}

/**
 * Equipment rental block: spotlight + product row, wired to the quote cart.
 * Without `category` (homepage, general pages) it browses the catalog by category
 * tabs. With `category` (a service page about one kind of gear) it shows only
 * that category, filtered by the category's first catalog facet (pixel pitch,
 * audience size…) instead of tabs.
 */
export function HomeShopSection({ category }: { category?: ProductCategory } = {}) {
  const locked = category && TABS.some((t) => t.key === category) ? category : undefined
  const [active, setActive] = useState<TabKey>(locked ?? "popular")
  const tab = TABS.find((t) => t.key === active) ?? TABS[0]
  const { itemCount, openCart } = useCart()

  const facet = locked ? CATEGORY_FILTERS[locked]?.[0] : undefined
  const [option, setOption] = useState<string | null>(null)
  const inCategory = locked ? products.filter((p) => p.category === locked).sort(byShowcase) : []
  const items = locked ? inCategory.filter((p) => !facet || !option || p.filters?.[facet.key] === option) : tab.items

  const rowRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState({ atStart: true, atEnd: false, progress: 0, visible: 1 })

  const measure = useCallback(() => {
    const el = rowRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setScroll({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
      progress: max > 0 ? el.scrollLeft / max : 0,
      visible: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
    })
  }, [])

  // The row is keyed by tab/filter, so it remounts at scrollLeft 0 — re-measure it.
  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure, active, option])

  const page = (dir: 1 | -1) => {
    const el = rowRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" })
  }

  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    e.preventDefault()
    const i = TABS.findIndex((t) => t.key === active)
    const next = TABS[(i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length]
    setActive(next.key)
    document.getElementById(`shop-tab-${next.key}`)?.focus()
  }

  return (
    <section id="shop" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        {locked ? (
          <SectionHeader eyebrow="Rent the gear" title={CATEGORY_COPY[locked].title} accent={CATEGORY_COPY[locked].accent}>
            Every item comes from our own inventory and is delivered, set up and tested by our crew. Add what you need to your quote, and our team will confirm
            availability and <span className="hl">send you an itemized price.</span>
          </SectionHeader>
        ) : (
          <SectionHeader eyebrow="Rent the gear" title="Rent the same equipment we bring to our shows" accent="same equipment">
            LED walls, sound, lighting, staging and more from our own inventory. Add what you need to your quote, and our team will confirm availability and <span className="hl">send you an itemized price.</span>
          </SectionHeader>
        )}

        {locked ? (
          /* Category page: filter chips from the category's first catalog facet */
          facet && (
            <div
              role="group"
              aria-label={`Filter by ${facet.label.toLowerCase()}`}
              className="reveal -mx-4 flex snap-x items-center gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:justify-center lg:px-0"
              style={{ scrollbarWidth: "none" }}
            >
              <span className="shrink-0 pr-1 text-[13px] font-bold uppercase tracking-[0.12em] text-white/80">{facet.label}</span>
              {[{ value: null as string | null, label: "All" }, ...facet.options].map((o) => {
                const on = option === o.value
                const count = o.value ? inCategory.filter((p) => p.filters?.[facet.key] === o.value).length : inCategory.length
                return (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setOption(o.value)}
                    className={`inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] font-bold outline-none ring-[#FFD24A]/60 transition-[background-color,border-color,color] duration-200 focus-visible:ring-2 ${
                      on ? "border-[#FF2D6F]/60 text-white" : "border-white/12 bg-white/[0.05] text-white/90 hover:border-white/30 hover:text-white"
                    }`}
                    style={on ? { background: "linear-gradient(135deg, rgba(255,45,111,0.28), rgba(255,94,58,0.14))" } : undefined}
                  >
                    {o.label}
                    <span className={`rounded-full px-2 py-0.5 text-[12px] font-extrabold tabular-nums ${on ? "bg-white text-[#C8124F]" : "bg-white/10 text-white/85"}`}>{count}</span>
                  </button>
                )
              })}
            </div>
          )
        ) : (
        /* Category tabs — scroll sideways on mobile, one centred row on desktop */
        <div
          role="tablist"
          aria-label="Equipment categories"
          onKeyDown={onTabKey}
          className="reveal -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {TABS.map((t) => {
            const on = t.key === active
            return (
              <button
                key={t.key}
                id={`shop-tab-${t.key}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="shop-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(t.key)}
                className={`group inline-flex shrink-0 snap-start items-center gap-2 rounded-2xl border py-1.5 pl-1.5 pr-4 text-[13.5px] font-bold outline-none ring-[#FFD24A]/60 transition-[background-color,border-color,color,translate] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 ${
                  on ? "border-[#FF2D6F]/55 text-white" : "border-white/10 bg-white/[0.04] text-white/85 hover:border-white/25 hover:text-white"
                }`}
                style={
                  on
                    ? { background: "linear-gradient(135deg, rgba(255,45,111,0.24), rgba(255,94,58,0.12))", boxShadow: "0 10px 30px -12px rgba(255,45,111,0.65), inset 0 1px 0 rgba(255,255,255,0.08)" }
                    : undefined
                }
              >
                <Icon3D name={t.icon} size={34} className={`transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${on ? "scale-110" : ""}`} />
                {t.label}
              </button>
            )
          })}
        </div>
        )}

        <div
          id="shop-panel"
          role={locked ? undefined : "tabpanel"}
          aria-labelledby={locked ? undefined : `shop-tab-${tab.key}`}
          className="reveal mt-8 grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]"
        >
          <Spotlight key={`spot-${tab.key}`} tab={tab} />

          <div className="min-w-0">
            <div
              key={`row-${tab.key}-${option ?? "all"}`}
              ref={rowRef}
              onScroll={measure}
              className="tab-swap -my-3 flex snap-x snap-mandatory gap-5 overflow-x-auto py-3"
              style={{ scrollbarWidth: "none" }}
            >
              {items.map((p) => (
                <div key={p.id} className="w-[80%] shrink-0 snap-start sm:w-[300px] lg:w-[calc((100%-2.5rem)/3)]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            {/* Row controls: progress + paging */}
            <div className="mt-5 flex items-center gap-4">
              <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
                <span
                  className="absolute inset-y-0 left-0 rounded-full transition-transform duration-150"
                  style={{
                    width: `${scroll.visible * 100}%`,
                    transform: `translateX(${scroll.visible < 1 ? ((scroll.progress * (1 - scroll.visible)) / scroll.visible) * 100 : 0}%)`,
                    background: "linear-gradient(90deg, #FF2D6F, #FF5E3A)",
                  }}
                />
              </div>
              {(["prev", "next"] as const).map((d) => {
                const disabled = d === "prev" ? scroll.atStart : scroll.atEnd
                const Icon = d === "prev" ? ChevronLeft : ChevronRight
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => page(d === "prev" ? -1 : 1)}
                    disabled={disabled}
                    aria-label={d === "prev" ? "Previous products" : "Next products"}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.12] bg-white/[0.05] text-white backdrop-blur-md transition-[background-color,border-color,opacity] hover:border-[#FF2D6F]/45 hover:bg-[#FF2D6F]/15 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* How renting works + live quote status */}
        <div
          className="reveal-zoom mt-12 grid gap-5 rounded-[24px] border border-white/10 p-5 sm:grid-cols-3 md:p-6 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-center lg:gap-6"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex items-center gap-4">
              <Icon3D name={s.icon} size={56} className="shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)]" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFD24A]">Step {i + 1}</p>
                <p className="text-[16px] font-extrabold leading-snug text-white">{s.title}</p>
                <p className="text-[14.5px] font-medium leading-snug text-white/90">{s.body}</p>
              </div>
            </div>
          ))}

          <div className="sm:col-span-3 lg:col-span-1">
            {itemCount > 0 ? (
              <button
                type="button"
                onClick={openCart}
                className="cta-yellow shimmer-stroke inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-extrabold lg:w-auto"
              >
                <ShoppingCart className="h-4 w-4" />
                Review your quote
                <span className="rounded-full bg-[#0a0612] px-2 py-0.5 text-[12px] font-black tabular-nums !text-[#FFD24A]">{itemCount}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => document.dispatchEvent(new CustomEvent("openQuoteForm"))}
                className="cta-yellow shimmer-stroke inline-flex w-full flex-col items-center justify-center gap-0.5 rounded-xl px-7 py-3 lg:w-auto"
              >
                <span className="inline-flex items-center gap-2 text-[15px] font-extrabold">
                  Get your custom quote <ArrowRight className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold opacity-70">Not sure what you need? Ask us</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
