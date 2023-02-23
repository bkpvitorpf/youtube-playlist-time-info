import { getPlaylistInfo, waitElement } from "./index"

export const getPlaylistTimeInfo = () => {
    if (window.location.href.includes('playlist')) {
        waitElement('div#contents.style-scope ytd-playlist-video-list-renderer').then((youTubePlaylistListRenderer) => {
            new MutationObserver(() => getPlaylistInfo('playlist')).observe(youTubePlaylistListRenderer, { subtree: true, childList: true })
        })
    } else if (window.location.href.includes('watch')) {
        waitElement('div#below > ytd-playlist-panel-renderer > div#container > div#items').then((youTubePlaylistPanelRenderer) => {
            new MutationObserver(() => getPlaylistInfo('watch')).observe(youTubePlaylistPanelRenderer, { subtree: true, childList: true })
        })
    }
}