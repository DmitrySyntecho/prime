import type { Deck } from "@/lib/copy/deck-types"

/* ClickUp "Corporate video production page - Prime Line AV" (8cr40gk-36397), verbatim.
   Deck links → site routes: /event-video-production → /event-video-production,
   /live-streaming-production → /live-streaming-production, /cases → /portfolio, /locations → /locations.
   Cards the deck doesn't link: Brand & Promotional Video → /film-production; Training, Testimonial and
   Product cards → /quote ("Get a quote"). Eyebrows the deck doesn't give are labels only.
   Not representable: the "Get your custom quote / View event portfolio" button pairs after
   blocks 04, 05 and 07, and the block 06 eyebrow ("Ready to plan your corporate video?"). */
export const corporateVideoProduction: Deck = {
  clickupId: "8cr40gk-36397",
  path: "/corporate-video-production",
  h1: "Corporate Video Production Service in the USA",
  accent: "Corporate Video Production",
  pill: "Brand · Training · Interviews · Events",
  lede: "Prime Line AV provides corporate video production for businesses nationwide, from brand videos to ==multi-camera event capture and live streaming.==",
  bullets: [
    { icon: "live-camera", text: "Multi-camera filming with live switching by our on-site crew" },
    { icon: "clapperboard", text: "Event highlights and full session recordings from conferences and launches" },
    { icon: "live-stream", text: "Live streaming for viewers who cannot attend in person" },
    { icon: "flight-case", text: "Lighting, sound, staging and LED walls under one contract for full production" },
  ],
  ctaLabel: "Get your custom quote",
  microcopy: "Quote in 30 minutes · No obligation",
  secondary: "portfolio",
  stats: [
    { value: "15+", label: "years of AV experience" },
    { value: "2,500+", label: "events delivered" },
    { value: "500+", label: "brands trust us" },
    { value: "Nationwide", label: "service" },
  ],
  blocks: [
    { type: "ratings" },
    {
      type: "cards",
      id: "video-services",
      ctaPair: "portfolio",
      eyebrow: "What we film",
      title: "Corporate video production services backed by a full AV crew",
      accent: "backed by a full AV crew",
      lede: "Corporate video production is the filming and delivery of video that a business uses, from promotional and training content to coverage of its own events. At Prime Line AV, we handle planned business video and live event capture, with ==multi-camera production available when the program is happening in real time.==",
      items: [
        {
          title: "Brand & Promotional Video",
          href: "/film-production",
          image: "/images/events/film-production.webp",
          icon: "clapperboard",
          body: "A brand video introduces your company to customers before anyone reads a word about you. Tell us what you want the video to say about your business, and ==we plan the shoot to match.==",
        },
        {
          title: "Training & Internal Video",
          href: "/quote",
          cta: "Get a quote",
          image: "/images/services/sound07.webp",
          icon: "content-play",
          body: "New hires learn faster when they can watch the job being done. We film ==onboarding sessions and internal announcements your team can rewatch any time.==",
        },
        {
          title: "Testimonial & Interview Video",
          href: "/quote",
          cta: "Get a quote",
          image: "/images/case-studies/ramp-1.webp",
          icon: "microphone",
          body: "We handle the lighting and the sound on set, so the person on camera looks and sounds clear. ==That clarity is what makes a testimonial convincing== to the audience you filmed it for.",
        },
        {
          title: "Event Video Production",
          href: "/event-video-production",
          image: "/images/case-studies/amagi-4.webp",
          icon: "live-camera",
          body: "A conference happens once, and the footage has to be right the first time. Our [event video production](/event-video-production) crew films the full program with multiple cameras and ==delivers coverage you can reuse for years.==",
        },
        {
          title: "Live Streaming Production",
          href: "/live-streaming-production",
          image: "/images/events/hybrid-events.webp",
          icon: "live-stream",
          body: "Part of your audience will watch from a screen instead of a seat. ==We can stream your event live while the cameras roll==, on the platform you choose. See how our [live streaming production](/live-streaming-production) works to learn more.",
        },
        {
          title: "Product & Demo Video",
          href: "/quote",
          cta: "Get a quote",
          image: "/images/events/experiential-marketing.webp",
          icon: "render-3d",
          body: "A product launch goes better when people can watch the product work. ==We film demos on a set or live on your launch day==, whichever fits your rollout.",
        },
      ],
    },
    {
      type: "products",
      categories: ["lighting", "tv", "led-screens"],
      heading: { eyebrow: "Rent the gear", title: "Rent the gear behind our shoots", accent: "behind our shoots" },
      lede: "The lighting, TVs and LED screens our video crews work with are available to rent on their own. Pick what you need, and we'll ==send you an itemized price.==",
    },
    {
      type: "bento",
      id: "occasions",
      ctaPair: "portfolio",
      eyebrow: "Business occasions",
      title: "We produce corporate video for all kinds of business occasions",
      accent: "all kinds of business occasions",
      lede: [
        "Professional corporate video production starts with how your team plans to use the footage. At Prime Line AV, we produce corporate video for ==the moments your business needs to capture==, from simple brand demos to high-stakes conferences.",
      ],
      items: [
        { title: "Conferences & Summits", image: "/images/events/corporate.webp", body: "Parallel sessions and keynotes need more than one camera. We cover the full agenda and hand you footage organized by session." },
        { title: "Training & Onboarding", image: "/images/case-studies/amagi-1.webp", body: "A training video is recorded once and teaches for years. We film your instructors so every new hire hears the same lesson." },
        { title: "Product Launches", image: "/images/case-studies/tiktok-4.webp", body: "A launch plays out in front of your most important audience. We film the reveal and the reaction in the room, and you can see similar work in our [event portfolio](/portfolio)." },
        { title: "Executive Interviews", image: "/images/case-studies/miami-3.webp", body: "Your leadership speaks for the whole company on camera. We build the set around your speaker so nothing distracts from what they came to say." },
        { title: "Customer Testimonials", image: "/images/services/permanent-av-3.webp", body: "A customer telling your story carries more weight than you telling it yourself. We make the filming easy for them, at their office or at your event." },
        { title: "Brand Videos", image: "/images/services/av-04.webp", body: "Give your company story or campaign message a video format that can be used wherever your audience needs to see it. Give us your story, and we turn it into ready-to-use footage for your marketing team." },
        { title: "Event Coverage", image: "/images/case-studies/asian-flame-1.webp", body: "Company milestones deserve better than phone footage. We film galas and award nights and deliver footage worth showing long after the night ends." },
      ],
    },
    // Block 06 / CTA band (deck eyebrow: "Ready to plan your corporate video?")
    { type: "callStrip", title: "Tell us what needs to be on camera.", subtitle: "Tell us where the shoot is happening and how your team plans to use the video. Call us today, and our producer will give you a free quote fast!" },
    {
      type: "reasons",
      id: "why-us",
      eyebrow: "Why choose Prime Line AV",
      title: "One corporate video production company for the shoot and the event behind it",
      accent: "for the shoot and the event behind it",
      lede: [
        "When corporate video is tied to a live event, the camera crew cannot work in isolation from the show. Prime Line AV plans the video alongside the event production, so ==the camera team follows the actual program== instead of working from a separate plan. Here’s why top brands trust our professional corporate video production:",
      ],
      items: [
        { title: "Built for moments that do not get a second take", icon: "clapperboard", body: "Our AV team works around real-time show cues and multi-camera capture, ==tried and tested across 2,500+ events.== That matters when a keynote or launch moment cannot simply be repeated for the camera." },
        { title: "AV and video under one production plan", icon: "walkie-talkie", body: "For 15+ years, Prime Line AV has also handled the AV production and video team ==instead of arriving as a separate vendor with a separate brief.==" },
        { title: "Nationwide service without handing you off", icon: "location-pin", body: "We work coast to coast, in any city in the United States, through our [locations](/locations). ==Multi-city teams get one company to call== from one market to the next." },
        { title: "Fast start for tight schedules", icon: "stopwatch", body: "Send us the date, the venue, and how you plan to use the footage, and our producer takes it from the first call. ==We send you a fast quote== so your team can move into planning quickly." },
        { title: "Clear scope before the camera rolls", icon: "clipboard", body: "We define the filming scope in the proposal before production starts. Everything we film and deliver is listed there, so ==you know what you are getting before the crew is booked.==" },
      ],
    },
    {
      type: "videos",
      id: "case-studies",
      eyebrow: "Case studies",
      title: "See our work from real corporate events",
      accent: "real corporate events",
      lede: "The work we publish comes from ==live corporate events, filmed while they happened.== You can browse more of it in our [event portfolio](/portfolio).",
      studies: ["idb", "tiktok", "amagi", "lca", "nike"],
    },
    {
      type: "videos",
      id: "showreel",
      eyebrow: "Behind the scenes",
      title: "Watch our professional video production and see for yourself",
      accent: "professional video production",
      lede: "Press play and see how the Prime Line AV team ==captures the most important moments of your event.==",
      studies: ["ramp", "asianFlame", "youngFashion"],
      ctaLabel: "",
    },
    { type: "team", title: "Meet the crew behind the camera", accent: "crew behind the camera" },
    {
      type: "testimonials",
      eyebrow: "Client testimonials",
      title: "See what our clients say about our work",
      accent: "our clients say",
      lede: "Don't take our word for it. ==Watch what our corporate clients say== about the Prime Line AV team.",
    },
    { type: "blog" },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Corporate video production FAQs",
      accent: "FAQs",
      items: [
        {
          q: "What is corporate video production?",
          a: [
            "Corporate video production is the process of creating video a business uses to communicate with customers or its own team. It includes planned business content and footage from company events.",
            "Prime Line AV offers corporate video production for businesses of any size across the United States. Our team plans the shoot with you, then films the day and hands the footage over ready for use.",
          ],
        },
        { q: "How much does corporate video production cost?", a: ["The cost of corporate video production depends on the scope of the project. Crew time and camera coverage affect the quote, along with location requirements and final deliverables. Tell us what you need, and we’ll send you a quote before you commit."] },
        {
          q: "What types of corporate video do you produce?",
          a: [
            "The corporate video types Prime Line AV produces include event coverage, executive interviews, training sessions, product demos, and brand videos. Brand and product work is planned per project, while event filming runs on the multi-camera setups our crews already work with at live events.",
            "We also provide event video production for live programs and live streaming production when online viewers need to watch in real time.",
          ],
        },
        { q: "Do you script and edit, or only film?", a: ["Prime Line AV's core service is filming, with several cameras and a live-switched feed run by our crew on site. Scripting and standalone editing are scoped per project, so tell us what your video needs and we will confirm exactly what our team covers."] },
        { q: "Do you work nationwide?", a: ["Yes. Prime Line AV provides corporate video production nationwide and supports projects through our locations across the United States. Tell us where the shoot is happening, and we will scope the AV team around that market."] },
        { q: "Can Prime Line AV handle the AV production and video at the same event?", a: ["Yes. Prime Line AV can handle the AV production and video capture under one production plan when both services are part of the approved scope. That gives the video crew access to the same show information the event team is already working from."] },
        { q: "What is your turnaround time?", a: ["Turnaround time for a corporate video depends on what needs to be delivered. Raw event footage moves faster than a finished edit, and the timeline is written into your quote before the shoot is booked. Tell us your deadline, and we plan the shoot backward from it."] },
        { q: "What is the difference between corporate and event video production?", a: ["Corporate video production includes any video made for a business, such as brand, training, and interview videos. Event video production is the part of it that films a live event as it happens. Prime Line AV provides both corporate and event video production, whichever your event or brand needs."] },
      ],
      callStrip: { title: "Still have more questions?", subtitle: "Ask us today!" },
    },
  ],
}
