// Lightweight ambient background: a static gradient stage, three GPU-composited
// color orbs (animated purely in CSS) and a noise layer. No JS, no listeners,
// no per-frame work — renders as a server component.
export function BackgroundFX() {
  return (
    <>
      <div className="bg-stage" aria-hidden />
      <div className="bg-orb a" aria-hidden />
      <div className="bg-orb b" aria-hidden />
      <div className="bg-orb c" aria-hidden />
      <div className="bg-noise" aria-hidden />
    </>
  )
}
