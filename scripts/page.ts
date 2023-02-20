import { TYPE } from "../shared/constants"
import getId from "./utils/getId"

declare global {
  interface Window {
    wallet: typeof wallet
  }
}

const request: RequestMethod = (method, args) => {
  const id = getId()
  return new Promise((resolve, reject) => {
    const receiveResponse = ({ source, data }: MessageEvent) => {
      if (!(source === window)) return
      if (!(data.id === id)) return
      if (!(data.type === TYPE.RESPONSE || data.type === TYPE.ERROR)) return
      window.removeEventListener("message", receiveResponse)
      if (data.error) reject(new Error(data.error))
      else resolve(data.response)
    }

    window.addEventListener("message", receiveResponse)
    window.postMessage({ type: TYPE.REQUEST, id, method, args }, "*")
  })
}

const wallet = {
  enable: () => request("enable"),
}

window.wallet = wallet
