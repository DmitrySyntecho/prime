import { Star } from "lucide-react"

interface RatingSource {
  label: string
  rating: string
  reviews: string
  href: string
}

// Placeholder review counts/ratings — replace with real profile data later.
const SOURCES: RatingSource[] = [
  { label: "Google", rating: "4.9", reviews: "180+ reviews", href: "https://www.google.com/search?q=Prime+Line+AV" },
  { label: "G2", rating: "4.8", reviews: "95+ reviews", href: "https://www.g2.com" },
  { label: "Yelp", rating: "5.0", reviews: "60+ reviews", href: "https://www.yelp.com" },
]

/** Trust bar — block #3 across templates: platform ratings + review counts. */
export function RatingsBar() {
  return (
    <section className="py-10 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 rounded-2xl px-6 py-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/45">
            Trusted &amp; top-rated
          </span>
          {SOURCES.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 group"
            >
              {i > 0 && <span className="hidden md:block w-px h-6 bg-white/10 -ml-4 mr-4" />}
              <span className="text-[14px] font-bold text-white">{s.label}</span>
              <span className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} className="w-3.5 h-3.5 text-[#FFD24A]" fill="currentColor" />
                ))}
              </span>
              <span className="text-[14px] font-black text-white">{s.rating}</span>
              <span className="text-[12px] text-white/45 group-hover:text-white/70 transition-colors">
                {s.reviews}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
