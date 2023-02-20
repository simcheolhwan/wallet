import { encrypt } from "@metamask/browser-passworder"
import { storage } from "../handlers/internal"
import { locked } from "./state"

class Keyring {
  password = ""

  async createVault(password: string) {
    const vault = await encrypt(password, {})
    await storage.set("vault", vault)
    this.unlock(password)
  }

  lock() {
    this.password = ""
    locked.next(true)
  }

  unlock(password: string) {
    this.password = password
    locked.next(false)
  }
}

export default Keyring
