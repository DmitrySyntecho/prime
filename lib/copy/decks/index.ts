import type { Deck } from "@/lib/copy/deck-types"
import { stageRental } from "./stage-rental"

/** Copy-deck pages by site route (national pages only — city variants keep the generic template). */
export const DECKS: Deck[] = [stageRental]

const byPath = new Map(DECKS.map((d) => [d.path, d]))
export const getDeck = (path: string) => byPath.get(path)
