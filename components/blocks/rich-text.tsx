import Link from "next/link"

export const RT_LINK =
  "font-semibold text-white underline decoration-[#FF2D6F]/60 decoration-2 underline-offset-4 transition-colors hover:decoration-[#FF2D6F]"

/**
 * Copy-deck inline markup → React: [text](/href) link, ==text== key-sentence
 * highlight (.hl), **text** bold. Keeps page copy as plain, reviewable strings.
 */
export function rt(s: string): React.ReactNode {
  const re = /\[([^\]]+)\]\(([^)]+)\)|==([^=]+)==|\*\*([^*]+)\*\*/g
  const out: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index))
    if (m[1]) {
      out.push(
        <Link key={m.index} href={m[2]} className={RT_LINK}>
          {m[1]}
        </Link>,
      )
    } else if (m[3]) {
      out.push(
        <span key={m.index} className="hl">
          {m[3]}
        </span>,
      )
    } else {
      out.push(
        <strong key={m.index} className="font-bold text-white">
          {m[4]}
        </strong>,
      )
    }
    last = m.index + m[0].length
  }
  if (last < s.length) out.push(s.slice(last))
  return out
}

/** Same string with the markup stripped (structured data, aria labels). */
export const plain = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/==([^=]+)==/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
