import { createVideoInstance, VideoInstanceProps } from "../entities/video"
import { usePlaylistStore } from "../stores/playlistStore"
import { formatTime } from "./formatTime"
import { getAllPlaylistVideos } from "./getAllPlaylistVideos"
import { getVideoInfo } from "./getVideoInfo"

export const getPlaylistInfo = (location: 'playlist' | 'watch') => {
    console.log('getting playlist info ...')

    let idCounter = 1
    const allPlaylistVideos = getAllPlaylistVideos(location)
    const videos: Array<VideoInstanceProps> = []
    let playlistTimeInSeconds = 0
    let playlistWatchedTimeInSeconds = 0
    let playlistUnwatchedTimeInSeconds = 0

    allPlaylistVideos.forEach(video => {
        video.id = `playlist-time-info-${idCounter}`
        const { hours, minutes, seconds, progressPercentage } = getVideoInfo(video)

        const videoInstance = createVideoInstance({ hours, minutes, seconds, progressPercentage, elementReference: video })

        idCounter++
        playlistTimeInSeconds += videoInstance.calculateTimeInSeconds()
        playlistWatchedTimeInSeconds += videoInstance.calculateWatchedTimeInSeconds()
        playlistUnwatchedTimeInSeconds += videoInstance.calculateUnwatchedTimeInSeconds()

        videos.push(videoInstance)
    })

    const { hours, minutes, seconds } = formatTime(playlistTimeInSeconds)

    const { hours: watchedHours, minutes: watchedMinutes, seconds: watchedSeconds } = formatTime(playlistWatchedTimeInSeconds)

    const { hours: unwatchedHours, minutes: unwatchedMinutes, seconds: unwatchedSeconds } = formatTime(playlistUnwatchedTimeInSeconds)

    usePlaylistStore.setState({
        timeObject: {
            hours, minutes, seconds, unwatchedHours, unwatchedMinutes, unwatchedSeconds, watchedHours, watchedMinutes, watchedSeconds
        },
        videos
    })
}