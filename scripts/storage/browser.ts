export default class BrowserStorage {
  get<T>(key: string) {
    return new Promise<T | undefined>((resolve, reject) => {
      chrome.storage.local.get(key, ({ [key]: result }) => {
        const error = chrome.runtime.lastError
        if (error) reject(new Error(error.message))
        else resolve(result)
      })
    })
  }

  set(key: string, value: any) {
    return new Promise<void>((resolve, reject) => {
      chrome.storage.local.set({ [key]: value }, () => {
        const error = chrome.runtime.lastError
        if (error) reject(new Error(error.message))
        else resolve()
      })
    })
  }
}
