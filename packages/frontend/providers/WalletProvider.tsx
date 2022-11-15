import { createContext } from 'react'
import { TokenMonetaryValues } from '../types'
import { getDefaultTokenValues } from '../utils/prices'
import useWallet from '../hooks/useWallet'

type WalletContextProps = {
  loading: boolean
  balances: TokenMonetaryValues
  prices: TokenMonetaryValues
  total: number
}

export const WalletContext = createContext<WalletContextProps>({
  loading: true,
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
