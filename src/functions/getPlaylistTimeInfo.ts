import { Playlist } from "../entities/playlist";
import { Video } from "../entities/video";
import { formatTime, getAllPlaylistVideos, getVideoInfo, TimeObject } from "./index";
import { showDisplayElementOnScreen } from "./showDisplayElementOnScreen";

export const getPlaylistTimeInfo = () => {
    const allPlaylistVideos = getAllPlaylistVideos()
    const videos: Array<Video> = []

    allPlaylistVideos.forEach(video => {
        const { hours, minutes, seconds, progressPercentage } = getVideoInfo(video)

        const videoInstance = new Video({ hours, minutes, seconds, progressPercentage })

        videos.push(videoInstance)
    })

    const playlistInstance = new Playlist({ videos })
    const playlistTimeInSeconds = playlistInstance.calculateTimeInSeconds()
    const playlistWatchedTimeInSeconds = playlistInstance.calculateWatchedTimeInSeconds()
    const playlistUnwatchedTimeInSeconds = playlistInstance.calculateUnwatchedTimeInSeconds()

    const { hours, minutes, seconds } = formatTime(playlistTimeInSeconds)

    const { hours: watchedHours, minutes: watchedMinutes, seconds: watchedSeconds } = formatTime(playlistWatchedTimeInSeconds)

    const { hours: unwatchedHours, minutes: unwatchedMinutes, seconds: unwatchedSeconds } = formatTime(playlistUnwatchedTimeInSeconds)

    const timeObject: TimeObject = {
        hours, minutes, seconds, unwatchedHours, unwatchedMinutes, unwatchedSeconds, watchedHours, watchedMinutes, watchedSeconds
    }

    showDisplayElementOnScreen(timeObject)
}