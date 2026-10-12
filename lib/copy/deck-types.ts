import type { Icon3DName } from "@/components/icon-3d"
import type { ProductCategory } from "@/lib/cart-context"
import type { PhotoKey, StudyKey } from "@/lib/copy/media"

/*
 * A copy-deck page as data: the ClickUp copy (verbatim) plus the media choices.
 * components/pages/deck-page.tsx renders it in the site design.
 *
 * Md = copy string with inline markup, rendered by rt():
 *   [text](/href)  → link (must be a route that exists on this site)
 *   ==text==       → key-sentence highlight (gold + underline), 1 per paragraph max
 *   **text**       → bold (where the deck has bold)
 */
export type Md = string

/** Section heading: eyebrow pill + H2, `accent` = substring of title in the gradient. */
export type Heading = { eyebrow: string; title: string; accent: string }

export type CallStripSpec = { title: string; subtitle: string }

export type DeckBlock =
  /** Google + G2 rating bar (deck: "Google and G2 logos with review count"). */
  | { type: "ratings" }
  /** Service / product cards with photo, 3D icon, H3 link, copy, "Learn more". */
  | (Heading & {
      type: "cards"
      id?: string
      lede?: Md
      cols?: 3 | 4
      ctaLabel?: string
      items: { title: string; href: string; image: string; icon: Icon3DName; body: Md; cta?: string }[]
      callStrip?: CallStripSpec
    })
  /** Event types / use cases as photo tiles (5, 6 or 10 items lay out as a bento). */
  | (Heading & {
      type: "bento"
      id?: string
      lede?: Md[]
      items: { title: string; image: string; body: Md }[]
      callStrip?: CallStripSpec
    })
  /** "Why us": sticky heading column + reason rows with 3D icons. */
  | (Heading & { type: "reasons"; id?: string; lede?: Md[]; items: { title: string; icon: Icon3DName; body: Md }[] })
  /** Heading + copy on the left, a numbered "what's included" list on the right. */
  | (Heading & {
      type: "checklist"
      id?: string
      lede: Md[]
      listTitle: string
      items: { icon: Icon3DName; text: string }[]
      /** Secondary button next to the yellow quote CTA (no href = opens the quote form). */
      secondary?: { label: string; href?: string }
    })
  /** Numbered process steps. */
  | (Heading & { type: "steps"; id?: string; lede?: Md; items: { title: string; body: string; icon: Icon3DName }[] })
  /** Long-form copy beside a photo. */
  | (Heading & {
      type: "prose"
      id?: string
      paragraphs: Md[]
      image: string
      imageAlt: string
      secondary?: { label: string; href?: string }
    })
  /** Event films (Mux) in an in-page player; optional event-type filter chips. */
  | (Heading & {
      type: "videos"
      id?: string
      lede?: Md
      studies: StudyKey[]
      filters?: { label: string; match: string }[]
      /** "" hides the button under the grid. */
      ctaLabel?: string
    })
  /** Swipeable real-event photo carousel. */
  | (Heading & { type: "photos"; id?: string; lede?: Md; photos: PhotoKey[] })
  /**
   * Products (required on every service page). `category` = one category with
   * facet chips; `categories` = tabs for just those (first = main). Omit both for
   * the full catalog. heading/lede override the default "ready to rent" header.
   */
  | { type: "products"; category?: ProductCategory; categories?: ProductCategory[]; heading?: Heading; lede?: Md }
  | (Partial<Heading> & { type: "team"; lede?: Md })
  /** Video testimonials; optional pull quote above. */
  | (Heading & { type: "testimonials"; lede?: Md; quote?: { quote: string; author: string; company: string } })
  /** Written reviews; optional pull quote above. */
  | (Heading & { type: "reviews"; lede?: Md; quote?: { quote: string; author: string; company: string } })
  | { type: "blog"; title?: string; accent?: string }
  | (Heading & { type: "faq"; items: { q: string; a: Md[] }[]; callStrip?: CallStripSpec })
  /** Stand-alone call strip ("Ready to discuss your event? … Click here to call"). */
  | { type: "callStrip"; title: string; subtitle: string }

export type Deck = {
  /** ClickUp page id, for traceability. */
  clickupId: string
  /** Site route this deck renders on (national page only). */
  path: string
  h1: string
  /** Phrase of the H1 shown in the gradient. */
  accent: string
  /** Small pill above the H1. */
  pill: string
  lede: Md
  bullets: { icon: Icon3DName; text: string }[]
  ctaLabel: string
  microcopy: string
  /** Hero secondary button: in-page anchor/route, the quote form (no href), or the portfolio. */
  secondary?: { label: string; href?: string } | "portfolio"
  stats: { value: string; label: string }[]
  /** Hero clips (public/videos/hero/<name>.mp4); defaults to clipsForPath(path). */
  clips?: string[]
  /** Show the client-logo strip in the first screen (default true). */
  logos?: boolean
  /** Service slug passed to the quote form. */
  quoteSlug?: string
  blocks: DeckBlock[]
}
