import { Icon3D, type Icon3DName } from "@/components/icon-3d"

/** Heading + copy + CTAs on the left, an "everything included" list on the right. */
export function ChecklistSplit({
  id,
  eyebrow,
  heading,
  lede,
  listTitle,
  items,
  cta,
}: {
  id?: string
  eyebrow: string
  heading: React.ReactNode
  lede: React.ReactNode
  listTitle: string
  items: { icon: Icon3DName; text: string }[]
  cta?: React.ReactNode
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="reveal-left">
          <span className="ds-pill mb-5">
            <span className="dot" />
            {eyebrow}
          </span>
          <h2 className="text-balance text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white md:text-[42px]">{heading}</h2>
          <div className="mt-5 max-w-[560px] space-y-4 text-pretty text-[17px] font-medium leading-[1.65] text-white/90 md:text-[18px]">{lede}</div>
          {cta && <div className="mt-8">{cta}</div>}
        </div>

        <div
          className="reveal-right rounded-[26px] border border-white/10 p-5 md:p-7"
          style={{ background: "linear-gradient(135deg, rgba(255,45,111,0.14), rgba(255,94,58,0.05) 60%, rgba(255,255,255,0.02))", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.14em] text-[#FFD24A]">{listTitle}</p>
          <ol className="space-y-2.5">
            {items.map((it, i) => (
              <li key={it.text} className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-2.5 pr-4">
                <Icon3D name={it.icon} size={44} className="shrink-0" />
                <span className="flex-1 text-[16px] font-bold leading-snug text-white md:text-[17px]">{it.text}</span>
                <span className="text-[13px] font-extrabold tabular-nums text-white/50">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
