import type { Deck } from "@/lib/copy/deck-types"

/* ClickUp "Commercial Audio and Video Installation page - Prime Line AV" (8cr40gk-41837), verbatim.
   Deck links → site routes: /av-installations/video-installation/ → /av-installations/video-installation,
   /av-installations/audio-installation/ → /av-installations/audio-installation,
   /av-installations/video-wall-installation/ → /av-installations/led-wall-installation,
   /av-rental/ → /av-rental, /locations/ → /locations, /av-installations/ → /av-installations.
   Card hrefs without a deck link: Control systems and Venue and hospitality AV → /quote
   ("Get your custom quote", the deck's CTA label; no matching route).
   The deck has no trust strip on this page: the stats repeat the Home AV deck's strip.
   Block 06 has no eyebrow in the deck ("Why Prime Line AV" used). No quote-form slug exists for installations. */
export const commercialAudioVideoInstallation: Deck = {
  clickupId: "8cr40gk-41837",
  path: "/av-installations/commercial-audio-video-installation",
  h1: "Commercial AV Installation Service in the US",
  accent: "Commercial AV Installation",
  pill: "Offices · Retail · Restaurants · Venues",
  lede: "Prime Line AV provides commercial audio video installation nationwide, setting up ==permanent conference-room technology, workplace sound systems, customer-facing digital signage, and central AV controls.==",
  bullets: [
    { icon: "flight-case", text: "Turnkey installation, all the equipment and the full setup in one package" },
    { icon: "render-3d", text: "Free 3D render of your AV system design before anything is ordered" },
    { icon: "calendar", text: "Installation scheduled around your operating hours, so your business stays open while we work" },
    { icon: "clipboard", text: "Documentation and staff training included, so your team and your IT department run every room from day 1" },
  ],
  ctaLabel: "Get your custom quote",
  microcopy: "Quote in 30 minutes · No obligation",
  secondary: { label: "Book a site survey" },
  stats: [
    { value: "15+", label: "years AV experience" },
    { value: "2,500+", label: "events delivered" },
    { value: "500+", label: "brands trust us" },
    { value: "Nationwide", label: "service" },
  ],
  clips: ["full-av-production", "home-2"],
  blocks: [
    // Block 03
    {
      type: "checklist",
      id: "how-you-operate",
      eyebrow: "From the boardroom to the sales floor",
      title: "Commercial audio video installation built around how your business operates",
      accent: "how your business operates",
      lede: [
        "Prime Line AV provides full-service commercial audio video installation, including ==the design, engineering, installation and commissioning of fixed AV systems.== We provide AV for offices, retail stores, restaurants, and venues, whether it's one conference room or multiple branches.",
        "Not only that, you'll also get a dedicated project manager who will serve as your single point of contact from the first call to turnover. If you ever need technical assistance, you'll work with the same AV team that installed your system, because ==we provide full technical support for as long as your system is in service.==",
      ],
      listTitle: "What your commercial AV installation can include:",
      items: [
        { icon: "live-camera", text: "Commercial displays and video conferencing systems for boardrooms and meeting rooms" },
        { icon: "speaker", text: "Distributed audio systems with zoned speakers for background music and storewide paging" },
        { icon: "led-wall", text: "LED video walls and digital signage for lobbies, storefronts, menu boards and promotions" },
        { icon: "content-play", text: "Single-interface control systems programmed for every room" },
        { icon: "installation", text: "Structured cabling with every wire concealed and labeled for your IT team" },
        { icon: "clipboard", text: "As-built drawings, signal flow diagrams, rack elevations and O&M manuals included at turnover" },
      ],
      secondary: { label: "Tell us about your space" },
    },
    // Block 04
    {
      type: "cards",
      id: "services",
      eyebrow: "What we install",
      title: "What's included in our commercial AV installation service",
      accent: "commercial AV installation service",
      items: [
        {
          title: "Conference and meeting rooms",
          href: "/av-installations/video-installation",
          image: "/images/installations/video.webp",
          icon: "live-camera",
          body: "We fit boardrooms and huddle rooms with ==commercial displays, conferencing cameras, microphones, and presentation switching.== Our [video installation](/av-installations/video-installation) service covers every screen your office needs.",
        },
        {
          title: "Commercial audio",
          href: "/av-installations/audio-installation",
          image: "/images/installations/audio.webp",
          icon: "speaker",
          body: "We design speaker layouts for ==even coverage in every zone==, from quiet music over the sales floor to paging in the back of house. Our [audio installation](/av-installations/audio-installation) service provides full sound system design and setup.",
        },
        {
          title: "LED video walls and digital signage",
          href: "/av-installations/led-wall-installation",
          image: "/images/installations/video-wall.webp",
          icon: "led-wall",
          body: "We build LED walls and signage networks through our [video wall installation](/av-installations/led-wall-installation) service, ==from the display behind your reception desk to drive-by billboards.==",
        },
        {
          title: "Control systems",
          href: "/quote",
          cta: "Get your custom quote",
          image: "/images/generated/commercial-control-panel.webp",
          icon: "content-play",
          body: "We program each room to ==run from a single wall panel or touchscreen==, with presets for meetings, presentations, video calls and background audio.",
        },
        {
          title: "Venue and hospitality AV",
          href: "/quote",
          cta: "Get your custom quote",
          image: "/images/services/permanent-av-hero.webp",
          icon: "stage",
          body: "We install permanent AV for event halls, hospitality venues, houses of worship and arenas. We handle house sound systems, stage displays, video distribution and show control, ==built for daily service and sold-out nights.==",
        },
        {
          title: "Event AV rental",
          href: "/av-rental",
          image: "/images/services/permanent-av-1.webp",
          icon: "flight-case",
          body: "Need temporary gear for a company launch or meeting? Our [AV rental](/av-rental) service delivers sound, video, lighting, and staging, ==set up by our technicians, with operators available on request.==",
        },
      ],
    },
    {
      type: "products",
      categories: ["led-screens", "tv", "sound-systems"],
      heading: { eyebrow: "Need it for one event?", title: "Rent the same gear we install", accent: "the same gear" },
      lede: "LED walls, displays and sound systems from our own inventory are also available to rent for a single event: add what you need to your quote, and our team will confirm availability and ==send you an itemized price.==",
    },
    // Block 05
    {
      type: "steps",
      id: "process",
      eyebrow: "Our process",
      title: "How we install your commercial AV",
      accent: "your commercial AV",
      items: [
        { icon: "headset", title: "Request and consultation", body: "Send us a request and tell us about your business. Our project manager will review your current AV setup and what needs to be replaced or improved." },
        { icon: "clipboard", title: "Site survey and measurements", body: "Our team surveys your building and checks every room, measuring sightlines, acoustics, cable paths, and power." },
        { icon: "render-3d", title: "System design and quote", body: "Our engineers prepare the system design with a free 3D render and a custom estimate, scoped so you can bring it to whoever signs off on the budget." },
        { icon: "delivery-truck", title: "Prep and logistics", body: "We order the hardware and schedule the installation on dates and hours that keep your business open." },
        { icon: "installation", title: "Installation and commissioning", body: "Our installers mount the hardware, run the cabling, program the control system, and power up every system for final checks." },
        { icon: "shield", title: "Testing and sign-off", body: "We test each system with you in the room and fix anything on the spot. Our team will not leave until you approve how everything runs." },
        { icon: "award", title: "Documentation, training, warranty and turnover", body: "Lastly, we hand over the as-built records for your IT department, train your staff on every room, and back the work with a workmanship warranty." },
      ],
    },
    // Block 06
    {
      type: "reasons",
      id: "why-us",
      eyebrow: "Why Prime Line AV",
      title: "Why choose Prime Line AV for commercial AV installation",
      accent: "commercial AV installation",
      items: [
        { title: "Nationwide installation and support", icon: "location-pin", body: "We install and support commercial AV systems across the country, ==from single offices to businesses with multiple branches.== Check our [locations](/locations) to see where our teams work." },
        { title: "One accountable team, start to finish", icon: "walkie-talkie", body: "The team that designs your system is the team that installs and services it. Your facilities or IT manager gets ==one number to call for the life of the system==, with no handoffs between contractors." },
        { title: "Corporate AV is our specialty", icon: "award", body: "We've spent 15 years delivering AV for 2,500+ corporate events and 500+ brands. ==We bring that same workmanship into every permanent AV system we design.==" },
        { title: "Fully insured with COIs ready", icon: "shield", body: "Prime Line AV is a fully insured commercial audio video installation company. Your property manager gets ==every certificate required for building access== before we set foot on site." },
        { title: "Every AV installation under one roof", icon: "installation", body: "Commercial AV installation is part of what we do. Our [AV installation services](/av-installations) also include ==home theaters, whole-home audio, smart home systems, and residential video.==" },
      ],
    },
    // Block 07
    {
      type: "prose",
      id: "documented",
      eyebrow: "When no one documented your AV system, every fix starts from zero.",
      title: "We provide commercial AV installation that won’t leave your IT team guessing",
      accent: "won’t leave your IT team guessing",
      paragraphs: [
        "At Prime Line AV, ==we build every office AV installation to commercial engineering standards.== Our engineers select commercial-grade displays and speakers built for continuous daily use, then calibrate each system once it's installed. Inside your walls and ceilings, we run structured cabling, DSP audio processors, AV over IP, and HDBaseT distribution to move audio and video cleanly between rooms and floors.",
        "After the full installation, we provide you with complete documentation of your system, including ==wiring diagrams and equipment configurations your IT team can service from.== If you need a repair or an upgrade in the future, any technician can identify every cable and component straight from the records. Our technicians are also on call if you need additional support.",
        "We can install top commercial AV brands such as Samsung, LG, Sony, Crestron, Shure, JBL, Bose Professional, and more. If you have already purchased audio or video equipment, ==we can install it with the same workmanship warranty as all our projects.==",
        "If you own a business and don't know where to start with your audio visual installation, contact us at Prime Line AV, and ==our project manager will get you started.==",
      ],
      image: "/images/generated/commercial-av-rack.webp",
      imageAlt: "Commercial AV equipment rack with amplifiers, processors and neatly dressed cabling",
      secondary: { label: "Book a site survey" },
    },
    // Block 08
    { type: "testimonials", eyebrow: "Prime Line AV testimonials", title: "What clients say about our work", accent: "our work" },
    // Block 09
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Commercial AV installation FAQs",
      accent: "FAQs",
      items: [
        { q: "What is commercial audio video installation?", a: ["Commercial audio video installation is the permanent setup of sound, display, conferencing, and control systems in a business space. A commercial AV integrator like Prime Line AV mounts the displays, wires the speakers, programs the room controls, and calibrates everything, then trains your staff to run the finished system day-to-day."] },
        { q: "What spaces does commercial AV installation cover?", a: ["Commercial AV installation covers offices, meeting rooms, retail stores, restaurants, event venues, houses of worship, schools, arenas, and municipal buildings. Prime Line AV designs each system around how the space is used, from a speaker system over the sales floor to full video conferencing in the boardroom."] },
        { q: "What is the difference between commercial and residential AV installation?", a: ["Commercial AV installation uses equipment rated to run all day in offices, stores, and venues, while residential AV is built around home use. Prime Line AV installs both, and our commercial projects include the wiring, programming, and system records a business needs for long-term servicing."] },
        { q: "How much does commercial AV installation cost?", a: ["Commercial AV installation typically costs between $2,000 and $100,000+, depending on the size of your space, the number of rooms, the equipment you choose, and the scope of work. A single meeting room sits near the low end, while multi-room offices with video walls and control systems cost more. To get a free estimate, send us your project details and our project manager will give you a quote in as fast as 30 minutes."] },
        { q: "How long does commercial AV installation take?", a: ["Most commercial AV installations take between 1 and 10 days on site. A single conference room can be finished in a day, and the bigger the building and the more rooms involved, the longer the job takes. Equipment ordering adds lead time, so book your dates early."] },
        { q: "Does Prime Line AV install commercial AV nationwide?", a: ["Yes, Prime Line AV handles commercial audio video installations nationwide. Our teams install and support systems across the US, in any type of commercial building or venue, and you can check our locations page to see every area we serve."] },
        { q: "Can my business stay open during an AV installation?", a: ["Yes, in most projects your business stays open during a commercial AV installation. Prime Line AV schedules the work on dates and hours that suit your operation, and larger projects can be phased area by area so your space stays usable throughout."] },
        { q: "Can Prime Line AV upgrade an existing commercial AV system?", a: ["Yes, Prime Line AV can upgrade or replace an existing commercial AV system. We assess what you have, reuse the equipment and wiring that still serve you well, and replace what holds the system back, whether that’s a single meeting room or the whole building."] },
      ],
      callStrip: { title: "Still have more questions?", subtitle: "Ask us today!" },
    },
  ],
}
