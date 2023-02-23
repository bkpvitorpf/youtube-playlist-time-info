export const getAllPlaylistVideos = (location: string): Array<Element> => {
    const videos: Array<Element> = []

    const locationOptions = {
        'playlist': () => {
            document.querySelectorAll('ytd-playlist-video-renderer').forEach(element => videos.push(element))
        },
        'watch': () => {
            document.querySelectorAll('ytd-playlist-panel-video-renderer').forEach(element => videos.push(element))
        }
    }

    locationOptions[location as keyof typeof locationOptions]()

    return videos
}