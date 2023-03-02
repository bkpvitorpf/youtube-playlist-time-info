import { useGlobalStore } from "../stores/globalStore"
import { usePlaylistStore } from "../stores/playlistStore"
import { SpeedOptions } from "./calculatePlaylistTime"
import { waitElement } from "./waitElement"

export const changePlaylistVideoTimeSpan = (speed: SpeedOptions) => {
    console.log('mudando')

    const videos = usePlaylistStore.getState().videos

    useGlobalStore.getState().disconnectListObserver()
    useGlobalStore.getState().disconnectPanelObserver()

    videos.forEach(video => {
        const videoTime = video.calculateTimeInSeconds()

        const videoTimeWithSpeed = video.calculatePlaybackSpeedTimeInSeconds(videoTime, Number(speed))

        video.changeTimeSpanOfHtmlElement(videoTimeWithSpeed)
    })

    if (window.location.href.includes('playlist')) {
        waitElement('div#contents.style-scope ytd-playlist-video-list-renderer').then((youTubePlaylistListRenderer) => {
            useGlobalStore.getState().connectListObserver(youTubePlaylistListRenderer)
        })
    } else if (window.location.href.includes('watch')) {
        waitElement('div#below > ytd-playlist-panel-renderer > div#container > div#items').then((youTubePlaylistPanelRenderer) => {
            useGlobalStore.getState().connectPanelObserver(youTubePlaylistPanelRenderer)
        })
    }
}