import { CreateReactApp } from "../components/App";
import { Observer } from "../entities/observer";
import { getPlaylistTimeInfo } from "../functions/getPlaylistTimeInfo";
import { showTimeReportDisplayOnScreen } from "../functions/showTimeReportDisplayOnScreen";

const ReactApp = CreateReactApp()

export const urlObserver = Observer(() => {
    console.log('url changed, running observer...')

    showTimeReportDisplayOnScreen(ReactApp)
    getPlaylistTimeInfo()
})