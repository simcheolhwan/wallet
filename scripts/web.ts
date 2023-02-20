import type { BehaviorSubject } from "rxjs"
import { EVENT } from "../shared/constants"
import { address, chain, locked } from "./controllers/state"

const subscribe = <T>(name: string, subject: BehaviorSubject<T>) => {
  subject.subscribe(() => {
    window.dispatchEvent(new Event(name))
  })
}

subscribe(EVENT.LOCKED, locked)
subscribe(EVENT.ADDRESS, address)
subscribe(EVENT.CHAIN, chain)

export { default as request } from "./handlers/internal"
