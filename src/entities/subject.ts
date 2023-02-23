import { ObserverType } from "./observer"

type StateProps = {
    observers: Array<ObserverType>
}

export const Subject = () => {
    const state: StateProps = {
        observers: []
    }

    const subscribeObserver = (observer: ObserverType) => {
        state.observers.push(observer)
    }

    const unsubscribeObserver = (observer: ObserverType) => {
        const observerIndex = state.observers.indexOf(observer)

        if (observerIndex > -1) {
            state.observers.splice(observerIndex, 1)
        }
    }

    const notifyObserver = (observer: ObserverType) => {
        const observerIndex = state.observers.indexOf(observer)

        if (observerIndex > -1) {
            state.observers[observerIndex].run()
        }
    }

    const notifyAllObservers = () => {
        state.observers.forEach(observer => observer.run())
    }

    return {
        subscribeObserver,
        unsubscribeObserver,
        notifyObserver,
        notifyAllObservers
    }
}