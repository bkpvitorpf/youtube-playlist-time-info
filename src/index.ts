import { urlSubject } from "./subjects";

//configureExtension();
let currentUrl = ''

setInterval(() => {
    if (currentUrl != window.location.href) {
        currentUrl = window.location.href
        urlSubject.notifyAllObservers()
    }
}, 2000)