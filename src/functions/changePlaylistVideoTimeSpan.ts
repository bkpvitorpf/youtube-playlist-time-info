import { useGlobalStore } from "../stores/globalStore"
import { usePlaylistStore } from "../stores/playlistStore"
import { SpeedOptions } from "./calculatePlaylistTime"
import { waitElement } from "./waitElement"

export const changePlaylistVideoTimeSpan = (speed: SpeedOptions) => {
    console.log('mudando')
    const videos = usePlaylistStore.getState().videos

    const listObserver = useGlobalStore.getState().listObserver
    const panelObserver = useGlobalStore.getState().panelObserver

    listObserver?.disconnect()
    panelObserver?.disconnect()

    videos.forEach(video => {
        const videoTime = video.calculateTimeInSeconds()

        const videoTimeWithSpeed = video.calculatePlaybackSpeedTimeInSeconds(videoTime, Number(speed))

        video.changeTimeSpanOfHtmlElement(videoTimeWithSpeed)
    })

    if (window.location.href.includes('playlist')) {
        waitElement('div#contents.style-scope ytd-playlist-video-list-renderer').then((youTubePlaylistListRenderer) => {
            listObserver?.observe(youTubePlaylistListRenderer, { subtree: true, childList: true })
        })
    } else if (window.location.href.includes('watch')) {
        waitElement('div#below > ytd-playlist-panel-renderer > div#container > div#items').then((youTubePlaylistPanelRenderer) => {
            panelObserver?.observe(youTubePlaylistPanelRenderer, { subtree: true, childList: true })
        })
    }
}