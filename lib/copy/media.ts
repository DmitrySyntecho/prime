/* Shared media library for copy-deck pages: real Prime Line AV films (Mux) and
   event photos. Page configs reference these by key, so every page uses the
   same titles, thumbnails and captions. */

export type StudyKey = "tiktok" | "idb" | "lca" | "amagi" | "ramp" | "asianFlame" | "nike" | "youngFashion"

export const STUDY: Record<StudyKey, { title: string; location: string; category: string; mux: string; thumb: number }> = {
  tiktok: { title: "TikTok Shop Summit 2026", location: "Los Angeles Convention Center", category: "Conference", mux: "KfJ00XD74CFG01AI5eclQ58q439V3U004sBcuSENC2A9IU", thumb: 120 },
  idb: { title: "IDB Group Corporate Summit", location: "Intercontinental Miami", category: "Corporate", mux: "a1VM513vYaAw3u8rBfLB8bG4MMma2FbIFN2YGepuxiA", thumb: 60 },
  lca: { title: "Last Chance for Animals Gala", location: "Los Angeles", category: "Gala", mux: "02w1uQtRVTaeIYfYMvYnHvIFZbFF19lAyoDYU00M00fGHk", thumb: 81 },
  amagi: { title: "Amagi FAST Conference", location: "Los Angeles", category: "Conference", mux: "BrD9vKSat02duCjNodPZ00a02ZRc5QfKAno007TIKGF5vOU", thumb: 63 },
  ramp: { title: "Ramp Tailgate BTS", location: "Los Angeles", category: "Brand activation", mux: "xIFaCY1GdKzQxjtm01L87JqoPAKob3YBscDUzSiSF1300", thumb: 5 },
  asianFlame: { title: "Asian Flame BTS", location: "Los Angeles", category: "Gala", mux: "Io8Bi00jo3qftxjB01L1qWs7TPQuOhKBxfi02ecvwEl2X00", thumb: 15 },
  nike: { title: "Nike After Dark Tour", location: "Los Angeles", category: "Brand activation", mux: "iqYRqLK301aUIzbLxa9zMXyQ8FxOZIIGTgagNB02spvpY", thumb: 70 },
  youngFashion: { title: "Young Fashion Show BTS", location: "Los Angeles", category: "Fashion show", mux: "eMtzfn01vmRsGxIZ9SWpnmxiavJCupHsJfOV2K68M400E", thumb: 40 },
}

export type PhotoKey = keyof typeof PHOTO

/** Real event photos (public/images/case-studies) with honest captions. */
export const PHOTO = {
  "tiktok-1": { src: "/images/case-studies/tiktok-1.webp", caption: "Main stage presentation", event: "TikTok Shop Summit 2026", stage: "Showtime" },
  "tiktok-2": { src: "/images/case-studies/tiktok-2.webp", caption: "Stage setup with disco ball and lighting", event: "TikTok Shop Summit 2026", stage: "Showtime" },
  "tiktok-3": { src: "/images/case-studies/tiktok-3.webp", caption: "Exhibition floor", event: "TikTok Shop Summit 2026", stage: "Showtime" },
  "tiktok-4": { src: "/images/case-studies/tiktok-4.webp", caption: "Keynote on the main stage screens", event: "TikTok Shop Summit 2026", stage: "Showtime" },
  "tiktok-5": { src: "/images/case-studies/tiktok-5.webp", caption: "L-Acoustics speaker array setup", event: "TikTok Shop Summit 2026", stage: "Load-in" },
  "tiktok-6": { src: "/images/case-studies/tiktok-6.webp", caption: "Lighting console operator at work", event: "TikTok Shop Summit 2026", stage: "Showtime" },
  "miami-1": { src: "/images/case-studies/miami-1.webp", caption: "Main stage LED wall", event: "IDB Group Corporate Summit", stage: "Showtime" },
  "miami-2": { src: "/images/case-studies/miami-2.webp", caption: "Conference session with blue lighting", event: "IDB Group Corporate Summit", stage: "Showtime" },
  "miami-3": { src: "/images/case-studies/miami-3.webp", caption: "Panel discussion on stage", event: "IDB Group Corporate Summit", stage: "Showtime" },
  "miami-4": { src: "/images/case-studies/miami-4.webp", caption: "Testing the LED wall with the crew", event: "IDB Group Corporate Summit", stage: "Load-in" },
  "miami-5": { src: "/images/case-studies/miami-5.webp", caption: "Truss rigging and lighting setup", event: "IDB Group Corporate Summit", stage: "Load-in" },
  "miami-6": { src: "/images/case-studies/miami-6.webp", caption: "Moving head lights preparation", event: "IDB Group Corporate Summit", stage: "Load-in" },
  "lca-1": { src: "/images/case-studies/lca-1.webp", caption: "Live performance with colorful stage lighting", event: "Last Chance for Animals Gala", stage: "Showtime" },
  "lca-2": { src: "/images/case-studies/lca-2.webp", caption: "Crew installing the LED screen on truss", event: "Last Chance for Animals Gala", stage: "Load-in" },
  "lca-3": { src: "/images/case-studies/lca-3.webp", caption: "Outdoor gala dinner with band on stage", event: "Last Chance for Animals Gala", stage: "Showtime" },
  "lca-4": { src: "/images/case-studies/lca-4.webp", caption: "Main stage with a large video display", event: "Last Chance for Animals Gala", stage: "Showtime" },
  "lca-5": { src: "/images/case-studies/lca-5.webp", caption: "Guests watching outdoor LED content", event: "Last Chance for Animals Gala", stage: "Showtime" },
  "lca-6": { src: "/images/case-studies/lca-6.webp", caption: "Main stage facade at night with truss lighting", event: "Last Chance for Animals Gala", stage: "Showtime" },
  "amagi-1": { src: "/images/case-studies/amagi-1.webp", caption: "Breakout room with podium and displays", event: "Amagi FAST Conference", stage: "Showtime" },
  "amagi-2": { src: "/images/case-studies/amagi-2.webp", caption: "Keynote on the main stage with IMAG screens", event: "Amagi FAST Conference", stage: "Showtime" },
  "amagi-3": { src: "/images/case-studies/amagi-3.webp", caption: "Hanging LED panels on the truss", event: "Amagi FAST Conference", stage: "Load-in" },
  "amagi-4": { src: "/images/case-studies/amagi-4.webp", caption: "Live camera operation with multi-cam monitors", event: "Amagi FAST Conference", stage: "Showtime" },
  "amagi-5": { src: "/images/case-studies/amagi-5.webp", caption: "Main stage LED wall with gradient branding", event: "Amagi FAST Conference", stage: "Showtime" },
  "amagi-6": { src: "/images/case-studies/amagi-6.webp", caption: "Audio mixing console during a session", event: "Amagi FAST Conference", stage: "Showtime" },
  "ramp-1": { src: "/images/case-studies/ramp-1.webp", caption: "Activation setup behind the scenes", event: "Ramp Tailgate", stage: "Load-in" },
  "ramp-2": { src: "/images/case-studies/ramp-2.webp", caption: "Outdoor staging and rigging during the build", event: "Ramp Tailgate", stage: "Load-in" },
  "ramp-3": { src: "/images/case-studies/ramp-3.webp", caption: "Branded production area", event: "Ramp Tailgate", stage: "Showtime" },
  "ramp-4": { src: "/images/case-studies/ramp-4.webp", caption: "Lighting and audio gear around the event", event: "Ramp Tailgate", stage: "Showtime" },
  "ramp-5": { src: "/images/case-studies/ramp-5.webp", caption: "Crew capturing live footage", event: "Ramp Tailgate", stage: "Showtime" },
  "ramp-6": { src: "/images/case-studies/ramp-6.webp", caption: "Tailgate brand experience in full production", event: "Ramp Tailgate", stage: "Showtime" },
  "asian-flame-1": { src: "/images/case-studies/asian-flame-1.webp", caption: "Live band on stage with anniversary branding", event: "Asian Hall of Fame Gala", stage: "Showtime" },
  "asian-flame-2": { src: "/images/case-studies/asian-flame-2.webp", caption: "Ballroom LED wall behind the stage", event: "Asian Hall of Fame Gala", stage: "Showtime" },
  // Stage builds (public/images/services) — event names unknown, so the line reads "Prime Line AV build".
  "stage-01": { src: "/images/services/stage01.webp", caption: "Outdoor stage with a roof system and LED screen", event: "Prime Line AV build", stage: "Showtime" },
  "stage-02": { src: "/images/services/stage02.webp", caption: "Truss stage for a live band", event: "Prime Line AV build", stage: "Showtime" },
  "stage-03": { src: "/images/services/stage03.webp", caption: "Crew raising the truss over the deck", event: "Prime Line AV build", stage: "Load-in" },
  "stage-04": { src: "/images/services/stage04.webp", caption: "Outdoor festival stage in front of the crowd", event: "Prime Line AV build", stage: "Showtime" },
  "stage-06": { src: "/images/services/stage06.webp", caption: "Concert stage with lighting truss", event: "Prime Line AV build", stage: "Showtime" },
  "stage-07": { src: "/images/services/stage07.webp", caption: "Crew building an outdoor stage and backdrop", event: "Prime Line AV build", stage: "Load-in" },
  "stage-night": { src: "/images/services/stage-rental.webp", caption: "Stage and truss lit for the show", event: "Prime Line AV build", stage: "Showtime" },
  "staging-rigging": { src: "/images/services/staging-rigging.webp", caption: "Ballroom stage with full rigging", event: "Prime Line AV build", stage: "Showtime" },
} as const satisfies Record<string, { src: string; caption: string; event: string; stage: "Load-in" | "Showtime" }>
