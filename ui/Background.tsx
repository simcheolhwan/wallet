import type { PropsWithChildren } from "react"
import { useQuery } from "@tanstack/react-query"
import createContext from "../lib/createContext"

const importBackground = async () => {
  if (import.meta.env.WALLET_ENV === "web") return await import("../scripts/web")
  return await import("../scripts/ui")
}

export const [useBackground, BackgroundProvider] = createContext<{ request: RequestMethod }>("Background")
export const useRequest = () => {
  const { request } = useBackground()
  return request
}

const Background = ({ children }: PropsWithChildren) => {
  const { data } = useQuery(["background"], importBackground, { staleTime: Infinity })
  if (!data) return null
  return <BackgroundProvider value={data}>{children}</BackgroundProvider>
}

export default Background
