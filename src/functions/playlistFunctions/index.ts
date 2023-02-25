// import { usePlaylistStore } from "../../stores/playlistStore"

// type SpeedOptions = '0.25' | '0.5' | '0.75' | 'Normal' | '1.25'

// export const changePlaylistSpeed = (speed: SpeedOptions) => {
//     const speeds = {
//         '0.25': () => {
//             const playlistVideos = usePlaylistStore.getState().videos

//             playlistVideos.forEach(video => {
//                 const timeInSeconds = video.calculateTimeInSeconds()

//                 const newTimeInSeconds = video.calculatePlaybackSpeedTimeInSeconds(timeInSeconds, Number(speed))

//                 video.changeTimeSpanOfHtmlElement(newTimeInSeconds)
//             });
//         },
//         '0.5': () => { },
//         '0.75': () => { },
//         'Normal': () => { },
//         '1.25': () => { },
//         '1.5': () => { },
//         '1.75': () => { },
//         '2': () => { },
//     }

//     speeds[speed]()
// }