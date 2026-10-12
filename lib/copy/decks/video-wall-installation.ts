import type { Deck } from "@/lib/copy/deck-types"

/* ClickUp "Video Wall Installation page - Prime Line AV" (8cr40gk-39377), verbatim.
   Deck links → site routes: /av-rental/led-screen-rental/ → /av-rental/led-video-wall,
   /store/led-walls/ → /store/led-walls, /av-installations/commercial-audio-video-installation,
   /av-installations/video-installation and /av-installations as-is, /locations/ → /locations.
   Cards without a deck link point at the closest page: indoor/outdoor → the matching
   /store/led-walls category, digital signage → the content-management block on this page.
   Block 05 industries have no copy in the deck (bento tiles, title only). Eyebrows the
   deck leaves out (Blocks 03, 05, 07, 10) are plain section labels. */
export const videoWallInstallation: Deck = {
  clickupId: "8cr40gk-39377",
  path: "/av-installations/led-wall-installation",
  h1: "LED Video Wall Installation Service in the US",
  accent: "LED Video Wall Installation",
  pill: "Indoor · Outdoor · Digital signage",
  lede: "Prime Line AV provides video wall installation for offices, lobbies, retail spaces, and event venues nationwide, ==with turnkey setup and technical support.==",
  bullets: [
    { icon: "led-wall", text: "LED wall hardware and installation, with content management available by request" },
    { icon: "shield", text: "Insured installation crews with COIs issued for your building or venue" },
    { icon: "clipboard", text: "Documentation and staff training included with every install" },
    { icon: "render-3d", text: "Free 3D render of your video wall before you commit" },
  ],
  ctaLabel: "Get your custom quote",
  microcopy: "Quote in 30 minutes · No obligation",
  secondary: { label: "Request a consultation" },
  stats: [
    { value: "15+", label: "years AV experience" },
    { value: "2,500+", label: "events delivered" },
    { value: "500+", label: "brands trust us" },
    { value: "Nationwide", label: "service" },
  ],
  clips: ["led-screen-rental", "home-1"],
  blocks: [
    // Block 03
    {
      type: "checklist",
      id: "start-to-finish",
      eyebrow: "Design · install · support",
      title: "We don't just do video wall installation, we run your LED wall too",
      accent: "we run your LED wall too",
      lede: [
        "An LED video wall is a set of modular panels tiled together into one continuous display surface, built in nearly any shape or size. It's great for houses of worship, displaying lyrics and sermon video that reach every seat, as well as for schools and event venues with ever-changing content. LED walls are also popular with retail establishments, where they replace printed signage and standees with ==dynamic content you can update in minutes.==",
        "At Prime Line AV, we take care of your permanent video wall installation from start to finish. We map out the system, supply the panels, mount the structure, and commission the wall, anywhere in the US. Our engineers ==design every display around how people will view it==, from pixel pitch and mounting height to on-screen content.",
      ],
      listTitle: "Included in every installation:",
      items: [
        { icon: "clipboard", text: "Site survey and measurements" },
        { icon: "render-3d", text: "System design and a custom quote" },
        { icon: "delivery-truck", text: "Panel supply and delivery" },
        { icon: "installation", text: "Wall mounting and wiring" },
        { icon: "content-play", text: "Calibration and content playback setup" },
        { icon: "award", text: "Documentation and staff training" },
      ],
      secondary: { label: "Request a consultation" },
    },
    // Block 04
    {
      type: "cards",
      id: "solutions",
      eyebrow: "LED displays for the job you need them to do.",
      title: "Video wall solutions we install",
      accent: "Video wall solutions",
      items: [
        {
          title: "Indoor LED video walls",
          href: "/store/led-walls/indoor-led-walls",
          image: "/images/services/permanent-av.webp",
          icon: "led-wall",
          body: "We design and install indoor LED video walls for lobbies, boardrooms, retail floors, and broadcast studios. We have ==fine pixel pitch panels that remain sharp even at close viewing distances.==",
        },
        {
          title: "Outdoor LED displays",
          href: "/store/led-walls/outdoor-led-walls",
          image: "/images/generated/billboard-building.webp",
          icon: "led-outdoor",
          body: "We install weatherproof outdoor LED displays on building facades and venue exteriors. ==High-brightness panels hold a clear picture in direct sunlight==, from a storefront LED display board to a full-size billboard.",
        },
        {
          title: "Digital signage",
          href: "#content-management",
          image: "/images/services/tv-rental.webp",
          icon: "content-play",
          body: "We build video wall digital signage networks with a content management system, so ==your team schedules and updates every screen from one dashboard.== The setup works for a single display or a network across all your locations.",
        },
        {
          title: "LED wall rental",
          href: "/av-rental/led-video-wall",
          image: "/images/services/led-02.webp",
          icon: "rental-tag",
          body: "Need an LED wall for one event instead of a permanent install? Our [LED screen rental](/av-rental/led-video-wall) service covers ==delivery, setup, on-site technicians, and strike==, whether for a one-day or multi-day event.",
        },
        {
          title: "LED walls for purchase",
          href: "/store/led-walls",
          image: "/images/services/led-screen.webp",
          icon: "quote-cart",
          body: "Want to own your LED screen? You can [buy LED walls](/store/led-walls) directly from Prime Line AV, and ==we handle the installation for you as part of the same project.==",
        },
        {
          title: "Commercial AV systems",
          href: "/av-installations/commercial-audio-video-installation",
          image: "/images/services/permanent-av-2.webp",
          icon: "sound-console",
          body: "Need audio and control to go with your video wall? Our [commercial audio video installation](/av-installations/commercial-audio-video-installation) service installs everything else the room needs, ==from speakers and microphones to conferencing and control panels.==",
        },
      ],
    },
    {
      type: "products",
      category: "led-screens",
      heading: { eyebrow: "Need it for one event?", title: "Rent the same gear we install", accent: "the same gear" },
      lede: "Rent the same indoor and outdoor LED wall panels we install for a single event, and our team will confirm availability and ==send you an itemized price.==",
    },
    // Block 05
    {
      type: "bento",
      id: "industries",
      eyebrow: "Industries we serve",
      title: "We install video wall systems in any space",
      accent: "in any space",
      items: [
        { title: "Churches and houses of worship", image: "/images/generated/video-wall-church.webp", body: "" },
        { title: "Corporate lobbies", image: "/images/services/tv-rental-card.webp", body: "" },
        { title: "Billboards and outdoor advertising", image: "/images/services/led-04.webp", body: "" },
        { title: "Bars and restaurants", image: "/images/generated/video-wall-bar.webp", body: "" },
        { title: "Event venues", image: "/images/services/full-av-production.webp", body: "" },
        { title: "Schools and educational institutions", image: "/images/generated/video-wall-school.webp", body: "" },
        { title: "Retail stores and showrooms", image: "/images/generated/video-wall-retail.webp", body: "" },
        { title: "Corporate offices and conference centers", image: "/images/installations/video.webp", body: "" },
      ],
    },
    // Block 06
    {
      type: "steps",
      id: "process",
      eyebrow: "Our process",
      title: "How we install your permanent LED wall",
      accent: "permanent LED wall",
      items: [
        { icon: "headset", title: "Request and consultation", body: "Send us your project details through the form or give us a call. We talk through how you plan to use the video wall and the space it goes in." },
        { icon: "clipboard", title: "Site survey and measurements", body: "Our team visits your space to measure the install area and check viewing distances, power supply, mounting surfaces, and site access." },
        { icon: "render-3d", title: "System design and quote", body: "Our engineers prepare the design with a free 3D render of your video wall, plus a custom estimate for your approval. Nothing is ordered until you approve both." },
        { icon: "delivery-truck", title: "Prep and logistics", body: "We order your panels and plan the delivery, then book installation dates around your business hours." },
        { icon: "installation", title: "Installation and commissioning", body: "Our licensed installers mount the structure, cable every panel, connect the processors, and power up the wall for the first time." },
        { icon: "pixel-pitch", title: "Testing and handover", body: "We calibrate the picture and run your actual content with you in the room. Handover happens only after you confirm everything looks right." },
        { icon: "award", title: "Documentation and training", body: "Lastly, you receive the full system documentation, and we train your staff on how to run the LED wall. Every install also comes with warranty coverage." },
      ],
    },
    // Block 07
    {
      type: "reasons",
      id: "why-us",
      eyebrow: "Why Prime Line AV",
      title: "Why choose Prime Line AV for video wall installation",
      accent: "video wall installation",
      items: [
        { title: "Nationwide coverage", icon: "location-pin", body: "Our video wall installation service is available across the entire United States. If your business runs multiple branches or locations, Prime Line AV is ==the one vendor to trust with all your LED displays in every city.== Check our [locations](/locations) to see where we are available." },
        { title: "One accountable team", icon: "walkie-talkie", body: "The crew that surveys your space is the same crew that installs your wall, with no handoffs between subcontractors. After the installation, ==when you call for support, you reach the same people who installed it.==" },
        { title: "Tried and tested in 2,500+ events", icon: "award", body: "The same video wall systems we install permanently are also the systems we run at live events every month for more than 15 years. ==We know how these LED walls work on day 1 and day 1,000.==" },
        { title: "Every way to get an LED wall", icon: "rental-tag", body: "Prime Line AV is the one company where you can ==rent an LED wall for a single event and install one permanently when you are ready.== You'll get the same AV team working on your setup either way." },
        { title: "Insurance and COIs ready", icon: "shield", body: "We carry full insurance and issue certificates of insurance for your building management or venue before work starts. ==The compliance paperwork is handled for you from day one.==" },
      ],
    },
    // Block 08
    {
      type: "checklist",
      id: "content-management",
      eyebrow: "LED display + long-term content management in one team",
      title: "Content management built into every video wall system we install",
      accent: "Content management",
      lede: [
        "At Prime Line AV, we provide full-service LED wall installation and the content management that comes after. We format your media, build playlists, schedule the playback, and daypart the screen so it switches messages through the day. Our digital signage software also gives you ==remote access to every display from any device==, with real-time monitoring and scheduling built in. No time to manage your content? Our team can handle it for you too.",
        "Whether we manage the content or you do, ==the same dashboard keeps your video wall displays on brand and on schedule.== It runs 1 screen or 100, from a single lobby wall to LED wall panel systems for large-scale video displays spread across every branch you operate.",
        "They don't all have to be video walls, either. Our [video installation](/av-installations/video-installation) service covers single displays, conferencing screens, breakout room monitors, and wayfinding signage. For the full room, our [AV installations](/av-installations) team adds ==audio systems, lighting, conferencing, and control.==",
      ],
      listTitle: "Our content management service includes:",
      items: [
        { icon: "live-stream", text: "Remote access to every display from any device" },
        { icon: "calendar", text: "Drag-and-drop content scheduling by hour, day, zone, or location" },
        { icon: "content-play", text: "Custom playlists with scheduled playback" },
        { icon: "stopwatch", text: "Dayparting, so different content runs at different times of day" },
        { icon: "led-wall", text: "Split-screen layouts with video and text side by side" },
        { icon: "clapperboard", text: "Automated content loops that run unattended" },
        { icon: "shield", text: "Real-time monitoring with alerts when a display goes dark" },
        { icon: "clipboard", text: "Playback stats and uptime reports for every screen" },
      ],
      secondary: { label: "Request a consultation" },
    },
    // Block 09
    { type: "testimonials", eyebrow: "Prime Line AV client testimonials", title: "What clients say about our work", accent: "our work" },
    // Block 10
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "LED video wall installation FAQs",
      accent: "FAQs",
      items: [
        { q: "What is a digital signage video wall?", a: ["A digital signage video wall is a group of LED panels combined into one large screen that plays scheduled content, such as ads, menus, branding, and live data. A video wall installation company like Prime Line AV handles the mounting, wiring, processor configuration, and picture calibration, then trains your staff to update the content."] },
        { q: "What is the difference between indoor and outdoor LED walls?", a: ["Indoor LED walls use finer pixel pitches for close viewing distances and standard brightness levels. Outdoor LED walls are weatherproof, with high-brightness panels that stay visible in direct sunlight, sealed cabinets, reinforced mounting, and higher power capacity. Prime Line AV installs both LED wall types and matches the panel specification to your environment."] },
        { q: "What pixel pitch do I need for my video wall?", a: ["The right pixel pitch for your LED wall depends on how far viewers stand from it. A common rule is 1 millimeter of pitch for every 1 meter of viewing distance, so a lobby display viewed from 3 meters looks sharp at P3 or finer. To find the right pitch for your display, contact us at Prime Line AV for a consultation with one of our project managers."] },
        { q: "Should I rent an LED video wall or have one installed permanently?", a: ["Renting makes sense when you need an LED wall for one event, and a permanent installation pays off when you use the screen daily in a lobby, storefront, control room, or event venue. Prime Line AV offers both, plus panels for purchase, so you can start with the rental and move to a permanent install once you’re ready."] },
        { q: "How much does video wall installation cost?", a: ["An installed LED video wall costs between $15,000 and $150,000+, depending on panel area, pixel pitch, indoor or outdoor rating, and content system. To get a free estimate, send us your project details and the hardware you have in mind, and our project manager will give you a quote in as fast as 30 minutes."] },
        { q: "How long does video wall installation take?", a: ["Most indoor video wall installations take 2 to 5 days on site, while large or outdoor builds run longer. The bigger the screen and the more complex the mounting, the longer the job takes. Panel manufacturing and delivery usually add 2 to 6 weeks of lead time, so book your installation dates early."] },
      ],
      callStrip: { title: "Still have more questions?", subtitle: "Ask us today!" },
    },
  ],
}
