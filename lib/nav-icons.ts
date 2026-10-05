import type { Icon3DName } from "@/components/icon-3d"

/**
 * Navigation item → 3D icon. Keyed by label first (the Shop menu reuses hrefs),
 * then by href. Returns undefined when nothing fits, so callers can fall back.
 */
const BY_LABEL: Record<string, Icon3DName> = {
  "LED Video Walls": "led-wall",
  "Sound Systems": "speaker",
  "DJ Setups": "dj-deck",
  Lighting: "moving-head",
  "Stage & Production": "stage",
  "Pipe & Drape": "pipe-drape",
  "TVs & Displays": "tv-display",
  "Full Rental Catalog": "quote-cart",
  "Full AV Production": "sound-console",
  "LED Screen Rental": "led-wall",
  "Sound System Rental": "speaker",
  "Lighting Rental": "moving-head",
  "Stage Rental": "stage",
  "TV Rental": "tv-display",
  "Projector & Screen": "projector",
  "About Us": "award",
  Portfolio: "clapperboard",
  Locations: "location-pin",
  "All Locations": "location-pin",
  "Get a Quote": "clipboard",
}

const BY_HREF: [RegExp, Icon3DName][] = [
  [/led/, "led-wall"],
  [/sound|audio/, "speaker"],
  [/light/, "moving-head"],
  [/stage/, "stage"],
  [/drape/, "pipe-drape"],
  [/tv/, "tv-display"],
  [/projector/, "projector"],
  [/full-av|production/, "sound-console"],
  [/shop|cart/, "quote-cart"],
  [/portfolio|case/, "clapperboard"],
  [/location/, "location-pin"],
  [/about/, "award"],
  [/quote/, "clipboard"],
]

export function navIcon(label: string, href = ""): Icon3DName | undefined {
  if (BY_LABEL[label]) return BY_LABEL[label]
  for (const [re, name] of BY_HREF) if (re.test(href)) return name
  return undefined
}

/** Product-category slug → 3D icon. */
export const CATEGORY_ICON_3D: Record<string, Icon3DName> = {
  "led-screens": "led-wall",
  "dj-setups": "dj-deck",
  "sound-systems": "speaker",
  lighting: "moving-head",
  stage: "stage",
  "pipe-drape": "pipe-drape",
  tv: "tv-display",
}
