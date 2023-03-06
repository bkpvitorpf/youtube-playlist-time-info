import { createVideoInstance, VideoInstanceProps } from "../entities/video"
import { usePlaylistStore } from "../stores/playlistStore"
import { calculatePlaylistTime } from "./calculatePlaylistTime"
import { getAllPlaylistVideos } from "./getAllPlaylistVideos"
import { getVideoInfo } from "./getVideoInfo"

export const getPlaylistInfo = () => {
    const allPlaylistVideos = getAllPlaylistVideos()

    console.log('getting playlist info ...')

    let idCounter = 1
    const videos: Array<VideoInstanceProps> = []

    allPlaylistVideos.forEach(video => {
        const { hours, minutes, seconds, progressPercentage } = getVideoInfo(video)

        const videoInstance = createVideoInstance({ hours, minutes, seconds, progressPercentage, elementReference: video, symbolicId: idCounter })

        videos.push(videoInstance)

        //Removing custom time span
        video.querySelectorAll(`span#playlist-time-info-span-${idCounter}`).forEach(span => {
            span.remove()
        })

        //Removing the hidden prop of the original span to ensure that layout won't break when the user switches to a different page
        video.querySelectorAll('span#text').forEach(span => {
            span.removeAttribute('hidden')
        })

        idCounter++
    })

    usePlaylistStore.setState({ videos })

    calculatePlaylistTime(usePlaylistStore.getState().currentSpeed, videos)
}