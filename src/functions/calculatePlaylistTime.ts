import { VideoInstanceProps } from "../entities/video"
import { usePlaylistStore } from "../stores/playlistStore"
import { changePlaylistVideoTimeSpan } from "./changePlaylistVideoTimeSpan"
import { formatTime } from "./formatTime"

export type SpeedOptions = '0.25' | '0.5' | '0.75' | '1' | '1.25' | '1.5' | '1.75' | '2'

export const calculatePlaylistTime = (speed: SpeedOptions, playlistVideos: VideoInstanceProps[]) => {
    console.log('Calculando o tempo da playlist....')

    let playlistTime = 0
    let playlistWatchedTime = 0
    let playlistUnwatchedTime = 0

    playlistVideos?.forEach(video => {
        const videoTime = video.calculateTimeInSeconds()
        const videoWatchedTime = video.calculateWatchedTimeInSeconds()
        const videoUnwatchedTime = video.calculateUnwatchedTimeInSeconds()

        const videoTimeWithSpeed = video.calculatePlaybackSpeedTimeInSeconds(videoTime, Number(speed))

        const videoWatchedTimeWithSpeed = video.calculatePlaybackSpeedTimeInSeconds(videoWatchedTime, Number(speed))

        const videoUnwatchedTimeWithSpeed = video.calculatePlaybackSpeedTimeInSeconds(videoUnwatchedTime, Number(speed))

        playlistTime += videoTimeWithSpeed
        playlistWatchedTime += videoWatchedTimeWithSpeed
        playlistUnwatchedTime += videoUnwatchedTimeWithSpeed
    });

    const { hours, minutes, seconds } = formatTime(playlistTime)

    const { hours: watchedHours, minutes: watchedMinutes, seconds: watchedSeconds } = formatTime(playlistWatchedTime)

    const { hours: unwatchedHours, minutes: unwatchedMinutes, seconds: unwatchedSeconds } = formatTime(playlistUnwatchedTime)

    const timeDetails = {
        hours, minutes, seconds, unwatchedHours, unwatchedMinutes, unwatchedSeconds, watchedHours, watchedMinutes, watchedSeconds
    }

    if (timeDetails != usePlaylistStore.getState().timeDetails) {
        console.log('entra aqui')
        usePlaylistStore.setState({ timeDetails })
    }

    return timeDetails
}