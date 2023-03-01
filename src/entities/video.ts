import { formatTime } from "../functions/formatTime"

export interface VideoProps {
    hours: number,
    minutes: number,
    seconds: number,
    progressPercentage: number
    elementReference: Element
    symbolicId: number
}

export type VideoInstanceProps = {
    calculateTimeInSeconds: () => number
    calculateUnwatchedTimeInSeconds: () => number
    calculateWatchedTimeInSeconds: () => number
    calculatePlaybackSpeedTimeInSeconds: (time: number, videoSpeed: number) => number
    changeTimeSpanOfHtmlElement: (timeInSeconds: number) => void
}

export const createVideoInstance = (params: VideoProps): VideoInstanceProps => {
    const state: VideoProps = {
        hours: params.hours,
        minutes: params.minutes,
        seconds: params.seconds,
        progressPercentage: params.progressPercentage,
        elementReference: params.elementReference,
        symbolicId: params.symbolicId
    }

    const calculateTimeInSeconds = () => {
        const secondsFromHours = state.hours * 3600
        const secondsFromMinutes = state.minutes * 60

        return secondsFromHours + secondsFromMinutes + state.seconds
    }

    const calculateWatchedTimeInSeconds = () => {
        return Math.floor(calculateTimeInSeconds() * (state.progressPercentage / 100))
    }

    const calculateUnwatchedTimeInSeconds = () => {
        return calculateTimeInSeconds() - calculateWatchedTimeInSeconds()
    }

    const calculatePlaybackSpeedTimeInSeconds = (time: number, videoSpeed: number) => {
        return time / videoSpeed
    }

    const changeTimeSpanOfHtmlElement = (timeInSeconds: number) => {
        const spanParentElement = state.elementReference.querySelector('span#text')?.parentElement as Element
        const spanElement = state.elementReference.querySelector('span#text') as Element
        const previousAuxiliarSpanElement = document.querySelector(`#playlist-time-info-span-${state.symbolicId}`)
        let spanText

        spanElement.setAttribute('hidden', 'true')

        const { hours, minutes, seconds } = formatTime(timeInSeconds)

        if (Number(hours)) {
            spanText = `${hours}:${minutes}:${seconds}`
        } else {
            spanText = `${minutes}:${seconds}`
        }

        const auxiliarSpanElement = document.createElement('span')

        auxiliarSpanElement.id = `playlist-time-info-span-${state.symbolicId}`

        auxiliarSpanElement.textContent = spanText

        if (previousAuxiliarSpanElement) {
            previousAuxiliarSpanElement.remove()
        }

        spanParentElement.appendChild(auxiliarSpanElement)
    }

    return {
        calculateTimeInSeconds,
        calculateUnwatchedTimeInSeconds,
        calculateWatchedTimeInSeconds,
        calculatePlaybackSpeedTimeInSeconds,
        changeTimeSpanOfHtmlElement
    }
}