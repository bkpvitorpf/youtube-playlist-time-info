import React, { ButtonHTMLAttributes } from "react";
import { SpeedOptions } from "../functions/calculatePlaylistTime";

type ButtonProps = {
    speedValue: SpeedOptions
    currentSpeed: SpeedOptions
} & ButtonHTMLAttributes<HTMLButtonElement>

const buttonStyles: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#4b5563',
    border: 'none',
    fontSize: '14px',
    color: '#f9fafb'
}

const buttonActiveStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: '#f9fafb',
    color: 'black',
}

export const CustomButton: React.FC<ButtonProps> = ({ speedValue, currentSpeed, ...props }) => {
    return (
        <button {...props} style={currentSpeed === speedValue ? buttonActiveStyles : buttonStyles}> {speedValue === '1' ? 'Normal' : speedValue}</ button>
    )
}