// Data for the 8 service detail pages linked from the homepage
// "End-to-End AV Production, Engineered for Impact" cards.
// Each card on the homepage maps to one entry here by slug.

export interface ServicePage {
  slug: string;
  /** H1 on the service page hero */
  h1: string;
  /** Short eyebrow shown above H1 */
  eyebrow: string;
  /** Sub-heading rendered under H1 */
  subheadline: string;
  /** Primary CTA label shown on the hero button */
  heroCta: string;
  /** Background image — same asset shown on the homepage card */
  image: string;
  /** Long-form description rendered in the second block */
  description: string;
  /** Headline of the second (description + CTA) block */
  descriptionHeading: string;
  /** 3–5 bullet points highlighting what's included */
  highlights: string[];
  /** CTA button label in the description block */
  ctaLabel: string;
  /** 4 photos shown as a collage on the right side of the second block */
  collage: string[];
  /** Two floating stat chips overlaid on the collage */
  collageStats: { value: string; label: string }[];
}

const BASE_PAGES: ServicePage[] = [
  {
    slug: "stage-rental",
    h1: "Stage Rental in Los Angeles",
    eyebrow: "Stage Rental",
    subheadline:
      "Portable, truss-built, or mobile — engineered, certified, and crewed.",
    heroCta: "Get a Quote",
    image: "/images/services/stage-rental-card.webp",
    descriptionHeading:
      "Stages built for the show — not borrowed from a warehouse",
    description:
      "Primeline designs and installs stages for corporate keynotes, concerts, fashion runways, and brand activations across Los Angeles. Every build is structurally engineered, ADA-compliant where required, and signed off before doors open.\n\nWe don't just drop platforms and leave. Our riggers and stagehands stay through rehearsal, show, and strike.",
    highlights: [
      "Portable stage decks from 4×8 ft modules — any footprint",
      "Truss-built stages with custom roofs, wings, and rigging points",
      "Mobile / hydraulic stages for outdoor and multi-city events",
      "Engineering drawings + certified rigging on request",
      "Senior stagehand and rigger on every install",
    ],
    ctaLabel: "Get a Quote",
    collage: [
      "/images/services/stage02.webp",
      "/images/services/stage01.webp",
      "/images/services/stage03.webp",
      "/images/services/stage04.webp",
      "/images/services/stage07.webp",
      "/images/services/stage06.webp",
    ],
    collageStats: [
      { value: "ETCP", label: "Certified Riggers" },
      { value: "ADA", label: "Compliant Builds" },
    ],
  },
  {
    slug: "sound-system-rental",
    h1: "Sound System Rental in Los Angeles",
    eyebrow: "Sound System Rental",
    subheadline: "L-Acoustics and d&b, tuned to your room. Same-day quote.",
    heroCta: "Get a Quote",
    image: "/images/services/sound-system-hero.webp",
    descriptionHeading: "Premium sound, sized to your room.",
    description:
      "Primeline provides L-Acoustics and d&b audio systems for events across Los Angeles — corporate keynotes, conferences, concerts, festivals, fashion shows, and brand activations. Every package is designed for the actual room (or field) you're in, with an A1 engineer at front of house and an A2 at monitor world.\n\nWe don't ship generic gear. We send the brand, configuration, and crew the spec sheet calls for.",
    highlights: [
      "L-Acoustics K2 / Kara / Kiva line arrays in stock",
      "d&b audiotechnik systems available",
      "Wireless mic systems (Shure Axient, Sennheiser) for keynotes and panels",
      "DiGiCo and Yamaha consoles, A1 + A2 on every show",
      "Rider-compliant. Backup gear standard.",
    ],
    ctaLabel: "Get a Quote",
    collage: [
      "/images/services/sound06.webp",
      "/images/services/sound05.webp",
      "/images/services/sound04.webp",
      "/images/services/sound03.webp",
      "/images/services/sound07.webp",
      "/images/services/sound02.webp",
    ],
    collageStats: [
      { value: "L-Acoustics", label: "In Stock" },
      { value: "A1 + A2", label: "Every Show" },
    ],
  },
  {
    slug: "lighting-rental",
    h1: "Lighting Equipment Rental in Los Angeles",
    eyebrow: "Lighting Equipment Rental",
    subheadline:
      "Designed, pre-vis'd, and programmed. Senior LD on every event.",
    heroCta: "Get a Quote",
    image: "/images/services/lighting-rental-card.webp",
    descriptionHeading:
      "Lighting designed for your show — not pulled off a shelf.",
    description:
      "Primeline supplies and programs lighting for corporate events, weddings, concerts, and festivals across Los Angeles. Every job starts with our in-house lighting designer building the look — color palette, fixture plot, cue list, and pre-vis — before a single truss hits the deck.\n\nWe use top-tier fixtures and consoles the industry actually runs on, with a senior LD at the board from rehearsal through show.",
    highlights: [
      "In-house LD designs the look — pre-vis renderings before you commit",
      "Moving heads, washes, spots, beams — Robe, Martin, Clay Paky in stock",
      "GrandMA3 and Hog 4 consoles, programmed by senior LDs",
      "Haze, atmospherics, follow spots, and dimmer racks available",
      "Show file delivered, backup gear standard, senior LD on-site",
    ],
    ctaLabel: "Get a Quote",
    collage: [
      "/images/services/lighting-col-1.webp",
      "/images/services/lighting-col-2.webp",
      "/images/services/lighting-col-3.webp",
      "/images/services/lighting-col-4.webp",
      "/images/services/lighting-col-5.webp",
      "/images/services/lighting-col-6.webp",
    ],
    collageStats: [
      { value: "GrandMA3", label: "Programmed Live" },
      { value: "500+", label: "Fixtures In Stock" },
    ],
  },
  {
    slug: "full-av-production",
    h1: "Full AV Production in Los Angeles",
    eyebrow: "Full AV Production",
    subheadline:
      "One team. One contract. One producer. From pre-vis to strike.",
    heroCta: "Get a Quote",
    image: "/images/services/full-av-card.webp",
    descriptionHeading: "A production partner, not a rental house.",
    description:
      "Primeline produces full AV for corporate events, conferences, brand activations, speaking events, and experiential marketing across Los Angeles. Sound, lighting, video, LED, stage, crew, pre-vis, and on-site management — one team, one bill, one accountable producer from kickoff to strike.\n\nWhen the CEO walks on stage, the keynote runs clean, the brand colors match, and the room sounds like the brand sounds.",
    highlights: [
      "End-to-end production — sound, lighting, video, LED, stage, crew",
      "Pre-vis, run-of-show, and tech rehearsals before doors",
      "Single point of contact — one producer owns the event",
      "Brand-safe execution: color, logo, stage, and exec coaching",
      "Transparent pricing, line-item quotes, no surprise fees",
    ],
    ctaLabel: "Get a Quote",
    collage: [
      "/images/services/av-01.webp",
      "/images/services/av-02.webp",
      "/images/services/av-03.webp",
      "/images/services/av-06.webp",
      "/images/services/av-05.webp",
      "/images/services/av-07.webp",
    ],
    collageStats: [
      { value: "1,986+", label: "Events Delivered" },
      { value: "24/7", label: "Crew On-Call" },
    ],
  },
  {
    slug: "tv-rental",
    h1: "TV Rental in Los Angeles",
    eyebrow: "TV Rental",
    subheadline:
      'Confidence monitors to video walls — 32" to 98", indoor and outdoor.',
    heroCta: "Get a Quote",
    image: "/images/services/tv-rental-card.webp",
    descriptionHeading:
      "TVs for every event — from a single confidence monitor to a multi-screen wall.",
    description:
      "Primeline supplies commercial-grade TVs across Los Angeles for corporate events, conferences, trade shows, brand activations, broadcast sets, and outdoor events. Single screens or full video walls. Portrait or landscape. Same content across every screen — or independent feeds on each one.\n\nEvery TV ships with the right mount, the right cable run, and an on-site tech who actually understands signal flow.",
    highlights: [
      '32" to 98" commercial displays in stock',
      "Indoor and outdoor (sunlight-readable) screens",
      "Portrait or landscape mounting — floor stands, wall mounts, truss mounts",
      "Multi-screen sync — same content or independent feeds per panel",
      "HDMI, SDI, NDI inputs and live streaming supported",
      "On-site video tech included",
    ],
    ctaLabel: "Get a Quote",
    collage: [
      "/images/services/tv-01.webp",
      "/images/services/tv-02.webp",
      "/images/services/tv-03.webp",
      "/images/services/tv-04.webp",
      "/images/services/tv-05.webp",
      "/images/case-studies/miami-3.webp",
    ],
    collageStats: [
      { value: '32"–98"', label: "Display Range" },
      { value: "Indoor + Outdoor", label: "Screens Available" },
    ],
  },
  {
    slug: "projector-screen-rental",
    h1: "Projector and Screen Rental in Los Angeles",
    eyebrow: "Projector & Screen Rental",
    subheadline:
      "Boardroom to ballroom — plus projection mapping when the room is the canvas.",
    heroCta: "Get a Quote",
    image: "/images/services/projector-screen.webp",
    descriptionHeading: "Projection sized to your room — and your idea.",
    description:
      "Primeline supplies projectors and screens for corporate keynotes, conferences, brand activations, weddings, and outdoor events across Los Angeles — from a 6 ft conference-room screen to a 40 ft ballroom fast-fold, with the right projector brightness for the ambient light in the room.\n\nAnd when the room itself is the canvas — a wall, a façade, a stage build, a product — we design, produce, and program full projection mapping.",
    highlights: [
      "Fast-fold screens from 6 ft to 40+ ft, front or rear projection",
      "Projectors from 5,000 to 30,000+ lumens — matched to your room",
      "4K and laser projectors available",
      "Edge blending and multi-projector setups",
      "Projection mapping — design, content production, and programming",
      "Senior video tech on every install",
    ],
    ctaLabel: "Get a Quote",
    collage: [
      "/images/services/proj-03.webp",
      "/images/services/proj-02.webp",
      "/images/services/proj-01.webp",
      "/images/services/proj-06.webp",
      "/images/services/proj-05.webp",
      "/images/services/proj-04.webp",
    ],
    collageStats: [
      { value: "30,000+", label: "Lumens Available" },
      { value: "4K Laser", label: "Projectors in Stock" },
    ],
  },
  {
    slug: "pipe-drape-rental",
    h1: "Pipe and Drape Rental in Los Angeles",
    eyebrow: "Pipe & Drape Rental",
    subheadline:
      "IFR-certified drape, any height and color, installed by our crew.",
    heroCta: "Get a Quote",
    image: "/images/services/pipe-drape-card.webp",
    descriptionHeading: "Pipe and drape, supplied and installed across LA.",
    description:
      "Primeline supplies pipe and drape for film studios, broadcast sets, trade show booths, AV builds, conferences, and live events across Los Angeles. Every drape kit is IFR-certified (inherently flame retardant) and code-compliant for the venues that ask — and they all should.\n\nWe don't drop pipe and walk. Our crew measures, installs, dresses, and strikes.",
    highlights: [
      "IFR-certified drape — all colors and weights",
      "Heights from 3 ft up to 23+ ft for stage masking and full-room walls",
      "Banjo, poly premier, and velour weights in stock",
      "Black, white, ivory, navy, red, gold and custom colors on request",
      "Engineered bases for high-traffic and outdoor builds",
    ],
    ctaLabel: "Get a Quote",
    collage: [
      "/images/services/drape-01.webp",
      "/images/services/drape-02.webp",
      "/images/services/drape-03.webp",
      "/images/services/drape-04.webp",
      "/images/services/drape-05.webp",
      "/images/about/brands-trust-1.webp",
    ],
    collageStats: [
      { value: "IFR", label: "Certified Drape" },
      { value: "3–23+ ft", label: "Height Range" },
    ],
  },
  {
    slug: "led-screen-rental",
    h1: "LED Screen Rental in Los Angeles",
    eyebrow: "LED Screen Rental",
    subheadline:
      "Indoor, outdoor, mobile — same-day quote, senior crew on every job.",
    heroCta: "Get a Quote",
    image: "/images/services/led-screen-card.webp",
    descriptionHeading:
      "Indoor and outdoor LED walls for any event in Los Angeles",
    description:
      "Primeline supplies and operates LED walls across LA — from intimate corporate stages to outdoor brand activations and festival main screens. We own the inventory, we send the crew, and we run the show file. No subletting, no day-laborers, no surprises on site.\n\nEvery install includes pre-vis, backup gear, and an on-site tech from load-in through strike.",
    highlights: [
      "High-resolution panels — P1.9, P2.6, P3.9 and P6.7 pixel pitches in stock",
      "Indoor, outdoor (IP-rated), and curved / custom configurations",
      "Processors, switchers, and signal redundancy included",
      "Senior LED tech and rigger on every job",
      "Same-day quote, transparent line-item pricing",
    ],
    ctaLabel: "Get a Quote",
    collage: [
      "/images/services/led-01.webp",
      "/images/services/led-02.webp",
      "/images/services/led-03.webp",
      "/images/services/led-04.webp",
      "/images/case-studies/tiktok-4.webp",
      "/images/case-studies/miami-1.webp",
    ],
    collageStats: [
      { value: "P1.9 → P6.7", label: "LED Pitch Range" },
      { value: "Indoor + Outdoor", label: "IP-Rated Available" },
    ],
  },
];

export function applyCity(text: string, city: string): string {
  return text
    .replace(/Los Angeles/g, city)
    .replace(/\bin LA\b/g, `in ${city}`)
    .replace(/\bacross LA\b/g, `across ${city}`)
}

function cityVariant(base: ServicePage, city: string, citySlug: string): ServicePage {
  return {
    ...base,
    slug: `${base.slug}-${citySlug}`,
    h1: applyCity(base.h1, city),
    subheadline: applyCity(base.subheadline, city),
    description: applyCity(base.description, city),
    descriptionHeading: applyCity(base.descriptionHeading, city),
    highlights: base.highlights.map((h) => applyCity(h, city)),
  }
}

export const SERVICE_PAGES: ServicePage[] = [
  ...BASE_PAGES,
  ...BASE_PAGES.map((s) => cityVariant(s, "Miami", "miami")),
  ...BASE_PAGES.map((s) => cityVariant(s, "Orlando", "orlando")),
]

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
