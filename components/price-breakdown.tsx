import { Icon3D, type Icon3DName } from "@/components/icon-3d"

export type BreakdownKind = "rental" | "delivery" | "setup" | "savings"

export type BreakdownRow = {
  kind: BreakdownKind
  label: string
  /** Small second line, e.g. "2 units × 3 days". */
  detail?: string
  amount: number
}

const ICON: Record<BreakdownKind, Icon3DName> = {
  rental: "rental-tag",
  delivery: "delivery-truck",
  setup: "setup-tools",
  savings: "savings",
}

const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

/**
 * Rental / Delivery / Setup / You save + Total, one 3D icon per row. Large type and
 * full-contrast colours: the audience reads prices on a phone. `tone="light"` is for
 * white .sheet panels, `tone="dark"` for the drawer and dark summary cards.
 */
export function PriceBreakdown({
  rows,
  total,
  tone = "dark",
  compact = false,
  className = "",
}: {
  rows: BreakdownRow[]
  total: number
  tone?: "dark" | "light"
  /** Tighter rows for the cart drawer footer. */
  compact?: boolean
  className?: string
}) {
  const light = tone === "light"
  const icon = compact ? 34 : 44
  return (
    <div className={className}>
      <ul className={compact ? "space-y-1.5" : "space-y-2"}>
        {rows.map((r) => {
          const save = r.kind === "savings"
          const ink = save ? (light ? "text-[#C8124F]" : "text-[#FF8FAE]") : light ? "text-[#120B1A]" : "text-white"
          return (
            <li
              key={r.kind}
              className={`flex items-center gap-3 rounded-2xl pl-2 pr-3.5 ${compact ? "py-1" : "py-2"} ${
                save ? (light ? "bg-[#FFE8F0]" : "bg-[#FF2D6F]/15") : light ? "bg-[#F5F1F8]" : "bg-white/[0.06]"
              }`}
            >
              <Icon3D name={ICON[r.kind]} size={icon} className="shrink-0" />
              <span className="min-w-0 flex-1">
                <span className={`block text-[16px] font-bold leading-tight ${ink}`}>{r.label}</span>
                {r.detail && <span className={`mt-0.5 block text-[13.5px] font-medium leading-tight ${light ? "text-[#5B5368]" : "text-white/80"}`}>{r.detail}</span>}
              </span>
              <span className={`shrink-0 text-[17px] font-extrabold tabular-nums ${ink}`}>
                {save ? "−" : ""}${fmt(r.amount)}
              </span>
            </li>
          )
        })}
      </ul>
      <div className={`mt-3 flex items-center gap-3 border-t pl-2 pr-3.5 pt-3 ${light ? "border-[#E9E2EE]" : "border-white/15"}`}>
        <Icon3D name="receipt" size={icon} className="shrink-0" />
        <span className={`flex-1 text-[18px] font-extrabold ${light ? "text-[#120B1A]" : "text-white"}`}>Total</span>
        <span className={`text-[26px] font-black tabular-nums tracking-[-0.01em] ${light ? "text-[#120B1A]" : "text-white"}`}>${fmt(total)}</span>
      </div>
    </div>
  )
}
