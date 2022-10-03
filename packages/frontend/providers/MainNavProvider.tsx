import { createContext } from 'react'

export const MainNavContext = createContext()

export const MainNavProvider = ({ children, toggleMainNav }) => {
  return (
    <MainNavContext.Provider value={{ toggleMainNav }}>
      {children}
    </MainNavContext.Provider>
  )
}
