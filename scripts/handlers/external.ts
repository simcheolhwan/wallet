import { requestConnection } from "../controllers/connections"

const handleRequest = (sender: Sender): RequestMethod => {
  return async (method, args) => {
    switch (method) {
      case "enable":
        return requestConnection(sender as Sender)

      default:
        throw new Error(`Unknown method: ${method}`)
    }
  }
}

export default handleRequest
