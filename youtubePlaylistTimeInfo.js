let lastSiteUrl = '';

if(window.location.href.includes('playlist?list=')){
  getPlaylistTimeInfo()
}

// Detecting url changes on SPA and reload extension
new MutationObserver(() => {
  const url = location.href;

  if (url !== lastSiteUrl) {
    lastSiteUrl = url;

    getPlaylistTimeInfo()
  }
}).observe(document, {subtree: true, childList: true});

// Functions
const convertToSeconds = (value,timeFormat) => {
  const allowedFormats = {
    'minute': (value)=>{
      return value * 60
    },
    'hour': (value)=>{
      return value * 3600
    }
  }

  return allowedFormats[timeFormat](value)
}

const formatSecondsToHoursMinutesAndSeconds = (totalSeconds)=>{
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 3600 % 60)

  return [hours,minutes,seconds]
}

const formatTime  = (hours,minutes,seconds) => {
  const minutesFromSeconds = Math.floor(seconds/60)

  const totalMinutes = minutes + minutesFromSeconds

  const hoursFromMinutes = Math.floor(totalMinutes/60)

  const totalHours = hours + hoursFromMinutes

  const finalHours = String(totalHours).padStart(2,'0')
  const finalMinutes = String(Math.floor(totalMinutes % 60)).padStart(2,'0')
  const finalSeconds = String(Math.floor(seconds % 60)).padStart(2,'0') 

  return [finalHours,finalMinutes,finalSeconds]
}

const getPlaylistTimeInfo = () =>{
  setTimeout(()=>{
    // Removing previous playlistTimeInfo
    const playlistTimeInfoElements = document.querySelectorAll('.playlist-time-info')

    playlistTimeInfoElements.forEach(playlistTimeInfoDiv => playlistTimeInfoDiv.remove())

    // Getting videos info
    const allPlaylistVideos= document.querySelectorAll('.style-scope ytd-playlist-video-renderer')

    let playlistHours = playlistMinutes = playlistSeconds = playlistWatchedHours = playlistWatchedMinutes = playlistWatchedSeconds = playlistUnwatchedHours = playlistUnwatchedMinutes = playlistUnwatchedSeconds =0

    allPlaylistVideos.forEach(video =>{
      let videoProgressValue = videoHours = videoMinutes = videoSeconds = unwatchedTimeInSeconds = unwatchedVideoHours = unwatchedVideoMinutes = unwatchedVideoSeconds = 0

      //Get video time
      const videoTimeParts = video.querySelector('#text').innerHTML.split(':')

      if(videoTimeParts.length > 2){
        videoHours = Number(videoTimeParts[0])
        videoMinutes = Number(videoTimeParts[1])
        videoSeconds = Number(videoTimeParts[2])
      }else{
        videoHours = 0
        videoMinutes = Number(videoTimeParts[0])
        videoSeconds = Number(videoTimeParts[1])
      }

      //Get watched and unwatched video time
      const videoProgressBarElement = video.querySelector('.style-scope ytd-thumbnail-overlay-resume-playback-renderer')

      if(videoProgressBarElement){
        const videoProgressBarLastChild = videoProgressBarElement.lastChild
        const styleString = videoProgressBarLastChild.getAttribute('style')
        videoProgressValue = styleString.replace('width: ','').replace('%;','')
      }

      const totalVideoTimeInSeconds = convertToSeconds(videoHours,'hour') + convertToSeconds(videoMinutes,'minute') + videoSeconds

      const watchedVideoTimeInSeconds = totalVideoTimeInSeconds * (videoProgressValue/100)
      const unwatchedVideoTimeInSeconds = totalVideoTimeInSeconds - watchedVideoTimeInSeconds

      const [watchedHours, watchedMinutes, watchedSeconds] = formatSecondsToHoursMinutesAndSeconds(watchedVideoTimeInSeconds)

      const [unwatchedHours, unwatchedMinutes, unwatchedSeconds] = formatSecondsToHoursMinutesAndSeconds(unwatchedVideoTimeInSeconds)

      // Assigning time values
      playlistHours += videoHours
      playlistMinutes += videoMinutes
      playlistSeconds += videoSeconds

      playlistWatchedHours += watchedHours
      playlistWatchedMinutes += watchedMinutes
      playlistWatchedSeconds += watchedSeconds

      playlistUnwatchedHours += unwatchedHours
      playlistUnwatchedMinutes += unwatchedMinutes
      playlistUnwatchedSeconds += unwatchedSeconds
    })

    // Formatting time values
    const [hours,minutes,seconds] = formatTime(playlistHours,playlistMinutes,playlistSeconds)

    const [watchedHours,watchedMinutes,watchedSeconds] = formatTime(playlistWatchedHours,playlistWatchedMinutes,playlistWatchedSeconds)

    const [unwatchedHours,unwatchedMinutes,unwatchedSeconds] = formatTime(playlistUnwatchedHours,playlistUnwatchedMinutes,playlistUnwatchedSeconds)

    //Creating div element to show time info
    const divElement = document.createElement('div')
    const styleConfigString = "font-family: 'Roboto','Arial',sans-serif; font-size: 1.6rem; color: var(--yt-spec-text-secondary); font-weight: 400; line-height: 2rem;"

    divElement.className = "playlist-time-info"
    divElement.style.display = 'flex'
    divElement.style.flexDirection = 'column'
    divElement.style.marginTop= '1.5rem'
    divElement.style.marginBottom= '1.5rem'
    divElement.innerHTML = `
      <span style="${styleConfigString}">
        Playlist Total Time: ${hours}:${minutes}:${seconds}
      </span>
      <span style="${styleConfigString}">
        Playlist Watched Time: ${watchedHours}:${watchedMinutes}:${watchedSeconds}
      </span>
      <span style="${styleConfigString}">
        Playlist Unwatched Time: ${unwatchedHours}:${unwatchedMinutes}:${unwatchedSeconds}
      </span>
    `

    // Displaying new time values
    const playlistLeftAsideElement = document.querySelector('.style-scope ytd-playlist-sidebar-primary-info-renderer')

    playlistLeftAsideElement.appendChild(divElement)
  },2500) 
}