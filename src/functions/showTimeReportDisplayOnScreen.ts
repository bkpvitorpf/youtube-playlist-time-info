import * as ReactDOM from 'react-dom';
import { waitElement } from "./waitElement";

export const showTimeReportDisplayOnScreen = (App: React.DetailedReactHTMLElement<{ id: string }, HTMLElement>) => {
    if (window.location.href.includes('playlist')) {
        waitElement('div.metadata-wrapper').then((playlistMetadataContainer) => {
            const auxiliarDivElement = document.querySelector('#playlist-time-info-aux')

            if (!auxiliarDivElement) {
                const playlistMetadataCollapsableElement = document.querySelector('div.metadata-action-bar') as Element

                const auxiliarDiv = document.createElement('div')
                auxiliarDiv.id = 'playlist-time-info-aux'

                playlistMetadataContainer.insertBefore(auxiliarDiv, playlistMetadataCollapsableElement)

                waitElement('#playlist-time-info-aux').then(auxiliarDivElement => {
                    ReactDOM.render(App, auxiliarDivElement)
                })
            }
        })
    } else if (window.location.href.includes('watch')) {
        console.log('vamos implementar depois')
    }
}