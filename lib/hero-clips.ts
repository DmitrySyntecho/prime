/**
 * 10-second hero clips cut from the case-study films (Mux) — see
 * public/videos/hero/<name>.mp4 + <name>.webp poster. Each service gets the
 * footage that shows that service; other pages fall back to the home reel.
 */

export const HOME_CLIPS = ["home-1", "home-2", "home-3"]

const SERVICE_CLIPS: Record<string, string[]> = {
  "stage-rental": ["stage-rental"],
  "sound-system-rental": ["sound-system-rental"],
  "lighting-rental": ["lighting-rental"],
  "full-av-production": ["full-av-production"],
  "tv-rental": ["tv-rental"],
  "projector-screen-rental": ["projector-screen-rental"],
  "pipe-drape-rental": ["pipe-drape-rental"],
  "led-screen-rental": ["led-screen-rental"],
}

/** Service slug (city variants like "stage-rental-miami" included) → clips. */
export function clipsForService(slug: string): string[] {
  const key = Object.keys(SERVICE_CLIPS).find((k) => slug === k || slug.startsWith(`${k}-`))
  return key ? SERVICE_CLIPS[key] : HOME_CLIPS
}

/** Keyword match for the 5k SEO pages ("/miami/led-wall-rental", "/av-installations/…"). */
const PATH_RULES: [RegExp, string[]][] = [
  [/led|video-wall|billboard/, ["led-screen-rental", "home-1"]],
  [/stage|truss|platform/, ["stage-rental", "home-2"]],
  [/sound|audio|speaker|microphone|dj/, ["sound-system-rental", "home-3"]],
  [/light/, ["lighting-rental", "home-3"]],
  [/projector|screen/, ["projector-screen-rental", "home-2"]],
  [/tv|monitor|display/, ["tv-rental", "home-1"]],
  [/drape/, ["pipe-drape-rental", "home-2"]],
  [/stream|hybrid|broadcast/, ["home-3", "tv-rental"]],
  [/video-production|film/, ["lighting-rental", "home-1"]],
  [/installation/, ["full-av-production", "pipe-drape-rental"]],
  [/production|av-rental|event|conference|corporate/, ["full-av-production", "home-1"]],
]

export function clipsForPath(path: string): string[] {
  const p = path.toLowerCase()
  for (const [re, clips] of PATH_RULES) if (re.test(p)) return clips
  return HOME_CLIPS
}
