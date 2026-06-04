import { Linkedin, ArrowUpRight } from "lucide-react"

interface Member {
  name: string
  role: string
  initials: string
}

// Placeholder team — swap for real members/photos later.
const TEAM: Member[] = [
  { name: "Egor Petrov", role: "Founder & Lead AV Producer", initials: "EP" },
  { name: "Marcus Lee", role: "Head of Production", initials: "ML" },
  { name: "Sofia Ramirez", role: "Lighting & LED Designer", initials: "SR" },
  { name: "Daniel Kim", role: "Audio Systems Engineer", initials: "DK" },
]

export function TeamSection({ heading = "Meet Our Team" }: { heading?: string }) {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{
              background: "linear-gradient(90deg, rgba(255,45,111,0.15) 0%, rgba(255,94,58,0.12) 100%)",
              border: "1px solid rgba(255,94,58,0.25)",
              color: "#FFB366",
            }}
          >
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            {heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {heading.split(" ").slice(-1)}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="group rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div
                className="w-20 h-20 mx-auto rounded-full grid place-items-center text-[22px] font-black text-white mb-4"
                style={{ background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }}
              >
                {m.initials}
              </div>
              <div className="text-[15px] font-bold text-white">{m.name}</div>
              <div className="text-[12px] text-white/45 mt-0.5">{m.role}</div>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/40 group-hover:text-[#FF5E3A] transition-colors">
                <Linkedin className="w-4 h-4" />
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
