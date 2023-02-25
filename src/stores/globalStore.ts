import { create } from "zustand";

type StoreType = {
    listObserver: MutationObserver | null
    panelObserver: MutationObserver | null
}

export const useGlobalStore = create<StoreType>(() => ({
    listObserver: null,
    panelObserver: null
}))