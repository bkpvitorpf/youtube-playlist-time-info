import { generateTimeReportDisplay } from "./generateTimeReportDisplay";
import { waitElement } from "./waitElement";

export const showTimeReportDisplayOnScreen = () => {
    waitElement('div.metadata-wrapper').then((playlistMetadataContainer) => {
        const playlistMetadataCollapsableElement = document.querySelector('div.metadata-action-bar')

        const playlistTimeInfoDisplay = generateTimeReportDisplay()

        playlistMetadataContainer?.insertBefore(playlistTimeInfoDisplay, playlistMetadataCollapsableElement)
    })
}