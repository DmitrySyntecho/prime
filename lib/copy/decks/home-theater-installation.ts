import type { Deck } from "@/lib/copy/deck-types"

/* ClickUp "Home Theater Installation page - Prime Line AV" (8cr40gk-41857), verbatim.
   Deck links → site routes: /av-installations/home-audio-video-installation/ → /av-installations/home-audio-video-installation,
   /av-installations/smart-home-installation/ → /av-installations/smart-home-installation,
   /locations/ → /locations, /av-installations/ → /av-installations.
   Card hrefs without a deck link: Dedicated home theaters, Media rooms, Projectors and screens → /quote
   ("Get your custom quote", the deck's CTA label); Surround sound → /av-installations/home-audio-video-installation,
   Smart control → /av-installations/smart-home-installation (the routes the cards themselves link to).
   The per-card eyebrows ("01 / Theater rooms" … "05 / Control") have no slot in the cards block and are dropped.
   The deck has no trust strip on this page: the stats repeat the Home AV deck's strip.
   Block 06 has no eyebrow in the deck ("Why Prime Line AV" used). No quote-form slug exists for installations. */
export const homeTheaterInstallation: Deck = {
  clickupId: "8cr40gk-41857",
  path: "/av-installations/home-theater-installation",
  h1: "Home Theater Installation Service in the United States",
  accent: "Home Theater Installation",
  pill: "Theater rooms · Media rooms · Surround sound · Projection",
  lede: "Prime Line AV provides home theater installation nationwide, designing and installing ==permanent viewing systems with simple controls== anyone in the family can use.",
  bullets: [
    { icon: "tv-display", text: "Room-specific screen layout, we plan the size and seating distance before installation" },
    { icon: "speaker", text: "Surround sound options in 5.1 or 7.1 layouts, with Dolby Atmos where suitable" },
    { icon: "installation", text: "Concealed wiring through the attic, basement, crawl space, or closets, never taped across a wall" },
    { icon: "render-3d", text: "Free 3D render of your home theater design before anything is ordered" },
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
  clips: ["home-1", "home-3"],
  blocks: [
    // Block 03
    {
      type: "checklist",
      id: "any-room",
      eyebrow: "Enjoy a cinematic movie experience without leaving your home.",
      title: "We provide home theater installation for any room and budget",
      accent: "any room and budget",
      lede: [
        "Prime Line AV provides full-service home theater installation, including room planning, screen and projector setup, surround sound, and acoustic treatment for homes across the United States. We handle anything ==from a media room built around your current TV to a dedicated theater with riser seating and a projection screen.== Every system is permanently installed and fully wired out of sight.",
        "You also get a dedicated project manager as your single point of contact from the first call to turnover. If you run into technical issues after the install, call us, and ==we'll send a technician to your home.==",
      ],
      listTitle: "What your home theater installation can include:",
      items: [
        { icon: "projector", text: "Projector and screen installation, or a large-format TV if that fits your room better" },
        { icon: "speaker", text: "Surround sound design, speaker wiring and installation" },
        { icon: "clipboard", text: "Theater seating layout and riser planning" },
        { icon: "sound-console", text: "Acoustic treatment, sound calibration, concealed cabling and equipment placement" },
        { icon: "content-play", text: "Playback controls and programmed viewing scenes" },
        { icon: "flight-case", text: "All the speakers, screens, receivers and hardware needed, together with the full installation" },
      ],
      secondary: { label: "Tell us about your space" },
    },
    // Block 04
    {
      type: "cards",
      id: "services",
      eyebrow: "What we install",
      title: "What's included in our home theater installation service",
      accent: "home theater installation service",
      items: [
        {
          title: "Dedicated home theaters",
          href: "/quote",
          cta: "Get your custom quote",
          image: "/images/installations/home-theater.webp",
          icon: "clapperboard",
          body: "Want a room primarily for movies? We plan its ==seating and light control around a projector or TV==, then position surround speakers for your viewing area.",
        },
        {
          title: "Media rooms",
          href: "/quote",
          cta: "Get your custom quote",
          image: "/images/installations/home-audio-video.webp",
          icon: "tv-display",
          body: "We adapt a home theater setup to ==a shared space like a living room, den, basement or bonus room.== We consider daylight and everyday seating when selecting the display and speaker arrangement.",
        },
        {
          title: "Surround sound",
          href: "/av-installations/home-audio-video-installation",
          image: "/images/installations/audio.webp",
          icon: "speaker",
          body: "We plan ==5.1 or 7.1 speaker positions around your seating== and assess whether Dolby Atmos fits the room. For sound beyond the theater, we also offer [home audio video installation](/av-installations/home-audio-video-installation).",
        },
        {
          title: "Projectors and screens",
          href: "/quote",
          cta: "Get your custom quote",
          image: "/images/installations/video.webp",
          icon: "projector",
          body: "We match ==projector throw distance to your available space== and check the ambient light. Screens can be fixed or motorized, and for a large-format TV we plan the mounting height around the seating.",
        },
        {
          title: "Smart control",
          href: "/av-installations/smart-home-installation",
          image: "/images/installations/smart-home.webp",
          icon: "content-play",
          body: "We program scene-based control for movie night, ==setting the lights, screen, source, and sound together== so you can start the system without juggling remotes. For wider automation, we offer complete [smart home installation](/av-installations/smart-home-installation).",
        },
      ],
    },
    {
      type: "products",
      categories: ["tv", "sound-systems"],
      heading: { eyebrow: "Need it for one event?", title: "Rent the same gear we install", accent: "the same gear" },
      lede: "TVs and sound systems from our own inventory are also available to rent for a single event: add what you need to your quote, and our team will confirm availability and ==send you an itemized price.==",
    },
    // Block 05 (labelled "Block 04" twice in the deck)
    {
      type: "steps",
      id: "process",
      eyebrow: "Our process",
      title: "How we turn your room into a home theater",
      accent: "into a home theater",
      items: [
        { icon: "headset", title: "Tell us about your room", body: "We discuss your viewing plans and budget, including any equipment you already own." },
        { icon: "clipboard", title: "Measure the space", body: "We measure the viewing distance and check power access, speaker locations, light and cable routes." },
        { icon: "render-3d", title: "Review your design and quote", body: "We present the equipment plan and quote for approval before ordering. A free 3D render is available." },
        { icon: "delivery-truck", title: "Prepare for installation", body: "We confirm delivery arrangements and access before agreeing on an installation date." },
        { icon: "installation", title: "Install and commission the system", body: "We mount the display and connect the selected equipment, then configure each component." },
        { icon: "shield", title: "Test it with you", body: "We test the picture and sound with you, including playback controls, before turnover." },
        { icon: "award", title: "System turnover", body: "We show you how to use the system and provide documentation, so it's easier for you to troubleshoot and handle any future servicing." },
      ],
    },
    // Block 06
    {
      type: "reasons",
      id: "why-us",
      eyebrow: "Why Prime Line AV",
      title: "Why choose Prime Line AV as your home theater installation company",
      accent: "home theater installation company",
      items: [
        { title: "Nationwide installation service", icon: "location-pin", body: "Our home theater installers work coast to coast, and ==we provide technical support for as long as you own the system.== You can view all our [locations](/locations) to see where we install." },
        { title: "One team from design to turnover", icon: "walkie-talkie", body: "With Prime Line AV, you get ==the same company to design, install, and service your home theater system.== No need to deal with separate contractors." },
        { title: "15+ years of AV expertise", icon: "award", body: "Prime Line AV is a fully licensed and insured installer. We've worked with projection, LED displays, surround sound, and acoustic technology for over 15 years to ==give you the best viewing experience at home.==" },
        { title: "Full home AV under one roof", icon: "installation", body: "Home theater installation is just one part of what we do. Our [AV installation services](/av-installations) also cover ==whole-home audio, video systems, smart home control, and commercial AV== for your business." },
      ],
    },
    // Block 07
    {
      type: "prose",
      id: "bigger-picture",
      eyebrow: "Give everyone a reason to come over for movie night.",
      title: "Trust a home theater installation company that sees the bigger picture",
      accent: "sees the bigger picture",
      paragraphs: [
        "At Prime Line AV, we provide home theater system installation planned and customized to your space. ==We size the display to your seating distance and set its brightness against the room's light==, whether you choose a projector and screen or a large-format TV. For bigger spaces, we can even install a full LED screen in any size you need.",
        "For cinema-quality audio, ==we place every speaker to THX and Dolby Atmos guidelines==, so the sound wraps around your seats. We design the speaker layout around your room and your seating.",
        "Once everything is mounted, our home theater systems installers calibrate the brightness and color balance of your display and level every speaker in the room. Whichever seat your guests take, ==they will get the same immersive picture and sound throughout the movie.==",
        "For the best viewing experience, we install trusted home theater brands such as Samsung, Sony, LG, Bose, Sonos and more, and ==we are glad to build around equipment you already own.== Starting a home theater from scratch? Contact us and our project manager will give you a visit and a walkthrough at your home to plan everything with you.",
      ],
      image: "/images/installations/home-theater.webp",
      imageAlt: "Dedicated home theater with a projection screen, riser seating and concealed surround speakers",
      secondary: { label: "Book a site survey" },
    },
    // Block 08
    { type: "testimonials", eyebrow: "Prime Line AV testimonials", title: "What clients say about our work", accent: "our work" },
    // Block 09
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Home theater installation FAQs",
      accent: "FAQs",
      items: [
        { q: "What does home theater installation include?", a: ["Home theater installation covers planning the room, mounting the display or projection setup, placing and wiring the speakers, adding acoustic panels, and programming the controls. A full-service company like Prime Line AV also calibrates the finished system, so the picture and sound are tuned to your room before turnover."] },
        { q: "How much does home theater installation cost?", a: ["A professional home theater installation typically ranges from $3,000 to $50,000+. Room size, equipment choices, acoustic work, and whether you want a dedicated theater all affect the price. To get a free estimate, send us your project details and our project manager will give you a quote in as fast as 30 minutes."] },
        { q: "What is the difference between 5.1 and 7.1 surround sound?", a: ["A 5.1 surround system uses 5 speakers and 1 subwoofer, while 7.1 adds 2 rear speakers for a fuller soundstage. Dolby Atmos adds height channels above the seating, so sound moves overhead as well as around you. Prime Line AV designs the layout around your room size and seating before recommending a format."] },
        { q: "Should I get a projector or a TV for a home theater?", a: ["For home theater setups, a projector gives you the biggest picture for the money and suits dark, dedicated rooms. Meanwhile, a bright large-format TV holds up better in rooms with daylight. Screen size, seating distance, ambient light, and budget all affect the right choice for your viewing room. To know which display is best for your home theater, contact us at Prime Line AV, and we will give you a site survey to help you choose the right one."] },
        { q: "Does Prime Line AV include acoustic treatment and calibration with a home theater?", a: ["Yes, Prime Line AV includes acoustic treatment and calibration in home theater projects that need them. Our team places acoustic panels to control echo in the room, then fine-tunes the picture and audio from your main seating position once every component is installed."] },
        { q: "What is the difference between a dedicated home theater and a media room?", a: ["A dedicated home theater is a room built only for watching, with controlled light, riser seating, treated walls, and a projection screen. A media room is a multi-purpose space built around a TV or projector that your family also uses every day. Prime Line AV designs and installs both."] },
        { q: "How long does home theater installation take?", a: ["Most home theater installations take between 2 and 7 days once the equipment arrives. A straightforward media room install can finish in 1 or 2 days, while a dedicated theater with acoustic work and custom seating takes longer. Ordering all the necessary equipment adds lead time, so book your dates early."] },
        { q: "Does home theater installation come with a warranty?", a: ["Yes, every Prime Line AV home theater installation is covered by our workmanship warranty, whether we supply the hardware or you do. Your equipment also carries the manufacturer's warranties. If you need help after turnover, our technical support is just one call away. Additional charges apply for support visits."] },
      ],
      callStrip: { title: "Still have more questions?", subtitle: "Ask us today!" },
    },
  ],
}
