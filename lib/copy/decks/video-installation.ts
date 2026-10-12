import type { Deck } from "@/lib/copy/deck-types"

/* ClickUp "Video Installation page - Prime Line AV" (8cr40gk-39357), verbatim.
   Deck links → site routes: /av-installations/video-wall-installation/ →
   /av-installations/led-wall-installation, /av-installations/commercial-audio-video-installation
   and /av-installations as-is, /locations/ → /locations, /av-rental/led-screen-rental/ →
   /av-rental/led-video-wall, /store/led-walls/ → /store/led-walls.
   The "Displays and screens" and "Video conferencing systems" cards have no page of
   their own, so they open the quote page. Eyebrows the deck leaves out (Blocks 06, 09)
   are plain section labels. The hero trust strip is the site standard (not in this deck). */
export const videoInstallation: Deck = {
  clickupId: "8cr40gk-39357",
  path: "/av-installations/video-installation",
  h1: "Video Installation Service in the USA",
  accent: "Video Installation Service",
  pill: "Displays · Video walls · Conferencing · Signage",
  lede: "Prime Line AV is a video installation company that designs and installs ==displays, video walls, conferencing systems, and digital signage== for offices and retail spaces nationwide.",
  bullets: [
    { icon: "location-pin", text: "Nationwide installation and support, whether you need 1 screen or 100" },
    { icon: "shield", text: "Insured AV team with COIs ready, so we can work in any building or venue" },
    { icon: "clipboard", text: "Documentation and staff training included with every project" },
    { icon: "render-3d", text: "Free 3D render of your video setup before you commit" },
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
  clips: ["tv-rental", "home-1"],
  blocks: [
    // Block 03
    {
      type: "prose",
      id: "one-installer",
      eyebrow: "Sharp screens in the lobby. Smooth video calls in the boardroom.",
      title: "Every screen in your building, installed by one video installation company",
      accent: "one video installation company",
      paragraphs: [
        "Prime Line AV provides full-service video installation, including ==designing, mounting, wiring, and commissioning fixed displays== for your commercial space. We install anything from a single display in your conference room to commercial-grade signage across your retail space. We also install outdoor-rated video displays built for weather and direct sunlight. For large LED formats, we offer custom video wall installation in any shape or configuration.",
        "Not only that, you also get ==a dedicated project manager as your single point of contact.== The AV team that surveys your space is also the crew that installs your displays. For over 15 years, office and retail managers have trusted our licensed technicians with their digital signage, billboards, conferencing screens, and venue displays.",
      ],
      image: "/images/services/tv-rental.webp",
      imageAlt: "Wall of commercial displays mounted and wired as one system",
      secondary: { label: "Request a consultation" },
    },
    // Block 04
    {
      type: "cards",
      id: "what-we-install",
      eyebrow: "What we install",
      title: "What's included in our video installation service",
      accent: "video installation service",
      cols: 4,
      items: [
        {
          title: "Displays and screens",
          href: "/quote",
          cta: "Get your custom quote",
          image: "/images/services/tv-rental-card.webp",
          icon: "tv-display",
          body: "We install professional displays in offices, lobbies, retail floors, and meeting rooms, and ==every screen is wired and calibrated before handover.==",
        },
        {
          title: "LED video walls",
          href: "/av-installations/led-wall-installation",
          image: "/images/installations/video-wall.webp",
          icon: "led-wall",
          body: "For larger display surfaces, our team designs and installs dedicated LED screen systems through our [video wall installation](/av-installations/led-wall-installation) service, ==including panel layout and content playback.==",
        },
        {
          title: "Video conferencing systems",
          href: "/quote",
          cta: "Get your custom quote",
          image: "/images/installations/video.webp",
          icon: "live-camera",
          body: "We install the cameras, microphones, codecs, and room displays your team uses for video calls, ==configured for the platform you already run meetings on.==",
        },
        {
          title: "Commercial AV systems",
          href: "/av-installations/commercial-audio-video-installation",
          image: "/images/services/permanent-av-2.webp",
          icon: "sound-console",
          body: "Need audio to match your display? We also provide complete [commercial audio-video installation](/av-installations/commercial-audio-video-installation) packages, ==perfect for restaurants, hotels, churches, and event venues.==",
        },
      ],
    },
    {
      type: "products",
      categories: ["tv", "led-screens"],
      heading: { eyebrow: "Need it for one event?", title: "Rent the same gear we install", accent: "the same gear" },
      lede: "Rent the same TVs, monitors and LED screens we install for a single event, and our team will confirm availability and ==send you an itemized price.==",
    },
    // Block 05
    {
      type: "steps",
      id: "process",
      eyebrow: "Our process",
      title: "How our video installation works",
      accent: "video installation",
      items: [
        { icon: "headset", title: "Request and consultation", body: "We get on a call to talk about your space and how you plan to use your video display." },
        { icon: "clipboard", title: "Site survey and measurements", body: "We conduct a site survey, measure the walls, and check sightlines as well as power, cabling paths, and mounting surfaces." },
        { icon: "render-3d", title: "Design and quote", body: "Our engineers prepare a system design with a free 3D render of the layout, plus a custom estimate for your approval before we order anything." },
        { icon: "delivery-truck", title: "Prep and logistics", body: "We order the hardware and schedule the AV team on the dates that work for your business." },
        { icon: "installation", title: "Installation and commissioning", body: "Our installers mount the displays, run the cabling, configure the system, and power up every screen." },
        { icon: "shield", title: "Testing and handover", body: "We test every video stream and every input with you in the room, and we only wrap up once you approve the results." },
        { icon: "award", title: "Documentation and training", body: "Lastly, you'll get system documentation and staff training so your team can run everything from day 1. Every installation also comes with a warranty." },
      ],
    },
    // Block 06
    {
      type: "reasons",
      id: "why-us",
      eyebrow: "Why Prime Line AV",
      title: "Why choose Prime Line AV for video installation",
      accent: "video installation",
      items: [
        { title: "Nationwide installation service", icon: "location-pin", body: "We install and support video displays coast to coast, ==in any type of venue or establishment.== Our AV team is available nationwide; you can check our [locations](/locations) to see where we work." },
        { title: "One company from design to installation", icon: "walkie-talkie", body: "You work with one accountable team from the first call to the final walkthrough. No handoffs between contractors, and ==you call the same team for technical support== for as long as you have the display." },
        { title: "Licensed and certified installers", icon: "award", body: "We carry insurance and provide COIs before work starts. Our team ==coordinates directly with your building management== on all the paperwork needed to get the work done." },
        { title: "One team for everything AV", icon: "flight-case", body: "Video displays are one part of what we do at Prime Line AV. We also offer full [audio visual installation](/av-installations) of every kind. If you need displays, sound systems, lighting, and even staging, ==we are the partner you can call.==" },
      ],
    },
    // Block 07
    {
      type: "prose",
      id: "eye-catching-displays",
      eyebrow: "Your screens are on, but is anyone paying attention?",
      title: "Our video installation service brings eye-catching displays to your space",
      accent: "eye-catching displays",
      paragraphs: [
        "At Prime Line AV, we provide video installation for 4K commercial displays, LED video walls, digital signage, and conferencing screens. We plan viewing distances and sightlines before mounting, then ==calibrate every display so the picture looks right from any seat.== We handle the signal side too, including AV over IP distribution and HDBaseT cabling.",
        "Video conferencing rooms get the same treatment. As a video conferencing installation company, we build the full room system, position the camera to cover the whole conference table, tune the microphones, and ==run a live test call with you before handover.==",
        "We provide installation for top-of-the-line video equipment from brands like Samsung, Sony, LG, Crestron, Extron, Biamp, and more. Need a one-time video display? We also offer [LED screen rental](/av-rental/led-video-wall) with delivery and on-site technicians available. Or you can [buy LED walls](/store/led-walls) directly from our store to own your video display, ==and we'll install it too!==",
      ],
      image: "/images/services/permanent-av.webp",
      imageAlt: "Commercial presentation space with permanently installed displays",
      secondary: { label: "Request a consultation" },
    },
    // Block 08
    { type: "testimonials", eyebrow: "Prime Line AV testimonials", title: "What clients say about our work", accent: "our work" },
    // Block 09
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Video installation FAQs",
      accent: "FAQs",
      items: [
        { q: "What is video installation?", a: ["Video installation is the professional setup of commercial video screens, covering wall mounting, wiring, system configuration, and final picture calibration. A video installation company like Prime Line AV surveys your space first, then installs and tests every screen before handover. The work spans everything from single displays up to complete LED video walls."] },
        { q: "Do you install displays, video walls, conferencing systems and digital signage?", a: ["Yes, Prime Line AV installs displays, video walls, conferencing systems and digital signage. Displays and digital signage are handled directly under this service, and so are video conferencing systems. Large LED formats go through our video wall installation team. When a room needs sound and control, our commercial audio-video installation service handles everything."] },
        { q: "Do you work nationwide?", a: ["Yes, Prime Line AV installs video systems nationwide, including multi-site rollouts for retail and office chains. The crew standard and the process are the same whether your project is in New York or Nevada, and one team coordinates the work from survey to handover. Check our [locations](/locations) page to see where we work."] },
        { q: "Do you handle commercial or residential projects?", a: ["Our focus is commercial video installation for offices, retail spaces, venues, and other business properties. We also install home theater and home audio-video systems for residential clients. Either way, the project starts the same, with a site survey and a design you approve before any crew arrives at your door."] },
        { q: "How much does video installation cost?", a: ["Most video installation projects cost between $1,500 and $25,000+. A single display lands at the low end; LED video walls reach the high end. To get a free estimate, send us your project details and hardware you have in mind, and our project manager will give you a quote in as fast as 30 minutes."] },
        { q: "How long does a video installation take?", a: ["Most video installations take 1 to 3 days on site. A single display or a conference room is usually done in a day. The bigger the screen and the more complex the setup, the longer the job takes. Hardware lead times add 1 to 2 weeks before installation day, so book the survey early."] },
        { q: "Do you provide a warranty and support after installation?", a: ["Yes, every video installation we complete is covered by a workmanship warranty, whether you buy the hardware from us or supply your own. Manufacturer warranties on the equipment apply as well. After installation, our technical support is just one call away if you need assistance with your system. Additional charges apply for support visits."] },
      ],
      callStrip: { title: "Still have more questions?", subtitle: "Ask us today!" },
    },
  ],
}
