type FunctionReturn = {
    hours: number
    minutes: number
    seconds: number
}

export const formatTime = (timeInSeconds: number): FunctionReturn => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = Math.floor((timeInSeconds % 3600) % 60)

    return {
        hours,
        minutes,
        seconds
    }
}