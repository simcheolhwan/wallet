import { PORT, TYPE } from "../shared/constants"
import getId from "./utils/getId"
import log from "./utils/log"

const port = chrome.runtime.connect({ name: PORT.INTERNAL })

port.onMessage.addListener((message) => {
  if (message.type !== TYPE.EVENT) return
  log.event("event: " + message.event)
  window.dispatchEvent(new Event(message.event))
})

export const request: RequestMethod = async (method, args) => {
  const id = getId()
  const info = [id, method].join(" ")

  log.request("request: " + info)

  return new Promise((resolve, reject) => {
    const receiveResponse = (data: any) => {
      if (!(data.id === id)) return
      if (!(data.type === TYPE.RESPONSE || data.type === TYPE.ERROR)) return

      port.onMessage.removeListener(receiveResponse)

      if (data.error) {
        log.failure("error: " + info)
        reject(new Error(data.error))
      } else {
        log.success("response: " + info)
        resolve(data.response)
      }
    }

    port.onMessage.addListener(receiveResponse)
    port.postMessage({ type: TYPE.REQUEST, id, method, args })
  })
}
