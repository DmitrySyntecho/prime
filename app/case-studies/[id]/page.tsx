import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const caseStudies = {
  "usa-teqball-tour": {
    title: "USA Teqball Tour",
    location: "Long Beach Arena & Anaheim Convention Center",
    date: "2024",
    attendees: "5,000+",
    description:
      "The Teqball team reached out to us for full audiovisual production of their two sports events. From 2 events in the beginning, they decided to trust us with all 8 events in their entire USA tour.",
    fullDescription: `The USA Teqball Tour was an ambitious project that spanned multiple venues across the country. Our team provided comprehensive AV solutions including:

• Multi-camera live production with instant replay
• Large-format LED screens for audience viewing
• Professional audio systems for commentary and crowd engagement
• Live streaming to multiple platforms simultaneously
• Custom graphics and motion design for broadcasts

Working closely with Teqball USA, we developed a scalable production package that could be deployed quickly at each venue while maintaining broadcast-quality output.`,
    services: ["Video Production", "Audio Systems", "LED Walls", "Live Streaming", "Graphics"],
    testimonial: {
      name: "Daniel Szabo",
      role: "CEO of Teqball USA",
      quote:
        "I can always reach out to them, and whatever I ask, they never say no. They say 'we're going to do it and we're going to resolve it'.",
      image: "/placeholder.svg?height=80&width=80",
    },
    videoUrl: "/images/0105.mp4",
    heroImage: "/images/screenshot-202025-12-04-20at-2010.jpeg",
    gallery: [
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
    ],
  },
  "family-style-food-festival": {
    title: "Family Style Food Festival",
    location: "CBS Television City, Los Angeles",
    date: "2024",
    attendees: "5,000+",
    description:
      "For this event, we provided a complete DJ audio and video setup, including the world-class Pioneer CDJ 3000 and DJM A9.",
    fullDescription: `The Family Style Food Festival brought together food, music, and culture in an unforgettable experience. Our production included:

• Complete DJ audio system with Pioneer CDJ 3000 and DJM A9
• 40 high-definition TV screens throughout the venue
• Stage lighting design for multiple performance areas
• Ambient lighting to enhance the festival atmosphere
• Technical support throughout the 3-day event

We worked closely with the festival organizers to create an immersive audiovisual experience that complemented the culinary focus of the event.`,
    services: ["Audio Systems", "Video Displays", "Lighting Design", "DJ Equipment", "Technical Support"],
    testimonial: {
      name: "Miles Canares",
      role: "Co-founder of Family Style Food Festival",
      quote:
        "I really like how easy it is...I think what's important is being able to match vision with capability. That's really rare when working with a normal AV or rental company. These guys really kill it!",
      image: "/placeholder.svg?height=80&width=80",
    },
    videoUrl: "/images/0105.mp4",
    heroImage: "/images/screenshot-202025-12-04-20at-2010.jpeg",
    gallery: [
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
    ],
  },
  "corporate-summit-2024": {
    title: "Corporate Summit 2024",
    location: "San Francisco Convention Center",
    date: "2024",
    attendees: "2,000+",
    description:
      "A premium corporate event featuring multi-screen LED walls, professional lighting design, and live streaming capabilities.",
    fullDescription: `The Corporate Summit 2024 required a sophisticated AV setup to match the prestige of the event. Our comprehensive solution included:

• Dual LED video walls for main stage presentations
• Breakout room AV systems for workshops
• Professional audio with wireless microphone systems
• Live streaming to global offices
• Custom stage design and scenic elements

Our team managed all technical aspects, allowing the client to focus on content delivery and attendee experience.`,
    services: ["LED Walls", "Audio Systems", "Live Streaming", "Stage Design", "Lighting"],
    testimonial: {
      name: "Sarah Chen",
      role: "Events Director",
      quote:
        "The attention to detail and professionalism exceeded our expectations. Our virtual attendees felt just as engaged as those in the room.",
      image: "/placeholder.svg?height=80&width=80",
    },
    videoUrl: "/images/0105.mp4",
    heroImage: "/images/screenshot-202025-12-04-20at-2010.jpeg",
    gallery: [
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
      "/images/screenshot-202025-12-04-20at-2010.jpeg",
    ],
  },
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const study = caseStudies[id as keyof typeof caseStudies]

  if (!study) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <img src={study.heroImage || "/placeholder.svg"} alt={study.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

        {/* Back Button */}
        <Link
          href="/#case-studies"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{study.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {study.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {study.date}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {study.attendees} Attendees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Video */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <video src={study.videoUrl} poster={study.heroImage} controls className="w-full h-full object-cover" />
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-600 whitespace-pre-line">{study.fullDescription}</p>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {study.gallery.map((image, index) => (
                    <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${study.title} gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Services */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Services Provided</h3>
                <div className="flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 bg-white text-gray-700 text-sm rounded-md border border-gray-200"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gray-900 rounded-xl p-6 text-white">
                <p className="text-white/90 italic mb-6">"{study.testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={study.testimonial.image || "/placeholder.svg"}
                    alt={study.testimonial.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold">{study.testimonial.name}</p>
                    <p className="text-white/60 text-sm">{study.testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#FF2D6F] rounded-xl p-6 text-center">
                <h3 className="font-bold text-white text-xl mb-2">Ready to create your event?</h3>
                <p className="text-white/90 text-sm mb-4">Let's discuss your vision and bring it to life.</p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
