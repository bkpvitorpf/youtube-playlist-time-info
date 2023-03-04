import { useGlobalStore } from "../stores/globalStore"
import { getPlaylistInfo } from "./getPlaylistInfo"
import { waitElement } from "./waitElement"

export const getPlaylistTimeInfo = () => {
    if (window.location.href.includes('playlist')) {
        console.log('working on a playlist page...')

        useGlobalStore.setState({ location: 'playlist' })

        waitElement('div#contents.style-scope ytd-playlist-video-list-renderer').then((youTubePlaylistListRenderer) => {
            getPlaylistInfo()

            useGlobalStore.getState().connectListObserver(youTubePlaylistListRenderer)
        })
    } else if (window.location.href.includes('watch')) {
        console.log('working on a watch page...')

        useGlobalStore.setState({ location: 'watch' })

        waitElement('div#container > div#items').then(() => {
            getPlaylistInfo()

            const youTubePlaylistPanelRenderer = document.querySelectorAll('div#container > div#items')[1] as Element

            useGlobalStore.getState().connectPanelObserver(youTubePlaylistPanelRenderer)
        })
    }
}