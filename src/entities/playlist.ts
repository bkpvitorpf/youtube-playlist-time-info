import { Video } from "./video"

export interface PlaylistProps {
    videos: Array<Video>
}

export class Playlist {
    private props: PlaylistProps
    private timeInSeconds: number
    private watchedTimeInSeconds: number
    private unwatchedTimeInSeconds: number

    constructor(props: PlaylistProps) {
        this.props = props
        this.timeInSeconds = this.calculateTimeInSeconds()
        this.watchedTimeInSeconds = this.calculateWatchedTimeInSeconds()
        this.unwatchedTimeInSeconds = this.calculateWatchedTimeInSeconds()
    }

    public calculateTimeInSeconds(): number {
        let timeInSeconds = 0

        this.props.videos.forEach(video => {
            timeInSeconds += video.calculateTimeInSeconds()
        })

        return timeInSeconds
    }


    public calculateWatchedTimeInSeconds() {
        let watchedTimeInSeconds = 0

        this.props.videos.forEach(video => {
            watchedTimeInSeconds += video.calculateWatchedTime()
        })

        return watchedTimeInSeconds
    }

    public calculateUnwatchedTimeInSeconds() {
        let unwatchedTimeInSeconds = 0

        this.props.videos.forEach(video => {
            unwatchedTimeInSeconds += video.calculateUnwatchedTime()
        })

        return unwatchedTimeInSeconds
    }
}