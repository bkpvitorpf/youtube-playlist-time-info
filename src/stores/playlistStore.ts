import { create } from "zustand";
import { VideoInstanceProps } from "../entities/video";

type StoreType = {
    videos: Array<VideoInstanceProps>,
    timeDetails: PlaylistTimeDetails,
    updateTimeDetails: (timeDetails: PlaylistTimeDetails) => void
}

export type PlaylistTimeDetails = {
    hours: string
    minutes: string
    seconds: string
    watchedHours: string
    watchedMinutes: string
    watchedSeconds: string
    unwatchedHours: string
    unwatchedMinutes: string
    unwatchedSeconds: string
}

export const usePlaylistStore = create<StoreType>((set) => ({
    videos: [],
    timeDetails: {
        hours: '00',
        minutes: '00',
        seconds: '00',
        watchedHours: '00',
        watchedMinutes: '00',
        watchedSeconds: '00',
        unwatchedHours: '00',
        unwatchedMinutes: '00',
        unwatchedSeconds: '00'
    },
    updateTimeDetails: (timeDetails) => set({ timeDetails }),
}))