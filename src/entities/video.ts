import { formatTime } from "../functions/formatTime"

export interface VideoProps {
    hours: number,
    minutes: number,
    seconds: number,
    progressPercentage: number
    elementReference: Element
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
        elementReference: params.elementReference
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
        const spanElement = state.elementReference.querySelector('span#text') as Element

        const { hours, minutes, seconds } = formatTime(timeInSeconds)

        if (Number(hours)) {
            spanElement.textContent = `${hours}:${minutes}:${seconds}`
        } else {
            spanElement.textContent = `${minutes}:${seconds}`
        }
    }

    return {
        calculateTimeInSeconds,
        calculateUnwatchedTimeInSeconds,
        calculateWatchedTimeInSeconds,
        calculatePlaybackSpeedTimeInSeconds,
        changeTimeSpanOfHtmlElement
    }
}