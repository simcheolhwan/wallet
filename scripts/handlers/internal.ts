import BrowserStorage from "../storage/browser"
import LocalStorage from "../storage/local"
import Keyring from "../controllers/Keyring"
import { address, locked } from "../controllers/state"
import { requested, connectedSites } from "../controllers/connections"

export const storage = chrome.storage ? new BrowserStorage() : new LocalStorage()
const keyring = new Keyring()

const handleRequest: RequestMethod = async (method, args) => {
  switch (method) {
    case "getVault":
      return Boolean(await storage.get("vault"))

    case "createVault":
      await keyring.createVault(args as string)
      break

    case "getLocked":
      return locked.getValue()

    case "lock":
      return keyring.lock()

    case "unlock":
      return keyring.unlock(args as string)

    case "getRequestedConnection":
      return requested?.sender ?? null

    case "allowConnection":
      if (!requested) break
      connectedSites.add(requested.sender.url)
      requested.allow()
      break

    case "denyConnection":
      if (!requested) break
      requested.deny()
      break

    case "getConnectedSites":
      return [...connectedSites]

    case "getAddress":
      return address.getValue()

    case "setAddress":
      return address.next(args as string)

    case "getAccounts":
      return ["Account 1", "Account 2", "Account 3"]

    default:
      throw new Error(`Unknown method: ${method}`)
  }
}

export default handleRequest
