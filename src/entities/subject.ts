type Observer = {
    run: () => any
}

type StateProps = {
    observers: Array<Observer>
}

export const Subject = () => {
    const state: StateProps = {
        observers: []
    }

    const subscribeObserver = (observer: Observer) => {
        state.observers.push(observer)
    }

    const unsubscribeObserver = (observer: Observer) => {
        const observerIndex = state.observers.indexOf(observer)

        if (observerIndex > -1) {
            state.observers.splice(observerIndex, 1)
        }
    }

    const notifyObserver = (observer: Observer) => {
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