export const getAllPlaylistVideos = (): Array<Element> => {
    const videos: Array<Element> = []

    document.querySelectorAll('ytd-playlist-video-renderer').forEach(element => videos.push(element))

    return videos
}