import { Icon3D, type Icon3DName } from "@/components/icon-3d"

export type Step = { title: string; body: string; icon: Icon3DName }

/** Numbered process: a vertical timeline on phones, a 4-up card grid on desktop. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="reveal-stagger relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="fx-spot group relative flex gap-4 rounded-[22px] border border-white/10 p-4 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-[#FF2D6F]/35 sm:flex-col sm:gap-0 sm:p-6"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex shrink-0 items-start sm:mb-4 sm:items-center sm:justify-between">
            <span className="text-[34px] font-black leading-none tracking-[-0.03em] tabular-nums sm:text-[44px]">
              <span className="ds-accent-text">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <Icon3D name={s.icon} size={56} className="hidden drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:block" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[19px] font-extrabold leading-tight text-white">{s.title}</h3>
            <p className="mt-2 text-pretty text-[15.5px] leading-[1.6] text-white/90">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
