import React, { useState } from "react";
import { usePlaylistStore } from "../stores/playlistStore";
import { CustomButton } from "./CustomButton";

const speeds = ['0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '1.75', '2']

export const TimeReport: React.FC = () => {
    const [currentSpeed, setCurrentSpeed] = useState('Normal');
    const playlistTimeObject = usePlaylistStore(state => state.timeDetails)

    return (
        <>
            <div style={{
                fontSize: '16px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1.5rem',
                marginRight: '4px',
                textAlign: 'justify'
            }} className="style-scope ytd-text-inline-expander">

                <p>Displaying total playlist time at speed: {currentSpeed}</p>

                <div style={{
                    display: "flex",
                    flexDirection: 'column',
                    marginTop: '1rem'
                }}>
                    <span>Playlist Time: {playlistTimeObject.hours}:{playlistTimeObject.minutes}:{playlistTimeObject.seconds}</span>
                    <span>Playlist watchedTime: {playlistTimeObject.watchedHours}:{playlistTimeObject.watchedMinutes}:{playlistTimeObject.watchedSeconds}</span>
                    <span>Playlist unwatchedTime: {playlistTimeObject.unwatchedHours}:{playlistTimeObject.unwatchedMinutes}:{playlistTimeObject.unwatchedSeconds}</span>
                </div>

                <p style={{
                    marginTop: '1rem',
                    fontSize: '14px'
                }}>As the selected speed changes, the timestamp on the videos thumbnail will also change to match the selected speed.</p>

                <div style={{
                    display: 'grid',
                    marginTop: '1rem',
                    gridTemplateColumns: 'repeat(4,1fr)',
                    gridGap: '8px'
                }}>
                    {speeds.map(speed => (
                        <CustomButton currentSpeed={currentSpeed} speedValue={speed} onClick={() => {
                            setCurrentSpeed(speed)
                        }} />
                    ))}
                </div>
            </div>
        </>
    )
}