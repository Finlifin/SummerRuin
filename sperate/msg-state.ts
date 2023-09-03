import { atom } from "recoil"
import { MessageSpec } from "@/components/MessageStage"
import { MatrixClient, MatrixEvent, createClient } from "matrix-js-sdk"
import { Room } from "matrix-js-sdk"

export const messagesState = atom<MatrixEvent[]>({
    key: "messagesState"
    , default: []
})

export const roomsState = atom<Room[]>({
    key: "roomsState",
    default: [],
    dangerouslyAllowMutability: true
})

export const allMessagesState = atom<Map<string, MatrixEvent[]>>({
    key: "allMessageState",
    default: new Map
})

export const globalClient = atom<MatrixClient>({
    key: "globalClient",
    default: createClient({baseUrl: "http://localhost:8008"}),
    dangerouslyAllowMutability: true
})

export const roomNow = atom<string>({
    key: "roomNow",
    default: ""
})