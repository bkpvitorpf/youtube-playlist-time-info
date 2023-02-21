
export interface VideoProps {
    hours: number,
    minutes: number,
    seconds: number,
    progressPercentage: number
}

export class Video {
    private props: VideoProps
    private timeInSeconds: number
    private watchedTimeInSeconds: number
    private unwatchedTimeInSeconds: number

    constructor(props: VideoProps) {
        this.props = props
        this.timeInSeconds = this.calculateTimeInSeconds()
        this.watchedTimeInSeconds = this.calculateWatchedTime()
        this.unwatchedTimeInSeconds = this.calculateUnwatchedTime()
    }

    public calculateTimeInSeconds(): number {
        const secondsFromHours = this.props.hours * 3600
        const secondsFromMinutes = this.props.minutes * 60

        return secondsFromHours + secondsFromMinutes + this.props.seconds
    }

    public calculateWatchedTime() {
        return Math.floor(this.timeInSeconds * (this.props.progressPercentage / 100))
    }

    public calculateUnwatchedTime() {
        return this.timeInSeconds - this.watchedTimeInSeconds
    }
}