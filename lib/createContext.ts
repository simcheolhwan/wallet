import React from "react"

const createContext = <T>(name: string) => {
  const context = React.createContext<T | undefined>(undefined)

  const useContext = () => {
    const state = React.useContext(context)
    if (!state) throw new Error(`use${name} must be inside a provider`)
    return state
  }

  return [useContext, context.Provider] as const
}

export default createContext
