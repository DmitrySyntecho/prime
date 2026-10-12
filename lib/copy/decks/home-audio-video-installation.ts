import type { Deck } from "@/lib/copy/deck-types"

/* ClickUp "Home Audio Video Installation page - Prime Line AV" (8cr40gk-39397), verbatim.
   Deck links → site routes: /av-installations/home-theater-installation/ → /av-installations/home-theater-installation,
   /av-installations/smart-home-installation/ → /av-installations/smart-home-installation,
   /locations/ → /locations, /av-installations/ → /av-installations.
   Card hrefs without a deck link: Multi-room audio → /av-installations/audio-installation,
   TV and display mounting → /av-installations/video-installation.
   Block 06 has no eyebrow in the deck ("Why Prime Line AV" used). No quote-form slug exists for installations. */
export const homeAudioVideoInstallation: Deck = {
  clickupId: "8cr40gk-39397",
  path: "/av-installations/home-audio-video-installation",
  h1: "Home Audio Video Installation Service in the USA",
  accent: "Home Audio Video Installation",
  pill: "Multi-room audio · TV mounting · Home theater · Smart home",
  lede: "Prime Line AV provides home audio video installation nationwide, with ==multi-room sound systems, wall-mounted TVs, concealed wiring, and intuitive controls== your whole family can use.",
  bullets: [
    { icon: "speaker", text: "Full home coverage, from one TV to an entire home theater system" },
    { icon: "headset", text: "One dedicated project manager, from the first site visit to turnover" },
    { icon: "shield", text: "Licensed and insured installers who leave your home spotless when the work is done" },
    { icon: "render-3d", text: "Free 3D render of your home AV layout before you commit to anything" },
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
  clips: ["home-1", "home-3"],
  blocks: [
    // Block 03
    {
      type: "checklist",
      id: "every-room",
      eyebrow: "Cinema-quality AV in the comfort of your own home",
      title: "We handle home audio video installation for every room",
      accent: "for every room",
      lede: [
        "Prime Line AV provides full-service home audio video installation, including multi-room speaker systems, TV and display mounting, concealed in-wall wiring and simple control for the whole house. ==We have installed AV professionally for 15 years==, and we bring that experience into living rooms, kitchens, patios and media rooms.",
        "We create a home audio video design that fits your budget and your space. ==Every system is permanently installed and fully set up before we leave.== If you want a dedicated theater room or full home automation, we can install those as well.",
        "You also get a dedicated project manager as your single point of contact, from the first call to the final walkthrough. The same team that surveys your home designs your system, engineers the wiring plan, installs the equipment, and programs everything to work together. If you encounter any technical issues, simply call us, and ==we'll send a technician to your home.==",
      ],
      listTitle: "Every home AV installation can include:",
      items: [
        { icon: "tv-display", text: "Smart TVs, UHD projectors, soundbars, and Dolby Atmos surround systems" },
        { icon: "speaker", text: "Speaker placement and separate listening zones" },
        { icon: "installation", text: "Structured cabling and concealed wire management" },
        { icon: "content-play", text: "Voice-activated and universal remote control programming" },
        { icon: "clipboard", text: "Power outlet and switch layout planning" },
        { icon: "award", text: "System training for everyone in the household" },
      ],
      secondary: { label: "Tell us about your space" },
    },
    // Block 04
    {
      type: "cards",
      id: "services",
      eyebrow: "What we install",
      title: "Our home audio video installation services",
      accent: "home audio video installation",
      cols: 4,
      items: [
        {
          title: "Multi-room audio systems",
          href: "/av-installations/audio-installation",
          image: "/images/generated/home-multiroom-audio.webp",
          icon: "speaker",
          body: "We install in-wall and in-ceiling speakers throughout the house and group them into zones. Play music in the kitchen while someone watches a game in the den, and ==control every zone from one app on your phone.==",
        },
        {
          title: "TV and display mounting",
          href: "/av-installations/video-installation",
          image: "/images/installations/home-audio-video.webp",
          icon: "tv-display",
          body: "We mount TVs and displays at the right viewing height, on drywall, brick, stone, or above the fireplace, ==with the wiring hidden inside the wall.== No visible cables and no sagging brackets.",
        },
        {
          title: "Home theater",
          href: "/av-installations/home-theater-installation",
          image: "/images/installations/home-theater.webp",
          icon: "projector",
          body: "Want a dedicated movie room? We design and build it through our [home theater installation](/av-installations/home-theater-installation) service, covering ==the projector, screen, surround sound and room lighting.==",
        },
        {
          title: "Smart home",
          href: "/av-installations/smart-home-installation",
          image: "/images/installations/smart-home.webp",
          icon: "content-play",
          body: "Your audio and video can also run as part of a complete [smart home installation](/av-installations/smart-home-installation), with ==lighting, shades, climate and security on the same control== your family already uses.",
        },
      ],
    },
    {
      type: "products",
      categories: ["tv", "sound-systems"],
      heading: { eyebrow: "Need it for one event?", title: "Rent the same gear we install", accent: "the same gear" },
      lede: "TVs and sound systems from our own inventory are also available to rent for a single event: add what you need to your quote, and our team will confirm availability and ==send you an itemized price.==",
    },
    // Block 05
    {
      type: "steps",
      id: "process",
      eyebrow: "Our process",
      title: "How your home AV installation comes together",
      accent: "comes together",
      items: [
        { icon: "headset", title: "Request and consultation", body: "Send us a request, and we get on a call about the rooms you want covered and how your family will use the system." },
        { icon: "clipboard", title: "Home survey and measurements", body: "A technician visits your home to measure each room, check wall and ceiling construction, find wiring paths, and map your power outlets." },
        { icon: "render-3d", title: "Design, 3D render and quote", body: "Our engineers prepare a system design with a free 3D render and a custom estimate. We order nothing until you approve both." },
        { icon: "calendar", title: "Scheduling and preparation", body: "We order your equipment and schedule the installation on dates that fit your household. Mid-renovation? We coordinate with your contractor's schedule." },
        { icon: "installation", title: "Installation and commissioning", body: "Our installers run the cabling out of sight, mount every speaker and screen, connect the control system, and switch everything on." },
        { icon: "shield", title: "Testing and handover", body: "We test the sound and picture in every room with you there, and wrap up only when you are happy." },
        { icon: "award", title: "Documentation, training and warranty", body: "Lastly, you get the full system documentation and a training session for the whole family. Every installation is covered by our workmanship warranty." },
      ],
    },
    // Block 06
    {
      type: "reasons",
      id: "why-us",
      eyebrow: "Why Prime Line AV",
      title: "Why choose Prime Line AV for your home audio and video",
      accent: "your home audio and video",
      items: [
        { title: "Coast-to-coast coverage", icon: "location-pin", body: "==We install home AV systems across the USA==, from city condos to houses in the suburbs. Check our [locations](/locations) to see where our installers work." },
        { title: "One company from design to support", icon: "walkie-talkie", body: "Your audio video home installation is handled by one accountable company. ==The crew that plans your system also mounts the equipment==, handles the wiring, configures the control, and shows your family how it works." },
        { title: "Certified and insured installers", icon: "shield", body: "Our installers are licensed and certified, and we carry full insurance with ==COIs ready if your HOA or building manager asks for one.== Your home stays protected while we work and clean when we leave." },
        { title: "Commercial wiring standards at home", icon: "installation", body: "We wire homes to the same standard as our commercial installations, with labeled cable runs, clean terminations, tidy equipment racks, and ==documentation any electrician can read.== When the job is done, the only things you notice are the sound and the picture." },
        { title: "Full AV installation services", icon: "sound-console", body: "Home systems are one part of what we do. We also provide [commercial AV installations](/av-installations) for offices, restaurants, churches, and venues, so ==the company that wired your house can take care of your business too.==" },
      ],
    },
    // Block 07
    {
      type: "prose",
      id: "performance",
      eyebrow: "Great equipment won't make up for poor installation.",
      title: "Get the performance you paid for with professional home audio and video installation",
      accent: "professional home audio and video installation",
      paragraphs: [
        "At Prime Line AV, we provide home audio and video installation built around daily life in your house, with in-wall speakers, wall-mounted TVs, hidden cabling, and easy-to-use controls. We plan the speaker placement and viewing distances for each room before anything is mounted, then calibrate the audio and the picture once the installation is complete. The result is ==sound that's clear where you sit without being loud in the next room==, and a screen you can watch comfortably from any seat.",
        "During the installation, we can pre-run extra cabling to the patio, kitchen, garage, or guest room, so ==adding a zone later never means opening up finished walls.== In a home that's already built, we work through the attic, the basement, the crawl space, and the closets to keep cutting into your drywall to a minimum.",
        "We install top brands such as Samsung, Sony, LG, Bose, Sonos, Crestron, and more, and ==we are just as happy to work with the hardware you already own.== Bought a new TV for the big game? We will mount it and wire it into the rest of your AV system.",
      ],
      image: "/images/generated/home-media-room.webp",
      imageAlt: "Media room with a wall-mounted TV, concealed wiring and in-wall speakers",
      secondary: { label: "Request a consultation" },
    },
    // Block 08
    { type: "testimonials", eyebrow: "Prime Line AV testimonials", title: "What clients say about our work", accent: "our work" },
    // Block 09
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Home audio video installation FAQs",
      accent: "FAQs",
      items: [
        { q: "What does home audio video installation include?", a: ["Home audio video installation covers the sound and picture systems built into a house, including whole-home speaker zones, television wall mounting, in-wall cable routing, and app-based control setup. A home AV company like Prime Line AV designs the system around your rooms, installs the hardware, configures the control, and trains your family before turnover."] },
        { q: "How much does home audio video installation cost?", a: ["Home audio-video installation typically costs between $500 and $20,000+, depending on the number of rooms and the equipment you choose. To get a free estimate, send us your project details and hardware you have in mind, and our project manager will give you a quote in as fast as 30 minutes."] },
        { q: "How long does home AV installation take?", a: ["Most home AV installations take between 1 and 5 days on site. A TV mounting job is usually finished in a few hours, while whole-home audio with concealed wiring takes several days. The bigger the house and the more rooms involved, the longer the job runs, so book your dates early. We can also accept same-day or last-minute installations depending on our availability."] },
        { q: "Do you install whole-home and multi-room audio?", a: ["Yes, whole-home and multi-room audio is one of the main systems Prime Line AV installs. We place speakers in the rooms you choose and group them into zones you control from one app. Play different audio in each room, or run the same music through the whole house."] },
        { q: "Do you install home theaters and smart home systems?", a: ["Yes, Prime Line AV designs and installs dedicated home theater rooms and full smart home systems alongside home audio and video. All 3 can be combined into one project, with one design, one schedule, one crew, and one point of contact responsible for the result."] },
        { q: "Do you install TVs and audio equipment I already own?", a: ["Yes, Prime Line AV can install client-bought AV equipment. You can buy your own TV, speakers, receiver, or streaming devices, and we will mount and wire them into your system, then set everything up before turnover."] },
        { q: "Does home AV installation come with a warranty?", a: ["Yes, every Prime Line AV installation comes with a workmanship warranty, whether the hardware is purchased through us or supplied by you. Manufacturer warranties on the equipment apply as well. After turnover, our technical support is just one call away if you need assistance with your system. Additional charges apply for support visits."] },
      ],
      callStrip: { title: "Still have more questions?", subtitle: "Ask us today!" },
    },
  ],
}
