import React from "react"
import { usePlaylistStore } from "../stores/playlistStore"

export const TimeReport: React.FC = () => {
    const playlistTimeObject = usePlaylistStore(state => state.timeDetails)

    return (
        <>
            <div style={{
                fontSize: '16px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1.5rem',
                fontFamily: 'Roboto'
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: 'column'
                }}>
                    <span>Playlist Time: {playlistTimeObject.hours}:{playlistTimeObject.minutes}:{playlistTimeObject.seconds}</span>
                    <span>Playlist watchedTime: {playlistTimeObject.watchedHours}:{playlistTimeObject.watchedMinutes}:{playlistTimeObject.watchedSeconds}</span>
                    <span>Playlist unwatchedTime: {playlistTimeObject.unwatchedHours}:{playlistTimeObject.unwatchedMinutes}:{playlistTimeObject.unwatchedSeconds}</span>
                </div>
            </div>
        </>
    )
}