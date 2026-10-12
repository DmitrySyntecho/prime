import type { Deck } from "@/lib/copy/deck-types"

/* ClickUp "Smart Home Installation page - Prime Line AV" (8cr40gk-39417), verbatim.
   Deck links → site routes: /av-installations/home-audio-video-installation/ → /av-installations/home-audio-video-installation,
   /av-installations/home-theater-installation/ → /av-installations/home-theater-installation,
   /locations/ → /locations, /av-installations/ → /av-installations.
   Card hrefs without a deck link: Home automation and control → the /av-installations hub (no dedicated automation route),
   Networking and security → /av-installations/video-installation.
   The deck has no trust strip on this page: the stats repeat the Home AV deck's strip.
   Block 06 has no eyebrow in the deck ("Why Prime Line AV" used). No quote-form slug exists for installations. */
export const smartHomeInstallation: Deck = {
  clickupId: "8cr40gk-39417",
  path: "/av-installations/smart-home-installation",
  h1: "Smart Home Installation Service in the United States",
  accent: "Smart Home Installation",
  pill: "Automation · Audio & video · Home theater · Networking",
  lede: "Prime Line AV is a smart home installation company that designs ==connected lighting, climate controls, home AV, and compatible security systems== for homeowners nationwide.",
  bullets: [
    { icon: "installation", text: "Whole-home automation, from a single smart room to the entire house" },
    { icon: "headset", text: "One dedicated project manager who runs your project and trains your family on the system" },
    { icon: "content-play", text: "Smart home brands like Samsung SmartThings, Google Nest, Apple Home, and Amazon Alexa, installed and set up for you" },
    { icon: "render-3d", text: "Free 3D render of your smart home design before you spend a dollar on equipment" },
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
      id: "setup",
      eyebrow: "Tired of being the family's tech support?",
      title: "Let our smart home installation company handle the setup",
      accent: "handle the setup",
      lede: [
        "Prime Line AV provides full-service smart home installation, including lights, thermostats, speakers, TVs, and security devices set up in your house. ==We can automate one room or the whole house==, in new construction or a home you've lived in for years. We can install smart home devices you already have, or we can source all the hardware together with the installation for you.",
        "The real test of a smart home is how easily everyone can use it day to day. ==We program and label everything so your family can run the house without calling you first.== If you run into a technical issue later, call us, and we'll send a technician to your house.",
      ],
      listTitle: "What your smart home installation can include:",
      items: [
        { icon: "tv-display", text: "TV, speaker, and media room integration with your smart home controls" },
        { icon: "moving-head", text: "Smart lighting with dimmers, keypads and wall switches wired in place" },
        { icon: "setup-tools", text: "Smart thermostat and climate control setup" },
        { icon: "microphone", text: "Voice control setup for hands-free commands around the house" },
        { icon: "shield", text: "Smart locks, video doorbells, cameras, and motion sensors" },
        { icon: "calendar", text: "Scene and schedule programming for your daily routines" },
        { icon: "live-stream", text: "Whole-home Wi-Fi and network setup for reliable coverage" },
      ],
      secondary: { label: "Tell us about your space" },
    },
    // Block 04
    {
      type: "cards",
      id: "services",
      eyebrow: "What we install",
      title: "What's included in our smart home installation service",
      accent: "smart home installation service",
      cols: 4,
      items: [
        {
          title: "Home automation and control",
          href: "/av-installations",
          image: "/images/installations/smart-home.webp",
          icon: "content-play",
          body: "We connect your smart devices to one hub and set up control from your phone or a wall panel. ==Our team programs the automation around how your family uses each room.==",
        },
        {
          title: "Home audio and video",
          href: "/av-installations/home-audio-video-installation",
          image: "/images/installations/home-audio-video.webp",
          icon: "speaker",
          body: "Every speaker and screen in the house is covered by our [home audio video installation](/av-installations/home-audio-video-installation) service, ==from a multi-room sound system to the TV above the fireplace.==",
        },
        {
          title: "Home theater",
          href: "/av-installations/home-theater-installation",
          image: "/images/installations/home-theater.webp",
          icon: "projector",
          body: "Want a real movie room? We design and build dedicated theater rooms through our [home theater installation](/av-installations/home-theater-installation) service and ==tie them into the rest of your smart home.==",
        },
        {
          title: "Networking and security",
          href: "/av-installations/video-installation",
          image: "/images/installations/audio.webp",
          icon: "shield",
          body: "==A smart home is only as reliable as the network behind it.== We set up home networking, Wi-Fi coverage, security cameras, and smart locks, and we program them to work together with the rest of your system.",
        },
      ],
    },
    {
      type: "products",
      categories: ["tv", "sound-systems", "lighting"],
      heading: { eyebrow: "Need it for one event?", title: "Rent the same gear we install", accent: "the same gear" },
      lede: "TVs, sound systems and lighting from our own inventory are also available to rent for a single event: add what you need to your quote, and our team will confirm availability and ==send you an itemized price.==",
    },
    // Block 05
    {
      type: "steps",
      id: "process",
      eyebrow: "Our process",
      title: "How we design and install your smart home",
      accent: "your smart home",
      items: [
        { icon: "headset", title: "Request and consultation", body: "Send us a request or give us a call. We'll discuss what you want to automate in your home and the devices you have in mind." },
        { icon: "clipboard", title: "Site survey", body: "Our team visits your home and checks your rooms, wiring paths, Wi-Fi coverage, and the equipment you already own." },
        { icon: "render-3d", title: "Design and estimate", body: "Our technicians prepare your smart home design with a free 3D render and a custom estimate. We order nothing until you approve both." },
        { icon: "calendar", title: "Scheduling and prep", body: "We order the equipment and book your installation dates around your family's schedule." },
        { icon: "installation", title: "Installation and commissioning", body: "Our installers mount, wire, connect, and program every device, then power up the system room by room." },
        { icon: "shield", title: "Testing and walkthrough", body: "We walk through every function with you in the room, and we don't leave until you're happy with how everything works." },
        { icon: "award", title: "Turnover and training", body: "Lastly, we turn over your system with full documentation and training for everyone in the household." },
      ],
    },
    // Block 06
    {
      type: "reasons",
      id: "why-us",
      eyebrow: "Why Prime Line AV",
      title: "Why choose Prime Line AV for smart home installation",
      accent: "smart home installation",
      items: [
        { title: "Nationwide coverage and support", icon: "location-pin", body: "We install smart home systems coast to coast, with ==convenient technical support for as long as you have your setup.== See our [locations](/locations) to check where we are available." },
        { title: "One accountable team", icon: "walkie-talkie", body: "The same company designs, installs, programs, and services your smart home system, so ==you never get handed off between contractors.==" },
        { title: "Commercial-grade quality at home", icon: "installation", body: "Prime Line AV delivers ==the same quality of technology installation to your residence== as we do for the offices and venues we have serviced in the past 15 years." },
        { title: "Licensed and insured installers", icon: "shield", body: "Our installers are licensed and certified, and we carry insurance with ==COIs ready if your HOA or builder asks for paperwork.==" },
        { title: "Everything AV under one roof", icon: "sound-console", body: "Smart homes are one part of what we do. ==If your business ever needs commercial work==, we handle the full range of [AV installation](/av-installations) services as well." },
      ],
    },
    // Block 07
    {
      type: "prose",
      id: "whole-family",
      eyebrow: "Not everyone in your household may be tech-savvy",
      title: "Get a smart home automation your whole family can actually use",
      accent: "your whole family can actually use",
      paragraphs: [
        "As homeowners ourselves, we know how easy it is to accumulate smart devices. A smart bulb on sale, a video doorbell as a gift, a speaker, or a thermostat during a heat wave. Before you know it, ==you have a pile of disconnected devices and a home that's still \"not smart enough.\"==",
        "Prime Line AV plans and programs your smart home automation as one complete system, ==from the control hub down to the last light switch.== We coordinate and interconnect your smart devices so each one actually serves its purpose.",
        "Our technicians can advise you on which devices fit your home best, help you trim down a collection that got out of hand, or source everything new if you're just switching to a smart home. ==Tell us how you want each room to work, and we set it up exactly that way.==",
        "Before we leave, all your smart devices are fully set up and ==ready to control from your smartphone==, so there's no juggling a different app for every device. We also train your family on the new system, and if you ever need technical support for your brand-new smart home system, we're just a call away.",
      ],
      image: "/images/installations/smart-home.webp",
      imageAlt: "Living room with a smart home control tablet, automated lighting and shades",
      secondary: { label: "Request a consultation" },
    },
    // Block 08
    { type: "testimonials", eyebrow: "Prime Line AV testimonials", title: "What clients say about our work", accent: "our work" },
    // Block 09
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Smart home installation FAQs",
      accent: "FAQs",
      items: [
        { q: "What is smart home installation?", a: ["Smart home installation is the professional setup of connected lighting, heating and cooling, entertainment and security equipment in a house, programmed to run from shared controls. A smart home installation company like Prime Line AV handles the planning, cabling, device setup, and final system testing, so everything is ready to use on day one."] },
        { q: "How much does smart home installation cost?", a: ["Smart home installation typically costs between $1,000 and $50,000+, depending on home size and how many systems are included. The more rooms you automate, the higher the cost. To get a free estimate, send us your project details, and our project manager will give you a quote in as little as 30 minutes."] },
        { q: "Which smart home platforms do you install?", a: ["Prime Line AV installs and sets up smart home platforms like Samsung SmartThings, Google Nest, Apple Home, and Amazon Alexa, as well as dedicated smart home controllers. Our team configures every device to run on the platform you choose, and we recommend one if you're starting from scratch or switching systems."] },
        { q: "Can you make an existing home smart?", a: ["Yes, Prime Line AV can turn a home you already live in into a smart home without major construction. Our smart home installers route cable through the attic, the basement, the garage, and closets, and use wireless devices where running wire is not practical. Many devices simply replace your existing switches and thermostats."] },
        { q: "How long does smart home installation take?", a: ["Smart home installation usually takes between 1 and 5 days. A single-room setup can be finished in a day, and the more rooms and systems you add, the longer the job takes. Ordering your devices can add to the lead time, so book your installation dates early once your design is approved."] },
        { q: "What can be automated in a smart home?", a: ["Almost every electronic device in a house can be automated in a smart home, including lighting, temperature, music, TVs, cameras, and door locks. Prime Line AV programs each of these to follow the routines you choose, so one tap dims the lights for a movie or locks the doors at bedtime."] },
        { q: "Does smart home installation come with a warranty?", a: ["Yes, every Prime Line AV smart home installation is covered by a workmanship warranty, whether we supplied the equipment or you bought it yourself. Manufacturer warranties protect the hardware on top of that. If anything stops working the way it should, our technical support is just one call away. Additional charges apply for support visits."] },
        { q: "Do you install smart home systems in new construction?", a: ["Yes, Prime Line AV installs smart home systems in new construction as well as finished homes. Working during the build lets us run wiring before the walls close and coordinate directly with your builder's schedule. Send us your floor plan early, and we'll plan the smart home design around it."] },
      ],
      callStrip: { title: "Still have more questions?", subtitle: "Ask us today!" },
    },
  ],
}
