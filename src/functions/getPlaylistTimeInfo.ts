import { getPlaylistInfo } from "./getPlaylistInfo"
import { waitElement } from "./waitElement"

export const getPlaylistTimeInfo = () => {
    if (window.location.href.includes('playlist')) {
        console.log('working on a playlist page...')

        waitElement('div#contents.style-scope ytd-playlist-video-list-renderer').then((youTubePlaylistListRenderer) => {
            getPlaylistInfo('playlist')
            new MutationObserver(() => getPlaylistInfo('playlist')).observe(youTubePlaylistListRenderer, { subtree: true, childList: true })
        })
    } else if (window.location.href.includes('watch')) {
        console.log('working on a watch page...')

        waitElement('div#below > ytd-playlist-panel-renderer > div#container > div#items').then((youTubePlaylistPanelRenderer) => {
            getPlaylistInfo('watch')
            new MutationObserver(() => getPlaylistInfo('watch')).observe(youTubePlaylistPanelRenderer, { subtree: true, childList: true })
        })
    }
}