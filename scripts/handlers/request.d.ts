interface Methods {
  /* vault */
  getVault: [undefined, boolean]
  createVault: [string, void]

  /* locked */
  getLocked: [undefined, boolean]
  lock: [undefined, void]
  unlock: [string, void]

  /* accounts */
  getAddress: [undefined, string]
  setAddress: [string, void]
  getAccounts: [undefined, string[]]

  /* connections */
  getRequestedConnection: [undefined, Sender | null]
  allowConnection: [undefined, void]
  denyConnection: [undefined, void]
  getConnectedSites: [undefined, string[]]

  /* external */
  enable: [undefined, string]
}

interface RequestMethod {
  <T extends keyof Methods>(method: T, args?: Methods[T][0]): Promise<Methods[T][1]>
}

interface Sender {
  url: string
  favicon?: string
}
