"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

const GRADIENT = "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 100%)"
const BTN = "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)"
const INPUT =
  "w-full py-4 px-6 rounded-xl text-lg text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[#FF2D6F]/40 transition-all"
const INPUT_STYLE = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }

const STEPS = [
  { id: "event-type", label: "Event Type" },
  { id: "budget", label: "Budget" },
  { id: "location", label: "Location" },
  { id: "details", label: "Details" },
]

const EVENT_TYPES = [
  { name: "Corporate Event", image: "/corporate-event-conference-stage-lighting.webp" },
  { name: "Experiential Marketing", image: "/experiential-marketing-brand-activation-booth.jpg" },
  { name: "Fashion Show", image: "/fashion-show-runway-lighting-models.jpg" },
  { name: "Trade Show", image: "/trade-show-exhibition-booth-display.jpg" },
  { name: "Brand Activation", image: "/brand-activation-event-interactive-display.jpg" },
  { name: "Conference", image: "/conference-presentation-stage-speakers.jpg" },
  { name: "Festival", image: "/music-festival-outdoor-stage-concert.jpg" },
  { name: "Wedding", image: "/wedding-reception-elegant-lighting-decor.jpg" },
  { name: "Award Show / Gala", image: "/award-show-gala-ceremony-stage-elegant.jpg" },
  { name: "Private Film Production", image: "/film-production-studio-camera-equipment.jpg" },
  { name: "Other", image: "/event-production-av-equipment-stage.jpg" },
]

const BUDGET_RANGES = [
  "$50K or more",
  "$30K - $50K",
  "$20K - $30K",
  "$15K - $20K",
  "$10K - $15K",
  "$7K - $10K",
  "$5K - $7K",
  "$3K - $5K",
  "$1K - $3K",
  "Under $1K",
]

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    eventType: "",
    budget: "",
    location: "",
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  })

  const handleEventTypeSelect = (type: string) => {
    setFormData({ ...formData, eventType: type })
    setCurrentStep(1)
  }

  const handleBudgetSelect = (budget: string) => {
    setFormData({ ...formData, budget: budget })
    setCurrentStep(2)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.location) {
      setCurrentStep(3)
    }
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Quote request submitted! We will contact you shortly.")
  }

  return (
    <div className="min-h-screen">
      <main className="px-6 py-12 md:py-16">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex gap-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className="h-1.5 flex-1 rounded-full transition-all duration-300"
                style={{
                  background: index <= currentStep ? GRADIENT : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
          <p className="text-center text-sm mt-3 text-[#FFB366] font-semibold uppercase tracking-wider">
            {STEPS[currentStep].label}
          </p>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto">
            {/* Step 1: Event Type */}
            {currentStep === 0 && (
              <div className="animate-fadeIn">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-balance text-white">
                  What type of event are you planning?
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type.name}
                      onClick={() => handleEventTypeSelect(type.name)}
                      className="group relative overflow-hidden rounded-xl transition-all hover:scale-[1.02] hover:ring-2 hover:ring-[#FF5E3A] bg-white/5 border border-white/10 aspect-[4/3]"
                    >
                      <Image
                        src={type.image || "/placeholder.svg"}
                        alt={type.name}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm md:text-base text-left">
                        {type.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="mt-12 flex justify-center">
                  <div className="rounded-full px-6 py-3 text-sm text-white/80" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                    <span className="text-[#FF5E3A] font-bold">127 Brands</span> requested a quote in the past 24 hours.
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-balance text-white">
                  What's your estimated budget?
                </h1>

                <div className="flex flex-col gap-3 max-w-md mx-auto">
                  {BUDGET_RANGES.map((budget) => (
                    <button
                      key={budget}
                      onClick={() => handleBudgetSelect(budget)}
                      className="py-4 px-6 rounded-xl text-lg font-semibold text-white transition-all hover:scale-[1.02] hover:border-[#FF5E3A]/40"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      {budget}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleBack}
                  className="flex items-center justify-center gap-2 mx-auto mt-8 text-sm font-bold uppercase tracking-wider text-white/60 transition-colors hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-balance text-white">
                  Where is your event located?
                </h1>
                <p className="text-center mb-10 text-gray-400">City or Zip Code</p>

                <form onSubmit={handleLocationSubmit} className="max-w-md mx-auto">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter city or zip code"
                    className={INPUT}
                    style={INPUT_STYLE}
                  />

                  <button
                    type="submit"
                    className="w-full mt-6 py-4 px-6 rounded-xl text-lg font-bold text-white transition-all hover:opacity-90"
                    style={{ background: BTN }}
                  >
                    Continue
                  </button>
                </form>

                <button
                  onClick={handleBack}
                  className="flex items-center justify-center gap-2 mx-auto mt-6 text-sm font-bold uppercase tracking-wider text-white/60 transition-colors hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </div>
            )}

            {/* Step 4: Contact Details */}
            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-balance text-white">
                  Almost there! Let's get your details.
                </h1>
                <p className="text-center mb-10 text-gray-400">We'll reach out with your personalized quote.</p>

                <form onSubmit={handleDetailsSubmit} className="max-w-md mx-auto space-y-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    required
                    className={INPUT}
                    style={INPUT_STYLE}
                  />

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address"
                    required
                    className={INPUT}
                    style={INPUT_STYLE}
                  />

                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number"
                    required
                    className={INPUT}
                    style={INPUT_STYLE}
                  />

                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className={INPUT}
                    style={INPUT_STYLE}
                  />

                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your event (optional)"
                    rows={3}
                    className={`${INPUT} resize-none`}
                    style={INPUT_STYLE}
                  />

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl text-lg font-bold text-white transition-all hover:opacity-90"
                    style={{ background: BTN }}
                  >
                    Get My Quote
                  </button>
                </form>

                <button
                  onClick={handleBack}
                  className="flex items-center justify-center gap-2 mx-auto mt-6 text-sm font-bold uppercase tracking-wider text-white/60 transition-colors hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {/* Social Proof */}
                <div className="mt-10 flex justify-center">
                  <div className="rounded-full px-6 py-3 text-sm text-white/80" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                    <span className="text-[#FF5E3A] font-bold">1,986 Events</span> produced successfully this year.
                  </div>
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  )
}
