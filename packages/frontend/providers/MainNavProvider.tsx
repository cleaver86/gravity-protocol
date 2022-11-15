import { createContext } from 'react'

type MainNavContextProps = {
  toggleMainNav: () => void
}

export const MainNavContext = createContext<MainNavContextProps>({
  toggleMainNav: () => {},
})

type MainNavProviderProps = {
  children: React.ReactNode
  toggleMainNav: () => void
}

export const MainNavProvider = ({
  children,
  toggleMainNav,
}: MainNavProviderProps): JSX.Element => {
  return (
    <MainNavContext.Provider value={{ toggleMainNav }}>
      {children}
    </MainNavContext.Provider>
  )
}
