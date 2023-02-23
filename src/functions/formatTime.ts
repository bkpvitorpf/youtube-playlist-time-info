type FunctionReturn = {
    hours: string
    minutes: string
    seconds: string
}

export const formatTime = (timeInSeconds: number): FunctionReturn => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0')
    const seconds = String(Math.floor((timeInSeconds % 3600) % 60)).padStart(2, '0')

    return {
        hours,
        minutes,
        seconds
    }
}