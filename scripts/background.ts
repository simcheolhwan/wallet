import type { BehaviorSubject } from "rxjs"
import { EVENT, PORT, TYPE } from "../shared/constants"
import log from "./utils/log"
import { openExtension } from "./utils/extension"
import { address, chain, locked } from "./controllers/state"
import internal from "./handlers/internal"
import external from "./handlers/external"

chrome.runtime.onConnect.addListener(async (port) => {
  if (!Object.values(PORT).includes(port.name)) return
  if (!port.sender?.url) return
  const { origin: url } = new URL(port.sender.url)
  const favicon = port.sender.tab?.favIconUrl
  const isInternal = url === `chrome-extension://${chrome.runtime.id}`

  const subscribe = <T>(name: string, subject: BehaviorSubject<T>) => {
    const subscription = subject.subscribe(() => {
      const info = [isInternal ? "internal" : url, name]
      log.event(info.join(" ← "))
      port.postMessage({ type: TYPE.EVENT, event: name })
    })

    port.onDisconnect.addListener(() => subscription.unsubscribe())
  }

  subscribe(EVENT.LOCKED, locked)
  subscribe(EVENT.ADDRESS, address)
  subscribe(EVENT.CHAIN, chain)

  port.onMessage.addListener(async ({ id, method, args }) => {
    const info = [isInternal ? "internal" : url, `(${id}) ${method}`]

    try {
      log.request(info.join(" → "))
      const response = isInternal ? await internal(method, args) : await external({ url, favicon })(method, args)
      log.success(info.join(" ← "))
      port.postMessage({ type: TYPE.RESPONSE, id, response })
    } catch (error) {
      log.failure(info.join(" ✕ "))
      console.info(error)
      if (error instanceof Error) {
        port.postMessage({ type: TYPE.ERROR, id, error: error.message })
      }
    }
  })
})

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") openExtension()
})
