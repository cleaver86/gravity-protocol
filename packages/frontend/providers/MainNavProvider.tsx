import { createContext } from 'react'

type MainNavContextProps = {
  openMainNavDrawer: () => void
}

export const MainNavContext = createContext<MainNavContextProps>({
  openMainNavDrawer: () => {}, // eslint-disable-line
})

type MainNavProviderProps = {
  children: React.ReactNode
  openMainNavDrawer: () => void
}

export const MainNavProvider = ({
  children,
  openMainNavDrawer,
}: MainNavProviderProps): JSX.Element => {
  return (
    <MainNavContext.Provider value={{ openMainNavDrawer }}>
      {children}
    </MainNavContext.Provider>
  )
}
