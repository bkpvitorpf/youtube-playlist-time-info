export const getAllPlaylistVideos = (location: 'playlist' | 'watch'): Array<Element> => {
    console.log("getting all playlist videos")

    const videos: Array<Element> = []

    const locationOptions = {
        'playlist': () => {
            document.querySelectorAll('ytd-playlist-video-renderer').forEach(element => videos.push(element))
        },
        'watch': () => {
            document.querySelectorAll('ytd-playlist-panel-video-renderer').forEach(element => videos.push(element))
        }
    }

    locationOptions[location]()

    return videos
}