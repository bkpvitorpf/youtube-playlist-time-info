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
  let allPlaylistVideos

  // Removing previous playlistTimeInfo div element
  const playlistTimeInfoElements = document.querySelectorAll('.playlist-time-info')

  playlistTimeInfoElements.forEach(playlistTimeInfoDiv => playlistTimeInfoDiv.remove())

  // Getting videos info
  if(window.location.href.includes('playlist')){
    //Getting playlist videos on playlist page
    allPlaylistVideos= document.querySelectorAll('ytd-playlist-video-renderer')
  }else{
    //Getting playlist videos of panel on display screen when user is watching playlist video
    allPlaylistVideos= document.querySelectorAll('ytd-playlist-panel-video-renderer')
  }

  let playlistHours = playlistMinutes = playlistSeconds = playlistWatchedHours = playlistWatchedMinutes = playlistWatchedSeconds = playlistUnwatchedHours = playlistUnwatchedMinutes = playlistUnwatchedSeconds =0

  allPlaylistVideos.forEach(video =>{
    let videoProgressValue = videoHours = videoMinutes = videoSeconds = unwatchedTimeInSeconds = unwatchedVideoHours = unwatchedVideoMinutes = unwatchedVideoSeconds = 0

    if(video.querySelector('span#text') && video.querySelector('span#text').innerHTML.includes(':')){
      const videoTimeParts = video.querySelector('span#text').innerHTML.split(':')

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

      //Converting all the time to seconds
      const totalVideoTimeInSeconds = convertToSeconds(videoHours,'hour') + convertToSeconds(videoMinutes,'minute') + videoSeconds

      //Calculating watched and unwatched time from video progress bar percentage 
      const watchedVideoTimeInSeconds = totalVideoTimeInSeconds * (videoProgressValue/100)
      const unwatchedVideoTimeInSeconds = totalVideoTimeInSeconds - watchedVideoTimeInSeconds

      //Converting the values to hours:minutes:seconds format
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
    }
  })

  // Formatting time values
  const [hours,minutes,seconds] = formatTime(playlistHours,playlistMinutes,playlistSeconds)

  const [watchedHours,watchedMinutes,watchedSeconds] = formatTime(playlistWatchedHours,playlistWatchedMinutes,playlistWatchedSeconds)

  const [unwatchedHours,unwatchedMinutes,unwatchedSeconds] = formatTime(playlistUnwatchedHours,playlistUnwatchedMinutes,playlistUnwatchedSeconds)

  //Creating div element and spans to show time info
  const divElement = document.createElement('div')
  const styleConfigString = "font-family: 'Roboto','Arial',sans-serif; font-size: 1.6rem; color: var(--yt-spec-text-secondary); font-weight: 400; line-height: 2rem;"

  divElement.className = "playlist-time-info"
  divElement.style.display = 'flex'
  divElement.style.flexDirection = 'column'
  divElement.style.marginTop= '1.5rem'
  divElement.style.marginBottom= '1.5rem'

  const totalPlaylistTimeSpan = document.createElement('span')
  totalPlaylistTimeSpan.style = styleConfigString
  totalPlaylistTimeSpan.textContent = `Playlist Total Time: ${hours}:${minutes}:${seconds}`

  const playlistWatchedTimeSpan = document.createElement('span')
  playlistWatchedTimeSpan.style = styleConfigString
  playlistWatchedTimeSpan.textContent = `Playlist Watched Time: ${watchedHours}:${watchedMinutes}:${watchedSeconds}`

  const playlistUnwatchedTimeSpan = document.createElement('span')
  playlistUnwatchedTimeSpan.style = styleConfigString
  playlistUnwatchedTimeSpan.textContent = `Playlist Unwatched Time: ${unwatchedHours}:${unwatchedMinutes}:${unwatchedSeconds}`
  
  divElement.appendChild(totalPlaylistTimeSpan)
  divElement.appendChild(playlistWatchedTimeSpan)
  divElement.appendChild(playlistUnwatchedTimeSpan)

  // Displaying new time values

  if(window.location.href.includes('playlist')){
    const playlistLeftAsideElement = document.querySelector('.style-scope ytd-playlist-sidebar-primary-info-renderer')

    playlistLeftAsideElement.appendChild(divElement)
  }else{
    const playlistRightAsideElement = document.querySelectorAll('#header-description')

    playlistRightAsideElement[1].appendChild(divElement)
  }
}

//Making the extension work
setTimeout(()=>{
  getPlaylistTimeInfo()

  //Watching playlist changes or if the user switches playlists
  new MutationObserver(() => {
    getPlaylistTimeInfo()
  }).observe(window.location.href.includes('playlist')?
  document.querySelector('.style-scope ytd-section-list-renderer') :
  document.querySelectorAll('div#items')[3],
  {subtree: true, childList: true})
},window.location.href.includes('playlist')?2500:4500)
