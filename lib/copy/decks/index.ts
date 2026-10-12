import type { Deck } from "@/lib/copy/deck-types"
import { stageRental } from "./stage-rental"
import { projectorRental } from "./projector-rental"
import { speakerRental } from "./speaker-rental"
import { microphoneRental } from "./microphone-rental"
import { redCarpetRental } from "./red-carpet-rental"
import { liveStreamingProduction } from "./live-streaming-production"
import { corporateVideoProduction } from "./corporate-video-production"
import { eventVideoProduction } from "./event-video-production"
import { audioInstallation } from "./audio-installation"
import { videoInstallation } from "./video-installation"
import { videoWallInstallation } from "./video-wall-installation"
import { billboardInstallation } from "./billboard-installation"
import { homeAudioVideoInstallation } from "./home-audio-video-installation"
import { smartHomeInstallation } from "./smart-home-installation"
import { commercialAudioVideoInstallation } from "./commercial-audio-video-installation"
import { homeTheaterInstallation } from "./home-theater-installation"

/** Copy-deck pages by site route (national pages only — city variants keep the generic template). */
export const DECKS: Deck[] = [
  stageRental,
  projectorRental,
  speakerRental,
  microphoneRental,
  redCarpetRental,
  liveStreamingProduction,
  corporateVideoProduction,
  eventVideoProduction,
  audioInstallation,
  videoInstallation,
  videoWallInstallation,
  billboardInstallation,
  homeAudioVideoInstallation,
  smartHomeInstallation,
  commercialAudioVideoInstallation,
  homeTheaterInstallation,
]

const byPath = new Map(DECKS.map((d) => [d.path, d]))
export const getDeck = (path: string) => byPath.get(path)
