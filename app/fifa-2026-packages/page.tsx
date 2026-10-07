"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { CountUp } from "@/components/count-up"
import { ContactSpecialistBanner } from "@/components/contact-specialist-banner"

import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Trophy,
  MapPin,
  Users,
  Tv,
  Volume2,
  Lightbulb,
  Star,
  Calendar,
  Truck,
  Award,
  Settings,
  Building2,
  TreePine,
  Briefcase,
} from "lucide-react"
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact"

const packages = [
  {
    title: "Backyard Watch Party",
    icon: TreePine,
    description: "Perfect for home viewing parties with friends and family.",
    price: 799,
    features: ['85" Outdoor TV', "2.1 Sound System", "Delivery & Setup", "Same-day support"],
  },
  {
    title: "Bar & Restaurant Fan Zone",
    icon: Briefcase,
    description: "Turn your venue into the ultimate soccer destination.",
    price: 2499,
    features: ["Multi-Screen Setup", "Commercial Audio", "Live Feed Distribution", "On-site engineer"],
    featured: true,
  },
  {
    title: "Corporate Watch Party",
    icon: Building2,
    description: "Premium LED walls and immersive sound for team events.",
    price: 4999,
    features: ["LED Video Wall (P2.6)", "Line Array Sound", "Event Lighting", "Full crew"],
  },
  {
    title: "Outdoor Fan Festival",
    icon: Trophy,
    description: "Stadium-scale viewing for hundreds or thousands of fans.",
    price: 14999,
    features: ["Giant Outdoor LED", "Festival PA System", "Stage & Rigging", "24/7 production team"],
  },
]

const features = [
  { icon: Tv, title: "Big Screens & LED Walls", desc: 'From 85" TVs to massive outdoor LED — crystal clear visuals.' },
  { icon: Volume2, title: "Pro Sound Systems", desc: "Feel every goal with powerful, broadcast-grade audio." },
  { icon: Lightbulb, title: "Event Lighting", desc: "Team colours, ambient lighting, celebratory effects." },
  { icon: Users, title: "Full Tech Support", desc: "Crew handles setup, operation, and strike — every match." },
  { icon: MapPin, title: "Nationwide Coverage", desc: "Fast delivery coast-to-coast." },
  { icon: Star, title: "Premium Equipment", desc: "Professionally maintained gear, reliable performance." },
]

const hostCities = [
  "Los Angeles",
  "New York / NJ",
  "Miami",
  "Houston",
  "Dallas",
  "Seattle",
  "SF Bay Area",
  "Atlanta",
  "Boston",
  "Philadelphia",
  "Kansas City",
]

const howSteps = [
  { num: "01", title: "Discovery Call", desc: "Tell us about your venue, capacity and matches you want to cover." },
  { num: "02", title: "Custom Quote", desc: "Detailed proposal with transparent pricing & 3D render in 24 hrs." },
  { num: "03", title: "White-Glove Setup", desc: "Crew handles delivery, install, programming and rehearsal." },
  { num: "04", title: "Match Day", desc: "Dedicated technician on-site through every kickoff to final whistle." },
]

type FlagCode =
  | "usa"
  | "mex"
  | "can"
  | "arg"
  | "bra"
  | "fra"
  | "eng"
  | "ger"
  | "esp"
  | "por"
  | "zaf"
  | "par"
  | "mar"
  | "alg"
  | "cro"
  | "sen"
  | "kor"
  | "cze"
  | "aus"
  | "tur"
  | "bih"
  | "tbd"
  | "champ-a"
  | "champ-b"

// ISO 3166-1 alpha-2 codes for flagcdn.com; null = use gradient fallback
const flagIsoCodes: Record<FlagCode, string | null> = {
  usa: "us",
  mex: "mx",
  can: "ca",
  arg: "ar",
  bra: "br",
  fra: "fr",
  eng: "gb-eng",
  ger: "de",
  esp: "es",
  por: "pt",
  zaf: "za",
  par: "py",
  mar: "ma",
  alg: "dz",
  cro: "hr",
  sen: "sn",
  kor: "kr",
  cze: "cz",
  aus: "au",
  tur: "tr",
  bih: "ba",
  tbd: null,
  "champ-a": null,
  "champ-b": null,
}

const flagFallbackStyles: Partial<Record<FlagCode, React.CSSProperties>> = {
  tbd: { background: "linear-gradient(135deg, #6b7280, #4b5563)" },
  "champ-a": { background: "linear-gradient(135deg, #5BC25A, #E61D25)" },
  "champ-b": { background: "linear-gradient(135deg, #E61D25, #5BC25A)" },
}

interface Match {
  date: string
  round: string
  homeName: string
  homeFlag: FlagCode
  awayName: string
  awayFlag: FlagCode
  venue: string
  featured?: boolean
  final?: boolean
}

// Real FIFA World Cup 2026 fixtures (post-draw, December 2025).
// Six marquee matches selected for US watch-party demand.
const matches: Match[] = [
  {
    date: "JUN 11 · 8 PM ET",
    round: "Opener · Group A",
    homeName: "Mexico",
    homeFlag: "mex",
    awayName: "South Africa",
    awayFlag: "zaf",
    venue: "Estadio Azteca, Mexico City",
    featured: true,
  },
  {
    date: "JUN 12 · 5 PM PT",
    round: "Group D · USA Opener",
    homeName: "USA",
    homeFlag: "usa",
    awayName: "Paraguay",
    awayFlag: "par",
    venue: "SoFi Stadium, Inglewood",
  },
  {
    date: "JUN 13 · 4 PM ET",
    round: "Group · Marquee",
    homeName: "Brazil",
    homeFlag: "bra",
    awayName: "Morocco",
    awayFlag: "mar",
    venue: "MetLife Stadium, NJ",
  },
  {
    date: "JUN 16 · 9 PM ET",
    round: "Group · Marquee",
    homeName: "Argentina",
    homeFlag: "arg",
    awayName: "Algeria",
    awayFlag: "alg",
    venue: "Kansas City",
  },
  {
    date: "JUN 17 · 8 PM ET",
    round: "Group · Marquee",
    homeName: "England",
    homeFlag: "eng",
    awayName: "Croatia",
    awayFlag: "cro",
    venue: "AT&T Stadium, Arlington",
  },
  {
    date: "JUL 19 · 3 PM ET",
    round: "FINAL · MetLife",
    homeName: "Champion 1",
    homeFlag: "champ-a",
    awayName: "Champion 2",
    awayFlag: "champ-b",
    venue: "MetLife Stadium, NJ",
    featured: true,
    final: true,
  },
]

function Flag({ code }: { code: FlagCode }) {
  const iso = flagIsoCodes[code]
  if (iso) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://flagcdn.com/w40/${iso}.png`}
        alt=""
        aria-hidden
        width={40}
        height={21}
        className="w-10 h-auto rounded-[4px] flex-shrink-0"
        style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }}
      />
    )
  }
  return (
    <span
      className="w-10 h-[21px] rounded-[4px] flex-shrink-0"
      style={{
        ...(flagFallbackStyles[code] ?? { background: "#6b7280" }),
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
      }}
      aria-hidden
    />
  )
}

const faqs = [
  {
    q: "How early should I book?",
    a: "4–6 weeks before kickoff is ideal — match-day availability tightens fast.",
  },
  {
    q: "Do you handle the live feed?",
    a: "Yes. Licensed Fox / Telemundo distribution across multiple screens with synced audio.",
  },
  {
    q: "Outdoor setups in summer heat?",
    a: "All gear is IP-rated. Crew handles weather contingencies and weather-sealed cabling.",
  },
]

function CountdownPill() {
  const [t, setT] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const target = new Date("2026-06-11T20:00:00").getTime()
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const mins = Math.floor((diff / (1000 * 60)) % 60)
      const secs = Math.floor((diff / 1000) % 60)
      setT({ days, hours, mins, secs })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const cell = (val: number, label: string) => (
    <span
      className="rounded-md px-2 py-1 min-w-[42px] text-center font-mono font-bold text-[#5BC25A]"
      style={{ background: "rgba(255,210,74,0.10)", border: "1px solid rgba(255,210,74,0.20)" }}
    >
      <span className="block text-[13px] leading-none">{String(val).padStart(2, "0")}</span>
      <small className="block text-[8px] tracking-[0.16em] text-white/65 mt-0.5">{label}</small>
    </span>
  )

  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-[14px] mb-5 backdrop-blur-md"
      style={{
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,210,74,0.30)",
        boxShadow: "0 10px 30px -8px rgba(255,210,74,0.20)",
      }}
    >
      <b className="font-mono text-[12px] tracking-[0.14em] text-[#5BC25A]">KICKOFF IN</b>
      <div className="flex gap-1.5">
        {cell(t.days, "DAYS")}
        {cell(t.hours, "HRS")}
        {cell(t.mins, "MIN")}
        {cell(t.secs, "SEC")}
      </div>
    </div>
  )
}

export default function FIFA2026PackagesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const openQuote = () => {
    document.dispatchEvent(new CustomEvent("openQuoteForm"))
  }

  return (
    <div className="relative">
      {/* FIFA-themed FULL background — Mexican palette (green/blue/red), 20% darker than original */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden>
        {/* Solid base — deep navy with green/blue/red radial accents */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 85% 0%, rgba(60,172,59,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 0% 25%, rgba(42,57,141,0.36) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 110%, rgba(230,29,37,0.16) 0%, transparent 60%), linear-gradient(180deg, #060A18 0%, #0A0F1F 50%, #060A18 100%)",
          }}
        />
        {/* Bauhaus-style geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Crect x='0' y='0' width='100' height='100' fill='%233CAC3B'/%3E%3Ccircle cx='150' cy='50' r='40' fill='%23E61D25'/%3E%3Cpath d='M200 0 L300 0 L300 100 Z' fill='%232A398D'/%3E%3Crect x='0' y='200' width='80' height='80' fill='%23E61D25'/%3E%3Ccircle cx='320' cy='320' r='50' fill='%233CAC3B'/%3E%3Cpath d='M200 200 L300 300 L200 300 Z' fill='%232A398D'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "400px",
            maskImage: "radial-gradient(ellipse 100% 80% at 50% 50%, black 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 50%, black 0%, transparent 80%)",
          }}
        />
        {/* Subtle Mexican-green grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(60,172,59,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(60,172,59,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 100% 70% at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 100% 70% at 50% 50%, black 30%, transparent 80%)",
          }}
        />
        {/* Mexican tricolor orbs: green / blue / red */}
        <div
          className="absolute -top-[8%] -right-[10%] w-[540px] h-[540px] rounded-full opacity-[0.36]"
          style={{ background: "#3CAC3B", filter: "blur(110px)", animation: "fifaOrbA 24s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[8%] -left-[10%] w-[480px] h-[480px] rounded-full opacity-[0.44]"
          style={{ background: "#2A398D", filter: "blur(110px)", animation: "fifaOrbB 28s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/2 left-[45%] w-[380px] h-[380px] rounded-full opacity-[0.20]"
          style={{ background: "#E61D25", filter: "blur(110px)", animation: "fifaOrbC 30s ease-in-out infinite" }}
        />
        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Mexican tricolor stripe — green | red | blue (under the sticky header) */}
      <div
        className="relative z-[1] h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, #3CAC3B 0% 33.33%, #E61D25 33.33% 66.66%, #2A398D 66.66% 100%)",
        }}
        aria-hidden
      />

      {/* Hero */}
      <section className="relative pt-12 md:pt-16 pb-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            {/* LEFT */}
            <div>
              <CountdownPill />

              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full backdrop-blur-md text-[11px] font-bold tracking-[0.16em] uppercase"
                style={{
                  background: "rgba(60,172,59,0.14)",
                  border: "1px solid rgba(60,172,59,0.30)",
                  color: "#7ED77D",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#5BC25A] animate-pulse-ds"
                  style={{ boxShadow: "0 0 10px #5BC25A" }}
                />
                FIFA World Cup 2026 · USA · MEX · CAN
              </div>

              <h1 className="text-[48px] sm:text-[64px] lg:text-[88px] font-black tracking-[-0.035em] leading-[0.96] uppercase text-white mb-6">
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, #5BC25A 0%, #3CAC3B 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  World Cup
                </span>
                <span className="block text-white whitespace-nowrap">Watch Parties.</span>
                <span
                  className="block italic"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF3941 0%, #E61D25 60%, #3F4FB8 100%)",
                    backgroundSize: "220% 220%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "gradientShift 6s ease-in-out infinite",
                    paddingRight: "0.18em",
                  }}
                >
                  Done Right.
                </span>
              </h1>

              <p className="text-white/85 text-[17px] max-w-[560px] mb-8">
                Big screens, powerful sound, and complete production for watch parties, fan zones, and corporate events
                across Los Angeles. Sit back — we handle every kickoff.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={openQuote}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-white font-extrabold text-[14px] tracking-[0.04em] uppercase transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
                    boxShadow:
                      "0 12px 36px -8px rgba(255,45,111,0.6), inset 0 1px 0 rgba(255,255,255,0.30)",
                  }}
                >
                  Book Your Package
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/[0.05] border border-white/[0.14] backdrop-blur-md text-white font-bold text-[13px] uppercase tracking-[0.04em] transition-all hover:bg-white/[0.10]"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {["LED walls up to 800sqft", "Stadium-grade audio", "Live broadcast feed", "IP-rated outdoor gear"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.10] text-white/85 text-[12px] font-semibold"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5BC25A]" />
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* RIGHT — Premium fan-zone hero photo */}
            <div className="relative">
              <div
                className="relative rounded-[24px] overflow-hidden border border-white/[0.10]"
                style={{
                  aspectRatio: "4/4.4",
                  background: "linear-gradient(180deg, #0a0820 0%, #050310 100%)",
                  boxShadow:
                    "0 40px 80px -20px rgba(0,0,0,0.7), 0 0 80px -20px rgba(230,29,37,0.25)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/banners/fifa-watch-match.webp"
                  alt="Premium fan zone with audience watching a live football match on a massive LED wall"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Subtle bottom gradient for legibility */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent 45%, rgba(6,10,24,0.55) 100%)",
                  }}
                  aria-hidden
                />

                {/* live tag */}
                <div
                  className="absolute top-5 left-5 z-[4] flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-bold tracking-[0.14em] uppercase text-white backdrop-blur-md"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  Live · LED Wall
                </div>
              </div>

              {/* Floating cards */}
              <div
                className="hidden md:flex absolute top-[8%] -right-5 z-20 items-center gap-3 px-4 py-3 rounded-[14px] backdrop-blur-2xl animate-float-y"
                style={{
                  background: "rgba(10,8,32,0.85)",
                  border: "1px solid rgba(255,45,111,0.30)",
                  boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-[10px] grid place-items-center text-[#E61D25]"
                  style={{ background: "rgba(255,45,111,0.18)" }}
                >
                  <Trophy className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <b className="block text-[13px] font-bold text-white leading-tight">All 104 matches</b>
                  <span className="text-[11px] text-white/70">Group → Final</span>
                </div>
              </div>
              <div
                className="hidden md:flex absolute bottom-[12%] -left-5 z-20 items-center gap-3 px-4 py-3 rounded-[14px] backdrop-blur-2xl animate-float-y"
                style={{
                  animationDelay: "-2.5s",
                  background: "rgba(10,8,32,0.85)",
                  border: "1px solid rgba(255,45,111,0.30)",
                  boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-[10px] grid place-items-center text-[#E61D25]"
                  style={{ background: "rgba(255,45,111,0.18)" }}
                >
                  <Award className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <b className="block text-[13px] font-bold text-white leading-tight">SoFi Stadium · LA</b>
                  <span className="text-[11px] text-white/70">8 matches scheduled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat bar */}
          <div
            className="mt-14 grid grid-cols-2 lg:grid-cols-4 rounded-[18px] border border-white/[0.10] backdrop-blur-md overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            {[
              { end: 104, suffix: "", lbl: "Matches" },
              { end: 16, suffix: "", lbl: "Host Cities" },
              { end: 48, suffix: "", lbl: "Teams" },
              { end: 1986, suffix: "+", lbl: "Events Produced" },
            ].map((s, i, arr) => (
              <div
                key={s.lbl}
                className={`px-6 py-7 ${i !== arr.length - 1 ? "lg:border-r border-white/[0.08]" : ""} ${
                  i % 2 === 0 ? "border-r border-white/[0.08] lg:border-r" : ""
                } ${i < 2 ? "border-b border-white/[0.08] lg:border-b-0" : ""}`}
              >
                <div
                  className="text-[36px] font-black tracking-[-0.03em] leading-none"
                  style={{
                    background: "linear-gradient(135deg, #5BC25A 0%, #E61D25 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[11px] tracking-[0.10em] uppercase text-white/70 font-semibold">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <FifaPill>Watch Party Packages</FifaPill>
            <h2 className="mt-5 text-[34px] md:text-[48px] lg:text-[56px] font-black tracking-[-0.03em] leading-[1.18] uppercase text-white mb-4">
              Pick Your <FifaAccent>Format.</FifaAccent>
            </h2>
            <p className="text-white/80 text-[16px] md:text-[17px]">
              From intimate gatherings to massive fan festivals — we have the right package for your event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {packages.map((pkg) => {
              const Icon = pkg.icon
              const featured = pkg.featured
              return (
                <div
                  key={pkg.title}
                  className={`relative p-7 rounded-[22px] border backdrop-blur-2xl transition-all hover:-translate-y-1 ${
                    featured
                      ? "border-[#E61D25]/40"
                      : "border-white/[0.10]"
                  }`}
                  style={
                    featured
                      ? {
                          background:
                            "linear-gradient(160deg, rgba(255,45,111,0.10) 0%, rgba(255,210,74,0.04) 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.10), 0 30px 60px -16px rgba(255,45,111,0.30)",
                        }
                      : {
                          background:
                            "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 36px -12px rgba(0,0,0,0.4)",
                        }
                  }
                >
                  {featured && (
                    <span
                      className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-[10px] font-black tracking-[0.10em] text-[#050310]"
                      style={{ background: "#5BC25A" }}
                    >
                      MOST POPULAR
                    </span>
                  )}

                  <div
                    className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-5"
                    style={{
                      background: featured
                        ? "linear-gradient(135deg, #E61D25, #BF1119)"
                        : "rgba(255,45,111,0.14)",
                      color: featured ? "#fff" : "#E61D25",
                      border: featured ? "none" : "1px solid rgba(255,45,111,0.24)",
                    }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                  </div>

                  <div className="pb-5 mb-5 border-b border-dashed border-white/[0.10]">
                    <div className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-[#5BC25A] mb-2">
                      {pkg.title}
                    </div>
                    <p className="text-white/85 text-[13px]">{pkg.description}</p>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/85">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#E61D25]" strokeWidth={2.4} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[12px] text-white/65 mb-3">Starting at</div>
                  <div
                    className="text-[28px] font-extrabold tracking-[-0.02em] mb-4"
                    style={{
                      background: "linear-gradient(135deg, #5BC25A 0%, #E61D25 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ${pkg.price.toLocaleString()}
                    <span className="text-[13px] font-medium text-white/70"> /day</span>
                  </div>

                  <button
                    onClick={openQuote}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-[12px] tracking-[0.06em] uppercase transition-all ${
                      featured ? "text-white" : "text-white/85 hover:bg-white/[0.10]"
                    }`}
                    style={
                      featured
                        ? {
                            background: "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
                            boxShadow:
                              "0 10px 28px -6px rgba(255,45,111,0.5), inset 0 1px 0 rgba(255,255,255,0.30)",
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.14)",
                          }
                    }
                  >
                    Book Package
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Match Schedule — Book a screen for big-draw games */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <FifaPill>Big-Draw Matches</FifaPill>
            <h2 className="mt-5 text-[34px] md:text-[48px] lg:text-[56px] font-black tracking-[-0.03em] leading-[1.18] uppercase text-white mb-4">
              Book a Screen for the <FifaAccent>Marquee Games.</FifaAccent>
            </h2>
            <p className="text-white/80 text-[16px] md:text-[17px]">
              Reserve early — these dates sell out first. Multi-match bookings get our best rates.
            </p>
          </div>

          <div className="grid gap-3.5">
            {matches.map((m, i) => (
              <div
                key={i}
                className={`grid items-center gap-5 px-5 md:px-6 py-5 rounded-[16px] border backdrop-blur-md transition-all hover:-translate-y-0.5 ${
                  m.featured ? "" : "hover:border-[#E61D25]/22 hover:bg-[#E61D25]/[0.05]"
                }`}
                style={{
                  background: m.featured
                    ? "linear-gradient(90deg, rgba(60,172,59,0.08), rgba(230,29,37,0.06), rgba(42,57,141,0.08))"
                    : "rgba(255,255,255,0.04)",
                  border: m.featured
                    ? "1px solid rgba(230,29,37,0.30)"
                    : "1px solid rgba(255,255,255,0.08)",
                  gridTemplateColumns:
                    "minmax(140px, 160px) 1fr auto 1fr minmax(0, auto)",
                }}
              >
                {/* Date + round + venue */}
                <div className="font-mono text-[#5BC25A] font-bold text-[12px] tracking-[0.04em] leading-tight">
                  {m.date}
                  <b
                    className="block text-white text-[15px] md:text-[16px] tracking-[-0.01em] font-extrabold mt-1"
                    style={{ fontFamily: "Manrope, system-ui, sans-serif" }}
                  >
                    {m.round}
                  </b>
                  <span
                    className="block text-white/70 text-[10px] mt-1 leading-tight"
                    style={{ fontFamily: "Manrope, system-ui, sans-serif" }}
                  >
                    {m.venue}
                  </span>
                </div>

                {/* Home team */}
                <div className="flex items-center gap-3 text-[15px] md:text-[17px] font-bold text-white min-w-0">
                  <Flag code={m.homeFlag} />
                  <span className="truncate">{m.homeName}</span>
                </div>

                {/* VS */}
                <span
                  className="font-mono text-[12px] md:text-[14px] font-bold text-white/65 px-3 py-1.5 rounded-md"
                  style={{
                    background: "rgba(0,0,0,0.30)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  VS
                </span>

                {/* Away team */}
                <div className="flex items-center justify-end gap-3 text-[15px] md:text-[17px] font-bold text-white min-w-0">
                  <span className="truncate">{m.awayName}</span>
                  <Flag code={m.awayFlag} />
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={openQuote}
                  className="hidden md:inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] text-white text-[11px] font-extrabold tracking-[0.10em] uppercase transition-all hover:scale-105"
                  style={{
                    background: m.final
                      ? "linear-gradient(135deg, #E61D25, #2A398D)"
                      : "linear-gradient(135deg, #E61D25, #BF1119)",
                    boxShadow: "0 8px 20px -6px rgba(230,29,37,0.45)",
                  }}
                >
                  {m.final ? "Book Final" : "Reserve"}
                </button>
              </div>
            ))}
          </div>

          {/* Mobile reserve CTA — visible only on small screens since per-row CTA hides */}
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={openQuote}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-extrabold text-[13px] tracking-[0.04em] uppercase transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
                boxShadow:
                  "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.30)",
              }}
            >
              Reserve a Match
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <FifaPill>What We Provide</FifaPill>
            <h2 className="mt-5 text-[34px] md:text-[48px] lg:text-[56px] font-black tracking-[-0.03em] leading-[1.18] uppercase text-white mb-4">
              Everything for the <FifaAccent>Perfect Match.</FifaAccent>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-7 rounded-[18px] border border-white/[0.08] backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-4 text-[#E61D25]"
                  style={{
                    background: "rgba(255,45,111,0.14)",
                    border: "1px solid rgba(255,45,111,0.24)",
                  }}
                >
                  <f.icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <h3 className="text-[17px] font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/80 text-[13px] leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host Cities */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <FifaPill>2026 Host Cities</FifaPill>
            <h2 className="mt-5 text-[34px] md:text-[48px] lg:text-[56px] font-black tracking-[-0.03em] leading-[1.18] uppercase text-white mb-4">
              United States <FifaAccent>Hosts.</FifaAccent>
            </h2>
            <p className="text-white/80 text-[16px] md:text-[17px]">
              11 cities across the US will host matches. We&apos;re LA-based and ready coast-to-coast.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {hostCities.map((city) => {
              const isLA = city === "Los Angeles"
              return (
                <span
                  key={city}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                    isLA
                      ? "text-[#050310]"
                      : "text-white/85 border border-white/[0.10] bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.08]"
                  }`}
                  style={
                    isLA
                      ? {
                          background:
                            "linear-gradient(135deg, #5BC25A 0%, #BF1119 100%)",
                          boxShadow:
                            "0 8px 22px -6px rgba(255,210,74,0.45), inset 0 1px 0 rgba(255,255,255,0.30)",
                        }
                      : undefined
                  }
                >
                  {isLA && <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  {city}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <FifaPill>How It Works</FifaPill>
            <h2 className="mt-5 text-[34px] md:text-[48px] lg:text-[56px] font-black tracking-[-0.03em] leading-[1.18] uppercase text-white mb-4">
              From Call to <FifaAccent>Kickoff.</FifaAccent>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howSteps.map((s, idx) => (
              <div
                key={s.num}
                className="relative p-7 rounded-[18px] border border-white/[0.08] backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div
                  className="font-mono text-[56px] font-extrabold leading-none mb-5"
                  style={{
                    background: "linear-gradient(135deg, #E61D25 0%, #5BC25A 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.num}
                </div>
                <h3 className="text-[17px] font-extrabold text-white mb-2">{s.title}</h3>
                <p className="text-white/80 text-[13px] leading-[1.6]">{s.desc}</p>
                {idx < howSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-0.5 opacity-40"
                    style={{ background: "#E61D25" }}
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <FifaPill>FAQ</FifaPill>
            <h2 className="mt-5 text-[32px] md:text-[44px] font-black tracking-[-0.03em] leading-[1.18] uppercase text-white">
              Common <FifaAccent>Questions.</FifaAccent>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i
              return (
                <div
                  key={i}
                  className={`rounded-[14px] border backdrop-blur-md overflow-hidden transition-all ${
                    open ? "border-[#E61D25]/30" : "border-white/[0.08]"
                  }`}
                  style={{
                    background: open ? "rgba(255,45,111,0.04)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
                  >
                    <span className="text-white font-bold text-[15px]">{f.q}</span>
                    <span
                      className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                        open ? "rotate-45" : ""
                      }`}
                      style={{
                        background: open ? "#E61D25" : "rgba(255,45,111,0.14)",
                        color: open ? "#fff" : "#E61D25",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all"
                    style={{ maxHeight: open ? 200 : 0 }}
                  >
                    <p className="px-5 pb-5 text-white/80 text-[14px] leading-[1.6]">{f.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="relative px-6 md:px-12 py-14 md:py-20 rounded-[28px] border backdrop-blur-2xl text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,45,111,0.12) 0%, rgba(255,210,74,0.06) 100%)",
              border: "1px solid rgba(255,45,111,0.28)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), 0 40px 80px -20px rgba(255,45,111,0.30)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 30% 100%, rgba(255,45,111,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 70% 0%, rgba(255,210,74,0.14) 0%, transparent 70%)",
              }}
              aria-hidden
            />

            <div className="relative z-10">
              <Trophy
                className="w-14 h-14 mx-auto mb-5"
                style={{
                  color: "#5BC25A",
                  filter: "drop-shadow(0 0 24px rgba(255,210,74,0.55))",
                }}
              />
              <h2 className="text-[36px] md:text-[56px] lg:text-[64px] font-black tracking-[-0.035em] leading-[1.18] uppercase text-white mb-5">
                Ready for <FifaAccent>Kickoff?</FifaAccent>
              </h2>
              <p className="text-white/80 text-[16px] md:text-[17px] max-w-[540px] mx-auto mb-8">
                Get a custom quote with a 3D render of your event in 24 hours. No commitment, no upselling.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={openQuote}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-extrabold text-[14px] tracking-[0.04em] uppercase transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #E61D25 0%, #BF1119 100%)",
                    boxShadow:
                      "0 12px 36px -8px rgba(255,45,111,0.6), inset 0 1px 0 rgba(255,255,255,0.30)",
                  }}
                >
                  Start Your Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-[13px] uppercase tracking-[0.04em] backdrop-blur-md transition-all hover:bg-white/[0.10]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="text-white/65 text-[12px] mt-7 tracking-[0.04em]">
                Free consultation · No commitment · Response within hours
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSpecialistBanner
        variant="fifa"
        onStartQuote={() => document.dispatchEvent(new CustomEvent("openQuoteForm"))}
      />

      <style jsx global>{`
        @keyframes ballSpin {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-50%, calc(-50% - 6px)) rotate(180deg); }
        }
        @keyframes fifaRays { to { transform: rotate(360deg); } }
        @keyframes fifaOrbA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-90px, 60px) scale(1.1); }
        }
        @keyframes fifaOrbB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(80px, -50px) scale(1.15); }
        }
        @keyframes fifaOrbC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 80px) scale(0.85); }
        }
      `}</style>
    </div>
  )
}

function FifaPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md text-[11px] font-bold tracking-[0.16em] uppercase text-[#FF6B71]"
      style={{
        background: "rgba(255,45,111,0.14)",
        border: "1px solid rgba(255,45,111,0.32)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-[#E61D25] animate-pulse-ds"
        style={{ boxShadow: "0 0 10px #E61D25" }}
      />
      {children}
    </span>
  )
}

function FifaAccent({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="italic inline-block"
      style={{
        background: "linear-gradient(135deg, #E61D25 0%, #5BC25A 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        paddingRight: "0.18em",
        marginRight: "-0.04em",
        lineHeight: 1.18,
      }}
    >
      {children}
    </span>
  )
}
