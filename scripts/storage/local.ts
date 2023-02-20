export default class LocalStorage {
  get<T>(key: string) {
    return new Promise<T | undefined>((resolve) => {
      const result = localStorage.getItem(key)
      resolve(result ? JSON.parse(result) : undefined)
    })
  }

  set(key: string, value: any) {
    return new Promise<void>((resolve) => {
      localStorage.setItem(key, JSON.stringify(value))
      resolve()
    })
  }
}
