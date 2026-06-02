"use client"

import { useEffect, useRef, useState } from "react"

interface ParticleConfig {
  left: number
  duration: number
  delay: number
  scale: number
  teal: boolean
}

export function BackgroundFX() {
  const orbAref = useRef<HTMLDivElement>(null)
  const orbBref = useRef<HTMLDivElement>(null)
  const orbCref = useRef<HTMLDivElement>(null)

  // Generate particles ONLY on the client (after hydration) — Math.random() must
  // never run during SSR or first client render, otherwise server/client HTML mismatches.
  const [particles, setParticles] = useState<ParticleConfig[]>([])

  useEffect(() => {
    const count = window.innerWidth < 768 ? 18 : 36
    const arr: ParticleConfig[] = []
    for (let i = 0; i < count; i++) {
      const dur = 12 + Math.random() * 18
      arr.push({
        left: Math.random() * 100,
        duration: dur,
        delay: -Math.random() * dur,
        scale: 0.6 + Math.random() * 1.6,
        teal: Math.random() > 0.7,
      })
    }
    setParticles(arr)
  }, [])

  useEffect(() => {
    let mx = 0
    let my = 0
    let tx = 0
    let ty = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 30
      my = (e.clientY / window.innerHeight - 0.5) * 30
    }

    const loop = () => {
      tx += (mx - tx) * 0.04
      ty += (my - ty) * 0.04
      const orbs = [orbAref.current, orbBref.current, orbCref.current]
      orbs.forEach((o, i) => {
        if (!o) return
        const f = (i + 1) * 0.5
        o.style.transform = `translate(${tx * f}px, ${ty * f}px)`
      })
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="bg-stage" aria-hidden />
      <div className="bg-rays" aria-hidden />
      <div className="bg-bauhaus" aria-hidden />
      <div ref={orbAref} className="bg-orb a" aria-hidden />
      <div ref={orbBref} className="bg-orb b" aria-hidden />
      <div ref={orbCref} className="bg-orb c" aria-hidden />
      <div className="bg-noise" aria-hidden />
      <div className="particles" aria-hidden suppressHydrationWarning>
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              transform: `scale(${p.scale})`,
              ...(p.teal
                ? { background: "#FFD24A", boxShadow: "0 0 6px #FFD24A" }
                : {}),
            }}
          />
        ))}
      </div>
    </>
  )
}
