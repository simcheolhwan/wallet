import { BehaviorSubject } from "rxjs"

export const locked = new BehaviorSubject(true)
export const address = new BehaviorSubject("Account 1")
export const chain = new BehaviorSubject("Chain 1")
