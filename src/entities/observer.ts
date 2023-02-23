export const Observer = (callback: () => any) => {
    return {
        run: callback
    }
}