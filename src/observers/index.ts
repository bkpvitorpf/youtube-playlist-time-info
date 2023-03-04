import { CreateReactApp } from "../components/App";
import { Observer } from "../entities/observer";
import { getPlaylistTimeInfo } from "../functions/getPlaylistTimeInfo";
import { showTimeReportDisplayOnScreen } from "../functions/showTimeReportDisplayOnScreen";
import { usePlaylistStore } from "../stores/playlistStore";

const ReactApp = CreateReactApp()

export const urlObserver = Observer(() => {
    console.log('url changed, running observer...')

    usePlaylistStore.setState({currentSpeed: '1'})
    showTimeReportDisplayOnScreen(ReactApp)
    getPlaylistTimeInfo()
})