"use client"

import type React from "react"
import { createPortal } from "react-dom"
import { useEffect, useMemo, useRef, useState } from "react"
import { PHONE_DISPLAY, PHONE_TEL_INTL, WHATSAPP_HREF } from "@/lib/contact"
import { validateEmail } from "@/lib/validation/email"
import { validateUSPhoneNumber, formatPhoneNumber } from "@/lib/validation/phone"
import { performAntiSpamCheck, checkSubmissionTiming } from "@/lib/validation/anti-spam"
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Calendar,
  CalendarClock,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Sparkles,
  Layers,
  Volume2,
  Monitor,
  Lightbulb,
  Box,
  Radio,
  Video,
  PartyPopper,
  CheckCircle2,
  Briefcase,
  Mic2,
  Trophy,
  Camera,
  Music,
  Building2,
  ShoppingBag,
  Gem,
  Tag,
  MessageSquare,
  Shield,
  Search,
  ChevronDown,
  Lock,
  Home,
} from "lucide-react"

interface QuoteFormProps {
  isOpen: boolean
  onClose: () => void
  serviceName?: string
  serviceQuestions?: unknown[]
  serviceSlug?: string
  eventTypeId?: string
}

// Maps service page slug → serviceOptions id
const SERVICE_SLUG_MAP: Record<string, string> = {
  "stage-rental": "staging",
  "sound-system-rental": "audio",
  "lighting-rental": "lighting",
  "full-av-production": "full-av",
  "tv-rental": "led",
  "projector-screen-rental": "led",
  "pipe-drape-rental": "drape",
  "led-screen-rental": "led",
  // Miami variants
  "stage-rental-miami": "staging",
  "sound-system-rental-miami": "audio",
  "lighting-rental-miami": "lighting",
  "full-av-production-miami": "full-av",
  "tv-rental-miami": "led",
  "projector-screen-rental-miami": "led",
  "pipe-drape-rental-miami": "drape",
  "led-screen-rental-miami": "led",
  // Orlando variants
  "stage-rental-orlando": "staging",
  "sound-system-rental-orlando": "audio",
  "lighting-rental-orlando": "lighting",
  "full-av-production-orlando": "full-av",
  "tv-rental-orlando": "led",
  "projector-screen-rental-orlando": "led",
  "pipe-drape-rental-orlando": "drape",
  "led-screen-rental-orlando": "led",
}

/* ============ DATA ============ */

const eventTypes = [
  { id: "corporate", label: "Corporate Event", icon: Briefcase },
  { id: "conference", label: "Conference", icon: Mic2 },
  { id: "trade-show", label: "Trade Show", icon: ShoppingBag },
  { id: "brand-activation", label: "Brand Activation", icon: Sparkles },
  { id: "experiential", label: "Experiential Marketing", icon: Layers },
  { id: "fashion-show", label: "Fashion Show", icon: Gem },
  { id: "festival", label: "Festival / Concert", icon: Music },
  { id: "product-launch", label: "Product Launch", icon: Trophy },
  { id: "gala", label: "Award Show / Gala", icon: Trophy },
  { id: "private", label: "Private / Wedding", icon: PartyPopper },
  { id: "studio", label: "Studio / Film", icon: Camera },
  { id: "other", label: "Other", icon: Layers },
]

const serviceOptions = [
  { id: "full-av", title: "Full AV Production", icon: Layers },
  { id: "led", title: "LED Wall / Visuals", icon: Monitor },
  { id: "audio", title: "Sound System", icon: Volume2 },
  { id: "lighting", title: "Event Lighting", icon: Lightbulb },
  { id: "staging", title: "Staging & Truss", icon: Box },
  { id: "stream", title: "Live Streaming", icon: Radio },
  { id: "video", title: "Video Production", icon: Video },
  { id: "drape", title: "Pipe & Drape", icon: Building2 },
]

interface Country {
  code: string
  dial: string
  name: string
  flag: string
  format?: string // "(###) ###-####" for US/CA
}

const countries: Country[] = [
  { code: "US", dial: "+1", name: "United States", flag: "🇺🇸", format: "(###) ###-####" },
  { code: "CA", dial: "+1", name: "Canada", flag: "🇨🇦", format: "(###) ###-####" },
  { code: "MX", dial: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "GB", dial: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "FR", dial: "+33", name: "France", flag: "🇫🇷" },
  { code: "DE", dial: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "IT", dial: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "ES", dial: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "PT", dial: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "NL", dial: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "BE", dial: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "CH", dial: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "AT", dial: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "IE", dial: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "SE", dial: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", dial: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "DK", dial: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", dial: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "PL", dial: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "CZ", dial: "+420", name: "Czechia", flag: "🇨🇿" },
  { code: "AU", dial: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "NZ", dial: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "JP", dial: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "KR", dial: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "IN", dial: "+91", name: "India", flag: "🇮🇳" },
  { code: "BR", dial: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "AR", dial: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "ZA", dial: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "AE", dial: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "SG", dial: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "IL", dial: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "UA", dial: "+380", name: "Ukraine", flag: "🇺🇦" },
  { code: "RU", dial: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "TR", dial: "+90", name: "Türkiye", flag: "🇹🇷" },
]

const usStates = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
]

const totalSteps = 9
const stepNames = [
  "Event Type",
  "Services",
  "Your Name",
  "Phone",
  "Email",
  "Schedule",
  "Location",
  "Notes",
  "Review",
]

interface FormData {
  eventType: string
  services: string[]
  firstName: string
  lastName: string
  phoneCountry: string
  phone: string
  hasWhatsapp: boolean
  waCountry: string
  waPhone: string
  email: string
  dropoffDate: string
  dropoffTime: string
  pickupDate: string
  pickupTime: string
  address: string
  address2: string
  city: string
  state: string
  zip: string
  bestTime: string
  message: string
  promoCode: string
  dateTbd: boolean
  agreeTerms: boolean
  optInCall: boolean
  optInSms: boolean
  honeypot: string
}

const empty: FormData = {
  eventType: "",
  services: [],
  firstName: "",
  lastName: "",
  phoneCountry: "US",
  phone: "",
  hasWhatsapp: false,
  waCountry: "US",
  waPhone: "",
  email: "",
  dropoffDate: "",
  dropoffTime: "",
  pickupDate: "",
  pickupTime: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  bestTime: "",
  message: "",
  promoCode: "",
  dateTbd: false,
  agreeTerms: false,
  optInCall: false,
  optInSms: false,
  honeypot: "",
}

/* ============ PHONE VALIDATION ============ */

function validatePhoneForCountry(phone: string, countryCode: string): { isValid: boolean; error?: string } {
  const digits = phone.replace(/\D/g, "")
  const country = countries.find((c) => c.code === countryCode)
  if (country?.format) {
    // US / CA — use strict 10-digit validator
    return validateUSPhoneNumber(phone)
  }
  // International: E.164 allows 7–15 digits
  if (digits.length < 7) return { isValid: false, error: "Phone number is too short" }
  if (digits.length > 15) return { isValid: false, error: "Phone number is too long" }
  return { isValid: true }
}

/* ============ NAME VALIDATION ============ */

const FAKE_NAMES = new Set([
  "test","tester","testing","tested",
  "asdf","qwerty","qwert","zxcv","zxcvb","zxcvbn",
  "fake","false","none","null","na","n/a","nope","no",
  "abc","xyz","aaa","bbb","ccc","ddd","eee","fff",
  "xxx","yyy","zzz","qqq","www","eee","rrr","ttt",
  "foo","bar","baz","foobar",
  "name","user","admin","guest","anon","anonymous",
])

function validateName(value: string): { isValid: boolean; error?: string } {
  const v = value.trim().toLowerCase()
  if (v.length < 2) return { isValid: false, error: "Too short" }
  if (FAKE_NAMES.has(v)) return { isValid: false, error: "Please enter your real name" }
  // all same characters: aaa, bbbb
  if (/^(.)\1+$/.test(v)) return { isValid: false, error: "Please enter your real name" }
  // Latin keyboard rows
  if (/[qwerty]{4,}|[asdfgh]{4,}|[zxcvbn]{4,}/i.test(v))
    return { isValid: false, error: "Please enter your real name" }
  // Cyrillic keyboard rows (й-ц-у-к / ф-ы-в-а / я-ч-с-м)
  if (/[йцукенгшщзх]{4,}|[фывапролджэ]{4,}|[ячсмитьбю]{4,}/i.test(v))
    return { isValid: false, error: "Please enter your real name" }
  // repeating substring pattern: фывфыв, asdasd, abcabc
  if (/^(.{2,6})\1+$/.test(v))
    return { isValid: false, error: "Please enter your real name" }
  return { isValid: true }
}

/* ============ PHONE INPUT MASKING ============ */

function formatPhone(raw: string, country: Country): string {
  const digits = raw.replace(/\D/g, "")
  if (country.format) {
    let out = ""
    let di = 0
    for (const ch of country.format) {
      if (di >= digits.length) break
      if (ch === "#") {
        out += digits[di++]
      } else {
        out += ch
      }
    }
    return out
  }
  // Generic: groups of 3-3-4 etc.
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 13)}`
}

/* ============ COMPONENT ============ */

const CTM_URL =
  "https://api.calltrackingmetrics.com/api/v1/formreactor/FRT472ABB2C5B9B141AF5CC9D8A09C2CC812153956096F45ED6DE27A3624E9F41F9?key=VJVuWkEx9OXra7ApyAzUaKcyunMtBl40M65STROT_F0ML4vb"

export function QuoteForm({ isOpen, onClose, serviceSlug, eventTypeId }: QuoteFormProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(empty)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null)
  const [phoneSuggestion, setPhoneSuggestion] = useState<string | null>(null)
  const formStartTime = useRef<number | null>(null)

  useEffect(() => {
    if (!isOpen) return
    // Track form start time for anti-spam check
    if (!formStartTime.current) {
      formStartTime.current = Date.now()
    }
    document.body.style.overflow = "hidden"
    document.body.classList.add("modal-open")
    return () => {
      document.body.style.overflow = ""
      document.body.classList.remove("modal-open")
    }
  }, [isOpen])

  // Which steps are pre-filled and should be skipped
  const skippedSteps = useMemo(() => {
    const s = new Set<number>()
    if (eventTypeId) s.add(1)
    if (serviceSlug && SERVICE_SLUG_MAP[serviceSlug]) s.add(2)
    return s
  }, [eventTypeId, serviceSlug])

  // Pre-fill data and jump to first non-skipped step when form opens
  useEffect(() => {
    if (!isOpen) return
    if (eventTypeId) setData((d) => ({ ...d, eventType: eventTypeId }))
    if (serviceSlug) {
      const serviceId = SERVICE_SLUG_MAP[serviceSlug]
      if (serviceId) setData((d) => ({ ...d, services: [serviceId] }))
    }
    // Start at the first step that wasn't pre-filled
    let startStep = 1
    while (skippedSteps.has(startStep)) startStep++
    setStep(startStep)
  }, [isOpen, eventTypeId, serviceSlug, skippedSteps])

  if (!isOpen) return null

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }))
  }

  const toggleService = (id: string) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(id) ? d.services.filter((s) => s !== id) : [...d.services, id],
    }))
  }

  const goNext = () => {
    let next = step + 1
    while (next < totalSteps && skippedSteps.has(next)) next++
    setStep(next)
  }

  const goBack = () => {
    if (step > 1) setStep(step - 1)
    else onClose()
  }

  const canContinue = () => {
    if (step === 1) return !!data.eventType
    if (step === 2) return data.services.length > 0
    if (step === 3) return validateName(data.firstName).isValid && validateName(data.lastName).isValid
    if (step === 4) return validatePhoneForCountry(data.phone, data.phoneCountry).isValid
    if (step === 5) {
      const emailValidation = validateEmail(data.email)
      return emailValidation.isValid
    }
    if (step === 6) return data.dateTbd || (!!data.dropoffDate && !!data.dropoffTime && !!data.pickupDate && !!data.pickupTime)
    if (step === 7) return data.address.trim().length >= 5 && data.city.trim().length >= 2 && !!data.state && data.zip.trim().length === 5
    if (step === 8) return !!data.bestTime
    if (step === 9) return data.agreeTerms && data.optInCall && data.optInSms
    return false
  }

  const handleSubmit = async () => {
    if (data.honeypot) return

    if (formStartTime.current) {
      const timingCheck = checkSubmissionTiming(formStartTime.current, 3)
      if (timingCheck.isSpam) {
        setErrors({ submit: timingCheck.reason || "Submission too fast" })
        return
      }
    }

    const phoneValidation = validateUSPhoneNumber(data.phone)
    if (!phoneValidation.isValid) {
      setErrors((e) => ({ ...e, phone: phoneValidation.error || "Invalid phone" }))
      return
    }

    const emailValidation = validateEmail(data.email)
    if (!emailValidation.isValid) {
      setErrors((e) => ({ ...e, email: emailValidation.error || "Invalid email" }))
      if (emailValidation.suggestion) setEmailSuggestion(emailValidation.suggestion)
      return
    }

    setErrors({})
    setEmailSuggestion(null)
    setPhoneSuggestion(null)
    setSubmitting(true)

    try {
      const phoneCountry = countries.find((c) => c.code === data.phoneCountry) || countries[0]
      const countryCode = phoneCountry.dial.replace("+", "")
      const eventLabel = eventTypes.find((e) => e.id === data.eventType)?.label || data.eventType
      const servicesList = data.services
        .map((id) => serviceOptions.find((o) => o.id === id)?.title)
        .filter(Boolean)
        .join(", ")
      const fullAddress = [data.address, data.address2, `${data.city}, ${data.state} ${data.zip}`]
        .filter(Boolean)
        .join(", ")

      const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
        return match ? decodeURIComponent(match[2]) : null
      }

      const payload = new FormData()
      payload.append("caller_name", `${data.firstName} ${data.lastName}`.trim())
      payload.append("phone_number", data.phone)
      payload.append("country_code", countryCode)
      payload.append("email", data.email)
      payload.append("message", `New quote request from ${data.firstName} ${data.lastName} — ${eventLabel} | Services: ${servicesList}`)
      payload.append("custom_fields[event_type]", eventLabel)
      payload.append("custom_fields[services]", servicesList)
      payload.append("custom_fields[dropoff]", data.dateTbd ? "TBD" : `${data.dropoffDate} ${data.dropoffTime}`)
      payload.append("custom_fields[pickup]", data.dateTbd ? "TBD" : `${data.pickupDate} ${data.pickupTime}`)
      payload.append("custom_fields[address]", fullAddress)
      if (data.bestTime) payload.append("custom_fields[best_time]", data.bestTime)
      if (data.message) payload.append("custom_fields[notes]", data.message)
      if (data.promoCode) payload.append("custom_fields[promo_code]", data.promoCode)
      if (data.hasWhatsapp) payload.append("custom_fields[whatsapp]", data.phone)
      payload.append("custom_fields[opt_in_call]", data.optInCall ? "Yes" : "No")
      payload.append("custom_fields[opt_in_sms]", data.optInSms ? "Yes" : "No")
      payload.append("custom_fields[embed_url]", window.location.href)
      const ctmId =
        (typeof window !== "undefined" && (window as any).__ctm?.config?.sid) ||
        getCookie("__ctmid")
      if (ctmId) payload.append("visitor_sid", ctmId)

      const res = await fetch(CTM_URL, { method: "POST", body: payload })
      if (!res.ok) throw new Error("CTM error")
      setSubmitted(true)
    } catch {
      setErrors({ submit: `Something went wrong. Please call us directly at ${PHONE_DISPLAY}.` })
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    setStep(1)
    setData(empty)
    setSubmitted(false)
    onClose()
  }

  return (
    <div
      className="z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100dvh",
        background: "rgba(3,7,10,0.92)",
      }}
    >
      <div
        className="relative w-full max-w-2xl overflow-y-auto rounded-2xl sm:rounded-[24px] border border-[#FF2D6F]/22"
        style={{
          maxHeight: "calc(100dvh - 32px)",
          background:
            "linear-gradient(135deg, rgba(10,8,24,0.96) 0%, rgba(20,12,30,0.96) 100%)",
          boxShadow:
            "0 40px 80px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-[24px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 0%, rgba(255,45,111,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 70% 100%, rgba(255,210,74,0.06) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <button
          onClick={reset}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] bg-white/[0.05] border border-white/[0.10] hover:bg-white/[0.10] hover:border-white/[0.20] flex items-center justify-center text-white/65 hover:text-white transition-all"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <div className="relative z-[1] p-4 sm:p-7 md:p-9">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-3.5 sm:mb-5">
                <span
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md text-[9px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase mb-2 sm:mb-3"
                  style={{
                    background: "rgba(255,45,111,0.10)",
                    border: "1px solid rgba(255,45,111,0.22)",
                    color: "#FF2D6F",
                  }}
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse-ds" />
                  Get a Free Quote
                </span>
                <h2 className="text-[18px] sm:text-[24px] md:text-[28px] font-extrabold tracking-[-0.025em] leading-[1.2] text-white pr-8">
                  {stepCopy(step)}
                </h2>
                <p className="text-white/50 text-[11px] sm:text-[12px] mt-1 sm:mt-1.5 tracking-[0.02em] sm:tracking-[0.04em]">
                  Step {step}/{totalSteps} ·{" "}
                  <span className="font-semibold text-white/65 tracking-normal">
                    {stepNames[step - 1]}
                  </span>
                </p>
              </div>

              {/* Progress bar */}
              <div className="mb-4 sm:mb-7 h-[3px] sm:h-1 w-full rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(step / totalSteps) * 100}%`,
                    background: "linear-gradient(90deg, #FF2D6F 0%, #FF5E3A 50%, #FFD24A 100%)",
                    boxShadow: "0 0 16px rgba(255,45,111,0.55)",
                  }}
                />
              </div>

              {/* Step body */}
              <div className="animate-fadeIn">
                {step === 1 && <Step1 data={data} update={update} goNext={goNext} />}
                {step === 2 && <Step2 data={data} toggleService={toggleService} />}
                {step === 3 && <Step3 data={data} update={update} />}
              {step === 4 && <Step4 data={data} update={update} errors={errors} phoneSuggestion={phoneSuggestion} />}
              {step === 5 && <Step5 data={data} update={update} errors={errors} emailSuggestion={emailSuggestion} />}
                {step === 6 && <Step6 data={data} update={update} />}
                {step === 7 && <Step7 data={data} update={update} />}
                {step === 8 && <Step8 data={data} update={update} />}
                {step === 9 && <Step9 data={data} update={update} />}
              </div>

              {/* Footer actions */}
              <div className="mt-5 sm:mt-7 flex items-center justify-between gap-2.5">
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/[0.05] border border-white/[0.12] text-white/85 font-semibold text-[12px] sm:text-[13px] backdrop-blur-md hover:bg-white/[0.08] transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {step === 1 ? "Cancel" : "Back"}
                </button>

                {step < totalSteps ? (
                  <button
                    onClick={goNext}
                    disabled={!canContinue()}
                    className="cta-yellow inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-extrabold text-[12px] sm:text-[13px] tracking-[0.02em] transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                    }}
                  >
                    Continue
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canContinue() || submitting}
                    className="cta-yellow inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-extrabold text-[12px] sm:text-[13px] tracking-[0.02em] transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                    }}
                  >
                    {submitting ? "Sending…" : "Submit"}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                )}
              </div>

              {errors.submit && (
                <p className="mt-3 text-red-400 text-[12px] text-center">{errors.submit}</p>
              )}

              {/* Honeypot — bots fill this, humans don't see it */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: -9999,
                  top: -9999,
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.honeypot}
                  onChange={(e) => update("honeypot", e.target.value)}
                />
              </div>
            </>
          ) : (
            <SuccessState onClose={reset} />
          )}
        </div>
      </div>
    </div>
  )
}

function stepCopy(step: number) {
  switch (step) {
    case 1:
      return "What kind of event are you planning?"
    case 2:
      return "Which services do you need?"
    case 3:
      return "What's your name?"
    case 4:
      return "How can we reach you?"
    case 5:
      return "Where should we send the quote?"
    case 6:
      return "When is your event?"
    case 7:
      return "Where's the event happening?"
    case 8:
      return "Anything else we should know?"
    case 9:
      return "Review & submit your request"
    default:
      return ""
  }
}

/* ============ STEPS ============ */

function Step1({
  data,
  update,
  goNext,
}: {
  data: FormData
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void
  goNext: () => void
}) {
  const pick = (id: string) => {
    update("eventType", id)
    setTimeout(goNext, 220) // small delay so the user sees their selection highlight
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
      {eventTypes.map(({ id, label, icon: Icon }) => {
        const active = data.eventType === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => pick(id)}
            className={`group relative p-2.5 sm:p-4 rounded-[12px] sm:rounded-[14px] border text-left transition-all ${
              active
                ? "border-[#FF2D6F]/50 bg-[#FF2D6F]/10"
                : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] sm:rounded-[10px] flex items-center justify-center mb-1.5 sm:mb-2.5 transition-all ${
                active
                  ? "bg-[#FF2D6F] text-white"
                  : "bg-[#FF2D6F]/14 border border-[#FF2D6F]/24 text-[#FF2D6F]"
              }`}
            >
              <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.8} />
            </div>
            <div className="text-[11px] sm:text-[13px] font-bold text-white leading-tight">{label}</div>
            {active && (
              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF2D6F] flex items-center justify-center">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={4} />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function Step2({
  data,
  toggleService,
}: {
  data: FormData
  toggleService: (id: string) => void
}) {
  return (
    <>
      <p className="text-white/55 text-[12px] sm:text-[13px] mb-2.5 sm:mb-3">Pick all that apply — multi-select.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {serviceOptions.map(({ id, title, icon: Icon }) => {
          const active = data.services.includes(id)
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggleService(id)}
              className={`group relative p-2.5 sm:p-3.5 rounded-[12px] sm:rounded-[14px] border text-left transition-all ${
                active
                  ? "border-[#FF2D6F]/50 bg-[#FF2D6F]/10"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-[8px] sm:rounded-[10px] flex items-center justify-center mb-1.5 sm:mb-2 transition-all ${
                  active
                    ? "bg-[#FF2D6F] text-white"
                    : "bg-[#FF2D6F]/14 border border-[#FF2D6F]/24 text-[#FF2D6F]"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.8} />
              </div>
              <div className="text-[11px] sm:text-[12px] font-semibold text-white leading-tight">{title}</div>
              {active && (
                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 rounded-full bg-[#FF2D6F] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </>
  )
}

function Step3({
  data,
  update,
}: {
  data: FormData
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void
}) {
  const firstResult = data.firstName.trim().length >= 2 ? validateName(data.firstName) : null
  const lastResult = data.lastName.trim().length >= 2 ? validateName(data.lastName) : null
  return (
    <div className="space-y-4">
      <Field
        icon={User}
        label="First Name"
        value={data.firstName}
        onChange={(v) => update("firstName", v.replace(/[^\p{L}\s'-]/gu, "").slice(0, 40))}
        placeholder="Jane"
        autoComplete="given-name"
        autoFocus
        secured
        error={firstResult && !firstResult.isValid ? firstResult.error : undefined}
      />
      <Field
        icon={User}
        label="Last Name"
        value={data.lastName}
        onChange={(v) => update("lastName", v.replace(/[^\p{L}\s'-]/gu, "").slice(0, 40))}
        placeholder="Doe"
        autoComplete="family-name"
        secured
        error={lastResult && !lastResult.isValid ? lastResult.error : undefined}
      />
      <LegalNote />
    </div>
  )
}

function Step4({
  data,
  update,
  errors,
}: {
  data: FormData
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void
  errors: Record<string, string>
  phoneSuggestion: string | null
}) {
  const digits = data.phone.replace(/\D/g, "")
  const phoneResult = digits.length >= 7 ? validatePhoneForCountry(data.phone, data.phoneCountry) : null
  const phoneError = errors.phone || (phoneResult && !phoneResult.isValid ? phoneResult.error : undefined)

  return (
    <div className="space-y-4">
      <PhoneInput
        label="Phone Number"
        countryCode={data.phoneCountry}
        onCountryChange={(c) => update("phoneCountry", c)}
        value={data.phone}
        onChange={(v) => update("phone", v)}
        autoComplete="tel"
        secured
        error={phoneError}
      />

      <LegalNote />
    </div>
  )
}

function Step5({
  data,
  update,
  errors,
  emailSuggestion,
}: {
  data: FormData
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void
  errors: Record<string, string>
  emailSuggestion: string | null
}) {
  // Show inline error once the user has typed enough for a valid email structure
  const emailResult = data.email.includes("@") ? validateEmail(data.email) : null
  const emailError = errors.email || (emailResult && !emailResult.isValid ? emailResult.error : undefined)
  const suggestion = emailSuggestion || (emailResult?.suggestion ?? null)

  return (
    <div className="space-y-4">
      <div>
        <Field
          icon={Mail}
          label="Email Address"
          type="email"
          value={data.email}
          onChange={(v) => update("email", v.trim().slice(0, 100))}
          placeholder="jane@brand.com"
          autoComplete="email"
          autoFocus
          secured
          error={emailError}
        />
        {suggestion && !emailError && (
          <div className="mt-2 p-3 rounded-[12px] bg-blue-500/10 border border-blue-500/30 text-sm">
            <p className="text-blue-100 mb-2">Did you mean?</p>
            <button
              type="button"
              onClick={() => emailSuggestion && update("email", emailSuggestion)}
              className="text-blue-300 hover:text-blue-200 font-semibold underline text-left"
            >
              {suggestion}
            </button>
          </div>
        )}
      </div>
      <LegalNote />
    </div>
  )
}

function Step6({
  data,
  update,
}: {
  data: FormData
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void
}) {
  const today = new Date().toISOString().split("T")[0]
  return (
    <div className="space-y-5">
      {/* TBD toggle */}
      <button
        type="button"
        onClick={() => update("dateTbd", !data.dateTbd)}
        className="w-full flex items-center gap-3 p-4 rounded-[14px] border transition-all text-left"
        style={{
          background: data.dateTbd ? "rgba(255,210,74,0.08)" : "rgba(255,255,255,0.03)",
          border: data.dateTbd ? "1px solid rgba(255,210,74,0.35)" : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex-1">
          <div className="text-white text-[14px] font-bold">Date not decided yet (TBD)</div>
          <div className="text-white/50 text-[12px]">We'll reach out to coordinate the schedule.</div>
        </div>
        <span
          className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
            data.dateTbd ? "bg-[#FFD24A] border border-[#FFD24A]" : "bg-white/[0.04] border border-white/[0.18]"
          }`}
        >
          {data.dateTbd && <Check className="w-3 h-3 text-black" strokeWidth={4} />}
        </span>
      </button>

      {!data.dateTbd && (
        <>
          <div className="space-y-2">
            <Label icon={Calendar}>Drop-Off</Label>
            <div className="grid grid-cols-2 gap-3">
              <CalendarPicker
                label="Date"
                value={data.dropoffDate}
                onChange={(v) => update("dropoffDate", v)}
                min={today}
              />
              <TimeDrum
                label="Time"
                value={data.dropoffTime}
                onChange={(v) => update("dropoffTime", v)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label icon={CalendarClock}>Pick-Up</Label>
            <div className="grid grid-cols-2 gap-3">
              <CalendarPicker
                label="Date"
                value={data.pickupDate}
                onChange={(v) => update("pickupDate", v)}
                min={data.dropoffDate || today}
              />
              <TimeDrum
                label="Time"
                value={data.pickupTime}
                onChange={(v) => update("pickupTime", v)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const GMAPS_KEY = process.env.NEXT_PUBLIC_GMAPS_KEY ?? ""

function Step7({
  data,
  update,
}: {
  data: FormData
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void
}) {
  const addressInputRef = useRef<HTMLInputElement>(null)
  const updateRef = useRef(update)
  useEffect(() => { updateRef.current = update })
  const [gmapsReady, setGmapsReady] = useState(false)

  // Load Google Maps script once
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = (window as any).google
    if (g?.maps?.places) { setGmapsReady(true); return }
    const existing = document.querySelector(`script[src*="maps.googleapis.com"]`)
    if (existing) { existing.addEventListener("load", () => setGmapsReady(true)); return }
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_KEY}&libraries=places`
    script.async = true
    script.onload = () => setGmapsReady(true)
    document.head.appendChild(script)
  }, [])

  // Init Autocomplete once — never re-runs
  useEffect(() => {
    if (!gmapsReady || !addressInputRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = (window as any).google
    const ac = new g.maps.places.Autocomplete(addressInputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["address_components"],
    })
    ac.addListener("place_changed", () => {
      const place = ac.getPlace()
      if (!place.address_components) return
      let streetNumber = "", route = "", city = "", state = "", zip = ""
      for (const comp of place.address_components) {
        if (comp.types.includes("street_number")) streetNumber = comp.long_name
        if (comp.types.includes("route")) route = comp.long_name
        if (comp.types.includes("locality") || comp.types.includes("sublocality_level_1")) city = comp.long_name
        if (comp.types.includes("administrative_area_level_1")) state = comp.short_name
        if (comp.types.includes("postal_code")) zip = comp.long_name
      }
      const u = updateRef.current
      if (streetNumber || route) u("address", `${streetNumber} ${route}`.trim())
      if (city) u("city", city)
      if (state) u("state", state)
      if (zip) u("zip", zip)
    })
    return () => { g.maps.event.clearInstanceListeners(ac) }
  }, [gmapsReady]) // only runs when Maps becomes ready

  return (
    <div className="space-y-3">
      {/* Row 1: Street Address — Google Places Autocomplete */}
      <div>
        <Label icon={Home} secured>Street Address</Label>
        <input
          ref={addressInputRef}
          type="text"
          value={data.address}
          onChange={(e) => update("address", e.target.value.slice(0, 120))}
          placeholder="123 Main Street"
          autoComplete="off"
          autoFocus
          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white text-[14px] placeholder-white/35 focus:outline-none focus:border-[#FF2D6F]/50 transition-colors"
        />
      </div>
      {/* Row 2: Apt / Suite */}
      <Field
        label="Apt, Suite, Unit (optional)"
        value={data.address2}
        onChange={(v) => update("address2", v.slice(0, 60))}
        placeholder="Apt 4B"
        autoComplete="address-line2"
        secured
      />
      {/* Row 3: City */}
      <Field
        label="City"
        value={data.city}
        onChange={(v) => update("city", v.replace(/[^\p{L}\s.'-]/gu, "").slice(0, 60))}
        placeholder="Miami"
        autoComplete="address-level2"
        secured
      />
      {/* Row 4: State + ZIP */}
      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="State"
          value={data.state}
          onChange={(v) => update("state", v)}
          options={usStates}
          placeholder="Select state"
        />
        <ZipField
          value={data.zip}
          onChange={(v) => update("zip", v.replace(/[^0-9]/g, "").slice(0, 5))}
          status="idle"
        />
      </div>
      <LegalNote />
    </div>
  )
}

function ZipField({
  value,
  onChange,
  status,
  secured,
}: {
  value: string
  onChange: (v: string) => void
  status: "idle" | "loading" | "ok" | "fail"
  secured?: boolean
}) {
  return (
    <div>
      <div className="flex items-center mb-2">
        <label className="block text-white/65 text-[11px] tracking-[0.06em] uppercase font-semibold">
          ZIP Code
        </label>
        {secured && <SecuredBadge />}
      </div>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="90001"
          autoComplete="postal-code"
          maxLength={5}
          className="w-full px-3.5 py-3 pr-9 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white text-[14px] placeholder-white/35 focus:outline-none focus:border-[#FF2D6F]/50 transition-colors font-mono tabular-nums"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4">
          {status === "loading" && (
            <span
              className="w-3.5 h-3.5 rounded-full border-2 border-[#FF2D6F]/30 border-t-[#FF2D6F] animate-spin"
              aria-label="Looking up ZIP"
            />
          )}
          {status === "ok" && <Check className="w-4 h-4 text-[#25D366]" strokeWidth={3} />}
        </span>
      </div>
    </div>
  )
}

function Step8({
  data,
  update,
}: {
  data: FormData
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label icon={Clock}>Best time to reach you <span className="text-[#FF2D6F]">*</span></Label>
        <p className="text-white/40 text-[11px] mb-2.5 -mt-1">So we don&apos;t miss you when we call back.</p>
        <div className="grid grid-cols-3 gap-2">
          {["Morning", "Afternoon", "Evening"].map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => update("bestTime", slot)}
              className={`py-3 rounded-xl border text-[13px] font-semibold transition-all ${
                data.bestTime === slot
                  ? "border-[#FF2D6F]/50 bg-[#FF2D6F]/12 text-white"
                  : "border-white/[0.10] bg-white/[0.03] text-white/65 hover:border-white/[0.22] hover:text-white"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label icon={MessageSquare}>Notes (optional)</Label>
        <textarea
          value={data.message}
          onChange={(e) => update("message", e.target.value.slice(0, 800))}
          rows={4}
          maxLength={800}
          placeholder="Anything specific — venue restrictions, brand guidelines, expected guests…"
          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white text-[14px] placeholder-white/35 focus:outline-none focus:border-[#FF2D6F]/50 transition-colors resize-none"
        />
      </div>
      <div>
        <Label icon={Tag}>Promo Code (optional)</Label>
        <input
          type="text"
          value={data.promoCode}
          onChange={(e) => update("promoCode", e.target.value.replace(/[^A-Za-z0-9-]/g, "").slice(0, 20).toUpperCase())}
          placeholder="EARLYBIRD"
          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white text-[14px] placeholder-white/35 focus:outline-none focus:border-[#FF2D6F]/50 transition-colors uppercase tracking-[0.06em]"
        />
      </div>
    </div>
  )
}

function Step9({
  data,
  update,
}: {
  data: FormData
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void
}) {
  const country = countries.find((c) => c.code === data.phoneCountry)!
  const services = data.services
    .map((id) => serviceOptions.find((o) => o.id === id)?.title)
    .filter(Boolean)
    .join(", ")
  const eventLabel = eventTypes.find((e) => e.id === data.eventType)?.label || ""

  return (
    <div className="space-y-5">
      <p className="text-white/55 text-[13px]">Double-check everything below.</p>

      <div className="rounded-[16px] border border-white/[0.08] bg-white/[0.02] p-5 space-y-2">
        {summaryRow("Event Type", eventLabel)}
        {summaryRow("Services", services)}
        {summaryRow("Name", `${data.firstName} ${data.lastName}`.trim())}
        {summaryRow("Phone", `${country.dial} ${formatPhone(data.phone, country)}`)}
        {data.hasWhatsapp &&
          summaryRow("WhatsApp", `${country.dial} ${formatPhone(data.phone, country)}`)}
        {summaryRow("Email", data.email)}
        {summaryRow("Drop-Off", data.dateTbd ? "TBD" : `${formatDate(data.dropoffDate)} · ${formatTime(data.dropoffTime)}`)}
        {summaryRow("Pick-Up", data.dateTbd ? "TBD" : `${formatDate(data.pickupDate)} · ${formatTime(data.pickupTime)}`)}
        {summaryRow(
          "Address",
          [data.address, data.address2, `${data.city}, ${data.state} ${data.zip}`].filter(Boolean).join(", "),
        )}
        {summaryRow("Best Time", data.bestTime)}
        {data.message && summaryRow("Notes", data.message)}
        {data.promoCode && summaryRow("Promo", data.promoCode)}
      </div>

      {/* Opt-in Call */}
      <div className="space-y-1.5">
        <p className="text-white text-[13px] font-bold">
          Opt-in Call<span className="text-[#FF2D6F]">*</span>
        </p>
        <label className="flex items-start gap-3 cursor-pointer group">
          <span
            className={`mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${
              data.optInCall
                ? "bg-[#FF2D6F] border border-[#FF2D6F]"
                : "bg-white/[0.04] border border-white/[0.18] group-hover:border-white/[0.30]"
            }`}
          >
            {data.optInCall && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
          </span>
          <input
            type="checkbox"
            checked={data.optInCall}
            onChange={(e) => update("optInCall", e.target.checked)}
            className="sr-only"
          />
          <span className="text-white/55 text-[12px] leading-[1.6]">
            By clicking this box you provide express written consent indicating a willingness for us to call you. We will never share your information.
          </span>
        </label>
      </div>

      {/* Opt-in SMS */}
      <div className="space-y-1.5">
        <p className="text-white text-[13px] font-bold">
          Opt-in SMS<span className="text-[#FF2D6F]">*</span>
        </p>
        <label className="flex items-start gap-3 cursor-pointer group">
          <span
            className={`mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${
              data.optInSms
                ? "bg-[#FF2D6F] border border-[#FF2D6F]"
                : "bg-white/[0.04] border border-white/[0.18] group-hover:border-white/[0.30]"
            }`}
          >
            {data.optInSms && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
          </span>
          <input
            type="checkbox"
            checked={data.optInSms}
            onChange={(e) => update("optInSms", e.target.checked)}
            className="sr-only"
          />
          <span className="text-white/55 text-[12px] leading-[1.6]">
            By clicking this box you provide express written consent to contact you via SMS no more than 2-4 times/month. Text STOP to opt-out at anytime.
          </span>
        </label>
      </div>

      {/* Privacy Policy */}
      <p className="text-white/45 text-[11px]">
        Privacy Policy:{" "}
        <a
          href="/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4A90E2] underline hover:text-[#6AAFF2] transition-colors"
        >
          primelineav.com/legal/privacy
        </a>
      </p>

      {/* General consent */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <span
          className={`mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${
            data.agreeTerms
              ? "bg-[#FF2D6F] border border-[#FF2D6F]"
              : "bg-white/[0.04] border border-white/[0.18] group-hover:border-white/[0.30]"
          }`}
        >
          {data.agreeTerms && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
        </span>
        <input
          type="checkbox"
          checked={data.agreeTerms}
          onChange={(e) => update("agreeTerms", e.target.checked)}
          className="sr-only"
        />
        <span className="text-white/55 text-[12px] leading-[1.6]">
          I agree that Prime Line AV may contact me regarding this request via phone, email, SMS or WhatsApp. My
          information is processed solely to prepare and execute the quote and will <b className="text-white/85">never
          be shared with third parties</b>. By submitting I accept the Privacy Policy &amp; Terms.
        </span>
      </label>
    </div>
  )
}

function summaryRow(label: string, value: string) {
  return (
    <div
      key={label}
      className="flex items-start justify-between gap-4 py-2 border-b border-white/[0.06] last:border-0"
    >
      <span className="text-white/45 text-[11px] tracking-[0.06em] uppercase font-semibold flex-shrink-0">
        {label}
      </span>
      <span className="text-white text-[13px] text-right break-words">{value || "—"}</span>
    </div>
  )
}

function formatDate(d: string) {
  if (!d) return ""
  const date = new Date(d + "T12:00:00")
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function formatTime(t: string) {
  if (!t) return ""
  const [h, m] = t.split(":").map(Number)
  const ampm = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`
}

/* ============ SUCCESS ============ */

function SuccessState({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const swap = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctm = (window as any).__ctm
        if (!ctm) return
        ctm.main?.scan?.()
        ctm.main?.runNow?.()
      } catch (e) {
        console.warn("[CTM] swap failed", e)
      }
    }

    const t1 = setTimeout(swap, 50)
    const t2 = setTimeout(swap, 400)
    const t3 = setTimeout(swap, 1200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <div className="text-center py-8">
      <div
        className="w-20 h-20 rounded-full bg-[#FF2D6F]/15 border border-[#FF2D6F]/30 flex items-center justify-center mx-auto mb-6"
        style={{ boxShadow: "0 0 40px rgba(255,45,111,0.35)" }}
      >
        <CheckCircle2 className="w-10 h-10 text-[#FF2D6F]" strokeWidth={2} />
      </div>
      <h2 className="text-[26px] sm:text-[32px] font-extrabold tracking-[-0.025em] leading-[1.18] text-white mb-3">
        We&apos;re{" "}
        <span style={{
          background: "linear-gradient(135deg, #FF2D6F 0%, #FFD24A 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontStyle: "italic",
          paddingRight: "0.18em",
        }}>on it.</span>
      </h2>
      <p className="text-white/60 text-[14px] max-w-md mx-auto mb-8">
        Expect a call from our team any moment. Can&apos;t wait? Reach us now:
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <a
          href={PHONE_TEL_INTL}
          suppressHydrationWarning
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-white font-extrabold text-[14px] tracking-[0.02em] transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          style={{
            background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
            boxShadow: "0 12px 36px -8px rgba(255,45,111,0.55), inset 0 1px 0 rgba(255,255,255,0.30)",
          }}
        >
          <Phone className="w-4 h-4" strokeWidth={2.2} />
          Call now
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-white font-extrabold text-[14px] tracking-[0.02em] transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            boxShadow: "0 12px 36px -8px rgba(37,211,102,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          <WhatsAppIcon className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
      <button
        onClick={onClose}
        className="text-white/40 hover:text-white/70 text-[13px] transition-colors"
      >
        Close
      </button>
    </div>
  )
}

/* ============ PRIMITIVES ============ */

function Label({
  children,
  icon: Icon,
  secured,
}: {
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>
  secured?: boolean
}) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      {Icon && (
        <span className="w-7 h-7 rounded-[8px] bg-[#FF2D6F]/12 border border-[#FF2D6F]/22 flex items-center justify-center text-[#FF2D6F]">
          <Icon className="w-3.5 h-3.5" strokeWidth={2} />
        </span>
      )}
      <span className="text-white text-[13px] font-semibold tracking-[0.02em]">{children}</span>
      {secured && <SecuredBadge />}
    </div>
  )
}

function SecuredBadge() {
  return (
    <span
      className="ml-auto inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-[0.14em] uppercase"
      style={{
        background: "rgba(37,211,102,0.10)",
        border: "1px solid rgba(37,211,102,0.28)",
        color: "#25D366",
      }}
      title="Encrypted in transit. Stored securely. Never sold or shared."
    >
      <Shield className="w-2.5 h-2.5" strokeWidth={2.5} />
      Secured
    </span>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  autoComplete,
  autoFocus,
  secured,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>
  autoComplete?: string
  autoFocus?: boolean
  secured?: boolean
  error?: string
}) {
  return (
    <div>
      {Icon ? (
        <Label icon={Icon} secured={secured}>{label}</Label>
      ) : (
        <div className="flex items-center mb-2">
          <label className="block text-white/65 text-[11px] tracking-[0.06em] uppercase font-semibold">
            {label}
          </label>
          {secured && <SecuredBadge />}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        spellCheck={false}
        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-[14px] placeholder-white/35 focus:outline-none transition-colors ${
          error
            ? "border-red-500/50 focus:border-red-500/70"
            : "border-white/[0.10] focus:border-[#FF2D6F]/50"
        }`}
      />
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  secured,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
  secured?: boolean
}) {
  return (
    <div>
      <div className="flex items-center mb-2">
        <label className="block text-white/65 text-[11px] tracking-[0.06em] uppercase font-semibold">
          {label}
        </label>
        {secured && <SecuredBadge />}
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white text-[14px] focus:outline-none focus:border-[#FF2D6F]/50 transition-colors cursor-pointer"
        >
          <option value="" disabled className="bg-[#0a0818] text-white/45">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0a0818] text-white">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
      </div>
    </div>
  )
}

/* ============ CALENDAR PICKER ============ */

const CAL_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const CAL_DOW = ["Su","Mo","Tu","We","Th","Fr","Sa"]

function CalendarPicker({
  label,
  value,
  onChange,
  min,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  min?: string
}) {
  const todayMemo = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d }, [])
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => {
    const base = value ? new Date(value + "T12:00:00") : new Date()
    return { y: base.getFullYear(), m: base.getMonth() }
  })
  const [popupStyle, setPopupStyle] = useState<{ top: number; left: number; width: number } | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return
      if (!popupRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const openCalendar = () => {
    if (open) { setOpen(false); return }
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) return
    const CAL_H = 320
    const spaceBelow = window.innerHeight - rect.bottom - 8
    const spaceAbove = rect.top - 8
    const openBelow = spaceBelow >= spaceAbove
    const rawTop = openBelow ? rect.bottom + 4 : rect.top - CAL_H - 4
    const top = Math.max(8, Math.min(rawTop, window.innerHeight - CAL_H - 8))
    setPopupStyle({ top, left: rect.left, width: Math.max(rect.width, 260) })
    const base = value ? new Date(value + "T12:00:00") : new Date()
    setView({ y: base.getFullYear(), m: base.getMonth() })
    setOpen(true)
  }

  const minDate = min ? new Date(min + "T00:00:00") : null
  const selY = value ? parseInt(value.split("-")[0]) : null
  const selM = value ? parseInt(value.split("-")[1]) - 1 : null
  const selD = value ? parseInt(value.split("-")[2]) : null

  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()
  const firstDow = new Date(view.y, view.m, 1).getDay()

  const prevMonth = () => setView(v => v.m === 0 ? { y: v.y - 1, m: 11 } : { ...v, m: v.m - 1 })
  const nextMonth = () => setView(v => v.m === 11 ? { y: v.y + 1, m: 0 } : { ...v, m: v.m + 1 })

  const pick = (day: number) => {
    onChange(`${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`)
    setOpen(false)
  }

  const isDisabled = (day: number) => !!minDate && new Date(view.y, view.m, day) < minDate

  const displayVal = value
    ? (() => { const [y, m, d] = value.split("-"); return `${m} . ${d} . ${y}` })()
    : null

  return (
    <div>
      <label className="flex items-center gap-1.5 text-white/55 text-[10px] tracking-[0.08em] uppercase font-semibold mb-1.5">
        <Calendar className="w-3 h-3 text-[#FF2D6F]" />
        {label}
      </label>
      <button
        ref={triggerRef}
        type="button"
        onClick={openCalendar}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border text-[13px] transition-colors text-left ${
          open ? "border-[#FF2D6F]/50" : "border-white/[0.10]"
        }`}
      >
        <span className={displayVal ? "text-white font-medium" : "text-white/35"}>
          {displayVal ?? "Choose date"}
        </span>
        <Calendar className="w-3.5 h-3.5 text-white/25 flex-shrink-0" strokeWidth={1.5} />
      </button>

      {open && popupStyle && typeof document !== "undefined" && createPortal(
        <div
          ref={popupRef}
          style={{
            position: "fixed",
            top: popupStyle.top,
            left: popupStyle.left,
            width: popupStyle.width,
            zIndex: 9999,
            background: "linear-gradient(135deg, rgba(14,10,30,0.99) 0%, rgba(22,14,38,0.99) 100%)",
            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
          className="rounded-2xl border border-white/[0.10] p-3"
        >
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth} className="w-7 h-7 rounded-[8px] bg-white/[0.05] hover:bg-white/[0.10] text-white/50 hover:text-white flex items-center justify-center transition-all">
              <ArrowLeft className="w-3 h-3" />
            </button>
            <span className="text-white text-[13px] font-bold">{CAL_MONTHS[view.m]} {view.y}</span>
            <button type="button" onClick={nextMonth} className="w-7 h-7 rounded-[8px] bg-white/[0.05] hover:bg-white/[0.10] text-white/50 hover:text-white flex items-center justify-center transition-all">
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-7 mb-1">
            {CAL_DOW.map(d => <div key={d} className="text-center text-white/25 text-[9px] font-bold tracking-[0.06em] py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5">
            {Array.from({ length: firstDow }, (_, i) => <div key={`p${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const dis = isDisabled(day)
              const sel = selY === view.y && selM === view.m && selD === day
              const tod = todayMemo.getFullYear() === view.y && todayMemo.getMonth() === view.m && todayMemo.getDate() === day
              return (
                <button key={day} type="button" disabled={dis} onClick={() => pick(day)}
                  className={`flex items-center justify-center h-8 rounded-[8px] text-[12px] font-semibold transition-all ${
                    sel ? "bg-[#FF2D6F] text-white shadow-[0_4px_14px_-2px_rgba(255,45,111,0.50)]"
                    : dis ? "text-white/15 cursor-not-allowed"
                    : tod ? "ring-1 ring-[#FF2D6F]/40 text-[#FF2D6F] hover:bg-[#FF2D6F]/10"
                    : "text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >{day}</button>
              )
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

/* ============ TIME DRUM ============ */

const DRUM_ITEM_H = 40
const DRUM_VISIBLE = 5

function DrumColumn({
  items,
  selected,
  onSelect,
}: {
  items: { value: string; label: string }[]
  selected: string
  onSelect: (v: string) => void
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const ownUpdate = useRef(false)
  const [hlIdx, setHlIdx] = useState(() => Math.max(0, items.findIndex(i => i.value === selected)))

  const offsetRef = useRef(Math.max(0, items.findIndex(i => i.value === selected)) * DRUM_ITEM_H)
  const maxOffset = (items.length - 1) * DRUM_ITEM_H

  const applyOffset = (val: number) => {
    const clamped = Math.max(0, Math.min(val, maxOffset))
    offsetRef.current = clamped
    if (innerRef.current) {
      innerRef.current.style.transform = `translateY(${DRUM_ITEM_H * 2 - clamped}px)`
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { applyOffset(offsetRef.current) }, [])

  useEffect(() => {
    if (ownUpdate.current) { ownUpdate.current = false; return }
    const idx = items.findIndex(i => i.value === selected)
    if (idx >= 0) { applyOffset(idx * DRUM_ITEM_H); setHlIdx(idx) }
  }, [selected, items]) // eslint-disable-line react-hooks/exhaustive-deps

  const drag = useRef<{ startY: number; startOffset: number } | null>(null)
  const momentum = useRef<{ y: number; t: number }>({ y: 0, t: 0 })
  const vel = useRef(0)
  const raf = useRef<number | null>(null)

  const snapAndCommit = () => {
    const ci = Math.max(0, Math.min(Math.round(offsetRef.current / DRUM_ITEM_H), items.length - 1))
    const target = ci * DRUM_ITEM_H
    const start = offsetRef.current
    const diff = target - start
    const t0 = Date.now()
    const run = () => {
      const p = Math.min((Date.now() - t0) / 150, 1)
      applyOffset(start + diff * (1 - Math.pow(1 - p, 2)))
      if (p < 1) { raf.current = requestAnimationFrame(run) }
      else { applyOffset(target); setHlIdx(ci); ownUpdate.current = true; onSelect(items[ci].value) }
    }
    setHlIdx(ci)
    if (Math.abs(diff) < 1) { applyOffset(target); ownUpdate.current = true; onSelect(items[ci].value); return }
    raf.current = requestAnimationFrame(run)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (raf.current) { cancelAnimationFrame(raf.current); raf.current = null }
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { startY: e.clientY, startOffset: offsetRef.current }
    momentum.current = { y: e.clientY, t: Date.now() }
    vel.current = 0
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    applyOffset(drag.current.startOffset + drag.current.startY - e.clientY)
    const now = Date.now()
    const dt = Math.max(now - momentum.current.t, 1)
    vel.current = ((momentum.current.y - e.clientY) / dt) * 16
    momentum.current = { y: e.clientY, t: now }
  }

  const onPointerUp = () => {
    if (!drag.current) return
    drag.current = null
    let v = vel.current
    const run = () => {
      applyOffset(offsetRef.current + v)
      v *= 0.88
      if (Math.abs(v) > 0.5) { raf.current = requestAnimationFrame(run) }
      else snapAndCommit()
    }
    if (Math.abs(v) > 0.5) { raf.current = requestAnimationFrame(run) }
    else snapAndCommit()
  }

  return (
    <div ref={outerRef} className="flex-1 relative overflow-hidden" style={{ height: DRUM_ITEM_H * DRUM_VISIBLE }}>
      <div className="absolute inset-x-0 top-0 pointer-events-none z-10"
        style={{ height: DRUM_ITEM_H * 2, background: "linear-gradient(to bottom, rgba(14,10,30,1) 0%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
        style={{ height: DRUM_ITEM_H * 2, background: "linear-gradient(to top, rgba(14,10,30,1) 0%, transparent 100%)" }} />
      <div className="absolute inset-x-2 pointer-events-none z-[5] rounded-xl"
        style={{ top: DRUM_ITEM_H * 2, height: DRUM_ITEM_H, background: "rgba(255,45,111,0.12)", border: "1px solid rgba(255,45,111,0.32)" }} />
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ height: "100%", overflow: "hidden", touchAction: "none", userSelect: "none", cursor: "grab" }}
      >
        <div ref={innerRef} style={{ willChange: "transform" }}>
          {items.map(({ value, label }, idx) => {
            const dist = Math.abs(hlIdx - idx)
            return (
              <div key={value} style={{ height: DRUM_ITEM_H }} className="flex items-center justify-center">
                <span className="font-bold transition-all duration-150" style={{
                  fontSize: dist === 0 ? 20 : dist === 1 ? 15 : 12,
                  color: dist === 0 ? "#ffffff" : dist === 1 ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.14)",
                  pointerEvents: "none",
                }}>{label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TimeDrum({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [popupStyle, setPopupStyle] = useState<{ top: number; left: number; width: number } | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const parseValue = (v: string) => {
    if (!v) return { h: 9, m: 0, ampm: "AM" }
    const [hStr, mStr] = v.split(":")
    const h = parseInt(hStr) || 0
    const m = parseInt(mStr) || 0
    return { h: h % 12 || 12, m, ampm: h >= 12 ? "PM" : "AM" }
  }

  const buildValue = (h: number, m: number, ampm: string) => {
    let h24 = h % 12
    if (ampm === "PM") h24 += 12
    return `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  }

  const { h: selH, m: selM, ampm: selAmpm } = parseValue(value)

  const hours = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))
  const minutes = [0, 15, 30, 45].map(m => ({ value: String(m), label: String(m).padStart(2, "0") }))

  const openDrum = () => {
    if (open) { setOpen(false); return }
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) return
    const POPUP_H = DRUM_ITEM_H * DRUM_VISIBLE + 24
    const popupW = Math.max(rect.width, 240)
    const spaceBelow = window.innerHeight - rect.bottom - 8
    const spaceAbove = rect.top - 8
    // same direction logic as CalendarPicker: prefer side with more space
    const openBelow = spaceBelow >= spaceAbove
    const rawTop = openBelow ? rect.bottom + 4 : rect.top - POPUP_H - 4
    const top = Math.max(8, Math.min(rawTop, window.innerHeight - POPUP_H - 8))
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - popupW - 8))
    setPopupStyle({ top, left, width: popupW })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return
      if (!popupRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const displayVal = value ? formatTime(value) : null

  return (
    <div>
      <label className="flex items-center gap-1.5 text-white/55 text-[10px] tracking-[0.08em] uppercase font-semibold mb-1.5">
        <Clock className="w-3 h-3 text-[#FF2D6F]" />
        {label}
      </label>
      <button
        ref={triggerRef}
        type="button"
        onClick={openDrum}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border text-[13px] transition-colors text-left ${
          open ? "border-[#FF2D6F]/50" : "border-white/[0.10]"
        }`}
      >
        <span className={displayVal ? "text-white font-medium" : "text-white/35"}>
          {displayVal ?? "Choose time"}
        </span>
        <Clock className="w-3.5 h-3.5 text-white/25 flex-shrink-0" strokeWidth={1.5} />
      </button>

      {open && popupStyle && typeof document !== "undefined" && createPortal(
        <div
          ref={popupRef}
          style={{
            position: "fixed",
            top: popupStyle.top,
            left: popupStyle.left,
            width: popupStyle.width,
            zIndex: 9999,
            background: "linear-gradient(135deg, rgba(14,10,30,0.99) 0%, rgba(22,14,38,0.99) 100%)",
            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
          className="rounded-2xl border border-white/[0.10] overflow-hidden"
        >
          {/* brand accent top line */}
          <div className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent 0%, #FF2D6F 50%, transparent 100%)" }} />

          {/* hours drum · minutes drum · AM/PM click toggle */}
          <div className="flex px-1 pt-2 pb-3">
            <DrumColumn
              items={hours}
              selected={String(selH)}
              onSelect={(v) => onChange(buildValue(parseInt(v), selM, selAmpm))}
            />
            <div className="w-px bg-white/[0.06] my-4 self-stretch" />
            <DrumColumn
              items={minutes}
              selected={String(selM)}
              onSelect={(v) => onChange(buildValue(selH, parseInt(v), selAmpm))}
            />
            <div className="w-px bg-white/[0.06] my-4 self-stretch" />
            {/* AM/PM static toggle — click only, no drum */}
            <div className="flex flex-col justify-center gap-2 px-2" style={{ width: 52 }}>
              {(["AM", "PM"] as const).map((period) => {
                const active = selAmpm === period
                return (
                  <button
                    key={period}
                    type="button"
                    onClick={() => onChange(buildValue(selH, selM, period))}
                    className="w-full py-2.5 rounded-[10px] text-[12px] font-extrabold tracking-widest transition-all"
                    style={active ? {
                      background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 14px -4px rgba(255,45,111,0.55)",
                    } : {
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {period}
                  </button>
                )
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

function CountryFlag({ code, size = 22 }: { code: string; size?: number }) {
  // SVG flags via flagcdn — render reliably on Windows where emoji flags aren't supported
  const lower = code.toLowerCase()
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`https://flagcdn.com/${size * 2}x${Math.round(size * 1.5)}/${lower}.png`}
      srcSet={`https://flagcdn.com/${size * 2}x${Math.round(size * 1.5)}/${lower}.png 1x, https://flagcdn.com/${size * 4}x${Math.round(size * 3)}/${lower}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt=""
      loading="lazy"
      className="rounded-[3px] object-cover flex-shrink-0"
      style={{ display: "inline-block", verticalAlign: "middle" }}
      onError={(e) => {
        // fallback if CDN unreachable: hide image, show letter code
        const img = e.currentTarget
        img.style.display = "none"
        const next = img.nextElementSibling as HTMLElement | null
        if (next) next.style.display = "inline-flex"
      }}
    />
  )
}

function PhoneInput({
  label,
  countryCode,
  onCountryChange,
  value,
  onChange,
  autoComplete,
  accentIcon: AccentIcon = Phone,
  accentColor = "#FF2D6F",
  hint,
  secured,
  error,
}: {
  label: string
  countryCode: string
  onCountryChange: (c: string) => void
  value: string
  onChange: (v: string) => void
  autoComplete?: string
  accentIcon?: React.ComponentType<{ className?: string }>
  accentColor?: string
  hint?: string
  secured?: boolean
  error?: string
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [popupStyle, setPopupStyle] = useState<{ top: number; left: number; width: number } | null>(null)
  const country = countries.find((c) => c.code === countryCode) || countries[0]
  const filtered = useMemo(
    () =>
      countries.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search) ||
          c.code.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  )
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return
      if (!popupRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [open])

  const handlePhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 15)
    onChange(digits)
  }

  const focusBorder = `${accentColor}80`

  const openDropdown = () => {
    if (open) { setOpen(false); return }
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) return
    const POPUP_H = 320
    const spaceBelow = window.innerHeight - rect.bottom - 8
    const spaceAbove = rect.top - 8
    const openBelow = spaceBelow >= spaceAbove
    const rawTop = openBelow ? rect.bottom + 4 : rect.top - POPUP_H - 4
    const top = Math.max(8, Math.min(rawTop, window.innerHeight - POPUP_H - 8))
    setPopupStyle({ top, left: rect.left, width: Math.max(rect.width + 200, 280) })
    setOpen(true)
  }

  return (
    <div>
      <Label icon={AccentIcon as React.ComponentType<{ className?: string; strokeWidth?: number }>} secured={secured}>{label}</Label>
      <div className="flex gap-2">
        {/* Country selector — flag SVG + dial */}
        <button
          ref={triggerRef}
          type="button"
          onClick={openDropdown}
          className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white text-[14px] hover:bg-white/[0.06] transition-colors flex-shrink-0"
        >
          <CountryFlag code={country.code} size={22} />
          <span
            className="hidden font-mono font-bold text-[10px] text-white/65 tracking-wider"
            style={{ display: "none" }}
          >
            {country.code}
          </span>
          <span className="font-mono font-bold text-[13px] text-white/85">{country.dial}</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/40" />
        </button>

        {/* Phone field */}
        <input
          type="tel"
          inputMode="numeric"
          value={formatPhone(value, country)}
          onChange={(e) => handlePhone(e.target.value)}
          placeholder={country.format ? country.format.replace(/#/g, "•") : "Phone number"}
          autoComplete={autoComplete}
          className={`flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-[14px] placeholder-white/35 focus:outline-none transition-colors font-mono ${
            error ? "border-red-500/50" : "border-white/[0.10]"
          }`}
          onFocus={(e) => (e.currentTarget.style.borderColor = error ? "rgba(239, 68, 68, 0.7)" : focusBorder)}
          onBlur={(e) => (e.currentTarget.style.borderColor = error ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.10)")}
        />

        {/* Country dropdown — portal to avoid stacking context clipping */}
        {open && popupStyle && typeof document !== "undefined" && createPortal(
          <div
            ref={popupRef}
            style={{
              position: "fixed",
              top: popupStyle.top,
              left: popupStyle.left,
              width: popupStyle.width,
              zIndex: 9999,
              background: "rgba(10,8,24,0.98)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.7)",
              maxHeight: 280,
              overflowY: "auto",
            }}
            className="rounded-xl border border-white/[0.10]"
          >
            <div className="sticky top-0 z-10 p-2 bg-[rgba(10,8,24,0.98)] border-b border-white/[0.08]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country or code…"
                  autoFocus
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.10] text-white text-[13px] placeholder-white/35 focus:outline-none focus:border-[#FF2D6F]/40"
                />
              </div>
            </div>
            <div className="py-1">
              {filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onCountryChange(c.code)
                    setOpen(false)
                    setSearch("")
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/[0.06] transition-colors ${
                    c.code === country.code ? "bg-[#FF2D6F]/10" : ""
                  }`}
                >
                  <CountryFlag code={c.code} size={22} />
                  <span className="text-white text-[13px] flex-1 truncate">{c.name}</span>
                  <span className="font-mono font-bold text-[12px] text-white/65">{c.dial}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-4 text-center text-white/45 text-[12px]">No countries found</div>
              )}
            </div>
          </div>,
          document.body
        )}
      </div>
      {error ? (
        <p className="text-red-400 text-[11px] mt-1.5">{error}</p>
      ) : (
        hint && <p className="text-white/40 text-[11px] mt-1.5 leading-snug">{hint}</p>
      )}
    </div>
  )
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
        value ? "bg-[#25D366]" : "bg-white/[0.10]"
      }`}
      aria-pressed={value}
    >
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all ${
          value ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  )
}

function LegalNote() {
  return (
    <div
      className="flex items-start gap-2.5 p-3 rounded-xl"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Lock className="w-4 h-4 text-[#FF2D6F] flex-shrink-0 mt-0.5" strokeWidth={2.2} />
      <p className="text-white/55 text-[11px] leading-[1.55]">
        Your details are used only to prepare your quote and coordinate the booking — Prime Line AV will{" "}
        <b className="text-white/80">never sell or share your data with third parties</b>. Stored securely; you may
        request deletion any time.
      </p>
    </div>
  )
}

/* ============ ICONS ============ */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
