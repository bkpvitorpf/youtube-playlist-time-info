import * as ReactDOM from 'react-dom';
import { waitElement } from "./waitElement";

export const showTimeReportDisplayOnScreen = (App: React.DetailedReactHTMLElement<{ id: string }, HTMLElement>) => {
    if (window.location.href.includes('playlist')) {
        waitElement('div.metadata-wrapper').then((playlistMetadataContainer) => {
            const auxiliarDivElement = playlistMetadataContainer.querySelector('#playlist-time-info-aux')

            if (!auxiliarDivElement) {
                const playlistMetadataCollapsableElement = document.querySelector('div.metadata-action-bar') as Element

                const auxiliarDiv = document.createElement('div')
                auxiliarDiv.id = 'playlist-time-info-aux'

                playlistMetadataContainer.insertBefore(auxiliarDiv, playlistMetadataCollapsableElement)

                waitElement('div.metadata-wrapper > #playlist-time-info-aux').then(auxiliarDivElement => {
                    ReactDOM.render(App, auxiliarDivElement)
                })
            }
        })
    } else if (window.location.href.includes('watch')) {
        waitElement('#header-contents').then(() => {
            const playlistPanelElement = document.querySelectorAll('#container > #items')[1].parentElement as Element

            const auxiliarDivElement = playlistPanelElement.querySelector('#playlist-time-info-aux')

            if (!auxiliarDivElement) {
                const listVideosElement = playlistPanelElement.querySelector('#items') as Element

                const auxiliarDiv = document.createElement('div')
                auxiliarDiv.id = 'playlist-time-info-aux'
                auxiliarDiv.style.marginBottom = '1.5rem'
                auxiliarDiv.style.color = '#f9fafb'
                auxiliarDiv.style.marginLeft = '4px'

                playlistPanelElement.insertBefore(auxiliarDiv, listVideosElement)

                waitElement('#container > #playlist-time-info-aux').then(auxiliarDivElement => {
                    console.log('Era pra renderizar')
                    ReactDOM.render(App, auxiliarDivElement)
                })
            }
        })
    }
}