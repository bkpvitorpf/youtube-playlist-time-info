import { getPlaylistTimeInfo, waitElement } from "./functions";

waitElement('div#contents.style-scope ytd-playlist-video-list-renderer').then(() => {
    const contentDiv = document.querySelector('div#contents.style-scope ytd-playlist-video-list-renderer')

    if (contentDiv) {
        new MutationObserver(getPlaylistTimeInfo).observe(contentDiv, { subtree: true, childList: true })
    }
})