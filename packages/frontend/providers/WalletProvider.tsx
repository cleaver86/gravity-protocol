import { createContext } from 'react'
import { WalletContextProps } from '../types'
import { getDefaultTokenValues } from '../utils/general'
import useWallet from '../hooks/useWallet'

export const WalletContext = createContext<WalletContextProps>({
  balances: getDefaultTokenValues(),
  prices: getDefaultTokenValues(),
  total: 0,
})

type WalletProviderProps = {
  children: React.ReactNode
  account: string
}

export const WalletProvider = ({ account, children }: WalletProviderProps) => {
  const wallet = useWallet(account)
  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  )
}
