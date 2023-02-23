import { getPlaylistTimeInfo } from "../functions 2/getPlaylistTimeInfo";

export const configureExtension = () => {
    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function (args) {
        pushState.apply(history, args);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('runScript'));
    };

    history.replaceState = function (args) {
        replaceState.apply(history, args);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('runScript'));
    };

    window.addEventListener('popstate', function () {
        window.dispatchEvent(new Event('runScript'))
    });

    window.addEventListener('unload', () => {
        document.body.replaceWith(document.body) //Clean allObservers
    })

    document.addEventListener('click', () => {
        console.log('click')
        window.dispatchEvent(new Event('runScript'))
    })

    if (document.readyState != 'loading') {
        getPlaylistTimeInfo()
    } else {
        window.addEventListener('DOMContentLoaded', function () {
            window.dispatchEvent(new Event('runScript'))
        });
    }

    window.addEventListener('runScript', () => {
        //Fazer tipo, adicionar um botão, e esse botão vai sevir pra gerar o report de tempo
    })
}