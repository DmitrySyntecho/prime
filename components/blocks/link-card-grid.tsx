import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Icon3D, type Icon3DName } from "@/components/icon-3d"

export type LinkCard = {
  title: string
  href: string
  image: string
  icon: Icon3DName
  body: React.ReactNode
}

/** Photo card + 3D icon tile + H3 link + copy + "Learn more", three across on desktop. */
export function LinkCardGrid({ items, ctaLabel = "Learn more", cols = 3 }: { items: LinkCard[]; ctaLabel?: string; cols?: 3 | 4 }) {
  return (
    <div className={`reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 ${cols === 4 ? "xl:grid-cols-4" : ""}`}>
      {items.map((s) => (
        <article
          key={s.title}
          className="keep-original fx-spot group relative flex flex-col overflow-hidden rounded-[22px] border border-[#FF2D6F]/20 bg-[#0a0a0a] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#FF2D6F]/45"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)" }}
        >
          <Link href={s.href} className="relative block aspect-[16/10] overflow-hidden" aria-label={s.title} tabIndex={-1}>
            <Image src={s.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
          </Link>
          <div className="relative flex flex-1 flex-col px-5 pb-6 sm:px-6">
            <div
              className="-mt-12 mb-3 grid h-[68px] w-[68px] place-items-center rounded-[18px] backdrop-blur-md"
              style={{ background: "radial-gradient(ellipse 80% 80% at 50% 30%, rgba(255,45,111,0.32), rgba(10,10,10,0.75) 75%)", border: "1px solid rgba(255,45,111,0.35)" }}
            >
              <Icon3D name={s.icon} size={58} className="drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105" />
            </div>
            <h3 className="mb-2 text-[20px] font-bold leading-tight tracking-[-0.01em] text-white">
              <Link href={s.href} className="transition-colors hover:text-[#FF2D6F]">
                {s.title}
              </Link>
            </h3>
            <p className="mb-5 flex-1 text-pretty text-[15.5px] leading-[1.65] text-white/90">{s.body}</p>
            <Link href={s.href} className="mt-auto inline-flex items-center gap-2 self-start text-[15px] font-bold text-[#FF2D6F] transition-[gap] hover:gap-3">
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
