import Link from "next/link"
import { ReasonsSplit, type Reason } from "@/components/blocks/reasons-split"

const REASONS: Reason[] = [
  {
    title: "One AV team, one contract",
    icon: "walkie-talkie",
    body: (
      <>
        Production, equipment rental, installation and LED walls come from the same company. You brief one team with one dedicated account manager, and{" "}
        <span className="hl">one contract covers the whole scope.</span>
      </>
    ),
  },
  {
    title: "Our own equipment inventory",
    icon: "flight-case",
    body: (
      <>
        We keep our own inventory and warehouse of top brand AV equipment. Your gear is reserved and prepped, <span className="hl">ready to deploy the moment your event is booked.</span>
      </>
    ),
  },
  {
    title: "In-house technicians on site",
    icon: "headset",
    body: (
      <>
        Our own technicians build the system and stay through your event. <span className="hl">The person who set up your AV is the same person standing next to it during the show.</span>
      </>
    ),
  },
  {
    title: "Coast-to-coast service",
    icon: "location-pin",
    body: (
      <>
        We staff events in every US state through our local crews, so your show gets <span className="hl">the same standard in any city.</span> Check your city on our{" "}
        <Link href="/locations" className="font-semibold text-white underline decoration-[#FF2D6F]/50 underline-offset-4 hover:decoration-[#FF2D6F]">
          locations page
        </Link>{" "}
        to see if we service your area.
      </>
    ),
  },
  {
    title: "Free quote, no obligation",
    icon: "stopwatch",
    body: (
      <>
        Tell us about your event, and we&apos;ll give you <span className="hl">an itemized quote in as fast as 30 minutes.</span> That speed means you can lock in decisions for your
        client sooner.
      </>
    ),
  },
]

/** Block 07 — sticky heading column + reason rows with 3D icons. */
export function HomeWhySection() {
  return (
    <ReasonsSplit
      id="why-us"
      eyebrow="Why choose Prime Line AV"
      heading={
        <>
          Here&apos;s why <span className="ds-accent-text">nothing goes wrong</span> at our events
        </>
      }
      lede={
        <>
          Most event problems start with multiple vendors who never planned the show together. At Prime Line AV, you&apos;ll get professional AV services from one team:{" "}
          <span className="hl">the people who plan your event are the people who run it.</span>
        </>
      }
      reasons={REASONS}
    />
  )
}
