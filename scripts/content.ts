import { PORT, TYPE } from "../shared/constants"

const port = chrome.runtime.connect({ name: PORT.EXTERNAL })

window.addEventListener("message", ({ source, data }) => {
  if (source !== window) return
  if (data.type === TYPE.REQUEST) port.postMessage(data)
})

port.onMessage.addListener((message) => {
  if (message.type === TYPE.EVENT) window.dispatchEvent(new Event(message.event))
  if (message.type === TYPE.RESPONSE || message.type === TYPE.ERROR) window.postMessage(message, "*")
})

const inject = () => {
  const container = document.head || document.documentElement
  const script = document.createElement("script")
  script.setAttribute("src", chrome.runtime.getURL("page.js"))
  container.prepend(script)
  script.remove()
}

inject()
