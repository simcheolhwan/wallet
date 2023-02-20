import { closePopup, openPopup } from "../utils/popup"
import { address } from "./state"

interface Request {
  sender: Sender
  allow: () => void
  deny: () => void
}

export let requested: Request | undefined = undefined
export const connectedSites = new Set<string>([])

export const requestConnection = (sender: Sender) => {
  return new Promise<string>(async (resolve, reject) => {
    if (connectedSites.has(sender.url)) return resolve(address.getValue())

    requested = {
      sender,
      allow: async () => {
        connectedSites.add(sender.url)
        resolve(address.getValue())
        requested = undefined
        await closePopup()
      },
      deny: async () => {
        reject(new Error("User rejected"))
        requested = undefined
        await closePopup()
      },
    }

    await openPopup()
  })
}
