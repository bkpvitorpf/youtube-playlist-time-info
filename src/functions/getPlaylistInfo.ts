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

        idCounter++
    })

    usePlaylistStore.setState({ videos })

    calculatePlaylistTime(usePlaylistStore.getState().currentSpeed, videos)
}