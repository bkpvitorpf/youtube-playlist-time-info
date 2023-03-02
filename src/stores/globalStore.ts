import { create } from "zustand";
import { getPlaylistInfo } from "../functions/getPlaylistInfo";

type StoreType = {
    listObserver: MutationObserver
    panelObserver: MutationObserver,
    location: 'playlist' | 'watch',
    disconnectListObserver: () => void
    disconnectPanelObserver: () => void
    connectListObserver: (element: Element) => void
    connectPanelObserver: (element: Element) => void
}

export const useGlobalStore = create<StoreType>((set, get) => ({
    listObserver: new MutationObserver(() => getPlaylistInfo()),
    panelObserver: new MutationObserver(() => getPlaylistInfo()),
    location: 'playlist',
    disconnectListObserver: () => { get().listObserver.disconnect() },
    disconnectPanelObserver: () => { get().panelObserver.disconnect() },
    connectListObserver: (element: Element) => { get().listObserver.observe(element, { childList: true, subtree: true }) },
    connectPanelObserver: (element: Element) => { get().panelObserver.observe(element, { childList: true, subtree: true }) }
}))