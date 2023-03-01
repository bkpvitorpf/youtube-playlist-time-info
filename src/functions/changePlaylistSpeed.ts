import { usePlaylistStore } from "../stores/playlistStore"
import { formatTime } from "./formatTime"

export type SpeedOptions = '0.25' | '0.5' | '0.75' | '1' | '1.25' | '1.5' | '1.75' | '2'

export const changePlaylistSpeed = (speed: SpeedOptions) => {
    let playlistTimeWithSpeed = 0
    let playlistWatchedTimeWithSpeed = 0
    let playlistUnwatchedTimeWithSpeed = 0

    const playlistVideos = usePlaylistStore.getState().videos

    playlistVideos.forEach(video => {
        const videoTime = video.calculateTimeInSeconds()
        const videoWatchedTime = video.calculateWatchedTimeInSeconds()
        const videoUnwatchedTime = video.calculateUnwatchedTimeInSeconds()

        const videoTimeWithSpeed = video.calculatePlaybackSpeedTimeInSeconds(videoTime, Number(speed))

        const videoWatchedTimeWithSpeed = video.calculatePlaybackSpeedTimeInSeconds(videoWatchedTime, Number(speed))

        const videoUnwatchedTimeWithSpeed = video.calculatePlaybackSpeedTimeInSeconds(videoUnwatchedTime, Number(speed))

        playlistTimeWithSpeed += videoTimeWithSpeed
        playlistWatchedTimeWithSpeed += videoWatchedTimeWithSpeed
        playlistUnwatchedTimeWithSpeed += videoUnwatchedTimeWithSpeed
    });

    const { hours, minutes, seconds } = formatTime(playlistTimeWithSpeed)

    const { hours: watchedHours, minutes: watchedMinutes, seconds: watchedSeconds } = formatTime(playlistWatchedTimeWithSpeed)

    const { hours: unwatchedHours, minutes: unwatchedMinutes, seconds: unwatchedSeconds } = formatTime(playlistUnwatchedTimeWithSpeed)

    usePlaylistStore.setState({
        timeDetails: {
            hours, minutes, seconds, unwatchedHours, unwatchedMinutes, unwatchedSeconds, watchedHours, watchedMinutes, watchedSeconds
        }
    })
}