"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { products as ALL_PRODUCTS, CATEGORIES, CATEGORY_FILTERS } from "@/lib/products-data"
import type { ProductCategory } from "@/lib/cart-context"
import { ProductCard } from "@/components/product-card"
import {
  Search,
  SlidersHorizontal,
  X,
  Package,
  Truck,
  Clock,
  Shield,
  Zap,
  ShoppingCart,
  ArrowRight,
  Check,
  Monitor,
  Disc3,
  Volume2,
  Lightbulb,
  Layers,
  Crown,
  DollarSign,
  Tv,
  Blinds,
  type LucideIcon,
} from "lucide-react"

type SortKey = "featured" | "price-asc" | "price-desc" | "name"

const CATEGORY_ICONS: Record<ProductCategory, LucideIcon> = {
  "led-screens": Monitor,
  "dj-setups": Disc3,
  "sound-systems": Volume2,
  lighting: Lightbulb,
  stage: Layers,
  "pipe-drape": Blinds,
  tv: Tv,
}

const TIER_ICONS: Record<string, LucideIcon> = {
  basic: Package,
  premium: Crown,
}

const PRICE_RANGES: { label: string; min: number; max: number }[] = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under $1,500", min: 0, max: 1500 },
  { label: "$1,500 – $5,000", min: 1500, max: 5000 },
  { label: "$5,000 – $10,000", min: 5000, max: 10000 },
  { label: "$10,000+", min: 10000, max: Infinity },
]

const TIER_OPTIONS: { value: "basic" | "premium"; label: string }[] = [
  { value: "basic", label: "Basic Packages" },
  { value: "premium", label: "Premium Packages" },
]

export function ShopCatalog() {
  const [search, setSearch] = useState("")
  const [selectedCat, setSelectedCat] = useState<ProductCategory | null>(null)
  const [selectedTiers, setSelectedTiers] = useState<Set<string>>(new Set())
  // contextual sub-filters: { [facetKey]: Set<value> }
  const [subFilters, setSubFilters] = useState<Record<string, Set<string>>>({})
  const [priceIdx, setPriceIdx] = useState(0)
  const [sort, setSort] = useState<SortKey>("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const activeFacets = selectedCat ? CATEGORY_FILTERS[selectedCat] || [] : []

  const catCounts = useMemo(() => {
    const m = new Map<ProductCategory, number>()
    for (const p of ALL_PRODUCTS) m.set(p.category, (m.get(p.category) || 0) + 1)
    return m
  }, [])

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceIdx]
    const q = search.trim().toLowerCase()
    const activeSubKeys = Object.keys(subFilters).filter((k) => subFilters[k]?.size > 0)
    let list = ALL_PRODUCTS.filter((p) => {
      if (selectedCat && p.category !== selectedCat) return false
      if (selectedTiers.size > 0 && !selectedTiers.has(p.tier)) return false
      // contextual sub-filters: AND across facets, OR within a facet
      for (const key of activeSubKeys) {
        const val = p.filters?.[key]
        if (!val || !subFilters[key].has(val)) return false
      }
      if (p.price < range.min || p.price > range.max) return false
      if (q && !(`${p.name} ${p.description} ${p.dimensions}`.toLowerCase().includes(q))) return false
      return true
    })

    list = [...list]
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        list.sort((a, b) => b.price - a.price)
        break
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.price - a.price)
    }
    return list
  }, [search, selectedCat, selectedTiers, subFilters, priceIdx, sort])

  // top of the catalog area — we scroll here when the category changes so the
  // user always lands at the start of the (re-filtered) list.
  const topRef = useRef<HTMLDivElement>(null)
  const scrollToTop = () => {
    const el = topRef.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96 // sticky header offset
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  // single-select category; switching resets contextual sub-filters
  const selectCat = (c: ProductCategory) => {
    setSelectedCat((prev) => (prev === c ? null : c))
    setSubFilters({})
    setMobileFiltersOpen(false)
    scrollToTop()
  }

  const toggleTier = (value: string) => {
    setSelectedTiers((prev) => {
      const next = new Set(prev)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })
  }

  const toggleSub = (key: string, value: string) => {
    setSubFilters((prev) => {
      const next = { ...prev }
      const set = new Set(next[key] || [])
      set.has(value) ? set.delete(value) : set.add(value)
      next[key] = set
      return next
    })
  }

  const subFilterCount = Object.values(subFilters).reduce((n, s) => n + (s?.size || 0), 0)
  const activeFilters =
    (selectedCat ? 1 : 0) +
    selectedTiers.size +
    subFilterCount +
    (priceIdx !== 0 ? 1 : 0) +
    (search ? 1 : 0)
  const clearAll = () => {
    setSelectedCat(null)
    setSelectedTiers(new Set())
    setSubFilters({})
    setPriceIdx(0)
    setSearch("")
  }

  const Sidebar = (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search equipment..."
          className="w-full pl-10 pr-3 py-2.5 rounded-xl text-[14px] text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[#FF2D6F]/40"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
        />
      </div>

      {/* Categories — single select */}
      <div>
        <h3 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2">
          <Package className="w-3.5 h-3.5 text-[#FF5E3A]" /> Category
        </h3>
        <div className="space-y-1">
          {CATEGORIES.map((c) => {
            const checked = selectedCat === c.slug
            const count = catCounts.get(c.slug) || 0
            const Icon = CATEGORY_ICONS[c.slug]
            return (
              <button
                key={c.slug}
                onClick={() => selectCat(c.slug)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all hover:bg-white/5"
                style={{
                  background: checked ? "rgba(255,45,111,0.12)" : "transparent",
                  border: `1px solid ${checked ? "rgba(255,45,111,0.35)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${checked ? "text-[#FF5E3A]" : "text-white/45"}`} />
                <span className={`flex-1 text-[13px] font-medium ${checked ? "text-white" : "text-white/80"}`}>
                  {c.shortLabel}
                </span>
                <span className="text-[11px] text-white/35">{count}</span>
                {checked && <Check className="w-3.5 h-3.5 text-[#FF5E3A] flex-shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Contextual sub-filters for the selected category */}
      {activeFacets.length > 0 && (
        <div
          className="space-y-4 rounded-xl p-3 -mx-0.5"
          style={{ background: "rgba(255,45,111,0.05)", border: "1px solid rgba(255,45,111,0.18)" }}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FFB366]">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Refine {CATEGORIES.find((c) => c.slug === selectedCat)?.shortLabel}
          </div>
          {activeFacets.map((facet) => (
            <div key={facet.key}>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/45 mb-2">{facet.label}</h4>
              <div className="flex flex-wrap gap-1.5">
                {facet.options.map((o) => {
                  const checked = subFilters[facet.key]?.has(o.value) || false
                  return (
                    <button
                      key={o.value}
                      onClick={() => toggleSub(facet.key, o.value)}
                      className="px-2.5 py-1.5 rounded-full text-[12px] font-medium transition-all"
                      style={{
                        background: checked ? "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${checked ? "transparent" : "rgba(255,255,255,0.12)"}`,
                        color: checked ? "#fff" : "rgba(255,255,255,0.72)",
                      }}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Price */}
      <div>
        <h3 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2">
          <DollarSign className="w-3.5 h-3.5 text-[#FF5E3A]" /> Price / 24h
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_RANGES.map((r, i) => {
            const active = priceIdx === i
            return (
              <button
                key={r.label}
                onClick={() => setPriceIdx(i)}
                className="px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all"
                style={{
                  background: active ? "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.10)"}`,
                  color: active ? "#fff" : "rgba(255,255,255,0.7)",
                }}
              >
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tier */}
      <div>
        <h3 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2">
          <Crown className="w-3.5 h-3.5 text-[#FF5E3A]" /> Package Tier
        </h3>
        <div className="grid grid-cols-2 gap-1.5">
          {TIER_OPTIONS.map((t) => {
            const checked = selectedTiers.has(t.value)
            const Icon = TIER_ICONS[t.value]
            return (
              <button
                key={t.value}
                onClick={() => toggleTier(t.value)}
                className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg transition-all"
                style={{
                  background: checked ? "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${checked ? "transparent" : "rgba(255,255,255,0.10)"}`,
                  color: checked ? "#fff" : "rgba(255,255,255,0.7)",
                }}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[12px] font-semibold">{t.label.replace(" Packages", "")}</span>
              </button>
            )
          })}
        </div>
      </div>

      {activeFilters > 0 && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-white/70 transition-all hover:text-white"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
        >
          <X className="w-4 h-4" />
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <section className="py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{
              background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
              border: "1px solid rgba(255,94,58,0.25)",
              color: "#FFB366",
            }}
          >
            <Package className="w-3.5 h-3.5" />
            Full Rental Catalog
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-balance leading-tight">
            Pro AV{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Equipment Rentals
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            LED video walls, sound systems, DJ setups, lighting and stage packages — everything for your
            next event, available across Los Angeles.
          </p>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { icon: Truck, text: "Free LA Delivery Over $5k" },
            { icon: Clock, text: "Same-Day Setup Available" },
            { icon: Shield, text: "Full Insurance Included" },
            { icon: Zap, text: "24/7 Technical Support" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-[13px] text-white/60">
              <Icon className="w-4 h-4 text-[#FF5E3A]" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div ref={topRef} className="flex gap-8 scroll-mt-24">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div
              className="sticky top-24 rounded-2xl p-4 overflow-y-auto shop-sidebar-scroll"
              style={{
                maxHeight: "calc(100vh - 7rem)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              {Sidebar}
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilters > 0 && (
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px]"
                    style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }}
                  >
                    {activeFilters}
                  </span>
                )}
              </button>

              <p className="hidden lg:block text-[14px] text-white/50">
                <span className="text-white font-bold">{filtered.length}</span> products
              </p>

              <div className="flex items-center gap-2">
                <span className="text-[12px] text-white/40 hidden sm:block">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="px-3 py-2.5 rounded-xl text-[13px] text-white outline-none cursor-pointer focus:ring-2 focus:ring-[#FF2D6F]/40"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <option value="featured" className="bg-[#0A0F1F]">Featured</option>
                  <option value="price-asc" className="bg-[#0A0F1F]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#0A0F1F]">Price: High to Low</option>
                  <option value="name" className="bg-[#0A0F1F]">Name A–Z</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-20 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Package className="w-10 h-10 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 mb-4">No products match your filters.</p>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }}
                >
                  <X className="w-4 h-4" /> Clear filters
                </button>
              </div>
            )}

            {/* Checkout CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/shop/checkout"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-[14px] uppercase tracking-wide transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                  boxShadow: "0 12px 36px -8px rgba(255,45,111,0.5)",
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                View Cart & Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileFiltersOpen(false)} />
          <div
            className="relative ml-auto w-[85%] max-w-sm h-full overflow-y-auto p-6"
            style={{ background: "#0A0F1F", borderLeft: "1px solid rgba(255,255,255,0.10)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            {Sidebar}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-8 py-3 rounded-xl text-white font-bold text-[14px]"
              style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }}
            >
              Show {filtered.length} products
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
