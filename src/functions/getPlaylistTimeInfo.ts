import { useGlobalStore } from "../stores/globalStore"
import { getPlaylistInfo } from "./getPlaylistInfo"
import { waitElement } from "./waitElement"

export const getPlaylistTimeInfo = () => {
    if (window.location.href.includes('playlist')) {
        console.log('working on a playlist page...')

        useGlobalStore.setState({ location: 'playlist' })

        waitElement('div#contents.style-scope ytd-playlist-video-list-renderer').then((youTubePlaylistListRenderer) => {
            useGlobalStore.getState().connectListObserver(youTubePlaylistListRenderer)
        })
    } else if (window.location.href.includes('watch')) {
        console.log('working on a watch page...')

        waitElement('div#below > ytd-playlist-panel-renderer > div#container > div#items').then((youTubePlaylistPanelRenderer) => {
            // getPlaylistInfo('watch')

            const observer = useGlobalStore.getState().panelObserver

            if (!observer) {
                console.log('creating a panel observer...')

                const panelObserver = new MutationObserver(() => getPlaylistInfo())

                panelObserver.observe(youTubePlaylistPanelRenderer, { subtree: true, childList: true })

                useGlobalStore.setState({
                    panelObserver
                })
            }
        })
    }
}