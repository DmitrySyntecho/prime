import Image from "next/image"

export type BentoItem = { title: string; image: string; body: React.ReactNode }

// Column spans on the 6-col desktop grid, so rows read as a bento, not a uniform grid.
const LAYOUT: Record<number, number[]> = {
  5: [3, 3, 2, 2, 2],
  6: [4, 2, 2, 4, 3, 3],
  7: [3, 3, 2, 2, 2, 3, 3],
  8: [3, 3, 2, 2, 2, 2, 2, 2],
  10: [3, 3, 2, 2, 2, 2, 2, 2, 3, 3],
}
const SPAN: Record<number, string> = { 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4" }

/** Photo tiles with the title + copy over a dark fade. */
export function ImageBento({ items }: { items: BentoItem[] }) {
  const spans = LAYOUT[items.length] ?? items.map(() => 2)
  const many = items.length > 6
  // Small sets: every tile tall. Five: the first row tall. Long lists: compact tiles.
  const tall = (i: number) => (items.length === 5 ? i < 2 : !many)
  return (
    <div className="reveal-stagger grid gap-4 md:grid-cols-6 lg:gap-5">
      {items.map((it, i) => (
        <article
          key={it.title}
          className={`keep-original fx-spot group relative flex flex-col justify-end overflow-hidden rounded-[22px] border border-white/[0.08] transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-[#FF2D6F]/30 ${SPAN[spans[i]]} ${
            many ? "min-h-[290px] md:min-h-[340px]" : "min-h-[340px]"
          } ${tall(i) ? "md:min-h-[400px]" : ""}`}
        >
          <Image src={it.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03070a] via-[#03070a]/75 to-[#03070a]/10 transition-colors duration-500 group-hover:from-[#1a0614]" />
          <div className="relative p-5 md:p-6">
            <h3 className="mb-2 text-balance text-[20px] font-bold leading-tight tracking-[-0.01em] text-white md:text-[22px]">{it.title}</h3>
            {it.body ? <p className="text-pretty text-[15.5px] font-medium leading-[1.6] text-white/95">{it.body}</p> : null}
          </div>
        </article>
      ))}
    </div>
  )
}
