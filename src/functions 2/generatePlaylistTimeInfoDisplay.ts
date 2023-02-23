export type TimeObject = {
    hours: number
    minutes: number
    seconds: number
    watchedHours: number
    watchedMinutes: number
    watchedSeconds: number
    unwatchedHours: number
    unwatchedMinutes: number
    unwatchedSeconds: number
}

export const generatePlaylistTimeInfoDisplay = ({ hours, minutes, seconds, watchedHours, watchedMinutes, watchedSeconds, unwatchedHours, unwatchedMinutes, unwatchedSeconds }: TimeObject): HTMLDivElement => {
    const divElement = document.createElement('div')

    divElement.style.fontFamily = 'Roboto'
    divElement.style.fontSize = '16px'
    divElement.className = 'playlist-time-info style-scope ytd-text-inline-expander'
    divElement.style.display = "flex";
    divElement.style.flexDirection = "column";
    divElement.style.marginTop = "1.5rem";

    const timeSpan = document.createElement('span')

    timeSpan.id = 'playlist-time-info-time'
    timeSpan.textContent = `Playlist Total Time: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

    const watchedTimeSpan = document.createElement('span')

    watchedTimeSpan.id = 'playlist-time-info-watchedTime'
    watchedTimeSpan.textContent = `Playlist Watched Time: ${String(watchedHours).padStart(2, '0')}:${String(watchedMinutes).padStart(2, '0')}:${String(watchedSeconds).padStart(2, '0')}`

    const unwatchedTimeSpan = document.createElement('span')

    unwatchedTimeSpan.id = 'playlist-time-info-unwatchedTime'
    unwatchedTimeSpan.textContent = `Playlist Unwatched Time: ${String(unwatchedHours).padStart(2, '0')}:${String(unwatchedMinutes).padStart(2, '0')}:${String(unwatchedSeconds).padStart(2, '0')}`

    divElement.appendChild(timeSpan)
    divElement.appendChild(watchedTimeSpan)
    divElement.appendChild(unwatchedTimeSpan)

    return divElement
}