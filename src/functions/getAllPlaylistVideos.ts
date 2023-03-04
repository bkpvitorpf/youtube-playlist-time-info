import { useGlobalStore } from "../stores/globalStore"

export const getAllPlaylistVideos = (): Array<Element> => {
    console.log("getting all playlist videos")

    const videos: Array<Element> = []

    const locationOptions = {
        'playlist': () => {
            document.querySelectorAll('ytd-playlist-video-renderer').forEach(element => videos.push(element))
        },
        'watch': () => {
            const playlistPanelElement = document.querySelectorAll('#container > #items')[1].parentElement as Element
            playlistPanelElement.querySelectorAll('ytd-playlist-panel-video-renderer').forEach(element => videos.push(element))
        }
    }

    locationOptions[useGlobalStore.getState().location]()

    return videos
}