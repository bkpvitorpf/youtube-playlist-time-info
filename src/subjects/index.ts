import { Subject } from "../entities/subject";
import { urlObserver } from "../observers";

const urlSubject = Subject()

urlSubject.subscribeObserver(urlObserver)

export { urlSubject };
