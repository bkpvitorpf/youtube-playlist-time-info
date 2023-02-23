import { urlSubject } from "./subjects";

//configureExtension();
let currentUrl = ''

setInterval(() => {
    if (currentUrl != window.location.pathname) {
        currentUrl = window.location.pathname
        urlSubject.notifyAllObservers()
    }
}, 2000)