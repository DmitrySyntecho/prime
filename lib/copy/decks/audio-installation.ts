import type { Deck } from "@/lib/copy/deck-types"

/* ClickUp "Audio Installation page - Prime Line AV" (8cr40gk-39257), verbatim.
   Deck links → site routes: /av-installations/commercial-audio-video-installation,
   /av-installations/home-audio-video-installation, /av-installations/video-installation
   and /av-installations as-is; /av-rental/ → /av-rental, /locations/ → /locations,
   /contacts/ → /quote. Eyebrows the deck leaves out (Blocks 04, 06, 09) are plain
   section labels. Card photos are permanent-install renders (public/images/installations). */
export const audioInstallation: Deck = {
  clickupId: "8cr40gk-39257",
  path: "/av-installations/audio-installation",
  h1: "Audio Installation Service in the United States",
  accent: "Audio Installation Service",
  pill: "Commercial · Residential · Nationwide",
  lede: "Prime Line AV is an audio installation company for commercial and residential spaces. We provide ==full-service sound systems for offices, venues, retail floors, and homes nationwide.==",
  bullets: [
    { icon: "clipboard", text: "Survey, design, installation, and tuning are included on every project." },
    { icon: "installation", text: "15 years of installing permanent commercial and residential AV." },
    { icon: "award", text: "Documentation and training at handover, so your team can run the system from day 1." },
    { icon: "speaker", text: "Premium audio brands, including L-Acoustics, Bose, Shure, Sennheiser, QSC, Sonos, & more" },
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
  clips: ["sound-system-rental", "home-3"],
  blocks: [
    // Block 03
    {
      type: "prose",
      id: "fixed-sound-systems",
      eyebrow: "Better meetings. Better movies. Better sound everywhere else.",
      title: "Trusted audio installation company for fixed sound systems",
      accent: "fixed sound systems",
      paragraphs: [
        "Prime Line AV provides permanent audio installation for commercial and residential spaces nationwide. We install in any venue, including offices, conference rooms, restaurants, retail floors, houses of worship, and homes. Every package includes the speakers, amplifiers, microphones, cabling, and controls, ==built as one system for your space.==",
        "If different rooms need their own sound, we build zoning into the design, so you can control each area's audio on its own. The licensed technicians who survey your space also install and tune your system, so ==you deal with one company from the first walkthrough to the final test.== After installation, we hand over the documentation and train your staff, so your team can run the new system right away.",
      ],
      image: "/images/installations/audio.webp",
      imageAlt: "Restaurant and bar with a permanently installed sound system",
      secondary: { label: "Request a consultation" },
    },
    // Block 04
    {
      type: "cards",
      id: "what-we-install",
      eyebrow: "Installation services",
      title: "What we install",
      accent: "What we install",
      lede: "Whether it is background music for a retail floor or a sound system for a 1,000-seat venue, ==we design and install an audio system sized for your space.==",
      cols: 4,
      items: [
        {
          title: "Commercial Sound Systems",
          href: "/av-installations/commercial-audio-video-installation",
          image: "/images/services/permanent-av.webp",
          icon: "sound-console",
          body: "==Speaker layouts, amplifiers, zoning, and volume control== for offices, restaurants, retail floors, and venues. For spaces that need video too, we offer full [commercial audio video installation](/av-installations/commercial-audio-video-installation).",
        },
        {
          title: "Home Audio Systems",
          href: "/av-installations/home-audio-video-installation",
          image: "/images/installations/home-audio-video.webp",
          icon: "speaker",
          body: "Multi-room home audio installation, ==from a single living room to speakers wired through the whole house.== If you want a full home theater setup, we also offer a [home audio video installation](/av-installations/home-audio-video-installation) package.",
        },
        {
          title: "Conference Room Audio",
          href: "/av-installations/video-installation",
          image: "/images/installations/video.webp",
          icon: "microphone",
          body: "We install ==full microphone and speaker setups== for meeting rooms and conference rooms of any size. We can also pair it with [video installation](/av-installations/video-installation) for your presentations and video calls.",
        },
        {
          title: "AV Equipment Rental",
          href: "/av-rental",
          image: "/images/services/sound-system.webp",
          icon: "flight-case",
          body: "Need sound for just 1 event? If a permanent installation is not what you need right now, we offer [AV equipment rental](/av-rental), including ==speakers, mixers, microphones, and full PA systems== for events of any size.",
        },
      ],
    },
    {
      type: "products",
      category: "sound-systems",
      heading: { eyebrow: "Need it for one event?", title: "Rent the same gear we install", accent: "the same gear" },
      lede: "Rent the speakers, mixers, microphones and PA systems we install for a single event, and our team will confirm availability and ==send you an itemized price.==",
    },
    // Block 05
    {
      type: "steps",
      id: "process",
      eyebrow: "Our process",
      title: "How Prime Line AV handles an audio installation",
      accent: "an audio installation",
      items: [
        { icon: "headset", title: "Request and consultation", body: "Tell us about your space and how you plan to use it. We ask about room size, purpose, schedule, and budget before anything else." },
        { icon: "clipboard", title: "Site survey", body: "We measure the space and check the acoustics, the power, the cable paths, and the mounting points." },
        { icon: "render-3d", title: "Design and quote", body: "You get a system design and a quote covering scope, equipment list, timeline, and price." },
        { icon: "delivery-truck", title: "Prep and logistics", body: "We order the equipment and schedule the install for a time that works for you, including after-hours work when the building has to stay open." },
        { icon: "installation", title: "Installation", body: "Our crew runs the cable, mounts the speakers, installs the rack, and brings the system online." },
        { icon: "sound-console", title: "Tuning and testing", body: "We tune the system to the room, test every zone, fix anything that is off, and walk you through the controls." },
        { icon: "award", title: "Handover and support", body: "You get system documentation and training for the people who will run it. We provide ongoing technical support for as long as you have the system." },
      ],
    },
    // Block 06
    {
      type: "reasons",
      id: "why-us",
      eyebrow: "Why Prime Line AV",
      title: "Why choose Prime Line AV as your audio installation company",
      accent: "audio installation company",
      items: [
        { title: "Nationwide installation service", icon: "location-pin", body: "We provide audio installation ==all over the United States, for any venue or space you have.== See our [locations](/locations) to find where we work, or [contact us](/quote) to set up a site visit." },
        { title: "One company from plans to installation", icon: "walkie-talkie", body: "The same company handles your audio system design and installation. The crew that plans your system is the crew that installs it and stays on call for technical assistance, ==with no handoffs between contractors.==" },
        { title: "Insurance and COIs ready", icon: "shield", body: "Prime Line AV carries insurance and provides certificates of insurance for buildings and venues that require them. Since we keep them ready, coordination with your venue is fast and simple. ==Every audio package also comes with a warranty.==" },
        { title: "One team for everything AV", icon: "flight-case", body: "Aside from audio, we also handle [video installation](/av-installations/video-installation) for displays and meeting rooms. ==If you want both covered in one project==, we offer a full [audio visual installation](/av-installations) package." },
      ],
    },
    // Block 07
    {
      type: "prose",
      id: "clear-sound",
      eyebrow: "Do people keep saying, \"Can you say that louder?\"",
      title: "Our audio installation service brings clear sound into every corner",
      accent: "clear sound into every corner",
      paragraphs: [
        "Prime Line AV designs and installs audio systems that deliver crystal-clear sound across your whole space. Our technicians map speaker coverage to the shape of your room, so every seat hears the same volume. In bigger venues, we add delay speakers and tune them through a DSP, so ==people in the back hear speech as clearly as the front row.== No more annoying echo, dead spots, feedback, or muffled speech.",
        "As a professional audio installation company, we can source and install top audio brands, including L-Acoustics, Shure, QSC, and Sennheiser. Before installation begins, ==we can also give you a free 3D render of your audio design==, so you can see how the system will look in your venue. Every install comes with labeled cable runs, clean terminations, documented signal flow, and a set gain structure, so any technician can service the system years from now.",
        "If your office or venue needs displays and video conferencing along with the sound system, we also provide [commercial audio video installation](/av-installations/commercial-audio-video-installation). The same goes at home: if you are planning a theater room or whole-home audio, our [home audio video installation](/av-installations/home-audio-video-installation) team ==designs the audio and the video as one system.==",
      ],
      image: "/images/installations/home-theater.webp",
      imageAlt: "Home theater room with a permanently installed surround sound system",
      secondary: { label: "Request a consultation" },
    },
    // Block 08
    { type: "testimonials", eyebrow: "Prime Line AV testimonials", title: "What clients say about our work", accent: "our work" },
    // Block 09
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Audio installation FAQs",
      accent: "FAQs",
      items: [
        { q: "What does an audio installation company do?", a: ["An audio installation company designs and installs fixed sound systems in commercial and residential buildings. The work covers speaker layout, amplification, microphones, zoning and control, plus the tuning that makes the system fit the room. Prime Line AV offers building audio, not car audio."] },
        { q: "Do you install audio systems for both commercial and residential spaces?", a: ["Yes, Prime Line AV installs audio systems in both commercial and residential spaces. On commercial installations, we work on offices, conference rooms, restaurants, retail floors, and venues. Meanwhile, in residential spaces, we often install multi-room home audio and home theater systems. The process is the same either way: survey, design, installation, tuning, and documentation."] },
        { q: "How much does audio installation cost?", a: ["Audio installation costs range from $2,000 for a single room to $30,000 or more for multi-zone systems. Actual cost depends on room size, zone count, equipment, and building condition. For a detailed estimate, contact us at Prime Line AV to set up a site survey, and our project manager will discuss the specifics with you."] },
        { q: "How long does audio installation take?", a: ["Most audio installations take between 1 and 5 days to complete. Single-room systems are often finished in 1 day, while multi-zone venues can take a week or longer, depending on the cabling work and your operating hours. Our project manager will confirm the schedule in your quote and pick the timing that works for you."] },
        { q: "Do you provide audio installation nationwide?", a: ["Yes, Prime Line AV provides audio installation nationwide across the United States for commercial and residential clients. We install audio systems in venues of any size, coast to coast. Check our locations page to see the areas we serve. If your city is not listed, contact us, and we will confirm coverage for your project."] },
        { q: "Do you provide warranty and support after installation?", a: ["Yes, Prime Line AV provides warranty and support on every audio installation. Depending on your package, this includes the manufacturer's warranty on the equipment and our satisfaction warranty on the work. You also get documentation and staff training at handover, plus ongoing technical support (additional charges apply) for as long as you have the system."] },
        { q: "Do you install car audio?", a: ["No, Prime Line AV does not install car audio or work on vehicles. Our audio installation service covers buildings such as offices, venues, retail spaces, and homes."] },
      ],
      callStrip: { title: "Still have more questions?", subtitle: "Ask us today!" },
    },
  ],
}
