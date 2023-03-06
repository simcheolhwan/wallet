import createContext from "../lib/createContext"

export const importBackground = async () => {
  if (import.meta.env.WALLET_ENV === "web") return await import("../scripts/web")
  return await import("../scripts/ui")
}

export const [useBackground, BackgroundProvider] = createContext<{ request: RequestMethod }>("Background")

export const useRequest = () => {
  const { request } = useBackground()
  return request
}
