import { generatePlaylistTimeInfoDisplay, TimeObject } from "./generatePlaylistTimeInfoDisplay"
import { waitElement } from "./waitElement"

export const showDisplayElementOnScreen = (timeObject: TimeObject,) => {
    if (document.querySelector('.playlist-time-info')) {
        const { hours, minutes, seconds, unwatchedHours, unwatchedMinutes, unwatchedSeconds, watchedHours, watchedMinutes, watchedSeconds } = timeObject
        const playlistTimeInfoDisplay = document.querySelector('.playlist-time-info')

        const timeSpan = playlistTimeInfoDisplay?.querySelector('span#playlist-time-info-time')
        const watchedTimeSpan = playlistTimeInfoDisplay?.querySelector('span#playlist-time-info-watchedTime')
        const unwatchedTimeSpan = playlistTimeInfoDisplay?.querySelector('span#playlist-time-info-unwatchedTime')

        if (timeSpan && watchedTimeSpan && unwatchedTimeSpan) {
            timeSpan.textContent = `Playlist Total Time: ${hours}:${minutes}:${seconds}`

            watchedTimeSpan.textContent = `Playlist Watched Time: ${watchedHours}:${watchedMinutes}:${watchedSeconds}`

            unwatchedTimeSpan.textContent = `Playlist Unwatched Time: ${unwatchedHours}:${unwatchedMinutes}:${unwatchedSeconds}`
        }
    } else {
        const playlistTimeInfoDisplay = generatePlaylistTimeInfoDisplay(timeObject)

        waitElement('div.metadata-wrapper').then(() => {
            const playlistMetadataContainer = document.querySelector('div.metadata-wrapper')

            const playlistMetadataCollapsableElement = document.querySelector('div.metadata-action-bar')

            playlistMetadataContainer?.insertBefore(playlistTimeInfoDisplay, playlistMetadataCollapsableElement)
        })
    }
}