import type { Deck } from "@/lib/copy/deck-types"

/* ClickUp "Billboard Installation Service page - Prime Line AV" (8cr40gk-41877), verbatim.
   Deck links → site routes: /av-installations/video-wall-installation/ →
   /av-installations/led-wall-installation, /av-rental/led-screen-rental/ →
   /av-rental/led-video-wall, /locations/ → /locations.
   Cards without a deck link: "Digital LED billboards" → /store/led-walls/outdoor-led-walls;
   "Static-to-LED billboard upgrades" and "Content scheduling and control" have no page
   of their own, so they open the quote page. Eyebrows the deck leaves out (Blocks 03,
   06, 09) are plain section labels. The hero trust strip is the site standard (not in this deck). */
export const billboardInstallation: Deck = {
  clickupId: "8cr40gk-41877",
  path: "/av-installations/billboard-installation",
  h1: "Billboard Installation Service in the USA",
  accent: "Billboard Installation Service",
  pill: "Digital LED · Static-to-digital · Content",
  lede: "Prime Line AV is a billboard installation company that supplies and installs digital LED billboards nationwide, ==from the panels to the content on screen.== Steelwork and permits are handled with a specialist partner.",
  bullets: [
    { icon: "led-billboard", text: "Full-service digital LED billboards, built for permanent outdoor use" },
    { icon: "setup-tools", text: "Static-to-digital upgrades: we convert printed billboard faces into LED screens" },
    { icon: "content-play", text: "Content ready for playback, fully configured system for ads and promotions" },
    { icon: "led-outdoor", text: "Every type of billboard for outdoor advertising companies, roadside ads, real estate and property development investors" },
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
      id: "build-revenue",
      eyebrow: "Supply · install · content",
      title: "A billboard installation company that helps build revenue",
      accent: "helps build revenue",
      lede: [
        "Prime Line AV provides billboard installation for digital LED screens, including panel supply, mounting to your existing structure, display electrical work, and content setup. You will also get ==a free 3D render of your billboard setup together with a custom estimate== before you commit. Any steel or permitting work goes through a specialist partner that we coordinate as part of your project.",
        "A digital billboard is a fixed outdoor LED screen that runs multiple ads in rotation on one face and updates from a computer in minutes. ==You can run your own promotions on it or sell the rotation to advertisers.==",
      ],
      listTitle: "Our digital billboard install typically includes:",
      items: [
        { icon: "led-wall", text: "LED panel supply, or installation of panels you've already purchased" },
        { icon: "installation", text: "Mounting and alignment on your existing billboard structure" },
        { icon: "setup-tools", text: "Power and data cabling for the screen itself" },
        { icon: "sound-console", text: "Display configuration, controller setup, remote access, and ad scheduling software" },
        { icon: "calendar", text: "Content management with dayparting, scheduled playlists, loop playback and uptime reports" },
        { icon: "award", text: "Training for the people who will run the screen" },
        { icon: "live-stream", text: "Media players and network connectivity for remote content updates" },
        { icon: "led-billboard", text: "Single- and double-sided faces in digital OOH formats, from roadside bulletins to wall displays" },
      ],
      secondary: { label: "Request a consultation" },
    },
    // Block 04
    {
      type: "cards",
      id: "what-we-install",
      eyebrow: "What we install",
      title: "What's included in our digital billboard installation service",
      accent: "digital billboard installation service",
      items: [
        {
          title: "Digital LED billboards",
          href: "/store/led-walls/outdoor-led-walls",
          image: "/images/generated/billboard-roadside.webp",
          icon: "led-billboard",
          body: "We supply outdoor LED panels, mount them on your billboard structure, wire the display, and commission it end to end. Every panel is aligned and weather-sealed, and ==the full display is tested before turnover.==",
        },
        {
          title: "Static-to-LED billboard upgrades",
          href: "/quote",
          cta: "Get your custom quote",
          image: "/images/generated/billboard-upgrade.webp",
          icon: "setup-tools",
          body: "We remove the printed billboard face, fit LED panels to the existing frame, wire the new screen, and set up playback. ==Your billboard location stays the same; only the face changes.==",
        },
        {
          title: "Content scheduling and control",
          href: "/quote",
          cta: "Get your custom quote",
          image: "/images/services/tv-rental.webp",
          icon: "content-play",
          body: "We set up the software that runs your ads, with ==playback schedules you control from your desk.== Ongoing content management by our team is available by request.",
        },
        {
          title: "Outdoor LED displays",
          href: "/av-installations/led-wall-installation",
          image: "/images/generated/billboard-building.webp",
          icon: "led-outdoor",
          body: "Need a large LED display on a building facade or venue exterior? Our [video wall installation](/av-installations/led-wall-installation) service covers ==permanent outdoor displays in any shape and size.==",
        },
        {
          title: "LED walls for events",
          href: "/av-rental/led-video-wall",
          image: "/images/services/led-02.webp",
          icon: "led-wall",
          body: "Running a product launch or a one-time campaign? We also offer [LED screen rental](/av-rental/led-video-wall) nationwide, ==delivered and operated for the dates you need.==",
        },
      ],
    },
    {
      type: "products",
      category: "led-screens",
      heading: { eyebrow: "Need it for one event?", title: "Rent the same gear we install", accent: "the same gear" },
      lede: "Rent the same outdoor and indoor LED wall panels we install for a single event, and our team will confirm availability and ==send you an itemized price.==",
    },
    // Block 05
    {
      type: "steps",
      id: "process",
      eyebrow: "Our process",
      title: "How we install your digital billboard",
      accent: "your digital billboard",
      items: [
        { icon: "headset", title: "Request and consultation", body: "Send us your billboard location and what you want on the screen. Our project manager reviews whether it's a new digital face or an upgrade." },
        { icon: "clipboard", title: "Site survey and measurements", body: "Our team surveys the location and checks the structure condition, face dimensions, power availability, and viewing distance." },
        { icon: "render-3d", title: "Design and quote", body: "Our engineers prepare the screen design with a free 3D render and a custom estimate. Nothing is ordered until you approve both." },
        { icon: "delivery-truck", title: "Preparation and logistics", body: "We order the panels, plan the lift equipment, book the crew, and schedule the work on dates that suit your location." },
        { icon: "installation", title: "Installation and commissioning", body: "We mount the panels, align the faces, run the cabling, and power up the screen for the first time." },
        { icon: "pixel-pitch", title: "Testing and sign-off", body: "We check brightness, color calibration, playback, and remote access with you on site, and we fix anything on the spot before you approve the results." },
        { icon: "award", title: "Documentation, training, warranty and turnover", body: "Lastly, we walk your team through the content system and hand over the operating documentation. Every installation is covered by our workmanship warranty." },
      ],
    },
    // Block 06
    {
      type: "reasons",
      id: "why-us",
      eyebrow: "Why Prime Line AV",
      title: "Why choose Prime Line AV for digital billboard installation",
      accent: "digital billboard installation",
      items: [
        { title: "LED screens are our trade", icon: "led-wall", body: "Prime Line AV has engineered LED displays for over 15 years. ==The same panels and calibration standards we've used across 2,500+ events== go into every permanent billboard we install." },
        { title: "Nationwide installation and support", icon: "location-pin", body: "Our billboard installation service covers the whole country. We also provide technical support for your billboards, ==from playback issues to panel repairs.== Check our [locations](/locations) to see where we work." },
        { title: "Turnkey supply and installation", icon: "delivery-truck", body: "You get the LED panels, the install crew, the lift logistics, and the commissioning ==in one package and one quote.== Our project manager runs the schedule and the freight, so you only deal with one vendor." },
        { title: "Fully insured with COIs ready", icon: "shield", body: "Prime Line AV is a fully insured billboard installation company. Property managers and site owners ==get every certificate they need before our crew arrives.==" },
      ],
    },
    // Block 07
    {
      type: "prose",
      id: "uptime",
      eyebrow: "A dark billboard makes no money.",
      title: "Work with a billboard installation company that keeps ad space earning day and night",
      accent: "earning day and night",
      paragraphs: [
        "At Prime Line AV, we handle LED billboard installation built for maximum uptime and exposure. We pick the pixel pitch for how far away your target audience views the screen, and ==panels bright enough to stay readable in direct midday sun.== We build every screen from weatherproofed IP-rated outdoor panels, with ventilation planned for the hottest months.",
        "After turnover, we set up remote monitoring on your digital billboard. That way, a faulty panel or a playback error gets caught early, and our technicians are one call away when the screen needs service. ==You get fewer dark hours and more earning time from your ad space.==",
        "We've also partnered with local contractors who build the steel structure and framework that carry the display. Once the structure is in place, our team takes over and installs your digital LED billboard screen. Our team handles all the paperwork, and ==our project manager will be your one point of contact== from planning all the way to go-live.",
        "If you're interested in a digital billboard of your own, whether you're starting a billboard business or advertising your own brand, contact us at Prime Line AV. ==Our project manager will give you a free consultation== and go over the details of your project. You can also browse our [locations](/locations) to see where we are available.",
      ],
      image: "/images/generated/billboard-freeway-night.webp",
      imageAlt: "Double-sided digital LED billboard above a freeway at night",
      secondary: { label: "Request a consultation" },
    },
    // Block 08
    { type: "testimonials", eyebrow: "Prime Line AV testimonials", title: "What clients say about our work", accent: "our work" },
    // Block 09
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Digital billboard installation FAQs",
      accent: "FAQs",
      items: [
        { q: "What does billboard installation include?", a: ["Billboard installation typically includes mounting the LED display cabinets, running power and data connections, programming the controller, and setting up content playback. Digital projects also cover calibration and testing before the screen goes live. A billboard installation company like Prime Line AV can handle the full package, from new digital faces to static-to-LED conversions."] },
        { q: "Do you build billboard structures and handle permitting?", a: ["Prime Line AV installs the digital screen itself. The steel structure, foundations, engineering, and sign permits go through local contractor partners that we coordinate, so you still deal with one project manager from start to turnover. Your quote clearly separates our work from our partners' work."] },
        { q: "Can you upgrade a static billboard to a digital LED billboard?", a: ["Yes, Prime Line AV converts static billboards to digital LED. We fit outdoor LED panels to your existing billboard frame and run new power and signal cabling. Our team then sets up the software that rotates your ads. The structure is surveyed first to confirm it can carry the added weight and wind load."] },
        { q: "How much does digital billboard installation cost?", a: ["Digital billboard installation typically ranges from $15,000 to $150,000+, depending on the screen size, pixel pitch, site access, and whether it's a new face or an upgrade. To get a free estimate, send us your billboard details and our project manager will give you a quote in as fast as 30 minutes."] },
        { q: "How long does digital billboard installation take?", a: ["The digital billboard install itself usually takes 2 to 5 days once the panels are on site. Ordering outdoor LED panels adds lead time, often 2 to 6 weeks. If your site has no structure yet, the project takes longer, since our contractor partners build the steel structure from the ground up first."] },
        { q: "How long does a digital LED billboard last?", a: ["A digital LED billboard typically lasts about 100,000 hours of operation, which is roughly 10 years of continuous use. Outdoor-rated panels, proper ventilation, clean power, and regular servicing all extend that lifespan. Prime Line AV installs weatherproofed displays and provides ongoing technical support to keep your billboard in service."] },
        { q: "Can Prime Line AV manage the content on my digital billboard?", a: ["Yes, Prime Line AV can manage your digital billboard content for you. We schedule campaigns, upload new ads, adjust dayparting and monitor playback, or we train your team to run the software in-house. Everything is configured during the installation, so content management can start on day one."] },
      ],
      callStrip: { title: "Still have more questions?", subtitle: "Ask us today!" },
    },
  ],
}
