type FunctionReturn = {
    hours: number
    minutes: number
    seconds: number
    progressPercentage: number
}

export const getVideoInfo = (video: Element): FunctionReturn => {
    const videoTimeArray = video.querySelector('span#text')?.innerHTML.split(':')
    let hours = 0
    let minutes = 0
    let seconds = 0
    let progressPercentage = 0

    if (videoTimeArray) {
        if (videoTimeArray.length > 2) {
            hours = Number(videoTimeArray[0])
            minutes = Number(videoTimeArray[1])
            seconds = Number(videoTimeArray[2])
        } else {
            minutes = Number(videoTimeArray[0])
            seconds = Number(videoTimeArray[1])
        }
    }

    if (video.querySelector('div#progress')) {
        progressPercentage = Number(video.querySelector('div#progress')?.getAttribute('style')?.replace('width:', '').replace('%;', '').trim())
    }

    return {
        hours,
        minutes,
        seconds,
        progressPercentage,
    }
}