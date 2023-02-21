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
            timeSpan.textContent = `Playlist Total Time: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

            watchedTimeSpan.textContent = `Playlist Watched Time: ${String(watchedHours).padStart(2, '0')}:${String(watchedMinutes).padStart(2, '0')}:${String(watchedSeconds).padStart(2, '0')}`

            unwatchedTimeSpan.textContent = `Playlist Unwatched Time: ${String(unwatchedHours).padStart(2, '0')}:${String(unwatchedMinutes).padStart(2, '0')}:${String(unwatchedSeconds).padStart(2, '0')}`
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