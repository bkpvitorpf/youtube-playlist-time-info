export type ObserverType = {
    run: CallbackType
}

type CallbackType = (params?: any) => any

export const Observer = (callback: CallbackType) => {
    return {
        run: callback
    }
}